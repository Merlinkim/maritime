# Thrust Allocation

## Purpose

Thrust Allocation은 DP Controller가 요구한 총 Surge force, Sway force와 Yaw moment를 가용한 각 thruster의 명령으로 분배하는 과정이다.
Thrust Allocation is the process of distributing the total Surge force, Sway force, and Yaw moment required by the DP Controller into commands for the available thrusters.

```text
Required Fx, Fy, Mz
→ Allocation algorithm
→ Thruster 1 ... Thruster n: force, azimuth, pitch/RPM
```

## Constraints

Allocation은 단순히 동일하게 나누지 않는다.
Allocation is not simply divided equally.

- 각 thruster의 위치와 방향
- Position and direction of each thruster
- 최대·최소 thrust와 ramp rate
- Maximum/minimum thrust and ramp rate
- Azimuth rotation과 forbidden sector
- Azimuth rotation and forbidden sector
- 전력 가용량과 bus별 load
- Power availability and load per bus
- Thruster interaction와 효율
- Thruster interaction and efficiency
- 고장, maintenance 또는 deselection 상태
- Failure, maintenance, or deselection status
- 연료·전력 사용과 마모를 줄이기 위한 optimization
- Optimization to reduce fuel/power consumption and wear

## Yaw Moment

같은 크기의 횡력이라도 선박 중심에서 멀리 떨어진 thruster가 더 큰 yaw moment를 만든다. 따라서 위치 유지와 heading 유지를 동시에 만족하도록 force와 moment를 함께 배분해야 한다.
Even if the lateral force is the same, a thruster located far from the vessel's center creates a larger yaw moment. Therefore, force and moment must be allocated together to satisfy both position and heading maintenance.

## Degraded Conditions

Thruster 또는 power group을 잃으면 allocation은 남은 장비로 다시 계산된다. 총 추력이 충분해 보여도 필요한 방향의 force나 yaw moment가 부족할 수 있다. 이것이 단순 합계보다 thruster geometry와 post-failure capability가 중요한 이유다.
If a thruster or power group is lost, the allocation is recalculated using the remaining equipment. Even if the total thrust appears sufficient, the required force or yaw moment in a specific direction may be insufficient. This is why thruster geometry and post-failure capability are more important than simple summation.

## DPO Monitoring

- Command와 actual feedback의 일치 여부
- Consistency between command and actual feedback
- 특정 thruster의 지속적인 saturation
- Continuous saturation of a specific thruster
- Azimuth가 반복 회전하거나 hunting하는지 여부
- Whether the azimuth is repeatedly rotating or hunting
- Bus별 power loading과 available thrust
- Power loading per bus and available thrust
- Thruster deselection 후 position/heading capability 변화
- Change in position/heading capability after thruster deselection

## Related Notes

- [[DP Controller]]
- [[Thrusters]]
- [[Power]]
- [[Closed-loop Control]]
