import threading

def post_fork(server, worker):
    from app import _ensure_hints, _ensure_steelmans
    def _warm():
        _ensure_hints()
        _ensure_steelmans()
    threading.Thread(target=_warm, daemon=True).start()