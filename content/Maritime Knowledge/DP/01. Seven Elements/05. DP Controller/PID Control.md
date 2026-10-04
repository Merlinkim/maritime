# PID Control

## Concept

PID는 현재 오차, 누적 오차와 오차 변화율을 조합해 제어 출력을 만드는 기본 개념이다.
PID is a basic concept that combines the current error, accumulated error, and rate of error change to create the control output.

```text
Control output = P + I + D
```

**한국어**

| Term | 보는 값 | 일반적 효과 |
|---|---|---|
| P — Proportional | 현재 error | 오차가 클수록 강한 복원 명령 |
| I — Integral | 시간에 따른 error 누적 | 지속적인 offset 제거 |
| D — Derivative | error 변화율 | 빠른 변화 억제와 damping 제공 |

**English**

| Term | Value observed | General effect |
|---|---|---|
| P — Proportional | Current error | Stronger restoring command as error increases |
| I — Integral | Accumulated error over time | Removal of persistent offset |
| D — Derivative | Rate of error change | Provides fast change suppression and damping |

## DP Application

DP 제어는 단순한 하나의 PID보다 복잡하지만, Surge, Sway와 Yaw에서 오차에 어떻게 반응하는지 이해하는 기본 틀로 유용하다. 제조사별 controller는 model-based control, filtering, gain scheduling과 제한 logic을 함께 사용한다.
DP control is more complex than a simple PID, but it is useful as a basic framework for understanding how to react to errors in Surge, Sway, and Yaw. Manufacturer-specific controllers use a combination of model-based control, filtering, gain scheduling, and limiting logic.

## Tuning Effects

- Gain이 너무 낮음: 느린 복귀, 큰 position error
- Gain too low: slow recovery, large position error
- Gain이 너무 높음: overshoot, oscillation, thruster hunting
- Gain too high: overshoot, oscillation, thruster hunting
- Integral이 과도함: actuator saturation 뒤 큰 overshoot 가능
- Integral excessive: possible large overshoot after actuator saturation
- Derivative/noise filtering 부적절: noisy command 또는 느린 반응
- Derivative/noise filtering inappropriate: noisy command or slow response

## Operational Meaning

Weather/gain setting을 변경하면 위치 정확도뿐 아니라 thruster activity, 전력 사용량과 기계적 마모도 달라진다. DPO는 무조건 높은 gain을 선택하기보다 작업 위험, 환경과 선박별 절차에 맞춰 사용해야 한다.
Changing the weather/gain setting affects not only position accuracy but also thruster activity, power consumption, and mechanical wear. DPO should be used according to the operational risk, environment, and vessel-specific procedures, rather than unconditionally selecting high gains.

## Related Notes

- [[Closed-loop Control]]
- [[DP Controller]]
- [[Vessel Mathematical Model]]
