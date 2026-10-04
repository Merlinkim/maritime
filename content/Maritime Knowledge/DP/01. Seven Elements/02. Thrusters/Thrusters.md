# Thrusters

## Role

Thrusters는 전력과 제어 명령을 실제 **Surge force, Sway force, Yaw moment**로 변환한다. DP 성능은 설치된 추력의 합보다 각 추진기의 방향, 위치, 효율, 응답속도와 가용성에 의해 결정된다.
Thrusters convert power and control commands into actual **Surge force, Sway force, Yaw moment**. DP performance is determined not only by the sum of installed thrust but also by the direction, position, efficiency, response speed, and availability of each thruster.

## Typical Types

- Azimuth thruster
- Tunnel thruster
- Main propeller와 rudder
- Main propeller and rudder
- Retractable azimuth thruster
- Waterjet 등 DP 제어에 포함된 추진장치
- Propulsion systems included in DP control, such as waterjets

## Command and Feedback

DP Controller는 RPM, pitch 또는 azimuth 명령을 보낸다. 시스템은 실제 RPM, pitch, azimuth, ready/running 상태와 고장 신호를 되돌려 받아 명령과 실제 응답이 일치하는지 감시한다.
The DP Controller sends RPM, pitch, or azimuth commands. The system monitors whether the command matches the actual response by receiving actual RPM, pitch, azimuth, ready/running status, and failure signals.

## Practical Limitations

- Thruster–thruster 또는 thruster–hull interaction
- Thruster–thruster or thruster–hull interaction
- Ventilation과 cavitation
- Ventilation and cavitation
- 얕은 수심, 해저면 또는 구조물의 영향
- Influence of shallow water depth, seabed, or structures
- 금지구역과 회전·pitch rate 제한
- Restricted areas and rotational/pitch rate limits
- 저부하 영역의 비선형성 및 추력 손실
- Nonlinearity and thrust loss in low-load regions
- 정비 상태와 오염에 따른 성능 저하
- Performance degradation due to maintenance status and fouling

## Typical Failure Effects

- Drive, motor, pitch 또는 azimuth failure
- Drive, motor, pitch, or azimuth failure
- 명령 고착 또는 잘못된 feedback
- Command sticking or incorrect feedback
- 보조계통 상실
- Loss of auxiliary systems
- 전원구역 상실로 인한 다수 thruster 동시 정지
- Simultaneous shutdown of multiple thrusters due to power loss area
- 의도하지 않은 추력으로 인한 position excursion
- Position excursion due to unintended thrust

## Connections

- 공식 시스템 경계: [[Thruster System (IMO)]]
- Official system boundary: [[Thruster System (IMO)]]
- 입력: [[Power]]
- Input: [[Power]]
- 명령 생성: [[Thrust Allocation]]
- Command generation: [[Thrust Allocation]]
