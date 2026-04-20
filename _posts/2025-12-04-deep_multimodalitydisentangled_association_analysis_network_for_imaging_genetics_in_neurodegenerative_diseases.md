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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCWJ2NPM%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T125646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIBPu0gUgv56%2BI4D7VCWtfCQxtC2goqES124fUtbpDUCnAiEA8Faa6ynthNczGO9L1iuVUWzPieebEm2L7r5NXArH3dEq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDA29Tr2t2xPfPD8YBircAwYWC3UIjve9artTIVHN8CeIgjMTy1DJTf5D0aPbJzTn%2FmV90HBON%2Beg7dL6QtZVDch7iYQiFkPqHsEmPNZbW9tkzWxYVkjJGoODHKRyekCQzzftp1ZS2lbY8x2wWMuzvTVrCGrlTN8H5XkiNLxJKKJbqSxIBFTU5xp1TEZjmRNnMLXLDLkQuA2yz%2FiSMEySAVBvBGJBw9qwgnj7P0k1%2F%2BgduWocVtgfLZ%2FE9zbnO0o2B8kJ3Z9KPoTwa6a5%2BlZ1pdsXKvDbi1EjerYAQZoA8tIfJ5CMQ3Wn%2Bl62kE9JbEb8E7BWIgd4prtVKEGAVSOc1AuwDEKsUSNzYpMG9e0KMKnl9oX9c8qPmKsHc%2BiGHIT%2BfomecllGE5q%2FEgYwYzMyZLV6JRAxAi0XzZuf33ZmZhpE7NSK6R1XdCMOvACCHS4ug6kW%2BvZo67KVrqx4np9CgGUPFUeJhWXK8nJLNXMFtqPeONsmsVxN9mvLYJJ3srg5hK1C96YnTU5Hk6v2dqWrCY9aypqxHxyG0%2BXkYrepQNQKx98OQdfJOVJYAWR%2BGZj4eMuIzEeJTaSfls64%2FPLwXwj7ItuBI9ciLoMySD9ahEIb3jWV4k4YB19ozkzo3Vsu7Tyx%2Bj8iOJSab26DMLC6mM8GOqUBpHR1g6dhasdVKQSCU0Bx2WhqCwQX8n3l4VjW9cVb8zYlYFGCCTJGl%2BqYLGxXPPZ2QxyecITH%2FA%2FGwc0qFDq%2BqSu3%2FW7iI2Ex4NihR4m6hfz8SUC2PURwobB0bKUI2T2Th0JDaIMoNgJgM0DH1W4WAFB%2F7Y4jQq%2FFAF03apNj%2Fd0QPetANFlLMLE7Qx1yR32tzWV0ix257h1J1cTuFgknms2AP0Xd&X-Amz-Signature=957e1a2d29f1ec3ff0966b6007e30e3ec9a1dbd0383f682619dfbbbeaac18421&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCWJ2NPM%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T125646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIBPu0gUgv56%2BI4D7VCWtfCQxtC2goqES124fUtbpDUCnAiEA8Faa6ynthNczGO9L1iuVUWzPieebEm2L7r5NXArH3dEq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDA29Tr2t2xPfPD8YBircAwYWC3UIjve9artTIVHN8CeIgjMTy1DJTf5D0aPbJzTn%2FmV90HBON%2Beg7dL6QtZVDch7iYQiFkPqHsEmPNZbW9tkzWxYVkjJGoODHKRyekCQzzftp1ZS2lbY8x2wWMuzvTVrCGrlTN8H5XkiNLxJKKJbqSxIBFTU5xp1TEZjmRNnMLXLDLkQuA2yz%2FiSMEySAVBvBGJBw9qwgnj7P0k1%2F%2BgduWocVtgfLZ%2FE9zbnO0o2B8kJ3Z9KPoTwa6a5%2BlZ1pdsXKvDbi1EjerYAQZoA8tIfJ5CMQ3Wn%2Bl62kE9JbEb8E7BWIgd4prtVKEGAVSOc1AuwDEKsUSNzYpMG9e0KMKnl9oX9c8qPmKsHc%2BiGHIT%2BfomecllGE5q%2FEgYwYzMyZLV6JRAxAi0XzZuf33ZmZhpE7NSK6R1XdCMOvACCHS4ug6kW%2BvZo67KVrqx4np9CgGUPFUeJhWXK8nJLNXMFtqPeONsmsVxN9mvLYJJ3srg5hK1C96YnTU5Hk6v2dqWrCY9aypqxHxyG0%2BXkYrepQNQKx98OQdfJOVJYAWR%2BGZj4eMuIzEeJTaSfls64%2FPLwXwj7ItuBI9ciLoMySD9ahEIb3jWV4k4YB19ozkzo3Vsu7Tyx%2Bj8iOJSab26DMLC6mM8GOqUBpHR1g6dhasdVKQSCU0Bx2WhqCwQX8n3l4VjW9cVb8zYlYFGCCTJGl%2BqYLGxXPPZ2QxyecITH%2FA%2FGwc0qFDq%2BqSu3%2FW7iI2Ex4NihR4m6hfz8SUC2PURwobB0bKUI2T2Th0JDaIMoNgJgM0DH1W4WAFB%2F7Y4jQq%2FFAF03apNj%2Fd0QPetANFlLMLE7Qx1yR32tzWV0ix257h1J1cTuFgknms2AP0Xd&X-Amz-Signature=957e1a2d29f1ec3ff0966b6007e30e3ec9a1dbd0383f682619dfbbbeaac18421&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7MQKW2A%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T125646Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIE6HcsRESnXWIjiy8wZoDm8AY9l8UGZSiaoxNtxGqINQAiEA35DH2tN1PtmWucMif3d8B%2F1cQwGSPui4tz8sZBxN7Ikq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDKBrW6HMjfQYzzaKPCrcA8wW%2BFpAHZkMxqV2nQwEVzMgJ70Yl1H4C0RRCNP6CqUIeUzGtDf7KOun8%2Fo5OA3%2F7ZLIHFN%2Fq5fGcEw4kVughB7LNpja7aqL4vDyqHTLs%2BBLwTD5eHIgiqSXrXIhptC49LXbu0yifAggwVMDUcXsvdT9UaKdfRMwOeIn5ju%2BcFpi%2BpNmb5nJeJgLqA49xgTJtNinQierjx%2FWiX6eFgBgnHaExGaRPKFelt1pOJk092NPkhh7zRZ7gseHO1dIQhFSi2Fx8th7hBOcn2avgAhGoa7uz%2BWvT3MHsFyTank7xm71RBHy%2BtmqsCa%2BuMOuhBFXkAEUzquSZRDd0tbkJfbyr5psjKGIRskc8WjQZXnpFcJLdQHrve77%2Bb3kwyUDsmI9g3kbMeBJ2guwO%2B8rK2q4gBJhK9K0TKi9u198%2B8OSr5tLzghmLr0VxYbeO19tW7RUR3cn8mKP6LQcouI1R0g9FgqV%2FVuFN9QoUbvBlIogmTFvlPvLVJHV5qUxcSQ494CPxJvMss2rd2mIh1tbNeY7QwaIfBeaNoyjr3h3fkQlffbWpp%2FCHQFma63bMPyezFXlAyA8Xb99cKw8204dptmoJbJeBm6c%2BvyqvJTCI3BvIGk8hCG9GUrzEjWkf36kMO%2B5mM8GOqUBz8AnJPg532NMA%2Ft2Q6fJhgsrSDehhRp2Nf6Hf4QTfSu6r9wbwUfUtVuIpSbH7YAXv0RiKvqVDCD9s6MY%2BegWPwxA2rOgAn8tUhVnHoAK9QcbqhPga8q7rB7q0ILtM0Mwaou8kDK1OeAb0IBhAa1THXtk%2BO%2BhwD3g6e7vfJ7LDe69sCby0YZ%2FfAZCE%2BtdH6umKQAgx73PZv6mau1XUvP0FG0J5xRF&X-Amz-Signature=a44dd9e8e6606367344b9e58125e88d4079111e8af13246b4bd6a1a04009d02c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTPVJKEB%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T125647Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQCEWSqjQE4nHW9CmTLUgqBMhOYwCIouT4ul9OF4jAJOZAIhAM9fR6zWxLTJmAWs1G%2Fyu%2Frql5UbX%2BpkICNGHkS7ZSoMKv8DCB4QABoMNjM3NDIzMTgzODA1IgzEuW2rrhKGPzAv4bIq3APuNtQAAYPxhBpRDm6YXuCTeWnp5%2BhQJSK9xsSX%2F4vnjCqPamfaDjLy0loAq4JUe4S%2F9e2pHfrfQPj6QBpjiO1GOIhB8919EcI%2BiId1jO7kIV5OFLsLjIvf2s8SaO3Ogirpszq5oXazQngVCot9dxlRirl%2BPtjTvsNhZzOkUaJVy%2FNPz2jd3rlkU7%2FcVSau7FBUujbFiVholf3hNiDPNoEInEdQWc9%2BTv8GrBpMapE7yJ2Iz%2B%2BL5XLsWVoZ6YkTep5w8PVs1ygjfMoQAQJGiETtPjUmw0dtwhl%2BIiQE1jUS3smGjzlQ4KQ5w64RYG44%2BlZ7ucH%2BM1GSpPrQJ3oVcPtbzvMdCMa9CMukZz2i9UxyT5wS7tvAu%2FdP3yaiwy1eVZFY%2Bd7XnlRsZta6uonVc6l%2FscnbWj7EODe5cgmDGoLKhYqQ%2FDED%2FbF08%2BRfuZVo9tM5Hru3AcI3UlTwHe4Q%2Bwfvfs%2FGH2ODRq%2BgZIaPqeKMYVy5FxmMvJIzjPMtjkxuaEZY1%2BjzBbw16nGF2Jrft4hW8b3BxinYt6VR%2BWObGCzzNUnlISzxOJEMJdYoe2je2ldmOQcNCDp1rm3VgaD9aZ4i9d4rzGcNWE7rdg03Yqq7iJoeOAGd%2B1ycQBCgbDDCvJjPBjqkAR0TVJ3vSFTcio%2BtSu7ny0jHlL9qTTOSQSU47vYN99zmRJxL2LDjIbz%2BtMgwbsmR5urkVTtkFaBmuur4xNYhb89PapI65dM%2FOXwjcHnycsNsbjLbDI0oPVCVl1SUhSJlM2SEM0r4jtsAs%2FXj0bXsJSRB%2F4osd%2Fz1gBlcNi5LttEY4R16HTT%2B4f%2B80X7uAmZe%2ByGTjBC6sxoKccdYVga36ysRkIvT&X-Amz-Signature=6302b89de20db0f38a5bfcb091a9dd07f6579ccc19b1c9dd35cb79ac38a8c1c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTPVJKEB%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T125647Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQCEWSqjQE4nHW9CmTLUgqBMhOYwCIouT4ul9OF4jAJOZAIhAM9fR6zWxLTJmAWs1G%2Fyu%2Frql5UbX%2BpkICNGHkS7ZSoMKv8DCB4QABoMNjM3NDIzMTgzODA1IgzEuW2rrhKGPzAv4bIq3APuNtQAAYPxhBpRDm6YXuCTeWnp5%2BhQJSK9xsSX%2F4vnjCqPamfaDjLy0loAq4JUe4S%2F9e2pHfrfQPj6QBpjiO1GOIhB8919EcI%2BiId1jO7kIV5OFLsLjIvf2s8SaO3Ogirpszq5oXazQngVCot9dxlRirl%2BPtjTvsNhZzOkUaJVy%2FNPz2jd3rlkU7%2FcVSau7FBUujbFiVholf3hNiDPNoEInEdQWc9%2BTv8GrBpMapE7yJ2Iz%2B%2BL5XLsWVoZ6YkTep5w8PVs1ygjfMoQAQJGiETtPjUmw0dtwhl%2BIiQE1jUS3smGjzlQ4KQ5w64RYG44%2BlZ7ucH%2BM1GSpPrQJ3oVcPtbzvMdCMa9CMukZz2i9UxyT5wS7tvAu%2FdP3yaiwy1eVZFY%2Bd7XnlRsZta6uonVc6l%2FscnbWj7EODe5cgmDGoLKhYqQ%2FDED%2FbF08%2BRfuZVo9tM5Hru3AcI3UlTwHe4Q%2Bwfvfs%2FGH2ODRq%2BgZIaPqeKMYVy5FxmMvJIzjPMtjkxuaEZY1%2BjzBbw16nGF2Jrft4hW8b3BxinYt6VR%2BWObGCzzNUnlISzxOJEMJdYoe2je2ldmOQcNCDp1rm3VgaD9aZ4i9d4rzGcNWE7rdg03Yqq7iJoeOAGd%2B1ycQBCgbDDCvJjPBjqkAR0TVJ3vSFTcio%2BtSu7ny0jHlL9qTTOSQSU47vYN99zmRJxL2LDjIbz%2BtMgwbsmR5urkVTtkFaBmuur4xNYhb89PapI65dM%2FOXwjcHnycsNsbjLbDI0oPVCVl1SUhSJlM2SEM0r4jtsAs%2FXj0bXsJSRB%2F4osd%2Fz1gBlcNi5LttEY4R16HTT%2B4f%2B80X7uAmZe%2ByGTjBC6sxoKccdYVga36ysRkIvT&X-Amz-Signature=e7100e793edfaab17dde872c2b36fb5404624a5bd5c91df643e0d8a3930d66a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VER4YQY%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T125647Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIC%2FUfUD62DTKL0bcpEMBcwYeazPRt9mdMjJIUDyxgTC5AiEAhL9jt4%2B7ybZz3%2FqiGcLlt93HJ1s7If%2F2uSEzmg%2BtaZ8q%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDB%2BiL0T82NEvMWBH3ircA%2BK8p%2BG7fsAhwxYtKDsgANdUv28pIMjzjSpEzjQbMJ%2Fnt9IJSQ%2F%2BWJl4%2FkONXvfW3N6zT%2FBwpgR8G9S627f7syyTqLOvLdufK54RF6noDSrkAzbBQPpD%2Fyyt%2BS6t8gpWOYoYcY%2BBzCZjjvLtyFguTtIKp3K1Fh%2Bg4IQhf6G05jmTtL6iGsE2bPi5LkI1whlP21dOIihsXpshJ7Y7t%2B%2Bve5X8geKf%2Bcy7qA9fcFO68qtqgi6GLzhAYB46a95yI9%2FmGYLrwEvuqrFJi19%2FSy95kAhC5vMu2PIxdzdrl8QxB6JJjyV6%2FkccUyk3%2FV94%2B5MLo6niLDzyRc8ahMrpDxtaT3uP0uUC3D05FwvjMxoa7cB7kV4skyVz2njBSRpzZ6EuHBipVc2%2FaS0lblWX%2FVp2wr%2BzfhhNBQchT1y2CWke9VyIvuxNX3BUclUn%2FL5%2B%2BlepWYJvRRvvsItRNWINeE%2Fsxg1fvsTkfkvPmPpgWldsQxHRnsr%2F3CQM4PMOrAzOe7UqYcerFGkJPTMfICdClQmAvN3pcJ%2BnpI841VJjC%2BriRZWwR4bI7uwpww6sKXgRfi%2BTT9G9hh8lZnMwjgW%2FhkPmnQJOXIKy5jPveHztwm2%2BM7KhQJs37teDw%2BAV8a53MOS7mM8GOqUBgUUUuS%2F%2BQ9CBa8FwkV%2BmXKiarzcgHwxjbhMb7yYLvGzCgTN1WcRV%2BG5wqW%2BfPPiJad16zORKywgvgt2vhvP8XfmF9D5oPMHYF9LISk4MImSjzOczZ0xegE8IIdDME4v%2BBWbCVG7tIDKo6pRiv%2Fa0L63UGDFUW8gQFuu8tIx7LOqKBTh8tuFf7kL6lH8jhGD2qfTnfu4b5Ynj5hVznpY20fiT0kW5&X-Amz-Signature=80559818b430c1b3260a43f56f325628080d22b0c614eabe008a6f99ab358ecc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YFDW6RLJ%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T125647Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQCf%2FavlowXhcj4iaPwrPB7BjPwPrCXs6gAeYzVjMEtBggIgf0N90HC5%2BpCG%2FdXTTPEzikhxhJ%2FK3DYeR83OUcX0DNcq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDNgLJC53LXKLQeisCircAzEgDSMEUzZ4j4icLeF9pOBfjGqT6HqG9RBAD6rpPLOi24A8SHChRikOgOBAV7K11sFXcplmvGEaOSNy7EPIveVydWdKR7kN6gHdC%2B%2BzXJqDP5MeQo6cBxK1UHdBG%2FNYwHgGO2j%2B%2FQE79B4gNMq7w10nErl0EEZmFlkstNCURsn4TP8HJhc8BnQrzbq6lVQLqBiHEMopXdW%2BlZMvPWaDcHOLgmiW%2F8rdfsQsbCJvKCuv7Ms1Dhj%2BIG2VXC2mGTjlB2MlMql42PBrlg50SKUiMa9jTglmGNH3duTgXNTvVLtp%2F1QLG9FUNkp5GYD1TxtpmhQd6b3g7jLVymrSlLAknLaTgs7vAJpUr2Y6Cx9w7L2Yc6TJVbcbZySavrOcBWzgBYB0kQjRwb5CETb49jYdMzJwC40szb5AhFmSm%2BSURJgqPt83OiPN6GCk6zPRCPsU729dPIHhv4j8AjoGNMG3eDQYOvOpXLnptDZ79oLtRPAj4EHyRDwzOm3dNNUKIJYzPzfWIx4D0%2BKDG8CXi5YwXLdePbYeA3BgGCAKEpoIfuaFrgSFqXApoEpZ8B8l%2Bl0JE280NfidVTKHlU4yP1EdvYSRaXJ856Dcpy6R42%2BTfaVLguD0r3vyFoqbxpLSMIq8mM8GOqUB9n%2FDaA6UfWkAEzvR5wSZFxprg%2BFwb0jCnT8UtS1HuXcxc8MhpA94zyrhEKpu%2FY472CeVl5w9qLQr6CoKX6%2BJWrZ1hneeWTNKPTDh%2BSlbZ2FoFMLRXbJY33Rr8aTec83NcagxlgWxDE8%2BFeCQzH5xeiiT3hyZbwEQUXkuBTXETAIpHi7kHfW9REnrMRm1%2FhlGYSK4XYhLj%2BDPvokp5gj1e%2BvKVvaV&X-Amz-Signature=37f5b1f944ee006413a2f638c071f05cba727240e03a2fd1940b71234a19a1be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUZ7JDYG%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T125648Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIBnbbviDVUPgbVFv8MZ4a9sI1fs4iCdCPDtT2XJVh6tAAiEApS9t5zDET6NQJTlUr5wGH9acEBSvju3tuf9cPtRn4Pgq%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDPtV%2BWCobG%2F4Ye99pyrcA7adqwOzWM6U%2FO9UznrnGEZtkN4%2FMV6O3JlXFPyuVsg7goTjnRN23E4MFSb4vFAz7HHLEVvQzgFcGwa4UT%2Bfw9Su4l%2Fzjg9WKJBsctUmLVee%2B0kUC3WHGfJofvTc5FGIw4dzl%2F0Dmcz01c4oJvhL4yAfiLyCzWnlukHEMKdOfdvJ3OSSYmwMK%2BgbjnQj9vUfpIkroZpJPcJmOW%2FNnXzs44TgRYYXfReLz4OBOwh8Eu37WjrZO1h4urvaLeaCy4soByYPZu3UG0SwV3bd7FYcQH2tkH6vedDCWvgzwIuVqRvNRszhO73dYmKu72DsNOB8yyuW%2Fz1cBmugqvx1OGDjgbFE1%2B%2BEP9P0fH02%2FlwSKkOnX69kXUhpF%2F2DgL6muWzZzmaiq7%2Fh6nI5ar8LpQaOBOptfRncyv5MBL1VBRYg6IDxG2D2ANRV9d3n5GjDOc7Dwq%2Bntf0KQ9tCWoXxGu2c12VEmvZhdpGuoUbqLc9%2B0ozlALKlYUF6TszyBbowj8EEDqh5%2FTxzG7O6W%2FaUmRyhz0MyT%2B5dKbU7FlZZUmPNnCv%2BMfgIx6yB3nJGXOORYltekr5TljRelyCO5PRZgYOhOCQsYp2QZV9b9FsoBsZJN49YcJ7%2BJUFgdXSsXuaZMPW8mM8GOqUBLQ%2BoaHA8mgolbfd%2FOFo9gJDYKUpG1UgNRQyA3kf%2Bji2aUYryqqAB0yJ4KqIJqLRH%2BJft1b0uUO7L0%2BgA94mk3zgRj8v9yLrdJZSZCGj5eT%2F6FI1FQJNv4Vbw678dmKrZnZwvJcp%2B7%2BdbAJazVlKUXaG8TtqvFAftCFpOUatHgNbd0W8wR6%2BkaP8vvcFhwMPea5XSoNVvrRWg7tHcBJDCMwSMVHlF&X-Amz-Signature=d879c3043ce700ebb044b1002b97ab8ca647f5f9775461e2d3074e95a4ee9a1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666M367KE%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T125649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQCjFyzeziFJtM0cqKjvSlHDkum2mcIG822nTF%2FVY3WC4QIhAJsN9QY616KdpkvmnuL88CQ%2FLSXx18pj0I07mPpmDPv2Kv8DCB4QABoMNjM3NDIzMTgzODA1IgxEz42EXVzwF1G8hLkq3APCJYOHQyOOEpXvpP7kcKB18b0gpa9r2g%2FHWdmoAxJxTTz2TuoDoARLlJOvzyfMjeQE23gdc5F126%2BCS7FPyWrSAq6h5kJsSVHelkBo%2F7htXDtWs%2BgoyhYx0MkrpgVXfUZZiTZmusqpsY0Z1XVEMNvLWeS3Vi5fmXG6X7XI4WxgzKRlx9JFSOtz33By%2FO7oWGJO8jWzcXE%2FwrlNeu3iH9Y6rQlqAoFn3YG0y1SYIYh%2FdIjmsgu6LiHDoS6JkWPff6gUb0LJxddwl08h1OzjYpjjNsNB1DAnNfq3MBoq3L3gLxFvzzLr2H8pR77uUrkyIcLegoRYHT6JTsAB%2FEY4Msu0PCRJ1c2Wnz2FaSUk1Rqxs8L1Ob0dcC6ytUs458SqdThb6PnuyYAA2ygUo2lpvHdFAFViRjW5JyTjMHQJftJqzL1y3YVgS9gnJnMKfzUAPKTOBMo4aiMPuQmGbTc1Fk9IeyoVHModPUIvU%2FE7m83oTyB9E0nlZoFj7k2k6hyGEpwQSSinDZLaZ6UG%2Bm404me5WI6pmnvkZDP2Ewb4TqqZMCkUGkGkaRYpO4SxwVE%2FkARoiywem7Tqwk6D0cD%2FV0bmb06jDe7xBdBoVEQCn1ZysZwnZ4X9rmoFL%2Bl%2FoDDTu5jPBjqkAX8jfUgg89oIUYem6pmO5A%2Burk%2B%2F5Nrt%2F89BvRswPI084cpdEyGwCzX6fepsvzJ%2BTY5Zvo5TZ1xzVHLGRJ3sonZ9HCIAUquq8geSd8ZAMMWPo2T1H3eQVPWO3s%2BiL45Q1d0hHoOWT7aHqutRgFXXNWp0ig8wxPFqcaoGarC17JDZ%2Bbs9yb0S9ZlvNgI07bZjSIbcmNXO%2FdXV1YJlkM5TmPFQBZqV&X-Amz-Signature=d6986e28d9568ec64d0a391e2db6b0eb0a1061b32c8e2093c11879f8ef05e9c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46666M367KE%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T125649Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQCjFyzeziFJtM0cqKjvSlHDkum2mcIG822nTF%2FVY3WC4QIhAJsN9QY616KdpkvmnuL88CQ%2FLSXx18pj0I07mPpmDPv2Kv8DCB4QABoMNjM3NDIzMTgzODA1IgxEz42EXVzwF1G8hLkq3APCJYOHQyOOEpXvpP7kcKB18b0gpa9r2g%2FHWdmoAxJxTTz2TuoDoARLlJOvzyfMjeQE23gdc5F126%2BCS7FPyWrSAq6h5kJsSVHelkBo%2F7htXDtWs%2BgoyhYx0MkrpgVXfUZZiTZmusqpsY0Z1XVEMNvLWeS3Vi5fmXG6X7XI4WxgzKRlx9JFSOtz33By%2FO7oWGJO8jWzcXE%2FwrlNeu3iH9Y6rQlqAoFn3YG0y1SYIYh%2FdIjmsgu6LiHDoS6JkWPff6gUb0LJxddwl08h1OzjYpjjNsNB1DAnNfq3MBoq3L3gLxFvzzLr2H8pR77uUrkyIcLegoRYHT6JTsAB%2FEY4Msu0PCRJ1c2Wnz2FaSUk1Rqxs8L1Ob0dcC6ytUs458SqdThb6PnuyYAA2ygUo2lpvHdFAFViRjW5JyTjMHQJftJqzL1y3YVgS9gnJnMKfzUAPKTOBMo4aiMPuQmGbTc1Fk9IeyoVHModPUIvU%2FE7m83oTyB9E0nlZoFj7k2k6hyGEpwQSSinDZLaZ6UG%2Bm404me5WI6pmnvkZDP2Ewb4TqqZMCkUGkGkaRYpO4SxwVE%2FkARoiywem7Tqwk6D0cD%2FV0bmb06jDe7xBdBoVEQCn1ZysZwnZ4X9rmoFL%2Bl%2FoDDTu5jPBjqkAX8jfUgg89oIUYem6pmO5A%2Burk%2B%2F5Nrt%2F89BvRswPI084cpdEyGwCzX6fepsvzJ%2BTY5Zvo5TZ1xzVHLGRJ3sonZ9HCIAUquq8geSd8ZAMMWPo2T1H3eQVPWO3s%2BiL45Q1d0hHoOWT7aHqutRgFXXNWp0ig8wxPFqcaoGarC17JDZ%2Bbs9yb0S9ZlvNgI07bZjSIbcmNXO%2FdXV1YJlkM5TmPFQBZqV&X-Amz-Signature=1f9a5d7968c0d7580ebb3a595ecf36ad81e7d50621edbcf9770d17953f7a2509&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TX6KP53U%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T125644Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJHMEUCIQCJhhoc5KgeYTEiGnqIGczvhVfAzf6s2E8OCQ4RGy6VNwIgKwIqq0azoJp5NjY0EhgbC522QINp6Oiw5%2FqNR5P%2Bi70q%2FwMIHhAAGgw2Mzc0MjMxODM4MDUiDB129JbkWkvRos3yqircA5RRpEaGLwiYjBivfneoVdz159SX1ti%2BYCUb%2B1fPAnFyt1eonQiBf6%2F5%2BXHKFjpjkeqM6oy5OXCZrZcf%2FUjDpzSmgfj79GtzPsAZn6RkcZ31tETXWlYTB7DM96Q0wm%2FjsARsbUGFgpT59xV3sb6bc3w00%2FMCOZ8R6lM9IuYBCm3R16I1fgdjXggAB1JUhp7f72t6GX0MeTgNGA2dnqMFmvI36xvP1nG2gZ29xQBKzhwNpbevUPcUg1Mivq%2Bg8%2BOvF3nCjJAtun6ELB2Q64UoLNIdDOr4ujBkNt8X5Le6SEaiXpL1OeQBRc9W2dL%2FwyImwgP4AggnSVkMx7Nm%2FtGivA%2FmZV9I%2BomItYWMXv1poMbFuJzXQPM609bdni296CiSNews2cr3A8ZJzilh3PUZFkPvAaOy7rkGHkcePWNiUY7C2dIXppZUF%2B%2BbD9cDJmGCSNb5Er2X%2BdFXY4MsxYu9R4J9a8QPb89H3tXNcOrTqmvRGxGnBNJLL8Q08QJVWz3MiHSeZMLv07zMoeM4YUo2OoreZ6GD6F9XYyBhbUFQq%2FD%2B0YSJQK9wCQ5n0aLR0DXGWKLCzXsaiSpKCvg7BNbwoOLZZF2YBOtxbRREuByWxKl8%2FVGcNzg5ojCz9oeJMKC6mM8GOqUBf6NldBkjKEOPiF2l4SO9Ji%2FvaN4V6pg7ppSRNIk1JpdWA8IzDpvFQsk0jD61HeTY18oeYg3jHym8aVsmNceGg9fteQfEDtWA9MATpwM%2BOxB69zFGHHVZFhDklOo4pR%2FjhBDf8IK4OM3HnjlHW0khMbKM4ISWYmDksG6t6vgO%2BtlTy0EMPzha7PvMTB%2FIJ%2B7uSgJGk8RIVrLl7BFHvWss9zA5E8eU&X-Amz-Signature=34c9be2a705832e9c4ae6c14fe9ef8fd4eb54bd327797096d785f8f7678688ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GRBJO7Z%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T125650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQCFr0T821%2FpuycCpCPkgBA9VKN0BpF7WWYK1ErSMyWhjwIhAOcO4TJpQhMpHKQ46ba%2BohxSxa9Wyl2U7pjCXHqcyWNsKv8DCB4QABoMNjM3NDIzMTgzODA1IgzxjmXMbMBYaQIKdbEq3AOU3hgFSaKaBwJEtHcB3FlGZz5L3v4SCVbUGNDZkcPHUgcsmKXZv6UVszuwPB2igVlvsvjfDBy0PubkgWL4SbcjacHsw6VHmFZja08kjH6oNCZJXqdclW%2BnOzudgAUmm0ungoB4cruBT1yMRbVx4NVcB5jBgHvwqFtMYUbeG21KXILF5UDo3CdQcRP6ZbCSQHaBIK0jA%2FOqknyzR4x00DdPD0fI6jA96RPHGyeCtmP3ypJvi3xdbi758fyzmrSjXqGUt90zicfzvfWANF2KiK3oTIq%2F0Wq%2BbDrRVz9igtUYAFOBMmHDVmX%2BlVRXDYr1GQtkXPsNQnQcT9y9dBYN6KDWX4X85E4woBHRX2JgH64zL%2F2S1K9hqffpBz6v95DPMGaThfWlaZhK7X%2FzHvsg5u5uaRKs%2Fa2IpaXzm8DZoENkyIxYFheru9eo9eWtR%2FyDF35uECUYrF54DCERb6pTQyFm5fDHbjZAogrjUvw8dWwYglzZvPFn8MVulGC9RvevTTaeUih7rMKamoVRT%2FlN0YDXSMNCv8PXkVp9bIgCFCx2XDycRPaW9hs%2Bqt61ruGeEdFZt2B0BhmnLL%2BPY6BaAUzOyF6cB4KB5rWGU5YkysQpb9c2tzRYEXjmBGs7XzCaupjPBjqkAbWORxDSit9vL2NQ8wqy7zL%2B4qRgCl4QLhwg8yGealdqNEbQevXgCR%2FFQHPy2m8w4zjHlipG8EFXXkL4v%2FtNNwQOr6mFByIRwyqIvyeauS4xQqlWFsvXB9uXTVqUpdWXAzWE8lLg7H908yMeH4oqBluBxH3l5TXmqPimx26gRkmnkUADaqC3yKBUoQsC%2FYrHgvOIUz%2F%2B510ZI4HnikV7%2BbMi9XpB&X-Amz-Signature=c26f38eb9169f3241f89e6f881880d8f2c1a0324e40e4c556988ad3bacde8a51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GRBJO7Z%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T125650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJIMEYCIQCFr0T821%2FpuycCpCPkgBA9VKN0BpF7WWYK1ErSMyWhjwIhAOcO4TJpQhMpHKQ46ba%2BohxSxa9Wyl2U7pjCXHqcyWNsKv8DCB4QABoMNjM3NDIzMTgzODA1IgzxjmXMbMBYaQIKdbEq3AOU3hgFSaKaBwJEtHcB3FlGZz5L3v4SCVbUGNDZkcPHUgcsmKXZv6UVszuwPB2igVlvsvjfDBy0PubkgWL4SbcjacHsw6VHmFZja08kjH6oNCZJXqdclW%2BnOzudgAUmm0ungoB4cruBT1yMRbVx4NVcB5jBgHvwqFtMYUbeG21KXILF5UDo3CdQcRP6ZbCSQHaBIK0jA%2FOqknyzR4x00DdPD0fI6jA96RPHGyeCtmP3ypJvi3xdbi758fyzmrSjXqGUt90zicfzvfWANF2KiK3oTIq%2F0Wq%2BbDrRVz9igtUYAFOBMmHDVmX%2BlVRXDYr1GQtkXPsNQnQcT9y9dBYN6KDWX4X85E4woBHRX2JgH64zL%2F2S1K9hqffpBz6v95DPMGaThfWlaZhK7X%2FzHvsg5u5uaRKs%2Fa2IpaXzm8DZoENkyIxYFheru9eo9eWtR%2FyDF35uECUYrF54DCERb6pTQyFm5fDHbjZAogrjUvw8dWwYglzZvPFn8MVulGC9RvevTTaeUih7rMKamoVRT%2FlN0YDXSMNCv8PXkVp9bIgCFCx2XDycRPaW9hs%2Bqt61ruGeEdFZt2B0BhmnLL%2BPY6BaAUzOyF6cB4KB5rWGU5YkysQpb9c2tzRYEXjmBGs7XzCaupjPBjqkAbWORxDSit9vL2NQ8wqy7zL%2B4qRgCl4QLhwg8yGealdqNEbQevXgCR%2FFQHPy2m8w4zjHlipG8EFXXkL4v%2FtNNwQOr6mFByIRwyqIvyeauS4xQqlWFsvXB9uXTVqUpdWXAzWE8lLg7H908yMeH4oqBluBxH3l5TXmqPimx26gRkmnkUADaqC3yKBUoQsC%2FYrHgvOIUz%2F%2B510ZI4HnikV7%2BbMi9XpB&X-Amz-Signature=c26f38eb9169f3241f89e6f881880d8f2c1a0324e40e4c556988ad3bacde8a51&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664R2TT5YO%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T125651Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFUaCXVzLXdlc3QtMiJGMEQCIBZXNXDGWhvU8QC5WaMk3y0jRaotpQq2iQQjhB8EnAUTAiBIjF42egLfXzCXgLpU8Yb7hfKt2Kqw6Fr%2F6zrLXlz%2FiSr%2FAwgeEAAaDDYzNzQyMzE4MzgwNSIMeR9MMxwQRo9iMCYRKtwDwu7CLUdpXZfWBSWWD2KFBLmncUC4jZGO2BmCbzssmWtp1bWW6bJsEPok29rpCX6yckrcx0weR4Q2%2BIN7PO2ipQw%2B1X7qhaFEUD8XTJhSpbFL9DIKNngHsMT5RwfcjZBrr8h9vsz39SakO5Bru1W%2BgOXk%2BsWLJ2GJlmSnqgFIhGR4cwjXdsvm0KGyQjkhqsxXH%2BsFtLUWsEO7lla7D8sm4isWGmu%2BcFuB9jVT6%2FINEes93qtMA4sITNozQCO8CJGCDVkeJpMZL9mMFRF84DQam1b4ZinjcrhqAgWe9UsGr5ZJa7WLzGl6O%2FmY%2FH7hL6s2KzUZ58h2SuVU1iA33PMRLmZspP%2BneLocez1uRKGzZS5d%2Ft8UTpS3udQzfrVCL6T%2FRzVUGCcAVPFmr2sPIy6lie8pcYeV4RYDkj8x%2BYcYGqYchvZHXkEAzzQcDscpB70O0ECfiMCoS%2FyEXav5ezeC1HmGTtTfZ6%2FrLXNgwoUQN71KBRYCMqoWypv4Kw0%2F3a%2B2q8KfDL7gMM9mYN%2BXyVvvcsIQrWy9G8LYKo1D2cmvNOWJWRXMzny3c3j2aCz3yfm96nLMGVHmIUF3HgeLAgVlKvU6HgOF1lDID2yRDgLXAnEwlmD6PZIiUVyK58cwz7uYzwY6pgHVmrKwhAlW2vFFeELtMXoiY0gAEstLzyVhI85cChc4H5DIvxYfHCO5p9kX2UDUCNQMnBIc7U8cIz3HKZXyqOfTpkcnnvyofGrwpXKGVWcfNuJwYtubWD%2FYh4aodOvbinebEC%2F9tovfBZf308NCzw2bQfmSLYfC9q5eWNBNkOcb1MKj6VDeVlU2b1pGSpGMktaXV29yNIuQzcaYLx7lskrZF6uO2%2BUm&X-Amz-Signature=027903bb30cf0660d7a42a4db2a8e1162835f53bbd7376f2a2a02bcf7c6f80b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

