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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3RCPYWS%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T135218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIBqjEWhp69xwX%2BF%2BrcKdlIx1BK%2BXM3el81yKvfON3i28AiEAoz3Y3s5SZPvDy2gC9%2FGgnIWMg%2FUMEVKVcvXjGd41PyAqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPMXt%2FXT74S10m8ggCrcA51wcn80%2FvdWJ5r0ws0warBYxQ85I3TbnKpgC4qQCu22AyG7xvMQAd4mqUXa1LouqYi1nHCRO4ae9mCLqZZE%2F8snrqaRfXHFwhMM6Tm%2BeU%2BbKXTMzbKFmX7J0Fl5re9oBrwZW605Jot1lEyic7lSPWnfpDHdW6OIOVuEGdODtpl3FIhgJNkWf1KppE%2FVhutBifcRL22%2F9nyr%2BXVFFJQXl4j3PIucud8y7SkxND%2ByMqepqSgHfq8%2BVECRQIunadwnI%2Fh%2BRgPauim8ULD%2BcslY6ylC4T62PbJoIAiy42ySt0nOE%2BjYtbpJl%2Fk8tTy9GOsEOP6R05vUVsgMP9493HaCWmDv6fBe9RyugAoOKQuRObwxY%2F5Ohc2s5lQVEpDI9MANaUxo6P8w7CVQjT8NIxLoHba9cakHNoYWd6944Jqxk4AJ5llyAqigOPmltLpSpzalHJOjJEI%2Bqk5Uf4sOyis6HadMm3Lm9%2FQT0GBV2AKvYEyBgtqSxF92SRJrRM9VjTFZHTXlcsZlnvOJZfKXQRrk6%2BO1AU2GeuJ90jHuEz%2BUExQuvLn%2FCWG4BXiDNApGBhkgjPu1AOMVGKbsUmBIr5hORakE9%2B%2F%2B2%2BGICeoh5cBkc%2FY7qJ%2F%2F2WCvU3CPq0dfMNXTvMwGOqUBSaofyAypF3gakcSdk6RsNyDq%2BTUVqU8pSnL%2B6OVkj%2FudQuxGMA3naZ3vdA0LBRMlr7fIVoHPSAhAqPHlVZh7nLeKRgR9fJhVPXfNltf7XT3xNbh9tbmxMx3cp2JvFjrdaDoVHU2FoMdyRbN57EeI5t8iCmvutgbH5%2Bu0hgkIgS8xHYZojoe22p0Lip6LCs3YRQiLVhb0wrWC2ezafZcItygSxW%2FO&X-Amz-Signature=5c388cde97479e5946f11f232668cd6263e06418dbe3da41c87bdc2c8323c4da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3RCPYWS%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T135218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIBqjEWhp69xwX%2BF%2BrcKdlIx1BK%2BXM3el81yKvfON3i28AiEAoz3Y3s5SZPvDy2gC9%2FGgnIWMg%2FUMEVKVcvXjGd41PyAqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPMXt%2FXT74S10m8ggCrcA51wcn80%2FvdWJ5r0ws0warBYxQ85I3TbnKpgC4qQCu22AyG7xvMQAd4mqUXa1LouqYi1nHCRO4ae9mCLqZZE%2F8snrqaRfXHFwhMM6Tm%2BeU%2BbKXTMzbKFmX7J0Fl5re9oBrwZW605Jot1lEyic7lSPWnfpDHdW6OIOVuEGdODtpl3FIhgJNkWf1KppE%2FVhutBifcRL22%2F9nyr%2BXVFFJQXl4j3PIucud8y7SkxND%2ByMqepqSgHfq8%2BVECRQIunadwnI%2Fh%2BRgPauim8ULD%2BcslY6ylC4T62PbJoIAiy42ySt0nOE%2BjYtbpJl%2Fk8tTy9GOsEOP6R05vUVsgMP9493HaCWmDv6fBe9RyugAoOKQuRObwxY%2F5Ohc2s5lQVEpDI9MANaUxo6P8w7CVQjT8NIxLoHba9cakHNoYWd6944Jqxk4AJ5llyAqigOPmltLpSpzalHJOjJEI%2Bqk5Uf4sOyis6HadMm3Lm9%2FQT0GBV2AKvYEyBgtqSxF92SRJrRM9VjTFZHTXlcsZlnvOJZfKXQRrk6%2BO1AU2GeuJ90jHuEz%2BUExQuvLn%2FCWG4BXiDNApGBhkgjPu1AOMVGKbsUmBIr5hORakE9%2B%2F%2B2%2BGICeoh5cBkc%2FY7qJ%2F%2F2WCvU3CPq0dfMNXTvMwGOqUBSaofyAypF3gakcSdk6RsNyDq%2BTUVqU8pSnL%2B6OVkj%2FudQuxGMA3naZ3vdA0LBRMlr7fIVoHPSAhAqPHlVZh7nLeKRgR9fJhVPXfNltf7XT3xNbh9tbmxMx3cp2JvFjrdaDoVHU2FoMdyRbN57EeI5t8iCmvutgbH5%2Bu0hgkIgS8xHYZojoe22p0Lip6LCs3YRQiLVhb0wrWC2ezafZcItygSxW%2FO&X-Amz-Signature=5c388cde97479e5946f11f232668cd6263e06418dbe3da41c87bdc2c8323c4da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCOZDDDH%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T135218Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIBo7UXcapNAsUADPNvOsPY4R0zLj9v5pH%2FnM3b0n5dnzAiEA4mTPixNVoVnxX7WNNq4GKt2u%2FioHL9EMTUBu%2BmZw5x8qiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC1XWL4k9W2y%2BtsPGCrcA6METWTroO4LjZSTJyf1Q0mi3QAzctKnBuNkmD%2FZzeslJBxsz%2FDvWZabKxfyCHDNmTNdsy%2BDhunZUVdEC%2BD5Ct1JRw9IMRpNBej%2FRpyUYMhJXX1tZXuxYFn70rHZ6tZc7LNYTzY5Qyw4Q%2FwaaWMQKJo4IszJ7VQYrL2wKnwK428h%2BavBPiJQpGv3V%2B3vRmzBH0Asxaw%2BYy%2FtBHrkkzU4PPB8LPBFrjAZ6bNLU928k0XgTZMxyME5yhbXPFGUhJcfNlqetSa7FlwPJOV9Ko2G3CpQLd%2FODr06NQDwLrhQnXvzUrP7mbb9ctFFwyR4lt7geaEDXkSHjwP7Al9mKUvHOZuMGEoa2ReMHTy6kyNRFLqNBy0KUDZ6rKslJoMPEQzMtpVS03Xs%2BR2wtF0MOkhwH%2BhYGCbcqGDc97BmIMbhi0auH7uH29eNut3fIGkGEv18BPL6xC9tffyVBLLoaumLQEUwg6zv%2BP%2BEN5s9miZkU8BpMmI5Uuc2JS4fR%2BIzQBt7Nq9V6XXxSTI%2FMpb3a5B%2BRxAOhooBe5co53G8VuAhwDrW%2FKqWJ6PnbkxSfEf6jsIQOdTFwm9EZT5xT9DwIDR12nu4Mie6lPWnraTPFSoMsd2JmU0tfE7PaIAD7phZMOXUvMwGOqUBvfmFaUapHzhvCrxLLlAtudPzSpRbOQpU7l58RAN%2BNX5G9iizXcsy%2BjGfrzWSHFsttYo8W%2BFRQaZb514VQIX59JbeoG9tJuTt1lwJmv3KvoFtqGpkW2UI%2FeFXvSip0XGhB6J3VDt5OtUbd0bBqy077NAmxqKoLUohh2kRMRM%2B1K%2FP7DcAeDcExIuBNjNemsTPjdvTObccfBdy8y0uktaBbOSVaZ9j&X-Amz-Signature=60ea6bda4f66b8f05e8489078f2a320c9bc799c83b13c8242e36773742871532&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656VCIZEA%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T135224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIQD6%2BjnN%2BPSYdwa3yCEO9Xhz6WyBqJFdBG1qPJaKf7HnFwIgbnhxrRURk1QEnNfxFp7F9CaVc0OR%2BvyWosAsMfrNyroqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO1%2FJENINXVOswQ6OSrcA3yQLPqAMl%2BQFApAbAufyN1xwxM0d3F0UdnpU5kBPpHInmav8MtuEYegMbYLg5vpdH52pLz%2F2STJmi0JS90npW6UOktRYBcVQP5Zno7FdXe46ZDNImSZGE6zWyJN%2Brq5eCUR5tusTSuU3Q%2BknOC%2BQFv5VMgFyQFDkZ9hhZcmQ3tC72c%2B4Kt7d6WqlmXE%2FJXVau6tCRcCbw7dc3TuKsHvQUvaNkssZdNkuX6E0AN6T%2F17C0AJhhl90DC%2F1bkfbR75sxDlaIBq7alHuP1UlxmtOFSNEzzWy2jn1JjU6sEzbfbXuPO88Wv6y63obqg1OYAzAETYa9FAJUju963GUsex6itLYYrZ%2FiIyF%2FMgO1ebHRwJ52olX3ohackWzOdJ6UgTi0cvkE%2BWIttZiEFQwOTPbemnaZInaJaWJaLegLxh8EG62jTYNqq85gumB4M1snOtGUDV%2BvQOSws2UrzuppYgLf9u6q7O%2FMt4m%2BnQumpqPpP%2BlDEbH7ujKRJMNJfLd%2BoLF5VJ1UQGucXDlCr%2F1OS5ZRl6uaPbZ7Dc16TX56%2FBxz4LTExhjp9jevbFoCshZIZlrw%2BY8j%2B38JAtRXEolkmvDxQzLZHkrdUFAK253oXcUUohXC7x4%2Bqht31%2BYAAZMKzTvMwGOqUBFZr1rYL6MPnNTdxQbFhRXKdwL89QsiiUtUyxXEMgmJHwNLipqVoEMWNywHhdFoLuJ7fAfqQvBZVtJ1Sjdy1WkPV2gYp5OpBD%2FbdAiOfCiIZ1R5PLAcCaL6ibCZx7gY0JiJdnixWIE2xHkJSXfpCeMFv3mV5dme6lUgWQLTANR2DjwXR%2Fz%2FnHcqs78LvEDmAb6AW24Ap1DkO1NmBs6nGCWEugN3Ao&X-Amz-Signature=2777d202dd1eec4db0060906626b77a92cedc1336138a0acd3a091e5a1a451f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656VCIZEA%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T135224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIQD6%2BjnN%2BPSYdwa3yCEO9Xhz6WyBqJFdBG1qPJaKf7HnFwIgbnhxrRURk1QEnNfxFp7F9CaVc0OR%2BvyWosAsMfrNyroqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO1%2FJENINXVOswQ6OSrcA3yQLPqAMl%2BQFApAbAufyN1xwxM0d3F0UdnpU5kBPpHInmav8MtuEYegMbYLg5vpdH52pLz%2F2STJmi0JS90npW6UOktRYBcVQP5Zno7FdXe46ZDNImSZGE6zWyJN%2Brq5eCUR5tusTSuU3Q%2BknOC%2BQFv5VMgFyQFDkZ9hhZcmQ3tC72c%2B4Kt7d6WqlmXE%2FJXVau6tCRcCbw7dc3TuKsHvQUvaNkssZdNkuX6E0AN6T%2F17C0AJhhl90DC%2F1bkfbR75sxDlaIBq7alHuP1UlxmtOFSNEzzWy2jn1JjU6sEzbfbXuPO88Wv6y63obqg1OYAzAETYa9FAJUju963GUsex6itLYYrZ%2FiIyF%2FMgO1ebHRwJ52olX3ohackWzOdJ6UgTi0cvkE%2BWIttZiEFQwOTPbemnaZInaJaWJaLegLxh8EG62jTYNqq85gumB4M1snOtGUDV%2BvQOSws2UrzuppYgLf9u6q7O%2FMt4m%2BnQumpqPpP%2BlDEbH7ujKRJMNJfLd%2BoLF5VJ1UQGucXDlCr%2F1OS5ZRl6uaPbZ7Dc16TX56%2FBxz4LTExhjp9jevbFoCshZIZlrw%2BY8j%2B38JAtRXEolkmvDxQzLZHkrdUFAK253oXcUUohXC7x4%2Bqht31%2BYAAZMKzTvMwGOqUBFZr1rYL6MPnNTdxQbFhRXKdwL89QsiiUtUyxXEMgmJHwNLipqVoEMWNywHhdFoLuJ7fAfqQvBZVtJ1Sjdy1WkPV2gYp5OpBD%2FbdAiOfCiIZ1R5PLAcCaL6ibCZx7gY0JiJdnixWIE2xHkJSXfpCeMFv3mV5dme6lUgWQLTANR2DjwXR%2Fz%2FnHcqs78LvEDmAb6AW24Ap1DkO1NmBs6nGCWEugN3Ao&X-Amz-Signature=d12785a9f28162a18136486003eb6ce5cacc756f1b37a69e022c6f9bab529970&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KKZI652%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T135225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJIMEYCIQDzfLm3ltX8Ch1W0qH%2BtWu6NNvo75XE61Ea4fKYHp23EAIhAMaB7GanJHFoqzvlbO1OzJBeJoMhSbrzJA4GyNq7%2FLFBKogECO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwPvm%2FAYZIuDXzMlXkq3APIYwC6I%2FvEzD5lMQrDLrdTlIjU2lN16aVPjuXr7HEInP7b3zLsqMbmP3meW%2Bj0%2BoKuKLUZD%2BvUmpdGHRdt%2BgbZx7nLcEI3N8q%2FoX%2BtQjsPezkG4B2pAQeP%2B46PRUMt6PF8u7row7HKRxRaCgtR4m91elQh%2FJtXLMLVvxyYeK11hj7evCcyeVrIgkHj9mEV5APMkrneKx5DiasPEIZe%2BPdgkX6gTPXmgHQHyiriZGQ%2BcYdJvvoE8gJRijPofh1y3laIvCsC1k%2B65rSGkHbuN%2F6dxLFnnhWGdNEIqoTj3KcL5sNWlwA6fxB6m%2FMoSQDCHZjXMnvqXiv7QZhBtVouXXajD21ZCZ8QKu16%2B0aPCpVje8pPSG%2BLS%2FPgHVsLhfs2kJd0fPNuPiSI93sqx8Jz7hkMSz%2FwYOgxECKsVipG2bjlixnDis0LESsfu5xjaf8R2DHO0qjZjThJ6QJ%2BLORai%2BKvJNrszaweiu1Y6piCFA5ohmIIsvWcx1m5hoH94dTJ9NqpVzV9MRbwUscTUjVwObLauDMG0tdKWjWQ4sijFygs5VtKLki%2BWORNnvgSnCRHwU4M0M8SZR8UOD4IuyG6NyDEcO%2BGT9LKR4i41B9bI9r3LQT0nqutZN1my0bLxzC807zMBjqkAdGxhA1in7YlYUJ%2FMCAqgIbRM1mKoj8TBpQJ%2BHJ%2FQoZCSXqeUFhXRZn66hh2bAQqgt%2Bnuc5NU09Vid1P0Efl2Bm9p0deX7yXXXg6PeUqAultNUwUJJbgT5TT5VJHLDAF0Sey5OgLqMSRKdGwuvVM0Y1uuKHwMvk%2FfBPFQyIwSJgNSV1S%2F1Oe4XZQbiHW7iumokF0gWgdZE2HlxXxOfbQSacJKfqK&X-Amz-Signature=6ec273ff90c16a83fb4438aa9b15dbe6f18aa886d66c8774e65c286ee8a52762&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSP62SAL%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T135226Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJIMEYCIQCgQoqbbtw84FqmGrEdSvQLpdpMCV9tOHHgMIZ3SIAIHAIhAOgpz2HE61UHc9KRkb%2BaPs2lT%2F72gQoDcQZ5ttd9rqqXKogECO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx1HjGFNxKMFVsrswcq3APmzu1DquZ78MLdEhAuuNfAHBtG%2FC6a2ut3QbZdxjSO%2FKbko1iYwNvp1lY2W%2BDPmLtkhmYUMHV0djTWuzrNefKmcXv80nPFRQNb55ttd%2F5wcvmDkrgZ9oAZCl%2FxaD1XS1yT2buXABA3iguXnWx1idnEeWCt1tAwClfLFb84km%2B3i69BxaKYOPXZ4gjnWoCdaKRztC33PPe%2FlMVpYZBUo1hv0VF8yeGfFo%2F9QJAifpXHLYJg1lsyCGCFXwxWCYHKXYMU1ul3wJ7m1y%2FilFDsIBLZn5PALTsyEnFlhw8pf%2BD%2B3h196l0Kbwjgk7751JKxQc9lbIzcVU6695NScmvKNqjfYoF3deyatTrs5VYoJmgf04sxaZ%2BDBDC00xfoP578N7%2FhjSsiFEREfZnNMhypBRNTCSnFwRoGmJlN8%2BCzNrREFXVZyXkGj6w6xA6g%2BxAFuqlxhgte4GVsD7O6xLFSC35MWSqYdWj14en5ZdGkbT2BKSdb5kvaJ2S61906szrDpGvwwBoKxKbKzk8OW9WKm%2F5uNTrMLPS9mJe7HQFm4dAmInfMkYgRsWHiePp29a%2BWHfNeUm9iIfOnF9AiUIoeg0szpeedkdbWzwbflqAzXa2aJNSAcpcNxaHQ9MCSDTCq07zMBjqkASk0ogH7GqG2GOcoRpn2ETWrUeWEwG5W9oZOc7ptmHDZ%2BwP1S6ULI1ujqlPyq5tM%2B6ABY8rg%2FljXhgsqUwwtxetr7RbinHUdaWyNastmCJ6P%2BDurh0wapXVS0FZnuY9uNvkhX6wuOZ8tgJEaRi%2BrMKOuViiIgH5Kk%2FTFEOKEK8y4%2BO1%2BROqPfDF3uuaExK7%2F%2FzDTO0QNrFXqiTbqzfgKX8wSd6ss&X-Amz-Signature=be7e415b528eaafb69ef0f2208e78fa64868295be910020704d5aa3e5abef928&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466567OIHXH%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T135227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJIMEYCIQDFmYy04LIyAdtY2efBuScfl7R%2Btg0vgeGAqS9veOwRsgIhAOXOq6exHR9a%2BFZEiHYm%2F9Ib8ic2WAoJbhyo1nj3gwkYKogECO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxHhAIpWP7vQVijNfQq3AMbKYJ8pNgBXzs1Lkw5UnbxrPoWLlIeU%2BCrMSU2RzKOYFKJKhh4yhJorqRIsaABGSrfLYQB9XYWc3TUnuwcOaDlc%2B0I0I99WTjpkwFsJdrXW4hBO4x9Fvou%2BznVLvBlghR%2BXRtSqsp%2Bd%2BVtzD2b%2B%2BWUMN1E6uW5md4woZaHODJ1sXGRBhj7L%2B6F7bDMVz6FA3sQP3NcnDgjCzOQKfMvXMJ%2B%2F5GtRtmtaksDx5v3vZlcWR5yXWC7AwY9CXWvSltrvxbA1nrLOjTQWVur5QxzL0%2BCwloty08%2BJJ3L0zYSzdmiIQ3T%2F2IEppN7khUFJm57VxU%2BkQ0irTNhw%2BBoqu5q%2F4OfM2rJWeHGPsUjuK4gKpALa2LIW1drL%2Fl3oH%2FAnxUim6F7JcgPWPsI74UTiSzvbAwZoMZZ7DP4tuzlq%2BOD9multljDaUmhgNsj0dmeSh6iCfYyajTXMbYzZO5%2FforlCvbGhNUDI2kufbsCpsRehsGq2%2FsRYG9H8GEN19NCu1%2F%2BAzOcIhDwJT6S%2FotraXRXYsfCIUzanLqtqTQaZy2rinjMPTWVinqWjXLMNaHpjW6DZ9GfvZlPqGLQhAaIvpzTlbdnLEehVkixBfbHC2sTiWRy4opUfHFqZCd9LCrzCjCW1LzMBjqkAfnRuzvHvMee8TRDlmoZVGnQ3dq2VHhKRoimapjzLnjEElE35pLiJfgKHDvP72pakfUP4R%2FvaQ5YtclHRAZzS0sdH0jU2ObB9ebmpWiOKWFe%2FGIE%2BUxvq0RyaBGx%2FbN73DSfXOo91WhDigmrexGmgVpiBaFZNGXSxFgFxmPGgAMTn1BpMgK%2BN7elrSsENtDWbd0X9is55nBsvInL04J0P7VeGNyc&X-Amz-Signature=81619664ec23be4e848469ad4b6a88991ac128e3789560c71f7ebe3f8cc450b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QW6QFTSH%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T135228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIQCNY5COCLTasPkr8f7btcigbPBAVIbbZwAABLJ3KDkKEQIgEU2Uj%2BarqV39rQFHpFyBAvI2BgcJUkdIEwnjCMg6SzYqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG9g%2FL0bfJl2uyJB4yrcAyslo3dD6ctictjV5B3VAoAO%2BI%2B3wZ0o7spTmQtuFdemln9tiYQxDnH%2Fm7IQOD2U35ZYljE5Kjs3wCprDHjN4FZiQ2dFZn6OKJXD7Sul8Dg%2FdYzlM1S%2BE8oZ25SX3YcRIKBS8HrN5NdFNorhTiQjKaGkcC3RgVRfqykaFrsqca%2BudQZCXq8p0%2FxvzM1EZUxD%2BtA6rch5qJBglYX2eOvYQ%2Bpvrv5nQdpa3jrREGfjI6WuJeGNX2weAbouz2ETa7v9tbkMoxYu1LWB0BlWnnROgQpb1sCcAEBctC8u6CNjihDKnGbJrp8Y9PAUmPQidtLNmhvU86AEZ7lBv%2FPRFaQ646%2BV4qR1lSOPjJP7u68uVVngwlR9Nx6TvsIalCknVvr0Cs1HKDJwXqonfoCeN%2BDd1%2BtUBWfzoAC0LIivdyjrDstoaFKNoAMGl%2BoSCZg5KUvusZjEnxtSarOrBVf6Cbr2%2FhiG8zWqJBD3veCSCd7rlOM3DUoghEezSmHmcv5Kxs%2BP9i6Zgqwnne1%2B81ZadSCyfvO8RQOzepc9Re%2FRCHj%2Flk5KJXRvPrK%2B3bHDSrFpMA4ZK2nTKrug6tTateJRt1VLCgr%2B1djRzpA%2BRQCmkrYi0rCb9bIAEOzLIG4JugMtMLzTvMwGOqUB76VEx48slxCAQb7n12gQfbBlulkAN4GuSzwZ6OirdcAKr9ZkIXmdc7IYHFwsBKvzReqVPOpbJyISnn2Elfj1p4zp8rV07v9YCHiIKG09kvPSATNY7nkOpRWEOoV11vF2ifTNUD3hdJ3AKeQt8ra%2Fe%2ByVlTaxd2dM3JGyu2YovT7znAlXpjKNuBQ00vcTgrDlrGUr0Kxu%2BFUqH9%2FRHbhTKPdblaQU&X-Amz-Signature=ab3d0635d003df0493e3380b182f76b89d9def4113ac610a0d1010437cd6dccb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QW6QFTSH%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T135228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIQCNY5COCLTasPkr8f7btcigbPBAVIbbZwAABLJ3KDkKEQIgEU2Uj%2BarqV39rQFHpFyBAvI2BgcJUkdIEwnjCMg6SzYqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG9g%2FL0bfJl2uyJB4yrcAyslo3dD6ctictjV5B3VAoAO%2BI%2B3wZ0o7spTmQtuFdemln9tiYQxDnH%2Fm7IQOD2U35ZYljE5Kjs3wCprDHjN4FZiQ2dFZn6OKJXD7Sul8Dg%2FdYzlM1S%2BE8oZ25SX3YcRIKBS8HrN5NdFNorhTiQjKaGkcC3RgVRfqykaFrsqca%2BudQZCXq8p0%2FxvzM1EZUxD%2BtA6rch5qJBglYX2eOvYQ%2Bpvrv5nQdpa3jrREGfjI6WuJeGNX2weAbouz2ETa7v9tbkMoxYu1LWB0BlWnnROgQpb1sCcAEBctC8u6CNjihDKnGbJrp8Y9PAUmPQidtLNmhvU86AEZ7lBv%2FPRFaQ646%2BV4qR1lSOPjJP7u68uVVngwlR9Nx6TvsIalCknVvr0Cs1HKDJwXqonfoCeN%2BDd1%2BtUBWfzoAC0LIivdyjrDstoaFKNoAMGl%2BoSCZg5KUvusZjEnxtSarOrBVf6Cbr2%2FhiG8zWqJBD3veCSCd7rlOM3DUoghEezSmHmcv5Kxs%2BP9i6Zgqwnne1%2B81ZadSCyfvO8RQOzepc9Re%2FRCHj%2Flk5KJXRvPrK%2B3bHDSrFpMA4ZK2nTKrug6tTateJRt1VLCgr%2B1djRzpA%2BRQCmkrYi0rCb9bIAEOzLIG4JugMtMLzTvMwGOqUB76VEx48slxCAQb7n12gQfbBlulkAN4GuSzwZ6OirdcAKr9ZkIXmdc7IYHFwsBKvzReqVPOpbJyISnn2Elfj1p4zp8rV07v9YCHiIKG09kvPSATNY7nkOpRWEOoV11vF2ifTNUD3hdJ3AKeQt8ra%2Fe%2ByVlTaxd2dM3JGyu2YovT7znAlXpjKNuBQ00vcTgrDlrGUr0Kxu%2BFUqH9%2FRHbhTKPdblaQU&X-Amz-Signature=0dea25f6b7a060f66b43bb14d0a7cc8ea0fca18671ad6df6fd82c5ac4cf7108c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RNF5HY6%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T135213Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJIMEYCIQCRATUnphjm2lHsTikIvwNPfEkRVWcTTBj6xVYkVH%2BGvgIhAPraovE6%2BwWeNGfgFPy14Tz4GNjP3YpD%2Fh836EDCm9VXKogECO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxMnnrs2LB4yQGPtzYq3ANIRemr9bJQRYdTM7u1kqSkxysOKLt4PzXjfPZqx1ciA3RM1STrAEQ3YFGcd%2Bf59jENxdtRjJ95CMV6jT33TFi4qT6456lzWrnr8ici48y4eTOf0i1C%2BknLY%2BJ%2FqNcGkdAhG%2FDZtyJAiRWCQuvXTLVE3fJmnHTsoJ5ew4mSj5tfqrgzQPhWJEvEjICNuai9uWCsvm5fKjG5%2FaFIElHeLd%2B1QBmWgHw5mKAclnv1R6v2TPqZ9x9hQeow7NaYlpBsJLmlXG5pw7c7vCN1SxxXrMPITjJtSpCc1mCGiCsacQVqM11QJ4spMA5BUdl0hJcmUYBfHSWv8me0sm18iINZ6BHWK82dCQi8XjEbPtY6BnZf2p%2BxBzK%2FZFzXxHa4%2BCjLGvy557GZT0RrkI2BC%2FfW1XOtKs%2B1IaIlytX%2FXVdVmG8iBw7kO%2BfGtlYQ6hqJjXLzf3QRCOTA%2BEhhC6fAdLJluB5PebF4MENS2YI5SxTE6IR4yXYMWYoVCR4OfQxRM0VVOH1a4N2n3yLegdm8j08JEyZ9c04t22U9ELF52aYawAW598pAJfdnD9CYsiDr298JkEtRib8qudsboVSpdUw8UlyEvrLetfsYLvbedPu2PArh9QzyJzcc4Ar4RC3VPTCo07zMBjqkAc3BPy7E9Kjq9XxKsjrje919oSTk84l9dwWESs9y1Up0wvYya2zWj7DmWrS9c0hFYTs5WEdry6W4vd1rAKyq4HvLEMl8mus6SHc%2BNhCe0zwWFmXBR9lyDjVz1%2Fsv7xSnMIKnxRRpjNhh5%2FNITDZkoDNPCvpo80TM4MmibxUc8CaDPVCitRpbQQ4n3B4SNmPiri8FZVq2E0lwz5peeWH23NcoO%2Fjq&X-Amz-Signature=9806f72423f173d803d486413db5a1b1f7e9535c1fe1e4c6aa5ec7d00dd92ec3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCQUIDQR%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T135230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIDCHV99rJoTj2lISJR%2FYlAuA%2FBy6ANTM6IvpHODEfmhjAiEAtih%2BuC%2BMEutLU6QIp3QIXEKSRrJrVile%2FOgFbxBPHjYqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOPi0LNR%2FSlXskdVoCrcAzk3jTb6w3d%2BCcOfkrMKSEhrKomq%2BxfEAbcVJi2UJpPUt5XwaS6D9vzfWiBVaPaYB9LFY6Y2j5vJy0sXAD6t%2B4L3CCqmeJmS7Vy%2F2%2BA7QOdozZjCrb2MpoAx%2BcuXGJnoeJ27MrKiVzSn2LC1nNvTyZgDxwQenGX2eWLRn0c1yMIlTUj3Z%2BeKEC0i0d7ayMWb6Sm7nRgxZE4T6z2Rtqdq9d9OHTcQSPAAJv1wtU%2Fkh%2FNEv0U1SKJcWxzt9Tzvqv7hKg76wwXuNX%2FCHMrJp7b1VjK9oQ355QkaamQgfwQE%2BzuGxjSOW5OgjkHgIGwvLLWlLJ8fHu6tBGYqA2u%2FTbYIw%2BcUsEGzf0AWqVHIik19qP%2BCZeU535%2FBoPoZJMWXAKU5DFTAjQFZIR5dNh9qPdB%2F2twwOBrCM1gri0WLN1jq%2FE6AlEU4X%2BZsra2wO4SRSmbv3QDakTU%2FGihtE5hJjSHDgyyZzt9lkez%2FxXirusWE5K%2BengsJltNCJyM3B2zBlzKxRP9daD6xr%2BDHYz80Y7WcC%2B1gHugz9dXji%2F0XUYNV%2Fk5Vy4us6%2BESv4RR0bPqJE3%2BbnPYZbLb8C2LI9F1RYxlhB0EITLBO%2FVZvpoVF3f2lY5W0Kl3va8RUeFGXnD2MIvTvMwGOqUBfOyH%2Bj6870u%2BcXl9UZjNKp2EaXmUiKnJ2IrS0W14qxxBVHsETmV3SAY1T0wW3v1yGtyvqTpf6YrRhK%2BmWb4cg5PtDhzazDqyo9W2GYhwaBDw3vVzDVhOoi%2FytoeW0mFeDYF2XN1aBb6cSlaDmi1xOH1i%2Bggl0Of7cCmUplR3HmoLnJGRT82aBi7wzROB4t43Yb5yrkLOYOG65LIcY7jVuN4mE%2BuY&X-Amz-Signature=4c7186e1233ffa904b54be6b01b518201aea631992cc26d3c01b5c4540647cd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCQUIDQR%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T135230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJHMEUCIDCHV99rJoTj2lISJR%2FYlAuA%2FBy6ANTM6IvpHODEfmhjAiEAtih%2BuC%2BMEutLU6QIp3QIXEKSRrJrVile%2FOgFbxBPHjYqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOPi0LNR%2FSlXskdVoCrcAzk3jTb6w3d%2BCcOfkrMKSEhrKomq%2BxfEAbcVJi2UJpPUt5XwaS6D9vzfWiBVaPaYB9LFY6Y2j5vJy0sXAD6t%2B4L3CCqmeJmS7Vy%2F2%2BA7QOdozZjCrb2MpoAx%2BcuXGJnoeJ27MrKiVzSn2LC1nNvTyZgDxwQenGX2eWLRn0c1yMIlTUj3Z%2BeKEC0i0d7ayMWb6Sm7nRgxZE4T6z2Rtqdq9d9OHTcQSPAAJv1wtU%2Fkh%2FNEv0U1SKJcWxzt9Tzvqv7hKg76wwXuNX%2FCHMrJp7b1VjK9oQ355QkaamQgfwQE%2BzuGxjSOW5OgjkHgIGwvLLWlLJ8fHu6tBGYqA2u%2FTbYIw%2BcUsEGzf0AWqVHIik19qP%2BCZeU535%2FBoPoZJMWXAKU5DFTAjQFZIR5dNh9qPdB%2F2twwOBrCM1gri0WLN1jq%2FE6AlEU4X%2BZsra2wO4SRSmbv3QDakTU%2FGihtE5hJjSHDgyyZzt9lkez%2FxXirusWE5K%2BengsJltNCJyM3B2zBlzKxRP9daD6xr%2BDHYz80Y7WcC%2B1gHugz9dXji%2F0XUYNV%2Fk5Vy4us6%2BESv4RR0bPqJE3%2BbnPYZbLb8C2LI9F1RYxlhB0EITLBO%2FVZvpoVF3f2lY5W0Kl3va8RUeFGXnD2MIvTvMwGOqUBfOyH%2Bj6870u%2BcXl9UZjNKp2EaXmUiKnJ2IrS0W14qxxBVHsETmV3SAY1T0wW3v1yGtyvqTpf6YrRhK%2BmWb4cg5PtDhzazDqyo9W2GYhwaBDw3vVzDVhOoi%2FytoeW0mFeDYF2XN1aBb6cSlaDmi1xOH1i%2Bggl0Of7cCmUplR3HmoLnJGRT82aBi7wzROB4t43Yb5yrkLOYOG65LIcY7jVuN4mE%2BuY&X-Amz-Signature=4c7186e1233ffa904b54be6b01b518201aea631992cc26d3c01b5c4540647cd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46652FSFSCR%2F20260213%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260213T135230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECYaCXVzLXdlc3QtMiJIMEYCIQCx6YbpVeDOhchGIQieUSOwW1GJem9G5Wxev9dGDxtkawIhAPT9DQ4ZMlszz8YO%2BjPzLOemIsI7SJY8ly%2FCB038Y9ZZKogECO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwUsKMwcOXikc7Ugb8q3AM67TTG9Nx3hAAzIqQS1fBD851OVeBYcLVB2Bawho80BnjgEBcqQ7XHKHVgnk9GqpKGHv%2BacY6ynKps4enYvLT7eJOCGZYec5zrz8L8kSgXGT5VUB71JByVvnNDrYqog3bJPt0MxIylgkuyIG5rmLX6RMaAVm21zVCR%2FCkv8bMZvVT9ozIygpAdB3VkI9KGZFO3x5K16ExBYX1kPjocyi%2FIL%2BQIPMPNWl4SOqpoojAG%2Bnh241pJ1mF74KNGFegqetLahH%2B6swSzj8v6VHP3BfZ5%2B7L7mqCQjNO2N8W%2FBcgQx%2BcpAl5DbxVMRTSZjUY7hnQ%2FpibpLvnT6U5u73bIWiaAs1%2ByMoOyPOv85aLz2iCC1yLtJD4ZEyPsUBPG1Img2gORgmBq8QwSBWuhmG59pckpVwY4Tbd%2BFK26r3kW5irC2MWcUZxYJ16PamKfZDhks7tCxLAS8WqPVoxShJTXJVwmyssYTTXiDPPWgIn1AkTGx%2BuhuS%2BeAva0jGHYxD67iQWGZci0ogIXR%2BZ4knlLtvsuJTXeSh8rUbZQMKxI5eHzTRbqBvslHPt6DXTLSRDogD7af2Ljj4ycbyherqJvMByBrvd09cfuN2mam7j%2FVh%2Bsrioe4v3bISVHtRimJzC207zMBjqkAQa%2BOAR9x2w4tcfsMa8DNMflmJQleoycKyKYwjQH3u8W%2FURdMvJtSgKDnHp6LeLA1%2BMaA%2Flmtzrm7o1Ipwl%2FQ8Yo%2B%2FeTcx6yTKs3usGxcLJtsdeMqID%2BGNwhCselw42MXeN%2BLo5o1j79%2BpkJHyIuzTKTLKwy3mYHnWOiC3kA2esC4U3XmJs29aDkz7ozg1IB8XDgSO77HeFz9uT9grm1ceKYtCvq&X-Amz-Signature=c09c190cc186ced55cb29152c69444056dbce4a0123ce7be40f892f4d94b74d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

