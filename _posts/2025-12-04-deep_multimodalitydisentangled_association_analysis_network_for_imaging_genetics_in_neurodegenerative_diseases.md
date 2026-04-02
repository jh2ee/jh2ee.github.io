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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CT23SMX%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T094716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGnMtQVCS4HaOfBkk4YRmnTP1MZXNEYNJbUuQmbh0GXbAiAWtUlfhgLGZyN6OG1T3R7fPSMGodgWACDeIMmfrb2iwir%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIMmgjTADfBgqopLOmcKtwD%2F5khvu9maHzGNeDkpoyPp9NeFcI7RPAkPpesjTbL4UDQ3YpFL%2FxC%2FjSnXOnDjKUQeNeRf5yM97NXxxXPop01npykufuSsEekVRnPyavNjridPcwQqTwLd9DLGx7%2B2%2FBnuvj8v9z1hRP%2BiFDoJrpMtlbTOeMv38GPkYRplDFX7eMc%2FEljyuzOO6Glu29B7Po%2FFBpGbliilAlUfCvyaPnZKUXuoTYr9eysw%2FmPgcfyz5znxFqvhXoPwv0TrjatzJuB2QfkEbHx0NwCV6iW%2Fu7dEIZalHRUhHpRE89jtJuq66%2BKxQWgVkXrnoZoZunAo2QYd67Ae%2FZCpTwa70SXSijbRqDMMY%2FPOWAYJyLlo6Zk4lsdgh3Rn4%2Fx8Yl1cBfuqhqBX2A%2FpJ3rDJBRE%2FPK85gEMcAw1H29LuXKxVcEk92P2x29hrIpmMan6qxXNEoS6L2tKv%2BOLKTk%2FVqQe2ABKG2ILg0pBpUD4wR481bDeBysj8EDvS6fXP5GWSfRVVEz6diLCRpQOhf%2FYay%2B7rxIkZ%2B3gmWTQ9h9CKSF8YFJQ1HPR%2B4LoP3AWqZVrvzxtAt658wp8wG%2Bd7wBSvAQIgcNcQb%2BHguz82GfWoqCyEFevC4MlQ0MB64ZYhYSgfoEK%2B8wksy4zgY6pgGn09IN6SEUciZJxeVAllewhel8TSE2onPCYQKy3Kda%2BSFGjcBDGeCxC4hYoRTJEZR4L87XNNbt3IPWDbnZqacHYiQJGa35hL9TPNmnHuTvS20Seg%2Bq5ywBoR%2FgXm%2B9AtqloJV51Q1E40ufxp23WYnfWfUBLxnUitH5qKolQOrDJrQL6rvCt4pRd%2BYPy0OtTCPTsOjZw6x5IsutKPIGqLNKprz6sd8M&X-Amz-Signature=28f4fc626204a992fa07533441e3fd5e9ef9b2e1857d64bed4769a97a3f1f3b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CT23SMX%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T094716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGnMtQVCS4HaOfBkk4YRmnTP1MZXNEYNJbUuQmbh0GXbAiAWtUlfhgLGZyN6OG1T3R7fPSMGodgWACDeIMmfrb2iwir%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIMmgjTADfBgqopLOmcKtwD%2F5khvu9maHzGNeDkpoyPp9NeFcI7RPAkPpesjTbL4UDQ3YpFL%2FxC%2FjSnXOnDjKUQeNeRf5yM97NXxxXPop01npykufuSsEekVRnPyavNjridPcwQqTwLd9DLGx7%2B2%2FBnuvj8v9z1hRP%2BiFDoJrpMtlbTOeMv38GPkYRplDFX7eMc%2FEljyuzOO6Glu29B7Po%2FFBpGbliilAlUfCvyaPnZKUXuoTYr9eysw%2FmPgcfyz5znxFqvhXoPwv0TrjatzJuB2QfkEbHx0NwCV6iW%2Fu7dEIZalHRUhHpRE89jtJuq66%2BKxQWgVkXrnoZoZunAo2QYd67Ae%2FZCpTwa70SXSijbRqDMMY%2FPOWAYJyLlo6Zk4lsdgh3Rn4%2Fx8Yl1cBfuqhqBX2A%2FpJ3rDJBRE%2FPK85gEMcAw1H29LuXKxVcEk92P2x29hrIpmMan6qxXNEoS6L2tKv%2BOLKTk%2FVqQe2ABKG2ILg0pBpUD4wR481bDeBysj8EDvS6fXP5GWSfRVVEz6diLCRpQOhf%2FYay%2B7rxIkZ%2B3gmWTQ9h9CKSF8YFJQ1HPR%2B4LoP3AWqZVrvzxtAt658wp8wG%2Bd7wBSvAQIgcNcQb%2BHguz82GfWoqCyEFevC4MlQ0MB64ZYhYSgfoEK%2B8wksy4zgY6pgGn09IN6SEUciZJxeVAllewhel8TSE2onPCYQKy3Kda%2BSFGjcBDGeCxC4hYoRTJEZR4L87XNNbt3IPWDbnZqacHYiQJGa35hL9TPNmnHuTvS20Seg%2Bq5ywBoR%2FgXm%2B9AtqloJV51Q1E40ufxp23WYnfWfUBLxnUitH5qKolQOrDJrQL6rvCt4pRd%2BYPy0OtTCPTsOjZw6x5IsutKPIGqLNKprz6sd8M&X-Amz-Signature=28f4fc626204a992fa07533441e3fd5e9ef9b2e1857d64bed4769a97a3f1f3b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LVGBGJE%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T094716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCYgOjzk4w%2FfZkrEegfv4E7dLwYZGBK%2F9DNeEEaleo1%2FQIgbUGMk%2FwaMiUhcEu1ToRoBcnfXG9fkgJghVEJNRk2oysq%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDNifmACg1RSlU4LqkSrcA77RnYXiveil3JAIjRUnOfituldxRFSlo1ot%2FMQzmzWXicRC4ByrxjivPr4qSmzh%2BFSWI111obZITwXEv66a7uD%2BflmHYJ6ebmVU0QIoc%2FccO%2BPcfdKNUglPpKrzRYoiDzxFzJP0MJRoDoQtYjvCcikVklEQtNKcVJbA3fjmeDjTefjyP3ZM6RIPI%2BvkmA47XZKnPOvvZceJRKk4Dsqhdox%2BKX%2Fh38tbKEM3xeaqkv02bpiKwyc7Zh%2B1UoEA5EnwbMb8ED%2BDJYcQ9mj6%2FjkQ54ihcMb1bh2JVcKEEaXelDT7K1E6ByWR4l3q7N19pP2p%2BfzrKOoX4JhS5wlrKKqkmnzg7%2BETIMtcbG8G4q3Pm3x4Zb8JJiYCtAr1qjJK4ZC6fP8nA0JKFvkFY5fcp2TwwlSTHlFhHv7Sao2FfURCRxzqq2HLgCQEz3JLuXrxiVgK%2Fo8UoEBNq5%2BA%2FRpRH1DghdhQX6x0%2F7o1tXpgm0xWcbxJMgF519d19nPmIhuXA1LWQWOCRASs00rf%2F%2BkuNPMLt%2FzL1SC03MdP32y6Xvx4X1ga8LJtCKIP4LcKEMCiO5OicHAEDiMSYmu2AueZ%2BndJpXJyKH0NVtHrB53kPfvJ1%2Bj3rfz7GZyGoYc5gSQaMMDMuM4GOqUB09Sfi3%2BsLVPNdkdCU1EKD5z7Eshp2NVigLOPNHrqxoK0Rzb8vQZB5DfzOAHAdzpmtJFJmY5WUzzOD%2BubXKu2M7%2BuQW4ztk285rHO%2B%2FDPK0hBUEERjneadsDqYQgIXoqWEozEktFxrHIDqw4QpIV25NrlId0VPG21vdqZy0TN1czWZOZSuB9ZvMU47qXy33YZ4JhO32KBzkK3LsQ7wnydq8mjhhQ1&X-Amz-Signature=3dfb0c25fc6fd4c9929a3fe6ab293246390925b73a6fa44c3103e84d4fdddfb4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZYQ27PP%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T094721Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2FO3wH8H3IZHcQ4f81t6ua%2FQNnrmuyXz3nw81owllOSQIhAPV9qEKCOJjRqO%2BkJMEoM2xYEAqs1bDdT4n6jfH88MmFKv8DCGkQABoMNjM3NDIzMTgzODA1IgzDAA7TkG5AgU3KJDgq3AMb5MwAUJUX80SFySXuYr4R926SvUirPRUFXpMP1U78qfnjuhF6GwxaEo1NBl%2FYi80pvhNSXHeDsxDYRdiOBLyPsuqF%2F0TqbqoATJXC9ZL6cW19LgZhJpVbddGC6m2qVVtjq9FPD7MFcDtGM%2FPre0DSzn3tb9pFUS9gwzeCkIeCV7PXdyVheujwdMCyXWSkoerpaCfBJQcc32hovEHPu5iUrcWIAa6fH%2FziUXKASzLcSCEmU3nKn13%2FOnX%2Fg73FHpa3GeGIjCT2kmC6gOZAJqi8crmHEfRlF13wTqbUOsUCCB1fpsH%2Bi2gOteAGIhafOwKRhy5qDBYT9QYMFcPF%2FVpuRF6DXZXCMnF5naeJa1wr8rGjk0Oz45tfmGB4di0gaTz5jodeRHYmmYdmuFomFYLTgioVRZIc953tHKGLfJ6gWyzk8JmWhQw%2FWULpYUKDd0BzYnNHLDPncpWqfAnCQ3RhQu0PikUyus7Eys%2Bgn3bhO6xV7h87fuFCYvK2CPv89RmCJSQlnU%2FE3E%2FOczrX9KJKITHDNSYRhKHm41wDDPE58pwyHvHmUv3D3AbWTSx9oVvUiBXTYmT542s%2FCErGqIoaDzok38Fld49t0BK2PP5pkk1qD%2Bv%2BHfZtaOcJNDCszbjOBjqkAUP51eff%2FoWKHBNPqTqzo2eb2gliVN4ckIxXh8clEjQH%2FzJdShCK1mJESUasLMeCtKpbfyqxfyd44zIMnzXMnumPbrgovj7cPELCvv4UrIvi89VzFAZdxRwwJkZj48RhAOk9kuMST%2B%2BLLhCMjY%2FeviphuETlMl8Eyo9D66mkqlTeGRJrUQxwi7jlJeecKDRjoIg2Q13fi1eW%2FpRR57anNhMu2adl&X-Amz-Signature=c2e7bef806014346e92041f0521d5f4288c2b4b8e5f74a97bdd256e02767f660&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZYQ27PP%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T094721Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC%2FO3wH8H3IZHcQ4f81t6ua%2FQNnrmuyXz3nw81owllOSQIhAPV9qEKCOJjRqO%2BkJMEoM2xYEAqs1bDdT4n6jfH88MmFKv8DCGkQABoMNjM3NDIzMTgzODA1IgzDAA7TkG5AgU3KJDgq3AMb5MwAUJUX80SFySXuYr4R926SvUirPRUFXpMP1U78qfnjuhF6GwxaEo1NBl%2FYi80pvhNSXHeDsxDYRdiOBLyPsuqF%2F0TqbqoATJXC9ZL6cW19LgZhJpVbddGC6m2qVVtjq9FPD7MFcDtGM%2FPre0DSzn3tb9pFUS9gwzeCkIeCV7PXdyVheujwdMCyXWSkoerpaCfBJQcc32hovEHPu5iUrcWIAa6fH%2FziUXKASzLcSCEmU3nKn13%2FOnX%2Fg73FHpa3GeGIjCT2kmC6gOZAJqi8crmHEfRlF13wTqbUOsUCCB1fpsH%2Bi2gOteAGIhafOwKRhy5qDBYT9QYMFcPF%2FVpuRF6DXZXCMnF5naeJa1wr8rGjk0Oz45tfmGB4di0gaTz5jodeRHYmmYdmuFomFYLTgioVRZIc953tHKGLfJ6gWyzk8JmWhQw%2FWULpYUKDd0BzYnNHLDPncpWqfAnCQ3RhQu0PikUyus7Eys%2Bgn3bhO6xV7h87fuFCYvK2CPv89RmCJSQlnU%2FE3E%2FOczrX9KJKITHDNSYRhKHm41wDDPE58pwyHvHmUv3D3AbWTSx9oVvUiBXTYmT542s%2FCErGqIoaDzok38Fld49t0BK2PP5pkk1qD%2Bv%2BHfZtaOcJNDCszbjOBjqkAUP51eff%2FoWKHBNPqTqzo2eb2gliVN4ckIxXh8clEjQH%2FzJdShCK1mJESUasLMeCtKpbfyqxfyd44zIMnzXMnumPbrgovj7cPELCvv4UrIvi89VzFAZdxRwwJkZj48RhAOk9kuMST%2B%2BLLhCMjY%2FeviphuETlMl8Eyo9D66mkqlTeGRJrUQxwi7jlJeecKDRjoIg2Q13fi1eW%2FpRR57anNhMu2adl&X-Amz-Signature=2d14a409ad976209a323f4af1eaee24a60509a4b72f520b6191e50b8588fdb03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VT36G372%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T094721Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAJ1UMvxnx%2B2HlPIboga2CTH3NSrCykrlMegmAUZIfwKAiEA239duSFQHxqS1KwTmky%2F87%2BFlfk6FqvIvVi8tk3BuNAq%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDODI4u6HhqRuoVdyNircAzF0bQr%2BiK4%2BuLbRh8LIxnY9rA0XXhe80SORZEVJCA%2B5XvBZTzdsvSA6Ax8B5h8bi4oifY7YhuepkYIdf184nL%2BfXyZBmNA3dzIX%2F7pa9whkO3vxtJnCyF7Xofs4vuiFYPV0TlmsHaUJEC3G57O1JEUbnkuG7mZoDi2AnIjBK%2FO1yKA15bW%2FXZSJO0R2poFmo6YKv2rfEB5N%2FF5Jy%2FjPBgiaUrwGlKt3g2%2FkOGLY3uiWr5jeUqcodOJ35F9TLUsLguweDFzrE3eKvwqaFoqVE%2FFCxL7M9H%2Fyj%2BMyJpvJq2u3Hg9JshJt4OEfVgHOCUn1RA67%2BJhI3fJudw%2BaCqRJUbTaGYwX%2FuFF9zd04ZG13SiH%2BMAwABY22L6Yqp9n6O3AeDTSRk1zTB9Aygk4WBKZB6QpHDEn23D8%2BTRKFdT%2B1z3Kb9z8A6k5qRKTbeBSdXmjptpzUgDlXgg%2FKEWZyFowgODxeFgTHY7CYLGF7%2BiR%2FTpWMfy8mgVSs1PUxzY2pTrgmWnrzj%2FRofU5BRYjsdDMPaVIIPRO3tK4TcAiJ1ZcDg3v4Xo1GBAkSIbtEil0OmdeQiO%2BmXADXu4DDq9krkDdnryE3UzO9NmPMJoUPQSJnTjXzaqMrcDFv9iLW0%2FoMPvOuM4GOqUBZbr39WI%2B%2FJirUz6UUTRdi3HvwixxpTRzKTXDoT7CqoOwTfjJavli%2FUkvnR0%2BKL39%2FjduaEMBkpeMRNn4REXEYc%2FIFOEGUAMGMFbatgGHNR9yAQpZ68S0K4i4IDZD8RgEBfx2b3nbByWOgP9HApGWROmGxysU1Zg42EHIMNvsc78HOu%2FJhk%2B0ruoj2swq0IzEzLhtRhQ5Rr5YbbwQrOPA5QHupNhi&X-Amz-Signature=45ea03962b6f5410157ce7d62b3340d690471386bd67d23773002a93e97f66b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663R65LUBX%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T094721Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDfGoo1RNatyPh%2FplAEfGtIej%2Foz960ViNUe1NHAPsmtwIhAI0wGOQWdW2YZ5K%2FLIj03klQtyluXQDyJWDUQvWQkxE8Kv8DCGoQABoMNjM3NDIzMTgzODA1IgxLjxU0ZuaaypwmwzEq3ANFrc5NdaPwp5tMmLQU0%2Fmw%2B1htsjg5YpKXJimx2%2FQrnHzRzekF%2BYdLIrOJlB3XKHWFlrbjk54SouOapr7%2BKLIaMY6nLPbAlRhvhokVIcbjRU%2Bp3ENfYA7OgdWcezOgsSZJeYJm0yfp%2BPLJ6AO3PDzdZsBVn3Gsghi4EjH8g%2Ba%2Bj5n0LeiKtbMysJ9oN52LRfkEQyeXfs%2B8xrDVlB%2BIEa3gHGEHP%2B8vOaxMtrqFqmPoDn28aKs0McOykAARG9qja2MB9dZ47GAd1BG57b%2Bb7rMNtQu0CSASIA5k1Sh630rTZkFz0aAkkK7WpWTaStc7QMy6Z4pPc9gk4fbzixnszRRZVvJRgtSh36UvaNuUBDvjBnVS8pcl3aAqDpRGTTBdLlJoLo8%2Bb9hGUnJoHwBnyvhPVaVq%2FNaijXfyybz1l3tUTzV6pLV5WWY1iQ93UNIAzYGu3UWkAst6e8luqDCeRI0aNiC09hlzJeuSbKbRuoMNr0%2BRpxOlJ1FsDVE9d3WroS0GG5D7WUMaJalj69N0%2BvqZ2Qdl98YF9jAb%2BFgERaDkon6c180MwQa%2BkAv10LiCGdCu7BO%2B1KX2%2ByIcZNOV1tcYMbxCcinYfNlGo2SVzlcRQgSxEwtlSz5oCDZK%2BDDGz7jOBjqkAeOT05XwLQ1hJFswNEsax6eI7vJQlQH%2Ft1Q9Ip5TlgSx55e%2BWXup%2F4B7nSbMFaIdSfuBz%2FTNcS6RsPK13aj2OKICxvFjQQtYdz26MJczbtc1jHM5HeFDmZyQ88Bn%2BSyH7c1t0BsnYtyXqnwf1cEFfABWzCwbxMiFYqnxDxsDI%2BWhDH0IeALOa3xDNzFQO8txvUjtKNyigaeIxEdxzddzbse26bvF&X-Amz-Signature=bb7f833c210619756c478b79c3aa65e009be38d3c37411a147477b2cd2d420f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664C2YXNH7%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T094723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCb%2FYn24VBwQ0O9lT0RkcGyrsx3SuoQKNUhVQyNrpL3qgIhAIz5RXjlJaXLB3nZx8qxfdqsCT0tgwcAk43xOjYLDr5xKv8DCGkQABoMNjM3NDIzMTgzODA1Igw0Df7od9RvSuYu1Ykq3AO3u%2BA3UZcG6o3bLgXSdxPVhbet77qR%2FqXLYA3jI%2FZtJCVBL%2FZNGt%2FXkOPBehiEtisVHoK7fPS1%2FwtxqfbYZhwzRZuRX86%2F1VMfqFd0%2F%2BCYDO10cPqVo9oTKZ%2BZ3NnP0RTR5KR1zl3FJreGUBseaqf%2FX%2BzPXxwi7OR3iu7xSnha%2FN%2BIeU%2FeWUAslAvQ1%2BNsw60jVw00DPzpNiZFK8%2F1RHZcFjAO0xQ2BPAqoOH7y2h3Lox7Euv4443HosoloagKLgwolGEMU27%2BrRnnAKmx7UcyCr%2FtFJl3g7mEDiapOETU%2B3GjwedT00PRgHKEuXrpaj4cByfhbNr3OZGJD2aNY3tsz5wSffOCQ7mfPrmx4qc1TqID7RJ89DNWuOlDIYoYe15X7TzU7EZhIOFqRkRcaNYQmUzoszD0GU7p8iiyUCY0xT8HIhWTmP0JbsMrZoXOrKcCUC7FOExPZtMcWJqGcHsviaZ%2FSrnEGuFVi0HZwRtPnKoeKs2jTGLqrdPTaXoupBQjVP8jezEDxBXxE0S59HYJc2aF7e8B%2FSrbLzj1zdzrz331PLXrz5shhRR4mW%2BIOMC1OtmSv6hYJZqxBqX17XdeYt6xjz7e8%2BNrAMGR9FblpC2lVR95%2BdhPBm3K%2BzC5zrjOBjqkAT3cim7DFS%2FFwUPpzGp%2BYemYaLI%2B46If4uToAp2pvRfD0BmbO3TBHAxdU69gDZHXQMBYea1ufohrDvUDN8Tpf3EqSeNshUEtHe4lpAmWv63g%2Fus6D1QRoG5H2xj0XdseVEyM0C6GfZ4Kea5%2F%2FqtnNpLREgbPQiYD0tqnq3tkSh2%2BKcTT42Qlj6sGC7mEUYeEVdrTpQIkbfPZqanBZ82g%2FDS0Bjt%2F&X-Amz-Signature=6b00b240a84e9c3affe8399fcd5344492813a5e914f2ac5e21e9897e326058a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQNVXFUW%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T094725Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCHKlMdrDEOIzyE2a7FbV0m18i0O66FtFbVfGgNh%2FFY9wIgEyLP%2Bl3%2FiKOyfwOATe51YIz9iXhb5WUyTqsFU9mNOGkq%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDDocNtMNgOnwraXW%2BircA9hfrYvs7Dm%2BiFbt27lX%2FTOX2H8TT0fTIqP89rm1P6GCMxrfx0j1ybECXdwacoC%2BaymZ%2FAZi8Lx5CCK0imKSgoyvGxL%2FBEZGiiPbqmmgq2sCRytgrgemnhRz4CPx9wF%2FqR7hxGiL6YWvL5Oo9J0HLZa%2Fi%2BheLYMQp2Jciw%2F5k8SdvnIzJqwPuos%2Ba7TMKeaLLTTl4h%2BReJ4j9Z8ZJur99ilkziOdnB5MBjjM3qE4kMQy2w57cDNyhLCUrsL82dKBAWvkYdj1tXK9NuYn5%2BF46%2FrXlsk4%2FAsDvcVoDR67fMdbjEiVa9CIUQ%2Fj4Y108KVjeaarmwgaREEZlWW%2Bu6wDmFrEujom2KiIyoXe7mT6JGsdKuwuged7YXizkB4SGVCfXl6pDq3virSo5A1r9%2FfCMx2g1VHC8PX%2FFM7bOAEDVfJBdp74d533dxiWjW037vSaU1OBlcdK0TrnkD8c3k4c6IFqIongN9t0A1nZomrnI9U5ob%2BnsztOTe054RtZ8vi5Bpft3q124z2lYN%2F3H0xFwwdr3NAy7nFntd0M4z6TWhkefAOjZwI%2FCHgRv8C5J1qSCQXI4tKOxwx3Q1sqGBppsv%2FCX%2BNSQb7KhrZI6ACbC%2Fv9%2FlgPKxwXlEII9BiwMObMuM4GOqUB2egt6%2FFFb1lvAE0TpgwP5praGLHNFLLbjrX9gDk%2BhhVhysZpXjhCFp3PnehJeo6LQBBI%2BdEGih0%2FtEW023S9oqHf3nXfqqBwiqfuZVL4i%2BpHwZpWh3NdeeJpUxd6W8Y2rhtWoSLPMmt1UDt%2F%2FAOWP79aAkId4fFyaTMmcu0GLmVdHv6h%2FqCV89WeJosww2T55KwEEH4NvX%2F%2Bdl%2BTisU1xk1UtslP&X-Amz-Signature=b9d4c6d3330a12e2cfd9db536112389bb897d4ba8d73e3e7477bc91d523ecfa4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQNVXFUW%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T094725Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCHKlMdrDEOIzyE2a7FbV0m18i0O66FtFbVfGgNh%2FFY9wIgEyLP%2Bl3%2FiKOyfwOATe51YIz9iXhb5WUyTqsFU9mNOGkq%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDDocNtMNgOnwraXW%2BircA9hfrYvs7Dm%2BiFbt27lX%2FTOX2H8TT0fTIqP89rm1P6GCMxrfx0j1ybECXdwacoC%2BaymZ%2FAZi8Lx5CCK0imKSgoyvGxL%2FBEZGiiPbqmmgq2sCRytgrgemnhRz4CPx9wF%2FqR7hxGiL6YWvL5Oo9J0HLZa%2Fi%2BheLYMQp2Jciw%2F5k8SdvnIzJqwPuos%2Ba7TMKeaLLTTl4h%2BReJ4j9Z8ZJur99ilkziOdnB5MBjjM3qE4kMQy2w57cDNyhLCUrsL82dKBAWvkYdj1tXK9NuYn5%2BF46%2FrXlsk4%2FAsDvcVoDR67fMdbjEiVa9CIUQ%2Fj4Y108KVjeaarmwgaREEZlWW%2Bu6wDmFrEujom2KiIyoXe7mT6JGsdKuwuged7YXizkB4SGVCfXl6pDq3virSo5A1r9%2FfCMx2g1VHC8PX%2FFM7bOAEDVfJBdp74d533dxiWjW037vSaU1OBlcdK0TrnkD8c3k4c6IFqIongN9t0A1nZomrnI9U5ob%2BnsztOTe054RtZ8vi5Bpft3q124z2lYN%2F3H0xFwwdr3NAy7nFntd0M4z6TWhkefAOjZwI%2FCHgRv8C5J1qSCQXI4tKOxwx3Q1sqGBppsv%2FCX%2BNSQb7KhrZI6ACbC%2Fv9%2FlgPKxwXlEII9BiwMObMuM4GOqUB2egt6%2FFFb1lvAE0TpgwP5praGLHNFLLbjrX9gDk%2BhhVhysZpXjhCFp3PnehJeo6LQBBI%2BdEGih0%2FtEW023S9oqHf3nXfqqBwiqfuZVL4i%2BpHwZpWh3NdeeJpUxd6W8Y2rhtWoSLPMmt1UDt%2F%2FAOWP79aAkId4fFyaTMmcu0GLmVdHv6h%2FqCV89WeJosww2T55KwEEH4NvX%2F%2Bdl%2BTisU1xk1UtslP&X-Amz-Signature=82b0e1f08ecf20d362f14fd289266eb8368964ceaca276b82f1110b47d303b88&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YLQFUWJ6%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T094712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICsvGQvlIROyZbLpQN7PRbxxBVUO%2BhJK5CiIOYIxvBoAAiEA%2Fb7vpIakb6wy6FwJ9KB4XGKwyCkrpQJwHiamZjAAj7kq%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDKp6OuurAKBAzUkAiSrcA7gcmRfyruUzAI45C4IXTO5vuLmZoVcJBhztaQhJnuc7LLaVE7j0B2gl9IA7lAiHh2CWRX9UPAHoIgTzAUZc5LRz%2FvnMeML7bwh02gnIN7Z75JalKhEoTxw8mlX8RTJi0pQ%2B2LqKNq5Ow7cTp0NFjsoI80mHxrRAgPrLPkghzWKPvGbmas2%2FV3Mod6QOcgYAskXVt0T1CeLm6KCzmE24oqx8CjB%2BneM5Wk81WYX%2B53Rr7ATVB8ju%2BceDGnRzq4UUlFf34RHFJGGUWOaE9yIQJQv3J5d37Q0RpkhBCFJEAJxDXXSl3N5%2F7QY8QhgA4cmKL756G7fZjRqQWGj8RWsELAgJ4sNjNpwygD4J0Kpd%2FrCqvorDCnTbtglV37Z7TbY4CEMbSa2qb8189w27AHe1cFyrLZ6XRxDPJJ%2B2MzvcUvgwScc%2BsmBvDzLWovEtcSbQrB0dJLvbkh56ewiEkcAH5BVwP%2BJTLiHVIzUMSX0oL4%2BKmCej2poKLkPo7Rtvvb7pjPYxbXfp%2FH08ZZ7wLq9ebPNlgtinUl1FFs6gL0TohLO3864IQhWylxisha%2BOjZAnEtXZVqIbG58K%2BAp2Y9YkQr3S%2F5D5CFMa1F09iajZeGAygfZ7psa1%2Fh3XRfNcMLPMuM4GOqUBuqCa%2FC0thc3TkRArwLMcEvzFIelO2B98WnKBg51Cl1gR7kPKivK%2BfdfChdEDE0DJQCnfXQccjdcei0N%2FOyp9Ks4xI6ScIGd3SsGaauXgUvpH0fIslLwPCtMFIytys%2FFeLxH1evmbIyWbbjXQy36xbDBEM98QSkeEOq1FhqblWusu2Uz1nXsU%2BfCs8Jau8EqeGMQJEwSYkYjroBVAEHDnxld6ThVH&X-Amz-Signature=b0fbee99bc60131b5ea2f12d843a5c0c80e25ca1dee764a64703cf3664752cb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZMDAIMO%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T094728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGSpMHNt0yq4cWyJbJqG0AVaznlIGal0vzNPG0ej4whPAiB2zY5pORpOzWBiuAbBR9%2BhkxLxuY4%2Bx4d18TK%2BBfYYUyr%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIMItE4c5NuBRxWtCXqKtwDLdsSa6uf6RH%2B3GSh9O1s9AfNeUoQw9MCN3l8RMWXLRkN3fViij6oTRDOy5wNCqDx%2Fq9%2BTuoHYPGEmeSj%2ByBcvinILRXwoNdr7Nx%2Bm50%2F48ufJidBFjLPm0XhpJcFNCPMtlV9c4FV8TNYaWzSzwLbOboV%2BgPdlkpUVoZtdAlQBzlIlSyquhSgDCcXzXfP0SXug0yGd5BHBkETLKWp7lRMC%2Fw2bMnxee9h%2FjC10rUrOiB8lyFGfxvaWM%2FIlDkL9OsEU0ieyWd3E6%2BGnh48gsSrBWv21SBHqq83f6eIZ8tI69Ttkw23zIbUkxyhVulUTBynQRNVNsjfpPRYkcc44KLA7BXI1Eia8GS9FfMwaotiSFhUNpJXBsGxW3CfksNv%2Fcz2Y26QDhd3cz4TCl3fL43VFxpW4dKLiL%2FElPIAk%2Bnp1zAEFzbJ1VMtmUJ4ZAaxJML5Lff%2FC3Ock9a4KFiRbcvfskvOiZjhbcsh%2BX1ZpyrtqTAPwQoka07KOVr1%2BMEPHvyCmaDl%2FX6YWrfC%2Bq3BkTtjk%2FqvQ6aS4hW8PsFeO3u3X%2FCOjsLaOMy8L7zMNMytWhUktBg7B%2Bn9EIaHgM6eIS4BDSiTTognsdeHeMcMp1rXpQH3fuqcHLIo3N2ad6QwsM64zgY6pgGG6mdx2tWPK668XDPIIZSOXbp%2FxRamdEZgzDsvGJ36SuDmJA3SXe3R5S3vECQNv4x73uyiq2OFsQJ0ED5%2BreDShqR8%2F8sFX%2BJExzQiCaBHbYwIV63nhwNelDsBoFwHYQubAbtnmEuFvPGSQsvl9gp%2BxghbU3Wd8VVwmfu7YH4DX0mc8lfKIHOMVwAfWxTaQfkIGE0ws9qyI1EDUNo3Ffp0%2BOKKdwul&X-Amz-Signature=8b480193102c08ea3bd18b54777f639b99faffc184757cd8b7c583007765409c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZMDAIMO%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T094728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGSpMHNt0yq4cWyJbJqG0AVaznlIGal0vzNPG0ej4whPAiB2zY5pORpOzWBiuAbBR9%2BhkxLxuY4%2Bx4d18TK%2BBfYYUyr%2FAwhpEAAaDDYzNzQyMzE4MzgwNSIMItE4c5NuBRxWtCXqKtwDLdsSa6uf6RH%2B3GSh9O1s9AfNeUoQw9MCN3l8RMWXLRkN3fViij6oTRDOy5wNCqDx%2Fq9%2BTuoHYPGEmeSj%2ByBcvinILRXwoNdr7Nx%2Bm50%2F48ufJidBFjLPm0XhpJcFNCPMtlV9c4FV8TNYaWzSzwLbOboV%2BgPdlkpUVoZtdAlQBzlIlSyquhSgDCcXzXfP0SXug0yGd5BHBkETLKWp7lRMC%2Fw2bMnxee9h%2FjC10rUrOiB8lyFGfxvaWM%2FIlDkL9OsEU0ieyWd3E6%2BGnh48gsSrBWv21SBHqq83f6eIZ8tI69Ttkw23zIbUkxyhVulUTBynQRNVNsjfpPRYkcc44KLA7BXI1Eia8GS9FfMwaotiSFhUNpJXBsGxW3CfksNv%2Fcz2Y26QDhd3cz4TCl3fL43VFxpW4dKLiL%2FElPIAk%2Bnp1zAEFzbJ1VMtmUJ4ZAaxJML5Lff%2FC3Ock9a4KFiRbcvfskvOiZjhbcsh%2BX1ZpyrtqTAPwQoka07KOVr1%2BMEPHvyCmaDl%2FX6YWrfC%2Bq3BkTtjk%2FqvQ6aS4hW8PsFeO3u3X%2FCOjsLaOMy8L7zMNMytWhUktBg7B%2Bn9EIaHgM6eIS4BDSiTTognsdeHeMcMp1rXpQH3fuqcHLIo3N2ad6QwsM64zgY6pgGG6mdx2tWPK668XDPIIZSOXbp%2FxRamdEZgzDsvGJ36SuDmJA3SXe3R5S3vECQNv4x73uyiq2OFsQJ0ED5%2BreDShqR8%2F8sFX%2BJExzQiCaBHbYwIV63nhwNelDsBoFwHYQubAbtnmEuFvPGSQsvl9gp%2BxghbU3Wd8VVwmfu7YH4DX0mc8lfKIHOMVwAfWxTaQfkIGE0ws9qyI1EDUNo3Ffp0%2BOKKdwul&X-Amz-Signature=8b480193102c08ea3bd18b54777f639b99faffc184757cd8b7c583007765409c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHO5WJ2B%2F20260402%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260402T094728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID0LsN3iZ68ruVUgH3RO3rgZLgY6lC8e8BHJvXuXlsieAiEAnubF0VY6or8LLOmDDC2bg2KCQM%2F9OiaDQ0Pis0twdoYq%2FwMIaRAAGgw2Mzc0MjMxODM4MDUiDA7wLUzVMGGsl9vxlircAxy1pUoM1%2Bw%2Bmc0IWxXT2YuE9CXoDNVj7m8blof4WDmyT6aTyi3CnsziUkU8RBZbpul3Tov5moZ%2BjjXOkWt2ToUVz%2FIuQb9TivF61dWc5%2ByL8ynEcAjyHmiuPMAjahdttEydW%2BjoJEqCcrZZpkOZzxKMZgCgD1VUvS6pqGcyd2rKMCSg429kj1ddzEywp8WzI60W%2FaURLm%2B6VqwNC0oJYQwyRYpHB49jJiKGUD1LLstXIjTt5SWatNcwu92YCYekQEN3m2GN99jukj0tfYgYUdWULt7M63d02A91tBvXSvi69%2B2HzWSE0HtVnljmYC8jw%2FKwEKZmL5TjOurAouegGDpDZvYYEJBeGZf%2B56cs7s5NaE%2FL9VzEYExHq51tmAud4A2Vyh%2FxrWCK3Squrpr9BVHmcAqXb2BcaMMCBBueSKuu%2BgdjG6ryunkmPTNbc3dshx%2FjjiGxx%2Bp9a2xqFFHtImvgkFDNHtFNxjf75VKC9OASDXyvtyExJlN0EjkN1IF7yPlkEDImb4xfg31HR4ixdNLih%2BJ1lb6AeXN5rP%2FjpiXpYAxkX%2BC9TN1ldPpBpiQ5%2B6QWgXkqCdr3DaTPNaaj0%2FMama8MStVLh%2FGN20Njr1tts%2B0s%2FIBvG76MtXRGMMvOuM4GOqUBy2ytpdJhYQklpg7%2B9wfmKEhXM%2FHymNnlYtLt0LUn4eKSX2vOPKOJTSWGq2%2FJbPZPNGiuTBHs3vwelramVC%2Bd%2Boylm%2FpzA75RmyAu9JfcYobWH1JZpDEA1S9pLgS6O%2FooILj3Arc5N3S6vYQEbgSHhdmfHQWCQUN6qOOujdciAd%2BaImA%2FTVAKG3IyyHqI6XI6PzwWVcjwF%2Bde1YnbjLfiTCkZ2F88&X-Amz-Signature=0f4b2fa2b68ca407618fca0b07477f48ff2adc5807ddcffcaddfc940ecaf56d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

