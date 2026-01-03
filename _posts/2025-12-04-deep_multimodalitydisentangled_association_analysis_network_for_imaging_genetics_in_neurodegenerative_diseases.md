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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AZH2ZID%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T051057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQCSzo7ZXysslq8C0h8ewVbljOwSVcJk7fmT2piCMblHRQIgXCGTjdbB%2Bmq26B9xL9nSWFzOHifvuF9giV5JjqhvQpQq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDMH7bL%2FZD%2FO7T%2F041ircA782KYCSIlh8Puw5LvGV%2B5MLMXhslwYKT5%2F2S465MbqXZ5VAExuSQYX2UsMclG7lYZT7DMj8fSQLL7ZQ4MuIc5bQrVOY5D12vuUxcU23s3vQk3Vsckw%2ByGxVP2c9l8I45mqiArGJaH7Ws0Dzbf48vrqrW%2FzeYh0ChxE8YL%2B7A97q1eGpgKH0B9c6S56uZobDrQw63gulH%2BmzRhDCs%2B3msWwyvaKohxQCZbi6XvDHVDS%2Fp71aeq31ozv97PmVVpyOWfj3Vqd57O6uSoCghlQokzeC6P30iHAeqL4rg%2BaNylaa8LRm4Gv3VudA6xEy41ILfozzai%2FcoueD4jYQ%2Fqepjno4rTNfIdc9nhRIxoTRZAi%2Fi45Ks%2FCt0E%2B%2FH7dPMeYnBRg4n8PwpJJxXFbsqMoNk76DrqaPoly3YI%2B7X16Kkmxxv84TrO46rRTbWdcydxLz%2BFgUCHv72hDF4ccckxigkTXv5FqrSqRNRXgyfMWaSI9H6Qu6bYKqWXIzbs2onvPCRZT%2For%2Fp4MxerpLljr3dammDdxP6R2ia2D0HtgTNPOV0CLCY1Lanz35skHrsDqhD2XWFYJ%2FKwaDqLBh%2B%2FyET1MKkYw9pmgBwLt7Z7HqWN0ABQDvGw1opjFO7HinTMNyn4soGOqUBaiAG%2BFcLUBl%2FVUDI0Zj%2F%2FmMioJitdS%2BIAm9JoaB0dTrnJy8%2BJZqn200JWUkID5qpLWiLdxb6j%2FSxJ4HYq6bjanV69GOo4TxV%2BHBl6g28z4cWXjjRT%2FOBDjuEtjgVayaXcaHFvyKbmLkI9Ta5MhAkDph5FM9QpeIcvLNwkathzG%2FaBP%2BbVrFjbqRdQh51%2FOJaJTck%2FvRGevhnvD5X32pgFP6thRPq&X-Amz-Signature=d7117e1e1af533b5a0132de79ef4e2ed0abd10f2b61c0656795425af4fdcbfdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AZH2ZID%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T051057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQCSzo7ZXysslq8C0h8ewVbljOwSVcJk7fmT2piCMblHRQIgXCGTjdbB%2Bmq26B9xL9nSWFzOHifvuF9giV5JjqhvQpQq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDMH7bL%2FZD%2FO7T%2F041ircA782KYCSIlh8Puw5LvGV%2B5MLMXhslwYKT5%2F2S465MbqXZ5VAExuSQYX2UsMclG7lYZT7DMj8fSQLL7ZQ4MuIc5bQrVOY5D12vuUxcU23s3vQk3Vsckw%2ByGxVP2c9l8I45mqiArGJaH7Ws0Dzbf48vrqrW%2FzeYh0ChxE8YL%2B7A97q1eGpgKH0B9c6S56uZobDrQw63gulH%2BmzRhDCs%2B3msWwyvaKohxQCZbi6XvDHVDS%2Fp71aeq31ozv97PmVVpyOWfj3Vqd57O6uSoCghlQokzeC6P30iHAeqL4rg%2BaNylaa8LRm4Gv3VudA6xEy41ILfozzai%2FcoueD4jYQ%2Fqepjno4rTNfIdc9nhRIxoTRZAi%2Fi45Ks%2FCt0E%2B%2FH7dPMeYnBRg4n8PwpJJxXFbsqMoNk76DrqaPoly3YI%2B7X16Kkmxxv84TrO46rRTbWdcydxLz%2BFgUCHv72hDF4ccckxigkTXv5FqrSqRNRXgyfMWaSI9H6Qu6bYKqWXIzbs2onvPCRZT%2For%2Fp4MxerpLljr3dammDdxP6R2ia2D0HtgTNPOV0CLCY1Lanz35skHrsDqhD2XWFYJ%2FKwaDqLBh%2B%2FyET1MKkYw9pmgBwLt7Z7HqWN0ABQDvGw1opjFO7HinTMNyn4soGOqUBaiAG%2BFcLUBl%2FVUDI0Zj%2F%2FmMioJitdS%2BIAm9JoaB0dTrnJy8%2BJZqn200JWUkID5qpLWiLdxb6j%2FSxJ4HYq6bjanV69GOo4TxV%2BHBl6g28z4cWXjjRT%2FOBDjuEtjgVayaXcaHFvyKbmLkI9Ta5MhAkDph5FM9QpeIcvLNwkathzG%2FaBP%2BbVrFjbqRdQh51%2FOJaJTck%2FvRGevhnvD5X32pgFP6thRPq&X-Amz-Signature=d7117e1e1af533b5a0132de79ef4e2ed0abd10f2b61c0656795425af4fdcbfdf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDYZF36R%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T051057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIAI0m6coW%2BkkXB2ZhG9E6pHo6NC6101DcJJ%2B7VyE2awGAiAChtzMCk%2FRgsmqcEuwYcVBzr%2FUpV4DWpK5iS%2FYKuuGoir%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIM%2FQgz271JwhncFvHgKtwDN66gLS%2FJ8ZoKanYfnMWC56Y%2FBJ0EO0BfS1cskWapBAuBPyOxT780qlo5esYB8hItWf4Cw1dwbBTEgsToy20pXQwRZC7x28jNC5CvI%2BcEx3gdNDPjq15gC9IUWI4Ir6L2wE6sOZmbqsr9v84j1gRc5PMvsqTYKbRCtJXpB%2FjvYjzrOjdDKJr7DKCapoAQdjBnWdJT9uhD1zO8YKQ4rsplV1zACvPeTokIY7mqjsCfzURIm8IW6vd0lyFYAw5RtDDIBoOI438vBbRy0EIuvNGg5eB1o2ywpmhIyGeYPQfpaJfRCr1F75q%2BxyqBPvOmtoa80B6YVGvJwHb8qIrQSqJ8SN8qxFSGuxOdxbcMg%2Fku5VRdX8hz9v35yUbnIs6wfixBFc8JdgegCAKfI1SBA1wMcHju3DMGXxQX20Z36OaFRvyKaDBfUCmEoPrH9QnlKtaGUDJeGSSHDO4WBE8g%2FQDcgH1w3nUklYVWCaf6SsWrSHkaHI2MPk1X1f6eVnwYlFJONnBmA9n%2BG88agYDyFjI2J%2BrubHwUuMyQDUr0xSG1qolZr9pXI3p8Gwpgit6O38vxgY2ylVE2TZIcGg6bUrb%2FoyFF%2F%2FUe93qe8M%2B3An7SYgIimGB%2BUZrbv9IO2qowwqjiygY6pgEMWtNyyZKsngPC8dKk58zMaMmEjzJMF%2FgXh6u1%2BrgBdgSUgyIBx8aWw%2Fx31C6DYVFYGHUdYwlzr1Hgz9Uz%2BMNkc7I8arHBhi5PDtpX86IAtYYRNT5FOz1%2BzKG%2BxOkWhjDBMppfPOBbMEMYvLcvKAUKU1WfhamBtc9O9QcYQQRSBhmCWDCqAoYAbbvMizQ%2BlCQ7o%2B729b0IGzRFvpCBHL1xdGyrzCVS&X-Amz-Signature=da8479e2c1fd491f16966bb816fcbce0c42f889c024655dc3fb57b379f78ac5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPZ6QILO%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T051102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIAmnzr4ezf%2BEwZcCAoLTw3WEwH4XgFnWELvzzbVpiH9XAiEAxpoUoszro55%2FyQ87o7Sn88a0lvx6Ub7LVDJuV6iaeEMq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDCYuXjkKxBjjdRIuQyrcAy8uexdTVvmDVQvTGq%2FPhhdoR0blPHgr2GEZwFD0vM06bTwy%2BjqQstgKako68GUxPz4upAW5ibFx9liXnd7ajBsws0VMAlQBomguTZ1DbEW6q4nfGlrYLP1wuH9KcTJDnM7qLr9tX2QMgbJdTrJ2%2FedSlgcNxJNMo%2FtNceiVw4btVn5Py%2BvV8GSq8a3o8B7SaI28241Mdh%2FlnYGm5B2g%2BRniAixWn3HBbUA0UMQ6WC%2BnnPd5%2FN4PFomTdurrTWp9S6i8c8Wd3kxIV9sqSZHirpiEhv9uJBInaeyGaMbzrBscs7bsM%2Bfg6iAxsL9lkvTrg%2FPPLuYNzuQfJp3MTOfmdb09GjCI6pIyV8ICYRN9GqN%2BKC5iEN0RCxWT5WgoiQWeeXtylB96TcwVIW7P88XLtgncXsbqwIFNfOXCZ9WZlscYhMzN5Uhn3JSx5lRs72Jh5QtUycLaylm1QEDSxJknGgqcFgmZe8IrhEDZpZXRB9FvF1zCqIvmi4lWYwkQYrqyUXbRdb58I%2BMHF%2BZ75%2BLlUDDb6MZ01R4l7TMBN4%2FHg%2FCEf4qGW0Yk0ghyh9%2FYVxC8VsXyqzA3S1y7FWmLq%2FImlQR54WsIHSW2ylJNfOnmiar69ZhbRad8oSTEaMR8MMOn4soGOqUBJ0PvJgUVK1%2FHhPPMka4UcaNzOGF6e%2BwMabQEvrPJbMXWa8d3SHhqOJkTWKmVj8kibY0ZbHhL0wk7t7cy6JgnKJLFchpLkQMdxJAJOXEQbfl0f13tfKTHikBZgmfVq4CnAyuyeYyQiCTlHYsXBQ01bRfH%2F%2B%2FYqgH8OPUhYUfH6ZMJyx9BRATssRfQ8xYjffE%2FwRaQ6PxGqgHtyNc5E31YCzBi5bC4&X-Amz-Signature=40cacf7c67a03c988128c41d89daf06afcd7f840509c79d44e45d9aad42bb86c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPZ6QILO%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T051102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIAmnzr4ezf%2BEwZcCAoLTw3WEwH4XgFnWELvzzbVpiH9XAiEAxpoUoszro55%2FyQ87o7Sn88a0lvx6Ub7LVDJuV6iaeEMq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDCYuXjkKxBjjdRIuQyrcAy8uexdTVvmDVQvTGq%2FPhhdoR0blPHgr2GEZwFD0vM06bTwy%2BjqQstgKako68GUxPz4upAW5ibFx9liXnd7ajBsws0VMAlQBomguTZ1DbEW6q4nfGlrYLP1wuH9KcTJDnM7qLr9tX2QMgbJdTrJ2%2FedSlgcNxJNMo%2FtNceiVw4btVn5Py%2BvV8GSq8a3o8B7SaI28241Mdh%2FlnYGm5B2g%2BRniAixWn3HBbUA0UMQ6WC%2BnnPd5%2FN4PFomTdurrTWp9S6i8c8Wd3kxIV9sqSZHirpiEhv9uJBInaeyGaMbzrBscs7bsM%2Bfg6iAxsL9lkvTrg%2FPPLuYNzuQfJp3MTOfmdb09GjCI6pIyV8ICYRN9GqN%2BKC5iEN0RCxWT5WgoiQWeeXtylB96TcwVIW7P88XLtgncXsbqwIFNfOXCZ9WZlscYhMzN5Uhn3JSx5lRs72Jh5QtUycLaylm1QEDSxJknGgqcFgmZe8IrhEDZpZXRB9FvF1zCqIvmi4lWYwkQYrqyUXbRdb58I%2BMHF%2BZ75%2BLlUDDb6MZ01R4l7TMBN4%2FHg%2FCEf4qGW0Yk0ghyh9%2FYVxC8VsXyqzA3S1y7FWmLq%2FImlQR54WsIHSW2ylJNfOnmiar69ZhbRad8oSTEaMR8MMOn4soGOqUBJ0PvJgUVK1%2FHhPPMka4UcaNzOGF6e%2BwMabQEvrPJbMXWa8d3SHhqOJkTWKmVj8kibY0ZbHhL0wk7t7cy6JgnKJLFchpLkQMdxJAJOXEQbfl0f13tfKTHikBZgmfVq4CnAyuyeYyQiCTlHYsXBQ01bRfH%2F%2B%2FYqgH8OPUhYUfH6ZMJyx9BRATssRfQ8xYjffE%2FwRaQ6PxGqgHtyNc5E31YCzBi5bC4&X-Amz-Signature=78e74c7d3d2af749e5e5a41427164ca120667994f26140f8705c6a869a79ec1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RN7WYXSO%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T051103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIAqGkF6jSgD2zcKkKY3EF3sKEfheFw6T3W%2FPfNCjyx%2BwAiEAkXTWxvq0GIrtHuJqChf5lS5FoKIhObtDFilfRVL5uYUq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDCkGc%2BCp4uMYaEL5ayrcA%2BGk7RVWIt5xKwba8ZUo5YCrQ8q88eJFw%2Bn1%2B5232D9U0%2FwQzR52XwSeGV%2F9XPNR%2Bw1ZOLRG4VZjK4diP9OQpQ6rrAT4oExbfd20W5msXNPBQ3l6fgJUGOiUNThVvzCr1lyDVUcVwXGT1gQwMKOl9ZvcYcH3fD35XDKerOAYLqc4I20iH1E4V5sHfo9JaFSSb%2BTnQ9FRSdO1QCr8xLl2Ff2HRylidkSXBwE3aDpqrOIC7y7yWE1YRk2DO52rw2BWAxhbIIiVFOmSicXypmtQt%2FLjz0gzuUn722DZa41dFbs8ZG9SG6EXBaHUEu%2Boy9aEQnVH9rBpJxcpOMeYA432NQ%2FVHj%2FlZP44d0%2FyGhWz%2B3TwWv%2B3E4oc8BSU1HmgsebP0WRw0l5wqNAYrQ2v1uT5Eq%2Fj%2FVrq8L3XeLlPCvzUJVZtmXjDjjhU94RsaMLYTlmDrhzG%2F0VXPj%2F9IEekXOI1TTQnb58swp8cOY%2B6%2BMVPyTr980dvX8t%2FTVIsSfq9eWoFUPF20BjlkTEXjn9YBNOIvjGxRGcSWfp1VkFu1BdaeLCqaJ1Yl4Y%2FbTmxBwSFY172WfCaQLjV6%2FPAxS2gt74t7cvO2S0pX86Pclwu%2BdfIxTBZd8PZSAlYFyuWRH%2BeMKyp4soGOqUB3qJ4Rw50dCWnA1pm8DUbSfe6Lb4rSW4sDx8VHwYzYZAA8PLViRVLZ%2BztdtQ2OJxEYXrEi04UzEE6CTTUYP3J%2FUU%2FJcU6XHfOizhtN%2BkUDjUpWoH15Rt9HPMhThx766XSbm4w7j8j9AGFTkt3Tpr0UYMkPjruu3M7IfcUuC30AavZOWYgbpkoPGFhGyXdWNEFZYIJi7HSouVO9A1arxl%2Fq52XeuOL&X-Amz-Signature=9e4ac61f3412e059be140e53d7be8ec77677c010d89a55fb9e64b2105abdd60d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662RP6DTJJ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T051103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIHZ7iXRvYDdmPiH0Xknil3w7073fDNf9vazq2dT1ME1RAiBqUq3LDXYV4Fotlz5Hn3xGCYzb2sb9sxPwNQsmQnumIyr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMoRWxSF2XVqDIqXW2KtwDvuQZp2QuhyLF1MChrJY4k73Q6KDJ6SEtq8HYOd8dXMXhwH7zQJDnMKgjC2YxlD29VfhgLH0%2BCCrXRrsbKSkr%2FdAN5wtHQEJCTCPoyAXJAz7T4sXx15mUg5p49G9EaGi3LQrU4daw9X92%2B4C7rCGSjWfoOf0ibzKySSy2slQa9GkXlXu9JMenfoAPPpYUlluIiFT1D6GMdz%2F3wDeADko45QiSG50bTLxqjT5nk%2FfrPolxbbzNXb9M6T%2ByYFgrzqUjE1KJ7wn%2Fem9FgQ5ct%2FGJaKXtk6ZYOZOoCQlDxGLcXWo0xYAlospVrIW33FaJNvjXsLAtdJmfaYdrDhmxD98h8zwcPpDEunC1DQYD8bQbn0o6EkcwhlgG09Mr3836iILRDu2OAf9Qs3zpTGlYF%2FL%2F6NsvYfnmud0qG3HE90%2BOoRJ4AZTgEG2hNCYLAd0tbe6Fz5gUd8m7k3B%2F0RN1NmfHnCpUJFiyb1CReF2ixzJXHaaz54TUpEMIyEgO8HSUn5YQ302n7nWkQNJF9M1Yc25nQHDuiy9BrOVtQMvUxOFVqh3j1Yc3alyHcL%2BqR08OaE6M%2BQX5IHXiD3fD2NUrJTwwnxWZGqwQEbQoDsd6%2BP%2BJsOs4Vnk%2BVW18uQaAPlUwg6jiygY6pgHSB9pUgpdnO%2FrQzSMpcBmGFI7DyUReMDvOqEbc02JZ9Urac6nprGenUOG9x71EsT5QHvrVID%2BMTcIMjcGujlsGxJ2XNI6vYTla3X5EuiV3EbNTteIBHbs%2FauY0NT8uw7Zhywggaqd3WX11k1JL7LWVBHXs2Hmdk5uURJ7Mg%2B4uqjOKdDuuYZpbSjIF12IjspxgLSZRa8qVGjScU5qx2pO0WFjQge5M&X-Amz-Signature=865c3d3dc0a6f596b20840d964725c8bd6452d7aef599346eb65949aebbc4f2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U56VK4G5%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T051104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQCztMCsRkiWdCrsCPRIErnTKa6S59DOVHdkQYPpKK8JggIgYHYKZN1ioyyRIwmLwsIigu5AJO9uC%2BjFgwpeGEIMol8q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDAy7VcohkQBwLNxW2ircA0Q1GCPJkmi%2FpZAzhbN1YgP68SU9sSpTiudFX0%2B5q4O6n7H83lWTLSwmEJ35hK9pJklsE43jJAuqxKitfyk72opwzN5dAN903nrKaX7dTRdIRR0oFNwJMB%2Fs8wXC1Dos2%2FPvCcQfofVUKsl8l1aQQj4nCAbgZuTYS46bGeSgq2J0y2x4eJBclfQEP7WFXERKvVdyCRLh7POKLpFFV%2FChninQbFkt6ylrV%2Fkp%2FuDRXhziIObF31ayMvIGnmVCEgr%2FPc%2BTg5QDR%2Fba%2FG8OFoxNLk5rcbOXsWl84Rxm4qEDs59KRlB620bklOrih3PBhJKfOgVibM7cNHTEI0ZCMpwEv9pM2thKigqGaW9vYqn5AC3TCI8Ch9FRNVUSmXoLehhJoo32%2BU%2FjjYbigvUuRKsENaPfCJfdkj%2BLcQfb1wGbfZnZNqxX3XFjxq3Is6rKRS4MmZqxMDj0Ydj5BU83KLDKptjhhMwx2y5d%2BNmRZUQp9HxeDBoGBWu4WlYGjcUsRRrz8KySWJp7VxwkDFyYUWPlt0ZBkCAO4ObBhFgn08ThhxfAXVUmmIyoU9XtscLCuX%2BWppr%2FHqHddVitdYb4boriZL%2BM26c%2FFr6zNz%2FbLL76hUZXShruvhX4MraSI4K1MPGn4soGOqUBlxg%2FKc0y3JNW1KQbnkunUaUjWmIppvHCGwzTWWjv9vFg0nEMbK1S6BQ7uqpi1hn4%2BN2DBnC1gjhkgBducCzsf3jKlIrVMKylQmhYdppQCDjtByK2fjqQUOvGC03YwPRsAz72MFDEg%2FphNKltVWyUfCLIWwRD2Kf5KMaWRaapN8FPh56mBO62tkKmr%2FSc4s5h%2FrhXN3Rm5CojTB94gf3A27ajNk%2FY&X-Amz-Signature=128d10584ea5b84dc5e773b26ad5a01507ece848909b7e008c4cbc540d38f690&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W36EMESQ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T051105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDKvbrlyewgIRcZ1bt6eIZTjzyr4lZtjW3%2FhaTZAcZTugIhAPXwXkMGIcRBuX5Qi2o9Fa%2BIpCbt6gARFyKhD9CjIvA7Kv8DCA0QABoMNjM3NDIzMTgzODA1Igw1%2BgB6OdD9Gb9ThmIq3AN5ICrbXg7K%2FCRsknKW9XRr8COtj445L5yu%2FVvindJsP%2FfbbSdEci5ID1bKHWB116vkvtVuvKtlgKJBUp3AY4K07BFMRMNQqgKA3hWlyBXMuWmzBg6iHaK6fhSZgRgUWpOQeUpwU099AJ7EsOn3bATb6B3MvKnoNynuRudKqQn%2BZnWvVV9zzGOzC7xoG7El95SCcA0k5sF78yhZId6xsRnGkaWdAXQ%2FAry618Y8lfLFJrH%2BGeKUGXIbj9%2FAV4dngJyci%2Bo%2Ff1YId3edoZDNK15wWqx4T287oXc8xtkMvrZvHgOjWEnpdbrX8d69Xryn%2Fcsns5uM5JQGkQaEgJgYUxUbicanGSu69uEYsoLxMJl9GdurwIipyYkxIhkv0tlh7FDkxUWk8KGwsEtjWBywaNkQuHF79Bfju7qIy47lkwTyhFT4XZL8UMYXIUBDWg1Cv%2BbMjGqjInMUrtW2uXBrDfbZ1lEeePjCxeiivG9V2A7G4sy4qtPjTudUqH2usSwMeDQsl89KtdjhQjV7zNPcxiLo%2BSex01G%2FWscG7%2FaT7x3uDA84aBXy4iUK767%2FC%2Fs3hPBQc0FocJVxV5zBfqSD%2BWxfAE3aPQsopb061VOhoAUCU8R8K9ApdYXl285e1TCKqOLKBjqkAXLGp68REuhOXFMgvOBGA8cJU%2BOu6xNiAtcPIM7fHGBhnBcQCraAWcwcQdD92llkD6ZKnxtv%2FrJ2cCClPJcYQrl9yHEbmgkmZIBpxl%2By%2B0ERgkSIeb6cPALOH0jcubEtnnXQwlSzaJ8jNLTsrXsK3KiXkH5dV5YyC4LC6fZ%2B7zQ%2BxNg7RUas509KtQx%2BBIK6S7XwMIIf7vp821vqsTAMlX6ggYko&X-Amz-Signature=0970b1b579eaddfa335476fe271e65287a16887f9c6fe6e42165a50718d023c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W36EMESQ%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T051105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJIMEYCIQDKvbrlyewgIRcZ1bt6eIZTjzyr4lZtjW3%2FhaTZAcZTugIhAPXwXkMGIcRBuX5Qi2o9Fa%2BIpCbt6gARFyKhD9CjIvA7Kv8DCA0QABoMNjM3NDIzMTgzODA1Igw1%2BgB6OdD9Gb9ThmIq3AN5ICrbXg7K%2FCRsknKW9XRr8COtj445L5yu%2FVvindJsP%2FfbbSdEci5ID1bKHWB116vkvtVuvKtlgKJBUp3AY4K07BFMRMNQqgKA3hWlyBXMuWmzBg6iHaK6fhSZgRgUWpOQeUpwU099AJ7EsOn3bATb6B3MvKnoNynuRudKqQn%2BZnWvVV9zzGOzC7xoG7El95SCcA0k5sF78yhZId6xsRnGkaWdAXQ%2FAry618Y8lfLFJrH%2BGeKUGXIbj9%2FAV4dngJyci%2Bo%2Ff1YId3edoZDNK15wWqx4T287oXc8xtkMvrZvHgOjWEnpdbrX8d69Xryn%2Fcsns5uM5JQGkQaEgJgYUxUbicanGSu69uEYsoLxMJl9GdurwIipyYkxIhkv0tlh7FDkxUWk8KGwsEtjWBywaNkQuHF79Bfju7qIy47lkwTyhFT4XZL8UMYXIUBDWg1Cv%2BbMjGqjInMUrtW2uXBrDfbZ1lEeePjCxeiivG9V2A7G4sy4qtPjTudUqH2usSwMeDQsl89KtdjhQjV7zNPcxiLo%2BSex01G%2FWscG7%2FaT7x3uDA84aBXy4iUK767%2FC%2Fs3hPBQc0FocJVxV5zBfqSD%2BWxfAE3aPQsopb061VOhoAUCU8R8K9ApdYXl285e1TCKqOLKBjqkAXLGp68REuhOXFMgvOBGA8cJU%2BOu6xNiAtcPIM7fHGBhnBcQCraAWcwcQdD92llkD6ZKnxtv%2FrJ2cCClPJcYQrl9yHEbmgkmZIBpxl%2By%2B0ERgkSIeb6cPALOH0jcubEtnnXQwlSzaJ8jNLTsrXsK3KiXkH5dV5YyC4LC6fZ%2B7zQ%2BxNg7RUas509KtQx%2BBIK6S7XwMIIf7vp821vqsTAMlX6ggYko&X-Amz-Signature=992436c5bbe8ffa23f1d4c411e929b27288a597e99be5964a99cb0b86fae2857&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7DF7KTI%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T051049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIE5ChUV6hMVaHGa8SkfJ4EA3TPwCvLCQ9OHhAPBpuOxIAiEA3MxyQ7Pme5QYr219t3McQC7IZ6mlz77AkHRo%2B2%2FpBHoq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDM8uuOzz%2BrCW7BIZ4ircA4wMIopvL7ofgrAGnrGvToU1cDPu4K3sJDlTKm8ppY%2Fu4AfpwsKV%2BW5AAdO741SWqXkNtCa1RMBxxcHLv%2FOjTF9nB3uMJlNlcQGWyurZf1No2JT%2FdrJyBsutriGfP6VsCgv0ted0YmXZhg4FGPv2KCfyhMHqjz7l2wSyddO2zBPnGHFxXi2NcSM1vlT6jHqE6Mrm3ER4q2ZANkZC9TYUwu5F%2BkZga91G7s52qWRqQXxnFCmGVXQ3V1t2ylnZvZt0ZPmwscjlXdhAJbojnhe6Cr6ImwCpA2MFgHdX%2BO0yujLT8GT8lRwtZJsYFc2L7wlKmqxPR4bSgw%2BUeStpDH1liCOWiKbi8Tg4UNBdXW%2BWh%2BA%2FXL418u6coN%2Bv0d8j%2BJZvaQaz%2FigwQ%2FZ63uwbkZx2vtG1oHTjErEmcBJphNJ7TrcGVv3xWPayPSQ4949dEAX8vJjKsKh0TuZ3%2BbzmA2Y5N6jTjToUwb9tjAu%2BzH7uEg5KDXOIn1TjVeTL7mGcTqHd5JmjCnhGOiJ28SqZaLskG3qVn7ystMLZXXbXZHxLML83PiV3JEuvQtLsKVrMr9CVhkGseP2jwtaIYrjGlhCZlbZsx425zclt7TO92QpIiyxSdhr9yHLBG5FgY7cJMIqo4soGOqUBVoDYVq7%2BfoyQ1fbIcc7CnQkcaSH6O1SJaGEjPG8vCdQqsZYuytgjInMUQqJGKKdPHmFiIHtPsR%2BsD4hP2U53O8EpHKROeaXJhtAkBI%2FrR9K72EVFQT%2BS27X1Ko4sqX1TBvHHcdLNRodLs2TIJUzWD0v5LjR3zowHwvDOV1UBtWlAgsgaePOmwy%2Bkipy1S%2F4oOG%2BMuXTXBgpvyT3%2FIlOPmipERJPp&X-Amz-Signature=94a72a3e973b8860c22575fc95f1941f6412f125f0d6b521ec673576d4edd86a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSRP5ZV5%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T051107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIEn61d8E5BtXKmnHaUxmUOolCztjghxEDBgtWjJNlgN%2FAiB6ShsDrMts8A6Zov%2FvS5lrac%2BfNrdgP%2B%2BPXUR%2Bu8zDMyr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIM0KwJOdVP4Nr2sNjTKtwDePZzJF05wjtTv2lMkqYR2bvqA44Xxt73QxNSBBoxwXkbrgRDc0IB7BdNFu8mqAWa1kfZqCtQCvH%2F63sthc5ni5JGMlJsbhbDRIEU0Wusa5U3PhaZL6soYBWKNVhJK%2F6ZGlEPcRF5z61v%2FLaEFUQVX33h%2FrUH97ABJb0nIYqiQX0Kc9GLbmQu7D3HvBd3eWVOsSfRvokuh30fso4E0SR1CIKCWCz8m9dXSHixhQS%2FrwfXY%2FtelKIFrvkzcVH2O2Wp5YK7BHQ15f8rw5rMyh4ZU%2BlZW7lOV20%2Bn76ptOHZ08igiMOaFcuRI4wFsVGOqIw%2B8UKIWHdRH06kktlmGVyN6qRYWLLHdw9LqYBJzaR9jrqyEPjDEKgCeUrK%2B1Uk57t3POw5LwzlegZQ0L2ltx92XssKgfCu5QnBxzFJm0zsqwLGrDxucxniMKlaAHakXlWDFObqjN9IZArqWHofB8r1gBgUdxnvi6iidxGX%2FhG2YpkKpt6wY8CtoJ2%2BzE8zBHcsJrIa3P9s8sh8AIVGsqKwwH%2BOy5DPv08AC8xyNZeyDO8Ud1RjcTgsVnaDm7XQRhHkShQYXjP8e%2BeJd%2F%2FvUSirVAhEFLZ2TAZ2Cguhdz95%2FXiJJnB%2Few8SiL9H4KswmajiygY6pgEXvUP5%2FvG6l0iTyNaWwTy6UIoQjZ1XWMkiCy%2BiXsqETAdQdB8C3DSem4CEWGMM13apbodT47dXvVKQIdr6ECNFTZJaBBYQS4vQaGMlFckStgefmakcZHk%2FfkcznWQ%2FmRa23DaxBqMCQtYNhOUhAE%2FRYe0JrNaFLDEV43chwl5%2FjFU020TAvHFysXTzibKdvBjFWaDZfoli6uOaPS5NsZxOiBzuI5st&X-Amz-Signature=7169a25b340a082f60eb8791416d70f29b01e4fe0ac714a21394f8edbc9a1367&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XSRP5ZV5%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T051107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJGMEQCIEn61d8E5BtXKmnHaUxmUOolCztjghxEDBgtWjJNlgN%2FAiB6ShsDrMts8A6Zov%2FvS5lrac%2BfNrdgP%2B%2BPXUR%2Bu8zDMyr%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIM0KwJOdVP4Nr2sNjTKtwDePZzJF05wjtTv2lMkqYR2bvqA44Xxt73QxNSBBoxwXkbrgRDc0IB7BdNFu8mqAWa1kfZqCtQCvH%2F63sthc5ni5JGMlJsbhbDRIEU0Wusa5U3PhaZL6soYBWKNVhJK%2F6ZGlEPcRF5z61v%2FLaEFUQVX33h%2FrUH97ABJb0nIYqiQX0Kc9GLbmQu7D3HvBd3eWVOsSfRvokuh30fso4E0SR1CIKCWCz8m9dXSHixhQS%2FrwfXY%2FtelKIFrvkzcVH2O2Wp5YK7BHQ15f8rw5rMyh4ZU%2BlZW7lOV20%2Bn76ptOHZ08igiMOaFcuRI4wFsVGOqIw%2B8UKIWHdRH06kktlmGVyN6qRYWLLHdw9LqYBJzaR9jrqyEPjDEKgCeUrK%2B1Uk57t3POw5LwzlegZQ0L2ltx92XssKgfCu5QnBxzFJm0zsqwLGrDxucxniMKlaAHakXlWDFObqjN9IZArqWHofB8r1gBgUdxnvi6iidxGX%2FhG2YpkKpt6wY8CtoJ2%2BzE8zBHcsJrIa3P9s8sh8AIVGsqKwwH%2BOy5DPv08AC8xyNZeyDO8Ud1RjcTgsVnaDm7XQRhHkShQYXjP8e%2BeJd%2F%2FvUSirVAhEFLZ2TAZ2Cguhdz95%2FXiJJnB%2Few8SiL9H4KswmajiygY6pgEXvUP5%2FvG6l0iTyNaWwTy6UIoQjZ1XWMkiCy%2BiXsqETAdQdB8C3DSem4CEWGMM13apbodT47dXvVKQIdr6ECNFTZJaBBYQS4vQaGMlFckStgefmakcZHk%2FfkcznWQ%2FmRa23DaxBqMCQtYNhOUhAE%2FRYe0JrNaFLDEV43chwl5%2FjFU020TAvHFysXTzibKdvBjFWaDZfoli6uOaPS5NsZxOiBzuI5st&X-Amz-Signature=7169a25b340a082f60eb8791416d70f29b01e4fe0ac714a21394f8edbc9a1367&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TP2KM2BF%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T051107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEQaCXVzLXdlc3QtMiJHMEUCIQC%2BKTlw4Fueb%2FOgFGYYwqeMIZER0qa3avHaqZlvvRjlQAIgPiGvQr92871wVZHDljWld8SKlgB1%2BAR0HKl9iFVKnD4q%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDIEhzR29M8ScT8UJoCrcA8mQKv0aodU2c7MbWxlpVCAD0tXD3YQNfe%2Bt%2FOqgL0ub8cHZoh1s56oxh7TWuDHh4Sfu0JIDEDj7kUBcqII3s3JTlUeDksKrUUQH%2BxQvWPtBiLuEwnT3dwNvb5NOJhZ8KBynxYerFKYDSr94R2LfEYhXkunuEb2Fa0U%2B%2BHc7HKIqZ2I9MT0I%2BEbJG1m741ZjJ9%2Bl2XZeNZi%2BW3r%2FBFBtFw7BwRVKpjd3%2FbhUF7X06RS4ixkB5uok891WdujLtPKJCdr%2Bgd05JVGkVTpd2nxA4%2BMY6Fx4BAOcJ1g5BdwWIKdnwxkhZehXZdvWfPziWjk0J75itLLTlchoUnYNTR%2FVxOaHpKQwCFfxt%2BP48kupl0tH1vlRLYqu3E%2FPbFyzbeXUbGVr61ZMwSQO%2Fqsg57YScGfVeOwyJJuPMNDtPcFMdCz0Dv8bzAWXUKY5acUjX%2FDasBHue5rRzyAhGJg8pWZVT5D3fQ9dffxCb21FwywtxDBb3YwULLhuQJEgY11CdBvc9zNfHWhNgnfGTCsHoV7I%2BSd0IkDOxLcl1L6AGV78vY1yCi09atpjWJLh%2BZn63Cifuxdzd1%2FAwwvN80%2FYnG8qcTTN76MHmf3g0yyg70AwoILytp6bB5To62gY3BFZMLeo4soGOqUBqv8DEFTauOcN%2FplB3i6LWBoSvgtS5WMVFc7j0L7lfsidsvd%2BpcONrqTlO3%2B7uHa1P40%2FcI1uefnQUpzRdu9W1u9WYAg%2B4efVPrDrSiG%2FeLpNJJVGr4yYbmzd3JEBLjzojxjch1BNl1IuYDAAYIbaq4E6HB8QuYS3p%2BCo5eHHmRpL7EH3nNNB%2BaI5TX%2B8GDYYVIIPK%2Fc4zB1%2Fj1jiQbf6BxdeSBlq&X-Amz-Signature=9c7a2f9aeb3b5383f224b748440d601e41ecbc48bf3ef276e2bde114505b7ebc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

