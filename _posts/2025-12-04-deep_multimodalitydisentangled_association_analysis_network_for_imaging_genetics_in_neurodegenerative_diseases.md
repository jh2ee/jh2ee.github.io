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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJNDWRR6%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIAZ2NnsrVb113IRR%2FNr9QvRW%2BBHC5MxNXvf0d763yrelAiEA9viETklBwKy0IsRYgqPii4MvxUDgUy6G0iyQ387yo40qiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE4VMZ%2BIMMZPog%2FCZyrcA9L4K2cSJ5RLg9O2Soe%2BZdXlfXP%2FspU4ayrOD1HkqC8dQg0P4aZRiSznslNU2STgGeBrxtHhYX0OByL0Ltf%2FLAfG3bBHz4tjw4nhd%2Foa8LTr0dYT7XUVadX2Pw88XTP4w8dw%2FhI5cUjRo5nsElRggvehHN96uSpwvLoTTFZBLcmmHMovEW0IQ37mYizPa8sDp3uTzL8W3%2BGH8MamZeZbNr2x%2BNiJc54rElBYGJTQac27IoqE1MH3yKjGyoK43fd5egYG%2FGdGqowPHbo8r4OQTrvN%2FhKNPbp0PEjQNRm35w%2FiUo2l5x6YGHbpFulajr5zq1XaK341Q64UfuVMJ1GuHjhFgH4xAY4Q2T%2F1RFMmajlz938PfvqPRuY1GsZS2K4LyqMy6q77mTemAaPQUA%2FXDhLAett3j5FdfWlYlnHeD6ljJtXPvdsMkw9vScMfpRqhoZFiZFKAFozNdU9EVbs5Sd2Sucy%2FhuQPNzGyZOCg8G1brcP0X5AnvGwEXCK%2FbFASZekOHo798EHrGGKCCyhrRK9eCP7pCo05kQApCsPrXpvarePIwGoDYnBMuhz3neH390VZBY5Eq4SkDDmC5yOnfdRKmMzoXBHcYGwrrMaPLMnnSwjdMa7R81vszQgNMMPP5M0GOqUBW6ZvbroComIAu%2FjWri5sxscNwjRLB8E%2FJL57RX7GW2OJRLjxyKKxA%2BMzlAqRf%2Fb1MN%2FrlrHeJC40TRlJdyc4QRHQZlhwILo466Wh8o%2BrAU5BBtXUENKay%2FSHcUaf0LKisg2%2BVvPRL2PtUM3lI3O6xAxA5jLCNdXpnLF0pPKvfHbwPmnBv3BbII0BCA4cWBucQKkHg1GzULxkMYosB1kc6QS7swC%2F&X-Amz-Signature=36bee4e09819990cad196e94f9921ad53ad0f62ab6dd455bdbbb473d7f2157bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJNDWRR6%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIAZ2NnsrVb113IRR%2FNr9QvRW%2BBHC5MxNXvf0d763yrelAiEA9viETklBwKy0IsRYgqPii4MvxUDgUy6G0iyQ387yo40qiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE4VMZ%2BIMMZPog%2FCZyrcA9L4K2cSJ5RLg9O2Soe%2BZdXlfXP%2FspU4ayrOD1HkqC8dQg0P4aZRiSznslNU2STgGeBrxtHhYX0OByL0Ltf%2FLAfG3bBHz4tjw4nhd%2Foa8LTr0dYT7XUVadX2Pw88XTP4w8dw%2FhI5cUjRo5nsElRggvehHN96uSpwvLoTTFZBLcmmHMovEW0IQ37mYizPa8sDp3uTzL8W3%2BGH8MamZeZbNr2x%2BNiJc54rElBYGJTQac27IoqE1MH3yKjGyoK43fd5egYG%2FGdGqowPHbo8r4OQTrvN%2FhKNPbp0PEjQNRm35w%2FiUo2l5x6YGHbpFulajr5zq1XaK341Q64UfuVMJ1GuHjhFgH4xAY4Q2T%2F1RFMmajlz938PfvqPRuY1GsZS2K4LyqMy6q77mTemAaPQUA%2FXDhLAett3j5FdfWlYlnHeD6ljJtXPvdsMkw9vScMfpRqhoZFiZFKAFozNdU9EVbs5Sd2Sucy%2FhuQPNzGyZOCg8G1brcP0X5AnvGwEXCK%2FbFASZekOHo798EHrGGKCCyhrRK9eCP7pCo05kQApCsPrXpvarePIwGoDYnBMuhz3neH390VZBY5Eq4SkDDmC5yOnfdRKmMzoXBHcYGwrrMaPLMnnSwjdMa7R81vszQgNMMPP5M0GOqUBW6ZvbroComIAu%2FjWri5sxscNwjRLB8E%2FJL57RX7GW2OJRLjxyKKxA%2BMzlAqRf%2Fb1MN%2FrlrHeJC40TRlJdyc4QRHQZlhwILo466Wh8o%2BrAU5BBtXUENKay%2FSHcUaf0LKisg2%2BVvPRL2PtUM3lI3O6xAxA5jLCNdXpnLF0pPKvfHbwPmnBv3BbII0BCA4cWBucQKkHg1GzULxkMYosB1kc6QS7swC%2F&X-Amz-Signature=36bee4e09819990cad196e94f9921ad53ad0f62ab6dd455bdbbb473d7f2157bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQRJGZJS%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJGMEQCIFCl3rlWXlfCGn9AHOGyj7qoskoJvOaF7%2BsUUnGh4XbZAiAeEF6iNCOm%2FJB6KCz1U4mFhPqWHle0od2IuOGbbFCSoCqIBAjr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYfqmoglq%2BMKt%2FmdpKtwD4ovz5pMhogOUt8ppgAAibcDSHFyjgzoxZNS2807N9tGKoIZFogce5vTT5ne8RRnVJ%2F0UcrJVHQyOA7cayFhY0A%2FaYEpADEuhRLojy9rVKtWCNIHIH%2BUGWSJ3CXAFIuiKzhncJy7TKTXydPhuvTfaILdGsti4yvyLyjHcQmVAQ74aeC9cEqIsZiexId0NLOaRozXaETWER%2Bp3eMUhIv0K%2F9vZFduRMelPl8wFmxjpdPiaB68HubyyDNNJqp5PpxpL4q2hD1nRLJjQ8uL%2F8N9FSOsaXZ4O4Y1dnbtMyfwAWWJPvBgJYR3tK%2BqhXESpV5hN7iiXqW86ZxYFDjPfHb0vFMHTqX4Pt%2FX50o6NkigWEKDW5k0Mou08KD5DvWQNzn2gV%2F3kU5D78CTLbuGCRiAGhEC6SuZILbOC0vaCmdIxO5uzX%2FzLiodnddNjGNeHKQkk5mfvbClCsaoFX9Gj%2BmJ7rkCVs1jNpBTKbfflp8ESMHyg%2BgaOXf8AiZcdXYh58aHN6OKG28SGnoplFw1Udkq1cPRsh%2BR6mCbfAM8MUI2GnyyPvOLJm8UQNJthpqZydRF8acnZbWCIdnrMbaCsSqNh112J5MR1kc8Eq1hRa1iVTEcd2MoULp0KPW2oj0kwhM%2FkzQY6pgG7QloJgqSkuwNdvsir0Jb5Ioj%2Bry4Z47H3VsxB%2FRgNC%2FeI0gJN4NJFcJ9NEctspHUVcrgpUSzaj4f8ajKF1HrbdLzc0%2Bu73mmWpwl%2Fc6BMK60u0Ja0RugQbmR%2BCZaMFa2R1A5CyPsqB7RcOZijjveLFkBopkKGPhulaeW3ZbX3hP7J096Dznazewd1EjPHn27i2IWf3Mjjz%2BDIB48piGcp0u%2B%2B2Uw6&X-Amz-Signature=abff6e48f5704bd54d2ea8d94a361d7b9f24bbedd02fdc25fdf8930835c6f395&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRYASLCJ%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJGMEQCHzQ4xVHeOIJMmCwqSJuINCnIdKB9D7H0li9EhayiWVcCIQC6Dz2%2FCjfKnje0yAXEms6KojMKUeh0BsxXciX3a8EpRiqIBAjr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMHZ%2BeDvCRzyK7r9HjKtwDBg8KeMPKBOsDHx9QI5JhJ2HstGcWX4yPndFKI5zm3lDcb2P%2BOdhg3vZ%2FI6pZ3PBrcSZ27cmkfWbs7d4S9CfhVa2rttBTW63TlZZ5%2Fd80vXvCtlicbs9nKsdRS7ryoo5dNyq6%2Fft9UbMBGdzohQs7FXalntAzzjQzfDXVCrUYs5qQ9IM7uOoxCSoAV42%2FW57xr%2FzJSURdIvScPHx9F8MkJihUPOOYl2vZrxrDWtgcdgUk90VwEpEq26SfC%2FJ5UNXGqkkUUWVOOkTDNDfaVMNjN5amOJqSXQENKHhHlmJsmvAVl1bT4e7Y2rJEcgfhvS2GxTKWhTcvwYplU1W6hzV6R%2F%2FwUMLMbD4drm1Zwq3JBPOWjhIOi9WEqmjQhEoY%2Fkhy4khd2KZ0gUP3MZTDeLWcSiu%2Bt%2FUvY%2BtEaHZ73uGIgk7XjYDY%2B3EcacXHfZgJMucFUQcjXsL9qtwGNn1OgIQPmEIKnxiZUl40rp8pxMBzaN7eY%2FtWV5D3c2FtT1j2sQaTZYXDIvGtT1QTUvqJ2aSzOupdGIwFVBqLu5oMVkkC1%2FGzE4fRgtqyDG5qoCHf0Hycp0cfAYnfYa2dCWDgLKTQ3P60OZf2bjSKJbJIzyYqSc0rNLmSkaA2gkyEJ8wwks%2FkzQY6pgE3%2FQtvsmQ%2BaV66olgau%2F%2B420vunVi4C43m2emyrTVWJdzhwgCpU8D3P%2FYkTjSigkM%2BUE78juOy9nGjLpfsY2T2Kw52Z4Lu4OsKT0ruaOEGfsFCmKXb0GKmKnUKDNe68taOvhidnvcxrFtGS4%2FnC0PB5sWZdcrl%2FU3txvgTrMby7uYEhFtmegnLuQBj6C8GtbC1XhIrK5uraSnA40jNK5%2B7dZOj2FxR&X-Amz-Signature=32bbf6ee0b954ea818acfc828214a6d9f9fdbc1d721a99896487fe1b9812fe0d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRYASLCJ%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJGMEQCHzQ4xVHeOIJMmCwqSJuINCnIdKB9D7H0li9EhayiWVcCIQC6Dz2%2FCjfKnje0yAXEms6KojMKUeh0BsxXciX3a8EpRiqIBAjr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMHZ%2BeDvCRzyK7r9HjKtwDBg8KeMPKBOsDHx9QI5JhJ2HstGcWX4yPndFKI5zm3lDcb2P%2BOdhg3vZ%2FI6pZ3PBrcSZ27cmkfWbs7d4S9CfhVa2rttBTW63TlZZ5%2Fd80vXvCtlicbs9nKsdRS7ryoo5dNyq6%2Fft9UbMBGdzohQs7FXalntAzzjQzfDXVCrUYs5qQ9IM7uOoxCSoAV42%2FW57xr%2FzJSURdIvScPHx9F8MkJihUPOOYl2vZrxrDWtgcdgUk90VwEpEq26SfC%2FJ5UNXGqkkUUWVOOkTDNDfaVMNjN5amOJqSXQENKHhHlmJsmvAVl1bT4e7Y2rJEcgfhvS2GxTKWhTcvwYplU1W6hzV6R%2F%2FwUMLMbD4drm1Zwq3JBPOWjhIOi9WEqmjQhEoY%2Fkhy4khd2KZ0gUP3MZTDeLWcSiu%2Bt%2FUvY%2BtEaHZ73uGIgk7XjYDY%2B3EcacXHfZgJMucFUQcjXsL9qtwGNn1OgIQPmEIKnxiZUl40rp8pxMBzaN7eY%2FtWV5D3c2FtT1j2sQaTZYXDIvGtT1QTUvqJ2aSzOupdGIwFVBqLu5oMVkkC1%2FGzE4fRgtqyDG5qoCHf0Hycp0cfAYnfYa2dCWDgLKTQ3P60OZf2bjSKJbJIzyYqSc0rNLmSkaA2gkyEJ8wwks%2FkzQY6pgE3%2FQtvsmQ%2BaV66olgau%2F%2B420vunVi4C43m2emyrTVWJdzhwgCpU8D3P%2FYkTjSigkM%2BUE78juOy9nGjLpfsY2T2Kw52Z4Lu4OsKT0ruaOEGfsFCmKXb0GKmKnUKDNe68taOvhidnvcxrFtGS4%2FnC0PB5sWZdcrl%2FU3txvgTrMby7uYEhFtmegnLuQBj6C8GtbC1XhIrK5uraSnA40jNK5%2B7dZOj2FxR&X-Amz-Signature=ff0739c77dfea96bb3194cd81eb13a51cd25ad619e412721ad47657df4f2461a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QKFVJP7%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJIMEYCIQDefAZf%2BuX9QuDQKFgXw4dxN1sK1C2wZTGwAfMc%2FSkmcQIhAO17O3iAPPEEFyh1dP5jNdmpJOfWZ%2FdhzVfv3L7qefpvKogECOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgysZhNg%2Bv8zJfO7XeEq3AMbdTl2GSuZQUpv31r8vwtV%2BNr93XXe7iV3XLlVUlYbutlVO6ysAcLovSeTdLIF8M4J%2F7cFK3w%2FyEDq0YPTBXLXRaCKqBJ83Tg%2BizZrTC7NOWrZ9TjcKYCZciF8YPUOyXAatBk44d7eUWk03qjakwKg44BGUpTUIKyECehBX%2FI%2FxWERXmYxxTdUmeXE98M5KV%2BnL%2FxElcZeK%2FeD2q1Aa1%2FO%2BRDDyk19qJr5HHtITsPyReUhkcnfF5VJn5JeV1g8%2BuE8msDbhsvnFuxsJpj%2B3z3Yyf8kiU4yNpbpXOG1wp%2FjWF9SbFjAEsUiUdEr0coN75g32Lw34K4UwNG405vo15IN9veuL0VCAzY5Lxgry%2Bt%2BGKTUnyoDlayAwFYFCdCcALKz4HYiVqPPyY5yWLPMp0FlbVSyo5LIPxrh7%2Fhsu5uNA1sMZp6dBKbRg2gyW79N80yuX8OdokNhiKagJzej%2F0PnpFXprWEatXBpmolfUB82iytHTOpcHnZwdOJkbCR6c%2FT4j9mnTymwnkj8aq2VoDJEe65TGsRHGw0ATR1MnDGVX%2FjeQnd%2BwpB3bEYZ1HaAGek1OaSYvKptYLKnUBg3VrJBrOIfoQ7DPUvhmQvBfn61KLVoKRySa7Xf0sFV8jCg0OTNBjqkAXxuurGjSX6MKb%2F0nnJiM%2FwbMRNMBgMbnsMIwT7pVAL%2B7etdTMyqkta%2B2Fx6f%2BbydXw8Ea760ZuCRF5h7jkL5hBOizVIqz40Y7GbBMz2qHQcnGoJOjyNqIYrDIKCWs0nayXmmtCpeCOioMCazHKJR6oyb9Ifzzeit5JX%2FmmQvHGTUzpOZkUW%2BFjX6KhdaWWWwM3ijd%2FN7Mq3HsDzqTrB%2BAtyuSLr&X-Amz-Signature=9ea446fd6250894976dfdf20834533208fd9b6fc8fff37dbf88d38f03db6a4b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZMHR5O4%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJIMEYCIQC7uArdZKLfmZfSh0yxsZruExTjykSKDLwqa3AQ2jWsHgIhAIqrQTXe4635b5tE%2BLCMcDRPkBIBMRHjcj9Fq7aYrtbcKogECOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw10m1PVn%2BzZBY4PZ8q3AOv2yTDMQ3ZUWUjXhcaqFUg%2BgGQE%2FZq7Oez4jZ80apoh90GDGzlZ6BnC70kFZoXKvRdYI9CQYCz8akR2%2FbzWm2gLLa0DpCuBigszQclcuXqv%2FLTXhfk8uI3KlIaynRYiyUySOo2dLrX%2FUkdqPhZDESZKIBSF8DH685IrzVGfqVgocNdUdgdSo7dnnBXFt4eWIH%2BONBd7YTBXHLFRQU7y9Oi%2FvzlanvsjSlfgAEd3K7yhGwcIXDuFMHPBcEKm8fQ46CIU3IoFgphGTHz%2FkYbgNCTAoiBf8eAQOixYr%2BBQ3S5s5EqadyVZLr8MRI4YEon6iZYP7SMeUYU%2BVXnwI0Bjq7WXkQSMa7%2Bx7QIJQ1wtf7%2B2U7kexi8%2BNw6LjN15tyUluW5A2h57v%2FM7Zx16REioQlebYAuJbMwGWsW29PdI933360iljh1p9zqnizEjApkCCzJ3mE3nXFrGh2e3iX8eve3bcqYM39HB5miZIn4azY8mH59Silg5e0L5JgGhz0J8y4ZaBAKSfQtNh0K0YQLRiBNPkTmgjRFBxDSnWZBfmIwQ6%2FuUCPeDQ%2FLGljByYnWg1OfO4yUptvYNV6I1lplrRE729oKu80iRmAAiYcpsKjAJ9Zk8qLHJWF73s1RVjD0zuTNBjqkAX%2Bc9PvrXFaOGqv1b0IrPhm1BmGlHApOnQ8IlWeOeAA%2FnNHcgSZ6ygPAlOmn1ry41e3DK%2FucanldiNggnaS6AavhLzICBg0AWSxuW0sgP5ShPyq3D2Cl3cgXI8ZTTukNYeBm43Ku7SDZa03on%2BMF9D%2BPdIuehYXnirsDmxSgFTXw6koulh%2BHFyxbts%2BVGprmXKWqGDfy2wuJLoZBOTcV55GTPz1Z&X-Amz-Signature=efcf3ed70af58a1ba1e5424ec768869534c1ae8db9c425c0539f76adbf8323de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BQVS2P4%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJGMEQCIG1Y3MfjnbsUlbarEwJLacU%2BJPnCTWjd%2FFSWAZl4QwwbAiBFZ1jn5MVOW8vCSEnbsoY630K8ktqz9SF2n8m2vszWUyqIBAjr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlIpqyl6XIhF3jmTXKtwDP8jT3RKlYVwzHG7ziGzXBeA0JgPvhdKaxOsRsk%2Ffpd6Oxz96JotJeDGEks9JKP0d8AskxWqgiob7IeX5F9%2BxuQ6CWmMKINTOSbjsCxTc0Sa8NqGsMKIU%2Fw%2FllzEUC4wgyOFSGmjbbHaUvHgBI%2Fytg%2BvK%2BTuu4RY8qK8%2B8sGWOz4wl%2BAUG0XzhaPj1wCCcIFl2r83HWpk%2Fu1ZyC6o3mdsPwZdr7VhqVg9WgcjeBjyqsvXeMUYC8s%2BVT4SmyV93M4xyCyKovOpTHdStr6PdaNP60vZdeS5D0GnRez4vzXyHwU86GxgfvhJjAbMhCevK8HN7IMVmBaKZQG27kyuQIY8vv9PJZ7AAzS4LxGRjw%2FxSLU8rKP%2BkotRMwu0aOG894Ax6OpYAbSHU%2F9abkpzavuU06zfnjvH6LbKt3d1v6njrmN%2F%2Fc4Dz6LOTJXBLtgaX1IHiE7I2Ob%2BX9Oqy7%2BbQI86J2Jtoiz%2BfgqHPwy0m1m%2F%2BCdCgewDczQ3ervqr%2BzJ5rd0vkqwdNZ6Ld700aEo91iHoXhy8jhBJkuFT83lbeF4A6NsC0N%2FriUMZ13DjP3JUx3Qxjbn7UmkM3XvjBkMTycc2sRkHz1k5CS2HfFG86LI%2BwQA6sNQwuIm0rG4T2UwpNDkzQY6pgGqqUBs1G1zlnD4q6zwOx8Ny4mpBNsiWxIWegifpoK7uxt5wXInM9Vwo7kLkCR8AqpozLV0YMrD9RbUni2SQpIACkosdwq2poW6%2FHkSex2lA4GSxXG%2BdegvyFNuFBPI370zUsECPNhI18sn7onADJ1KL17Mgx2ov0dBG4eg%2F2kpNt9Qj9DwolwmNxxKXT4A6dNm3xk797nD7GmRb44bjjRGxIwmfeDy&X-Amz-Signature=2c25c9699dcbda4404a4af551c967a98ecaee3dd687ac1cf81d2b51558e1de87&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTDUWJ6P%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIQDMlsYdFAw6i4plJBWdk8s6TuSdLJM3FskUgw0eE138sQIgGl9Gpoorp4JzuzuThjCNNOldE3%2FO50swollfWynlwewqiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOw%2BaQBuecfXOA0qxyrcAyMNbtOA6oQ2tqIZEpm64UuiMQjpQLlLUFYPq7BhpxkVjLedbZWIysLzdryz8%2FfDyBQOoXZNN8Q%2FoMr%2Fy1j8dHBrinn3BdO5BNOj7tV24K2f29qeoOEtBMPopvWqQbKxaO01Fkf2vNNOzhist8ZZvZG9pY0t5ZO0pXa66W9BUT4t6DsPRb2CwgUgdH9axlOkcu9Fl4Ay0kV8f36abul%2FIeDbh7voi%2F7uRJvA9h52K9%2BObxTAD77sKcm5oL6QQOMzxnH1B%2FA%2B08RteK47G5XbgAT28L3NaKoxl605NEOYZBcwetna7OdIeUSAXexNC5PWl%2F1aPRFvkIA%2FBotPhAXu%2FSTh9jM28SZRkJ19%2Bk8791azUuMbjJYcFxXGhfKT4igMITfcEybINTh77luecMhPq0oGrbYMgBr6Wo2VRxXAjWFNHDoqaod7sSVaVPXN%2FtNmgPSdJFCImGVCAIdbXkOcuOC%2FO3yJCjVYcnnjTMO%2BxsGkUoUBIqPErj1GCW8DEtROiEqcfCXy%2Fo4FXtezVfMDGMbGcQLF0IE9B918SizdgiDx5UUmuWZ61Pp9WRzZMxYTGrFuSvjd%2FsmpMuA2je5RloudypVlX6UOI4yn23qFU48MC7vazGv4IzT525s8MNDP5M0GOqUBImJNv33%2Fsylp5ozfdu3XthYUwkmJLDtiGucPKnSeUeEISz1VBiadTHbqOm7EkavJDzFfWdJ9iXcFJZiTaMW3t3b2TUMlknzGFQM8ObGm2qswT543uppHdFP%2BsefvD5%2FPWJddj4lTSphbhPsHWuFNRBvbI9mTBAlXAC0vScd5m4WBlEAm84ppbqsdkLmwNpvEjmvo9YcB3%2F1fAbBdEdQNK5RZ%2BdAK&X-Amz-Signature=471c789ff6d4d953b3ed1e8964476a0a9c3a3cb84fdee8f89e758c4cb9c6df40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTDUWJ6P%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIQDMlsYdFAw6i4plJBWdk8s6TuSdLJM3FskUgw0eE138sQIgGl9Gpoorp4JzuzuThjCNNOldE3%2FO50swollfWynlwewqiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOw%2BaQBuecfXOA0qxyrcAyMNbtOA6oQ2tqIZEpm64UuiMQjpQLlLUFYPq7BhpxkVjLedbZWIysLzdryz8%2FfDyBQOoXZNN8Q%2FoMr%2Fy1j8dHBrinn3BdO5BNOj7tV24K2f29qeoOEtBMPopvWqQbKxaO01Fkf2vNNOzhist8ZZvZG9pY0t5ZO0pXa66W9BUT4t6DsPRb2CwgUgdH9axlOkcu9Fl4Ay0kV8f36abul%2FIeDbh7voi%2F7uRJvA9h52K9%2BObxTAD77sKcm5oL6QQOMzxnH1B%2FA%2B08RteK47G5XbgAT28L3NaKoxl605NEOYZBcwetna7OdIeUSAXexNC5PWl%2F1aPRFvkIA%2FBotPhAXu%2FSTh9jM28SZRkJ19%2Bk8791azUuMbjJYcFxXGhfKT4igMITfcEybINTh77luecMhPq0oGrbYMgBr6Wo2VRxXAjWFNHDoqaod7sSVaVPXN%2FtNmgPSdJFCImGVCAIdbXkOcuOC%2FO3yJCjVYcnnjTMO%2BxsGkUoUBIqPErj1GCW8DEtROiEqcfCXy%2Fo4FXtezVfMDGMbGcQLF0IE9B918SizdgiDx5UUmuWZ61Pp9WRzZMxYTGrFuSvjd%2FsmpMuA2je5RloudypVlX6UOI4yn23qFU48MC7vazGv4IzT525s8MNDP5M0GOqUBImJNv33%2Fsylp5ozfdu3XthYUwkmJLDtiGucPKnSeUeEISz1VBiadTHbqOm7EkavJDzFfWdJ9iXcFJZiTaMW3t3b2TUMlknzGFQM8ObGm2qswT543uppHdFP%2BsefvD5%2FPWJddj4lTSphbhPsHWuFNRBvbI9mTBAlXAC0vScd5m4WBlEAm84ppbqsdkLmwNpvEjmvo9YcB3%2F1fAbBdEdQNK5RZ%2BdAK&X-Amz-Signature=2177aaddce50c738ba68c221d2b1f4cb948cab1d332ae39d726de9e9d897f5ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627X4LFEX%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIF9RrlIki7QuzZnK2PrrMhrlN08%2BwkJPN8KsOVbympF5AiEAwMdGhYwUcOZ1OcEI%2B8abXtOIbH8%2BNZJkAZ8W68K%2FNDgqiAQI6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGyskUE%2B5tPstK7Q7yrcA4FW6%2BaR4AZZ7MR7S65%2B8nckYfML32RRN%2Bg%2BUevuJXWpqfWYT524dVnuD4MXaxtoGGvVGH6n7h7SLgTaEENMCa9QbdnynKwktk8rcKWBhAqJf0j3JupEbSDrBcanB5kUXp%2FIRYTLiM4UGLAHlLPJXG5fcl0ydvZdRtZ2hMNeLhCeN9%2FqJrs4dJ%2Fa3btPxYhGO5oobVKAfy5Ng5CoCN81LYjfnY2Z%2BPUH1O6uCBfqbapNxys%2BQI%2FeSIPqamFc%2BTVi0EME9vfplybrF2ZI19GH2fPqz7U5zXkp%2FjUUIVubNdwqXBhYMZJizoDh%2BCy7Z%2FxkXCrQM6mrSzzMD%2BlvG8x2As2XwKnU8aW9AM8F8NIvE2nJUsRhKi5H%2BGFCRXtTLhG9%2F11uvL1q0vZDpLyvXd55R%2F5kOAAL9e7C9Faqi2dVHp8liPiq1y30P6Hp17S6u2z1KhTydx7FGoEYzyFHdMKAfw1IBoJiqnfPAjYQqw%2F0MV6r5S9lzfw8fUjJMHXm0A7jDPz%2FJ4MsSW2NrVPu27btyZMjCwPl9VdR4Osao6LcYmeYuCGlpr5%2BfQoKKNEMtTPpaRA79ggEVgnKGrDY5OaW%2FAwuSTluUXRWkStW7SE2DNjEJvL3YOuwTkD5%2FDXuMKnP5M0GOqUBYLSbHCMW8eTL4c9wB5Z%2F8V9NDu2Y1lnxc8AF0UfyDFxYxlk1BrSufzBl5hzjLHfRMVEqZ%2F6WOnSc%2FG6zz74VLlp3Z7a7hv3Mv3oeb3oQfK1t9TplUWF9URglsfyncVCm3J8U3lTIgVwfzsbiBMpTRLjrTw4fXOUBVIjx6VEy6Egc%2BFZA2%2BsyIiy8oXhMQuwG4TtkhtytroX9hcHgrz7A7iMMO%2Fq1&X-Amz-Signature=cfcc3706ad5d69f93b3e48c233d189d0caf5dcaab832f6eba6c12d3d845323a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXCUNC7I%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJIMEYCIQC84RTeDFBYIMFwfVTk9LhtPtrzqKw223s1fjLYhnuHOAIhAPnYlYCx4LLv5M3x25meKHtE%2BGPjdMmcacP9ERUdQ9M7KogECOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwpyCz3%2BP93w4yn9SEq3ANzBo1bvg9nXnNiMcZam0iDaeq9uQYcw%2F2tu2NoW%2ByIaO7uPymLBSc96cLyEBvbqcjybxAtgxMzJePqIY511IeiUH7krAgfI8CwhyLodHMQTUL0kn03ez8spj9NYq9kOs2soBN1rwk8LPuY0rPBjQoBnpTrhE1zr189Fop3Kk1WZQUuWCtzCfBLJLHr35wq%2BV61Fr1IhhuNHH43IJAzkL7T6OH4P1JxeZzA7y%2BlL%2FBPR29LbxbfUOQb2qqJXTedzFnoX7pFjLYHLXwe%2F9x9YWqAZPL6OuOdl2X3YrNLE3m3ct0U2d92BkE31lYhE7cDxvsk%2BeL6DDxnQoNgrxoF3ZE6M3aDxzFGAs7g7Dy%2FqcSuyDKWQclIBTuP2CrFExjAUTc0DndyeuwNsSo6atCnWI8b1hM7Fp4l3AbR4mTX%2BIr2Qa0hX%2BWWgcctg%2BtmpjclWbgb4Y%2BuLNW3NqF1ZCJHVgRi0tMF7weH%2B2e825G01M0ReqoeD92syeBNTRNKXqAjhmoIMBCAQ74fGMSoyKC8byvW9IDm8zFW%2FoqszeAPbDUMuGdszWFLiFoH6qhz0uskdZkI%2BPrldaj1XR70x00nPqFVBVdvcpKqnOhoDRoaRRbpuOC6dGJcfdx9inoBkzDU0OTNBjqkAZZ9imtltrskUfZ6Co5elZcN3jG8GVQfPKYaxFWp4vfRwui0cTxwK9z77R0%2FW3%2BoLXbdIEU6Prew%2BW1n5nJZU99W4kMkGIIyvLTJ%2BkTr61FOPzXPds0H6D06%2BK9zg%2FHtbDkTXxkRfnTEVWmifvniB3klpKRCLdp%2FTI%2B8zoXYCITNjalOsOB3n9oXV0A5nN%2B2z1qJbwvKQ%2BEvtiEsx8K4atHpmmiH&X-Amz-Signature=786e3608fa704034b884c6053fac0bc8ff102ad22376671d588f7c52fc8696c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXCUNC7I%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJIMEYCIQC84RTeDFBYIMFwfVTk9LhtPtrzqKw223s1fjLYhnuHOAIhAPnYlYCx4LLv5M3x25meKHtE%2BGPjdMmcacP9ERUdQ9M7KogECOv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwpyCz3%2BP93w4yn9SEq3ANzBo1bvg9nXnNiMcZam0iDaeq9uQYcw%2F2tu2NoW%2ByIaO7uPymLBSc96cLyEBvbqcjybxAtgxMzJePqIY511IeiUH7krAgfI8CwhyLodHMQTUL0kn03ez8spj9NYq9kOs2soBN1rwk8LPuY0rPBjQoBnpTrhE1zr189Fop3Kk1WZQUuWCtzCfBLJLHr35wq%2BV61Fr1IhhuNHH43IJAzkL7T6OH4P1JxeZzA7y%2BlL%2FBPR29LbxbfUOQb2qqJXTedzFnoX7pFjLYHLXwe%2F9x9YWqAZPL6OuOdl2X3YrNLE3m3ct0U2d92BkE31lYhE7cDxvsk%2BeL6DDxnQoNgrxoF3ZE6M3aDxzFGAs7g7Dy%2FqcSuyDKWQclIBTuP2CrFExjAUTc0DndyeuwNsSo6atCnWI8b1hM7Fp4l3AbR4mTX%2BIr2Qa0hX%2BWWgcctg%2BtmpjclWbgb4Y%2BuLNW3NqF1ZCJHVgRi0tMF7weH%2B2e825G01M0ReqoeD92syeBNTRNKXqAjhmoIMBCAQ74fGMSoyKC8byvW9IDm8zFW%2FoqszeAPbDUMuGdszWFLiFoH6qhz0uskdZkI%2BPrldaj1XR70x00nPqFVBVdvcpKqnOhoDRoaRRbpuOC6dGJcfdx9inoBkzDU0OTNBjqkAZZ9imtltrskUfZ6Co5elZcN3jG8GVQfPKYaxFWp4vfRwui0cTxwK9z77R0%2FW3%2BoLXbdIEU6Prew%2BW1n5nJZU99W4kMkGIIyvLTJ%2BkTr61FOPzXPds0H6D06%2BK9zg%2FHtbDkTXxkRfnTEVWmifvniB3klpKRCLdp%2FTI%2B8zoXYCITNjalOsOB3n9oXV0A5nN%2B2z1qJbwvKQ%2BEvtiEsx8K4atHpmmiH&X-Amz-Signature=786e3608fa704034b884c6053fac0bc8ff102ad22376671d588f7c52fc8696c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RV3CO646%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T103705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJGMEQCIByHHmmfJs%2FCa94zhnXffNTeIPIOTbPKNUXiD3Xou2OEAiBkcAKf%2Bf%2BXH%2BUS6Zc4Wh09ra4mnGBFaoSTz0zvBv4ceyqIBAjr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMeK18KHo2aPfkblmHKtwDeFXryfgJ8hMXJBpwixHDHNQHu5wahYHWEunMvMywwG7FjxrZ2%2B%2BwQ0IPQ0xt4EkPLQ0SV3inxF4sUnGc9%2BkVa6c0JDHF0miVxuy%2FGH2S%2FJZFy6pudRABp5BAXi2kcuhz5VXrg0oYEwgmGGI9ZnJf4I0ofNOR8HRryx3a3pL1sMaPuVj8HoCQefUh6yBLLGZmRERvCv5k6%2B36OttyicCib9QsbqG25MRImksxZG4WdWcCYHJD%2FFVTNSvv3XwY0C%2FBxdAmUH9VQiDFo7KnjJeiBJA2A9E5xhiuoQVw3px%2BvRBDQ2kH2YlGdvy7ZM8pUkUXfKw4cq5RFQjZqCt%2F0OQ%2FDGs8S%2FM3SiDJbTSevvD8lLTSd5cVGkpKFO8R39AfkG0wt3290ksrNHyHcK3d27Aq7Mbikf8uuzATKtdCFAvoLlQHmz8YZID8ZdJdFVCTAGwz8VZfd2qTWXKhyT993oqkFPj0%2FYdUZcda7sFJowJcU5JmT7%2BT4982rODv6MukRChmhkuMDjoDGvbEvAcUoatiqJxQUibsOr1zH6EcYn6ENcCr5BADWCVzrhgRUCpS9lXzamrWugr7gOMv4KE0Bw%2FQgKLrRXmj4no0GYEjDARwEBYmelAzW%2BXQrml93KAwls%2FkzQY6pgG1eFQQZvUnCf6lR6MzaMcAHKGzBpexl%2FPiogd6CMPjnJ1ykAHL7uicstA0Z5vVvjv2AokoBikhH9a%2FYmxDCuNp40bNlnDNC2G9Dp5kJY1M2yavQPM%2FCi%2BZ9w3IQ1oN9eqrTWUOPMh2cLu1LhqrM6WFZOSCQHYFlshOct3cTcnXRk%2FCkPRFAQqcH%2B5SIGy3ogTJZ5tybSB4J%2BfJcrgY0qqkVVK%2B5jqk&X-Amz-Signature=27314c2bb61bffd65f34d0af24eb79a0dd903022af80c57e8c748b0702360bd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

