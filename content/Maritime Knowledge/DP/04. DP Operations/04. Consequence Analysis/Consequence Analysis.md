# Consequence Analysis

## Definition

Consequence analysis predicts whether the vessel can maintain position after a defined failure.
Consequence analysis는 정의된 고장 후 선박이 위치를 유지할 수 있는지 예측한다.

It is used mainly in higher-class DP operations.
주로 높은 등급의 DP 운용에서 사용된다.

## Simple Idea

```text
Current vessel configuration
  + current environmental load
  + defined worst-case failure
  = remaining capability?
```

If remaining capability is not enough, the operation may need to stop or change status.
남은 capability가 충분하지 않으면 작업을 중지하거나 status를 바꿔야 할 수 있다.

## What It Looks At

- Online generators and power distribution
- 운전 중인 발전기와 배전
- Available thrusters
- 사용 가능한 thruster
- Environmental load
- 환경 하중
- Vessel heading
- 선박 heading
- Worst-case failure
- Worst-case failure
- Remaining thrust and power margin
- 남은 thrust와 power margin

## DPO Use

The DPO should understand what the analysis is warning about.
DPO는 consequence analysis가 무엇을 경고하는지 이해해야 한다.

It is not just another alarm.
이것은 단순한 또 하나의 alarm이 아니다.

It asks:
이렇게 묻는다.

```text
If the worst credible failure happens now, can we still keep position?
```

## Related Notes

- [[Redundancy and WCFDI]]
- [[CAMO and TAM]]
- [[ASOG and WSOG]]
- [[Capability and Footprint Plots]]
