# Wind

바람은 DP 선박의 수면 위 구조물에 힘과 Yaw moment를 발생시키는 주요 외력이다. 선체, Accommodation, Crane, Cargo 및 기타 돌출 구조물의 면적과 형상에 따라 영향이 달라진다.
Wind is the main external force that generates force and Yaw moment on the above-water structures of DP vessels. The influence varies depending on the area and shape of the hull, Accommodation, Crane, Cargo, and other protruding structures.

## Wind Information

DP 시스템은 일반적으로 [[Wind Sensor]]에서 다음 정보를 받는다.
The DP system generally receives the following information from the [[Wind Sensor]].

- Wind speed
- Wind direction
- Sensor status and validity

Anemometer가 직접 측정하는 값은 선박에서 관측한 **Relative/Apparent Wind**이다. 시스템은 선박의 Heading과 운동 정보를 이용하여 제어에 필요한 풍향·풍속을 처리할 수 있다. 표시되는 풍향이 바람이 **불어오는 방향(from)**인지 **향하는 방향(to)**인지 반드시 장비 기준을 확인해야 한다.
The value directly measured by the Anemometer is the **Relative/Apparent Wind** observed from the vessel. The system can process the wind direction and wind speed required for control using the vessel's Heading and motion information. It is essential to confirm the equipment standard whether the displayed wind direction is the direction the wind is **coming from (from)** or the direction it is **going to (to)**.

## Wind Feed-forward

바람은 직접 측정할 수 있으므로 DP 제어기는 선박의 Wind Force Model과 측정값을 이용해 예상되는 힘과 Moment를 계산할 수 있다.
Since wind can be measured directly, the DP controller can calculate the expected force and Moment using the vessel's Wind Force Model and the measured values.

```text
Measured Wind
      ↓
Wind Force Model
      ↓
Estimated Force and Yaw Moment
      ↓
Pre-emptive Thruster Demand
```

이를 **Wind Feed-forward**라고 한다. 위치 오차가 발생한 뒤에만 반응하는 Feedback 제어와 달리, 측정된 바람의 영향을 미리 보상한다.
This is called **Wind Feed-forward**. Unlike Feedback control, which reacts only after a position error occurs, it preemptively compensates for the measured wind influence.

## Sources of Error

- 선박 구조물에 의한 Wind shadow와 Turbulence
- Wind shadow and Turbulence caused by vessel structures
- Crane, Cargo 또는 구조 변경으로 인한 Wind model 오차
- Wind model error due to changes in Crane, Cargo, or structural modifications
- 강한 돌풍과 빠른 풍향 변화
- Strong gusts and rapid changes in wind direction
- Sensor icing, blockage 또는 mechanical failure
- Sensor icing, blockage, or mechanical failure
- 잘못된 Heading 입력
- Incorrect Heading input
- 두 Wind Sensor가 같은 교란을 받는 Common-cause condition
- Common-cause condition where two Wind Sensors receive the same disturbance

## Operational Points

- 풍속 값뿐 아니라 방향 변화와 추세를 함께 감시한다.
- Monitors not only wind speed but also changes in direction and trends.
- 복수 센서 간 불일치가 발생하면 어느 값을 제어에 사용할지 확인한다.
- Confirms which value to use for control if discrepancies occur between multiple sensors.
- Wind Sensor failure가 곧바로 위치 상실을 의미하지는 않지만 Feed-forward 성능이 저하될 수 있다.
- Wind Sensor failure does not necessarily mean immediate loss of position, but it can degrade Feed-forward performance.
- Thruster demand, Position deviation 및 [[DP Current]] 변화를 함께 관찰한다.
- Observes Thruster demand, Position deviation, and changes in [[DP Current]] simultaneously.

→ [[What is DP?]]  
→ [[Wind Sensor]]

