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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XURQT5G6%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T171252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIQD3YdlI3lQtyB3sot0kyMZerq2foJdZ%2FM81yA4b0WvAuAIgC1EJ5eAL5AEmUShowdrtSOfoIynEQLA0B8B9JvLXdc4q%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDOHNbicRZPzOd7QSHSrcAwZW8guHc7u7tu0CGvuWMSsuNFH9b6imzlC9ER2uyPLB61qyKLinJGAzbmfmPmF5sU39TS5s5%2B4eYTNNtJUs3tLOMT2J4LT2jSJUcRUIgGTsMlk1DNAdwQsiup%2FYlWUS%2FLPbiQCv980raU%2BWWAK9hPTycfFANWHDTu2G1Zfk48Mq5i9mJdcY7Bt086PMHBdEszVUuox0SNGNdJl86UqdYUEe%2FULYTc6TQ7b%2BMP%2FLLHtQktMtBBoAg9JkXRhB4usfjd3FaXDtVnpGG5V6m8SGjw7Rd72NEaBDi52G8rD9C%2FExvZJJhjRKKoO8KOms%2BLPAtyMHgYBChPA7KotCyCnPwSQJM0COqtq0gUmW0sSh%2B%2Bgcz8ucxHmBRw%2FIhMcylNbjKLOuhngobfdzlb%2FEFIg6gqUaLNm2rKaBSCAOqEbiE%2BzBWzrWXayMhFr5zPttWmXEMBVthxvEVuyYq2F56SIdHVfwhmqE2VuzSMXow1I28EeaflDshjMwwDyTS8H5P89N%2FzvVDRYSrI%2BcnOwtVakvsBUjdADWVhILmfw%2BppxIRPOsFE3qFG9ew1MKTJNED%2FqFRG4Xk2G8LQ8PZJQfg1SPYA63uR9%2FUR1W9J3S1tWbs3mlomMhL88S2D9I6spTMJn47soGOqUB5QzLBxVUV2%2FaoWU7Ea20d2WhCG9bA2WH2xdN501B7ouuv1Jjf11eHEJ0eAakK3I6ViQXfK55jY6h3du34mFDgWZJU260kbElH243ZFQ%2FbqUNoWDnT0XrStyczYnjTLrr7DcoWsBCDyplljMiLsJp4L%2FjY5WagBjtqvCpwDAgWnMoVGKOmSAqWeMj7gclH%2BXgCxyOyunrWhaP%2BFXgMBiLm%2FGqwMY%2F&X-Amz-Signature=3400b70e18e9605d36e68eed0d26fa08e53d0b524781c61c56c004c45e4aba74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XURQT5G6%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T171252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIQD3YdlI3lQtyB3sot0kyMZerq2foJdZ%2FM81yA4b0WvAuAIgC1EJ5eAL5AEmUShowdrtSOfoIynEQLA0B8B9JvLXdc4q%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDOHNbicRZPzOd7QSHSrcAwZW8guHc7u7tu0CGvuWMSsuNFH9b6imzlC9ER2uyPLB61qyKLinJGAzbmfmPmF5sU39TS5s5%2B4eYTNNtJUs3tLOMT2J4LT2jSJUcRUIgGTsMlk1DNAdwQsiup%2FYlWUS%2FLPbiQCv980raU%2BWWAK9hPTycfFANWHDTu2G1Zfk48Mq5i9mJdcY7Bt086PMHBdEszVUuox0SNGNdJl86UqdYUEe%2FULYTc6TQ7b%2BMP%2FLLHtQktMtBBoAg9JkXRhB4usfjd3FaXDtVnpGG5V6m8SGjw7Rd72NEaBDi52G8rD9C%2FExvZJJhjRKKoO8KOms%2BLPAtyMHgYBChPA7KotCyCnPwSQJM0COqtq0gUmW0sSh%2B%2Bgcz8ucxHmBRw%2FIhMcylNbjKLOuhngobfdzlb%2FEFIg6gqUaLNm2rKaBSCAOqEbiE%2BzBWzrWXayMhFr5zPttWmXEMBVthxvEVuyYq2F56SIdHVfwhmqE2VuzSMXow1I28EeaflDshjMwwDyTS8H5P89N%2FzvVDRYSrI%2BcnOwtVakvsBUjdADWVhILmfw%2BppxIRPOsFE3qFG9ew1MKTJNED%2FqFRG4Xk2G8LQ8PZJQfg1SPYA63uR9%2FUR1W9J3S1tWbs3mlomMhL88S2D9I6spTMJn47soGOqUB5QzLBxVUV2%2FaoWU7Ea20d2WhCG9bA2WH2xdN501B7ouuv1Jjf11eHEJ0eAakK3I6ViQXfK55jY6h3du34mFDgWZJU260kbElH243ZFQ%2FbqUNoWDnT0XrStyczYnjTLrr7DcoWsBCDyplljMiLsJp4L%2FjY5WagBjtqvCpwDAgWnMoVGKOmSAqWeMj7gclH%2BXgCxyOyunrWhaP%2BFXgMBiLm%2FGqwMY%2F&X-Amz-Signature=3400b70e18e9605d36e68eed0d26fa08e53d0b524781c61c56c004c45e4aba74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466253TMBY3%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T171252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIB0mGqxgRoYS2uHOWV%2B10uf0XFaIE4AxUpo0qnLu4K3bAiBQ78gsNz9tg61gFnOYoFuYqFYV58ZMtevjop6TskaWACr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMHUaoL7DPtPrlOyjtKtwD%2BbAiQAvZrrw8tJ%2FPPGbUiVV6%2Fwge4SNFaNHavXor0GsOxXQAiW5LiF0HQgYyXHe1h%2FT5Y12fzWtmBA%2BUZQVDb3bZCjN7%2Bz8rEYhMXOKV1dhyXicqhhbEDiAIR%2FxzZNAqcMZ8qyX3WFy2j0jTDDyNvFmOFVZUoDhdKc3fRxoHviBgtp4ag%2BoCAFdCgXiq9bVZIBBkJw5%2FB95idwxzCbu67PLXvsXItrF2dU10ZSC5yoQGCU7u1rf2Kwb7aoWT8uP7Rx0%2B4y4pXEKbD7VhOrrHl3hKMbuGZ83UGlMpGD6Nuj7fY%2FlZv1001KbOXS2W6bd4GE0BZCDfztv84XG6JFibTTi5WSHeDP4uJNfP9LOcUV9pUFLJOhC4GioGXtW4hmKlkqf4Z82XyAVHV0bh1N7mp4Lvt69AXsHixFd2ph4lE71qEY%2F6tQg38Ak%2FfhzyrH2tJRGE0l5U4YHH12CkIDnMWtJ40C%2BAE6RJusgMuUxAI61A7uaT77xtEjzZVUEETkwnd0glTYGk%2FjYw8kYKJLo15hthukhIdLJqrK9BCTZRfiWH9BqmAIS1g2jztnqukT88y0%2Fpxr33d%2BV3B6D8PRHdntSDt98wtZvwQcIli1dhpsNKydSFCqna85QtME8wsP7uygY6pgHF3E3hF7gpbNsLoVEsT%2FAysZjPlwv4EkU4X%2FZYCWNP9%2BhLZPSkRu28rUdv5XLXxRI6QUD9ProAXwmwCT%2FZ3sITMUT0a4VVuirWtVJj9YaNBhkVOJ8ccHxcCByC%2FaprFqwj%2BQhmd3Ag9IByDeplo9GY9a%2BzLIpyjvU2oU4a6vqx2pd6HTVyxxBWY1sxwJClPwI87ynp41BDVeDosfAm6UQuqryALFYt&X-Amz-Signature=3d94d6955ab546b108a57b157c7c9e16eaaf5f73aeeb9462990393a072b7d7a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFW27N5F%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T171253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIFvHJn76OY0tCJ%2F22YBF5Px%2F0fMXIMOF%2B5%2BsyHg1FBVvAiEAkW3iyTVoxySfD2yAmMfRq%2FleooS8hely8UAaSyKDW2gq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDKeLODK6ItIcWGlRzircA77Ci4YTIv%2B2BTCNynyaEy5nBf%2FemY65r%2BT420iUe72iJSk811VqSxtDP9JJTRUSdUOewgih6bHRP8oMo05pH8gxmGme8SoG8gob7g8%2FIr8Vk9or%2FGgaRNAKlcqgcyflthd5ZQzylUg2PHX%2B6YClNI6WOLMPpcXWH5D8t2fKK0NWuzF5Dcir9HptQ86MYx6plLtJv1jBlp7vm%2FbB4ToxECY79jmIRm%2FYmTztx5CFnL%2FLzs3no5Y5f3fZMmafGekHXTn%2B%2BoFmT1Ggy2V8DDLU3vOxRCqvRNQ3C8MfK7I3sof5Oac9KsVZmwAg%2FsvSwrR%2Fb6%2FueLrio2ddFjB7VGoXlykPcbyMXXiXhK6beZwZZsy6Cbk6kJKs3l0sajRzLhbPq2iQ8F7%2FjzkOkeL1ulwp%2BM0cM%2BaB2hnFbTBopYqHaCXBDSVTfvvRdbv1mdiTByQYpNpMvZXJsVOqsC0wYJ7SoiFY7OVTkXAP8VA2sGicGfAD1PgaSviGEuOz0oTLIE2mmm3XD%2BsPcz1xec42dKnGbLCiFd52o3LZCf0oY0lBJGaDvIypUdx5OFLtffG94x%2BDeFxdr%2BLoWcCAq%2BSSHCIIwBKPyUWm1%2FS5BRRtSUA7ZeeSBB0YPHEYsRfmqYiLMO357soGOqUBVbazz5bmJziIIjCT8AmoyvzKrGOVLIQ%2FAbSLIytbGHKfXgYsNZKtnBmeCL1X5t7yuPyWTFOUSQx3EMkalHbDof3NnfSbQt%2BJOee15Orm8KDeFOZ919Gpk0ZlTa%2FVrP%2B2YxaxpcuD8eIRX%2FTWYmStpzmx4VoK%2FlkeCkzfpjeShFmyc%2BkVXJM%2Ft2BYafoNVTunNEyCSfQgpdHmE%2BgS6Pb5s7hdqGYf&X-Amz-Signature=0d68c5c157a958ba222090cead74bf8e8ed82d8d7605e9be1aa3dc33b5611755&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFW27N5F%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T171253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIFvHJn76OY0tCJ%2F22YBF5Px%2F0fMXIMOF%2B5%2BsyHg1FBVvAiEAkW3iyTVoxySfD2yAmMfRq%2FleooS8hely8UAaSyKDW2gq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDKeLODK6ItIcWGlRzircA77Ci4YTIv%2B2BTCNynyaEy5nBf%2FemY65r%2BT420iUe72iJSk811VqSxtDP9JJTRUSdUOewgih6bHRP8oMo05pH8gxmGme8SoG8gob7g8%2FIr8Vk9or%2FGgaRNAKlcqgcyflthd5ZQzylUg2PHX%2B6YClNI6WOLMPpcXWH5D8t2fKK0NWuzF5Dcir9HptQ86MYx6plLtJv1jBlp7vm%2FbB4ToxECY79jmIRm%2FYmTztx5CFnL%2FLzs3no5Y5f3fZMmafGekHXTn%2B%2BoFmT1Ggy2V8DDLU3vOxRCqvRNQ3C8MfK7I3sof5Oac9KsVZmwAg%2FsvSwrR%2Fb6%2FueLrio2ddFjB7VGoXlykPcbyMXXiXhK6beZwZZsy6Cbk6kJKs3l0sajRzLhbPq2iQ8F7%2FjzkOkeL1ulwp%2BM0cM%2BaB2hnFbTBopYqHaCXBDSVTfvvRdbv1mdiTByQYpNpMvZXJsVOqsC0wYJ7SoiFY7OVTkXAP8VA2sGicGfAD1PgaSviGEuOz0oTLIE2mmm3XD%2BsPcz1xec42dKnGbLCiFd52o3LZCf0oY0lBJGaDvIypUdx5OFLtffG94x%2BDeFxdr%2BLoWcCAq%2BSSHCIIwBKPyUWm1%2FS5BRRtSUA7ZeeSBB0YPHEYsRfmqYiLMO357soGOqUBVbazz5bmJziIIjCT8AmoyvzKrGOVLIQ%2FAbSLIytbGHKfXgYsNZKtnBmeCL1X5t7yuPyWTFOUSQx3EMkalHbDof3NnfSbQt%2BJOee15Orm8KDeFOZ919Gpk0ZlTa%2FVrP%2B2YxaxpcuD8eIRX%2FTWYmStpzmx4VoK%2FlkeCkzfpjeShFmyc%2BkVXJM%2Ft2BYafoNVTunNEyCSfQgpdHmE%2BgS6Pb5s7hdqGYf&X-Amz-Signature=0f90cf95425666e3404f403afee8b8960ac2e57e3ed9577fb59ce0e8803c5cd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZ7C2PR3%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T171253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIEozHcyFUAAdv1X4StHKVotGlMpGixAyFICv1RDwq6ilAiARZMwiY0k8oozyM0Ky40dX1YSg9VEUqRTu4JRbyOQ2UCr%2FAwhHEAAaDDYzNzQyMzE4MzgwNSIMQiU1%2B6sEJWekR4sMKtwDiE7qbQOr8%2FKJP35M%2FS3ENPfPCPxhKYh2FtnewO3JJmZZZ2CLvaQdsL6oprcpSJAevAiKF%2F4siXjW2NokC6fzQ6M6HLLD%2BCd2kQRVM8aTsptBtOcYEElYnJn6f9hBotoV0k%2F7u5D7IM2XF%2BjnrMdkHOJx%2Bvi0%2BuIbwwUnc0QVMzOTyaXCD17sWClaFCjZMLeeZCuq3D7YGyPcQAtuil9Igc2DJkX7AN0NlYZLriLiUiuLOSaDz%2FnV9HJoF3p3q4W8JDXhFZhL1nRrNjLsE6lKvwoB%2Btm%2F7TiNMVodC2G3U%2F3b%2Fxhlwuu8UXbEHF1zP89QtW0oCkLaCLaZp2CUocdMFnprvGUEVQoTBNbpS43jBopFUIEDn4LQWQoWYqeLN%2BgG6fbA207n6JIkZ%2FZV8lTCRmhf5Hv105nghGuxYeHO8OlTUmKOxrFOmvwfMDYSdTb3nzne8WLvCIhAs6h4XWiZfA70RKO4ttWpzqUZi2Y4gLgwN0CCW2M852y75%2BHAUcgoZM6PBM8HlNgMLpHx7yUFE7va17qrbhEUmGvLzE32NDiaPDfPPlQ2U8G%2B0Fa8wK%2FdjCWTtNczg7AwA9whxW2PxFEW69%2BGTbMf518ltj%2BhUplusEFXongWROJcV4ownfnuygY6pgHWHAohkS6RW6PYZov2dpRuXO9PqHUxN6ooxjYMC3RhlFqhRBuTuU2t4BbIuRWIwkBerucU2eHVTcFZXc3viliUBT1NlXV8%2BlOjhF8lVplqO7q3hclDs%2B24DQNxnbsoF0pm1BCUY9kZF4zVQJnXuUPRXPoWR%2BYwZzcBeH5%2BL9a0ZMyKe69jODLQWfBeso6hUnJPYjrrMHuCVECt%2BS8mZkvKCowSq731&X-Amz-Signature=cf6629245637185681aa0e95fd9a8406bf6bd17c673d6db6ca2d908d6e5519f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBG3G46L%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T171253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJIMEYCIQCcOd9YZP7OZIWcAaFWqmEvDJ%2FioeDqp27Stxilj6%2BOrwIhALhMmhFPO2HXWNx26IUhxNOY%2BKO20vdz8SGaIcsV9lLzKv8DCEcQABoMNjM3NDIzMTgzODA1IgzeA%2BB6%2BZJFznBvyDUq3APyCqz9lIUBgkyUoN0SZKEmqsDllNvs3bIzHGY1%2BGhTObiOX4X5XgAZlGCeEpKhCnjK5yuYDXI2tzvc5vlqED4l%2FiIa8yo0xxXa8%2B4IqetuZd19L%2BiIwp8vf1lcz6emuMLE8ujQDS1Uoo5luDrdZYCqh1q9k5JsZk2m4KcFhhOn%2BFoTG%2Bu5Rm%2FS6L610PaOejpzy4KGKTpHYlKbbtoRpOmRF7ke08D7UI29eD40vw%2BJQhIxQ1v3Xlo3X4wkSPc%2B%2BY6HCuFpa8dsYRR9rC8j9RkKvN%2BEl5Nh0UbGQU4w8sArj8bzrfmIedhs9UZh2JxYBl3KHbCWu%2BifJB7CNijRYw7AWJit%2BIG%2BLkhBm8t5TZoKiH9O0prucCAW4S92BtpuEYfJZhpdyChJwNcsiMhfXly0pf4Nk4jclBd2z3gJOJKX6uJ4nANPvGJ%2BCJdqxoQX%2Bx1GBL9KdhKroFRQu3Rz62ZfX8v7OZhcuEXJ4GzCeuMf8PKDWBJReYcx%2BZbu%2B0h0aGbu79y0%2Fiq1jjAANIapTLXz7LsNMVF%2Fsp1XpA0OMqyn6nTDts%2FnCA6Q1ylqsCE0Rr%2BjPf%2BbI6U0dlsXwHD4Uxm48V1oLyq0BHK3PMZX7T1t%2FfBIW%2FcIZ9ASU4S1MDC5%2Be7KBjqkARIUvBLxAQcIIgC8S8vKxaBLxM3lb%2FvtNtrMuQGSO0G2szGr8z1uNQmd4kvHvMMR5nW9aDvh%2FEzWmzNMoQtgt7L0ydtPVftOxEST94CS3eJtgZ9J9xkhGSmShhBjTLrVB9VgCvXQDZlnPbRPXmZV3P0o%2BURCVRFPMMM7T%2B7N6Sh1JAebHEd%2FUWLwIfJlDafwKMrUn%2BM1VLKsnhbgmYP3Vi2YkLtt&X-Amz-Signature=a34594b56b99aea7058d6b9b1a317b5b6ca1cfa06ddb3389ae99af1085e679f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y2Z3UIMB%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T171255Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIQCvomi3dDlCyM5tvE3tgTowhy3lFxdrmV9%2BKYldKalMVgIgQG8V91WuucJbAnj4MRHqvLrR73HBnDcmeIxnvsyLPtcq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDPYOri7nbj1%2FKK5tcSrcAzCajy3OCrdXSJ2fkhrzw1GzvufAF0E%2BUKCYPHjmsHwhRiTBvXG4619t4brZAMPkH%2BTLMxnFZYR%2FcYk4MXVBBQbeUGhVvmiqW3tqlC3ng4eazkw2yLHfVmvOhb8DJ9aYvfJ23OlmjjWrrGZwnbDfwj3tJoFwAB%2BYWBinVErYAsk3oAR4jaITHDJQiZjz7Yal3gizsnfwh52OgWpYPJroVou9HyvsJzsR1pvLAW%2B%2BVbCkxfIgNNSVFnzHa8KrYisSMPX4O4TsqENwPQVTD62o%2BD951yZdnBz2TznZ%2BgdXe6xySAETbNJaB6EaFFiMtM%2FpyMZdOZsGw3zERcJM9L6P1pyZHNWNSrpYVnxI5SsTgcoi%2BsOWnIxrAvo3%2BArVnsJyH9H%2B1Wlibui7emNpBb%2FFR9c0HAkluAHmnFTKGJpTRNqQxqO2Cm78AWowK9z6IAWQDg5SxN%2FcZlQdgGwvVKgpyoklvgRSHZWwSl004IPrXrXpAlHWrp0nVqO3SS7NUwWNNti2mEJWvtvhjG8l4ZbJWZ7SbduNTqRdeS%2FYVYsJNeL8LQZ7je0mGDCqfgRzuENgRaCdiJEXvUG0yGW6XyCmT0vJXhu0%2B%2FBGUXfHUvyeKoIszjmd2z%2BXIAzR%2FSNAMOX37soGOqUB8MgYg3x%2F7Jsmh%2BlRn7nMzCLUT2po3dFLxrwCBdyvT58f4vp08URVdBcvp8P2b6FyJGhNHCUYTxRyHH1sexRxx2%2BIw3iQG0Eyu8%2Bu%2ByXZLUFHjDmPFZN%2FXhvUlweM%2FD75JD%2BsK1h0A88Tgcl7PzZUYTXRWFwS4SzGn6egfralNvxjf5y2xrjSDLd7Mr6sH%2BY9JvTowPp%2BcWbp71FtyJWuxEuWEejN&X-Amz-Signature=13f0610b15e299aae3121335f5ba8da5afa12eb848f2fd046387c6eb69e2caf2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVVWUT7F%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T171259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCICCAg3ClguvY5Y1czjyi%2F0txubhtCS5Gh9gATFUiP973AiEAgdOEnnUWNDJr7nxIZ3UvtWuUfE4447%2FUadi3fypQxV0q%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDPAQNRHcnBUbmOnjRyrcA%2FQVTWeu5Il%2F1DioYI5h3baHt2iY2lz85Gmzcnnx6sV9gMGCFGPwnuKzY4D8utlHPUsxpBICI4DGtSX8VIXSfyiVPBD%2BE26N15DfFL%2BQoQ5OIfUog8P4DsSdiBifaM3KbQSt3hYZTpp%2FmgyGyEVUvfq2wF8BJ%2B5PLFpy1vlwwWbBLOlHS8Jr2TRVcS6VwBiW7iq1PJGZR14Qfz8QOubTJcvdOo2mzOAqM5byinM%2Fu0ZCpf55sIKcnXXWQGtCQ2b3%2FgrHdR8o%2BRRp1AojJUkM7gzD3yhVIdmzg2hE1vYCvhul2tOGy0H8UM%2B1INwQ331lrGxWKt9zmihMh99z90sXnu%2BYlqqrTPkfM6SH%2BbBgtG%2F0Ill8CPO3vI%2FoOextQs9amEpFDwJj8bMNv0fMYqz0lM92lDSd%2BFdK6X2JQ%2B86ZAjrLc%2BHFZZ%2FwwMqTBaVUV6%2FOVf314m7gOD359jQyMyE1tcsOzdyPyvILSTeLgF6ReZ8Wym%2F6u%2BCZkTbb2eyMxqophmgKbbPdv%2Bcf3tlBY%2FeISjVg62QHXRQO%2F%2Bl98Jojd7FylXTw2maDsjAyqODTfZ0pHLwKBVOKl2u%2FrDoUN1BYdgMC4Kezt9xKpc4CUY1feTm8JVTgafEOLzv6EpNMKP67soGOqUBKEzdETONyWw6IRMNUOqkZHxrqjmaHb4CtPd9KrE3yU8479clbc59m41OH4B7LU2bShzsnvWPTiL67ZmHiqgapfgQbadsaiQyvlB%2BAT8bDMzgODZZOvQBS7p%2B4Hww4DpqWAOcK4f2ReDvA3a%2Fo%2Bq%2BB3MqcK2YqmmmO%2F9H6avHzlgFdmJMWRLQBRlZ1EItc5NbY8sqHLb1yASg0%2Baj6JCbhJSmgwqd&X-Amz-Signature=a36470dece574f11287cd07c1d5643942b7a2ee3f8d29d9e9c6a8c14af92b21d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVVWUT7F%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T171259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCICCAg3ClguvY5Y1czjyi%2F0txubhtCS5Gh9gATFUiP973AiEAgdOEnnUWNDJr7nxIZ3UvtWuUfE4447%2FUadi3fypQxV0q%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDPAQNRHcnBUbmOnjRyrcA%2FQVTWeu5Il%2F1DioYI5h3baHt2iY2lz85Gmzcnnx6sV9gMGCFGPwnuKzY4D8utlHPUsxpBICI4DGtSX8VIXSfyiVPBD%2BE26N15DfFL%2BQoQ5OIfUog8P4DsSdiBifaM3KbQSt3hYZTpp%2FmgyGyEVUvfq2wF8BJ%2B5PLFpy1vlwwWbBLOlHS8Jr2TRVcS6VwBiW7iq1PJGZR14Qfz8QOubTJcvdOo2mzOAqM5byinM%2Fu0ZCpf55sIKcnXXWQGtCQ2b3%2FgrHdR8o%2BRRp1AojJUkM7gzD3yhVIdmzg2hE1vYCvhul2tOGy0H8UM%2B1INwQ331lrGxWKt9zmihMh99z90sXnu%2BYlqqrTPkfM6SH%2BbBgtG%2F0Ill8CPO3vI%2FoOextQs9amEpFDwJj8bMNv0fMYqz0lM92lDSd%2BFdK6X2JQ%2B86ZAjrLc%2BHFZZ%2FwwMqTBaVUV6%2FOVf314m7gOD359jQyMyE1tcsOzdyPyvILSTeLgF6ReZ8Wym%2F6u%2BCZkTbb2eyMxqophmgKbbPdv%2Bcf3tlBY%2FeISjVg62QHXRQO%2F%2Bl98Jojd7FylXTw2maDsjAyqODTfZ0pHLwKBVOKl2u%2FrDoUN1BYdgMC4Kezt9xKpc4CUY1feTm8JVTgafEOLzv6EpNMKP67soGOqUBKEzdETONyWw6IRMNUOqkZHxrqjmaHb4CtPd9KrE3yU8479clbc59m41OH4B7LU2bShzsnvWPTiL67ZmHiqgapfgQbadsaiQyvlB%2BAT8bDMzgODZZOvQBS7p%2B4Hww4DpqWAOcK4f2ReDvA3a%2Fo%2Bq%2BB3MqcK2YqmmmO%2F9H6avHzlgFdmJMWRLQBRlZ1EItc5NbY8sqHLb1yASg0%2Baj6JCbhJSmgwqd&X-Amz-Signature=cf054a06c90ed4b9d81b87ad9ee00be7404aa63627c39bd2d6ff5e9f8c1f4f7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VBXBMWT%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T171247Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJGMEQCIC1cClGpqz3VjgluqyYz1SGCRyRvtzRJsugo5rg91srgAiAbiYFFyXOrqgQLlbiYPmrveaW1OSVnxjwI4WeH4Lu1uCr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMvzEYzcuGeApBx2HuKtwDqFqIX0zxf5O482yLmy8zrYZn1LqNUy7xHttLxXyoDbpja2nIhgMG7qQsKq1OI3UC4tna99y3jtMw%2FGZ33Cd4ejuCBYZ2rKIDKWV1W69BKUY4FZnH4npKoYG0rXCRoSrrL54oC4V3N4t%2FDsp8Rr%2BI5R%2Bl4AJ5HW7rfxOWXX3NLGDgjUr7yJTpmuxDsA9fr9aN3%2BA6f%2FYe7h2gfZaKxd00b2YMtsaUCM%2FVLfz%2BIKQChSOLzS3Evt4FcusDR52vfzgYPKraAJ4MzTplIFsjSzoUPspaypC3PxqiZpZqXiMkTZxE5%2Brpy3E4IMp1iyNkTH74TU%2BkONf1qJ7sOrsbLw%2Bq4AIuJ6GSZnxHkUiW9eAHc3JfWQRMvEHTKj%2FXKV3sv2oxs31%2BtJ97H6ZPyijeo3qh1%2BK2%2B%2FPdcI2hgLDxc7JuUKKbLHsO7FlrEQ3VrOXCGkMM%2F5m%2BXvS4%2BLmPavL5F6GZmaHNsjQjrOT0SCPFxuS95ECGsLCe6jhH7k7vd0otXV2m0mpkJ40eQe6WqIOc85YCPv2djVuFzKtPzGYhXXrBrYOGD2P1yxsXcFNZbr0UOeE2LMabnk0oyXlvFD3A8FAEw%2FeHEKHeh7zeNXBClK5XAMHPl36LUPifrBcFLl0w0%2FjuygY6pgETnQG1aTL1o8E11N4aPyhMZYj38xFhCqMnDtP6BiHljY%2FPQGAVeSq%2BzXMmCFsAVaK%2B6tqdfzEZZhMbw9gX6gyJPnSKVeiZ8shCA0Bu7kbvHcIisXcj4OjDclmkTxAQxDgRNv3ThU6tAjxiAlKKxiQos8ZOmKFNZG%2B0xxlFp0xDaUouVaRE5w5d7lJ%2FlXw2ZRJE928p11KgQ8cW7nKNMyPMDcDK2q97&X-Amz-Signature=f467be44190f4553d2c3f3d3121a951eb6d886dae8a134483f4e4e04b455bbfa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKEKO4GA%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T171301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIQCAX%2BCQbYIeLqzdX%2BlcJEqOl9yPpgAMBRQQRMBoGZIabAIgPsAOWPPunBgfQk2THtC3z4empbQRF0uDVpZ8ebhEVnAq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDMCRueNrBiGdcYbVWircA5OjPVDpkvaLCqkEalRqUReSgehFaxnvZzxW8gPbqO2xRUnE%2FPWGVQwXAmdsKQ8CU7NfGnPwaRD7pIN7yHJA%2Ft2GBu9DgJaUuHf%2BYZ%2BpkxGpdUQhEDjs%2F5YmuTF2TM56qKKIBzmnh8AJESt66OEb1YjKdKJvf10AZEuG4boQ7I7s8h8wSDfWUMkWKaV1ZCgV%2BDhwuKC26HuXqypV41cKR8W3ufSHWYyHJ61mzNg1ZlaPvhDfSNFFa%2FM5lOjnHu1uz6mNSkB9HuJN9DITGImlNy8MVbKToxZnrb6sw5%2B60XrMm%2BRpytd8UYvGowCEETAIsuvqs5plDWRPSCjJ4sp3n2AiiCU1vUWzYdFUeAUcOdEP%2BoVm5mnJrpyo%2Fs3qQWY5T2IH961L2QFM8do4ayMlWIksbm1WK1%2F5bzcZg1qHyJgrIplMaJ72K4CfiUn9Ny08Knjo0f8LqV7uye%2BMU8hmsyuITe%2F2BRy6QiCDR%2Bm8piwI6LraEhGGBfeJfIKQKQ%2FltwUTuaZW4GfiS7R7f%2FMyE5MRLe6h4jWPIerKMKgy6l%2Bb6TARpaEYfjyNTRsy0frMcVNVpQi0p15kixsZcP%2Fg3pt%2FFAbM77WM6UbLUHC02VV8KuVC4IXF3RLw8UxOMLb57soGOqUB32zSKb2laInF59jCR5K%2BGzro29hratk76KYZgkPUokAnNGhnJgzJ2WZ9c6QzGuiAeI2bdrWU9b5oMQIZARraL1OPML9PqghsVOiL5cz%2FAlyOJ4TVA8IrBq8NKqOen7YgYNc9z50LD%2F7Gc6cou6B%2F7oF17pqVSbdpYIQlWsXHNayQ%2FCTMnfrmhW5rn5qHnYCpucN80C7AtOoDcgKIdZglzwRgN0V2&X-Amz-Signature=bdfe8a12edb33a85fb2424b38d51f62f8323193974d902bdc36a9fac157b1719&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKEKO4GA%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T171301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIQCAX%2BCQbYIeLqzdX%2BlcJEqOl9yPpgAMBRQQRMBoGZIabAIgPsAOWPPunBgfQk2THtC3z4empbQRF0uDVpZ8ebhEVnAq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDMCRueNrBiGdcYbVWircA5OjPVDpkvaLCqkEalRqUReSgehFaxnvZzxW8gPbqO2xRUnE%2FPWGVQwXAmdsKQ8CU7NfGnPwaRD7pIN7yHJA%2Ft2GBu9DgJaUuHf%2BYZ%2BpkxGpdUQhEDjs%2F5YmuTF2TM56qKKIBzmnh8AJESt66OEb1YjKdKJvf10AZEuG4boQ7I7s8h8wSDfWUMkWKaV1ZCgV%2BDhwuKC26HuXqypV41cKR8W3ufSHWYyHJ61mzNg1ZlaPvhDfSNFFa%2FM5lOjnHu1uz6mNSkB9HuJN9DITGImlNy8MVbKToxZnrb6sw5%2B60XrMm%2BRpytd8UYvGowCEETAIsuvqs5plDWRPSCjJ4sp3n2AiiCU1vUWzYdFUeAUcOdEP%2BoVm5mnJrpyo%2Fs3qQWY5T2IH961L2QFM8do4ayMlWIksbm1WK1%2F5bzcZg1qHyJgrIplMaJ72K4CfiUn9Ny08Knjo0f8LqV7uye%2BMU8hmsyuITe%2F2BRy6QiCDR%2Bm8piwI6LraEhGGBfeJfIKQKQ%2FltwUTuaZW4GfiS7R7f%2FMyE5MRLe6h4jWPIerKMKgy6l%2Bb6TARpaEYfjyNTRsy0frMcVNVpQi0p15kixsZcP%2Fg3pt%2FFAbM77WM6UbLUHC02VV8KuVC4IXF3RLw8UxOMLb57soGOqUB32zSKb2laInF59jCR5K%2BGzro29hratk76KYZgkPUokAnNGhnJgzJ2WZ9c6QzGuiAeI2bdrWU9b5oMQIZARraL1OPML9PqghsVOiL5cz%2FAlyOJ4TVA8IrBq8NKqOen7YgYNc9z50LD%2F7Gc6cou6B%2F7oF17pqVSbdpYIQlWsXHNayQ%2FCTMnfrmhW5rn5qHnYCpucN80C7AtOoDcgKIdZglzwRgN0V2&X-Amz-Signature=bdfe8a12edb33a85fb2424b38d51f62f8323193974d902bdc36a9fac157b1719&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7AAWSZX%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T171304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH4aCXVzLXdlc3QtMiJHMEUCIB7MZBbtBOd92a7uqmUjkwktjXu%2BS3zLXwAaPsiCabQ5AiEA0jyXmX8Ojn5oag01j5pyRyPYQVaFevWWbmBHhwg8smwq%2FwMIRxAAGgw2Mzc0MjMxODM4MDUiDGCV5hNV8Zm8Tbn4cSrcA7fNLtauXjgp%2Ftcgf%2F%2BB2e%2F%2FcXh0IOy3ZzZHNzfBeB89ZgI0HM0LOjiIvKBfQGJZF3RVlEaRXe%2FxEOmkkYZXaKUzxYdduAz5A0A6ZsAQ3h8abFyXuxwzUD0v9zVjxb%2BUBpwU2wWMF7qgmRdMLZ8jzjEpaRf1RyeQtYhve1RtTwquxSu2JsduAt0KtVsYqweLat67fca6OW91NokJF3a%2BMW1S51prQQTMMwPau08BWp0Y0Z7CBXr8Wg%2Bs6Osd4TKqpC0e9w58sd7Ckv68pMBd4KfThCV%2Fy%2Bw1QLLZFTAxXrHgNlHY5o3RGfk9KNKSaA7fesBtm%2F5sAu3XaULQYwhO8BmgPhDO9XLW9%2BoFRm9eRsXbCAWtWiDLeVS6CKdP4HxGQAbY5e04ZqCqMayk6fbrNNkfxbae0kQAlJ5jvgG%2FG9etHIMxRv7JX5vuCVoNpF%2Fnq5ndZ74%2BGDRbC8cvT%2FN4iqNA4vHJz58K%2BfnopE0objwm7wUgyJVX3HaE0zEOstax%2B8c2lPyiJwW9S1CM3GQv3gg%2FnngJVD%2FPgo29XvGjkz372SaS26Xany5NWaqQZA9LjqpMD29CyTJSrOoswRS1Sn%2F5NcYr1%2FNx8rz3A%2BWaEeOjdKiI5WhURYHv1cUqMJL57soGOqUBh3DQzV2H6ip7gngu9Z9LEKqGmebDN2lBguQp1ZzkkAlbNOICo5W9K3tEu%2BeoumaODDdLSXw2RcYHtmzvY3aJ7uqoNtNwhj80Duvn2a3gm%2Fh8GATXTqzaHdB1GtT53y0FDcF%2FkhoTCqFchZHJzMqQqm%2BKArwO%2B5dcC4oNeP7kZ%2B5jdJ%2BF%2FQRTlQDcfnP38o1owC5TdGPr7T%2BHhVpW%2Bo68f35ZYKma&X-Amz-Signature=7872c407c0fd245bef8a31f166dc858394a899a0b1a34996d68b649cda3b960d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

