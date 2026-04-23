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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAYELOW6%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T184915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2FmcyuPP8wNX8C0jxpRU1xW8V99Yj6RFPlIwtLUQ3dCQIhALH%2FVw8MCV4cio2j4bxKi7IxLQT8w5zDBf9sfbscu9eJKv8DCGwQABoMNjM3NDIzMTgzODA1IgyjDyPTHsjIC2HKQA8q3AMy2ghGc%2BFrSXTdRT5mNKoXkxN81wf8fvfEqY9%2BqAJKLFoxbNQ93Q2UE2gWFw6GCbWjYI7W6X9VpnTHa8b%2FtmoVPxXyLlbug%2BTHn4lxuIKdMcdNHGSXkByMtb8r8Id3I52FkQIR82oID56V3%2Fk9iWicyjCuaWmj9X6ySmRQ91st%2F3x1V3scwXza%2Fjkgamofex66BnoWqKnXZULG15JmzR2X0AiEzYoo%2Bctacpbd9T3iZVtnIu3qfdwYFUKUQkg91u4YqF14fb8E7nOq3lKjZk55aI2oCLgOlJ%2FzvcA5BCO2zuY2q1r8%2FLhvev9xYmi1eS4E0eTFs%2FAOxnSz3T1AV0mULZJjFFoSQ27HLP%2FHQnR1EWAELPAh2EaNL%2F9n4CiuoIlGixwwGtAn4NLsEe79HUzm9nL3SanO8k5ldWyQNSFWJznv%2BFbPo4hTpXkboUYvM%2Fxj83TZhiPyoOYXs9yMLfNkbpdA0L1FFBC9smn%2F%2BWt2Hp6jQaCJFFhA5U%2F3ktzfMj0rNHc%2FFXKqor%2BKFhf2FUHx6XP%2FXMGx3PSW5%2F7t8Hm60GRc1TS6jsT20tLDDp1SkK41YvctrkX4ca0S2PvPGf4Chb7Nlg0V0x6MxkMi726dFvDzadPnEJ8ujZ61ijC30anPBjqkAUtBZ813i9k3MwSiujMWzQg%2Fwe5Nl9Wwn%2BY27FOnUv8KfjJ%2BhZsQ0wllR3toCvXBa7yKQFAZIsBtWDys%2FBOC5WX92LNo%2BSarmo6G2uUlfyFRnhVLDHsk%2BjsPBKEcGncWEW1wkclbB1lPWJyof%2FzCF2c771t%2Bz%2BgTAJxa7H%2FYgscLt80oFxw7bz8h0coCIcqs8vejXBmQ0yO%2FkkashdX9yaejOQjV&X-Amz-Signature=b9bd990078f0b101f549f5cbc182cb176506fd1522a8555d1830c444407f1d8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAYELOW6%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T184915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD%2FmcyuPP8wNX8C0jxpRU1xW8V99Yj6RFPlIwtLUQ3dCQIhALH%2FVw8MCV4cio2j4bxKi7IxLQT8w5zDBf9sfbscu9eJKv8DCGwQABoMNjM3NDIzMTgzODA1IgyjDyPTHsjIC2HKQA8q3AMy2ghGc%2BFrSXTdRT5mNKoXkxN81wf8fvfEqY9%2BqAJKLFoxbNQ93Q2UE2gWFw6GCbWjYI7W6X9VpnTHa8b%2FtmoVPxXyLlbug%2BTHn4lxuIKdMcdNHGSXkByMtb8r8Id3I52FkQIR82oID56V3%2Fk9iWicyjCuaWmj9X6ySmRQ91st%2F3x1V3scwXza%2Fjkgamofex66BnoWqKnXZULG15JmzR2X0AiEzYoo%2Bctacpbd9T3iZVtnIu3qfdwYFUKUQkg91u4YqF14fb8E7nOq3lKjZk55aI2oCLgOlJ%2FzvcA5BCO2zuY2q1r8%2FLhvev9xYmi1eS4E0eTFs%2FAOxnSz3T1AV0mULZJjFFoSQ27HLP%2FHQnR1EWAELPAh2EaNL%2F9n4CiuoIlGixwwGtAn4NLsEe79HUzm9nL3SanO8k5ldWyQNSFWJznv%2BFbPo4hTpXkboUYvM%2Fxj83TZhiPyoOYXs9yMLfNkbpdA0L1FFBC9smn%2F%2BWt2Hp6jQaCJFFhA5U%2F3ktzfMj0rNHc%2FFXKqor%2BKFhf2FUHx6XP%2FXMGx3PSW5%2F7t8Hm60GRc1TS6jsT20tLDDp1SkK41YvctrkX4ca0S2PvPGf4Chb7Nlg0V0x6MxkMi726dFvDzadPnEJ8ujZ61ijC30anPBjqkAUtBZ813i9k3MwSiujMWzQg%2Fwe5Nl9Wwn%2BY27FOnUv8KfjJ%2BhZsQ0wllR3toCvXBa7yKQFAZIsBtWDys%2FBOC5WX92LNo%2BSarmo6G2uUlfyFRnhVLDHsk%2BjsPBKEcGncWEW1wkclbB1lPWJyof%2FzCF2c771t%2Bz%2BgTAJxa7H%2FYgscLt80oFxw7bz8h0coCIcqs8vejXBmQ0yO%2FkkashdX9yaejOQjV&X-Amz-Signature=b9bd990078f0b101f549f5cbc182cb176506fd1522a8555d1830c444407f1d8c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VMGTEP3%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T184915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEQyt3UrsR0yfS0XjTim8c9hAuFCJgbKOyE1D3s6s3%2BDAiEA0nU6HDXWoXHbrlGkJHPwX6MNZGUcR8Ztxuq3AJfd%2Fukq%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDPIGjFHrefL0gI4htSrcA5FwVVM9xe80Y5tof4HRh%2BEIP%2B2Mrg%2FZ%2BcVfKK2VUKSwpUuVFk6VEklezMeQTIIC0F8pkGo1mlsfHYAztKzIZZ7qToqp03wr%2BoQsh%2BhDf1EqM6MVj9h7PVtLlYoU%2BdKW2GO8gZ3g4rZwOAx6nHnaGzgDEMw93OwJXT4u8WQM%2FiX6lfVDwpdiFacyGLY69mswkUwRKJOlZrxxuuv3PAZZnmYUMfAsdQxb91y%2B2Ju1vTemamh5eVACjLJ4FJBUM2GWke5sFh4iEdWXtgblWVIfFubLqwqBSSlFMfQ2Tq9qhXQ3%2FsWMulLUdnmN2WM7NNCkMnn2Rja5XuaXIYxIz%2Fo5yIvAObLiOm1w3fvQzS3HSrwRoHMRW7ATR25QMEhTQk2s60Nq2TvbWrHfBpqfP6SelFzDN09EnnDvnPc1BlYSNiHZcMmNju3%2BTO2SsqRbHaI2sCQ2W9KOWDkoW4DiUBzmtuOTSPcQlbNxFXlZ9R2ghAJ0OQ9aCqpCp0uCg29qANIasCStwYuSaxM07HulYAyar%2BTBEayekc7QID6HC1zm6qWAcjobcIEObSUIv4HBD%2BNcCt8zwyX9INm7xJEMFbprD%2B%2FuF1hBajiNS6uVL4f8TxWbR8TShGLgeBWOq7bFMOzJqc8GOqUBFvZsd4VEPGDWSC%2BPTgzSP8BU%2BJ8HhHr7zkH9i%2F5irCZL40RNs2OGslZ0%2BBm3mi4H%2FU4CyirLD%2BeusRiSuZB5TbTtizY2g3oWjq4eZdKc4do%2BqJlBOjZn6cLZ8gkmbBnxyBnYebgXGuDgR2yTo8yo97ncfefLdRka2RL2D5pDZ3Y0RNTouLvKz4QSaqpdsLrgcybx3zkDLXaz%2BjVo9Fqv7xhO%2Fsir&X-Amz-Signature=a95bcba998ff628c0d6e81ef08708032dad8533997e41eb2bd07be05e151d333&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSJDJHPK%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T184917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCzhqmbQNEjzoRP%2B0ybnMqht3YP6VTs2BsrfF0JDevPWAIhAJJfSo8OP6wsVPrHDNEpiNBP2Yzbzdwx7xyolZdN6Oh1Kv8DCGwQABoMNjM3NDIzMTgzODA1IgydmbJG%2FQ%2FQd244Rucq3AMzEiYkbCbbC8KeLt7yHPHHn5ygktLhmMbIqT1qF5GIgIIkP5RQvAPQKmwBlr%2FvAdOI2vMYyK17ddVO5RyIC7JG6DvFRebtk7seoLZtwCaI2rln7N2GWXwqOrcFXWAsu4gJTy%2B1VxwmvLECgEyQqkov7lCEh%2BI0yNK7YB657rStONP1aX%2FNmxcT0UgajGHJ256e1qXGv71TG9Lq8oJ2QFXqbtcQepxiMhKqrijLIkfcsgeqJqr8z3RLAcAP4MVKUsytoCMWuBK9%2FDMbEcSKR6C9mtNOaTRkLYbKeGStk8QYCn4jzvarD7%2BkAMKUA588kLCUFFkCv6umvf7M%2FP0F1HqmZke2gZ3T3OcB%2BFmHuKG4ADKDR7287qGKm5TayFAX2rsXhAGxVgW8tWlD6%2BD7iguxZvMvNI3aVc1xtxXMFXtvrGwcVzkICMJBDGxK%2ByuJjiCPV3D9l2p0iS%2Fl7RUZS8kHm8cYCRv3ASUJ%2Bu6HcKEPyeL5%2BttQC54tdiICNEgrYw1Px3Mw5B%2F7H0sQV%2FWLyvhyA1w3GfM0%2BEGy8AHNJYCiNxVvYl8b8HQJQ2U53KdqCJgZesdDLiM8b9kR2zcjYWR6PAYgmGazbEttak0DcPDr9CcdsEtIEfkEK9XY4TDoy6nPBjqkAVa5Djt4S4z9VZ7hUqOi8MVVhutAjh41G27vT%2FikxG6PUjPNZATO0cZhLRBdOnqYDFeK2c1cG8uJ8MAOWvsBxHGihmVRbaY2uu50gbv4N4KqcMlNKmRcxcnd7AuV6oOLFLp2i3zb3jIM81CYc3y8o7%2FDwobUgi2cnSpoDU3mfp54ADRCbes3DgIs2rr0RgGw7aJyuQTxbE2Oc0g8CuPOByQFTt2o&X-Amz-Signature=023a9552b2876406dbb80104874c862214e3a3871a05b9fc5efe52a0973cc257&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSJDJHPK%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T184917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCzhqmbQNEjzoRP%2B0ybnMqht3YP6VTs2BsrfF0JDevPWAIhAJJfSo8OP6wsVPrHDNEpiNBP2Yzbzdwx7xyolZdN6Oh1Kv8DCGwQABoMNjM3NDIzMTgzODA1IgydmbJG%2FQ%2FQd244Rucq3AMzEiYkbCbbC8KeLt7yHPHHn5ygktLhmMbIqT1qF5GIgIIkP5RQvAPQKmwBlr%2FvAdOI2vMYyK17ddVO5RyIC7JG6DvFRebtk7seoLZtwCaI2rln7N2GWXwqOrcFXWAsu4gJTy%2B1VxwmvLECgEyQqkov7lCEh%2BI0yNK7YB657rStONP1aX%2FNmxcT0UgajGHJ256e1qXGv71TG9Lq8oJ2QFXqbtcQepxiMhKqrijLIkfcsgeqJqr8z3RLAcAP4MVKUsytoCMWuBK9%2FDMbEcSKR6C9mtNOaTRkLYbKeGStk8QYCn4jzvarD7%2BkAMKUA588kLCUFFkCv6umvf7M%2FP0F1HqmZke2gZ3T3OcB%2BFmHuKG4ADKDR7287qGKm5TayFAX2rsXhAGxVgW8tWlD6%2BD7iguxZvMvNI3aVc1xtxXMFXtvrGwcVzkICMJBDGxK%2ByuJjiCPV3D9l2p0iS%2Fl7RUZS8kHm8cYCRv3ASUJ%2Bu6HcKEPyeL5%2BttQC54tdiICNEgrYw1Px3Mw5B%2F7H0sQV%2FWLyvhyA1w3GfM0%2BEGy8AHNJYCiNxVvYl8b8HQJQ2U53KdqCJgZesdDLiM8b9kR2zcjYWR6PAYgmGazbEttak0DcPDr9CcdsEtIEfkEK9XY4TDoy6nPBjqkAVa5Djt4S4z9VZ7hUqOi8MVVhutAjh41G27vT%2FikxG6PUjPNZATO0cZhLRBdOnqYDFeK2c1cG8uJ8MAOWvsBxHGihmVRbaY2uu50gbv4N4KqcMlNKmRcxcnd7AuV6oOLFLp2i3zb3jIM81CYc3y8o7%2FDwobUgi2cnSpoDU3mfp54ADRCbes3DgIs2rr0RgGw7aJyuQTxbE2Oc0g8CuPOByQFTt2o&X-Amz-Signature=a2137273f9420bb11506ff32f1545cdff59b28a44db1c4de4c9f9caff36bd41f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UJKHEHT%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T184917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoyYLRMp%2BE8kI6McestZx%2FxGDgbs6WHEi6VhDmSStxaQIgdXmbU9v6eodwVV6ZSXcO4s7MqdGS59EDr3E0Yi5m%2F%2Fsq%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDFoDnl1NNnxxcp4zeircA4jNKeLqp588BJ7XvDFY5nVKqT3sP46WNH7tOsW3gMbqq6vkzV%2FmELVpgPLmskKSXbqin3Zpb7e8mluL8LwzLvxqAD2FtOv%2BG395OJ41y7OC%2FyB%2B%2BFyY1SubhZZWXpAB%2B9CBnP5UsLIqCsa13WPT3Q15CjmGpS2mXEkgctqQF5iBGo4ZMynF%2BWKE0vnHx01MrP8iMg4JowJPOy9EJRZmsahCyEygt3ynX3hL3MXOw9NA8J%2FJXdtVjihBh82B6HaBiEPs9I26l0exIf4mkj5huJKKstu%2B8bn4HnmXZjk6P7dAzHF%2B5qpsLb4EkPtebF5EzxxAMEztCKCR3xLIlWUdMRCIm7pUYl9Z95d9k%2BD5D9pyypGVA33Gv4SssHNn583wd02yAzSKB%2BQ%2FoCvJe4xbJnBPkQWcQzv9SFuJLEZKClQAAH01%2FrCVz%2BUpNSq2De46Uu2iSfPFqg9gIGuJylly37k5CMIs9eREt5dBfczN2R3pBgETF22VAyxNHACv2M94aCoPi5%2B5MmztawFcnIC66djFm3la7hdCtgaKC8UfpPBa9R%2BG2xwND2h%2BEvJv%2FgT7DfaQBN00JJCvgUAj6iik9qLoZBoJa2COQYB4NOP%2BHXSL7wEyW4ddqhHWCN2aMMbKqc8GOqUB%2FjLK6V4fqgbiFoVmuos31LsF2OI2KMmdLI5ZQHLevv70ZPERheXc6vDDHJEokCCcJW1cPXz%2Fz82PlLcarRI035HStxAIsYb3fD7xWyUGnImnWWdkJWOeKQJVfkAvvGPNx03xdmXh9MbnQy6EnZSenMiHChq64rIbu4J5zNjEIH38VUtl8L5bM2dZ62dRwQDg1F74i7eqEbsWue4chie7NMFejV3Q&X-Amz-Signature=68316f03df18acf2bc449832690cce6283af6a12ad3cbeae501f2af354f869c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662N6Y5H7S%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T184917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCcwGJyMjl7MJXCdiKKLdq4VTxEX%2BD%2FdJ45fDZT1wo%2FOwIgeuZdvQICb1pxu6bkHQkbeUNXyeQ2nglvO%2F%2FJQtqwfY4q%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDOxcd%2BvO%2FcCPeCC4XSrcA2ke6g8jKu21G351Z1JwAiLmtNcnXYZgN7jBnShxEOnYLPftlPKYkcf2Oug%2FfTTbUMHadwkAfYuxFKFjvRJGh47tPxGX8lhJY4KF6BcnqQtn2r3rhaMRACqB%2FaWKaB6t4KTgGosCjvBX%2BxPVhixw0ZXx6ZCVcUVgn99P0J7EF6zGnLiREQMG3UgQVWcmLFnzt3ztcBpdt%2BfAxyQ4EbsfFHi6%2F5HMciNQr4kufu8YZAcjh7IyaWG%2BiQyMgD24CQ83X5%2Banc9UXIFuBTZrQQ9%2BnaeqpB2Qjf5GVoTmCOsXGwUPlvg2LWEJFfpSlOYFTdS4pcG58PMiHmfDS1xOB%2BTCkEkRmrEAfd%2BYfhIzms15JrSUbG%2BVVKndvEIH2zKHqAwBsN4Md%2Fq%2FviD0UDjwjymcIdu%2FnF%2FuqOoimeVLLjNy1FPTwXPijdQAcedt3lvp%2FF%2Fuh5vEHLGWm5YOe9FTyMwCBB%2BJRMXCV0feWgGQ5wDYP1893CdvgForrCuIbyUciNqxCMV7x2xgNYvGE8RZG0iGdEDHb4adPPQG8mLz0peTxOZF7WiiT7Dvvo7nXoYPgc7m5qHYlqhUuMQEzrWt99D5NlrC39BzrlLHQJAsWEAFPaIK6FKXAp36q%2FKQtyROMIzKqc8GOqUBKy%2BnEqiHDu2oPcLUu%2FRyFrrRhuy93id%2Fnyo5exHFRj6xfYB5ixkGrEQwHIFXx6xmJvZPvnTWGwbLig1f%2FgCD5JXCynU5S9VYO32EkH8nu1bLSBHjto6X2RVXwWEEsxa7vEpTVg2npj33HJCxZZzCFOXOK%2B%2Fv%2FKWXbjJITynWMa09WIH%2BG90dwJD76X2cnnB8HP13%2BzsNJZ7zcei78NUKf%2F2nl6%2BH&X-Amz-Signature=e4586027d9b330b8358e0e6109ee30f4456785f104329305c9a5b4d2f5c51155&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2H5AYTQ%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T184917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCWQpAxM6fnp4ZrWCajVO7TCpm8NUqiN%2FEdd6XvDu2q3AIgV5wiES1LtWq0cjW5YImBhhY8iBxYqLcay2lxbeRq7LIq%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDIBPyUvrMGO44HoRgyrcA%2FKRYuGPINNH1iB%2FUoZQQrr%2FZHolyv1ae8uSIzC2D%2BCCAX%2Fil0TP%2BOa9Sx2X4DH5cDjwx%2FkLTTVq1ysQqvWgR2hpj4NaKqiJJtvV6GW8ulNOWzEcdhx7wOrKEPRWgyMEgDKDhfozXI4gz6VTQ3hibCuMhfaRt6jrlJ3kZbZKfY%2BAx7%2BegIYrfLJJBk2D9Y2g3xIReaQb1fweYthXOcj%2Bm%2FnMWSJW88%2FPB8%2BOnOXtWoM87XtwEiY90C1LV3ALG8NMl8yHeDYOxBnPd1eIVb8VxWAxbnerOV38n1JjIsnvgs5vHxGo1TiJI3%2Fz1Hwt%2Ft1eCM5MzdG2RVGKlebA8%2F8xlx%2FDnsr%2B%2FRD8z2sbgGq8Yc2ozQL4dB5nWM4KYozIDDY9RHfg2cfnw%2F7qz0vLmjyMKp4k%2Fke5IFENfjMTdn5vvGi79heYY6dYTqlk%2BhU6j%2F25R7tbj8gFB8%2FtVxKd%2BTpz16SvrNOeCZQMjPtwbR58nKVbznbcGQyzM8IJFbYNyovEFM7EGVUJPI7lw6tgdpQfZ5VwAvcK74uEvTnoB47Q%2BW%2FhzgkU2g5mLA7GGzhK7w%2ByUBIwCmmrQ8O79PujNRTleo%2BleA1sBN1CUxlIvoXXW7AZnV3ijvbtG9U8Yx3BMOrKqc8GOqUBZG8LrdOhF1XJD80vKNjwUdjob67KELvyxmyt4%2F%2BKR3Jq3x%2FNe59vFeqNxeY%2F549mChZYsuxnrdgpMP9YOpSemqy6BIfPrG%2BVJtzsZtb5Jo2n5f4MWoGozUBDdX%2FWp6H6b4yf8CfuhyZJTLKEiKaIqppkC4RTVkKl9trvB8VV8AblxjZ0g7D0z0x09rKrOLlYHi26ATsNmGHVJlfthMTrYhcjfy1X&X-Amz-Signature=9c76b61618979ffa58ae800c74bc40ab4bd02080dd6e9b0fbe3fd844df114701&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GC4QT7F%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T184918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCawNUmPutK0GzyiqtIqawcNDVB4X1SpMD4xClG3soCKwIhAL5qWpA7GtZOReTM24tuzIkffd2TWdLYjVUXVRzODggGKv8DCGwQABoMNjM3NDIzMTgzODA1IgzetYuj%2FzW7Oft9obMq3API7o6h14dukvwR4IkcleHLM6CZNzR1dVRnCDEReEHz07jLoEqZSLt3PVBg0ki1xTYSDyhdfMSqyHiai7o5y38%2BzXk86%2FtkJrcTyUgyQf0lxhf%2BA0fC1ih%2BnH1egEzyB%2FMuh0B%2FGCyVeKf2%2BOz9C4qdbXuRFKNb3mGlO4Y7ODgItca67hStLFkN6A63phZ0wdGGm4rRtg49fokW3JdaiqBEm%2Frb1o7D9qD6iy%2FBFvWCbIffWoqFbImr7tz1gevgaeMUd0pWo3V7Q3ligbl6sLVgHRVBPTbO1zYH8KiL%2BZnOtEkC2WM45OnlypfRfaia%2BbsSyaYGo4HmG1irKO96FQ6oMQywvNcpQH3HbtpRdw1A%2BJmOoNIMdYTTR5s0L7cFAxkjSRd8yTFEqf0L2VxgvU5FyZ9AVjys2KqWyj0K0CjmoubXB05Aj0rprwfyUA7VA0MSYNcL%2F9SbrbdC16lNBPx9mFpB6Ny%2BnSi%2FrQSmeSDxVGSPT7D52lcIcA1QUibMa%2Bl9e5RSsty6YOqCITx0i%2B8fQ84Ikg3JUPWWJ14LweFdbWtlfGdXhAw9HIMH1O7xY4f78MyLynKxD069oINi38Nx9fWE4qU8dOadOPaVkFRPnPsWfwVEOFNCwa1%2BITD%2FyanPBjqkAeuWtb5SpLtopTz9mmi6lj6jo3wnZ5baBELHqNQvXzQe3ncwPRFCMYlTEV2OHlu8W%2B%2FPpBPFND9%2FeeWoBNYfX3lcmm%2FDto3CY67wq3q5OZUqeuR1YR73HKhHw4KW6azTfF00OaRnBf0%2Bore3boyjUA4O3WxbYDW7nPeRs3WP4nXtVjWpj%2BcCuoPykNio%2BbrLbR%2FH8KzxOU0G5uSwmSIWmwq63AE2&X-Amz-Signature=bd5e677c4fe466c380cd816cd8d1e5f184ed98db857df71779206498bb84824d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GC4QT7F%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T184918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCawNUmPutK0GzyiqtIqawcNDVB4X1SpMD4xClG3soCKwIhAL5qWpA7GtZOReTM24tuzIkffd2TWdLYjVUXVRzODggGKv8DCGwQABoMNjM3NDIzMTgzODA1IgzetYuj%2FzW7Oft9obMq3API7o6h14dukvwR4IkcleHLM6CZNzR1dVRnCDEReEHz07jLoEqZSLt3PVBg0ki1xTYSDyhdfMSqyHiai7o5y38%2BzXk86%2FtkJrcTyUgyQf0lxhf%2BA0fC1ih%2BnH1egEzyB%2FMuh0B%2FGCyVeKf2%2BOz9C4qdbXuRFKNb3mGlO4Y7ODgItca67hStLFkN6A63phZ0wdGGm4rRtg49fokW3JdaiqBEm%2Frb1o7D9qD6iy%2FBFvWCbIffWoqFbImr7tz1gevgaeMUd0pWo3V7Q3ligbl6sLVgHRVBPTbO1zYH8KiL%2BZnOtEkC2WM45OnlypfRfaia%2BbsSyaYGo4HmG1irKO96FQ6oMQywvNcpQH3HbtpRdw1A%2BJmOoNIMdYTTR5s0L7cFAxkjSRd8yTFEqf0L2VxgvU5FyZ9AVjys2KqWyj0K0CjmoubXB05Aj0rprwfyUA7VA0MSYNcL%2F9SbrbdC16lNBPx9mFpB6Ny%2BnSi%2FrQSmeSDxVGSPT7D52lcIcA1QUibMa%2Bl9e5RSsty6YOqCITx0i%2B8fQ84Ikg3JUPWWJ14LweFdbWtlfGdXhAw9HIMH1O7xY4f78MyLynKxD069oINi38Nx9fWE4qU8dOadOPaVkFRPnPsWfwVEOFNCwa1%2BITD%2FyanPBjqkAeuWtb5SpLtopTz9mmi6lj6jo3wnZ5baBELHqNQvXzQe3ncwPRFCMYlTEV2OHlu8W%2B%2FPpBPFND9%2FeeWoBNYfX3lcmm%2FDto3CY67wq3q5OZUqeuR1YR73HKhHw4KW6azTfF00OaRnBf0%2Bore3boyjUA4O3WxbYDW7nPeRs3WP4nXtVjWpj%2BcCuoPykNio%2BbrLbR%2FH8KzxOU0G5uSwmSIWmwq63AE2&X-Amz-Signature=905841ff7e864b4a422632150756554dcc44cd83a848c19d1c7591b2c5f07dc2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMSRU6N3%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T184914Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB%2FsUCn%2Fzfw8pQBmlt60jr7F1Fb6tiusJUXHF5UmlzY3AiB8dM1ii73qhW53RFN0uSxfyxEoFVONVHVC1dXRD7fLZCr%2FAwhsEAAaDDYzNzQyMzE4MzgwNSIMywiqwPWcVH20xY8cKtwDd4AjCDwqYwARV1Y1CLLb8GctJXqxF4o%2BPbWrkk%2BnK3NgzauxixbX08ac0qa0A31hyhOJMcHKZtDGk8mTAiIrjoI30I%2BAQRaUPNP%2FvL%2BF5CraZt8lNUf5MRzOEQMsYzlm7lhosZN3Xi2n4lnKdOimH987kjrU6NYAOKNsKFTqYrRXz9V33iHB%2BhnmBTmatdzLWTgZfNMYAPThs%2FfR6QEoWWwLm162PN55zPC1mL3jtcPRnzraYRCDBt%2FWrs6t%2FxBUoFuiPrBSNtu6ChAerBxnqJU%2B%2FFqiiB%2BEx9ZfViDPT6%2BaxU4NdbnnGvtFC4zXlZqf%2B5asiD%2FSzE1dG%2FzlyG%2FvgYP7OzU2BwhHKI6cEbU6ek43FUFETCGfq3ftF88C8ZCkwDJAppcd%2Bj0fT79P%2B3hAmjjKHQYXWc3BpMdpeh%2FcE4dzaN8jKDbwMdCT4zw1jbznd0BzLcm0tUzbG1xtJSPwtKpvGjD3S6u%2FLdtq4PsBtWwCdG4ZwnVlHn9kLOodpzXG3XpbOl2A9Mxm6Xp6zVLN8wujn1xqInVezIe0xaX012XwuUgL53gBvHax%2FBeyaY2d4NqymEeeVaSaXNxhlIitbb%2F8sT9Da%2BWPyDuzg6NXPUHo0ou4DPq7npMmB00wwMypzwY6pgGoE2TJh16MgirFw%2FXmP9WsZN50sEpOv9yArEfw3bW6mQJ9KFeus2aMelEneybkhipjjAfz3M%2Fwlfj%2FPx%2Bsna%2FWAbVp8GobNlgvmgPuvW2W9mATYlfPhP1YxzvFijTuqmuw87k5TrOmPe4JdkJbB%2BkdV5Ti02RsdLHYpGqGSo7BxrhC6IaZhQKBPFkHvua%2FmyjX%2Bvs6Py%2Ff7Z%2FLODIky01WHEt%2BvABL&X-Amz-Signature=27c8e5eb21d4df38435e546579faa3c6f760439c1ff9ebf2bff22c6e123b67ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVLGMJZU%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T184919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGtZZOux9UWeYECqdnOYmJU1Xd2fsQTHnlbwDYOwwP5fAiEA4HbaJjuM1554qcFtgqBwqiNXoeZ5luy%2B%2BQsbfrsF6i0q%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDLfYTqBDdi8rL2WySircA4lsyhOdCbh8XI14vEjHL8cq4bL51S2OrW9DDAcZyLI9Z6IsVCK%2FnlCu9PXXY%2FRDL%2B29Fli%2BvczHrMDEpmjYWiRtaqHEkmlUTsQQ8OLQHleBpo56gazCa6UGyVdczX%2BjC5E%2F00Qk02zQ2GvIBWWS%2FDUB%2FcP5%2BNgjw%2BlLDz88OeX3f95l%2FedVFc61Bmgg6cOfLcCa8SreIfXvM5ngtCllhpb4Yyez7Wl69HVitZuoMnwg5R3Yx4iw8%2FthRDoZP98gehCjYyFLw7d2cRJGBumPM21XGweMxtdx88AL9JJYgPWp6eMY0eSF3X5Sl1xrHf6DKekPPrAhcBD%2BD0VVN%2Bj1fjwRPjKAyMgSnfdTE96CMqm4pouW8dFsdoxCjmQJJh6SqQXqvfIRTNEnkMitXQFx22Kb2c3qf%2BTuuT3vxWo2kW969FXFJezMuHUXqrbmHK%2FsLyzxOTCEoaAMsS64Hjy3LrKQoza%2FUYO5%2BTaxKaXBluzpsz3uacE7qKjmE0q6lr5AdAYlBPgQDHKOBh3V5JYBGmqTUbDo0CqPL33NQz0M0PEcMbz9%2BAoQ4N%2Fvqcxup%2FrAk%2FRLivF0ScgFvzHaPNcuWSplaIgrzOAMdtsGqLswH2ZEnQ3XvIiyKLj2qiZSMOPLqc8GOqUBNN4behky8PuxNMAVJgBgIDrUKdDD5nTpC3ePJNy5nsCzV2L%2Bmn%2FjxFlwDjjwvwX91X3jZEXLCDN01wgCpeh3NY9nXyRcXMBsglyqGusXSAmjz%2BusjCUtAQAWxxXdahi90Pnqa18XT4yPddpa68w%2BK4mVQbNVffe59VSJmI0lourwzR%2FNOOLXez9ADX1ICwXBYa2Rlj2A5RTWsBVEc5K1tormW%2BZ4&X-Amz-Signature=39ac8c2a33f68634f576259c1ecccb0c70d4058b75498596100ca47c194e93e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VVLGMJZU%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T184919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGtZZOux9UWeYECqdnOYmJU1Xd2fsQTHnlbwDYOwwP5fAiEA4HbaJjuM1554qcFtgqBwqiNXoeZ5luy%2B%2BQsbfrsF6i0q%2FwMIbBAAGgw2Mzc0MjMxODM4MDUiDLfYTqBDdi8rL2WySircA4lsyhOdCbh8XI14vEjHL8cq4bL51S2OrW9DDAcZyLI9Z6IsVCK%2FnlCu9PXXY%2FRDL%2B29Fli%2BvczHrMDEpmjYWiRtaqHEkmlUTsQQ8OLQHleBpo56gazCa6UGyVdczX%2BjC5E%2F00Qk02zQ2GvIBWWS%2FDUB%2FcP5%2BNgjw%2BlLDz88OeX3f95l%2FedVFc61Bmgg6cOfLcCa8SreIfXvM5ngtCllhpb4Yyez7Wl69HVitZuoMnwg5R3Yx4iw8%2FthRDoZP98gehCjYyFLw7d2cRJGBumPM21XGweMxtdx88AL9JJYgPWp6eMY0eSF3X5Sl1xrHf6DKekPPrAhcBD%2BD0VVN%2Bj1fjwRPjKAyMgSnfdTE96CMqm4pouW8dFsdoxCjmQJJh6SqQXqvfIRTNEnkMitXQFx22Kb2c3qf%2BTuuT3vxWo2kW969FXFJezMuHUXqrbmHK%2FsLyzxOTCEoaAMsS64Hjy3LrKQoza%2FUYO5%2BTaxKaXBluzpsz3uacE7qKjmE0q6lr5AdAYlBPgQDHKOBh3V5JYBGmqTUbDo0CqPL33NQz0M0PEcMbz9%2BAoQ4N%2Fvqcxup%2FrAk%2FRLivF0ScgFvzHaPNcuWSplaIgrzOAMdtsGqLswH2ZEnQ3XvIiyKLj2qiZSMOPLqc8GOqUBNN4behky8PuxNMAVJgBgIDrUKdDD5nTpC3ePJNy5nsCzV2L%2Bmn%2FjxFlwDjjwvwX91X3jZEXLCDN01wgCpeh3NY9nXyRcXMBsglyqGusXSAmjz%2BusjCUtAQAWxxXdahi90Pnqa18XT4yPddpa68w%2BK4mVQbNVffe59VSJmI0lourwzR%2FNOOLXez9ADX1ICwXBYa2Rlj2A5RTWsBVEc5K1tormW%2BZ4&X-Amz-Signature=39ac8c2a33f68634f576259c1ecccb0c70d4058b75498596100ca47c194e93e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUQFE7CG%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T184919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCcjRSkDDzuKROIUDA410F5vPT0XyO15oSlWa2Bm72AgQIhAIoaRt2joQ76Djzc6%2BqJ2faZYdAd4%2F5P07BIl9gJI8k4Kv8DCGwQABoMNjM3NDIzMTgzODA1IgwIbU9D8ZTtPoLVsZEq3AOzgbQs6h6OWOzxIfsceUcTUTcNC7mrKwI%2FTazZC8p3YGEbAQlNTlovVSi09CU%2FyEapyocgeM4TJMoMfoBwGAjQO1EbC7lcOtpVRW0EerQC0NAw9Y9nmaqY70tNz%2BPKr3DCXaIKQG2%2BY%2BcP4AQwCTt%2BXcZ%2Fn9Do6FCXdXb2TnJ4w%2BqeWLI%2BW1AApCV6qoTNE5vLYtWOYferGMUqMNLutOkAXyoc6qlGlBjXN03WmnpFdtc7JgUEVjS%2FY0OUOeHpLMWd2TfZPILprdyUHKLfd6IbAumSNlWELspzu2xUtQg1BRRJuo92MA6FGEA6EV9S3f32dBM6ds%2FZUbZOEwS%2FW0Oqr8jzFqB%2B5WvzIbUecAuPQrNT1oqWjPX4RsO7Fyv3Y86dB6Wo8q3TPhxYkj5BgWK4LgAdzmZly%2FiZF1k%2FzwyfMqxDn%2FOSmb4ojLd5Q8hTLd9JIwcxuYccadyF2M%2BDnvTwkIIkLY17hxszcE4TC7eUa447kNyIDc%2FVrX6w2t1M%2FjztuiNm%2BNSuXPxzqv5e%2B3nFcOQMgQJxnWnNm%2BmvuJWwHwoZx5mVGUtmhGf1MFRMbXxBHSecv0RpeeKi7%2Fx8DjlFUAD9sXbjZhU1JAjTfYmT7wKCo47l43Y5DHc4zzCQyqnPBjqkAfHmksV1ViyUWP92BscxmK3yos1hP0AOs%2BswacAf6b2BH2BplQFCM4wa7xNPwssFOxcLd3CPxjssmuUhBfDxu8vk3nFR2P%2BCAhXw9eOfw2cY6o%2FSc9P9M5ijfQxtXuLflPkQayzpRL11%2FQV10mgHCGZnDTxah2bgzYyH7pVpUD9eROT8jt5lo%2BuRorwJWFwefseVDvg1V%2F6iWWZBebk84CBeuc5H&X-Amz-Signature=0a7cc8cc77d358c8575b5b44073327dbdf49a9d0950d8270088d4cb9fe7b0de6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

