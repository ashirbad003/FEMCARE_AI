from datetime import datetime, timedelta
from typing import Optional
from app.models.models import CycleEntry


def predict_next_period(entries: list[CycleEntry]) -> Optional[dict]:
    if len(entries) < 2:
        return None
    sorted_entries = sorted(entries, key=lambda e: e.date)
    gaps = []
    for i in range(1, len(sorted_entries)):
        gap = (sorted_entries[i].date - sorted_entries[i - 1].date).days
        if 20 <= gap <= 40:
            gaps.append(gap)
    if not gaps:
        return None
    avg_cycle = sum(gaps) // len(gaps)
    last_date = sorted_entries[-1].date
    next_date = last_date + timedelta(days=avg_cycle)
    fertile_start = next_date - timedelta(days=14)
    fertile_end = fertile_start + timedelta(days=5)
    return {
        "average_cycle_length": avg_cycle,
        "last_period": last_date.isoformat(),
        "next_predicted": next_date.isoformat(),
        "fertile_window_start": fertile_start.isoformat(),
        "fertile_window_end": fertile_end.isoformat(),
    }


def get_cycle_stats(entries: list[CycleEntry]) -> dict:
    if not entries:
        return {"total_logged": 0}
    return {
        "total_logged": len(entries),
        "last_entry_date": max(e.date for e in entries).isoformat() if entries else None,
    }
