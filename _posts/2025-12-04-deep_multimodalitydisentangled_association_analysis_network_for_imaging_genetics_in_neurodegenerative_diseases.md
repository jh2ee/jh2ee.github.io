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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637ARRP3V%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T191146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQDWMcL8LZKCKyRn%2F6tSWgxbGn8xXAfqepM7VPy%2FJHMJRgIhAPwHECkf%2FTVfYveEazQC6ujvaRYqSyiC4ycI7FcV2vN8Kv8DCAQQABoMNjM3NDIzMTgzODA1IgxHA0%2F4egvCSpjR%2BAUq3APHFdSUa8Ymf6LTGvAiRJ2Z8%2BxTT4YgrPwavCbAjbpXPw8q3GReDzTUjDom3iDTS9wzbJaC3LaGbyETu7Sdzh6Z72bfZETT4SUKOvp9Q68wdEQaVhjXKLPeYSwbobmO6Sdv1Gkd3ykdTEYJuHHfdU0qMrsVkfcJ%2FETLPTDRFvNQXh%2FDRxvnYa%2FxE97QFh41p3wlOukYbMKdqNs0F45u7Xc8lv1G1baR11z3TsaNpfpvfaz%2FgnQwmKQSzVJ%2FQrzCPOT%2BybUn0KwML6INcE3fHV4pAayzrtq%2Born1QNX0wlxkIy2zOtHFCKjt7lO%2FoZ1R3btovkTilI%2FCZzzRONoJ8YooctMZ0GhnoIS8MeO5G2rMNEpD5TieUy7twPC4S4c4GvPa6GG2bQXIWA7H8jK4IegxEvJGG9iF2Pb25tqptB0n7ru%2B7VuUDVGVuDeBd5sVjkMmk8GvWJJ3z7w5V%2B4PTd48P1WSfU5lXQXN%2FzyT%2BhRzt0ZJL7iOK7K%2BCMpt4p6VWxQQYrGvrYRJdogt8nGgJQAgbDwdOeeZ5Fth5JMEjSYFxRoqPtqyy%2FEJ4oMcn7KgrC48nWWyG%2BYh352RvZNphRDcCNoTtQiAGpQdunF3i0p6OvVtlbYKLgdec7zs8TDD8LHNBjqkARj83J26dK%2BzzprgZmD6W5i5uTQ9O0K4IM6Es18vb71y3UR3Ro95SX7%2BtXto6A1snNP4LiqdKmzt5AAK3zOn5iUo4iimUsFbYh9ouSD5KXIxOhY5RAqwlLlpHkN3hw8UAZV0Frt8HEm1eIOMWNakocpPIJX90mEMnUdbF6rSCBR6ZQmx2cWGr5CTEgRd9iPHfjMaElWpqhndOz%2FUFAW%2Blu7P7os7&X-Amz-Signature=d0393a2b58e182c3af003d7368543886edb52d16550ecd8086da6558cb2c68f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637ARRP3V%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T191146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQDWMcL8LZKCKyRn%2F6tSWgxbGn8xXAfqepM7VPy%2FJHMJRgIhAPwHECkf%2FTVfYveEazQC6ujvaRYqSyiC4ycI7FcV2vN8Kv8DCAQQABoMNjM3NDIzMTgzODA1IgxHA0%2F4egvCSpjR%2BAUq3APHFdSUa8Ymf6LTGvAiRJ2Z8%2BxTT4YgrPwavCbAjbpXPw8q3GReDzTUjDom3iDTS9wzbJaC3LaGbyETu7Sdzh6Z72bfZETT4SUKOvp9Q68wdEQaVhjXKLPeYSwbobmO6Sdv1Gkd3ykdTEYJuHHfdU0qMrsVkfcJ%2FETLPTDRFvNQXh%2FDRxvnYa%2FxE97QFh41p3wlOukYbMKdqNs0F45u7Xc8lv1G1baR11z3TsaNpfpvfaz%2FgnQwmKQSzVJ%2FQrzCPOT%2BybUn0KwML6INcE3fHV4pAayzrtq%2Born1QNX0wlxkIy2zOtHFCKjt7lO%2FoZ1R3btovkTilI%2FCZzzRONoJ8YooctMZ0GhnoIS8MeO5G2rMNEpD5TieUy7twPC4S4c4GvPa6GG2bQXIWA7H8jK4IegxEvJGG9iF2Pb25tqptB0n7ru%2B7VuUDVGVuDeBd5sVjkMmk8GvWJJ3z7w5V%2B4PTd48P1WSfU5lXQXN%2FzyT%2BhRzt0ZJL7iOK7K%2BCMpt4p6VWxQQYrGvrYRJdogt8nGgJQAgbDwdOeeZ5Fth5JMEjSYFxRoqPtqyy%2FEJ4oMcn7KgrC48nWWyG%2BYh352RvZNphRDcCNoTtQiAGpQdunF3i0p6OvVtlbYKLgdec7zs8TDD8LHNBjqkARj83J26dK%2BzzprgZmD6W5i5uTQ9O0K4IM6Es18vb71y3UR3Ro95SX7%2BtXto6A1snNP4LiqdKmzt5AAK3zOn5iUo4iimUsFbYh9ouSD5KXIxOhY5RAqwlLlpHkN3hw8UAZV0Frt8HEm1eIOMWNakocpPIJX90mEMnUdbF6rSCBR6ZQmx2cWGr5CTEgRd9iPHfjMaElWpqhndOz%2FUFAW%2Blu7P7os7&X-Amz-Signature=d0393a2b58e182c3af003d7368543886edb52d16550ecd8086da6558cb2c68f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466USHPF6BJ%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T191147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQCKy%2FuqfAUud4jX5XLaxPgMMrvr4JiDPt6DXclN1rRYkgIhALhmzxj7JxDgZGsUBo3kGRzUjQJOaGvnRCFFBggDP1u7Kv8DCAIQABoMNjM3NDIzMTgzODA1Igw1yPnXX5d7meMP%2Bssq3AOwbms8n%2Fq0MVhwNYW56xq7bWSZRGEgODSGqw7QuIIOQKYTsSG3HrwMPziXEx9CZPKItclQxNXnFDPT1WGM%2FOB6AfYiMHEw6a8TsoyLIdJD7FZZ6xLyEeYFLYOAgLuH7yjc5N7txrdycAPRcZa7jvKNBLTB0AcyF02RW%2FDokyQA4yQd%2BITTxTR9WHgh%2BXH24As%2B2Gr%2FKAwBwdBF6v1kG0OSogMgwci8Jr3FXQgA%2F9%2BIVt0eirpDUmfu7ZD2jy6rdRkqTalENDT%2FicxJSl0r37kNI4biUq5OI9Wg56h7YfdeH8VvhVgb4lJEeYzj9ohzwTHgjxEUBWtYDdXMB1nAJq74POsD4nAM9fZtc0HEad3NJ2BBVpvO1%2BbUgzojPsKddD7bflUr8l7Nbg%2B9Kwjccge95kQXnr4lBIomUFM1wtP3l5vKZ1g%2B7JkV%2FzERQD78dTs8lwjOsx7U0gBmOHqRZq4ve67X3zkBBd5aDUMuQTPPU%2FOVgM1jj1GlZIE9yHtlHkFC7cIzStTTI13WjiB2KpqQujFdB6ewFBMnFjl0IplHGnzfutYu1lylZDA%2BG4DI1%2BkQyMDrR57jt33cS%2Bl3Gb26xCXh8JMEr7asSr1fKeWXVab5pRPyl%2BUQ%2FfxUwDCyu7HNBjqkATS2rJtOoD2bmfdW%2Br0jEq4IrWNXQrAAJcEQnQ6M%2BuZWPpdrlVD39Me7aNpfr%2B%2Bljygt1jDnHEWoF0EC7w%2FbW8BTh6YpvEqDSatfsSVgfDEXTLveVMPafzkXEUI%2Fa6%2Fal27ikNMGCX7%2B1UyQYZw7kChn6gYM00chDl94BgpgpSZ5wF%2FOBt2mPE%2Fz9%2FdRgqJVoVM3n6MmwdUlp9PmalExnHoRnOTl&X-Amz-Signature=6a8ed646c6f8e5298fdf895a773df3840a769337852bb1d51e9b1cceb9c29419&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKZHJVFW%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T191152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIEZd%2B%2FbRnxY%2FEw9t73%2BJIiD1GJujO96MoSJE4dAGql3UAiEA%2F0q9Q%2FtE7dvcyG%2FvQuXYsLud9mlMh%2BarxSx9ZdjdS%2BQq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDDRAMGL1lmA8eGJWDyrcA8eJC7Gfkl1SZ6Iybn4BSoDxjt1LBY2FM0d9NLh7DzwyUR5SZTE6zZUNlIga6KnkKznVx4o%2BPqvaokI2ZZ8nrGB8Kutk8C9CrHKuNy%2F8VEjIPlB7m12D9HjtzznMwP1tjJkW17MxeTf3NWSQyHI5%2F51a2oJMFtTcWBCoo2isCbcM3NtveCjS7BpjAIFvUMXKm3VdkvCnoajghiRhnEFK5yK1yGBZj5RUXqD0Z650Catp8q8d9E%2FrqkgntuVGw50kEntZxTIuMl4Bb8AI%2FkJdn794vQsKcv8topzp7by6RyNElHAtBwWLWTsSOFPxFrF7w19fDz%2Fp90xLN1z0oJo%2FW7wOhjJB2MofCqWL%2F7ZBBUspJh486vAX1QvQ3qLzq2jWXD2TI9FvRSAFXV4J7OOSje9GgylgCgmXqekV%2B%2BHkNgY300q56Y3AXMbgXTYAPASV3kZ8kq8tmRltPuIME5TfgfzgrC8HvXHwJtpWMtHMhTNcFJqUfISlYv7C6rjpa7yflQ0H4WBiOS%2B87lDKWn2gJu9veJ3d0nQrXFnfwWoY0Z%2BY6BaNCApR%2F5cUr4ZnMuOgPpll5%2BaJclsc5L4Cm3dZq6p9ftSJX%2B2qDadkDfalNnw3si3qqHMXtFrM7rdCMPm6sc0GOqUB%2Bbax7M6MpqVijA%2BWTWF6AUy6G9SBm7iLbv0nhH5wm1dt0EXk1WhdKqDoLYQf8r77K7eC3XPYJRv2u61fVZ0gH5Qha8yIMtfqdyIWpSTb1kwN3GpJPrSm3OCidLbB9zdrJrP9TfWXgtiyT2voSFdfjcWhzln%2Bp6RuLqbeBcI3o5f19qnDWDbHIlkUIvHdsCOE3sSRplEQDXAPaeS9t5huU97agExX&X-Amz-Signature=09dab17f4f2127c71a1a69ba1b8c36709252876fb6f0036eec9fa7c5a080c8d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VKZHJVFW%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T191152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIEZd%2B%2FbRnxY%2FEw9t73%2BJIiD1GJujO96MoSJE4dAGql3UAiEA%2F0q9Q%2FtE7dvcyG%2FvQuXYsLud9mlMh%2BarxSx9ZdjdS%2BQq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDDRAMGL1lmA8eGJWDyrcA8eJC7Gfkl1SZ6Iybn4BSoDxjt1LBY2FM0d9NLh7DzwyUR5SZTE6zZUNlIga6KnkKznVx4o%2BPqvaokI2ZZ8nrGB8Kutk8C9CrHKuNy%2F8VEjIPlB7m12D9HjtzznMwP1tjJkW17MxeTf3NWSQyHI5%2F51a2oJMFtTcWBCoo2isCbcM3NtveCjS7BpjAIFvUMXKm3VdkvCnoajghiRhnEFK5yK1yGBZj5RUXqD0Z650Catp8q8d9E%2FrqkgntuVGw50kEntZxTIuMl4Bb8AI%2FkJdn794vQsKcv8topzp7by6RyNElHAtBwWLWTsSOFPxFrF7w19fDz%2Fp90xLN1z0oJo%2FW7wOhjJB2MofCqWL%2F7ZBBUspJh486vAX1QvQ3qLzq2jWXD2TI9FvRSAFXV4J7OOSje9GgylgCgmXqekV%2B%2BHkNgY300q56Y3AXMbgXTYAPASV3kZ8kq8tmRltPuIME5TfgfzgrC8HvXHwJtpWMtHMhTNcFJqUfISlYv7C6rjpa7yflQ0H4WBiOS%2B87lDKWn2gJu9veJ3d0nQrXFnfwWoY0Z%2BY6BaNCApR%2F5cUr4ZnMuOgPpll5%2BaJclsc5L4Cm3dZq6p9ftSJX%2B2qDadkDfalNnw3si3qqHMXtFrM7rdCMPm6sc0GOqUB%2Bbax7M6MpqVijA%2BWTWF6AUy6G9SBm7iLbv0nhH5wm1dt0EXk1WhdKqDoLYQf8r77K7eC3XPYJRv2u61fVZ0gH5Qha8yIMtfqdyIWpSTb1kwN3GpJPrSm3OCidLbB9zdrJrP9TfWXgtiyT2voSFdfjcWhzln%2Bp6RuLqbeBcI3o5f19qnDWDbHIlkUIvHdsCOE3sSRplEQDXAPaeS9t5huU97agExX&X-Amz-Signature=5af9fe44f7e6e9e699ec46ebc7e3d6476ad5d977f974a6ea25728e81f1ae9b39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKBBPUMM%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T191154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQCdzqIPTpy6KRNzVHVrYlTAjvXbrjlodP1UFpZE004hcwIgYYJ7c4exdSp8vcc0OdXRYQdVoyjL1QePiO2v5OSHVGUq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDJUZl%2Fh7qOoZwKtnVCrcA%2BSVAFBZzXTG0tnxRRKHviG4bfFubsuVzyjU7PegkwILsg8UBDslCQd%2BQVlL32TzaGtDtZvgqjZ0WaebB6IcESpNHpUzWnhJTgkD6ehxw%2FxY4%2BT6WwFWFUF35wkQnGuh551cSGXx54Sq634hh4TYeKhcqMN0FtFxZemCSgqjHhWFYO60n2R82UWl0Y5poB3rBG%2BGchE99nTnAjZQT9CzUQxxpD%2F8EthmAcXm6yzMP9zv%2FzewhPt49ZuUNeN1JLBvTspT%2FOGQq38lXm7roJcDZqWr4x1whTl%2FUYvGclpqk%2B8OEf5HAUmdQuiV%2Bws0E69OEFOMIAfaDlGMw0HaXQcC4swkT3z8SiIbVzXZzRTBWM9%2FNmIBdelVyMQo1B0zGlME66P%2For2J%2FAejEQbd6Y%2BxTWwCJyyXXhhCOAuEfXFYHP4beKhXPRoIF2Ja9AWPaHagvEU8%2FiSlcAvP4vBVWhV4P2azdcff0XZ%2BT60q4jphqH7HX%2FfOwwZkyCPvjXF%2FCHVmVONnHaoZN38zrBEVUv4cPQRV1T9vqUDa2oP97exUhSBfU3KChYOuEPwm%2B8s47hhSCCno%2FzoxtsTkWTCPcPcOT279EM3HdgagJcBpdue74UQF05Bmv7%2FmJuKYGTa%2FMOa6sc0GOqUBEx2XtqcIQhj50lzRVA4c6kjsWMk8hJYrMVDrew0eIkLUfenkqL1iI2SmEMbHKfiP8AkFTdKyGnCfq0ON7suW6mZ%2Ff8XTq7ZmrMn%2BowVel0x5M8O3azEgxEz%2FppGNvnU9T7f%2BRa0o%2F2CsduPcaIeua3Wj8lkD%2Bhi7benli3fcqMT4Ts7W1SPzCzr%2BIfYXQjIl1BqXK9SppkIU8Ref1HQLr%2BgPBDed&X-Amz-Signature=efa534392c59e252b45f649866b9796aca4b0ac0c1a623827dfbeb8e5acd0d8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VT6NF5ST%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T191154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQDuxvZz7H2pD7gmdH8L8NdanIKTVdUn1dhbZYYyuC473wIgUPE5VHiXZxml6vKXEGt3UhEA%2Be9GiXqWvHaS9%2BwXy28q%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDN5IDn6SnQPJswLRZircA12M70joOp1plKJVdLwq8fY2aqKgJRB%2BRk1%2BZknPXQmcTQ7PLuIAU0Eb35H1o%2BMauLbFSuRazrDZGD31vHHqmAFtIulDdmQ1099jp%2B3E3jtmTu7OD7eouM3oZcBX%2FLMDfOC1h8cWE%2BqPbaEEnhwoTGr%2FsA1%2BJmLEEKTyh6AgoC8Thfc5t6Ttw%2B4BI1AQhHd19ter6G2qIpbDZF%2FN2Twn0e6vP%2F3xVg382ECUMLYqgCGLAHOUWZPaaFGrxVSrrO07t6FncldjxA1xfbvTC3O5VQEKv0LUOtqUQuT1d8HZ5D5rBJ%2FpHlnDhx7PxXvWuuomMCnydoLF0Kf2qvI1SRDUkmXJJzQUVY5JzhYifn3aXEfCbL8uHWTOlzpSvDThrT1g7xmHODQUfCu9fl6fZ24Efw2h3lcMlQJzL6i2Xm4zV49NtlllspQ1ez9sQwIrXgqp3Ne51UfwEwlIwKiy3RDruGcy3i%2BFlquSOybNf00Frcw9N2w69d4WUW4VKXi8zvySvhvtzgNYuAGuqsb6UClgKiRtq6z%2FRsgZqCg5rTh%2FSsTkqm6BOHuXm4NVCKEghWiRDzcDW6FYxo1ZoiifD4%2FCcoZDK1BaTAecDQ%2BvYsSJAop%2FoUyiWBj4tUNPXc%2BqMPm6sc0GOqUBBAQ2Z%2B4T7exi5egyUwpWtuyD5gr0zBoSj4CvsdJP8RMTTq58mivl2iAgRak9Cb7p%2BxNPr8gJQrG%2FamErlBzsolpewz0aHOi5IZm%2Fp5VWSAqJ60jbI9ji1KM7FxYaQEr1OkqKYz4t5T6yId8rRGSOa3NYTqoZMQbTlWM8BOhc0V2WOGG92XNgFd3HuNZTJ9ijfRjnkGqRCBwGS%2B91dKEKh4CSuxct&X-Amz-Signature=3bf9886ba0b89c5ffc31baadf9c3398d7e02d073af008ebe584f53d3f565c64d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QNQRW6ES%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T191158Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQCnJznwUT5gXErjoKTtPHArrBMmLlP5fKFwNyc8XcpPKQIhAPyaBydGIpdDbW53M9O8umLXqezYwLTt%2BGbxeOWGxrg8Kv8DCAIQABoMNjM3NDIzMTgzODA1Igwo9qTm%2BsylfUpAhgYq3AOjq%2FOYSRnSpJdd%2FAXmcwflcIkWEPNHCyBldvwjzqApznTlc2jyUaJAPYx8MOMl0nTNOVWv4Zsxp1lxpFMKz3Q8zT%2F%2FgGhLbh3xshohmOxkGTUAa2jpwkvZm7io2As8PCPmyGsZENRnnBfZFs6%2B40E%2BCK0KqayxoM1G9KD%2FTfF8SVI8jtV8ikTvyCOX8FwUEccxYvisAzf4SmS2Tpo5BmcWwpgDHAIiMyIt0fnAnW3zZqzU0AESR7vumsx0mKO0%2B4Ya6CKodL5y%2FxhPcp1sha5vdHVkI7fgHhKvjheFHpjXjsxxHDdMuamsuknr9h4flLkIhmD2cyAjEp2cc3rsrx2OYQkya96mprZPnVgf4kRkCD%2BmegdKNkGJf2aYUM6Rn5V9iixiPY3Ydv32DP9Zn%2FhXdoGMx6bHEDFYc4a6ky14J6DsvgWoAhK0UJyYqEwhProWCdBve43Oh1rXmrTzm5vutsLZLyXaK1UPlpc795bMNTicabkTLjqcapWKRv85qX88%2FYa7JbRoGuBCpdMbWStq2hKjDXPN%2FOLnSOJ7nZhAtw2HKecfhnYJrdr9Ia%2FDvV4Nnpbkno36CxyWH3dVnuz5dRdJDUDLphspMRJx9jBc6T%2BdTppQwJpszm765zCou7HNBjqkAUaSXIsPbk6nzIOiidVMhGmBADrbVJ%2BsJsBjFyDzPFMB8xi%2BqDcUDl1a%2BhMfEMdUSLTF0QjUqnbaFwGE0AsreLJZsl0uuBLd00cf6eCcCk7h8%2FAAZ3eFIcbMplEg4cXZE3ACPB%2Fi0vpzDBciQvnC3ncKdcyQ13dVNvKU0W5vFeBzqW7g7w6tMm8%2FPsym%2Ba58KIm7RlX7EmwqmK9qKNlefiTc2Rk1&X-Amz-Signature=a397131abd475d28196da6da84fd5454828e21e4a2ccb2426921d92dbde86156&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZSBE5FJ%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T191159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCICEMvr%2FYhod8sygKV8Z0OoT5FOzaRkJxxd1BsYyCF1mPAiBQrqb3EANAVGCyh3MHjcijpvuetp6GMO5Ox6%2FLD7qzdir%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIMJifCvR1gv0eDAk5cKtwDgluwtphbB8vpOe8TS8wejGt6Ho5V0dhjitWexJ6pIbsjmfZI7H4EBKcgaXD%2BWptodgavfeB%2FFP%2B0oLWJnX2X1ycEkLUc4%2FN4CWqTeRVU9iQRJGwcB3jZVR26s5pm22yzycH5tPH5xvvtH6qQy0KBkNy9KrfaTdV64peYNuxUK3ybCPY8%2B4fN8mF2ySkxbEUjky2RTpnH7i1iu1UUx7XbnCbB%2BAfW%2Ba0wuHodYD1lTFrPsOGrC9GtICpqmvA5cymGnq2n0Sv4UnGzqACyedqnl%2BHjxIfZ10Nd%2Fu3iB4DutSN6I9735ACO4j4kEMJnxsgSdY%2B0MZOt1BqGeqqG3bMe6ffsJCehT16j7r36spSDzZD%2F8AndRZVXlOjczQyj4BK9Cinz%2FNULfhXU6rqtofpl0rJMN1Wg%2BePiZPvoCRpFpBsD%2BKVSYu2InAVNv%2FEJcSkb8vs5GN11rMxqS8kAyszVZR%2BdbMjkDxZLS7qUp%2FZsrEpTFKJ1u2HUly6dZHhTkz0Iiid33DmHJVZ9UwNWO17PrBPL4nB4PYRakFjpaRN3%2FV2BiDIcQgT5dQ47Xo5U6pT3JnKKx0qt1cTOTZUwxxt9V%2FJ3o1yW996mO5TVmaCiiO614NmucYKZIQWRWgYwv7uxzQY6pgGcdW%2FDj%2BbnoRWIBuxXCWiQ05fyYDrjQUnm9FxYI10BQ1BncGcSmV9jKCFBX91gEmxhY4U0a2%2B5XlTJq49UHFddsUNFB12kXD0veZDjIhKV5x%2Bel6gdJP9pTY%2FuC0%2BT8Ap7W%2FXf03vgWCJU3TUyvEEgr4uR1mGfEUvcnUuZnfm70o09B2nS%2Bpg37pgIw25eVFnl9IXqkr9QM0SdpTO%2FM2XjpEGO4b7e&X-Amz-Signature=aa190ece86411cee845988132da025b60c3a4a672bdc900664cf245844500837&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZSBE5FJ%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T191159Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCICEMvr%2FYhod8sygKV8Z0OoT5FOzaRkJxxd1BsYyCF1mPAiBQrqb3EANAVGCyh3MHjcijpvuetp6GMO5Ox6%2FLD7qzdir%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIMJifCvR1gv0eDAk5cKtwDgluwtphbB8vpOe8TS8wejGt6Ho5V0dhjitWexJ6pIbsjmfZI7H4EBKcgaXD%2BWptodgavfeB%2FFP%2B0oLWJnX2X1ycEkLUc4%2FN4CWqTeRVU9iQRJGwcB3jZVR26s5pm22yzycH5tPH5xvvtH6qQy0KBkNy9KrfaTdV64peYNuxUK3ybCPY8%2B4fN8mF2ySkxbEUjky2RTpnH7i1iu1UUx7XbnCbB%2BAfW%2Ba0wuHodYD1lTFrPsOGrC9GtICpqmvA5cymGnq2n0Sv4UnGzqACyedqnl%2BHjxIfZ10Nd%2Fu3iB4DutSN6I9735ACO4j4kEMJnxsgSdY%2B0MZOt1BqGeqqG3bMe6ffsJCehT16j7r36spSDzZD%2F8AndRZVXlOjczQyj4BK9Cinz%2FNULfhXU6rqtofpl0rJMN1Wg%2BePiZPvoCRpFpBsD%2BKVSYu2InAVNv%2FEJcSkb8vs5GN11rMxqS8kAyszVZR%2BdbMjkDxZLS7qUp%2FZsrEpTFKJ1u2HUly6dZHhTkz0Iiid33DmHJVZ9UwNWO17PrBPL4nB4PYRakFjpaRN3%2FV2BiDIcQgT5dQ47Xo5U6pT3JnKKx0qt1cTOTZUwxxt9V%2FJ3o1yW996mO5TVmaCiiO614NmucYKZIQWRWgYwv7uxzQY6pgGcdW%2FDj%2BbnoRWIBuxXCWiQ05fyYDrjQUnm9FxYI10BQ1BncGcSmV9jKCFBX91gEmxhY4U0a2%2B5XlTJq49UHFddsUNFB12kXD0veZDjIhKV5x%2Bel6gdJP9pTY%2FuC0%2BT8Ap7W%2FXf03vgWCJU3TUyvEEgr4uR1mGfEUvcnUuZnfm70o09B2nS%2Bpg37pgIw25eVFnl9IXqkr9QM0SdpTO%2FM2XjpEGO4b7e&X-Amz-Signature=bb470ccb52b6725dc6b1250989dd95f8c5b5c85823c0d7b47882574434339f94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPC7HKT6%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T191138Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCIEE5C%2BqT3HjKky7Ao1J78FbneGttDZawH8gxsihrPmYZAiAnKTHGXDVtQUmOYBHSZhwOW9gzs8zW5jhD5RgQBmZQVSr%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIM%2BmNyvJzPPhojc1L6KtwDZBJbKLqzGa%2B5kGRhvQQBFxRL5Vk0WPvB0gl1D4X89iqFMYmi5leZyQquw8DD1mI3L9DErbYTynBO2R1sME63gAFDGgrQeoWxvKk%2FxoGv8rUvNxwOxzfj5WD2e%2FcOZy1w95Rn8DFGowh9MdrasiAdNt%2FPRFd36HBmuv%2Baakgpq0jwW03kzRWvHfR9Nr32%2FeOozqaIRw8hMh0mcOdwbBsvjc%2FWC0UJUdk3htSpUOewnkX5cNyhSob77%2FG5gCQaQHEW0WChHRAlgj3FpFmPT9CjniDJ3NyPSPLBq9fLzuMOASeFDSs%2B2doPD7Qazk6QxZxnUPQ4qXeUzGfXJlDiMe3T4AEL0bxl%2BF83EkqhQxqCEZ4TO0NLy2OjDqoUsX378FnoLXTHGRm7dbFEvj54LMgrYkMFPReEOLDc6bV8pnoWIAQaZ8rhgNrLT4%2BIVitshdfN8AH8GeatJ7cBY%2F8Y4xYZ8gecBEo57FZwDDKfoURCyJYQQ%2FdY52Xxmos7jpoOcy5ClWpVIFZwwNhZRkXDrCO7pvNwSm0QEiA4l9S%2BI7vSHdIqHgQvA8jEISTqDGx3lTThDjS9gE0jKIrYYYPX%2F4xifxPEO%2BA2Ji2rpn1t7JPmns5CX5W3RO2dAZR8zm0wn7uxzQY6pgG4pbifZwaXMYB%2B5jz%2FHGRvs3lRg1DdjPdK5owLsETf7jzgJGIsiYr%2B6bEeLcc5l3wtUXNQ%2BPu2qMsW18UmgalBQFi4IXb4KAbaBexpO0k%2FHsfqIyVnnE7cWItJ2qTFKEKPgsw6BYrm5DFM63govgQF8DKWHBR%2FY3XUBXxHgy%2Bt7HDlzSLIW4jpQKhjZVU8vmLOJuMKLJOyWmipW1kbT5rwKgi32jCe&X-Amz-Signature=db15313b661b2ed36d161159ee03a640f9a7b45f7dab620dcf1ee1a028d38052&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BCYTNFK%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T191202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIDpUq%2BvAj7xkZWNWVOW9%2FyJhAA%2B69YkESwG6einzCc2%2BAiEAqxiPb9ixzqPENhMUxgJJ7TG08Tw5vBo6emOXwfSM3mYq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDG2vUyCqXB%2BtDsL92SrcAxB8ad0GLEEjTPOVLGNCaEHYMQrhcYEWxcZu3Hym%2FDhHCtYJIX0ANZnYnsN3K9w7Qsj%2FZmQaeMv0NUOVYmhS92QclFoldRbDz8FU8kaXKPltnvSdatRg9FBmIaQ0BoWYxGbC3TS6VM1zH7NojQFuxs3HXx22y021mppF8jxiUu5%2B%2FVRlJprbK%2BjfYfR2PO5dMf8bv6xDupAPirLqsXySC6St5ifekS9nZemePoINSxNQpR1nTZHIQkgAdDzkaraCckAzvdb1%2BQQZMv3Ka5eTDkkBkNtM82kEB8Orme721ug8mB2I%2Bw5GxzJn8zXgHgKNs2INydhm%2FRK1FcXzrtALevPR%2FFSmyyrpY16tQ3XoElkkbk2QHhbFA7xyJKmjPwbHhAV7XJ1IIAYBOJQn%2B8RZOqUGINWkBt9gagmSojpD4bXUVDXDumziX5YAao7MurANMNuLDfmGHf8VO8O2mLcxjg0saTds948WpbHFKEyDEqzBYvKR1Q9qrQojudDPDxmrGL2Wt0ULWnozOuw8WuiL%2BCicCnYCofYg%2BXioF9bIhu7iaftWAKW%2FrGGC9q3%2Bn2ho3xV2DA8mJ6NK7%2BGpkIPZADQIoa%2ByO2tGNXh9k%2Bv3zm7fReoudJCosGH5wOGVMMrwsc0GOqUB1s%2BMYVu%2Bv%2F8FVTDXmhCshbWOXtEOSVPZX1NhXZN%2B%2B7E2Oo%2FKMIYfCsI7YooCV%2Fr8CW5u1OX3tJV4FyWYBJOXAV92HCQh2fpvb%2FqbEHF%2FewGaXqYxtW5mtmr7mtmm2%2Fa1RRvCmXuKerAau8QKh7dpAQRfUPNvXurSIySFVuTB%2FXSEuzpWvn9v0wGE6cDAQ04oQjcw7wPwwhmUhIOQuagfh%2FJ60%2BUE&X-Amz-Signature=36e5971e2cc33678aa83ff21e783fee49879193f1e326d8bec581b9e0c8c6c07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662BCYTNFK%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T191202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIDpUq%2BvAj7xkZWNWVOW9%2FyJhAA%2B69YkESwG6einzCc2%2BAiEAqxiPb9ixzqPENhMUxgJJ7TG08Tw5vBo6emOXwfSM3mYq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDG2vUyCqXB%2BtDsL92SrcAxB8ad0GLEEjTPOVLGNCaEHYMQrhcYEWxcZu3Hym%2FDhHCtYJIX0ANZnYnsN3K9w7Qsj%2FZmQaeMv0NUOVYmhS92QclFoldRbDz8FU8kaXKPltnvSdatRg9FBmIaQ0BoWYxGbC3TS6VM1zH7NojQFuxs3HXx22y021mppF8jxiUu5%2B%2FVRlJprbK%2BjfYfR2PO5dMf8bv6xDupAPirLqsXySC6St5ifekS9nZemePoINSxNQpR1nTZHIQkgAdDzkaraCckAzvdb1%2BQQZMv3Ka5eTDkkBkNtM82kEB8Orme721ug8mB2I%2Bw5GxzJn8zXgHgKNs2INydhm%2FRK1FcXzrtALevPR%2FFSmyyrpY16tQ3XoElkkbk2QHhbFA7xyJKmjPwbHhAV7XJ1IIAYBOJQn%2B8RZOqUGINWkBt9gagmSojpD4bXUVDXDumziX5YAao7MurANMNuLDfmGHf8VO8O2mLcxjg0saTds948WpbHFKEyDEqzBYvKR1Q9qrQojudDPDxmrGL2Wt0ULWnozOuw8WuiL%2BCicCnYCofYg%2BXioF9bIhu7iaftWAKW%2FrGGC9q3%2Bn2ho3xV2DA8mJ6NK7%2BGpkIPZADQIoa%2ByO2tGNXh9k%2Bv3zm7fReoudJCosGH5wOGVMMrwsc0GOqUB1s%2BMYVu%2Bv%2F8FVTDXmhCshbWOXtEOSVPZX1NhXZN%2B%2B7E2Oo%2FKMIYfCsI7YooCV%2Fr8CW5u1OX3tJV4FyWYBJOXAV92HCQh2fpvb%2FqbEHF%2FewGaXqYxtW5mtmr7mtmm2%2Fa1RRvCmXuKerAau8QKh7dpAQRfUPNvXurSIySFVuTB%2FXSEuzpWvn9v0wGE6cDAQ04oQjcw7wPwwhmUhIOQuagfh%2FJ60%2BUE&X-Amz-Signature=36e5971e2cc33678aa83ff21e783fee49879193f1e326d8bec581b9e0c8c6c07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5LOJKAJ%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T191202Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQDfJaUC9wjTBCjDk7ZkW6SvwJC%2FV5ey9JXic53VhOnQxgIgbpgFF5xRisnNthmQc71x4M%2BoXUSjOXkhyrbr%2F2nTSb4q%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDCWNuGh398z2zvtgeSrcA%2FGTgkaY0jSiDnJCbRM2YBuZOanCh2Klm9zPUX7kcbQ6CkFBcvvZ7%2FzLj1o3h90LXJxBw4vC9bULrdBg2Y4L2U3RTHVxJ9oBlQYsri9MdsOcuM%2BBUpwdAnGjviepQQOsBn1j0SqMiRc0zR0SssC%2F5SV9PEHGUCgFlRxXccSmAffZv%2FSnMQtNvp8srPxTdNtSsc7ZNyEjgWNv3n%2BLPxjzCTVru7lguqy2abKCtxqoHT6eJ%2BVqWS0zMGFOhYmCGXWfl1LPlRTEJFnRJQFa%2BDuOvbxGGoqISBbxnbVn3ivWwGJnxYbPcm2E4f%2B1r%2F897kroDrLyxGcH1j4JeJ6VvLd0gqdYpdrufTH7Z42qLAR5kUCHHsVdOSpjsU0U8xvcaCc5rE1WuiFuRm%2FyFTTfoJkoCqRoesLjeSqIiQA2C3S4%2BWt8cUFYDdE5415ENg%2B6UZUJ%2FWosMdMx1rdhBs5QwQ2VFXzeieIpX52I8VJZsUvIxcs16KWGF37PT9V%2BnvtjIt%2B%2FNGZhpui2mBpju4PvnprhFuLcFy%2BHgDUylH7OcVlInhGpQwsFLcnnYUpqvnsL71tfoxnKeShhu%2B%2FuS1pjUYMqWu6VaoelgDBnyiXkx1PjsSXQfJgxlAyy2MOESQ0TMIC7sc0GOqUB%2Bi1Nw6RrUdAXC89AzOg%2FciNS5C9Un8ZRIIFtR0HIor7lXGv3VvVd2JCzw2iXk6h7j3Yjwyh4xkOezy9SLKpEZL2D%2BIVoBQ%2BLavh7I%2FUEaRhMRDPenv84smCbO0T8EI7tjnq%2FrMHArPHSNgpQt0PD6ML4Zc7ZPxRp0AkIbPMIbIKth2hehQQGB58yixG5rO2QaZNBBznfSrDEMe96YJDNyk%2BoHMW0&X-Amz-Signature=e216005f4b0d004317b9a5f423b4a9393903a94e4fb7cd41f3424807972b23f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

