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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635AGJOV5%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T060437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJIMEYCIQCSkDXecLq6bYvKEjzrKJ%2BRlUPxBetsPmDI6ru15V2LQgIhAIlh6EIgIF6kWzwCnkraajMk4MIr2CuV24CQvirGOWmnKogECNf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyjDYeQXNQT7vmcQj4q3AN5h1rC1eBFqW%2FKMwU0dFROvA1XhwHDKxxV9bo%2FolpHhBhnP24P3vfcZxrUujl84XfIwWASnYpOamrndLXsu58tUMUdKJXrHGfDJIX3lM1Wloorhg221J6EmdhwN%2B4vgIl4Vj4VPsidp1GhWUUueOSfMplNw7PiwudaaNIAVkirP1WR0MZZzhLCeOUuK8Va5GJ96iDDhn2g9g5HR8OL%2F99ErS4H%2BydKpr4srY2wHdh%2BUBc%2FiQNniv8FfAm%2FTsCZLEHpg8H0hrw9e87O97K9jJr1qFWuY92vpCLBSlorOBWwAdRBq3aktSd7Cc0t6W%2FdvKKPqslrDZRvIVxFx8yilf0rpMqztiX79SVCnO0v6eG2kn%2BauK4OhdHYMmd69NeoyfJafeAuY4PhtDf5vj%2BqdmFRUcHpTRxwDFS8FgJrbyAl%2FfeCV%2Bzwb2PMadUuXcXzv5tda69tjZzEJu4nsNcLZoqhTymZP7z1t5JDxnSSJ4Fdc%2B2cp7XYAykiWu2C789kmU9HnHwaXEmOZFRUPnisJuJZz1jxsGrR6dpR4B59UQwAHS8Cx5MgLAjKKnEVIXoCSN4jOiyKe%2F2nMGJJ2bamkDcMo1tNxVgj3IO6xKPonNxExeCfeIdAvmgKD4yshzDCrJjOBjqkAdwX7laN%2BOBngUE7DgkYVMYaY%2FXvojzSQMAlgMEtXDTypImAMbIdWyCVEXmrNEUHzoOIsW28qUOt9ZwrGIYRLNUL%2BdyUKYkb9DdC46IU0FZx0eVlwdRihT0tZiX%2FU4XeA5RYbvl9zNvVoj9Q0w0fKGeemu%2BpL%2BDn4PA0pyUYDyp%2Fx%2F0JIU1jEpfI9Fsbwijo%2F6%2FfweOeZY%2FiwYjma%2BRS1zWSNm%2Bf&X-Amz-Signature=1d9b400c247a9d443009774e2b9c7af8c11133764eac6a97f455dc1762d18787&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635AGJOV5%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T060437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJIMEYCIQCSkDXecLq6bYvKEjzrKJ%2BRlUPxBetsPmDI6ru15V2LQgIhAIlh6EIgIF6kWzwCnkraajMk4MIr2CuV24CQvirGOWmnKogECNf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyjDYeQXNQT7vmcQj4q3AN5h1rC1eBFqW%2FKMwU0dFROvA1XhwHDKxxV9bo%2FolpHhBhnP24P3vfcZxrUujl84XfIwWASnYpOamrndLXsu58tUMUdKJXrHGfDJIX3lM1Wloorhg221J6EmdhwN%2B4vgIl4Vj4VPsidp1GhWUUueOSfMplNw7PiwudaaNIAVkirP1WR0MZZzhLCeOUuK8Va5GJ96iDDhn2g9g5HR8OL%2F99ErS4H%2BydKpr4srY2wHdh%2BUBc%2FiQNniv8FfAm%2FTsCZLEHpg8H0hrw9e87O97K9jJr1qFWuY92vpCLBSlorOBWwAdRBq3aktSd7Cc0t6W%2FdvKKPqslrDZRvIVxFx8yilf0rpMqztiX79SVCnO0v6eG2kn%2BauK4OhdHYMmd69NeoyfJafeAuY4PhtDf5vj%2BqdmFRUcHpTRxwDFS8FgJrbyAl%2FfeCV%2Bzwb2PMadUuXcXzv5tda69tjZzEJu4nsNcLZoqhTymZP7z1t5JDxnSSJ4Fdc%2B2cp7XYAykiWu2C789kmU9HnHwaXEmOZFRUPnisJuJZz1jxsGrR6dpR4B59UQwAHS8Cx5MgLAjKKnEVIXoCSN4jOiyKe%2F2nMGJJ2bamkDcMo1tNxVgj3IO6xKPonNxExeCfeIdAvmgKD4yshzDCrJjOBjqkAdwX7laN%2BOBngUE7DgkYVMYaY%2FXvojzSQMAlgMEtXDTypImAMbIdWyCVEXmrNEUHzoOIsW28qUOt9ZwrGIYRLNUL%2BdyUKYkb9DdC46IU0FZx0eVlwdRihT0tZiX%2FU4XeA5RYbvl9zNvVoj9Q0w0fKGeemu%2BpL%2BDn4PA0pyUYDyp%2Fx%2F0JIU1jEpfI9Fsbwijo%2F6%2FfweOeZY%2FiwYjma%2BRS1zWSNm%2Bf&X-Amz-Signature=1d9b400c247a9d443009774e2b9c7af8c11133764eac6a97f455dc1762d18787&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TRVLFTU%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T060438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIHoVaTk%2Bm%2BnO9QjL%2Bc7H3fy5lGoY%2BTj6NHsdIFl%2FSgYqAiEA%2BY2HPAZF90qSyY%2BQ5u7BX458XnKwc454xAWeuftzJKoqiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDA0v2JJvb2NVF080aCrcA4IADJIch1nrvmA884B4oWpZSntneQtWjT3BvRIlHZ1rxWKHRGASii5tRvrRRHfKcjUf35gdIGsBpnMfgcB8FMJfApBnyoyqXYaFLhurvzIfqtiFK%2FZ8eyKCQRx6ybt0iAxLaDMfwbAOV3Ex6kIUhcxJtEcIbmkjF0bpbbb93m%2B0S9GV6%2Fhh42GvUrOyZYthsZya4INSJz5a4Lpv0AhbuhtMF3R0LszLzaG4tlmTCKGFnfVi4HsnBRcLVGMnEAaCFwY3fkKf2EErwm9JnJpk05Q08EcUsM8L1MaueuqneemFy0IOOy%2FT0XMBw1Xe2PInv5AVt5I7qZTJw32ZNuZc2n2J%2Fxfq7necEfBiWMih7OJUegeP%2F%2BMzk9wPIxdowoapRtJdp2N2ZEFPWhqUB29S5eMx2C3jhHGs%2BHBHjRSbYj1Ou1ITldpvM3HBOaZNSlPY49EerBLzGW%2BlpzQ%2BYbsDLpOrY%2FKL0fKBS6UiWQqTRAI8U9GPWGgTQfyRmEN3Y9jZLdO%2F3hljBGK1zfa%2BVm3U9Q6pC139zPvLjcQQL1T9RoPDZx41x%2Fj46xf%2BIZqir5PcSBMRTlE%2F2I%2FjGsMJunzCvGKkdsSDfyB%2FfRdz0t51ndTgn4SgGSktM4wnTIh7MImsmM4GOqUBB8sNzIejtyLyorpcG4L2SQvR7ZjV1gZKQufx%2FeKtVyMXYpkBtLkM7VJv87v0cfkwNNwykzN%2F9QPz7gVVhESkxk%2FUqa5Y%2BKqy6v952d1glvZt3MlNSJI9ynzMwR7SVcLvjJnTPpJD0t674cIlhZUzus5SF5bVu3Cr2QAdAaXFLf4CoF8uCMtszFjxB5mOOqorm6fp1Ug%2BNuHSvV39afuqwtrBOYWd&X-Amz-Signature=6fb50caedc58cf748a7830252ac39819e93c88d3ba84625b3a48884d355290ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXC757WF%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T060441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJGMEQCIDvP066QNjzrTibdXkvt2wSxzINBnh3K0tGoRDLOVfEyAiAzGKCbNr8%2FKVI%2F7sDWLnRlf%2FHao79wEEa0jn1onE6pxCqIBAjX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMk3PcFYBf1d7TnDiOKtwDFkk3jCRqj7jIclfhIhvuaBFGqOvpOvz4DmjQk%2BliUo9xipFch7NgSIXSJWDAV8Weh3xrD35TI5rTG%2FjMFJr%2FlO7cO%2FiyqN61uG%2FjJDjgqv%2B0%2FG2DjJIfn1RrpOMRtMKje9NGKgW75i9iTEUWc8YqWfUkkj85%2FwnQMe7mr77qNpBehSz20e7KAkP2vUzJJnMIGXm0ck2L83k7JKqE433l0v%2FTcTmLPZeJODxpMC4JnRYHalQIjY00krO4kNPVa8BrTMooN0nRVdbCo7O6TzwShTV862aAn56Smk7PbaRQnSXQ6e50LtHflRpnSMO%2FZuADWhjON5fah8VDxaPTgAK6OALocMXd3fXVRwiSlzIMtDSKW1%2Fz203IzPH4otDe3MnNZNihdi4E5wu6G0Hq%2BjKDUnJLSAc0x7ylm%2FirV3eLdBPl7Dcoedk4nY4wHCD1hZvCrOQ3a4NHjmmQtWLad8DCTHuk4bhtQl%2Fuk3xazdWkyMI8azB5H3gWWBaOJAG4WbPLA2m24xVyKguWnxXJnXoqwv1prk6hNQr3ThdaANzZjr2VVZc5iHNqnxopeRkry335X5120J6%2FOPOl6IthkzcOpbNtXUqpX2V8t9JWrdNflcL%2BnURC%2BjNH2rYmLqQw3KyYzgY6pgH8D8jUeLCauq%2BkIh%2BEY6sekm7xabTTWmzqJYlsbWI4mQFsF8uQ4hGQQR0JuZ%2FYS%2BovFqS2%2Big%2B8ivKwcpMhWvXmTPtHyNrT6R3rbZzk6toKUFTEkahuFpUvroL2YFxBS1BWFu5JbjZE32MIA41RJY%2FMhyacBlV5%2B%2BZf4d1yKUaWttWxyDfo4RjqeYWaZHcxRhDlPj%2BSnBohgYWFYAXwR2aumyD3wJl&X-Amz-Signature=84f25010a20997640e6724f078cc2f2c06a469baa750cd6e02bfb4cf0ce3f8bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXC757WF%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T060441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJGMEQCIDvP066QNjzrTibdXkvt2wSxzINBnh3K0tGoRDLOVfEyAiAzGKCbNr8%2FKVI%2F7sDWLnRlf%2FHao79wEEa0jn1onE6pxCqIBAjX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMk3PcFYBf1d7TnDiOKtwDFkk3jCRqj7jIclfhIhvuaBFGqOvpOvz4DmjQk%2BliUo9xipFch7NgSIXSJWDAV8Weh3xrD35TI5rTG%2FjMFJr%2FlO7cO%2FiyqN61uG%2FjJDjgqv%2B0%2FG2DjJIfn1RrpOMRtMKje9NGKgW75i9iTEUWc8YqWfUkkj85%2FwnQMe7mr77qNpBehSz20e7KAkP2vUzJJnMIGXm0ck2L83k7JKqE433l0v%2FTcTmLPZeJODxpMC4JnRYHalQIjY00krO4kNPVa8BrTMooN0nRVdbCo7O6TzwShTV862aAn56Smk7PbaRQnSXQ6e50LtHflRpnSMO%2FZuADWhjON5fah8VDxaPTgAK6OALocMXd3fXVRwiSlzIMtDSKW1%2Fz203IzPH4otDe3MnNZNihdi4E5wu6G0Hq%2BjKDUnJLSAc0x7ylm%2FirV3eLdBPl7Dcoedk4nY4wHCD1hZvCrOQ3a4NHjmmQtWLad8DCTHuk4bhtQl%2Fuk3xazdWkyMI8azB5H3gWWBaOJAG4WbPLA2m24xVyKguWnxXJnXoqwv1prk6hNQr3ThdaANzZjr2VVZc5iHNqnxopeRkry335X5120J6%2FOPOl6IthkzcOpbNtXUqpX2V8t9JWrdNflcL%2BnURC%2BjNH2rYmLqQw3KyYzgY6pgH8D8jUeLCauq%2BkIh%2BEY6sekm7xabTTWmzqJYlsbWI4mQFsF8uQ4hGQQR0JuZ%2FYS%2BovFqS2%2Big%2B8ivKwcpMhWvXmTPtHyNrT6R3rbZzk6toKUFTEkahuFpUvroL2YFxBS1BWFu5JbjZE32MIA41RJY%2FMhyacBlV5%2B%2BZf4d1yKUaWttWxyDfo4RjqeYWaZHcxRhDlPj%2BSnBohgYWFYAXwR2aumyD3wJl&X-Amz-Signature=c16c00bb3e4bdf0f96d650a0b4bf05124c7392a8613102d78579d0a77a932ed2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVXYAC4N%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T060441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJIMEYCIQDAwC%2F6Js2sxydsfl7HlfAp3qXBHeyW2khNNNwKv3TMggIhAKsHWfitAjW57OEtVtMFvCwHmRCkktRmH%2F0PmTtlvEy0KogECNf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyPfQwxTPIV%2BMoFVtEq3ANkB7J4B7kRBaYoDVWxessz4mYQFTW1%2FUbv0jOGaAVxNPlvAJD9HejnMhefnEwRIoi607d5fHis9nyDHbgko7LnJ7b0XoLTXqpCo1SJId2BBQMLAicpcg8qxVBMPdqAhwI6rfoFqLjUfjLRIqZv3loDhzKANChXKUWGQFfoMbRLFHnuWexETdmUA5MSjbb%2FyskeK6RdglqTSwtFBJnprAEKtAu%2FzkmVgbbkoX%2Bg8aVYU4RFYt6Wx4pSrl%2FNqDwBJ8Vg5xveGRX6YFf1GPEbQIl38yeq%2BjJnaeivcfQ0oq%2FyaLAMwTetorixKi8SEb2xqYXFiRXHkokQeWf1vIW6P8e8i%2FdlkkwG8dLYBZHLZkeutYlJ3GXjyeUT%2FTFHjOUWVKTNFepTDFUBVXO1Xr1RnUW%2BQreImWBlmD3qpPofG0V0BuAT8PNCQdbzmCHCbtNbOBr3%2Fbvr6cNS08DjRVOMsgiRBH4Cybav12ifT1LgUO09B4LZhbLouBKdEwh0AsVhWRDp349NsBAwRxD2oLglCJveMa8ugl0QGiNzcewKIlT03nR%2BP8ttj5UNRpPYqdQkTPnRUndDaOqo%2FSMAJmVVdo%2BvmiS16UyoB3BM1%2BIoG923VGC8O83dtNHT%2B0ot7TD7tJjOBjqkAVFhlR%2BIV8c5azW%2B4vbjr%2FM5qSu3TPV9ON%2B6GXq8PnwRAy845tfQH2ZnJzDrLenVXHY%2F0TATmR6sGpSwVcNyUeFpEO%2BosDEgd2sQ9XvrQsy%2FmPL8LxEtwRXR8z0S%2B7%2FyheLl6vnlnCEj0whfOo2BuRNZXDNMxFPg2kKbtjnKckwiaLOR%2BtIVzyIN5y%2FtN4I68FgJp9KfKFRQXe%2F%2Bkry6F8DsuimG&X-Amz-Signature=557e0c380443b594d92f52b2c8cd4041ad5ed60737f09a7a42aaab9ef5230e31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJ2POAWV%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T060442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJGMEQCIE1OP4EBaEpmhAZKJfU3Y6AZBdsE0MXml0H7pftK7PCNAiBaCSLudD7xUKqopWA5Ls4z5%2Fi7i6UkZxjWqeSOENLGmyqIBAjX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMmaj7NaKkd9F9nV0sKtwDcNZWE3c4z1lX1rhN1Cbp7%2FhTu2hTLcCyWz3aSY0lRPX4zElof1y3qLaQsbOHXcmHc624ZDL%2BnedK4Z8p4922PNRQ%2FFPsatcwz8blm8ZbYSsxn7c7PiuNc6g2prJywW%2Fo6CxWD8z2zvFX1jLeOppaVi10YwsA9VM6i9rOY28%2Fr3eJ%2FlGsf%2B1ULs2g8vLdYM3tTz76FY5%2Bmp%2Bp6w6K2dj%2F8b2kxuP0xjGcdp01zHhaxeZv7W4eKYhb8XKoZsne71uB%2FBXSilSl2rlxcRIFQXIxzxMJqGIBXBsT0gQ9a5%2BYRDib1qUIooZawR70qK%2BaiY69i8eTLLWBhwSmLx%2Bdc84NwILkbM0ly2wXfIHkWx%2B1wYuN50YZ5rTiKfmVcim48lbBYl15oG%2BI1wYn5h2RtKDHeJFdtkBtNOtgMAliP%2BkztUOdIeZrax%2BbDRNsMSLNLqbxXr0IWnKghG4rYgo0J0Tv3875vRHVv3XFJX0I6h1jVyOhe5FBS85E2n9AKrfe%2BwB7XN2HfE3IOcpSdaEW%2FqtLdJ5eFMeC4P6%2Fnpmqif2GEEevtkAtw0S5VcLFvrty%2BmX7K1hk05no5riQxpLWot9FqutNDGtjwqBg3bhF4Vp%2B3fyvODUEhruSh0AKXbQw6quYzgY6pgHLgunJ2fgY%2FRDLgsqE6R2UFI4qfyDqDba2zwUiWXGktTDNqOXcx%2FE7vzEWKB3hpZIqPnpMlUGhvB6WWxsW%2Fy0bteb1P9vVVNwftV%2FVLjkQBXkwZaB4zR7uzlYS1kCJ5Igko5qD5Raed9yjAF5o7Sb4OekvI65C6bpQYhhTmdZu7%2BnOAaentczi6SeniqSC6o80o6Vmqld845LQBhmx6pfwuUAqCfw0&X-Amz-Signature=8533e7f72643f19b274895420e4eed919c4a950c32942ba9bf572d095a30c7b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCLUXSVF%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T060443Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIBa2%2Br9%2BCsl3K1fEXHGFhqEv%2BK1QAws4DopUtY0BNRm9AiEAsNCE6crXENrfKgXu0kRdlKcX%2FUGJb2Ci%2Bbdi5RYmQeEqiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGV5RgP%2Brb78lU0QPircA7lCBN9wZ1a05o3jnr9gtidzQuhlS4Qf6wnamCv69LZWD8EFmbMHjSt58IPXFx3Zu972h9ycfOhVZetzrSivtyQg14m%2BteESO2omg8ifcQia9QS6zT%2F19hcUyWHH2cyUO4GFXPycOphOBwqCIuXV2wnF5ff69zA%2FtC%2FEXf0iw8ELw%2FQ6qFgWixThJAKJoJps%2B60OhGc1o%2FOtCVcs65vSGUQt9PnM8TC0FSfmahekuY93EooxZ4hYNkPpRcwAb7Z%2F3Glg9CJbxSD4YmluBfJYV%2BugOFcGJ1R%2FCl49VHJFx0py2fmPU8iTGKs902gxLQnlka%2FodDFm3nvXW62sq%2BvBd%2F1lFkZZUxsUnabXzgdqoTOCSSBQ8kmqXl8xZD1v%2FlY4741GTGOUUh2fijizfhvD7buXG2ahFq93zy0Eio16Ou1EWhGn%2FQ5YVt4%2BPnqUn3yojUBOXEF6M76iwR%2BmAiGXQ%2FfES3rYkaF5%2FhtYf5pYuPNSZc%2F6ZHm12QNFQlFNmoDywpIahOjR0GsOC0jB7kHrohaaQo8eOGyAnQ3r14W2cMbl1nxdgHhNqIJOikyk%2FpFtLH3WorGqTRY%2BnQLvH7l68qIQe2D8qM6DKJbvRBBevvICuxolOSqYllQvgZTlMPismM4GOqUBKYSGQcARYeucMUCPWJYsHB9iSEAg9lhrkvuMhSi%2FYynuvK0V9UvqojFDuWFSVQWmMTpQO0t98qjv0OEnWP7kGZUMivwUKth1wy3WNWFD1FT4vQ%2F5fbKbU2oQ4rnXYOCIBuzrOHLlESmHbrv3KObmOFfLxR1ope9CDbQofl8Ot4ntDtRKURyoLifwBMt1Ag4xL84Z81Vj6F2pbuBdhKkbbupVLw6o&X-Amz-Signature=c89b5e1e015d638251265ff922bb6d367e11c1c13680ad710215448f22febe8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W26RBZPW%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T060444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIQDewuuf6sSIlq4pWvmgBmAyUylrVuMURN8tfYcIKBBIGgIgHGmCODu%2F%2Foe5n6PC65GaCjncyvVG0Z4h4ZRb%2FOljYBQqiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFaEQivXNAXhC1%2BQ0yrcA2qfpxwXcy2q0ncXhwXtt%2Fk2yQCr5R%2B4SXj0Uk3DkeHWFoPW%2Bq8tgr1loJ4RztRWsoNKShx37AwWvsvFF%2FeHZ9htQmfCyNkXax5ogEhIjZFYxjgGTGqChGxgJ71nF8G6xaZ%2Bw%2Fotn2DVMvaNrFsFcKGjexJmWI43v%2F3NrzWamvK10i68VXLkiTUKVOMVV4sQ5oR2zIogDLMsyvsQ%2BrlP3Al5Hui4USo%2B5WL7c3KfYgMHZc8aBPFzp7CVIXqLuvkN5I8bnYvI02C%2FJEtH4j405n%2FWSJA0%2BfHfv8u%2FBYhyXuWMMifWgsEGEMGLKGhFtCvQGIpzloyOfz1UloknhVJ9KrmNQZF662AxpbVfYsRw8NWYg7eWNzNif5Ql9iCJnklC8vbsHjXJvst1xdfroVrGBwuxNunOt9czV7dNdwS6MNpei%2BoX4JLcqE2vXS5CNeVei2DIkBKcLqOtIT01XeCbYuXUSq9sxsXhN9M3NKYnRfBicGeU%2BXHvZhnG9ib7sdcnJLxWaiYPXNSBxMdYLEF8gDReZYFq5%2B3izzAw9Jel7HpJUNT7CqqCOwFcJvtCCtYzBF5MTRUIzVLVVqWYNdXDrcKwpBwNep6qtGC6tyltLEBxvbHweBzmXShX6fz0MN6rmM4GOqUBFnEqlkyr77WHyT9XkYjyxFoIGMLU3hGyfLY9pPnfOxKsOT%2B3lFCzp5JvESndBJM8t5Qaf5nJGRuTAOS%2FL6RHFkUwYOf3A9StAOCvlDtFu2JhrZFUMd7lZy1cKwCypTHjopZuXIiQmNtpj2dW9Tyui%2FE%2BBFig11CRwBZ7S1KvBj2Yd0lqYZEENvBkj27jL%2BDtFExjPQHV0Ri%2Fu9Id5jL%2B3y761W8v&X-Amz-Signature=f3d5e2e0df9e96c6c2e0fcb21b8c9936f972513c2eeded5d2ec2c38633590262&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W26RBZPW%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T060444Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIQDewuuf6sSIlq4pWvmgBmAyUylrVuMURN8tfYcIKBBIGgIgHGmCODu%2F%2Foe5n6PC65GaCjncyvVG0Z4h4ZRb%2FOljYBQqiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFaEQivXNAXhC1%2BQ0yrcA2qfpxwXcy2q0ncXhwXtt%2Fk2yQCr5R%2B4SXj0Uk3DkeHWFoPW%2Bq8tgr1loJ4RztRWsoNKShx37AwWvsvFF%2FeHZ9htQmfCyNkXax5ogEhIjZFYxjgGTGqChGxgJ71nF8G6xaZ%2Bw%2Fotn2DVMvaNrFsFcKGjexJmWI43v%2F3NrzWamvK10i68VXLkiTUKVOMVV4sQ5oR2zIogDLMsyvsQ%2BrlP3Al5Hui4USo%2B5WL7c3KfYgMHZc8aBPFzp7CVIXqLuvkN5I8bnYvI02C%2FJEtH4j405n%2FWSJA0%2BfHfv8u%2FBYhyXuWMMifWgsEGEMGLKGhFtCvQGIpzloyOfz1UloknhVJ9KrmNQZF662AxpbVfYsRw8NWYg7eWNzNif5Ql9iCJnklC8vbsHjXJvst1xdfroVrGBwuxNunOt9czV7dNdwS6MNpei%2BoX4JLcqE2vXS5CNeVei2DIkBKcLqOtIT01XeCbYuXUSq9sxsXhN9M3NKYnRfBicGeU%2BXHvZhnG9ib7sdcnJLxWaiYPXNSBxMdYLEF8gDReZYFq5%2B3izzAw9Jel7HpJUNT7CqqCOwFcJvtCCtYzBF5MTRUIzVLVVqWYNdXDrcKwpBwNep6qtGC6tyltLEBxvbHweBzmXShX6fz0MN6rmM4GOqUBFnEqlkyr77WHyT9XkYjyxFoIGMLU3hGyfLY9pPnfOxKsOT%2B3lFCzp5JvESndBJM8t5Qaf5nJGRuTAOS%2FL6RHFkUwYOf3A9StAOCvlDtFu2JhrZFUMd7lZy1cKwCypTHjopZuXIiQmNtpj2dW9Tyui%2FE%2BBFig11CRwBZ7S1KvBj2Yd0lqYZEENvBkj27jL%2BDtFExjPQHV0Ri%2Fu9Id5jL%2B3y761W8v&X-Amz-Signature=d69330c08f65ac311ed8c08a6a97c93aa7fa08319a1d333f5a250d9630b92a9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2DGOZUJ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T060428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCICZ552sk0HfLqgHBKfHYZB5yN%2Bcn%2BPV8EryZA01IZuNCAiEAz03Hjqy0U%2BrLq3%2BMGN3qebgymhAAG2gPXA1GtaPtKXgqiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFI7GhPSQ%2BF0yQveySrcA8KNxhRi42z5UxVnOzp0xqGRnbJbgtCIAWqEKPqmvUHrAL2wwBUnRcuSo7cCMJ0LU3tqR6oyiGCRkwO4UCLuPNyMITRp89sZ8nGRD7J9V4XQ6EpDxDC64%2FKEJ3AzivlON1hbJa0cYapC6TLE3NqiNxE7WfeU%2BiAOpgzcXqxkT5CEt9GRdxm8ur51SV5jwgvWOVxWpzFVnTLKsx4QWMihvPTRIbCv%2B5oSbWnWVRUUOI4Ep8WE%2FcS2pEHBHTyEEBB2Jh3DXineqzZO3ZFmUYjcuaqSlx11dYZFTdw49dRu4mBBjF8SWdQo6mwo1tUaU3nd0YWAsBI%2F1FCxZhxWlF%2B%2Bky2oEY7McyvODzwbsUTsGw%2BkM3qnqvaWXNki4RQZ1Whsqn6%2Bimm13exMUFEMWZZOLCU6%2BEO85AEzTnd9bbO9Ai89Vf1ZJiUN6%2F3zIeZ8r7kPuGqxPoQESSh1pUqZ4tSN%2FYVmX%2FWGXxJqs%2Fgic8MqUQim6UX4KlOBY3oDmw4AQ%2BayhMV6eiHYlQ6mzWxZyQkmWPKvJVsck32lxOfASExdqex7w38%2B9K2T6WEODAlGLukoA40b4Cx2K%2B75bF%2BEoSwtOKHF5DbnzQpNr75uKXV%2BkfCCU3VjGxhOx4Hg1lEBMImrmM4GOqUB22VpJARASgC%2BjmUP5Bz2z%2FHV9CZhhrttoL2YVrR09InZAk4FV3a7RZryne7IQCPJGFm%2FM97D8g%2FjANfjow2NbujsxgHEnZM6wSOaNXyAVznZkneckOTDKuu9qyDHjx0tR%2Bcu8QUmGpRySkI3otokElZOo0jwPw5mBEar5jipnK%2B7vNgy3Gk2Cr9dEdIHEE6mqYgP3W8dYJAuKuU09ml6WCmtemXV&X-Amz-Signature=730022b9461531d08cc8189b2cd7c26da5b35301293ab60cf734e06f0ea8feac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6OJOGH7%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T060446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJIMEYCIQD4ZPIa3DsbNQ%2BzX5B9IhL3QOnUxSqJgpBrT2sbDp6w1gIhAMvz03OstiJhD5JlfTtBok%2B5iNSjGpbZY2RKP6eWFvtmKogECNf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzq3qY1pMPmI8ZJax8q3AMd2yrtuUEs4NeqpBnnwVfswvJE%2B3sjlOvgsWea%2BxD6amgvaX6OqDx4pRBRYhsZ7rlmeUCmPHBJsClxGyAhb06CyWHs0sqMnjlIEh7XFXnRA6f%2FGnhoXKAds5S3vBRsT5Z%2FLgSGqcxG96M87oQc8PxZkGsydCcb3M88lORPCYpphqndqN1zBj4VG%2BjLihHWrHvHcsi3AEFeaX8KWm4bn1gKQXufY1V9IwSdgXRsRXeIE%2FLXxqolavOGpOIoSt6Eai5xO3uduR%2FB70dfXjHJzWGAmzufEgmv10N4mNGbQ2wV3Hhh6L%2Fn8IeYlsaPivfhUy5Ha%2BxKcALpr0BfGHNWtiVOONHcPKqAFO5LTiStFyg8ERTuShaDFNpk%2F6N2agK0TTg%2By1yf8LDRgP9j%2BQm6vJJ7%2BOl45nYPwux7nVWA1vgDF4bF%2BwbQtk2%2Fxqa5VwkXIOutP1N3W7udn%2BMPezbndo0K8IgLAsITyKY4b%2B%2FTDptO2o7SQnJdyTVOXhJELJkPKa8kzAnxSAPznbC2%2Bf38sFNJ0cT9umd%2BkIh0mJTqXKlshIfcTyqOHTIC5ORi2XKtj5yG4kmUrDxCaUrOM%2FD%2BKAiZP%2BvaIL8hp1oAOnrFfIVclSbZ%2Be1uaHrJYdJ%2FKjCfq5jOBjqkAU9oTQB8PlReQZXi563GxKJ2UnVrLEnP6jQ4JCp5DS26OTF9SluORq2zvgwBHR9mDTLI7jXrClou9hWkaxz8119C1v0XhsOGxYwKY3HXEBNQBfNsIlyXzYygf3s9dDdTSgDd%2Br21FU%2FmQUn9U%2Bs5N3nswQueMBcTwqqaDwUTMfEtZUhj2Op%2B%2FgwSmVf3kIdJoTs7bFoL93ICXsAK3YFmx4BTp%2FgA&X-Amz-Signature=7b8393f12adcd7770d92726278d12a56246472939b63071f39e26af51ddb2c78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V6OJOGH7%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T060446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJIMEYCIQD4ZPIa3DsbNQ%2BzX5B9IhL3QOnUxSqJgpBrT2sbDp6w1gIhAMvz03OstiJhD5JlfTtBok%2B5iNSjGpbZY2RKP6eWFvtmKogECNf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzq3qY1pMPmI8ZJax8q3AMd2yrtuUEs4NeqpBnnwVfswvJE%2B3sjlOvgsWea%2BxD6amgvaX6OqDx4pRBRYhsZ7rlmeUCmPHBJsClxGyAhb06CyWHs0sqMnjlIEh7XFXnRA6f%2FGnhoXKAds5S3vBRsT5Z%2FLgSGqcxG96M87oQc8PxZkGsydCcb3M88lORPCYpphqndqN1zBj4VG%2BjLihHWrHvHcsi3AEFeaX8KWm4bn1gKQXufY1V9IwSdgXRsRXeIE%2FLXxqolavOGpOIoSt6Eai5xO3uduR%2FB70dfXjHJzWGAmzufEgmv10N4mNGbQ2wV3Hhh6L%2Fn8IeYlsaPivfhUy5Ha%2BxKcALpr0BfGHNWtiVOONHcPKqAFO5LTiStFyg8ERTuShaDFNpk%2F6N2agK0TTg%2By1yf8LDRgP9j%2BQm6vJJ7%2BOl45nYPwux7nVWA1vgDF4bF%2BwbQtk2%2Fxqa5VwkXIOutP1N3W7udn%2BMPezbndo0K8IgLAsITyKY4b%2B%2FTDptO2o7SQnJdyTVOXhJELJkPKa8kzAnxSAPznbC2%2Bf38sFNJ0cT9umd%2BkIh0mJTqXKlshIfcTyqOHTIC5ORi2XKtj5yG4kmUrDxCaUrOM%2FD%2BKAiZP%2BvaIL8hp1oAOnrFfIVclSbZ%2Be1uaHrJYdJ%2FKjCfq5jOBjqkAU9oTQB8PlReQZXi563GxKJ2UnVrLEnP6jQ4JCp5DS26OTF9SluORq2zvgwBHR9mDTLI7jXrClou9hWkaxz8119C1v0XhsOGxYwKY3HXEBNQBfNsIlyXzYygf3s9dDdTSgDd%2Br21FU%2FmQUn9U%2Bs5N3nswQueMBcTwqqaDwUTMfEtZUhj2Op%2B%2FgwSmVf3kIdJoTs7bFoL93ICXsAK3YFmx4BTp%2FgA&X-Amz-Signature=7b8393f12adcd7770d92726278d12a56246472939b63071f39e26af51ddb2c78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YEENMBSO%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T060447Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIQCZwNcBAXt19kEZeFXscSoxUB3TDDfX%2FZr9mK2eJwZq2wIgMDo0MrU62%2BtA1v0Mws2HsDQNwsSQCVD2QH%2F2%2B%2B4erk8qiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMQyseLiyC1%2BdYAzQSrcA0IWj2GzllRinhtXTjT68edRWjbD4SDgy2aPYO47kjIFsN2fZVnsSoSxwbpeVVDTnXQGNPtActF5nr8IDgBdpuyRMQASTOVn1gMas0BqVOwu7fOl%2B3%2F0y%2FCmUS2xbY2ErnnWgw%2ByJ5dMM%2F7xvnprsCdayXvEJsbsh5uOQugBYKwDF09eGiw8HmJ6OAj5vZiIcLV3UyAr9UMksj%2BcnnCETvJU66AbuaE9DvRimTJlj7YmjWmJ%2BL7k7DaIMWc5bFBa2TX82Ywq9oF3wf9WucUYOqSiIUJeO7cU1VDczOTGzWr8%2BUeJ5rMv4yU0Ch%2Bd0h%2F0KAay0rzmJMeNePyQG0PsRIIGdCFLN65nt5BCDJePdsn6Y7iBhu85luMPjF20ymy24jZYbDwCtShz82RKYa5Ml0OEna2Ko76PkeHd3Rxvhf35a0AgPhZu4p1iVOTfVPbLvglBRI1%2BhYsrO1GglHWgsZv5Og2405kLr8vhpQj4AuAIub8%2FrEMU%2BvbfLIsXwM5lE6hixgR3Str1iQk51IoW97PllN6c%2F3Sko10YG5x%2F57zAZDsFNCjmQhh3M01P1limUG9Qi2oeiPPVNqf4lhHLyu4PsI%2F8EuwyEncfC46KUNxkevtJ4RkvWYf6BRQfMN6smM4GOqUB2MC851uCGkF9KGzZY8nnuF6Kux%2BDSNs%2FgNwfZfPAVGYAc20i1IdkwipuwkA5cWQDuo8ChOVbwiEG%2BiJRAIJS8UdVBZGr1B6mY0FZQ38PxcU7bbXqkF6lqvQStYq9ko1zviznskjW2LYI69sa1zypdW1wSK4yUVTehkh3RdbR4oSqYqAAWjtPzVrSdidY5%2FyQRxlxr5agOvYUdmIMcAGvmRBr2969&X-Amz-Signature=b7ec7de031773e183b2e675113a949a938524902686fa13bac8fefec85e0412d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

