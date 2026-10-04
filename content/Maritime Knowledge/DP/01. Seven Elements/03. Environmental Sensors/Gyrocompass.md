# Gyrocompass

## Role in DP

Gyrocompass는 선박의 **True Heading**을 DP Control System에 제공한다. Heading은 단순히 선수를 일정하게 유지하는 데만 쓰이지 않는다. 선체고정 좌표계의 Surge·Sway를 지구고정 좌표계의 North·East로 변환하고, thruster force와 position reference를 올바른 방향으로 해석하는 기준이 된다.
Gyrocompass provides the vessel's **True Heading** to the DP Control System. Heading is not merely used to maintain the bow steady. It serves as a reference for transforming the vessel-fixed coordinate system's Surge and Sway into the Earth-fixed coordinate system's North and East, and for correctly interpreting thruster force and position reference.

따라서 잘못된 heading은 yaw 제어뿐 아니라 위치제어 전체에 영향을 줄 수 있다.
Therefore, an incorrect heading can affect not only yaw control but the entire position control.

![[Gyrocompass Working Principle.png|1200]]

> [!summary] 그림을 읽는 순서
> [!summary] Order of reading the figure
> 왼쪽은 기계 내부 부품이고, 오른쪽은 북쪽을 찾는 과정이다. **① Rotor가 축을 유지 → ② 지구가 그 아래에서 자전해 tilt 발생 → ③ 중력이 precession을 만들어 축을 자오선 쪽으로 이동 → ④ damping이 흔들림을 줄여 True North에 정착**한다.
> The left is the internal component, and the right is the process of finding North. **① Rotor maintains the axis → ② Earth rotates beneath it, causing tilt → ③ Gravity creates precession, moving the axis towards the meridian → ④ damping reduces the oscillation, settling on True North**.

## Start with the Basic Idea

Gyrocompass를 이해할 때는 아래 세 장치를 구분해야 한다.
When understanding the Gyrocompass, three devices must be distinguished.

**한국어**

| 장치 | 할 수 있는 일 | 스스로 북쪽을 찾는가? |
|---|---|---|
| Free gyroscope | 회전축 방향을 관성공간에서 유지 | 아니오 |
| Rate gyro | 회전속도를 측정 | 아니오 |
| Gyrocompass | 지구 자전과 중력을 이용해 True North를 탐색 | 예 |

**English**

| Device | Function | Does it find North itself? |
|---|---|---|
| Free gyroscope | Maintains the direction of the axis in inertial space | No |
| Rate gyro | Measures the rotational speed | No |
| Gyrocompass | Uses Earth's rotation and gravity to find True North | Yes |

즉, **빠르게 도는 rotor만으로는 compass가 되지 않는다.** 자유 자이로에 중력에 반응하는 장치와 damping을 더해야 회전축이 True North 부근에 정착한다.
In other words, **a rapidly spinning rotor alone cannot be a compass.** It requires a device that reacts to gravity and damping added to the free gyro for the axis to settle near True North.

## Mechanical Gyrocompass — Internal Structure

아래는 전통적인 기계식 gyrocompass의 개념 구조다. 실제 부품 배치와 제어 방식은 제조사별로 다르다.
Below is the conceptual structure of a traditional mechanical gyrocompass. The actual component arrangement and control methods vary by manufacturer.

```text
┌──────────────── Master Compass ────────────────┐
│                                                │
│  Follow-up / Servo system ──→ Heading output  │
│             ↑                    to DP, radar  │
│             │                                  │
│     ┌──── Outer / Horizontal Gimbal ────┐      │
│     │                                    │      │
│     │  ┌── Inner / Vertical Gimbal ──┐   │      │
│     │  │   High-speed Rotor          │   │      │
│     │  │   + Spin axis               │   │      │
│     │  └─────────────────────────────┘   │      │
│     │       ↑ Gravity-control element    │      │
│     │       ↑ Damping element            │      │
│     └────────────────────────────────────┘      │
│                                                │
│  Power supply / Motor drive / Correction unit │
└────────────────────────────────────────────────┘
```

### Rotor and Spin Axis

Rotor는 전동기로 매우 빠르게 회전한다. 회전하는 물체는 큰 angular momentum을 가지므로 외부 torque가 없을 때 회전축 방향을 쉽게 바꾸지 않는다. 이를 흔히 **rigidity in space**라고 설명한다.
The rotor spins very fast using an electric motor. Since a spinning object has large angular momentum, it does not easily change the direction of its axis without external torque. This is often described as **rigidity in space**.

### Gimbals or Suspension

Gimbal은 rotor assembly가 선박의 roll과 pitch에 바로 끌려가지 않고 여러 축으로 움직일 수 있게 한다. 일부 장비는 액체에 떠 있는 gyrosphere나 다른 suspension 방식을 사용한다.
The gimbal allows the rotor assembly to move along multiple axes without being directly dragged by the vessel's roll and pitch. Some equipment uses gyrospheres floating in liquid or other suspension methods.

### Gravity-Control Element

Pendulous weight, mercury ballistic 또는 제조사 고유 장치가 중력에 대해 수평 기준을 만든다. 자이로축이 수평면에서 기울면 중력이 torque를 만들고, 회전 중인 rotor는 힘의 방향으로 단순히 넘어지는 대신 **precession**한다.
A pendulous weight, mercury ballistic, or manufacturer-specific device establishes a horizontal reference relative to gravity. If the gyro axis tilts from the horizontal plane, gravity creates a torque, and the spinning rotor does not simply fall in the direction of the force but undergoes **precession**.

### Damping Element

Gravity control만 있으면 축은 북쪽을 지나쳐 반대쪽으로 가며 계속 타원형으로 진동한다. Damping은 이 진동에서 에너지를 제거하여 축이 True North 부근의 settle point에 수렴하게 만든다.
With gravity control alone, the axis will oscillate elliptically, passing North and continuing to the opposite side. Damping removes energy from this oscillation, allowing the axis to converge to a settle point near True North.

### Follow-up and Servo System

민감한 gyro element 자체에 repeater와 케이블의 부하를 직접 걸지 않는다. Pick-off가 rotor/gyrosphere와 compass case 사이의 각도 차이를 감지하고, servo motor가 compass card 또는 외부 case를 따라 돌린다. 이 각도가 heading 신호로 변환되어 DP, radar, ECDIS와 repeaters에 분배된다.
The sensitive gyro element itself is not directly subjected to the load of the repeater and cables. The pick-off detects the angular difference between the rotor/gyrosphere and the compass case, and a servo motor rotates the compass card or external case. This angle is converted into a heading signal and distributed to the DP, radar, and ECDIS repeaters.

### Correction and Distribution Unit

Latitude, vessel speed/course 등 필요한 보정값을 적용하고 heading을 serial data 또는 network 신호로 배포한다. 이 때문에 gyro element가 정상이어도 잘못된 외부 입력, interface 또는 distribution failure로 각 소비장비에 다른 heading이 전달될 수 있다.
It applies necessary correction values such as latitude and vessel speed/course, and distributes the heading as serial data or network signals. Because of this, even if the gyro element is normal, different headings can be transmitted to various consuming devices due to incorrect external input, interface, or distribution failure.

## Why It Finds True North

전체 원리는 네 단계로 보면 이해하기 쉽다.
The overall principle is easy to understand when viewed in four stages.

### 1. Rotor resists a change in its axis

고속 rotor의 축은 관성공간에서 기존 방향을 유지하려 한다. 반면 자이로가 설치된 지구와 선박은 계속 회전하고 있다.
The axis of the high-speed rotor tries to maintain its existing direction in inertial space. Meanwhile, the Earth and the vessel are continuously rotating.

### 2. Earth rotation creates an apparent tilt

회전축이 자오선, 즉 North–South 방향과 일치하지 않으면 지구가 자전함에 따라 지구 위 관측자에게 gyro axis가 수평면 위아래로 기울어지는 것처럼 보인다. 이 **earth-rate effect**가 축이 북쪽에서 벗어났다는 정보를 제공한다.
If the axis is not aligned with the meridian, i.e., the North–South direction, it appears to an observer on Earth that the gyro axis tilts up and down relative to the horizontal plane as the Earth rotates. This **earth-rate effect** provides information that the axis has deviated from North.

```text
Gyro axis not on meridian
          ↓
Earth rotates beneath gyro
          ↓
Apparent tilt develops
```

### 3. Gravity converts tilt into precession

Gravity-control element가 기울기에 반응해 torque를 만든다. 회전 중인 rotor에 torque를 가하면 축은 torque 방향으로 쓰러지기보다 약 90° 떨어진 방향으로 움직이는 precession을 한다. 이 precession이 축을 meridian 쪽으로 돌린다.
The gravity-control element creates a torque in response to the tilt. Applying a torque to the spinning rotor causes the axis to undergo precession, moving in a direction about 90° away from the torque, rather than falling in the direction of the torque. This precession turns the axis towards the meridian.

### 4. Damping makes it settle

축은 관성과 precession 때문에 True North를 한 번에 멈추지 못하고 지나친다. Damping이 없다면 북쪽 주위를 계속 oscillation한다. Damping이 진폭을 줄여 최종적으로 북쪽을 가리키게 한다.
Due to inertia and precession, the axis cannot stop at True North immediately. If there is no damping, it continues to oscillate around North. Damping reduces the amplitude, finally pointing North.

```text
Earth rotation senses east/west error
                 ↓
Gravity creates corrective torque
                 ↓
Gyroscopic precession turns axis toward meridian
                 ↓
Damping removes oscillation
                 ↓
Settles near True North
```

> [!tip]
> 핵심 암기: **Rotor는 방향을 유지하고, 지구 자전은 틀어진 방향을 드러내고, 중력은 precession을 만들며, damping은 북쪽에 정착시킨다.**
> Key memorization: **The rotor maintains direction, Earth's rotation reveals the deviation, gravity creates precession, and damping settles it on North.**

## What Is Precession?

정지한 바퀴의 축을 누르면 힘을 준 방향으로 기울어진다. 하지만 빠르게 회전하는 바퀴의 축에 torque를 가하면 angular momentum 때문에 반응 방향이 바뀌어 축이 옆으로 돈다. 이것이 gyroscopic precession이다.
If you push the axis of a stationary wheel, it tilts in the direction of the force. However, if you apply torque to a rapidly spinning wheel, the reaction direction changes due to angular momentum, causing the axis to swing sideways. This is gyroscopic precession.

```text
Applied torque + Spinning rotor
              ↓
Spin axis moves at right angle to the applied torque
```

정확한 방향은 rotor의 회전방향과 torque 방향에 따라 달라진다. 실제 gyrocompass는 이 관계를 이용해 gravity torque가 north-seeking motion을 만들도록 설계한다.
The accurate direction depends on the rotor's rotation direction and the torque direction. Actual gyrocompasses utilize this relationship to design the gravity torque to create a north-seeking motion.

## Simplified Component-to-Function Map

**한국어**

| 내부 구성 | 하는 일 | 고장 또는 오차 시 결과 |
|---|---|---|
| Rotor/motor | angular momentum 생성 | 회전속도 저하, heading 불안정 또는 gyro failure |
| Gimbal/suspension | 선박 운동에서 sensing element 분리 | 마찰 증가, 자유운동 제한, 동적 오차 |
| Gravity control | 기울기를 corrective torque로 변환 | north-seeking 특성 저하 |
| Damping | oscillation 감소, settle | settle 지연 또는 지속 진동 |
| Pick-off | 상대 각도 감지 | 잘못된 heading signal |
| Follow-up servo | case/card를 gyro축에 추종 | master와 output/repeater 불일치 |
| Correction unit | latitude·speed 등 보정 | 일정한 heading bias |
| Distribution/interface | DP 등으로 heading 전송 | frozen, invalid 또는 서로 다른 소비장비 값 |

**English**

| Component | Function | Result upon failure or error |
|---|---|---|
| Rotor/motor | Generates angular momentum | Reduced rotational speed, heading instability, or gyro failure |
| Gimbal/suspension | Isolates sensing element from vessel motion | Increased friction, restricted free movement, dynamic error |
| Gravity control | Converts inclination into corrective torque | Reduced north-seeking characteristic |
| Damping | Reduces oscillation, settles | Settling delay or sustained vibration |
| Pick-off | Detects relative angle | Incorrect heading signal |
| Follow-up servo | Tracks the case/card to the gyro axis | Discrepancy between master and output/repeater |
| Correction unit | Corrects for latitude, speed, etc. | Constant heading bias |
| Distribution/interface | Transmits heading to DP, etc. | Frozen, invalid, or mismatched consumer equipment values |

## FOG — Internal Structure and Principle

FOG(Fibre Optic Gyro)는 rotor와 gimbal 대신 광섬유 coil을 사용한다.
FOG (Fibre Optic Gyro) uses an optical fiber coil instead of a rotor and gimbal.

```text
Light source
     ↓
Beam splitter
  ↙       ↘
Clockwise  Counter-clockwise
 light       light
  ↘       ↙
Photodetector → Phase difference → Angular rate
                    ↓
          Navigation computer
          + accelerometers
          + Earth-rate alignment
                    ↓
              True Heading
```

장비가 회전하지 않으면 두 빛은 거의 같은 시간에 돌아온다. Coil이 회전하면 한 빛은 진행방향으로 멀어지는 경로를, 다른 빛은 가까워지는 경로를 따라 상대적인 도달시간과 위상에 차이가 생긴다. 이것이 **Sagnac effect**이며, 전자회로가 차이를 angular rate로 환산한다.
If the equipment is not rotating, the two beams return almost at the same time. When the coil rotates, one beam follows a path moving away in the direction of propagation, and the other follows a path moving closer, creating a difference in relative arrival time and phase. This is the **Sagnac effect**, and the electronic circuit converts this difference into an angular rate.

FOG sensing coil 자체는 회전속도를 측정할 뿐이다. Marine gyrocompass/INS는 여러 축 FOG와 accelerometer를 사용해 수평을 찾고, 지구 자전율 벡터를 측정하여 True North를 정렬한다. 따라서 “광섬유가 직접 북쪽을 본다”기보다 **아주 작은 earth rate를 측정하고 계산하여 북쪽을 구한다**고 이해하는 편이 정확하다.
The FOG sensing coil itself only measures rotational speed. Marine gyrocompasses/INS use multiple-axis FOGs and accelerometers to find the horizontal plane and measure the Earth's rotation rate vector to align True North. Therefore, it is more accurate to understand that it **measures and calculates a very small earth rate to find North**, rather than 'the optical fiber directly looking at North.'

## RLG — Internal Structure and Principle

RLG(Ring Laser Gyro)는 삼각형 또는 사각형의 폐쇄 optical cavity 안에서 두 laser beam을 반대 방향으로 순환시킨다.
RLG (Ring Laser Gyro) circulates two laser beams in opposite directions within a closed optical cavity that is triangular or square.

```text
        Mirror
       /      \
 Laser        Mirror
       \      /
        Mirror

Counter-propagating laser beams
→ Frequency/phase difference during rotation
→ Angular rate
→ Navigation solution and True Heading
```

원리는 FOG와 마찬가지로 Sagnac effect를 이용하지만, 긴 광섬유 coil 대신 mirror로 구성된 resonant laser cavity를 사용한다. 역시 다축 회전율과 accelerometer, alignment algorithm을 결합해 heading을 산출한다.
The principle is similar to FOG, utilizing the Sagnac effect, but it uses a resonant laser cavity composed of mirrors instead of a long optical fiber coil. It also calculates heading by combining multi-axis rotation rates, accelerometers, and alignment algorithms.

## Mechanical vs Optical Gyro

**한국어**

| 구분 | Mechanical gyrocompass | FOG/RLG based system |
|---|---|---|
| 핵심 sensing element | 고속 rotor | 반대 방향으로 진행하는 빛 |
| 주요 물리현상 | angular momentum과 precession | Sagnac effect |
| 움직이는 부품 | 있음 | sensing element에는 거의 없음 |
| North seeking | earth rotation + gravity control | earth-rate sensing + 계산/alignment |
| 주요 관심사항 | 마찰, rotor, suspension, settling | bias, scale factor, alignment, software와 입력 |

**English**

| Type | Mechanical gyrocompass | FOG/RLG based system |
|---|---|---|
| Core sensing element | High-speed rotor | Light traveling in opposite directions |
| Primary physical phenomenon | Angular momentum and precession | Sagnac effect |
| Moving parts | Yes | Almost none in the sensing element |
| North seeking | Earth rotation + gravity control | Earth-rate sensing + calculation/alignment |
| Key concerns | Friction, rotor, suspension, settling | Bias, scale factor, alignment, software, and input |

두 방식 모두 자기장을 기준으로 하지 않으므로 magnetic compass와 달리 **True North**를 제공할 수 있다. 다만 고위도로 갈수록 수평면에서 관측되는 earth-rate의 north reference 성분이 약해져 성능과 정렬 조건이 불리해진다.
Since both methods do not rely on the magnetic field, they can provide **True North**, unlike magnetic compasses. However, as latitude increases, the north reference component of the earth-rate observed in the horizontal plane weakens, making performance and alignment conditions unfavorable.

## Heading and Yaw Rate

- **Heading:** 선수가 True North를 기준으로 향하는 각도, 일반적으로 000°–359.9°
- **Heading:** The angle the bow points relative to True North, generally 000°–359.9°
- **Yaw rate / Rate of turn:** heading이 시간에 따라 변하는 속도
- **Yaw rate / Rate of turn:** The speed at which the heading changes over time

DP Controller는 heading 오차와 그 변화율을 이용해 필요한 yaw moment를 계산한다. 일부 시스템은 gyro heading과 별도의 rate sensor 또는 계산된 rate 값을 함께 사용한다.
The DP Controller calculates the required yaw moment using heading error and its rate of change. Some systems also use gyro heading along with a separate rate sensor or calculated rate value.

## Common Types

### Conventional Mechanical Gyrocompass

고속 회전체의 각운동량, 지구 자전과 중력을 이용해 True North를 찾는다. 기동 후 settle 시간이 필요하며 위도·속력·가속에 따른 오차가 발생할 수 있다.
It finds True North using the angular momentum of high-speed rotating objects, Earth's rotation, and gravity. A settling time is required after maneuvering, and errors can occur depending on latitude, speed, and acceleration.

### Fibre Optic Gyro (FOG)

광섬유 안에서 반대 방향으로 진행하는 빛의 위상차를 이용해 회전을 측정한다. 움직이는 부품이 없고 응답이 빠르지만 bias와 alignment, 내부 계산 및 외부 입력의 정확성을 확인해야 한다.
It measures rotation using the phase difference of light traveling in opposite directions within an optical fiber. There are no moving parts and the response is fast, but bias, alignment, internal calculation, and external input accuracy must be verified.

### Ring Laser Gyro (RLG)

폐쇄된 광경로의 두 레이저 빔 차이로 회전을 측정한다. 정밀도가 높고 기계적 마모가 적지만 장비 자체와 입력정보, 설치 정렬의 무결성은 여전히 필요하다.
It measures rotation using the difference between two laser beams in a closed optical path. It has high precision and minimal mechanical wear, but the integrity of the equipment itself, input information, and installation alignment is still necessary.

> [!note]
> 선박에서 장비를 통상 “gyro”라고 부르더라도 실제 센서 원리와 heading 산출 방식은 제조사·모델마다 다르다.
> Even if equipment on a vessel is commonly called a “gyro,” the actual sensor principle and heading calculation method vary by manufacturer and model.

## Main Error Sources

**한국어**

| Error source | 설명 | DP 영향 |
|---|---|---|
| Alignment error | 선박 중심선과 gyro 기준축의 설치·설정 불일치 | 일정한 heading offset |
| Latitude error | 지구 자전 성분이 위도에 따라 달라짐 | 보정이 틀리면 heading bias |
| Speed error | 선박 이동으로 생기는 apparent rotation | 속력·침로 입력 오류 시 bias |
| Acceleration/ballistic error | 선회·가감속·동요 중 일시적 오차 | 동적 작업 중 불안정한 heading |
| Drift/bias | 센서 또는 계산값이 서서히 이동 | 장시간 알아차리기 어려운 편차 |
| Power/data failure | 전원, serial/network 또는 interface 상실 | 값 고착, invalid 또는 drop-out |
| Common input error | 여러 gyro가 같은 잘못된 GNSS·speed·latitude 입력 사용 | 다수 gyro가 동시에 같은 방향으로 틀림 |

**English**

| Error source | Description | DP Impact |
|---|---|---|
| Alignment error | Misalignment between the vessel's centerline and the gyro reference axis during installation/setup | Constant heading offset |
| Latitude error | Earth's rotational component varies with latitude | Heading bias if compensation is incorrect |
| Speed error | Apparent rotation caused by vessel movement | Bias if speed/course input is erroneous |
| Acceleration/ballistic error | Temporary error during turning, acceleration/deceleration, or pitching | Unstable heading during dynamic operations |
| Drift/bias | Gradual shift in sensor or calculated values | Deviation difficult to notice over long periods |
| Power/data failure | Loss of power, serial/network, or interface | Value freezing, invalid, or drop-out |
| Common input error | Multiple gyros using the same incorrect GNSS·speed·latitude input | Multiple gyros incorrectly deviate in the same direction |

## Why a Small Heading Error Matters

Heading 오차를 \(\delta\psi\)라 하면 좌표변환에 사용되는 회전행렬도 그만큼 틀어진다.
If the heading error is $\delta\psi$, the rotation matrix used for coordinate transformation is also skewed by that amount.

```text
Earth-fixed force = Rotation(heading) × Body-fixed force
```

그 결과 controller가 의도한 North/East force와 실제 선체 방향의 force가 어긋날 수 있다. 상대 PRS나 offset point를 선박 기준으로 변환하는 경우에는 reference point의 위치도 잘못 해석될 수 있다. 구조물 가까이에서 작업할수록 작은 각도 오차가 중요한 이유다.
As a result, the force intended by the controller and the actual vessel direction force may deviate. When converting relative PRS or offset points to the vessel's frame, the reference point's location may also be misinterpreted. This is why even small angular errors are critical when working close to structures.

## Redundancy and Comparison

DP 2/3 선박에서는 일반적으로 복수의 독립 heading source를 사용한다. 그러나 **세 대가 있다는 사실만으로 독립성이 보장되지는 않는다.** 다음을 확인한다.
DP 2/3 vessels generally use multiple independent heading sources. However, **the mere fact that there are three does not guarantee independence.** Check the following.

- 서로 독립된 전원과 data route를 사용하는가?
- Do they use independent power and data routes?
- 동일한 외부 latitude, speed 또는 GNSS source에 공통 의존하는가?
- Do they commonly rely on the same external latitude, speed, or GNSS source?
- 각 gyro의 heading difference와 변화 추세는 어떠한가?
- What is the heading difference and trend change for each gyro?
- Median/voting 또는 rejection logic이 어떻게 작동하는가?
- How does the Median/voting or rejection logic operate?
- 한 대를 deselect했을 때 어떤 값이 control에 남는가?
- What value remains in the control when one is deselected?

두 gyro만 서로 다르면 어느 쪽이 틀렸는지 시스템이 판별하기 어렵다. 세 gyro의 majority voting도 두 장비가 같은 공통오류를 가지면 잘못된 다수결이 될 수 있다.
It is difficult for the system to determine which one is wrong if only two gyros differ. Even majority voting among three gyros can be incorrect if the two devices share a common error.

## DPO Monitoring

- Gyro 1/2/3의 절대값과 상호 편차
- Absolute values and mutual differences of Gyro 1/2/3
- 선택·비선택 상태 및 control에 실제 사용되는 source
- Selection/deselection status and the source actually used in control
- Heading과 rate-of-turn의 비정상 jump, drift 또는 frozen value
- Abnormal jump, drift, or frozen value of heading and rate-of-turn
- 전원, data-valid와 correction input 상태
- Status of power, data-valid, and correction input
- Magnetic compass, GNSS compass 등 가능한 독립수단과의 합리성 비교
- Rationality comparison with possible independent means such as magnetic compass, GNSS compass, etc.
- Gyro alarm 발생 후 position, thruster와 yaw demand의 변화
- Changes in position, thruster, and yaw demand after gyro alarm occurrence

## Failure Scenario

```text
Gyro heading bias 발생
Gyro heading bias occurs
→ DP가 선체 방향을 잘못 인식
→ DP misinterprets the vessel's heading
→ 좌표변환과 yaw error가 잘못 계산됨
→ Coordinate transformation and yaw error are calculated incorrectly
→ 불필요하거나 잘못된 thruster command
→ Unnecessary or incorrect thruster commands are issued
→ heading/position excursion 가능
→ A heading or position excursion may occur
```

대응은 제조사 절차와 선박별 FMEA/ASOG를 따른다. 원인을 확인하지 않은 채 gyro를 반복적으로 select/deselect하면 제어 입력이 급변할 수 있다.
Response follows the manufacturer's procedure and the vessel-specific FMEA/ASOG. Repeatedly selecting/deselecting the gyro without confirming the cause can cause sudden changes in control input.

## Related Notes

- [[Environmental Sensors]]
- [[DP Controller]]
- [[Position Reference Systems]]
- [[Closed-loop Control]]
- [[FMEA]]

## References

- [IMO Resolution A.424(XI) — Performance Standards for Gyro-Compasses](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.424%2811%29.pdf)
