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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FO7RIIK%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T193622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQDRXripPWGIWwEhBJPAcXD28uUCyQ99OTAWmpYikBuo5QIhANdTROb8FVQ8PM61VfX10P2CHn1jOdF8pbCswsblS3JPKv8DCAQQABoMNjM3NDIzMTgzODA1IgzFiftM2VbFrYVhhWQq3ANS8zjPq%2BaXlne6RIZl%2B1M0bp2W%2FIAz6sdlaxbV3uERNCrQT9jl2U0Pe3o52HyCuztSD%2F%2BBPh9Ojean%2B6iAF8nWu8CQ69IeAmkwlI3N68N2IKAvb7DeDf4zGuMrtS2Iaetzt9h4ulZus5oN0UlOEor8sh8oTM1crUdA238JMFrG%2BamKp8a10ifcBYNMrHhogmJWxtKGENhnSUIAYDtDq%2BR1bg0A8pnDDzsjRqnl8jD42aw4cmNtGewai1RgNqq%2FAQPykd%2B3noEbpeDUHNJevV4QFtPGh0zVMb0FqpHsIR4enOwaLeCiWyxnDca1oUr3EQ5QGOCuBCZWXAPZ0WdbD0HAeSAJsyyydhOqlxI7iLef2%2F%2BPdMDH0b9XP%2BddXss8tZ8OHO%2BYKbKK3nKNWilbZkqLLJs%2Fp9sMt17Unh%2FfgiLVwWAAJ9asedJx9IvHChMlM%2BLGL6DK5zR945nKf7YJJ3HAyxv04n7uibSDL%2FKM5v6srzMcbQFSwhvZVlqfoqQXHR8NZ5%2B9DLeFqhfjnCemEh9c3m1Eql%2BYYrAtysCx2WicZqr7mjWJPxIJcaszUhMAnbxNLxcM46hig7PpEVHdPsQMo%2FdnJ2mdfnnzbRH4LMONDsB4VkrsoyQbK8tFETDWhInMBjqkATcduMF0oAY3uGQIv0uNjIEQL4FNcnYWD1PGg2c7Yv9zw31j3N20mYdJzDVjp4f8HHFPkNRr5TlzOi7Xfm4vxul%2FncGEbYdu6eXXzJCEkNHL7EZs2w8%2FbUVIdLoMjqu6e8xHUdTF9oscG0aUD74MBp0cJqOIbRqLu3J9swEBeZ8UcWSss4NjB91tJWY6h%2FGN%2FOE1v7JZivTHB8ZwFZJBzSKB6TaQ&X-Amz-Signature=82352c25183d3138ef96b2def3d6acd10203ce7e96d1a0bc2e8cdfd99f6a1d3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665FO7RIIK%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T193622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQDRXripPWGIWwEhBJPAcXD28uUCyQ99OTAWmpYikBuo5QIhANdTROb8FVQ8PM61VfX10P2CHn1jOdF8pbCswsblS3JPKv8DCAQQABoMNjM3NDIzMTgzODA1IgzFiftM2VbFrYVhhWQq3ANS8zjPq%2BaXlne6RIZl%2B1M0bp2W%2FIAz6sdlaxbV3uERNCrQT9jl2U0Pe3o52HyCuztSD%2F%2BBPh9Ojean%2B6iAF8nWu8CQ69IeAmkwlI3N68N2IKAvb7DeDf4zGuMrtS2Iaetzt9h4ulZus5oN0UlOEor8sh8oTM1crUdA238JMFrG%2BamKp8a10ifcBYNMrHhogmJWxtKGENhnSUIAYDtDq%2BR1bg0A8pnDDzsjRqnl8jD42aw4cmNtGewai1RgNqq%2FAQPykd%2B3noEbpeDUHNJevV4QFtPGh0zVMb0FqpHsIR4enOwaLeCiWyxnDca1oUr3EQ5QGOCuBCZWXAPZ0WdbD0HAeSAJsyyydhOqlxI7iLef2%2F%2BPdMDH0b9XP%2BddXss8tZ8OHO%2BYKbKK3nKNWilbZkqLLJs%2Fp9sMt17Unh%2FfgiLVwWAAJ9asedJx9IvHChMlM%2BLGL6DK5zR945nKf7YJJ3HAyxv04n7uibSDL%2FKM5v6srzMcbQFSwhvZVlqfoqQXHR8NZ5%2B9DLeFqhfjnCemEh9c3m1Eql%2BYYrAtysCx2WicZqr7mjWJPxIJcaszUhMAnbxNLxcM46hig7PpEVHdPsQMo%2FdnJ2mdfnnzbRH4LMONDsB4VkrsoyQbK8tFETDWhInMBjqkATcduMF0oAY3uGQIv0uNjIEQL4FNcnYWD1PGg2c7Yv9zw31j3N20mYdJzDVjp4f8HHFPkNRr5TlzOi7Xfm4vxul%2FncGEbYdu6eXXzJCEkNHL7EZs2w8%2FbUVIdLoMjqu6e8xHUdTF9oscG0aUD74MBp0cJqOIbRqLu3J9swEBeZ8UcWSss4NjB91tJWY6h%2FGN%2FOE1v7JZivTHB8ZwFZJBzSKB6TaQ&X-Amz-Signature=82352c25183d3138ef96b2def3d6acd10203ce7e96d1a0bc2e8cdfd99f6a1d3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TW676HN2%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T193622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIEJhgMFVlisi5fWPvjzXkQIGV5fgBuW%2FsmYxxPNKrWRIAiBcsp5fwSm2YSauEjysIM1yWcLnxzL4ZDZ%2FSpBgwrqQaCr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMbVMLOSHWMZbuUhXhKtwDM%2F9kNaj5fRKeDoIERZk%2BvXfh4dBEBo2WgRQOCaRJcrYEVfmgazNO9Z4BvrLCJ04xDhdcd41b7QQmBaeDKgOu9%2BwkRz%2B3pk6sOd57PJa3dkBwqZaG7fqAhM2FJmpaO02uG330YYFLS0X%2FedccxM%2BCpiYFqieP6PGXgjo3%2Bl%2FWc2sXLK24qkJ4nz91Htk8Mt6ZvIyxzEezBxMVt3PWsDrAHEzfKbrPOKIZ89aIP0minB7ceYuuGfd%2BYcm%2FnlMZSbLyQ4dazkmQOGcIqkpFDh3VkodZB%2BJDHKlWtoVtwJnyRV%2BRJn4gJXYp1EZIvDIEF6N%2FtYwFXKclIXxpCapS30EQgDQkM%2BISTPmyXl%2Fzy%2FTZ89xxkLaAmy7RYHX8nXuSaDkc7NB%2BdUASdKehps1Uwq7hbvO4IVn9Ne5nGoPjvErdkxKoWY5fcKp3Dcxv8uzVU3J6WFGN79WZHoEJ6djWGQ6I4lMbRQ60uMXqowyQaG3C8dVJOE8rWhgk2CH14EDm3edf1xE5PiAFHFN28khcMcy7oCnUXOCnC%2BA7XCQXV7oqc2E6Mw%2B%2BtexTwrtPTKL5Yzruu4J5%2B2%2BT9iuUucwwmkqxpEAcQFJVahH5QLumR7oMoC%2Fu7Qz%2BYIEWP37vyW4w0YOJzAY6pgGyrBJWwBQkqMvSB2a9oD1Kh8ApoTO3f6tHv%2FsyzP2QgP4FVoeS3xk7cfadx9T3VOu8lh2sqdnrbDE8AayFn2aF7VdX4TBeaqGGZ2htQLrxE41B%2Bas0UYQT4wEIFff8MukRQ37Niw0oErlcqP%2FF3x5OkkEMZNyAvNkB2Uv7KU%2BYtStYPglnRipcwTfrOLeJu%2FcMojWIl3KzHt6mwlLnkmPVxP6rDN0N&X-Amz-Signature=638f40a57501b7cc03c7a55415a4747ec0296e5429f4ae31d450232c51ce1ade&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625W6FXDK%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T193625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIC3XA6m%2BX6UeEG6cMgCZ%2FACPIexhJRZ1STpp4r3BuBSnAiEAhAJ1OyX21SGyX0OvQX%2F0Oj2ZQfKo5opnVoR93jxWtFcq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDPnRJmDBJOUn1UkpIyrcA8mfrXodVmQ00yvoMrosNfby3clx49mAe7TL8tYeF%2FTahhYHFQtHuP8lZwMGJcguYuEjmotTy35W0rNq%2FLte7OW4Wuo8nXmsupbJsoTnouwjdHFcfYnTaEa%2Bia4hCaIKaDaecxJXgGxkGC%2FlTH0I31hapcJbzveDiWfq3KWbXSUZNGw%2Fh8BrGagRX%2FImk8TNDo4W8ytvU5PonmL2Ym5GAEDQ5cfIHbMRu3slH%2FwShxlkpbmG35KzG%2BVx0yvUxysWpSOYdS97s8YoHuxy3OHANiai3twPpYcm%2FjDvQ9vvpZJ2%2BusPmmiOp3q8LqES4dblVeDpI94Rp3lQhvHGoCcPPPgSQchTIzHcaaQrDP9ab7fVTGdrHFZWRiKpQY0f1H7RO33kDRr8EHn6okCAw9UJ4e84SqdoeCrN77qX%2B7nt55TL5mEdbKQRceuuLdKxxcxVqbtgfubs4aFNQpWQCJyhE7to1bSUQf7%2FnuMQSLBW%2BK87m6rte4Itid7NTGPoSD%2B8THqwD01EE5cZD7dlzLj4PjiT1Y9R8t9Arnz9f3N74f7h5SPY9pjbaE0AcAF9DKeKQfPk%2F0O1Bptwvj1EtHtsfrsRYRw%2FD%2BPxfBlroMknBnm9YHELbuVZGXmW%2Fz6bMIiEicwGOqUB9psSBEZwYM9wteUX6InLfHnDC4jCiwNQcALmxG5l%2FYuEN0irdO3avDXAEoi5xYfC%2B8KO0wGtSRZheYv5gDSBa752lWExoWzL%2B%2FBObOsOvxYlYrUvGPny18cPhhkasRPP9zhjvWKQXiSz7FPI3D2MgzgRolMQR22%2FIoLgHXyYQb8xbCSJPZ3uf%2BQcLXpGA9y6Ps9FFxL21X5vAVNPSMIUfifN7Xbx&X-Amz-Signature=300e3ac1435e36ee37ce1368478205696c7f90f9d24f7bf2cb208b271d22f021&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46625W6FXDK%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T193625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIC3XA6m%2BX6UeEG6cMgCZ%2FACPIexhJRZ1STpp4r3BuBSnAiEAhAJ1OyX21SGyX0OvQX%2F0Oj2ZQfKo5opnVoR93jxWtFcq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDPnRJmDBJOUn1UkpIyrcA8mfrXodVmQ00yvoMrosNfby3clx49mAe7TL8tYeF%2FTahhYHFQtHuP8lZwMGJcguYuEjmotTy35W0rNq%2FLte7OW4Wuo8nXmsupbJsoTnouwjdHFcfYnTaEa%2Bia4hCaIKaDaecxJXgGxkGC%2FlTH0I31hapcJbzveDiWfq3KWbXSUZNGw%2Fh8BrGagRX%2FImk8TNDo4W8ytvU5PonmL2Ym5GAEDQ5cfIHbMRu3slH%2FwShxlkpbmG35KzG%2BVx0yvUxysWpSOYdS97s8YoHuxy3OHANiai3twPpYcm%2FjDvQ9vvpZJ2%2BusPmmiOp3q8LqES4dblVeDpI94Rp3lQhvHGoCcPPPgSQchTIzHcaaQrDP9ab7fVTGdrHFZWRiKpQY0f1H7RO33kDRr8EHn6okCAw9UJ4e84SqdoeCrN77qX%2B7nt55TL5mEdbKQRceuuLdKxxcxVqbtgfubs4aFNQpWQCJyhE7to1bSUQf7%2FnuMQSLBW%2BK87m6rte4Itid7NTGPoSD%2B8THqwD01EE5cZD7dlzLj4PjiT1Y9R8t9Arnz9f3N74f7h5SPY9pjbaE0AcAF9DKeKQfPk%2F0O1Bptwvj1EtHtsfrsRYRw%2FD%2BPxfBlroMknBnm9YHELbuVZGXmW%2Fz6bMIiEicwGOqUB9psSBEZwYM9wteUX6InLfHnDC4jCiwNQcALmxG5l%2FYuEN0irdO3avDXAEoi5xYfC%2B8KO0wGtSRZheYv5gDSBa752lWExoWzL%2B%2FBObOsOvxYlYrUvGPny18cPhhkasRPP9zhjvWKQXiSz7FPI3D2MgzgRolMQR22%2FIoLgHXyYQb8xbCSJPZ3uf%2BQcLXpGA9y6Ps9FFxL21X5vAVNPSMIUfifN7Xbx&X-Amz-Signature=76ace2a64d026e1adc655af9aa9e5f0c1c2b40371d198f2613bb670af92b191f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SM6VM5R4%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T193625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIAViOpm6BxXgmSxOBBFd3E5Gc4ev1TGOmRmPWWZrnQvaAiAWeobAeadSBl2fa8iVM3QrBAYLwRq2EcJ65QlWiPlyqSr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMHwmzAm1ws88ErBXtKtwDEUbEQGYXEiECTr3OkwAdDVQ%2BnYEk%2BF0gAhL8pgNoL7cW2%2BtEl1eAtyI3jr3Y6Q3jlHHntnOb1XJDwQcATsGNyxB9%2FLK8vhvVAME1yhJxlQM%2BfFUNsukilC%2B1nXnNvwkmEaPYT%2FuW9Tsos99wHDV3yvfwyPosICcGUAJKOR4m2vdG%2FX0FselykrydwHO0Dv2zn%2FMHQqZ5jSPJkN%2BHdoc0k7NRc5ktW1%2Fgs3n22wP4sbNyw3qnx8qxEluSD9kKOk1gx10E1lLnfbWQilPYiXUrYEoa2FIW3Y2iAfqjPbEtiLUI4VtO3ujYGLhYdFTvomXUP3Ujp0bxD0%2FYIBV4m6NaCB%2FVEwJTpgHQ0am1ndBVMbo3elx6O8pd7cs0HJgynJEf4zfCzEnAy8G2%2BTHdfjEpJbB3kiWmVJGrGFnznnbcIpLXnrlOWmKNrb%2FFTyUgQd7UObjxk2%2BwRvlwTNht72mRKtZkAOX08RJRHOUz6UvHCSaDRiJVix22BarNlS2c8mwbfrO122iap39A4xvmGRj2gtPXbL3kQ5XNN09%2BGTsQxlrT%2Fmjj0MLzTFy78%2FSQ%2BDMQR%2FxIVWGV7G1lps272g9DgGWmbuzY5FlMIWH6VnFCdBHPcJBWE8tETEoHzRgwhISJzAY6pgHqQvX5myHjlUz5is7HChs8FPIKAKxPzBrmvRlrZr8uLqfh0qJdH%2BFeMYdxPDquaBNdg3nsEftM06AVbdkDKypUkvo5xANOWFuQugzZKrIhq6pg6%2BXxiqC2zTrUAJXMc5Qoh8MbKBTAGir6XpVA0AbDO9xZn1RwcYDIJkVwlFy3AH82ujSe7f2G0pUsGo8fMi7lLsXkE675ozoz9WHRNgjyX%2B%2BFG9j1&X-Amz-Signature=bc3f631845b20905c09f388354a1663c3f3c1cdbbf412cf2524505b196ecb285&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DHCNQRF%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T193625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIDkwR23cIQwZdi6tg3d48ar9HeQp%2FLEsdTEQnyN73xSTAiBoRwrMr%2B4G%2FOMtPpgs31KkrWpu783mmJ7ouDeUFVs88yr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMD4IGnQKThPBau1s4KtwDhG3tjNqJoakoacJXfc7XpW%2BS7JaLgFfSsRX4S9PRJ7UVi378EryMfeUs9gjvAQEklksLFbONr6WhrRJ%2BLghVePJIaYlErrFWlOMBmBS5sC3koqX60tgVOlD9RiGrgml1NtbxTi3BAhxgibCPc4oN331VpcgJOWZtTqDCPI1iYYcVrli19Ros9kxkZMjhyybiaVgsJ%2Bw5egbmgxh7zvvy%2BmvDvwluyRK1CsOTcRXn6xHD8AQfSFIlmTnUTLAdmnp19z0CsAB3P7zjNePJiPhSiT12v%2FTjFDFCe88ZUZROgLRWCqRWSKS%2B4HZhyTBTPQjI2h8LpLko0T2byqVRxao7jsFywzfv2WaghY9kW6gyUYPnQjPC9aVbCuSBQZ6Qfed%2BaD5OWwB03xAG8AGNENBuV0Ryam4V2ux2BDInf0LSLmYmZDPQZd0mHrN%2BaZF%2B7ig4ZOgTZxk%2FaQLdODIIC82WUcKTZJfDghXaQIW95Qd%2FGOcmiZYUo1mZcTVtvhkUPICU3fo5rx%2Fw8lcqveBzYNwH3FoR5n4d%2BU3okVPqlbkIWTidOPD%2BXaWIjRuNMugdAxq%2FPzlR9%2BgWRKxHIbMDl3hgS2SmTK%2FDwXofBhW4ORiqbVqTbyw0fQIo%2B2TMwR0wx4OJzAY6pgEzvWxW4ZRw4r0ES2nBk2anFOjEBabFDePNKTE01Jf2%2FJMVY5GP7oeuozTGKYV1L7y52jAO8hSeA10B%2BEqKiJ%2BaTsfHc%2Bp7Jy9VIUzFRAtrWZMuHVDWC4C2wuXNJClxgNJDpHMtpUstKkK0m1YcEebRO6esXQfMlmpMeEluA4LE75ubQLhHIDxs9TNHJpVbwHU0mW4aYgAxQBngATnhbTGVxWyDlvS4&X-Amz-Signature=aa5d9bf858b824aac20390cbd88e8bfaf3ee8f3faa00edbc2c0f1cbf5dd34291&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVEE4Q53%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T193629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIACPzpBwE9c9A63DJSBCahYk5490wRZnxJnAtU0v8mGYAiAirRpM00MxXqlvrDY%2FbkrdJx7d0ki4vKpxg0qVcsBEFyr%2FAwgEEAAaDDYzNzQyMzE4MzgwNSIMU70%2Bd0fibiq1tXZsKtwDkLy2a2UvRq3FgxDUZuNeRGn0k2oEGi3Q0i4TxV4LIpNYBC7Gwljy6haYRRc9op7PZ2J9lMN6NgGy7f6mQkgxajgXeHLu9zutC2lCJfEnobyOC6Benxwk%2FLgFUorN3B1MKq35NaJPYSRjidr8vFkVc6V3xUciIrVwtlHnlnadvmASo86aEKFlqqo6BLJ5jbc3TUOB3kjNFOhi%2BvZWckW2%2Bpc20RMIlPbJ5kilnL3CT3FI5Wwihld%2B8iP5ghwK7EqhoeO8LTNtVsmcLaBd7ATCGH0wKAI%2BSgcodWp8rm7ooFL3VbgFcnZdl5Notfxy5J9P5deP3WsC3TlrXDmLAoa26LfNc8S84x2fbt17Ijx3T%2FCAB3FOLZND0qF1ck%2BEgzdtUoQ715JXQedSUjeIdQ3X2BmgQz0u6WuKCDSNpsceQnhIjibyNBFskQ4EaL308oAtvSQbpTTs2cI55IbnfxrRVe6OQmW%2FklXaP8EaX%2B5dcSKEbtDa%2BzrETa7mvkSsQoxwZECsySYb65bow2EyBUn4VuoOisejwsUJlZvnGBckZX4GvZTMCf13Q%2BV1DRDdmYKxQcWEY5VTo%2BAy0Bybp84jUXt2N%2FjWENNG9fDhm%2BpoSPDJJUblc%2Ba5w2oQomEwgISJzAY6pgF3avk9pHcAeqHdAQ0zL9rLbFeac9356AMg7uYcRVmpUllKFaZnlTvM7qTRlc1HyMpDRWsOLblf9ko%2FpQiodZOavklBBYGhWzpi55D19flRDvL34Q5U5YmCZ8r7ei0HEnfk2pxfS6aE3rT%2BbweJsQawyPH0SKupO6Ne8C2115O%2FnFkAlKbpgkjxtoyCLnvzCAMVIsiIBJoA8zgZslbT5VIDw1%2BkNUNl&X-Amz-Signature=e59eace90ba0a8033d20a64955617807150a2b777f3c176c0d022bd19bcdb668&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ITYZTUV%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T193633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQCMN%2Bcyi%2FZZ%2FpMQaXqLgI1sNB%2BU6P7xSJSZq2s1%2FsW8wwIhAIiIA2cBjctzbgafZcpFgN4tLv3K471tlsbr5p8S7Km2Kv8DCAQQABoMNjM3NDIzMTgzODA1IgzptMw00Vlj9n46qTUq3APD5QGCf8waQGKXfgBkZvOLo%2FTmkqTDMIPP9yEnpqgPr5SawulwT%2FiT%2B1KEjuQKh49mpn%2Bq2NBdxVSgJ7hAJWyDkZVfGeuT262yhGU3lgWJ%2FwmGCzsFc6BisjS0s56crH5xH7ramv8AASNVp62GftOInBK2uEu%2F%2B4xy0dxJbh5hAZxKLo10HqYhra4iVtHerK2yo0vOFb2oY2RwbdAQQSh57fi%2FYipd3frhKrDVc4ePuG0Qv4K6oblLBFuYsxJsnzGoh%2BtTlB5Rjwhvtx3GQKkpumi3Vzx5mMClTLkpvTKaU3SIkKAhObuPYg0BQ1n6MPIOTJBVCSCP4TiNUx%2Fbvy9yJkjGgk9Nek2ymWGXmLMFpWkDJsSwmniYM2uBlo3o1Ly81thfHAkJTHRg13vz7jxF7bqpLV6VDdNf7mZ3KxqlgVNpZmT0ks5HheEkAos5x8vddrUpsNqvl6dWqii40DYu8KK%2BM5GEG2TbIZ%2Bj66ENNrDvBwcDTsYSeggMvAyQU8S68dE7ZdBkvXsiUk1x2V%2FUI5%2F4TAW1HByzinKTKvVStjoubFSl3ZX2760936PlpfI0hnVeKLV%2B%2BUAS34hsFHYetplm3%2FTxgfLFfikzClYe%2BJeur%2BzSLzo8eXE3zzDshInMBjqkAdRmV%2BD%2BPvHlqVUOUmuMJpZDTtaTTkpztCvMULNdDPlmqmyRVfDehcjFxv5Zs3uw0KEMbItPMqCatqq8%2Bfs4Mlmsy5kLQldZnZr4t70P7JyPC%2FKi7vS7wmKTjWTyDc4DsODKfcv5Gjc1xZ%2BTnz9FFI84W03BZb8zvIojeC8%2FbtTmm7bM1m%2FR19mFXkphbWYDmEZqhPJctlR6SenuRSk3TBA6638k&X-Amz-Signature=b3f38b0fb78e26cae05e6f603a65209e3e5212fa5496480a09f977d6f94a2c83&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ITYZTUV%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T193633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQCMN%2Bcyi%2FZZ%2FpMQaXqLgI1sNB%2BU6P7xSJSZq2s1%2FsW8wwIhAIiIA2cBjctzbgafZcpFgN4tLv3K471tlsbr5p8S7Km2Kv8DCAQQABoMNjM3NDIzMTgzODA1IgzptMw00Vlj9n46qTUq3APD5QGCf8waQGKXfgBkZvOLo%2FTmkqTDMIPP9yEnpqgPr5SawulwT%2FiT%2B1KEjuQKh49mpn%2Bq2NBdxVSgJ7hAJWyDkZVfGeuT262yhGU3lgWJ%2FwmGCzsFc6BisjS0s56crH5xH7ramv8AASNVp62GftOInBK2uEu%2F%2B4xy0dxJbh5hAZxKLo10HqYhra4iVtHerK2yo0vOFb2oY2RwbdAQQSh57fi%2FYipd3frhKrDVc4ePuG0Qv4K6oblLBFuYsxJsnzGoh%2BtTlB5Rjwhvtx3GQKkpumi3Vzx5mMClTLkpvTKaU3SIkKAhObuPYg0BQ1n6MPIOTJBVCSCP4TiNUx%2Fbvy9yJkjGgk9Nek2ymWGXmLMFpWkDJsSwmniYM2uBlo3o1Ly81thfHAkJTHRg13vz7jxF7bqpLV6VDdNf7mZ3KxqlgVNpZmT0ks5HheEkAos5x8vddrUpsNqvl6dWqii40DYu8KK%2BM5GEG2TbIZ%2Bj66ENNrDvBwcDTsYSeggMvAyQU8S68dE7ZdBkvXsiUk1x2V%2FUI5%2F4TAW1HByzinKTKvVStjoubFSl3ZX2760936PlpfI0hnVeKLV%2B%2BUAS34hsFHYetplm3%2FTxgfLFfikzClYe%2BJeur%2BzSLzo8eXE3zzDshInMBjqkAdRmV%2BD%2BPvHlqVUOUmuMJpZDTtaTTkpztCvMULNdDPlmqmyRVfDehcjFxv5Zs3uw0KEMbItPMqCatqq8%2Bfs4Mlmsy5kLQldZnZr4t70P7JyPC%2FKi7vS7wmKTjWTyDc4DsODKfcv5Gjc1xZ%2BTnz9FFI84W03BZb8zvIojeC8%2FbtTmm7bM1m%2FR19mFXkphbWYDmEZqhPJctlR6SenuRSk3TBA6638k&X-Amz-Signature=538617f6585a222f6873966d57eb593a0a1210f148307cd521d356f6d60428fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VD6B7WO%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T193618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIQCPizRP9tJMRl%2B0WUl5YSiqo7ovAtxBbcfyb4aw8e%2Fr%2FAIgNkCedB46XQkU20%2BUgGkocoKKaSd1%2Fqr9SQAcBu%2BXIg8q%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDECh%2B%2F7QAiWolhLF5ircA1u3Zx6XMmxiFxFIS%2F9Jl3kxJ7ikgR4KBhkL9D4u%2BNENDMLjlN%2F8hd0135Mzaz1olT8O%2FvJmAZ%2BFYk4zSIKiVD72sYDAOyHbnHKauFtgQC83AMiQ7ret%2FxmEDEmc9WXsQQr8vbrmfdn3mwimvyUZZFnFAF%2FbY9agChXWgIdE4GGsB1xkGGLxOxUwDR6rVoNMfQevtcXwbP%2Fq7rPyZcEyxQJZKMttcl0VFKIi9Qq5pa3c67Uncb2nZdpyxhnDnM8Rusy8RQRhBuf%2FBIrC6PlSpgeDe4gmIep1bL2MD9PIGpXdNVyKabFuE9gVWfeU7fqeRXIaDPra9FdiiEotCyP62JfwYWBOJl2TlwSvad%2Fi2eaf5r%2BuQg38kuU1F53GlRqo8UKEq%2By14mssBxkr5Bpuq%2B1psEIRflDMyswVkaQBsmBvnrLGLRgKXLU%2FYQcpYInLFwFuEV4tnVHhs77risNdSSggefF3JN276HVn%2BWFzcl1TXBD0xAidqwZg0JpeOrsVfSNG7cEIhHJsbjab62A1n9fEHWuJ0EEkBifibJ0qt6qsPp5nRRvsefjUqrScaFoaDrNULpEx1p3q4j5pyD5RymgBN9%2FdXWfCxbCa%2FIEolns9W%2BWqw01bsENTMz%2F2MO2EicwGOqUBqRq%2FP%2FzL8l%2F%2BaZoReuMkFiQCpOq%2BAlWKouyXynbVp1WTfQLR4WENylNlJDO8lu%2Bzs9Yee9HVLQL37W1Qpz5i%2BvLObai1oYn%2B8pKxt0qK2ku9uejvtFpe%2FcTpqtiwuBri%2B1xA%2BT7WhhT59e83q84RRYogcjrdpYvp5byvOSp4m0yEw6Z9uFpaHVk9IF3ORguFs%2B6K5RPCzXLO6W62JtQhulvRiRI7&X-Amz-Signature=99129ef9b9d0b707d8d9295d37aca3c573fe9bf60d89c3e434bf15d2a78f56c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RW2LWM65%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T193636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQDS9m0APi48enJFWc528fW2jLaxiL2s3BRSbrUFGPVoeAIhAIt%2BSThm9lVsaj0QWniPnHprgtZI4t7qWq%2FSDmYKmjpUKv8DCAQQABoMNjM3NDIzMTgzODA1Igz%2FRMVpXADfRz5fhlMq3AMhYqjJOfxvrik19Uq1Q117u4DNd2iFXYzLsOuTJX7tRNvk%2FZrh5QaGB2PYnm7DFLbJzCFDo8yjb05bAtfUsWPVPdBji%2B%2BQ5YlCu70H4IVAgrQrlBzc7Relf8BpSKJujOtChoFeM5XPY30A1qAQRszQKLlZ5RO1aFimjdtcunUNCU%2Fx5y%2BriOcFrjHoAvcDpAi7FrUbD7tsDRKLDWZtPfWj84thZvROJBHAWm7X4JrcADOmoVc8PmlKW41JvTbez%2FzS1dfrCR8QizSlsF7EzfyhCSYBh606SsqYn%2BEb5sr7aDNOwqJtWXKm5rqMN%2FNu4qW6IgGclFsgfO8a6CT2Dce6MENgI8V%2Fo1rsylnoXJNxvfuaavSnsJ0dVVlq5l75vy5kJYYYy7GbL1lTZ%2BEOmR5KsOjgEGYvRvDcryiVhZM2E%2BOYuclyJLmfnM%2B%2Bm4tb0yWlwNZcrb5Qalb0yn0tckdMDtwA5SMFHkS0f9Imm8NszmUO4d2Rkt4dq3qsFqexpOw02rUYZTbE%2BN%2Bk1%2BJ6zed7EAvAG3IXQoo1z9Fw50QUgmUEswyBYjgIaqQkD0bgQ%2BcZgF9GF9l4Ba98ehfrHO1Wd4r3xazebEPchHYJFKAisOrdYl%2BrLTQshKAzXzDWhInMBjqkAa2VQQ3MrS4M%2FpZjvm151HqiMZoGfIhKmEENEVt2t76baWIKRmTJ3cQ%2B2%2BlnTurgC6MHcRDUKmfpAVf0RNmwC2PCrVRXJFsXkdkU93Jhwro05TcqneqRYf8B2tFUVIAdxvdrKpi0XG2ofSqjJGiAWOl9UZBTP3JFYn1ooWQYLNVb%2F3rxyt5KMWX68fSGPWLV%2FBMWmGaSdruV74DZMca5%2FA%2FCTs%2Fb&X-Amz-Signature=b98553a4503074207d9155082e86cdc33887db622471474d328fc0085ff432c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RW2LWM65%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T193636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJIMEYCIQDS9m0APi48enJFWc528fW2jLaxiL2s3BRSbrUFGPVoeAIhAIt%2BSThm9lVsaj0QWniPnHprgtZI4t7qWq%2FSDmYKmjpUKv8DCAQQABoMNjM3NDIzMTgzODA1Igz%2FRMVpXADfRz5fhlMq3AMhYqjJOfxvrik19Uq1Q117u4DNd2iFXYzLsOuTJX7tRNvk%2FZrh5QaGB2PYnm7DFLbJzCFDo8yjb05bAtfUsWPVPdBji%2B%2BQ5YlCu70H4IVAgrQrlBzc7Relf8BpSKJujOtChoFeM5XPY30A1qAQRszQKLlZ5RO1aFimjdtcunUNCU%2Fx5y%2BriOcFrjHoAvcDpAi7FrUbD7tsDRKLDWZtPfWj84thZvROJBHAWm7X4JrcADOmoVc8PmlKW41JvTbez%2FzS1dfrCR8QizSlsF7EzfyhCSYBh606SsqYn%2BEb5sr7aDNOwqJtWXKm5rqMN%2FNu4qW6IgGclFsgfO8a6CT2Dce6MENgI8V%2Fo1rsylnoXJNxvfuaavSnsJ0dVVlq5l75vy5kJYYYy7GbL1lTZ%2BEOmR5KsOjgEGYvRvDcryiVhZM2E%2BOYuclyJLmfnM%2B%2Bm4tb0yWlwNZcrb5Qalb0yn0tckdMDtwA5SMFHkS0f9Imm8NszmUO4d2Rkt4dq3qsFqexpOw02rUYZTbE%2BN%2Bk1%2BJ6zed7EAvAG3IXQoo1z9Fw50QUgmUEswyBYjgIaqQkD0bgQ%2BcZgF9GF9l4Ba98ehfrHO1Wd4r3xazebEPchHYJFKAisOrdYl%2BrLTQshKAzXzDWhInMBjqkAa2VQQ3MrS4M%2FpZjvm151HqiMZoGfIhKmEENEVt2t76baWIKRmTJ3cQ%2B2%2BlnTurgC6MHcRDUKmfpAVf0RNmwC2PCrVRXJFsXkdkU93Jhwro05TcqneqRYf8B2tFUVIAdxvdrKpi0XG2ofSqjJGiAWOl9UZBTP3JFYn1ooWQYLNVb%2F3rxyt5KMWX68fSGPWLV%2FBMWmGaSdruV74DZMca5%2FA%2FCTs%2Fb&X-Amz-Signature=b98553a4503074207d9155082e86cdc33887db622471474d328fc0085ff432c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665GDTSU3W%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T193636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJHMEUCIC6Iy4IAVy1OHJxGHcRmz%2FBzFBD40Zj1oJ3ak9XzwbhyAiEA4Y%2FOGdHJOo58Ro%2Bp2ChCFRQWVAWVgJzyW6Ls5Q3FrtQq%2FwMIBBAAGgw2Mzc0MjMxODM4MDUiDMqJCsLuF%2B6NR5xvEyrcA8qPcDIZ083RKQkExMC7LXCAckvkc%2FeY9L7mUUf50u9qCxhgn0WANcqVt1OgxKIsu5jTM%2BAf9FkUWYFVGd0Ihv7zQ4Dckqx8HRw76MzgtNTJVaxFvGUum%2FLm32OnDvqF%2FkZ2e%2FLQQLgmOa%2F6EHBke22X5u4SHk1B21cGjUfVIKrym1HVFevHcedhcbVummKTa5t9YOV4upr%2BQFuneyYe4AND%2B2yMoadm6pbdM4bskxAyDSkyuK38TjuRmANeND%2FMpYzJFiMeK%2FrjFPO1NGcyeMLg%2FCjpBT2%2B6ZTvkgry8eh1Ccjg3FA1nA5XX7It1WAiiuF3wo8wAQXcAqghSFbZUFjshDzg%2FPCP2AHrVrf5%2BtOlgBBUdC1YTBZYlvVaM8mmf92kL1V26iiRP1dwReAGwGg%2BlUo8XBqlSuzKbSu1pi%2FklyXsBAFcEM%2BflNgJQPQHhppIbtAUHmu%2BFs8DypOKPFA2H2ZOyU8gHxWmzTLFMbpTlabf1%2BIl6Hze1gTjtCJVckgpmGiW4648ytj4JHdqLrfxgWQxt%2FAhW1iZ8feZYY2Wf0u44wEbVgl3qy%2Fbr24a7xpkYUJmbxAyr5cGsjikT80qXpj70Z4kuTeReHMQYNp6Dhc%2FTkKnTVxKGg%2B5MPuDicwGOqUBwUouCl9VjQLNFlE7gYb%2Fi0ceSIV0LbdVmfNWC4LWm7pP234af4FtbH%2FLAXuHs2CN%2BD%2BJM2nP%2BqF8qmYrTpx5l73GfhMYVzrG8dlhC9kkbQGag23GkKrTMClbV%2FwGAqgTc7c1wcE4w0g4MiRomgecOFG%2BOvHsllRnAMnjdELxjV51kgi9EHJoaD%2B0pEd6xF2APkJpEiMoU6KTtXEQdcRl2harsaCf&X-Amz-Signature=e3ef9465f170991ae9b6575aca6a74c5cecf8a05477728b578accef0055950de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

