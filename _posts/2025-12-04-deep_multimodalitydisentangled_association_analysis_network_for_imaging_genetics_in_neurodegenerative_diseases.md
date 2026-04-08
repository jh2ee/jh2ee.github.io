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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2MCARTZ%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T114224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJHMEUCIHuBfe%2F%2FpUkR96GUa4cAjJXtOBwzLHDmLudsIQKYyX%2FqAiEAxLGFjNmD9T5TsKwtS0lEA%2FNHdkuyGr0p9KN0k9B4n%2FEqiAQI%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAX7y58Lm01jQiLi%2FCrcA4%2FHV5zEwEHGAYTO8eCcBLLTx8PHA%2Fi3iC0V4kvcF9VGEZ1IdZaZgwbTBHHhCo21eLws5XWmtKv8teLhNMD0yUbX3pJoP5XUgcMf6xBhAmdMC3xfyA2ka6qb5r%2FTHjqpRuuk2qHpj38InDoJmKJiuCD2rNWx0GPrNh5vcK3%2FbqG4mKAwp0UgbhyrZFtBPV0wDQsn%2B5Qk1816WwXolnaYu4C%2ByFsQX3mcz28v6xR29YeKuAXWfu8sa7pn6DxuN94f42YbOAH1BHDtfk9aPkP1ohug0ig%2BVMexJ57kIh4uBKoQiEDCskDon3hLrVgFQkQZ0e%2BcmBrRI2Wi%2FZBeixK%2BXc4H86afUAYUxKrZjWzKczhU0ZGGtaicfiapUPqOzOaqXq1npbHAL0di%2FMZ%2BumXYKs5lmckqo3hBoTcQvqYUGQ3UFFXIlkkeXRFrzJeYvQTRxm2Y0ZMRKcqlEjCcqclq7GU%2BwSZtq7WS1mu3dnmgjxuvplJdvxs5%2FwHDEpjDAIZXrM3b7DMDAYfEEIcXAYzaFBlTC89jSLt868yvaQmflw8DFzwp4AIt1XbfVPScQVQbNJRJVM7oBCAALOVClYjGkfuiVwSPgs5Mdb4IGZfNa1PrhqhCgtk9CfvuZti9MLzK2M4GOqUBBcgfPrLSMl8zV3Z49EXe99RH3IBwiHkLTcb9ID%2BX1kWrY32uXApzWvpYNPfFJbvc%2FSOszRBuGobAuwqYg4CAjV8RW2k97b1jMyehjUW%2FFXuHiHnfLZC3QbyqBIX1DO7cg5Yoaw598FQeHqyOoc3lKhr022Yf0K94JB0rU7LSNu5GU4c0%2FQ96x9kXeaeUfWVhc059bO%2FsWZLOQdTyTdWA6TM9km02&X-Amz-Signature=a9ed0fd07ad32f9f408bea6f3dab7c8832d0f6fc444645d961cca27b071c1e3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U2MCARTZ%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T114224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJHMEUCIHuBfe%2F%2FpUkR96GUa4cAjJXtOBwzLHDmLudsIQKYyX%2FqAiEAxLGFjNmD9T5TsKwtS0lEA%2FNHdkuyGr0p9KN0k9B4n%2FEqiAQI%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAX7y58Lm01jQiLi%2FCrcA4%2FHV5zEwEHGAYTO8eCcBLLTx8PHA%2Fi3iC0V4kvcF9VGEZ1IdZaZgwbTBHHhCo21eLws5XWmtKv8teLhNMD0yUbX3pJoP5XUgcMf6xBhAmdMC3xfyA2ka6qb5r%2FTHjqpRuuk2qHpj38InDoJmKJiuCD2rNWx0GPrNh5vcK3%2FbqG4mKAwp0UgbhyrZFtBPV0wDQsn%2B5Qk1816WwXolnaYu4C%2ByFsQX3mcz28v6xR29YeKuAXWfu8sa7pn6DxuN94f42YbOAH1BHDtfk9aPkP1ohug0ig%2BVMexJ57kIh4uBKoQiEDCskDon3hLrVgFQkQZ0e%2BcmBrRI2Wi%2FZBeixK%2BXc4H86afUAYUxKrZjWzKczhU0ZGGtaicfiapUPqOzOaqXq1npbHAL0di%2FMZ%2BumXYKs5lmckqo3hBoTcQvqYUGQ3UFFXIlkkeXRFrzJeYvQTRxm2Y0ZMRKcqlEjCcqclq7GU%2BwSZtq7WS1mu3dnmgjxuvplJdvxs5%2FwHDEpjDAIZXrM3b7DMDAYfEEIcXAYzaFBlTC89jSLt868yvaQmflw8DFzwp4AIt1XbfVPScQVQbNJRJVM7oBCAALOVClYjGkfuiVwSPgs5Mdb4IGZfNa1PrhqhCgtk9CfvuZti9MLzK2M4GOqUBBcgfPrLSMl8zV3Z49EXe99RH3IBwiHkLTcb9ID%2BX1kWrY32uXApzWvpYNPfFJbvc%2FSOszRBuGobAuwqYg4CAjV8RW2k97b1jMyehjUW%2FFXuHiHnfLZC3QbyqBIX1DO7cg5Yoaw598FQeHqyOoc3lKhr022Yf0K94JB0rU7LSNu5GU4c0%2FQ96x9kXeaeUfWVhc059bO%2FsWZLOQdTyTdWA6TM9km02&X-Amz-Signature=a9ed0fd07ad32f9f408bea6f3dab7c8832d0f6fc444645d961cca27b071c1e3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664AKE7U76%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T114224Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJHMEUCIDBB0rmpUfI7Xw0lN7iU4Vf13AFRcaQaOS92W5Yipz3VAiEAidRz%2BvvWHsdSAyLkpYMkshgIm%2BClTbE3fUnSXPfsJokqiAQI%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBI6kj%2BEiAOsMZYHdircAww5MJM5dXstFW6wH8DhSN6bB6tvyNm6opPGY3DdcmxTuU24KNAoWGCCG1wh%2FUL%2FlXTf%2BrGKgh5EdLSkOhcwLNZtF4f7hFYvd04WJiGCYYDYOJ7lCwHeM0qMZvQH1xUNZDU2Dbqxo3V9HzQr4Yj6%2FaGj7Xf6w95I0D%2B2vMV%2FPJqL5ElYgPWoFVcT3o5wDyFrPPIK35YQEVTfLGri0jQR3cIqf9Tx5mJdFaDRlVHJiQERC2uBoFwfnQA2qZfiyM%2BzruuDvOJiY5VnCd3X6u8NjFM1CzJu92ulM3PCV622vL2nAcGylwBHpZScakYSwYDWjA5%2FLxy4qhRhNtP12OSF%2BG290d36NWl%2F1L%2Fcsqo5WETNJObYK59YE7CWpwAYLDLKrnsAulMQrw80WfXb%2BxOkiGmcUi2mFZr3vHM92RZ2j7somDn%2BLCcS4BRcJ%2FVSTOLn34OwwMq2FWpRbAtU9kMNC0Uwe89bXQShGUFX6nznpqz87I%2Bo0zzm9SF242g4wkI%2FOO%2BCR96YMicxNLwux1pXXSuBheK6CD03MKYzw7yz626y5AFq7mBG5pGRGpwqxU3J8JohoCZ6iQRMRX9rrWqsVZNY%2Fms0P2uq%2FTyPped5Y1us7D1Fft1QnDV%2BsqSLMPHJ2M4GOqUB8yMplCiENRoPNi6vbeQ3ZE83xxsM7UtJEoJwGQFu60FWQK%2BCaj62GxXVRLJDgQoNectCITTo53tZTZW0avIEpGqfJeZHVDQbkvZRKa56ZS1pQZME4lV0%2B9kLb5vpWvTK4DHdS9D%2FJ62P3hZnKwiInp1tS34TqxCoZy%2FgQtt7Rwug2QzNvi%2FFG6tWm9pnK%2FukbvlXD7vvT9LtVu853K9%2F69SuvaZv&X-Amz-Signature=85e5fd6aac88458607829b0407fbd2f656d2a7b0849aa13a028aaedcc2d19e7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4UJKDCB%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T114227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJHMEUCIHCIWGjtawWFVkQr6QZUMsPCqdKa4zdTDrjR94MA8PKMAiEA3wzLeJrysZVER4lMqHzT8NG%2B2yMifgmKJYjz2pgOJ7kqiAQI%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP4tC9ahMIPpeorH5CrcAx6rUfcNX5I8%2FkmEV9hpi%2FXviHsVFowlTYalx0bYMl0PDTpyzQEH8TmbBLQ6CNxbdYA1Nms%2FdxWKGV8O5OAm%2FPUflZ2SnOT0%2BoBOJhobVA5IP9dwdboFBS2bAKgTOhAnDrjAv2jV0JPSoVew0AxgciAvkX8hxKYO8h5TQX9r7%2BJ9kna%2B3c%2B5OHzR4B3RSakBy5Y0clCQKgWjAsQtQBkicbMY2Pv4nndeXvgSd1U9C%2BwRyeLKR6Hi2LJG%2FUoOvddx%2B6dyr8Wng8qpmN2L3JV21s%2F80COgLJeZ8eRfOJp%2BQ%2FjcNvyvSmCN518HGd0UOZKdnI%2BN%2BU3IyfiDeh6sYHYDOV2LPLf3Xu8iZls5yGLSkYjFJ3rZ5EY73qm8BFHVp%2FvtlSN5LzeLjYYyGlMMrP6iFQSV4R0HdYTs4KVRXc6DEe5tA43HIKLr3Cr0lfX8X0jfX2teFQ84fYz%2FJK%2BG0Ko5bQobINtLdBWOGbntZ9ne%2BbVq%2F7msLuj%2B7oqPf5QVqXNd9yQdLXYzZPvawx0ogibufc5rYBxvgf8Cqaa5ToqA%2BbY2cGTcq2Fyg5DoVpyVAA4OUN0Ndd4rk71LllpuK77%2BPV%2FmAatQsMKHas9%2BO5B4hMc9fsUDhTYFPNv0HhX2MMTJ2M4GOqUBEdpwlu6z2Auli03dNTeWB563%2BmOStcJ9gTpReAq7S%2FAU9Af%2BqZIqM38x8xK2S9J9%2FjhCFY8i2pJbKlIwW1IPF0QqmXeqDrB17MkeL9Bw465E%2FrfA8fZv5GshE7WUO7AF%2FMN%2FcruzQiAyAL2tRCMYRVWU57lmEQo76MtFmxzKPOIeDmR9VR8P0OzhjApv%2FD9c5Bvf7riaZcUi5RAX12sNCWBs1Quf&X-Amz-Signature=743f8a1a3d00803d9b2d280cb2193af5642be6165a76ee78ea5ede9ace64b0c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z4UJKDCB%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T114227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJHMEUCIHCIWGjtawWFVkQr6QZUMsPCqdKa4zdTDrjR94MA8PKMAiEA3wzLeJrysZVER4lMqHzT8NG%2B2yMifgmKJYjz2pgOJ7kqiAQI%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP4tC9ahMIPpeorH5CrcAx6rUfcNX5I8%2FkmEV9hpi%2FXviHsVFowlTYalx0bYMl0PDTpyzQEH8TmbBLQ6CNxbdYA1Nms%2FdxWKGV8O5OAm%2FPUflZ2SnOT0%2BoBOJhobVA5IP9dwdboFBS2bAKgTOhAnDrjAv2jV0JPSoVew0AxgciAvkX8hxKYO8h5TQX9r7%2BJ9kna%2B3c%2B5OHzR4B3RSakBy5Y0clCQKgWjAsQtQBkicbMY2Pv4nndeXvgSd1U9C%2BwRyeLKR6Hi2LJG%2FUoOvddx%2B6dyr8Wng8qpmN2L3JV21s%2F80COgLJeZ8eRfOJp%2BQ%2FjcNvyvSmCN518HGd0UOZKdnI%2BN%2BU3IyfiDeh6sYHYDOV2LPLf3Xu8iZls5yGLSkYjFJ3rZ5EY73qm8BFHVp%2FvtlSN5LzeLjYYyGlMMrP6iFQSV4R0HdYTs4KVRXc6DEe5tA43HIKLr3Cr0lfX8X0jfX2teFQ84fYz%2FJK%2BG0Ko5bQobINtLdBWOGbntZ9ne%2BbVq%2F7msLuj%2B7oqPf5QVqXNd9yQdLXYzZPvawx0ogibufc5rYBxvgf8Cqaa5ToqA%2BbY2cGTcq2Fyg5DoVpyVAA4OUN0Ndd4rk71LllpuK77%2BPV%2FmAatQsMKHas9%2BO5B4hMc9fsUDhTYFPNv0HhX2MMTJ2M4GOqUBEdpwlu6z2Auli03dNTeWB563%2BmOStcJ9gTpReAq7S%2FAU9Af%2BqZIqM38x8xK2S9J9%2FjhCFY8i2pJbKlIwW1IPF0QqmXeqDrB17MkeL9Bw465E%2FrfA8fZv5GshE7WUO7AF%2FMN%2FcruzQiAyAL2tRCMYRVWU57lmEQo76MtFmxzKPOIeDmR9VR8P0OzhjApv%2FD9c5Bvf7riaZcUi5RAX12sNCWBs1Quf&X-Amz-Signature=a1c23ff672b99779d3d9a2394b744d0a858950b3ea61f7947729496ddd67163b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466STZJGDAA%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T114227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJHMEUCIQC0OHMjf4aVaTZvWDW5CDoxe0HiPohwaETCR2D6TsCftAIgGjmtdREiSZwugPWoJiByRHdPRqf%2BUjjsiA2NdVG2zdoqiAQI%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHF3jC3PW33QvA2b0ircA3EUh0zxt43ZUPmQrjSQtc82B4eP3r%2BmoAMe%2BQXkCaMWNx3rJ2YwHx%2BpLrDSig2OXn0M0sXsWAP%2BOkrIkwcas4Sd6Lnds2C28WfG7HUP7jF8Q4YIpOMmLsIhRHZxGoZdILHrHvhPloYches99bRpDekR%2B8Yop2nFkj9nttfh%2Fgj1pEf4VvAimnfebbOY7Ixopy0i6oKpoaJBcs%2F6ySGyoe5uuncu2%2FMpa4iNjW4YTPi6dLh3SUsywJQTu9uoIlDtJxq4YJ9fnvbAZFaje2p%2FFXforhY8Sm4qXQ3u1Jj6BNnhMnctjFwejZdX0M%2BTKdrTpKDSW2MBYzreea48iYsY3aJgGXpoKkrDLL8rmsQPiE9zskaBqeIhWg6OMJ3naKlc4%2F0kA66fuyA6dj220HaaVbjd40oXGFKnQMrgMHy0PUirunQfX0CoWrm3DxRMHhS0pM6R3sWUqU5b%2FRvYZFfea2eq%2BPEQJEVTPKJeMzSBG4bzybj3y8GcCoQuaLPNby9lDWuUFOj10ZItAViLwGE1JAw%2BaOtuoRNO3IJixl0ksxAjIDMA6QleMJYIqV6ZIsKfGjKmrjeIsVvQpjSJnx9LWRIwrSgW6lKQP33J8TOjQCAKhoZG3NCr7Bjxm2OIMJnM2M4GOqUBLm%2FLFQsw1BIt1c0cyHZwZCb7bSS9PuKuKjnkLPngl4Ow4pWYKLUxqTEbMi88kVmFT1nMGjJx9z%2BaJOKQ%2FLk4tBUkgbi5wRk2PALIzcs4Q8ftooMskmmITyf9Y83MUdMEIk1PW33XrU%2BcsVstJi5CoQabtCzXJ5rncNaLJrvHNML%2BK8yHsda%2FFsaNe4mdqOiR9cngm%2BGEv7Xy1RXZTdkzrAAQStlh&X-Amz-Signature=2479128ca2eda36869b444d75463991cdcc3cb11f6e807373169b585da5dd81a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7ECAERP%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T114227Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJIMEYCIQDuxfpKBd3DfNHibftWE86RsvcL3maUKv2e97AF%2FXzt6wIhAMtHVBwEC%2Bt8MzvXFxkO8Um5%2BCIHPd2Y3FTBcURTSuUlKogECPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyfLJIAb1NY%2FI3h0Owq3AOVSEuywo89ZoxNZ5a9xHECHPm0ElMMwqlC%2BQhCLqwOen3ZC7fPVcb73Yn9ye3mh87GMXdraiEa%2FoHFPXVjS4F4xtztGoVYGVMWZ6OejBwbJi0q%2BnN4HvDLNwFA4%2FnCFmwRaETqZXVKPDF0gA%2Bp6vgQNhqbqx8iYOI2cPoZK1ubv%2FhUdH6J4CRlrvkVcVjqIcw5PLIrfdwDkn1Ij37yeU5ILT09yQkmuFYdoe9zBwVaebjxmJraFKO7%2FWcuhCCBRjW3jTeeHaKNxCvlDr41%2Fpx6XDsRO6%2BewjPnk2ouAiEhsyLmGgcw9ZGI%2Fy9iAfoA0Xtry5m5M7rc2wMD2gv8n%2FZoKNZ9%2FnnN0Gbho6M1c473fdYvDq3uLeAp8rKuUi3BcyJotCDyGXSpEKjj2JLoyMUoZPuDMOzKzHq0Z9AtrnS3ldBi%2FmXIHIq2%2Bx9Roe7D1juWyZcafX%2FQhW%2FoBOSnbUcWcbQWQtvwus%2BjbOK4am1T1fVlYmkWSBLIfy%2F14o1i7%2FFTl4TVT93kCkGbuMwjFWywaH6BCJTnYxhojMJe0KRg%2FKkfZqdhy4a9%2BA9LlvbCSzLoOWWU7lK1qSacdXabCL4IcRVN3U3VnDKsRgHh0g0TwfCNU4D0QO5bo5onuTDOytjOBjqkAYdeSMobUYXgWhuDspYBoSXj0K6gr6CQJ5%2FU8Y4jG%2BCN7GyWJw3wVilPNjonHQFexAvnFgYWXfMjCCtjeS4%2BOW17kdN5lxMn1fN9JybBNVVvuzz2PP0jf2LReSZZdofUERtdZ7r4zV696EweAwQRhZlE9rttzIcb2IwJinU2wxsP9WHGvXHrXoDGY3%2Bez0mEf6y0mtjgkgLY30x3zBCIJH%2Ft0BE%2F&X-Amz-Signature=14a103b28f8f547080dd19fb27a49d73b4400679c96b680e58d2997dfd203da2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627KF5C6N%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T114237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJHMEUCIEsBuk34SDMf6ktN8aIPPTvXLro71fn0mCRFM2fQrtf3AiEAsJBldNVWt59BCXQyTIYq2OSx7uqRBqDchibkU6dAaVEqiAQI%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLQLl428hTJelqx18SrcAxfSBn1dw%2BtuM1OstAeJZBRwVJb0gPI7sSJ3wQNfT4b4XT1jblT3EiHI6Bi%2FtBgtdfdDuxHw8VLY%2BP7%2BIJrCHVS4fRuHMhRWKmgX6ZByM1BPLMjQjUU3zlrw9gKUSzbXFaISvtsRjy6OfaacplUSpkhtqnXUHhl191AD2yCgCAGT1O5kpgIRCkTAS2ZF%2Fs7Vbj2FxWXY5Nd8edOsdw%2BlQp7Y6K5jZL22MEmQkU%2BMCxG1sGY2w%2FF1EB4a1Q2Ft8YFCAOBhU2QFXGmbH5KESm%2BfFnI1NM9A%2BNfupKMje4BVJ9vwznRXWslxjV8nKa9gftcbC2XPst5mrozpHqOivBmK7Ue%2F8m2e7%2BYtXSj7BwP7kqGnXxYk8DXIQcO0AkwM9a%2B6fuMHz5LK9Iijy4VEOln35WssZDCkuyLg1ni21eq0oX%2BqvlHOJlwJbSYqylfn1JAbbl8hVTLAg7szrBhd7jB2QebBfw5V5kDwhwKDLweNgxpxeCXFO61LobdZy2bctftXwnDMkJHAw2hq3I7GhR2u9fABWi0q5Von6Vj5RIP%2BbAzcSgTwYfpmu3tZKvqMuDzWRjNh2tW1Iz5xVtGkt8t4fB6SpwalS7Waqg1F4vc6InlPHz2SaUfMOdZnsj9MNrJ2M4GOqUBHJM2oghws2Ey3krgGfP8I%2BBHN3sm49bEEl%2FXJ17LLDSNbzbNUYJBWtRIxWnZsAceLe%2Bg01XYCWTKZzb3gpXFiHGsfyZCfrI9djnIldU0uiJuuv9mkJCz%2FGyD0uZEXf0vsxRBPljKxI73fr3HvXQqNNmHBENqeFvclUFgT58t28AtnP12XtM5WQbg9fWsYwe4QFkhD1ltxvyVjPUou8w%2FVsspoqbk&X-Amz-Signature=ae143917a52926692f08abf06b85c1b65d24d77535aa5ffd998425fdc816159d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZ6GZQEN%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T114241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJIMEYCIQCTAUd9XmwxiQTU7OTHPnaTG%2F4O1fufWGAZ%2F9doldkhYQIhAPGav9YaQgQJ9SpccR9BUYxGBjynbfr%2BeUleRa07Z3boKogECPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwgQCbIQSQC%2BbmlIQsq3AMPIXqtNPkT0yJ47VPLWFyHLMxMwQV3BtHCTvEc5C2m6hNypch0%2F1JPU5ONlNKeQS4aFdON2ZlKWC%2F21oTLx2ja9NY%2FKTLA0RPCXcNhdJdEqtA34nT7AV1FfUK6yXe3mlXU4rOk4DhdSd3GMlesHNShg9FUvS7pngIaguDcR9DI5e5SX0y0BAC2%2FW6jbDxc4mFdHEOHXHXDjps8Nh4U2xU87Q%2FDtOWN1d%2Bn97YwXGDbgRpsph%2BuDMxIZgfam1vWRpDNcxJZ7zC9T7WvUlFx%2F%2FSUGh5kS0Qse0BJnSyJkS9BFKPsq12S2ajTXUWMPTJa0RDY1PIKNMNCd3Hm0ZvhNukuHJdQmuudVprh2bLYuHbzgndLLKJQ9xRr5nmiu0jgrqoTVOsZNEAN0QLmWZQBQHTqGlLWb6gYgYB2QIla0ybU6vYKizENyq42RWvT%2FgN9FpjSwsrJVpPjR5DfpOpghdnIIxQdby33gfc213D9OpTC3eRR5zZx2s2PWF%2BUYKlQdPIDMf4Z9rmbNA5NEXHbmQ%2FDHSCQWwsXp5Z%2Fc%2FcwBU%2B6qr5A%2BL%2F15KtMPC6QAXAB8Hwcw7tvNvcad9HJuPfKcklZr0Rowk%2FymezFGNr8L1LTJ%2BMtOXhWKsQLtdI0OTCZzNjOBjqkAY3OGbT60zW1b4TFCFNjIy1jRvIlG63CoyQA4yHYsKP%2FUH6wLq56pLCagncVrg7IcNBNjxr%2Fad8YDkUliL%2BXhPkg9tZHRpGs3T0A9t%2BTmqij%2BhBMMXdbYFONYSNsp1juP8cQWKniD8jeLvUrNZ%2FDAkOc%2FL6W30dUED%2BrZobQNd%2F1CDAXqgqDLJPdZvdbNGKynlkbyG2XqI7yMAe%2FhLlXKk5h1uvn&X-Amz-Signature=dc01abf4bb98d2d56c6df8175a8b86c81299a23742217a8b1d38b867f4f8f7a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZ6GZQEN%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T114241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJIMEYCIQCTAUd9XmwxiQTU7OTHPnaTG%2F4O1fufWGAZ%2F9doldkhYQIhAPGav9YaQgQJ9SpccR9BUYxGBjynbfr%2BeUleRa07Z3boKogECPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwgQCbIQSQC%2BbmlIQsq3AMPIXqtNPkT0yJ47VPLWFyHLMxMwQV3BtHCTvEc5C2m6hNypch0%2F1JPU5ONlNKeQS4aFdON2ZlKWC%2F21oTLx2ja9NY%2FKTLA0RPCXcNhdJdEqtA34nT7AV1FfUK6yXe3mlXU4rOk4DhdSd3GMlesHNShg9FUvS7pngIaguDcR9DI5e5SX0y0BAC2%2FW6jbDxc4mFdHEOHXHXDjps8Nh4U2xU87Q%2FDtOWN1d%2Bn97YwXGDbgRpsph%2BuDMxIZgfam1vWRpDNcxJZ7zC9T7WvUlFx%2F%2FSUGh5kS0Qse0BJnSyJkS9BFKPsq12S2ajTXUWMPTJa0RDY1PIKNMNCd3Hm0ZvhNukuHJdQmuudVprh2bLYuHbzgndLLKJQ9xRr5nmiu0jgrqoTVOsZNEAN0QLmWZQBQHTqGlLWb6gYgYB2QIla0ybU6vYKizENyq42RWvT%2FgN9FpjSwsrJVpPjR5DfpOpghdnIIxQdby33gfc213D9OpTC3eRR5zZx2s2PWF%2BUYKlQdPIDMf4Z9rmbNA5NEXHbmQ%2FDHSCQWwsXp5Z%2Fc%2FcwBU%2B6qr5A%2BL%2F15KtMPC6QAXAB8Hwcw7tvNvcad9HJuPfKcklZr0Rowk%2FymezFGNr8L1LTJ%2BMtOXhWKsQLtdI0OTCZzNjOBjqkAY3OGbT60zW1b4TFCFNjIy1jRvIlG63CoyQA4yHYsKP%2FUH6wLq56pLCagncVrg7IcNBNjxr%2Fad8YDkUliL%2BXhPkg9tZHRpGs3T0A9t%2BTmqij%2BhBMMXdbYFONYSNsp1juP8cQWKniD8jeLvUrNZ%2FDAkOc%2FL6W30dUED%2BrZobQNd%2F1CDAXqgqDLJPdZvdbNGKynlkbyG2XqI7yMAe%2FhLlXKk5h1uvn&X-Amz-Signature=80a6190a8cf2f2c852c88d83184e2698c470cc273fa738ed777e436f02a5413b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOUZ56PV%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T114222Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJGMEQCIDg6YpE33yj3zsL1mZfXUYIM%2BVC4zoBqB4q3T2Hqbc%2BOAiBZassCJ9yujMBIoh5ouMpsXPv%2FOXX4Uc%2FsLGv1hv72wyqIBAj7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMU0cUgaj9dMHZVGV0KtwDJeyQxShXio8H8DFDqO%2B5qQfxcmtTu4e9kyk0R77MOwVGG5BFMVX1fPgJwWVK4%2B5xUlolc4va8Ob6oLghvVFOypjedQ6fbmD74cXPDLBfQkq1JStNCqT4qxgD5UyLzONevlv05VlgyYBxvwDs9mHlwbTn4KOYloeX6QzKD36m8xoVx0ropwfmVmN5DjZEd8Q3X8it7hJw6yzOP8bJet9O9CX0iGlSb7KomqVKh1nNqNhm4BaW2Z%2F%2F02gcBSQD%2BC6yFmtUPG5mDZovrI8Xr7bMWSv9cBUby0q1CKY9KaudZnmcpwyvhfGtppeL%2FjW9Mb%2FndEVgdeM5ZFZQp%2FLmz541cKQLlv8qHX1A6yH%2F8zlV66hXXIPybZptJc8jB2Ig6%2FXvi5gmh0Zb39WA7Az4srk4bs6U4H8AUdSFK1WzHGBZ5azAr61HOt%2FsH4qY1b0xbG90DWPu50izXDPPX%2FDKM%2FFHk8sQ2bsgvoUlulFu1pQmDx%2F7fw9qBas4sgfc62B%2BbmZn3HVPfA4%2FGHH5Ku40yR4zOgbD4%2F8wsNs3HKuRutnlTWlkLf7Bv%2BqyF31yeNyncPOcwfNaruYvNkpC6nnKgGXHrx7bLtlqAXohZSQFNf6L12OVRkG7cDw59dXJSG4wg8vYzgY6pgGuozB1cTQTDLMTfOr%2F78TwfJVsQ97VgNTlN%2B1hD92fUVlEo1ffGd9aBKYEyYtOJ4lUUpCFMeD1U%2FYNCKEWaMCSWiSYWC6bWmB6uNQU89Pds%2ByCfPhyqfMr2EC1jqgIh53GrrEnfSpdcHf8TQ8D3gCUTp%2FW5PhvEO%2BZ0y1NxHUA0mxRCYBZlOjkqc1zFuqROoF2igXCZf5msFlUsE7josz15YHSolY9&X-Amz-Signature=70ad97a40cd3b66e6470eed419f589eda5eeddbb97134dc1effdd457c5d45f4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664H72BKPN%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T114245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJHMEUCIQDhcbo2Q4fR9GjrrFVFG3R8g3PZscx8OVhzYk56viWb0AIgGfZv36WxERE6y9ei%2BQ5MCfWYBAiYll9yVP9UbcUj6BgqiAQI%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAT91zlXYiBkC0pHhCrcA3AF51qzt2xxmbyWxMHJf2X8zSH0nJgok4nmU5NNxt0oM08%2FzbICTLp3lqWKjmD9%2FBeLaCJkFnBzHO48BsaXkE%2ByK8XKRHfyB5u4%2B8Lmlo9qvxpGIxKLpMuGy%2Frrbwyx76BTyJGCwnp%2FdibcOKtwnkp2lqIs8laQgpoN2M1K%2FVFIvNsdezokCXog24wZgArSXdvaq%2BYqOaFUNC%2FPJsMQ97sLFBleYjGiUYUK8IRqpLeFCVd0lwLgrXtV9KNGrxdWkyi1PruHepB7KtBSE6MLWnfIOVsIjwp6xlBaMpxX6MrCnhba2oOS%2FXNk9GAEHh4jPMO8DcUX2X1iz7jDAprxDqONuhlmw9awZHPFX2KBRi5uZrclYQ91gqNI8srwz5eRfDCPwEXcofaq11Jfyv0H5UJYV7zABdP%2Be48jjGrPLsMp9pMqGLKETo730lKKTW2MxA%2BsNgbI5%2F6vtOnqOds%2BTF0XcgSf2mcIb0zTdg%2BejsYi%2B291%2BrpPfSgfGhneGak78uzFS9%2Bt8x1SUpk8CqCrFiBsa5wYhcc2AYdE4yBQPOhTTYih5UBS3PhtU9khNHOALH1U09nk6FhnLCmAHgZq2CkGcTF1K2dN7eIY0YhCVsObBaFoiEdWZTPT8RwGMITK2M4GOqUBf9MwhoPB4J6cUpBW4KO0W28nSfbrnoUgyDz9OhlOmNI3ffrjGbbsoTcUY8EFXhe2we6O84F%2BTt7Wp6YteS1mZSMnjNxespWOx9wkIJ6sFdHtxGN4mo%2Fx2jVizJj11S%2BJuv8ogC4a6hnrODQSwiShS%2FpG64%2F1tYbGc0wQgiy3JLQqzij2%2BvWoSRS1eCrSF3UzuK4au8JF9pv2As%2Fah0C252d1jX6F&X-Amz-Signature=5628a217b842d28359f8e1df1ec75068105cc0e27cdec20190ba8c202ac767c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664H72BKPN%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T114245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJHMEUCIQDhcbo2Q4fR9GjrrFVFG3R8g3PZscx8OVhzYk56viWb0AIgGfZv36WxERE6y9ei%2BQ5MCfWYBAiYll9yVP9UbcUj6BgqiAQI%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAT91zlXYiBkC0pHhCrcA3AF51qzt2xxmbyWxMHJf2X8zSH0nJgok4nmU5NNxt0oM08%2FzbICTLp3lqWKjmD9%2FBeLaCJkFnBzHO48BsaXkE%2ByK8XKRHfyB5u4%2B8Lmlo9qvxpGIxKLpMuGy%2Frrbwyx76BTyJGCwnp%2FdibcOKtwnkp2lqIs8laQgpoN2M1K%2FVFIvNsdezokCXog24wZgArSXdvaq%2BYqOaFUNC%2FPJsMQ97sLFBleYjGiUYUK8IRqpLeFCVd0lwLgrXtV9KNGrxdWkyi1PruHepB7KtBSE6MLWnfIOVsIjwp6xlBaMpxX6MrCnhba2oOS%2FXNk9GAEHh4jPMO8DcUX2X1iz7jDAprxDqONuhlmw9awZHPFX2KBRi5uZrclYQ91gqNI8srwz5eRfDCPwEXcofaq11Jfyv0H5UJYV7zABdP%2Be48jjGrPLsMp9pMqGLKETo730lKKTW2MxA%2BsNgbI5%2F6vtOnqOds%2BTF0XcgSf2mcIb0zTdg%2BejsYi%2B291%2BrpPfSgfGhneGak78uzFS9%2Bt8x1SUpk8CqCrFiBsa5wYhcc2AYdE4yBQPOhTTYih5UBS3PhtU9khNHOALH1U09nk6FhnLCmAHgZq2CkGcTF1K2dN7eIY0YhCVsObBaFoiEdWZTPT8RwGMITK2M4GOqUBf9MwhoPB4J6cUpBW4KO0W28nSfbrnoUgyDz9OhlOmNI3ffrjGbbsoTcUY8EFXhe2we6O84F%2BTt7Wp6YteS1mZSMnjNxespWOx9wkIJ6sFdHtxGN4mo%2Fx2jVizJj11S%2BJuv8ogC4a6hnrODQSwiShS%2FpG64%2F1tYbGc0wQgiy3JLQqzij2%2BvWoSRS1eCrSF3UzuK4au8JF9pv2As%2Fah0C252d1jX6F&X-Amz-Signature=5628a217b842d28359f8e1df1ec75068105cc0e27cdec20190ba8c202ac767c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RMDR57Z6%2F20260408%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260408T114245Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJGMEQCIA0cczdKzq47H1nj5XJC8hvloP%2B3nJJf5HbAgf4zKyA7AiAjCYeDV7kZdZlbVIm%2Fyf4JyUEwCiBfwkyGTGfkHSIJlCqIBAj7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMytODq3dm1kB%2FN%2F1cKtwDaJOieEhhRImU%2FhapC3JD3AOcMA69gH8EGN44YTsIF2jZBj%2FXGYiYz4DPWO38Sbyl7Rq882trMRcHS%2FlxK3R9Xafs3zreI7%2BSGruATUhNNH5B6%2BIs0r0PxbZnDvnrkhziw5V65C1sD2TWz38dYMBJXc1spAAcSl6HNlqC4Ycx5%2B3Ovx78egfcAmaWU2K5kbdAk70qG7u7fzz8GLaXcex6U1KJ%2BqUSD%2B6amE%2F06PGKuQt35giPjJNDjZzqtBHlGFV%2Fy1jWzHBWPk%2FD6BZ9BZMF9LsUVupu8llJGp5tc7zJbuXcWS8nts11jMvlcWAzL4QLqtKDNbZf5zz0K2OZoULXToYMRsIMymO9y4jji%2BJeB12mhyIuys04NAm6UvwXrciDKfUObRJ2%2FcreVRRn%2FVKj6nWOxptODpMCZjpjORfOhzecBausKh3OFOg4633hzRsRqtTwV0FJIdcz5eYLCKkSudl1VvPRanc59N%2BFPWV705KSMtAxs9EvVp%2FUACIbIeiVGJb3o%2B8zRNaITjmsoZLIGoLsPyoiqr4%2F4oF9N6trmcnlIEKYixTZpEPj9yZNAtWZygmGjdMy7Ryi7WA0xBSmVC%2BTP8UJ3z1QjeWOCaD754PfXSfaAR2CiaoG0aAwz8vYzgY6pgEvlypAzWmMUghv5FrVtnLLC4XilrSTFOhnLBP83s%2BkT4cJi3aqNelKak5fCks1jvCnpSRih2Hal6yN4qSWJkgDvp73dmz1YpEenKdmztW%2FryEYMEiUOBWDoyQbWyXUkzsVU5NCSXZ5HLORVe5sTFClZp%2FYwwo9E3%2FQ%2F1KM7M9lQ59WWvzSjrnhLhiZGmmtPnVfKaXgnav3%2B0i11sUKoiAV7HeEKHAy&X-Amz-Signature=5c5b547c86ea329633d15d1d9487144b7a34516ec9a0381e6d84fd96a1a1601e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

