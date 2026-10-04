# Wind Sensor

## Role in DP

Wind Sensor는 선박에서 측정한 풍향과 풍속을 DP Controller에 제공한다. Controller는 이 값과 선박의 wind coefficient/model을 사용해 바람이 만들 것으로 예상되는 Surge force, Sway force와 Yaw moment를 미리 보상한다. 이를 **wind feed-forward**라고 한다.
The Wind Sensor provides the wind direction and wind speed measured on the vessel to the DP Controller. The Controller uses these values and the vessel's wind coefficient/model to pre-compensate for the expected Surge force, Sway force, and Yaw moment caused by the wind. This is called **wind feed-forward**.

## Apparent and True Wind

Anemometer가 직접 측정하는 값은 일반적으로 선박의 움직임이 포함된 **apparent/relative wind**다. True wind를 구하려면 선박의 heading과 속도 벡터를 함께 사용해야 한다.
The values directly measured by the Anemometer are generally the **apparent/relative wind** including the vessel's movement. To find the true wind, the vessel's heading and velocity vector must be used together.

```text
Apparent wind = True wind − Vessel velocity
```

DP 중 선박 속도가 작아도 heading 변화, gust와 상부구조물의 교란 때문에 측정값은 계속 변한다.
Even when the vessel speed is low during DP, the measured values continue to change due to heading changes, gusts, and interference from superstructures.

## Sensor Types

- Cup and vane anemometer
- Propeller-type anemometer
- Ultrasonic wind sensor

## Installation Effects

- Mast, crane, derrick와 accommodation의 wind shadow
- Wind shadow from Mast, crane, derrick, and accommodation
- 배기가스와 열
- Exhaust gas and heat
- 복수 센서의 서로 다른 설치 높이와 위치
- Different installation heights and locations of multiple sensors
- 작업 구조물이나 offshore installation의 차폐
- Shielding from working structures or offshore installations
- 선박의 heading 변화에 따른 turbulence
- Turbulence due to changes in vessel heading

두 센서가 모두 정상이어도 설치 위치가 다르면 다른 값을 보일 수 있다. 비교 시 숫자뿐 아니라 당시 풍향과 차폐 조건을 함께 본다.
Even if both sensors are normal, they may show different values if their installation locations differ. When comparing, consider not only the numbers but also the wind direction and shielding conditions at the time.

## Failure and Bad Data

- Frozen speed/direction
- Gust에 비해 지나치게 느린 응답
- Response that is excessively slow compared to a gust
- Direction offset 또는 180° ambiguity
- Direction offset or 180° ambiguity
- Cup/vane 고착, 결빙 또는 오염
- Cup/vane sticking, icing, or contamination
- Data unit·sign·reference 설정 오류
- Data unit·sign·reference setting errors
- 공통 network 또는 전원 상실
- Common network or power loss

잘못된 wind 값은 잘못된 feed-forward force를 만들 수 있다. Position feedback이 이를 나중에 보정하더라도 불필요한 thruster activity와 position error가 발생할 수 있다.
Incorrect wind values can create incorrect feed-forward forces. Even if position feedback later corrects this, unnecessary thruster activity and position error can occur.

## DPO Monitoring

- 복수 sensor 간 풍속·풍향 차이
- Difference in wind speed/direction among multiple sensors
- 화면의 wind vector와 실제 기상상태의 합리성
- Rationality between the wind vector displayed on the screen and the actual meteorological conditions
- Heading 변경 시 특정 sensor가 wind shadow에 들어가는지 여부
- Whether a specific sensor enters a wind shadow when the heading changes
- Wind sensor deselection 전후의 thruster demand 변화
- Change in thruster demand before and after wind sensor deselection
- Gust, squall와 capability/operational limit의 관계
- Relationship between gusts, squalls, and capability/operational limit

## Related Notes

- [[Environmental Sensors]]
- [[Vessel Mathematical Model]]
- [[DP Controller]]
- [[Wind]]
