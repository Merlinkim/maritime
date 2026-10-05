# PRS and Gyro Troubleshooting Before Technician Arrival

## Purpose

This page is not for repairing equipment.
이 페이지는 장비를 직접 수리하기 위한 문서가 아니다.

It is for narrowing down the problem before calling a technician.
테크니션을 부르기 전에 문제 위치를 좁히기 위한 문서다.

The DPO or deck officer should describe what happened, what was cross-checked, and what DP effect was observed.
DPO 또는 항해사는 어떤 현상이 있었고, 무엇과 비교했으며, DP에 어떤 영향이 있었는지를 설명할 수 있어야 한다.

## Basic Fault Report Structure

```text
1. Equipment / system
2. Observed symptom
3. Operating condition
4. Cross-check
5. DP impact
6. Suspected area
7. Requested action
```

## PRS Symptoms

| Symptom | Possible area | What to check |
|---|---|---|
| Position jump | GNSS, correction, multipath, MRU compensation | Compare other PRS, quality flag, DOP, correction age |
| Slow position drift | PRS bias, wrong offset, model drift | Compare independent reference, check offset/datum |
| PRS rejected | Quality issue, residual too high | Check alarm, residual, weighting, raw value |
| Estimate jumps when PRS selected | Wrong offset or bad weighting | Select/deselect carefully, compare accepted position |

## Gyro Symptoms

| Symptom | Possible area | What to check |
|---|---|---|
| Gyro 1 and 2 differ by fixed angle | Bias, alignment, calibration | Compare repeaters and DP input value |
| Heading slowly changes | Gyro drift or settling | Compare other heading sources over time |
| Heading input lost | Power, serial/Ethernet link, interface | Check alarms and source selection |
| DP force direction feels wrong | Heading or coordinate issue | Check selected gyro and heading consistency |

## MRU / Compensation Symptoms

| Symptom | Possible area | What to check |
|---|---|---|
| Position moves with wave period | MRU compensation, lever arm, timing | Check roll/pitch/heave and PRS motion |
| GNSS stable but DP position unstable | MRU or filter issue | Compare raw PRS and accepted position |
| After maintenance, position correction looks wrong | Alignment, sign, offset | Check mounting direction and lever arm settings |

## How to Report Clearly

Poor report:
나쁜 보고:

```text
PRS seems strange. Please check.
```

Better report:
좋은 보고:

```text
During DP operation, PRS-1 showed intermittent lateral jumps of about 1-2 m.
PRS-2 did not show the same jump. GNSS quality remained valid.
When PRS-1 weighting increased, accepted DP position followed PRS-1.
Suspected area: PRS-1 signal integrity, correction input, antenna/lever-arm compensation, or DP input weighting.
Request technician check receiver output, antenna/cable, correction input, and DP interface configuration.
```

## Important Boundary

The DPO should not change protected configuration casually.
DPO는 보호된 설정을 함부로 바꾸면 안 된다.

The goal is to observe, compare, record, and report.
목표는 관찰, 비교, 기록, 보고다.

## Related Notes

- [[Position Reference Systems]]
- [[GNSS and DGNSS]]
- [[Gyrocompass]]
- [[Motion Reference Unit]]
- [[Input Signal Integrity and Sensor Data Flow]]
