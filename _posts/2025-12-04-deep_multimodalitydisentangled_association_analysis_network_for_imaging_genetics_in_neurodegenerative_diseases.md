---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R6P3DNTP%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T040419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIBHQ%2Bo7RVSf4ysn31NYnBSD3Q1TJf8VYt8Tk9BFpKgkUAiAacnfQWWAM4aLJnKv3RMT3p5WewVWCddauhC2ltdxizSr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIM6kE%2Bjd%2B42UhDxAIaKtwDHRHWns1Kk6fnpQijR05th9LFeeuJK%2BcA3cywlyiqGJ3Yirpnz9QNcf8FNj7zaA7GQhcbRI%2FswLfGMXn42NAALTAg9IZfig0OV%2B4WbPh%2B8%2FWKcjrvy4Ft4DRZFVNZdXe9Bya8Yp7uZHeUxuAFQKnvHUnzJjG1aFeI9jGNJHRy2gkyIJZqmULz60cucWtnHM2Y1ZIwYuSwU3ugXCDSeSycF9G4jPCzrTQoGuPne54hYCNW%2F0j9gJoHFI8ZBxrywNp9XTIVn4jJNi80WoQjfyEAqLuNBnwuzZm33%2BgZs%2FQMt7TyrprVTEwNnkQ7yLcChIVC7vAb9Qh2JRnD%2FgeIEwL7bsQKR%2F89uL1I9udgPCZwm3d%2Bz7txYrbhkY9LVjOne6PRToBgXe5eQIYLzo1f5kpq8DRrVct6WYMtni6Buqk2e%2BrBSOVZpWSs1OopXUcjkn59Hth%2BUGJvHw4crCqYaorGaWKiA1tJJN8XnBjxk%2FO%2F9PPMp0Pd6HSsE9i1NY3Vbh216GhDydAZj0YIAqsYt2m3jGtK1c9E5mIMnw1XvezGdSKhAAuKtL1xwETVsWTH%2FD6PXIe5ockks2JhfCis5mzQ7isC2Jmec3RgNK8hAlgYepmLoq9jvT6SQfCgQ3owjJycywY6pgEwoDVon%2FzRONtJ0lbIwEkUx3Mokr4jdMqUaigNyNIzFhpFG%2FrRmMkQbl%2FFdQNSMJw1N6h8Qlpw3C4ioUpUXerPCWJUSCIYNpDIlcteZ2nHjfeKZCWfba6m6HjCp4ACwQ6SusxrWMysjHS4kl87VqlPUUBXLnnXWxjzdR6k0w83h3JCHhX%2FLVeKYs5urkC7Nryb2hbHH6JY3pEXLsuY6pRvHpKNLTDp&X-Amz-Signature=d6f55e888793c6989546ad0eec781c4f18a5d4f8201b93b72e13543273240299&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R6P3DNTP%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T040419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIBHQ%2Bo7RVSf4ysn31NYnBSD3Q1TJf8VYt8Tk9BFpKgkUAiAacnfQWWAM4aLJnKv3RMT3p5WewVWCddauhC2ltdxizSr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIM6kE%2Bjd%2B42UhDxAIaKtwDHRHWns1Kk6fnpQijR05th9LFeeuJK%2BcA3cywlyiqGJ3Yirpnz9QNcf8FNj7zaA7GQhcbRI%2FswLfGMXn42NAALTAg9IZfig0OV%2B4WbPh%2B8%2FWKcjrvy4Ft4DRZFVNZdXe9Bya8Yp7uZHeUxuAFQKnvHUnzJjG1aFeI9jGNJHRy2gkyIJZqmULz60cucWtnHM2Y1ZIwYuSwU3ugXCDSeSycF9G4jPCzrTQoGuPne54hYCNW%2F0j9gJoHFI8ZBxrywNp9XTIVn4jJNi80WoQjfyEAqLuNBnwuzZm33%2BgZs%2FQMt7TyrprVTEwNnkQ7yLcChIVC7vAb9Qh2JRnD%2FgeIEwL7bsQKR%2F89uL1I9udgPCZwm3d%2Bz7txYrbhkY9LVjOne6PRToBgXe5eQIYLzo1f5kpq8DRrVct6WYMtni6Buqk2e%2BrBSOVZpWSs1OopXUcjkn59Hth%2BUGJvHw4crCqYaorGaWKiA1tJJN8XnBjxk%2FO%2F9PPMp0Pd6HSsE9i1NY3Vbh216GhDydAZj0YIAqsYt2m3jGtK1c9E5mIMnw1XvezGdSKhAAuKtL1xwETVsWTH%2FD6PXIe5ockks2JhfCis5mzQ7isC2Jmec3RgNK8hAlgYepmLoq9jvT6SQfCgQ3owjJycywY6pgEwoDVon%2FzRONtJ0lbIwEkUx3Mokr4jdMqUaigNyNIzFhpFG%2FrRmMkQbl%2FFdQNSMJw1N6h8Qlpw3C4ioUpUXerPCWJUSCIYNpDIlcteZ2nHjfeKZCWfba6m6HjCp4ACwQ6SusxrWMysjHS4kl87VqlPUUBXLnnXWxjzdR6k0w83h3JCHhX%2FLVeKYs5urkC7Nryb2hbHH6JY3pEXLsuY6pRvHpKNLTDp&X-Amz-Signature=d6f55e888793c6989546ad0eec781c4f18a5d4f8201b93b72e13543273240299&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLMJG74M%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T040420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIFIHj6j7OxRm7z2EaHFScAzFAAKipudSgK4%2BB9ipCEaRAiBRArkAmSxkraxOfxaIEAlojl4h8ka5y6b7%2FBRwcEMkEir%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMIajHRAlOMB9GaeoJKtwDtdbpeVgahsK6EttW4Y5VejL2U9cWldMq97xM8ZSBvCRJ%2FWDwMvhKcWdkZHKzpT3Iq32QqXcu1K1OWaI7dOX5ujNbv9xpYYD4HcKuzo0iDDpRcRhZdhCzxnhCF52cD%2Bo9lNppP%2Bh%2FOPsVY8CrAXN2%2BBPNLfcO6QPV9Dah6xq7INNuhVXwYN4zt0yLXOVoKK85UwOD5R6OS4L7Z5pglAMAUeTCUltY6t229fE6U19e7IcLWKi3YOx7OiJrkVXlRcRoS3NH%2B2OMdAEN6el4fq2DoK9YnZcT3Y%2FTnGcQoA9Aa7yyXwgAw%2FowN1EVGrR2fXZk2Atp5DdcxPmiZ8oyu1MhSbW7Xtc9Y%2F5apDKx9cSUqr9Y8f7P6rOHB0%2BFE88oX5CqvAeZ2KCPv7TEodcuhpUIT4Ge7OV1h2TACqFfoe%2FcSutECEqxsqx3cp6D8EzITDBeDM%2FQQu0qIWbmMqFwWkHmterHHxF6gjHUOwm%2FrluMYeqv2vqKxZljLKEQH1FR0zBg98Lrrh5xhBTlDsLVRVGUnGzLSaWovaPYZCAjsghZ0ZpXMHxwcfAgLTs1Jm5hSBIAXFHMNCJmzSsNnonzmMvrOYhey%2BgAhnBlUBplLzPcIrjGeQqxzQOx6j5fsV8wqJucywY6pgHcQDVH25DrjA5SgU67g2Nd%2F%2BfqH3EV9SHyotWlH7PzdHI7oYKk3FY5c9wJ8Kx5su9gMq4rtw%2F0Y72sWWnZBpuxD5eh7TAIn%2BnLPU1XDHwjOtGS1bkznc36q5jqBd42CaxZZu0XK%2F3UOAlXeZmaUugwppP%2F4o7CB1LE7vYGlOt9JDq7Crz739U%2B3FqmWxSFOT%2BZn%2FR4IIlMZJu5FfZ6FAI8tWhppeol&X-Amz-Signature=282b81a3e20a5a03d8a59e3b9d5c87bec8d8a69bcd0a068f5e0abbe7ed159056&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZWFRPFTD%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T040425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIH8s6XSGdq90sqeCjBIlkYwAXf%2F7etsrQOxGByNST1pAAiEAg5JyeuWsJLiXlInhU5VGu3XeeN2PyNvaT0A2Om%2BzyRMq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDDIQvL3PmMjzoE3FlircA8Yo3EubcDcQMhewC1foSCFvkJXTXZM%2BEetMm19C0wS9R27fxGEeI884vfkj%2B1H8xT3y8WumzafukY67ILp94hfaC0ckQbAyRxNbYsRGNkZmIjHuxaTflcw%2BWzscLeuipfsJ%2FPLNJw3g%2FdOHTSCd9RvFGmNPb%2FnWZHLtaSwMJ5HkmvtmhGfmmfj71GRiuD5Dv2%2F8bZbssm65cIteRltG4IqL4E3pGfqwmnJykM0agkZV4oip7U49AD0VVSna1vxBnukkhY2c7FM9UMqH68U4wCqqsWWV7z2QfRpz5Wa0iiE%2F%2FChoZTiOWclic%2BOqvylVKNOiOXie7oGnzp0PsgB2TSFV2foemb%2FfCURkID4%2FLlIoCdOKGBp7uLhSBUOlR%2FSrMxplk8aANYbecEyoDfr7DHYDubpWh3VLaEH21rLxTv8mXNstPddv21jfoBWV2gtoAgDkpQTNKksKERqDzN92L2vr8mMGWSEoZWW8oGbQ52IIxB%2Fo5p0lVZwuNeKDYad7Nny2GVGHM%2BnzYo76yZ5icOIo2d6mBepCR8LwfxjfhmQRuMV7YfVC7vYmrq%2BaSNwvp9E9kxRBPhossGzprjefGeE1sE01EqGXExFiXRr8bQh%2BR8m5OVLZumcvLkVwMOWbnMsGOqUB5A%2FLk4d9I4vDu7V8WZ3BF2OAw3BT0MquTVCEKvldnhQCkxGsDoDm13AZMJQrrtFyuLNPcQ7CiqucbxUTN%2FA89%2FzTUd7XF3vMKKx4GQhiv4N5h26vQ50yNa95jSilSwqHPjMEc6Y075C%2Bl24DdgjkJ84lSug2pSmQM7%2BKZvcwrxWjV5zJOfFIeIKhb2nDFGR5sXkfsdi6sI8gM7mSVnk8M4suqDtD&X-Amz-Signature=1c7d640b4cb49f482e008cd74c04c75fa502ba0e3e2cb5757c0f7bc6609794f6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZWFRPFTD%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T040425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIH8s6XSGdq90sqeCjBIlkYwAXf%2F7etsrQOxGByNST1pAAiEAg5JyeuWsJLiXlInhU5VGu3XeeN2PyNvaT0A2Om%2BzyRMq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDDIQvL3PmMjzoE3FlircA8Yo3EubcDcQMhewC1foSCFvkJXTXZM%2BEetMm19C0wS9R27fxGEeI884vfkj%2B1H8xT3y8WumzafukY67ILp94hfaC0ckQbAyRxNbYsRGNkZmIjHuxaTflcw%2BWzscLeuipfsJ%2FPLNJw3g%2FdOHTSCd9RvFGmNPb%2FnWZHLtaSwMJ5HkmvtmhGfmmfj71GRiuD5Dv2%2F8bZbssm65cIteRltG4IqL4E3pGfqwmnJykM0agkZV4oip7U49AD0VVSna1vxBnukkhY2c7FM9UMqH68U4wCqqsWWV7z2QfRpz5Wa0iiE%2F%2FChoZTiOWclic%2BOqvylVKNOiOXie7oGnzp0PsgB2TSFV2foemb%2FfCURkID4%2FLlIoCdOKGBp7uLhSBUOlR%2FSrMxplk8aANYbecEyoDfr7DHYDubpWh3VLaEH21rLxTv8mXNstPddv21jfoBWV2gtoAgDkpQTNKksKERqDzN92L2vr8mMGWSEoZWW8oGbQ52IIxB%2Fo5p0lVZwuNeKDYad7Nny2GVGHM%2BnzYo76yZ5icOIo2d6mBepCR8LwfxjfhmQRuMV7YfVC7vYmrq%2BaSNwvp9E9kxRBPhossGzprjefGeE1sE01EqGXExFiXRr8bQh%2BR8m5OVLZumcvLkVwMOWbnMsGOqUB5A%2FLk4d9I4vDu7V8WZ3BF2OAw3BT0MquTVCEKvldnhQCkxGsDoDm13AZMJQrrtFyuLNPcQ7CiqucbxUTN%2FA89%2FzTUd7XF3vMKKx4GQhiv4N5h26vQ50yNa95jSilSwqHPjMEc6Y075C%2Bl24DdgjkJ84lSug2pSmQM7%2BKZvcwrxWjV5zJOfFIeIKhb2nDFGR5sXkfsdi6sI8gM7mSVnk8M4suqDtD&X-Amz-Signature=30b93a641acb806cad25bee72f3e7ee60006152aa7de004cf76122824ad44ced&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XKPBCRY5%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T040425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQDmWAH0vDwR1RmEnrvAeGNWAVd%2F9nSCHs%2FrAMhVZCxl%2FQIgbg0wI5vPybxnDmf5f9F6oHi%2FK10KotF%2BOB5uGe35X%2F8q%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDH%2BflP9ocZLoNFTYoyrcA6sCjeHUjytgd3MGTkpen%2BKWMODw1ltDuJnipVZLrxLtqRtHzfLUT79UiowtvfLg4ruzz00W6wsdk58YK0jzxbsrrUCGRfnumyAIWSs1rokGRVcC1v6Y3kzKeLbC8%2FofujXYwuehLZ%2FZFF63v8ra6rRNDOPQX%2BOBXkCF%2BhXwzqI1%2BSi2Ie%2BSOI6gO6psCVjCUGrVd3vis5OZVh4bI1lROQajYygCPbGBNcyi1Lk39VDRzSB8Y%2FwRnWWQIfD6NBrmOae3w8DPYRP6h%2FczjmI8QvwVLJQg8afMluQl%2FA2Qdz9PGkvaLIBkyumxw87zs303pRM%2FTYNyGExGEgBzPPsbTDtdfUcatSUwSi3TCnJah0q84UdhycAoBmBuDnFw2kuaAhY7AtxILYY88ceJC83BU%2Bjl1bNEXcewSOBsYE94jGkoxpP%2B%2BcDmI30aVm%2BY62rZIEWbOjhhyUFt7xDCUmR%2BGZJfPxqEw03J8rtCCf9Oc0LeGb63p69qV5MbPiVRyuHXBimPzMGFQLJHT%2BxKBh8cgw9z7V8fdWLbU91T4oO5vRKm%2BLUmMlg3Oy6eYrhTJhoyj15hx2X87OL4p2EKaIFKEfR7ymiiujsyGMrbldUJLuaCeNB6RtAo4XSlDUCGMM2bnMsGOqUBcdkakyEIEqwB79icnlTFm7%2BEH55HFNtGVNu5f0KskxZl1tT8%2FJgt%2FQUv5OZMDYDwi2RNeEVjQfrY0IEc71rGwDvl4SbMAsFKDkEEfXxBiVoYL3QPTjIfc9OgbH5JPMPi%2FE8nOtFwCJGUv2uv4T0tUVDu%2BbDWr6RJ3CusXnTzMP0v1aAI9UoAElqNeAMsZwvyLjiIenXbOo2VYD%2FvKTWkHdIs4J3f&X-Amz-Signature=0f2ca5242589b500b4b5edcb784f0c0c6b01a74ba4826476a05390bf250d0b4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBBKMPFR%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T040427Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQCM1pB01hAuhbhBZrYUIDQol7YvYsfRpTqdVTEBi4or5QIhANA04O4iBT%2BKZQt64%2BHROaisUQA9FrtNab%2FiEXPnGxL5Kv8DCBUQABoMNjM3NDIzMTgzODA1IgwYUnC7gjlstVXluckq3ANIL4GpS%2FGa1kBQXaV8gbouQjUl41f12yMqMssIhhf6cpimYdot0AtA78b%2BlJAYDiEgwLoh7IoJ7vW5NGGxWJMPSDP5CRxeViDOOUdFRvjrIMtujqQGX%2Fi7ThHsqDqWco9EQHL%2BY5a8I6nQ6qtGs3HGpy4poXQQYBYMsjHaxQtE%2FMRQ1d%2F%2Fb%2F2gqGIwFqyRZHmehWTWqXtKOMSJQ24D95ueT19Z%2BH1UpgI33uK6%2FA0cRb%2BT4rYLWf1Wy8facueoVnfHVgAREBvsd7TRzZxCN%2BKXIMiGFLRiUuo8pZs5EFCO9%2BiYnB5OcS1KbdBY7iSvkLKj%2FIoWw61PoocGNEUsFkXVMr1QU6mEVC0Msth45I%2F33tF6TTPfWYf9Jddke7UmZzeM%2B%2FLkoTvMfLATgB3Ye3LZPB8%2FP%2BhUuk7AYjwGSH27TtR2buf9ENxVToUsJBiba8t%2FEJ9Hekc%2FHIC%2Bck6NSNLmpnOmx4l%2BZfsnfq4Wzv2z9A6CxauQ6HTovfO%2Bk5W5IzMLoCi2S3nJJN01K8Qsze8UmdpzocP5YGQ0xGVlb2e0CAzkMLJFKydUUJ%2BB7kqwYt8s%2FHJC0pEk2tWi9Sn74duAQhu4eb%2BAed5BaUH0yo%2F8rvH8YMFR1f3BNgDL%2FjD2m5zLBjqkAc4zm4DYM%2B%2Fnky1fu1PcXtW4RLK1zaQPU5ZkVlni0zQRvsdMXBsoI0XhYIM%2FjGk3A%2BkDAoIZr9LAqVsY8SvQ8XuU07xIB1JHeyCUPpp6HbVF5Z3%2Be7Y0UJiPVHD2mO1XL05acR%2BwhqrGc2KUP%2Fu7F%2FURGu%2Ftssyf%2BmiMixUtaie3CjXsaATqTslH%2Fy3SLMn0%2FmA%2FVUQCMIJ%2FfohAUwHrFmpDKu8a&X-Amz-Signature=6e792b4af4f02d671f6933d19c4864c52d895aa7a220169d156c930361889fa1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZZQDFQV%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T040428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIGJv6ntVQ3Ukwu6Oa5V31GWsNDO5CEjl5jUonbv7RgPjAiBl03k3bYDLo6su8AHmOvJaiG%2BAOvAqqAifw1zkSc%2FjISr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMb4NRSLct%2BvblW5G8KtwDG6wWgc1TyS8QgEjCshLh%2FKyBY2qUVH%2BkbYqz3JG6jM6tGBViBQBMrJBtkEYYOvBBO5hCFux3yQkcRhks6b6P9v3yqbK9O8Iz90945v79oT3m1Jsqs2jDu%2FMH0z%2F%2FnwZ0PWd1QR9fEer4lDOt9O76MQ4u4YUvUJd0jfRNgbbh7PpyiOsP4iBC6JxWcoxkwVTGLa6El1Svd%2Bg2zFrKQiPD1StlqrSB7%2BODipHozmRwX5Dwx18se3x63vtNi3OxIQ20ECSEdBLIqjs6UCy4weGy3%2BneKsnpeg%2Fxgtg6B31nvYUr6Q7eQfAu0CxzIAHltlKYc1SBGhiR6I%2Fb3tK%2FamRWdub%2FkYPzdWv51IOHL6UOv1ZPBrJvSron3AXbp2P06%2B%2BBMQ46VG3st05gDFx7qjp3RUkl8xtGDt4B4NXbdCIN7DSoeTc57yce%2F0LSdZUyR5FZ0Qr66wPi0wz9OP%2BImppc0LsF0BVkqHUKtNwxQ8k5WUERqNF49Xco4JlSxFHnxfF0MUJQmXkJq%2FEZCm5zQcWqMrB%2BS8dNM7NDHNrHC%2BRddPZ%2BqsFRJyNUjWM%2FFisMdVgRO%2F01OO4RsoEvn6ddaWQDD%2F70T1Ys7ulyOLyDL9bPujlOSpIxojNsKv0N1zIw%2BpucywY6pgHfphMoK%2FILiL%2FItMaiDaoyz20IVlF67o%2FTKWBuVvHkvjsqDArHSfopBK5SNEd0ZNdCQ%2FLucJYtiPDIQJ8FbtqBSsxOeEjbwdNAPzlF2ViBg4CX7404SwaczeQ7%2FeCnwVHmNMDgU%2FiDQGdpWyBt0CtzMwOQmBqMlhRkXBOARgPzr%2BUH0wF%2Bmav1bvtITgaHurc5BA5sPAtfZQ0exUvdDVNZNnoeQXIY&X-Amz-Signature=cc40ddb7a59ad007e797db42e6b28743b08bb45ed0bca980dba53efb9014ac21&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GB5NQLH%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T040429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQDQHSoUrksE5k0lM1IrHes0JMut2%2FyfaT1UI93PLukklQIgOVDjgW1fNFBsxnR8qb3pk4rkDMted9cgYza8BcM4Nu4q%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDPwnxJX%2BTOd7L5yPmyrcA3aibZb6cIkXkligVGH4O4q2x%2FzXypbttLiS%2B%2BphRppxO2kEbUhaLsE0gNwrTT4hFcAbRzyBUGXktEf0Ai7JlyfKf%2FpkF4OZB1HwTjhD0ja39QhWWokKN%2BvKbMruMCiJg46F6By31ggr9hHrfuOYfgZebPbgy%2FULLJnx4mQQRO6LXmlMzOTmvRrUxSiPkMChNsf2yvLLhwHGLS6vhrcPFCdkBYuWJayB2m4E8YZefBd%2FpbGO4tPJTWc3cxO7%2Fn%2BFd%2B8HLznm2QmPDSWMo%2Fkq4ePIJqcwjCgRep1P%2FsQxQykNjpiOWaLr13z4RFHzvCpKG4RmwAjmsHCbYyG2jllHMpfTAo5kt1v%2FEDK0WOi5OEbe8LdAx3f3s1Flc5qxqQ47pCkQWCCUQA205UBc9etXHojiXm3Y3v1jzMq9LiKUUdYjupfqAujuIwmzCXv8pR%2F5bd7qMXD1Y8D2EHdK2R3g0At5pxTEh55aEf%2Fl0%2Fg9jOI%2BkPUnqugHqsMnwEQDaYZsxz2nroUGolJXcUfYkamLN8Yqf1Aah72GnN8oqpFU1Qqf8zMeUYY87SbnZIp4DC%2FxX9u143oHN5xAC1mhboR4la85VUK8B6562x%2Bzg9febaGw2iDOCWj%2FOO4yb196MLWcnMsGOqUB619eqL3twvQ1OHcB%2B%2BjiauOwF%2F%2FxVQjpjfdfHKBS54f6AjhLtCdQCyjXsaqHvsfsbHJQFN%2BKHgAgW6Mk%2FbXcJSzG1mwGZDZxqZQBczvwEaNh0%2Fj2aByVIKjeEkKjW4IoRjljFOwSFddUU6ReEln5Ai2NkgCBJ2CjyKRH40Q93%2BHw0j%2Ft1q5gvp1dUpPaujv%2FD8WvzCHkv%2F72z%2F86Jmp5dE2nFNBa&X-Amz-Signature=8e1a2426071e01a8ebacecb3b0e6fc3fd89424f53b61148f88ba55e776300b0c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GB5NQLH%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T040429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQDQHSoUrksE5k0lM1IrHes0JMut2%2FyfaT1UI93PLukklQIgOVDjgW1fNFBsxnR8qb3pk4rkDMted9cgYza8BcM4Nu4q%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDPwnxJX%2BTOd7L5yPmyrcA3aibZb6cIkXkligVGH4O4q2x%2FzXypbttLiS%2B%2BphRppxO2kEbUhaLsE0gNwrTT4hFcAbRzyBUGXktEf0Ai7JlyfKf%2FpkF4OZB1HwTjhD0ja39QhWWokKN%2BvKbMruMCiJg46F6By31ggr9hHrfuOYfgZebPbgy%2FULLJnx4mQQRO6LXmlMzOTmvRrUxSiPkMChNsf2yvLLhwHGLS6vhrcPFCdkBYuWJayB2m4E8YZefBd%2FpbGO4tPJTWc3cxO7%2Fn%2BFd%2B8HLznm2QmPDSWMo%2Fkq4ePIJqcwjCgRep1P%2FsQxQykNjpiOWaLr13z4RFHzvCpKG4RmwAjmsHCbYyG2jllHMpfTAo5kt1v%2FEDK0WOi5OEbe8LdAx3f3s1Flc5qxqQ47pCkQWCCUQA205UBc9etXHojiXm3Y3v1jzMq9LiKUUdYjupfqAujuIwmzCXv8pR%2F5bd7qMXD1Y8D2EHdK2R3g0At5pxTEh55aEf%2Fl0%2Fg9jOI%2BkPUnqugHqsMnwEQDaYZsxz2nroUGolJXcUfYkamLN8Yqf1Aah72GnN8oqpFU1Qqf8zMeUYY87SbnZIp4DC%2FxX9u143oHN5xAC1mhboR4la85VUK8B6562x%2Bzg9febaGw2iDOCWj%2FOO4yb196MLWcnMsGOqUB619eqL3twvQ1OHcB%2B%2BjiauOwF%2F%2FxVQjpjfdfHKBS54f6AjhLtCdQCyjXsaqHvsfsbHJQFN%2BKHgAgW6Mk%2FbXcJSzG1mwGZDZxqZQBczvwEaNh0%2Fj2aByVIKjeEkKjW4IoRjljFOwSFddUU6ReEln5Ai2NkgCBJ2CjyKRH40Q93%2BHw0j%2Ft1q5gvp1dUpPaujv%2FD8WvzCHkv%2F72z%2F86Jmp5dE2nFNBa&X-Amz-Signature=0f3a3c0e0c0e8b2bed24646a4db229d6aeb3e8e355b4f0e534e145b5a333dc1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4OR3FRG%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T040413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQDjTOgPu%2FMvGn9dekbNBDweB8%2FE94sKMbDE9jeg%2B45sPQIhAOa4RuIr27e9GSjyRn45deTskK%2F4cTLUQlNgyc9SM3gZKv8DCBUQABoMNjM3NDIzMTgzODA1IgxonZKDFun9DnqS3wkq3AONRAuF0G2pu3p95tTzq2vZNTqJ0NEOuE5e6juv50syWijRtFgiGIW7Woq7HeYpQGGOTlv2xTjzi1a6o%2BDHt9TSI8mTlWou%2FX5SdrzwVfN513pH9moGlwIxtHQO7SdSyBuWLVdcu0o%2BS8dFWTqBxp%2BLj31kZVCtxsXTt9w2GhvvgkHArn5z0AiFA97OS3xCcSjIBwre3a8hgXN0Qu54x0210jeKzenVc1uIEDXLeMh6xo1QyMXPpBEkVliwU5g5AhxCVB7Ng%2BnbBbnPX4HLsP6q4120g7XSHYDJuumFVfwLPPygtGjXcf5F7GHtXe1OIThnQ%2FfNKo5znvA2JIniB0GsmZYyVBVxXEPwtVvg%2B2ACdHFT%2FuBLepAzqQrACT6rNU1ZYqWVqnEOmGGUW6%2BvlDW8yK4Cg3IlvrlbFPFcx8srkVVXelGMfh379WwxxdcVfjPvAh0eZw14OV4Ui308H%2FH9cLLPRS0jh%2FcgYtNJlUtttU737OIR68V5DrhTP6LtX5gPs8WqfTLO%2Besz50o6QZx%2FwJf%2Bekx%2F%2Bf9q5x2xtO5YhPLpFNUu7VDA7LJ4JF39NquGlVEU1SUApPcMCOxptR5lyYPAldjoBVuIoLp%2BlDo9razQsJ0vyJKzd6mJkjDRm5zLBjqkASGyZ2Q7P297FTFD0jBHjdcjbFpTmRQaE2htxFtoQgZsX5N0HCXjE4EPs2DXAXvQd8rOMocuPDQjOW9PaN89J0ulyKY4k5NUjvN4gsouS8OBZX4orT7H0sT%2Fln8OZSYBh%2BwXhIHkAsK2v1Efk%2B0ELYE49FZADS5PVHEBJ4hfrN7Jquci%2Fxy9wHYMSxFLl%2B6zh1gWO9sdN4JuFe%2F%2BnJDcauPVwRQf&X-Amz-Signature=a9ad08e04628e4bd1ab3a8270ded37a8873e1a3f8cb71743c15b827d745b1328&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SVP3NTO%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T040433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQDvBaL9GI4xTUJY2M2eNFFrKWdqXeX%2BxvQINrkyCJcfcQIgQYj0T8tNIzAVoJHFp1mgXLeFNr9qP1zKVZt6BtUw8lUq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDJ7wdT%2FdksTGlGByTSrcA9iQv3D1txBmExzssXHhmMQjJa1V9BTnhDadJyBQuPP%2BQmrQvE8gFH%2BYqz%2F6zlcjpgRXmF0%2FVpT4LoCl643pifuJi%2B43ZNjpCCw8znbV2%2F6hm%2Bu2bdJQrh5eAjrYsyVUTwojCPMiozrVryhSiDIG%2FEDs7DNE8jOKmM%2FqYMym%2BJQoMIzydaMN76SU5I6kdUsb8%2FKgJjV0AdaUhCDvVWwUIK0YiS6U75sHy6YOd7JH3Tv8zle0QDwtRxig3GazqCsLPsJCYSTwXrFD4R%2B9CPnRmVvAfbXRbd%2FQ8xQXB05FpYR5%2FlTZuo8gY8SlILitowts%2BZrEiRj%2FYEppabJx5Z1DLQsgqpaUW%2B5lY3PGs5Ws9cWGSDAwkoA7iIdktxms0g3u73iCSYglJLtgQxFrRumqHncaQPHuT1Qjq6I%2BuPdHnvRisWpiwRzeBZB58X2xAf0OLVV%2FjDC9cTCV5qlaDCnAHQPz72fhCBx2sMd7mW6qOer8R3Q2B4QJyPB48xWf%2B7oItRegKFV6%2FeVUIsQp3yx3tmxlJiQDyA1jmJwvPIXdElkt0vHQgeF1QjecViuczUNANEEPyQXH75YiYdDksB7dAWJzTcIabgg%2BHhejqwB4NPuoHRwVoTrhN7L9SC%2FLMLScnMsGOqUBHAwNell0Uz3i9ANSp0sf1pjK3PWckMGbOxMB%2FWWGJNHdsyFNtnMPTgHRlP9dbrCX3DGENixXK1C2UXiD9CThESSnskP7dKgrP8I7rb%2BAYbQjYwllWHPYzvyry2sCsiIH8hLO0oJbmXOWT%2BWEr%2FYy0loLDg7shY3bB%2FwWbNsKSv4iw02rJdwsZFIhCuOo4h26OPm%2BwL35ht4Rbj9Dsd1E0vcEwg%2Fk&X-Amz-Signature=edc2bb90cc10f3d0a40c7d639007ba316cbf4e3837bf611826936bad6e171f60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SVP3NTO%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T040433Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQDvBaL9GI4xTUJY2M2eNFFrKWdqXeX%2BxvQINrkyCJcfcQIgQYj0T8tNIzAVoJHFp1mgXLeFNr9qP1zKVZt6BtUw8lUq%2FwMIFRAAGgw2Mzc0MjMxODM4MDUiDJ7wdT%2FdksTGlGByTSrcA9iQv3D1txBmExzssXHhmMQjJa1V9BTnhDadJyBQuPP%2BQmrQvE8gFH%2BYqz%2F6zlcjpgRXmF0%2FVpT4LoCl643pifuJi%2B43ZNjpCCw8znbV2%2F6hm%2Bu2bdJQrh5eAjrYsyVUTwojCPMiozrVryhSiDIG%2FEDs7DNE8jOKmM%2FqYMym%2BJQoMIzydaMN76SU5I6kdUsb8%2FKgJjV0AdaUhCDvVWwUIK0YiS6U75sHy6YOd7JH3Tv8zle0QDwtRxig3GazqCsLPsJCYSTwXrFD4R%2B9CPnRmVvAfbXRbd%2FQ8xQXB05FpYR5%2FlTZuo8gY8SlILitowts%2BZrEiRj%2FYEppabJx5Z1DLQsgqpaUW%2B5lY3PGs5Ws9cWGSDAwkoA7iIdktxms0g3u73iCSYglJLtgQxFrRumqHncaQPHuT1Qjq6I%2BuPdHnvRisWpiwRzeBZB58X2xAf0OLVV%2FjDC9cTCV5qlaDCnAHQPz72fhCBx2sMd7mW6qOer8R3Q2B4QJyPB48xWf%2B7oItRegKFV6%2FeVUIsQp3yx3tmxlJiQDyA1jmJwvPIXdElkt0vHQgeF1QjecViuczUNANEEPyQXH75YiYdDksB7dAWJzTcIabgg%2BHhejqwB4NPuoHRwVoTrhN7L9SC%2FLMLScnMsGOqUBHAwNell0Uz3i9ANSp0sf1pjK3PWckMGbOxMB%2FWWGJNHdsyFNtnMPTgHRlP9dbrCX3DGENixXK1C2UXiD9CThESSnskP7dKgrP8I7rb%2BAYbQjYwllWHPYzvyry2sCsiIH8hLO0oJbmXOWT%2BWEr%2FYy0loLDg7shY3bB%2FwWbNsKSv4iw02rJdwsZFIhCuOo4h26OPm%2BwL35ht4Rbj9Dsd1E0vcEwg%2Fk&X-Amz-Signature=edc2bb90cc10f3d0a40c7d639007ba316cbf4e3837bf611826936bad6e171f60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCOWI5PZ%2F20260114%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260114T040434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIBFhHOW%2FK7etNZCGae%2BHkZwaYkESlUq7AMfJtZZI8ab%2FAiB1k%2Bu1YCElSk%2FUhdzSeLXORfZnGmWNqNQWOi7I%2F84PICr%2FAwgVEAAaDDYzNzQyMzE4MzgwNSIMu7LbMiSTCLWXdwQQKtwDUJGcsniNAN7E0v%2F8NaI09kIw%2BCxkjbIalt4qy3A8tg3GYhaw4cQfTW8VE7MiScQVgsb1ZBAyGVlKgloya%2Bvocwxu4d6OrwzAbzTpTZM6iw6jvH9tk7gJBz85lFDghawGf1EYumkhOUB%2FyNxZoZEeCdSFS9NzFfgbTUya8UeqJDNLHRI83IUuTMdkErU5bu4Ljl4oaZNimjfCRrRMQUaQdCLVP2Cy26VihvEkq348VJSPyKOo5Xm9rCsZdw9wLI8IoMnq3QfbnBT%2BDZVdigA4KLVoML%2B10JAxLJeHbaw3PFtO%2BX%2FTZeUfkzp4zTv%2FlhZYeF0uH%2F4L5mpjV1SGRwTP2JnzntBsuYyBYGoob9GtREGlqyA3OcJhlwE23DxIHNLBPlqJttkCeu5deQk0OA%2FDHJ8SafsThwKccE7d%2FStpXeFbLK6BqhxYMl%2BXG%2F02m9mUq8fp9b39QZ19e53rEzM125VQYA3r8aTTTmu%2Brnwo7%2B8yemO1Gzne%2BP%2BsuKSfgCZpykLmi2ceO6bsJCb%2FL9DsesW94ENmCnOfANSSsFz7Fk%2FDfPCPSuxZsvp2rupxFx6k8L3V6Z5YdRKwAM7yPHUwvCciaB%2B9cBHS7anlEdE%2BfCjlLH3XCZOlTMPkUKUwxJucywY6pgE9UAADeu8wUq1IXBEfkWI%2B9HlK%2BfrBaHVhuYgh7WrRzj4uvN9RkoDtVYkdhfgG1FB0c5xE%2BQwnQ%2BHnx8mMM0vZ7Pcml02bLoQpyjw3I5Pf9vJjXUEcK3l3rQNMtY3brqLgqj8QHDY9uoZtNIOqb%2F4wwizRLJ%2BmcXWZA0Ec%2FO5%2Bky3uZUeh6Me51EkYBMUgkw5B15a1l7w2t2GstbOU3Sb1adEmG1fe&X-Amz-Signature=aa47f984361acb6f15254a7fb84ccbf6197d57d4c0603e06442c7f0ff9ee8c81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

