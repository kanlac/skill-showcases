import argparse
import datetime as dt
import json
import os
import sys
import urllib.request
from pathlib import Path

import dashscope
from dashscope import MultiModalConversation

# 以下为北京地域url，若使用新加坡地域的模型，需将url替换为：https://dashscope-intl.aliyuncs.com/api/v1
dashscope.base_http_api_url = "https://dashscope.aliyuncs.com/api/v1"

DEFAULT_PROMPT = (
    "一副典雅庄重的对联悬挂于厅堂之中，房间是个安静古典的中式布置，桌子上放着一些青花瓷，"
    "对联上左书“义本生知人机同道善思新”，右书“通云赋智乾坤启数高志远”， 横批“智启通义”，"
    "字体飘逸，在中间挂着一幅中国风的画作，内容是岳阳楼。"
)

DEFAULT_NEGATIVE_PROMPT = (
    "低分辨率，低画质，肢体畸形，手指畸形，画面过饱和，蜡像感，人脸无细节，过度光滑，画面具有AI感。"
    "构图混乱。文字模糊，扭曲。"
)


def _load_dotenv_if_present(dotenv_path: Path) -> None:
    if not dotenv_path.exists():
        return
    for raw_line in dotenv_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def _read_text_file(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def _build_messages(prompt: str) -> list[dict]:
    return [{"role": "user", "content": [{"text": prompt}]}]


def _extract_image_urls(payload: object) -> list[str]:
    if not isinstance(payload, dict):
        return []

    output = payload.get("output")
    if not isinstance(output, dict):
        return []

    choices = output.get("choices")
    if not isinstance(choices, list) or not choices:
        return []

    message = choices[0].get("message")
    if not isinstance(message, dict):
        return []

    content = message.get("content")
    if not isinstance(content, list):
        return []

    urls: list[str] = []
    for item in content:
        if not isinstance(item, dict):
            continue
        for key in ("image", "image_url", "url"):
            value = item.get(key)
            if isinstance(value, str) and value.startswith(("http://", "https://")):
                urls.append(value)
    return urls


def _response_to_payload(response: object) -> dict:
    def _maybe_dict(value: object) -> object:
        if isinstance(value, dict):
            return value
        if isinstance(value, list):
            return value
        return value

    return {
        "status_code": getattr(response, "status_code", None),
        "request_id": getattr(response, "request_id", None),
        "code": getattr(response, "code", None),
        "message": getattr(response, "message", None),
        "output": _maybe_dict(getattr(response, "output", None)),
        "usage": _maybe_dict(getattr(response, "usage", None)),
    }


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Generate images via DashScope Qwen Image.")
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--prompt", help="Text prompt to generate the image.")
    group.add_argument("--prompt-file", type=Path, help="Read prompt text from a file (UTF-8).")
    group.add_argument("--prompt-md", type=Path, help="Read prompt text from a Markdown file (UTF-8).")

    parser.add_argument("--model", default="qwen-image-max", help="Model name (default: qwen-image-max).")
    parser.add_argument("--size", default="1664*928", help="Image size, e.g. 1664*928.")
    parser.add_argument("--negative-prompt", default=DEFAULT_NEGATIVE_PROMPT, help="Negative prompt.")
    parser.add_argument("--no-prompt-extend", action="store_true", help="Disable prompt_extend.")
    parser.add_argument("--watermark", action="store_true", help="Enable watermark (default: off).")
    parser.add_argument("--stream", action="store_true", help="Enable streaming (default: off).")

    parser.add_argument("--out", type=Path, help="Output image path (downloaded).")
    parser.add_argument("--out-dir", type=Path, default=Path("qwen-image/output"), help="Output directory.")
    parser.add_argument("--save-json", type=Path, help="Save raw response payload to JSON.")
    parser.add_argument("--print-json", action="store_true", help="Print response payload JSON to stdout.")
    parser.add_argument("--no-download", action="store_true", help="Do not download images, only call API.")

    args = parser.parse_args(argv)

    script_dir = Path(__file__).resolve().parent
    _load_dotenv_if_present(script_dir / ".env")

    prompt = args.prompt
    if args.prompt_file:
        prompt = _read_text_file(args.prompt_file)
    if args.prompt_md:
        prompt = _read_text_file(args.prompt_md)
    if not prompt:
        prompt = DEFAULT_PROMPT

    # 新加坡和北京地域的API Key不同。获取API Key：https://help.aliyun.com/zh/model-studio/get-api-key
    api_key = os.getenv("DASHSCOPE_API_KEY")
    if not api_key:
        print("Missing DASHSCOPE_API_KEY (set env var or qwen-image/.env).", file=sys.stderr)
        return 2

    response = MultiModalConversation.call(
        api_key=api_key,
        model=args.model,
        messages=_build_messages(prompt),
        result_format="message",
        stream=bool(args.stream),
        watermark=bool(args.watermark),
        prompt_extend=not args.no_prompt_extend,
        negative_prompt=args.negative_prompt,
        size=args.size,
    )

    if getattr(response, "status_code", None) != 200:
        print(f"HTTP返回码：{getattr(response, 'status_code', None)}", file=sys.stderr)
        print(f"错误码：{getattr(response, 'code', None)}", file=sys.stderr)
        print(f"错误信息：{getattr(response, 'message', None)}", file=sys.stderr)
        print("请参考文档：https://help.aliyun.com/zh/model-studio/developer-reference/error-code", file=sys.stderr)
        return 1

    payload = _response_to_payload(response)

    if args.save_json:
        args.save_json.parent.mkdir(parents=True, exist_ok=True)
        args.save_json.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    if args.print_json:
        print(json.dumps(payload, ensure_ascii=False, indent=2))

    if args.no_download:
        return 0

    urls = _extract_image_urls(payload)
    if not urls:
        print("No image URL found in response payload.", file=sys.stderr)
        return 3

    out_path = args.out
    if not out_path:
        ts = dt.datetime.now().strftime("%Y%m%d-%H%M%S")
        args.out_dir.mkdir(parents=True, exist_ok=True)
        out_path = args.out_dir / f"qwen-image-{ts}.png"
    else:
        out_path.parent.mkdir(parents=True, exist_ok=True)

    urllib.request.urlretrieve(urls[0], out_path)  # noqa: S310
    print(str(out_path))
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
