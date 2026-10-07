# DP Control System (IMO)

> Note: This is a study note, not a verbatim reproduction of the source document.
> 주의: 이 페이지는 학습용 정리이며 원문 전체의 재배포본이 아니다.

Reference source: IMO MSC.1/Circ.1580 public copy via USCG — https://www.dco.uscg.mil/Portals/9/OCSNCOE/References/DP-Guidance/IMO/MSC.1-Circ.1580.pdf

## Purpose

The DP control system measures vessel state, estimates environmental forces, calculates required thrust, and presents information to the operator.

## Core Points

- Includes DP computers/controllers, operator stations/HMI, software, sensors, position reference systems, networks, interfaces, cabling, power supplies, and alarms needed for DP.
- It closes the loop between measured position/heading and commanded thruster output.
- Redundant controllers and independent references reduce single-failure risk.

## Practical DP Meaning

- Bad input can be more dangerous than no input if it is accepted as valid.
- PRS weighting, sensor rejection, alarm handling, and mode awareness are central DPO skills.
- Network/interface failures can create confusing partial failures.

## Related Notes

- [[DP Controller]]
- [[Environmental Sensors]]
- [[Position Reference Systems]]
- [[HMI]]
- [[Closed-loop Control]]
