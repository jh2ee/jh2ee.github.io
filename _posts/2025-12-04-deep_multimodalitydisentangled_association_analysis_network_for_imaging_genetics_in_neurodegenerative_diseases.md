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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4IRR2L6%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T222002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCIQCWk4lU4U67Cz3XVCdwYm9RvKO5LUHzUMo6tx3drHegxAIgCWV9XpHRrl0X6n4Vapl8Hu85shioF%2FZfK1F%2Br97KgL0qiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF3c3tV59VGHoFCA0yrcA72f%2BDoiLQdeo0bkkGBBnTRPL3CYaUe1T4IQUkM3VoBnSrSse%2F9WvyBMmIvKEEusslpCKq5HP9nvLyEfetu0wZ6o6PsfnitQs%2BgKhwwG3m%2FWc%2Bexkn92Y0zvt6620%2BNG3lU8JU%2BL7t1CTbBsP0e2%2B53QgvGEoaPWvBnCXJftlhXIgyyvTLl3Dkb4pCUTeajIE8oCHsxliPDBpdZQhwU2TQIPgy2vDHX4N%2FSNbprzAsgVMip3OVUt9ZOyKs4UqK1bDjvG7BsPxHcDKpxGuhrRGHQohFCtTXnaRLOotbBF6mTWYotP6XFOtAl4Q9LIULJngch9H7F3R1PmtqMCVLBSGh%2FrSO6pLz8HOHUG4dzjAC%2Fk36wIytwt4gEJI86j%2FBb0K31T%2Fs%2BJDJIh4rjFLQIRpS2sSvEewI2%2FHId%2BdsUy3AybpQBFplGr6iSQpt8cO%2B0hxENe3NOwML1k4mKqeDjnDjaGjZ6PJyS0Kz6iUtXrPANa%2Fy6wztDwclOxjeXgdWT4Q8D1TOi6sh%2F49dVHcUlfSoY7r%2B5zJ5QKt0mBcYJ%2BzV4FE8LhziGE%2FcfgZdQnslLc9UqsfjszQRhXSbAUdGtHwhIQTctCGQ5ISg%2FGdFT4fnpAOBRNu3Vf3unGkN%2F1MLKF580GOqUBp8dZN3QIYEry2F9kTzIhfOAVvHhiciYM4FtaVw30KtWe27wBSV5UGuvniNP3DE4JarvxKvwzcAc%2B5QkAlVcNACEGlluCHbeFCOb5msInIX1yYFwm3btc0FAzbf4qCyRMX%2BUQx5iDYa6%2F1Si3hQIHW52EUwFDzdnPCy7kLRZragtZkw0aBTjYZpdPYlJOoziVFhQguJP6%2FxMVD3vKBSNHyDVwCaPn&X-Amz-Signature=0089bd8c06e59c45477d92e30d9eaa860b6fee0111d4de1b4da2272b0f3ee61e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4IRR2L6%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T222002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCIQCWk4lU4U67Cz3XVCdwYm9RvKO5LUHzUMo6tx3drHegxAIgCWV9XpHRrl0X6n4Vapl8Hu85shioF%2FZfK1F%2Br97KgL0qiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF3c3tV59VGHoFCA0yrcA72f%2BDoiLQdeo0bkkGBBnTRPL3CYaUe1T4IQUkM3VoBnSrSse%2F9WvyBMmIvKEEusslpCKq5HP9nvLyEfetu0wZ6o6PsfnitQs%2BgKhwwG3m%2FWc%2Bexkn92Y0zvt6620%2BNG3lU8JU%2BL7t1CTbBsP0e2%2B53QgvGEoaPWvBnCXJftlhXIgyyvTLl3Dkb4pCUTeajIE8oCHsxliPDBpdZQhwU2TQIPgy2vDHX4N%2FSNbprzAsgVMip3OVUt9ZOyKs4UqK1bDjvG7BsPxHcDKpxGuhrRGHQohFCtTXnaRLOotbBF6mTWYotP6XFOtAl4Q9LIULJngch9H7F3R1PmtqMCVLBSGh%2FrSO6pLz8HOHUG4dzjAC%2Fk36wIytwt4gEJI86j%2FBb0K31T%2Fs%2BJDJIh4rjFLQIRpS2sSvEewI2%2FHId%2BdsUy3AybpQBFplGr6iSQpt8cO%2B0hxENe3NOwML1k4mKqeDjnDjaGjZ6PJyS0Kz6iUtXrPANa%2Fy6wztDwclOxjeXgdWT4Q8D1TOi6sh%2F49dVHcUlfSoY7r%2B5zJ5QKt0mBcYJ%2BzV4FE8LhziGE%2FcfgZdQnslLc9UqsfjszQRhXSbAUdGtHwhIQTctCGQ5ISg%2FGdFT4fnpAOBRNu3Vf3unGkN%2F1MLKF580GOqUBp8dZN3QIYEry2F9kTzIhfOAVvHhiciYM4FtaVw30KtWe27wBSV5UGuvniNP3DE4JarvxKvwzcAc%2B5QkAlVcNACEGlluCHbeFCOb5msInIX1yYFwm3btc0FAzbf4qCyRMX%2BUQx5iDYa6%2F1Si3hQIHW52EUwFDzdnPCy7kLRZragtZkw0aBTjYZpdPYlJOoziVFhQguJP6%2FxMVD3vKBSNHyDVwCaPn&X-Amz-Signature=0089bd8c06e59c45477d92e30d9eaa860b6fee0111d4de1b4da2272b0f3ee61e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RA5IZL5H%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T222002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCIDipEtyF%2FSSvaf5QDq13ymb97gcwctZSSGjoow%2BCd1ccAiEAtJOrVfLK2HjNlgR2kccugT2yyGLCSJwkHfn58SrrvAcqiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLOm7Za3Fg9HMW8hjyrcAxwXTf6rGrGhmTTAidTmWZppKvzRhq717m3sg4TqlAygBSut0Dn1SGhS66CTTMW1FXZ%2Bmf39Hd%2BntkAM1MJQfSLExy5a4UjL9Yw16%2BIJuZ6XPvAYxWRcX%2F%2B%2FjGMKOsV9Ie5QBnwyFg2f%2BoG6RIeaGaUkNVfbnlkWufuVoU7rWk6AWcXnYcU6ZBY1Q1ErLaITtsyQdDAi%2Bym2VV6YL9vWwhCzXUs8UMcGAXzJttWmvBx1ddfP1ffnnMZqosiHtoGAr8gubognS7m8Es%2FX6xAG6pY701WsPBkPnSvOn7kmqohgPQVuMRLRNppplFtUDwdsBzC5H3QMx%2BgOrNySS0DPYWeeofzRZhTd4RymoPty1qIao4mGqp2Ced3eY2maUo1XQ9yv6qrGFW07tmU26TuEnJMzAjh5A9xWU6Q67z1MPx6D4Rk7Y1amyriTArh0o0IU6I4cc%2BxZes4dlfIpZ5E1Gu6uOtAMozUBLBoougG%2FD2GtoiSD6PMbRqszyoAYu4EOiRscpCYKY9Eq1107VQX8K4DEJoJ5c78kFMyV%2Bz6Gi0txtc%2BEI%2FKyPQjkMph4UM2zdarnkBzm88gMB%2FFhP9HR5HtPpfjpTNFG58E6fkocjaWldBfSAXab%2BrVirhp0MLKF580GOqUBz4QuX%2BcNnmA0iQ5nv0A4UrKLszfUZ%2FTJ2k55%2FYrAiavnohMZIHnFOT1H0xeHOFXGqxxXYcU%2B79Bnd3LMe7vlvnmJTQiEx%2FzFjHB1PTUEOGGChu2KDgwt1%2FU%2BR%2FZqairH5565UIQ0KSSh1J3tgAEjSbl0JALzSfInspkyj5f9VxYGcEIEya4LZ5%2FxnnaC2idAr7iuGnJO3UmAVFOLzsm6OZSETSQU&X-Amz-Signature=04abf24a604301e1e1e6ff00ce16e8974177e390884539ede5e7236d82caf502&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXHLS7RR%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T222005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCIQCw52uKLIFGigr06ezXdBzO1YIobyfqFyBTfajfQuONaAIgammAg%2FOghJH%2Fpr3mPT6lT4s4%2FrUIwa68vlLIwANFtAMqiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH0qRCSJukqAHujdcSrcA0SIjJEVLKGwmfkqc4Y2U98l4Kj3%2B%2FwlUMjPVjf3CcjzG8mglQKeKgqVWVPGCKdN1V%2B%2BcZKKMvD7WKdlpn%2F2S%2BkIa6duFm1pMNagNYZKwyibNRfgXd%2FzS%2F7zVVyE1XDNc0N6w2PL9wLHJ2oee8%2F34vl%2BM8qOl5yo0IF%2FgoLAuZOeFnUpxsY2YOQEUw2e7rzAHpU6uWfATQoVA6Ndr08qFRTA8hSVTEn%2B%2BFgRSkbS5ZmWYH3JxOajMxd0MDnZb6XFXsocUZbw6VQTTMueuiWenk3tBslh%2Fo7wfsfn39C0eAJTZyisohG28rREvsmOuGOVnIer%2BXckMxL%2BGHYiDgekdnypAPW2qIHS2EA49tjOU8J7dEHgBWZyOL45deXWFEAIvY52klJrDElAKKLuzEDRlSXccTRGucpLcSVmy9K5OIm4Qx5JJHJ4368QlNsrK4i7zWb5qDfeSa%2FAC1aRFu7rs1YUt%2BewXYDek%2BUw6%2B7rX9Vg00KK2WJFRWDuGk%2BdoyDd0P8t8t7nd4W7mORTfOUcHzWKIHgtsIugeBoU%2BwPqUXl%2FP62HIgUSowAOATFVMIFWdxzpKNwJNtzaC2PhIEbIADegAwd3ASkjbuoKf2auuotsMyK%2BFDdSl688HsSLMIGH580GOqUB17CaLupPjG%2BQheWj%2BSyjijtEgUlhuNV9n83Vj6f4HLZ69tiMjel3tHNgIc101Hw8tki9VYsRxE7TU9oa0cMJYYBZqoApy0dV8YERFtOHQ%2Fpk468%2FR3feIRExGtRSbORTsCnxmyi%2FJ4fXr5dF3etNnzQ7m62lLDOpopIzU52EkfxiVYs9iAKXRFFh6TPPg8BD367FDdXUcdkedCcN2gQC2IQHOwQY&X-Amz-Signature=11dfa1507dec0a7af5cf69ad16921dc1f75d2e5f33e26638eb244dce9016533b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXHLS7RR%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T222005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCIQCw52uKLIFGigr06ezXdBzO1YIobyfqFyBTfajfQuONaAIgammAg%2FOghJH%2Fpr3mPT6lT4s4%2FrUIwa68vlLIwANFtAMqiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH0qRCSJukqAHujdcSrcA0SIjJEVLKGwmfkqc4Y2U98l4Kj3%2B%2FwlUMjPVjf3CcjzG8mglQKeKgqVWVPGCKdN1V%2B%2BcZKKMvD7WKdlpn%2F2S%2BkIa6duFm1pMNagNYZKwyibNRfgXd%2FzS%2F7zVVyE1XDNc0N6w2PL9wLHJ2oee8%2F34vl%2BM8qOl5yo0IF%2FgoLAuZOeFnUpxsY2YOQEUw2e7rzAHpU6uWfATQoVA6Ndr08qFRTA8hSVTEn%2B%2BFgRSkbS5ZmWYH3JxOajMxd0MDnZb6XFXsocUZbw6VQTTMueuiWenk3tBslh%2Fo7wfsfn39C0eAJTZyisohG28rREvsmOuGOVnIer%2BXckMxL%2BGHYiDgekdnypAPW2qIHS2EA49tjOU8J7dEHgBWZyOL45deXWFEAIvY52klJrDElAKKLuzEDRlSXccTRGucpLcSVmy9K5OIm4Qx5JJHJ4368QlNsrK4i7zWb5qDfeSa%2FAC1aRFu7rs1YUt%2BewXYDek%2BUw6%2B7rX9Vg00KK2WJFRWDuGk%2BdoyDd0P8t8t7nd4W7mORTfOUcHzWKIHgtsIugeBoU%2BwPqUXl%2FP62HIgUSowAOATFVMIFWdxzpKNwJNtzaC2PhIEbIADegAwd3ASkjbuoKf2auuotsMyK%2BFDdSl688HsSLMIGH580GOqUB17CaLupPjG%2BQheWj%2BSyjijtEgUlhuNV9n83Vj6f4HLZ69tiMjel3tHNgIc101Hw8tki9VYsRxE7TU9oa0cMJYYBZqoApy0dV8YERFtOHQ%2Fpk468%2FR3feIRExGtRSbORTsCnxmyi%2FJ4fXr5dF3etNnzQ7m62lLDOpopIzU52EkfxiVYs9iAKXRFFh6TPPg8BD367FDdXUcdkedCcN2gQC2IQHOwQY&X-Amz-Signature=76e4172369a8606b06e1eca5a155179e655fd84987c37c2ce4f4870fcb27d1aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRAFCCZO%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T222006Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJGMEQCIBFCVd4txof8uEdYtHp%2Fzc4ouC8qCvnhQT%2BZ%2FQyWBlGsAiBdNVPtSiZzp3beca15RMLgRaAL36ZghL40SYmczCEFNyqIBAj2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMzEQss5MmyAfvRiBkKtwDecriKAGQbtnig7b%2F43QxVTjyMCfUZ3v6cfpqSXtA2EDPxztTeJ%2F%2Bs3RB30SZUDNqSIh0zSnH%2BHmLPJyrPct32TqXch2d1c5mlhzmFwfWqzZWshYQCEJ9OfjM2dciGLarVKLfnI5po7zMzi3VnWdLa0beSBaHMtz%2FYaCAjpUcoCzwle3w%2BxB9L8OeHNJcRIFpWaALF2zAVlXy3Zh%2FHVwJtNste4LqhcMrrmzbDrM2yM94ohF%2FP3VbLDnrJvk9Jp5RjOuQwzLP3ERZzM1Fp8wb2gfV81pkr2CE8i%2BXG1lJtqA%2FNmHz4wXKsNwJflXr3jLmcyNSsfM0Pffg%2F2w%2BSipPb24xoB%2BCN5SE0U%2FR5o7YD1W8Yy54rKGvv7dAEY2XobdcleIXEGqzB4IvOzKmd7X2T8KN4ocYUq21N1wRa8L5NokpuQ3Ge4xLjJyB7UmWxXM%2FIbFHQa9yW%2BKLgMsA4UXf9VMmhY%2Fecv900B8baaagSA8SFVIWNnzdtYgXjoXkIv5kk2%2FwbEJlt%2B2oJEucF%2F%2BSZ3fOiEdmyFd6vK01zXroRdczdpoDYerLtR8P96lR0IkIuwwHh3B8tfc99G18KSYnMOahFjcNZOh%2F4y6K9TEQ83Z%2BpEUh%2BMlVqYjrSgQwwIbnzQY6pgHPlc%2FXfCUSVrChIISTH814o%2FYBh%2B0j9hVYQ%2B%2BfrLeihcFRY2BjseUJ7sI3dowOeV47sdZ9TI1wvGpdJAp4bN78%2BchpSwCs2s%2BAeken86ITfUEJd6XMU8URmrIzO8%2BOO36nEH0LQbeDl8e9C1CWac4f0OWquajC8IDsRGVB153k6%2FX6XBIi7ZyDT0Y5gqQGn3Y9oMtOpcvLHfdg6uMlanOWNSlWgjWe&X-Amz-Signature=ef8bef42200a6de93b023acd49464e74ca7d6243f13b258ebef2d2739a8c2721&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46637O77XSG%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T222006Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCIQCE%2F4aTNk%2FA2cMUeQTuh0R4BVzg27mPh2zISixLutx0%2FAIgEF%2FPvqq0jxIDJFGv%2FKE9%2FxjCn5AJiGp6UVKEv502O00qiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJhye31%2BQoLdYrP0%2FircA%2F9QTJDXRJVlXie217ixB6GuRA9cBCnEc6FLByJc3BxTn1xquNudaly0EizB8OkzbJ0J2vpFSpBiIME2N1Uls8Ii284bvrFiEV9IRPdgpUmFUXvip7svhLneRMEYSAngFF7eMAEaToqGGRCMxwwa1MwRjGev%2B6GgpMZ4Xufq7VJWiK1KXymGBNU4d%2FrWEp00x8P3n9xiPQcTHBrqFK2Tb4NpEONrO05ZF1LGQ1OMJiIQBExS6Go%2B4RP8EaLme7qzkUc6UsPcQFN2T4nN%2FaCGHNsoorCcIIR3kS4UCk2a64hddHxQZ9UUpYRoL98RB6vcisLkkO6zr5CCsYFxqwMTi0Uw0ITkbvRQMeCaPRnIeTnIjWpegGcbwnQ%2FT4XaR4evxT8%2Fro5Ohbj0%2FTRG4vxOfHsB%2BfZwnY6P42HZkh1XJJqHGYogtKvhOBG1e%2BpPLVKQ2hVSrKDI3VlzpvevmD8oeS77qxR93EBv6Y5EINbgwMGc88ZfVDtszHGMqNaGK%2BLYhzpRpAmDNRAgF7lBcG7x0q56nHNTwutDX%2FVq56kVXFI%2FDnT2tmuxGE8YCUuHU5GZAZLfLBXHbzFjVB%2BjgZLpvfPbPHtSTpB80gNg35Tt8YBEQ22%2FIKtwM6RbTF4kMKiF580GOqUBefMV4NZWSCQD8kfMffWLqSgN%2B0IglvkDRH2wYW2ZfoixnMM6V97%2BR5NviHmTpgAyYK1amBDFM6v81rZq3PFhDvhQaHbTwJANaB6XtPnGsW67r6INgiH%2Fr1t0AYIepKvEHbRjkaWfqToNnROH3%2BbDK%2BRzNN6NtSHqw2Q6p%2F2V9zen4PdR0a5M9I7ofuRKCDjpT0Kfw4jtYsyOLSzqtjOK8Of4DAh3&X-Amz-Signature=81c3e733859e190078e85b25de947d6b1c170f3ceab13cb517b1fbf0427bcf7f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QE3CUY4K%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T222007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCICRMK18WT4bLwSglzv7uvCTb20l5w4iAobMtF9oGobjoAiEA13uXpAo%2FBcdJDn2YmqNFKexvaQ2mPDmKp3muiGLxuAIqiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMIl8dtvWR628ZZzNircA9iSqrPN5XZgcuXccxR6ErdKf4v%2FMnjx1hAcCxuW8Vm1XOklX9f%2FkgKzOelihTxbd3DQDZQAoH7CRbk24zf1tSF14iY3bZcI1k0lg%2FL9i4CT4vCLA%2BqdnfH3Y%2F5f4dLic8Pj44PtYs4d%2BEpBdehFQcBH9Rb3ryGrWlhi7SFtQQZ3%2FguHnPEDwiUOFkW33JVsyknCYV8d0nM7ynIfyWDjzmTy6hFCxlpaIs76SpKwCSeROosei%2FuQOULP8kx7l1Yt%2F4uyrETApaIXxrwPsQyqDhafZY8RoGsNxjfMx%2F8JIfGIoR36b%2Bhw%2Fz%2F9Gh9JYcefjt2SHEsYkkgO92scr4SZJpxchUmp1RBig1BT3bCkPYSvDU2NbhoS%2B%2B7b%2BCbMRgSdmobwzUX4Y3%2BST6YicxW4iOV4jTmI6ihRcRXG19puCF9qB7aYYSCWXviTgCauYXhhIduPsit3sWMz%2BeUdIOnwxkgRzJ8jqsQcjU37mj5gCuJ%2FMYL7HpY%2B%2Bvisna6VtFJRyZX6fH4uwLTByd1ut%2Bh1jMCj%2Fnfi72nEsRIynXwnK0vix%2BEJhqzuwDQtUkESolywyOutvjwSEYjhBQFyK24zps1n8Syma80Qb1FqtYsxqpNlO%2B9b98W9aMFso6lkMOyG580GOqUBypAyD2E2VgG1Q5bC%2FtE8cJHd2CVQqiUjAjWlS8wamawSlhw6AWxnSSn5Xf0imgajZVbqz5WjMDCASV9I1qZn6vUABhQBJFFXhkoyAUPRd0%2BrXvCyjSJ%2F96Ctkkzw2Ih63yZCLz9F7NB00VS2wS7pGHZMe6ygwmMQQFa4V63kY6DLSHUEGyt8h4QJixmIjOrqonRITi%2B8KfPMo6yDnz3ZYnd8S23M&X-Amz-Signature=8a6f1ce3627272bce4c563ab1b668e390f2a07b7a7b88736995309529ecb2620&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZU6AIUB%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T222008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJGMEQCIAdTD7qIQz5hWpxlr3zJzv36k5nXjJsGuasUsCJw7mHiAiABPyQJZZfwX6ZEi%2BpnQrLTgzcKzTZBhzJa03QSVr7SliqIBAj2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlFihdtH%2Bo01Y7B%2BgKtwDqoNPxEmxo%2BeOir1xeY6qyjtb1gKb9VPbD0TUzzANdWbEqF0m1%2BGdf3xtkx%2B1UBE4GvqHL9PqKGpHH0CIujXNBREmf1JYLWwygtfqk097NdfSRW6h0MpzDUocpbT61TI7KMGqijMfYDi2%2F4%2FCJtJFOJHvccwqiUqqLi5edForZS%2FmKqKd4pvvwi9I2VtQ2yN14VbLbXJiors5HYSmqkUBoKKnBU7xRdTunf41y9dt%2BGQU765uuoBUA6%2F3HxNvFgsr48jCLVOYGXqHJCz0ITqUOqLDI1gCaJ33Ev5GDLKQ8L1VwYveNLhIKbpvzvhCcUjhSlHJU%2FbHYbGPfCu%2BlchB3Ye3SaPxSPld7wQfQ5YCYh2R4Ye2GoiM9x0o3%2B%2Fn4qEMQkxZXN7924mxF4y4NoiIht3BovC50kug5RwkO21qFI5J2CF5mhYYKMB48Q7A9hQhpsTYdfaYiVnU%2Bhk8XnKcTZbjqaKqoYwejTl3c5eQ%2FVRuaFGjAzNpKsZey8FQLxAA5ZiQc3j%2FrbA5m%2F1javmwa07lzOuTrpEskjHiJUQHwiDfaIJ7A3SRvZfa5VhnG0t9AJoka8mcTSkUDjvE2U%2F3jNsIrEfHPikknKvuSbbGN2CGrfTTnGUIpniqwlQw14bnzQY6pgEiSFEHqP1G5p1ttwOG7KZSIg5V90u%2B7OO%2FBLoGJwU3Zmly3j%2FXaU5%2Bv9rXqq5DN4gkPT3OtsP4pMQ%2FJreiaLVTVN%2BJE%2B4sqMT67slzurvNZ1hucpen4KxCwBEYd%2FeCPgp0qSoQA%2F%2Bz%2FQVfydUSJAiv6714%2FIl9fQFEDma1gNyIyIWTRdwJvLzQuSUYmpWTAJY4a52NWtbHKYGVhqxBEn%2BNFBtndURk&X-Amz-Signature=8a9dbf96308d3cf717abbc20a7403925ba4f290d0b2f27b010f7a70cf372f8ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZU6AIUB%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T222008Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJGMEQCIAdTD7qIQz5hWpxlr3zJzv36k5nXjJsGuasUsCJw7mHiAiABPyQJZZfwX6ZEi%2BpnQrLTgzcKzTZBhzJa03QSVr7SliqIBAj2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlFihdtH%2Bo01Y7B%2BgKtwDqoNPxEmxo%2BeOir1xeY6qyjtb1gKb9VPbD0TUzzANdWbEqF0m1%2BGdf3xtkx%2B1UBE4GvqHL9PqKGpHH0CIujXNBREmf1JYLWwygtfqk097NdfSRW6h0MpzDUocpbT61TI7KMGqijMfYDi2%2F4%2FCJtJFOJHvccwqiUqqLi5edForZS%2FmKqKd4pvvwi9I2VtQ2yN14VbLbXJiors5HYSmqkUBoKKnBU7xRdTunf41y9dt%2BGQU765uuoBUA6%2F3HxNvFgsr48jCLVOYGXqHJCz0ITqUOqLDI1gCaJ33Ev5GDLKQ8L1VwYveNLhIKbpvzvhCcUjhSlHJU%2FbHYbGPfCu%2BlchB3Ye3SaPxSPld7wQfQ5YCYh2R4Ye2GoiM9x0o3%2B%2Fn4qEMQkxZXN7924mxF4y4NoiIht3BovC50kug5RwkO21qFI5J2CF5mhYYKMB48Q7A9hQhpsTYdfaYiVnU%2Bhk8XnKcTZbjqaKqoYwejTl3c5eQ%2FVRuaFGjAzNpKsZey8FQLxAA5ZiQc3j%2FrbA5m%2F1javmwa07lzOuTrpEskjHiJUQHwiDfaIJ7A3SRvZfa5VhnG0t9AJoka8mcTSkUDjvE2U%2F3jNsIrEfHPikknKvuSbbGN2CGrfTTnGUIpniqwlQw14bnzQY6pgEiSFEHqP1G5p1ttwOG7KZSIg5V90u%2B7OO%2FBLoGJwU3Zmly3j%2FXaU5%2Bv9rXqq5DN4gkPT3OtsP4pMQ%2FJreiaLVTVN%2BJE%2B4sqMT67slzurvNZ1hucpen4KxCwBEYd%2FeCPgp0qSoQA%2F%2Bz%2FQVfydUSJAiv6714%2FIl9fQFEDma1gNyIyIWTRdwJvLzQuSUYmpWTAJY4a52NWtbHKYGVhqxBEn%2BNFBtndURk&X-Amz-Signature=8f5c7c0b3d2a71abc0b588007c08cbe4dd2523478c2067efb5ab17a1e2cf841f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZ2WJ7ZC%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T222000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCIGQrtdOsmaClzutXpTqqaUF0CopXgtHbXGXYcMbmVPh2AiEAq5VlzbcVCOxpthg8mkfUBRB7TBMXhmE7%2FSnxlfESWVsqiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE48tnBIhMhXS%2BL0iSrcA%2B2DY%2BLRk3N1XBdVusjkV2%2B6ChEDBo21IcbYJZf3LdqGkwOn5fP4wb0eSv2MB%2BNpsyeS5IjnhFtWtiHM9LkNDdun%2F7G%2F3IARGywXC7Xmk5Gt%2BDx6RviaNYRVt9%2FoN1%2B0Qy1FaAa0zlgVUZQambyqL061Fs308QcOJhl1buWn05raaGOgwnXyL8qR8QTvJi1zQHotpYVRY18hBo%2B%2FwSyEGriNYKk4TAXrVswR0KC2zHMrzfNv48sxdLqUn8wZag0yQ%2Bk7PWBMWuwnt%2BfAhhgAiz7ObAgCfgYbfUvJOhvBExlFrTpA3Kye3Gp3ZTFNvcbfmrTMZzXs2LO0k92cfgIjrngVL4Be6avlj0eGftoTA4Jkj57f2V6ksJTE66lKMrvVkv5obVmXhFPlyxYotBbyPjqY4E3LZ6TU8Sr9Su%2Brjb%2FrsmgqODDPVoy3fxoA1Y6pMekjrTeql9RqycIigyXsO%2FdP5jdoXEZE5%2B0jdDeuCYzjhu1cvfE0yIXtPPQXdHoRVTnNJAtNR8dgIoawpvGBZyrFgPInlFV%2Bp8inC7XCwfYN0%2FQjUdNioMv9M%2FGYf%2B7AxGQ4Nwk0Q5wrxUWIldI4azAngQPQYCc10ls6JdVJZT22DEYcdWyhRVGtluSTMK2G580GOqUBBAodtl77qRyQpwaHc2BDvJD5Ca%2F6ZxPbBPC6K%2B5quQuukyJUMengzjW1cT%2Bl5nifRCNBtbe6xqwh8D84lPL5t6p%2Bv4%2Frr%2Fe1xHxeAV0tM17FJ35I6RrngKpzxY0wjB%2FKrptk63jGrJ52TVJ5Ln5jcz1pxtEUxSmYm4%2BNKM6w7hgCFBAAbkHgNecs%2B4Y0CevkRYBrKdOJ8CBrLqF6kdfl0coVuFWZ&X-Amz-Signature=f90bd98e0e6fbcb30eac019c28b800b1f2ba5960a01c7b2592468fbec4ba8ef8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4URNHZG%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T222010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJIMEYCIQCP0amLAepR39MlB4xPcD18ynOX%2FAVxO6cWg2mYbjbfjgIhAOzVu%2FC%2BUWE67dailCPaEmIKSNuDrYJQf%2F%2F1uSomsH87KogECPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzQiB9b5ttEWo9NpScq3ANuWCwmdlrzaysV4QQ3IeZQ%2FzKZzXbBHCTut0Y93SQA9mHhfliXi2Otp0S4MSS7VFlDCvyw0l2sW0U1AzoSy2%2FXiHGX9kkFGBEB5AJQhigFATINhwNX1mlYzxLFaizQlAMZL1e8eUNX7A8B2%2BkoL8m2sPBY3r6Qi3bBfjf4D%2BxuAa2rFcnMi8nU2HAg7tOyQIgDmPFiTyvfFv1wzxp6KYDjHco0dnZxbRCXDUUXRJgY3xJTbmPauwp5Zffq%2BXUvVpdBVF%2FO2mjPxqrIR%2BDaVzQiSrDc2PPYyUUeohd4gwaQK2o%2FC6nJhC8%2FbZZQCDNxpaHgOTSz5g7R6dYosSnAKmlyGNiUFNPSWKfQ7lNmiIrUvD6%2Bbt6cFT6Xi8%2FXWvlF2ZMZZ%2F97RCOCuE1FTmmcpJkVtgj1t9rCFu8a32XtI4fibUr8Q8RaQ5htCHe%2FXM0v%2FqOweZ1Sd%2FGP5r%2B5XCUJG1bwNW1U3DacEbYi6vIX8jRrmgQQkI3Da95m21niO5qxZ1IWMK1Vf8ZbQnae9g54h7xOgcZ8XSL2cSG29NmCXnLJ10H2QaLg%2Fv11AbW3U5g796hAR1Nmyu5nsqYTffZgRyxqfmMUcBqtPaCgGB5g1jIhDnZw93eS9o3aLw0GzTDshefNBjqkAd7YdscqzBOWu9gzBaDtGr%2FOSIwjtqm5Z%2Bm0VbLAC8iBY%2FUg%2FPqykJJh%2FMgW6TZ0U%2Bqr3v33w%2BuMQoBBCOfH82GIGQaLqhKL0wyE0b8QtQktvFZXYO0JUVX%2B1ioaYeU9k46fkGM5RNUpnL7DaCwbBt2c7%2BrPEUjTGIQDsyR7MqXzcTDLus0b2CGx8wQ2ogCbp%2BLzQPblOw%2FTA3Xl2j192pjHUXDv&X-Amz-Signature=b621ac9d4f32b6a10767f0245a9742a37566821d7f6a859f47f6ecea96f5bc46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4URNHZG%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T222010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJIMEYCIQCP0amLAepR39MlB4xPcD18ynOX%2FAVxO6cWg2mYbjbfjgIhAOzVu%2FC%2BUWE67dailCPaEmIKSNuDrYJQf%2F%2F1uSomsH87KogECPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzQiB9b5ttEWo9NpScq3ANuWCwmdlrzaysV4QQ3IeZQ%2FzKZzXbBHCTut0Y93SQA9mHhfliXi2Otp0S4MSS7VFlDCvyw0l2sW0U1AzoSy2%2FXiHGX9kkFGBEB5AJQhigFATINhwNX1mlYzxLFaizQlAMZL1e8eUNX7A8B2%2BkoL8m2sPBY3r6Qi3bBfjf4D%2BxuAa2rFcnMi8nU2HAg7tOyQIgDmPFiTyvfFv1wzxp6KYDjHco0dnZxbRCXDUUXRJgY3xJTbmPauwp5Zffq%2BXUvVpdBVF%2FO2mjPxqrIR%2BDaVzQiSrDc2PPYyUUeohd4gwaQK2o%2FC6nJhC8%2FbZZQCDNxpaHgOTSz5g7R6dYosSnAKmlyGNiUFNPSWKfQ7lNmiIrUvD6%2Bbt6cFT6Xi8%2FXWvlF2ZMZZ%2F97RCOCuE1FTmmcpJkVtgj1t9rCFu8a32XtI4fibUr8Q8RaQ5htCHe%2FXM0v%2FqOweZ1Sd%2FGP5r%2B5XCUJG1bwNW1U3DacEbYi6vIX8jRrmgQQkI3Da95m21niO5qxZ1IWMK1Vf8ZbQnae9g54h7xOgcZ8XSL2cSG29NmCXnLJ10H2QaLg%2Fv11AbW3U5g796hAR1Nmyu5nsqYTffZgRyxqfmMUcBqtPaCgGB5g1jIhDnZw93eS9o3aLw0GzTDshefNBjqkAd7YdscqzBOWu9gzBaDtGr%2FOSIwjtqm5Z%2Bm0VbLAC8iBY%2FUg%2FPqykJJh%2FMgW6TZ0U%2Bqr3v33w%2BuMQoBBCOfH82GIGQaLqhKL0wyE0b8QtQktvFZXYO0JUVX%2B1ioaYeU9k46fkGM5RNUpnL7DaCwbBt2c7%2BrPEUjTGIQDsyR7MqXzcTDLus0b2CGx8wQ2ogCbp%2BLzQPblOw%2FTA3Xl2j192pjHUXDv&X-Amz-Signature=b621ac9d4f32b6a10767f0245a9742a37566821d7f6a859f47f6ecea96f5bc46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EB4EA64%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T222011Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJIMEYCIQC%2F6v90vU0FwrxVuVa%2BrVg%2BLH%2FYLJlBVPMHoiVDNly05wIhAOc2Ln1xmvC27Aup51ZBi2D4e%2B6iMk9kn8BpaCx7%2FLpLKogECPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzPE1CW7bGvLkMzOhwq3APKP8ZfDyWTXwKb%2FUO0gGRghbAiGoYSTNh%2F9RGCZFGQZplPMWin3YEUm1fmUTsPw8uBsA0NSktJl345FmrYPPwvoXpjJd4DpN%2BXLHaSaZqC34IQekZ406amAsRMuVKuHd4uej33sgi4PQGfIPXD1OCGXeYMkMNVK4sW0A1hFoiqgyNkvx2RcT3s8CY7qT0bRuPUTc52e00S%2BvHpWwkPVJ1ThcdHnVVEFnfwQPXD1fcVRVE%2BwVc%2BWChNUfg7UEwaq1669mBIYXvNxTFu38p65D4acsgRJa15YSpjKOyu9Aew3d39Wec8MVjebJgPWff%2BWKTZRxfYexBW2itsbpPSxqzCAevVpLr0lTQJ9HX%2FitsO8luLFEFeNgS38we0pkr9vuACpa6GrzaVi8fSSPBX527OmJkSjhC2lKEZpn2ktp071%2B%2FPDGF%2Bmx7cm%2F9JqSCrnNZLDgvF4nyuf17et2vf0ovtlUkxkHgfxVh8Uf1slhAQ43XCpAm24pnES5vJUYLhs9CK54ELKlICXY3GPHv%2BnAH0IX%2B6%2BifwY8L%2FAAkpSuzYLjDe2gqHqFgjXqOrn0j9VkTR6DjFUbsPj3k8O8XsyTWq9idgIpRZvhpNQDcx8BdgXBl1sdq1qxpZlav2jDCjh%2BfNBjqkAUAREFTIQgwbjNcVJME4HWnMr4YP6GJoUIefhfh%2F9Q0b3l4wBer7Q6zm1dzapmnLqoubk2VfRETmFX%2FpA3pSDy29IHI4dbXfGraGEGN%2BzEo1gdqlR3KPdSF%2FnvtNXwtWcY3Wbm336j0LedQ4F%2BSwOw%2BX7Hqgn58dt0r2xdDV4Q28M0NOYtTy%2FolYUMXks27V5Qccsy3093F0SvCO4E4wM4DhRuj4&X-Amz-Signature=21dbe55266f2d23e6584425d00606543a46f1c57da95ece5d38f04cf120ca08d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

