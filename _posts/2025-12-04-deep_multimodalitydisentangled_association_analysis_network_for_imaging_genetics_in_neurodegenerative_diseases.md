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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BEDEHAE%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQD0xbkPXGSnV8ey8wqUnuu6QJMN82wRZsrTHDLWN%2FM8AAIhALFc1C3C8yo6yXGvOitLhRbpX4oYtJA6LnX6c2WlrQiAKv8DCBoQABoMNjM3NDIzMTgzODA1IgwUWX8wgKKHFeSmHlQq3AOQ4xKNH2sOeJ7tHHjSCvkOI%2FAhfjyQ780zQ2StEfBfWeBLt9j1SW0r%2F1l1icVh4NMfsq1kZ4Q76DUnUWwo4qnsFFc65HbBmyq4s5TU77eZQjngSOR3Ecla6x1BZIMiMMN871R03FORZJ%2B72FuE7Q2OFq7PkPRoEAYbzG2Jc70ZGM76464yFYzBfLrGGsO6CMDIsn19iTvbbQUbEeGRWC%2FNyGsoYKr4pLhwrV6leckGV30AxNOwG2v9EQLl4TBZ8NbEEeIu0viY6rBxOW73PoQfKm3j56hsoY%2BqFtAOmUuotcpO4KISfqPSlHhRpKYrcM5sylphqVwilzbz%2F3dcH%2F6IcxJ3cBKZegAnvacQ7HMxVpWolgRXMrfTCgLPmLJm6DphlDfDeiOnF9Xo23pDqFAeMlybnqgDcihEm%2BjtAKHjLig68MEoM2PscFuUBT7ab5NcryKG6MGWrgyeDYgZlGu8j7Z5GrmxVL%2BwozvFHGBV7ubiRABlRiVO%2Ffuv1%2BAGubaFGHcLdHwg1z3vc2ZEtWEk%2FDKsft6qUuucsz8MXAiHFfY%2F7Dq9k26EV6dsCSr2OHLBEge425qKBedYlc46f%2B7ebw4bxOBkkJk5fXkfAm4p3oZ6p%2FMVQZf0mXW51jDErf7MBjqkAb%2Fmio4daK6bExlH%2BZzFRzHssYXS3m5iIbQsAzo0Q5B4Nuw4QOAQYl2iEu2WQvbFSGfz1S4lt0%2B2VGRL07OnjXU%2BApUVZ%2F01aTU0R8jEqNIc7dX2PdouqjMO24WbwN3zBuweyluNBv4r8nzq844bW7vp3GxAHKxhshQGlWAerth8iNGEktbhwZ%2BmgJbEqu1EIXCB4BxHARv16oQyNYARxh6Bg4Rr&X-Amz-Signature=9c1d9a6d96c366f484e01d4a2cf6bd55ab760e83d5c18f332a6672779ed8e810&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BEDEHAE%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQD0xbkPXGSnV8ey8wqUnuu6QJMN82wRZsrTHDLWN%2FM8AAIhALFc1C3C8yo6yXGvOitLhRbpX4oYtJA6LnX6c2WlrQiAKv8DCBoQABoMNjM3NDIzMTgzODA1IgwUWX8wgKKHFeSmHlQq3AOQ4xKNH2sOeJ7tHHjSCvkOI%2FAhfjyQ780zQ2StEfBfWeBLt9j1SW0r%2F1l1icVh4NMfsq1kZ4Q76DUnUWwo4qnsFFc65HbBmyq4s5TU77eZQjngSOR3Ecla6x1BZIMiMMN871R03FORZJ%2B72FuE7Q2OFq7PkPRoEAYbzG2Jc70ZGM76464yFYzBfLrGGsO6CMDIsn19iTvbbQUbEeGRWC%2FNyGsoYKr4pLhwrV6leckGV30AxNOwG2v9EQLl4TBZ8NbEEeIu0viY6rBxOW73PoQfKm3j56hsoY%2BqFtAOmUuotcpO4KISfqPSlHhRpKYrcM5sylphqVwilzbz%2F3dcH%2F6IcxJ3cBKZegAnvacQ7HMxVpWolgRXMrfTCgLPmLJm6DphlDfDeiOnF9Xo23pDqFAeMlybnqgDcihEm%2BjtAKHjLig68MEoM2PscFuUBT7ab5NcryKG6MGWrgyeDYgZlGu8j7Z5GrmxVL%2BwozvFHGBV7ubiRABlRiVO%2Ffuv1%2BAGubaFGHcLdHwg1z3vc2ZEtWEk%2FDKsft6qUuucsz8MXAiHFfY%2F7Dq9k26EV6dsCSr2OHLBEge425qKBedYlc46f%2B7ebw4bxOBkkJk5fXkfAm4p3oZ6p%2FMVQZf0mXW51jDErf7MBjqkAb%2Fmio4daK6bExlH%2BZzFRzHssYXS3m5iIbQsAzo0Q5B4Nuw4QOAQYl2iEu2WQvbFSGfz1S4lt0%2B2VGRL07OnjXU%2BApUVZ%2F01aTU0R8jEqNIc7dX2PdouqjMO24WbwN3zBuweyluNBv4r8nzq844bW7vp3GxAHKxhshQGlWAerth8iNGEktbhwZ%2BmgJbEqu1EIXCB4BxHARv16oQyNYARxh6Bg4Rr&X-Amz-Signature=9c1d9a6d96c366f484e01d4a2cf6bd55ab760e83d5c18f332a6672779ed8e810&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TK4A46AB%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005453Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCicAc%2BrKG1nncwcpGLLy5dQyxqCowngtfE1e1OVQEouwIhANQ4XYeRM1sVI%2BljUi3GqkMD2z0TPd8TnJ2pmUhgpAmBKv8DCBoQABoMNjM3NDIzMTgzODA1Igy2dWnCJDK%2BTSygsIcq3AOb%2B%2B5icaO9T%2Fi%2Fr9fC8ZlULxBJfaLB%2B%2BwX8awYfUDktQAeN1VD8ebWuIxYZJQdzl7%2BFYfMWoBEJKqSKlpQZMfZdmJhGwSLerGs3W282T4SdLROVTzb2p8Qm9jEC%2F2swKe7zb0XCBUbpLAuFtfMT%2BlfR1mJUrXntDy3EFFOVdchZL%2FteSl48JzpaiedWZB%2FGe%2F%2BHa6avVk2ohiSWSTxjg1Zs2apdbZsbiuYBMCMDpgXv4%2FCpz3q1WOgCtf99%2BeMGvtW65e5d7MedLz%2B0A%2Flmp8a8IFAOYraOvEXtBLGDR1IbvYu5LKb7bXIjMmCQn20jx5hIBLAy7%2B8rZEtCYcq%2Fr3sfq5X%2FkAZXv0VoDxpq%2BDobaB5dmfinUBVy4EOVs1UuPrsuPTHZGHik%2B%2BU%2FTupdCTdBU0vHpeFIuIsTHy3nk9XMvIjUrHmIVR%2FBYqmfFSQBYu76M3nITOZZ9oT58XRy8jTTf04IjkO3vY1vNo4w2guSBX3rPdu0sS062yZKVRDItC0rgD1HlIfeheen1Scdg4xMA8nNOZ%2Fd6N%2FCLpTVrbjG5qpqgI1Ao8qeJq2y00IKN9qWqJLe0e0ZT27Leem2Km12DaGcDlFPl0HGUzTQ5YK8xTCMNDWYtkmMod%2BQzCwrP7MBjqkAbf6Zf4FVeaLJ%2BD546LwoBN7jIEXqnXKL4Hd6Ygwo1AHh%2BNj%2Fn0GspRmfV3L6V5OlhR2PSxUTDQ31hOVabGw0nm9F%2BaW9hrwAFEa6j%2FtBVqWjLKETGLRwqiooVp2MOg%2FmdV8%2FKO%2B8DyZpIuOOSdXDC83t%2BXdBWfIQTMG8BY2Sp8IF34Lxe5zV3fPL0B5nRQi2HsmH42H85vj08rPPY%2BdlIr0UnXY&X-Amz-Signature=73279fb414daac9a68ef96e4730a0bc47d2bef00d1325f6e274f573b811d6814&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFSDDM3H%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCBuFivis89ovOX3YbYM1KEC%2BzFWashrONrObzKQxIUeAIhAIvDkdeEwcJ32nMnE0q46i0eti4WeMOSs9smKHETBXDuKv8DCBoQABoMNjM3NDIzMTgzODA1Igzbkn3vyOXvbyEi5nEq3AM40Z2VPc3wnH58E2DSRC71QK6ZlthnHXjqXPf8Eho2YGhHPKaNKN6CO0zSLrUeQqhSrLaizp1MuTiP9VANbCMPUyfMO%2F9%2FBgy5n24oEB82zHz2zKsIsS6d0X3j%2FyGQmJ2LBeGQCYDGAV39BOf3%2B4CucnNbFS70BOVueTusXfYa6NJq74cI8yHbhDil8QV1TbjDH2HOdgTjhFk%2BYZQrqOFQMlJ5pg%2BgwTui10g26Wbwm2Dz838DW7cltdOvruQ7cYwXgixbsVaqZ0KZNZN%2F7if89Jp3r9CEt5kiU6083Obh3SjYv3VoOE3PvUyRYJlUv7trFayqNI25SSbQ61DeI0dYIbIiIK%2BWMd2N25wsUHdXUCy%2FkACCJF%2BuAM%2BwmpvLgr8xvwZ45HDeJ1v9GgiL0b8vszyeESvlSd2XEQlzcReOMkzEIbVSzPXFUC%2B0WMCjZWe4E4ry2R0rbfilnu9mtt%2FLOIH7%2FRiVVfeQE%2F2WztuiEw3I7q1UBoOpGeRB%2BohINkdpHJNftpz2SBt4QxOSy7qzJciXQ1WIp8OMMR8KQ6ck9YJ3waBTfPRJtECcPL0zTPr3Mi%2BAWAoWV4ToBuwAEMTS6M11xQbx0Vw8bJvvzR673c947uly01RC1CgbgTD9rP7MBjqkAQgXnLuC6vF%2FYYWCQevM3xPqXipVlAaFCoxKQm7%2BmFuELjDXL6nwzPOaAGsuCZS66j0UUAabOEr7UNiiWTqvr%2BYGJrK1k%2Bn03dHterln99Q2lT8%2B2SJ9FHkBtaUxjOBg7LFrFIKug6tnRE77yPBfgh47Go6JybtctY0oc3TJlPJW7ooc0gdyRSC4MBMACDhht0vw5ACNaoMQAaTYf75bByEBY%2FnG&X-Amz-Signature=753ef2faf90e826004cb9a804f996158ea3a5a31a7f116123421e359293475b9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFSDDM3H%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCBuFivis89ovOX3YbYM1KEC%2BzFWashrONrObzKQxIUeAIhAIvDkdeEwcJ32nMnE0q46i0eti4WeMOSs9smKHETBXDuKv8DCBoQABoMNjM3NDIzMTgzODA1Igzbkn3vyOXvbyEi5nEq3AM40Z2VPc3wnH58E2DSRC71QK6ZlthnHXjqXPf8Eho2YGhHPKaNKN6CO0zSLrUeQqhSrLaizp1MuTiP9VANbCMPUyfMO%2F9%2FBgy5n24oEB82zHz2zKsIsS6d0X3j%2FyGQmJ2LBeGQCYDGAV39BOf3%2B4CucnNbFS70BOVueTusXfYa6NJq74cI8yHbhDil8QV1TbjDH2HOdgTjhFk%2BYZQrqOFQMlJ5pg%2BgwTui10g26Wbwm2Dz838DW7cltdOvruQ7cYwXgixbsVaqZ0KZNZN%2F7if89Jp3r9CEt5kiU6083Obh3SjYv3VoOE3PvUyRYJlUv7trFayqNI25SSbQ61DeI0dYIbIiIK%2BWMd2N25wsUHdXUCy%2FkACCJF%2BuAM%2BwmpvLgr8xvwZ45HDeJ1v9GgiL0b8vszyeESvlSd2XEQlzcReOMkzEIbVSzPXFUC%2B0WMCjZWe4E4ry2R0rbfilnu9mtt%2FLOIH7%2FRiVVfeQE%2F2WztuiEw3I7q1UBoOpGeRB%2BohINkdpHJNftpz2SBt4QxOSy7qzJciXQ1WIp8OMMR8KQ6ck9YJ3waBTfPRJtECcPL0zTPr3Mi%2BAWAoWV4ToBuwAEMTS6M11xQbx0Vw8bJvvzR673c947uly01RC1CgbgTD9rP7MBjqkAQgXnLuC6vF%2FYYWCQevM3xPqXipVlAaFCoxKQm7%2BmFuELjDXL6nwzPOaAGsuCZS66j0UUAabOEr7UNiiWTqvr%2BYGJrK1k%2Bn03dHterln99Q2lT8%2B2SJ9FHkBtaUxjOBg7LFrFIKug6tnRE77yPBfgh47Go6JybtctY0oc3TJlPJW7ooc0gdyRSC4MBMACDhht0vw5ACNaoMQAaTYf75bByEBY%2FnG&X-Amz-Signature=9e99093fae57a4f4e5350951f5ef44d594426bad13d63bfa04efb1e6f562d32b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466654ZQIJM%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005509Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIDMWFm7DkBw7hKFGatKa21rJKnns2pNVV%2BLwVGs9XYm5AiEAnARcps%2FvOvPYEVgARJn5p%2B20XKibE7A1ck17%2Fk29KHAq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDG8i7dtEl24TaDhQnircA%2FS471fuCuWlBBRb7IH5zzUINQKPXtDF2WGVhvwe4nK2iE9gz3MBNbckWbTt6DfgfUMn6cAiXYQBeKWm%2BqSP%2Fe6mxk6LMCZlCfV%2B97MDUHadqSu7pAuJ5NnQYxbJInJMc9PWa%2FwSOva3QlRrYPaF9BTOxPzt8%2BdgkXJ87oAuvzQzaewRU2Lwm0FTkrqFqTQ3WoIivB3wipRfi8YFGIr%2FXL6lnD3p43SjYMiQmqTaEDCZegak7H1AGa0DKApcnzr3LuNnzkZ%2FLsfoOGIrO7j%2FeU92KD7PQ1eOdglZwMEOCMRes0zCTKCuDLerRxBbLRWlZ8xy5n3vr6%2F6lj35aZH6qzGeGWokDE1GBdI5xecXQrzr1EA2%2BIsmnno%2F%2BwjmL4sdgd3z%2BHJR1QdrrEjLMpIJLYP3c8qFcqPpqOjxUQ80jKSxGxRsebJXRr2DHS5ET6PeEainE0UklDHfxMv3TWFH0eAanmlVnR6Id58UjD%2B3KW%2BkCJ4kIVTPQro%2FSI4CFUEU3NEyWMawUTpuhOGqANf0gcnwXcSVON%2FKhb4gyCwDTc11bD%2FQq68laOEbAD3hMWICvFNWbzlLZCpoATADW9x%2BmUAN2QhOmj6i6Mjcnc%2BpeKK5ent9STgqxGSjoI%2BjMKGt%2FswGOqUBFDQCCTYYBxduYzXaxJQr1J%2BCKXeRFeh%2BQ4m1wqRkRmNOYfTEXIHV0FU4OuDOj7ARKQQ7Pqg56LwvZt4KuD9fcYyL5yj45TcH1Wgmi61Td2Hh4yj9Z%2FAM3PZuds1XBzBaoDV0rgoQCbzfkVTeIJbGvTZ%2FqyVoMrrzgN9tXgZXSrzcnuoOEkPp9cBpjw5J%2B1SlGhxCuW26ZJMMRI0iY1U6dbpE4OmP&X-Amz-Signature=24d924f970e1c9663bf4019f5c5ba826b2b0d90a6a912bcf5e592b9d525e88fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664L3GPXVE%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005510Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQDldOrRYXlBKsDPA4RrR7x96k7PdYJZyo4g50d7nJFlGwIhAOjcCWd1CH%2FGkO51J8S6kGlbgNXP5eO5p0ZZrMMm8nl%2BKv8DCBoQABoMNjM3NDIzMTgzODA1IgyRFZP%2BEMUmJNibq44q3AMVftyk%2FeWC%2BmbAeAmnT6SVGB9y6rTIQEKd61Zm77Hq%2BDmvnv%2BXdcIa7VDcr2NiOitIMph%2BI0JfbuotJBFsI%2FGNQAvINrw83gj2qjK3gZAYK1p2PQpJJro8CjJB5C3Wy0DeL99GXiuK42Ke8dOD5oIDlsb8hxnV12eYEwlNhzhAE5f3VF6FvXs5F4YzM3GsRXtWUlmEj8%2FsrFeY9RaBC458SaGK6mIGLPhCLHrOJqa0UrrYn0NErjGkZ%2F7xb1sILDGh%2FZLcEXd6PlYYav4je9s8JRb4rZU3w%2FAoRdbcEhn2KRkKKL0KaDolsH6CBXNWgvtBSCvMrURAODzPDoi9hFSL0wbFfOl4xZ7dKAYXfJu2XyVLjtWPcnYyybrL6S6CIPmYhNVD39GSMQe%2B3hE%2BZ%2BdIyUWcrBXeAlCHbvWoDvLDsdGmmoGdjshByPA6h2s2ZG3fLcHypO7W1qTbECeF47dfqj%2FiYNWtlFhOMDHbGoUPDuN7p6EiJAM1zQS8Xj6yVXSIB4%2FUIgv%2FnnVo3N7V9Rz5DDEzT3sO7th%2FZLzgjYYY9WygF8ddkH7SYgubHf85dR7gcJIONFQuU6vPCjFx9uiJeRtgLLPHJPa8mg0qYoOkd01nnmY1RekmsDr%2FLTC3rP7MBjqkAZFFgTgNzJJo%2FipyWI1LYHAHEjtsLjPsnZL%2BuCe2nt24%2BV1iO4eIsOdjfa9SegTlo%2FKRrA8A4lSbAIO0j5syd7vsDLb%2F2Q%2FbStOmRE06o%2BT8k2qiNTJuoPp9sOqYPtVmm59d3RdqkoY0dnUs7QuxFkjZMG3PmcIPjutFArHUcS%2BPFGzzhNDAvE%2FIBK%2F%2Bb6A7gBkhYqz9Rfk58XHjH3cOPa6xmC%2Fz&X-Amz-Signature=ae2eecab875d1bd4e2fc554753ebf214bb72487d938b219deb95027c01603e8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPVSTDH4%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005511Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIChF%2BI6dDOmyzU3xDL4bWAx8xt%2F5fqoNbYkiQPZd928PAiEAnHgnTBtoAHshxMe%2FBWtvxt18L6AeuTXdo3HRnUQ6qK4q%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDKiTy0TxA%2FP3KlhG6yrcA3QCXaeP%2B1Ffudasn6krWmQSLnUiOxHWo4Z5tTRuKp90zVuWdRKQ7RStOo4bhkWN0gIVPlyR5%2FFuoUKAYrNeS0DneClatZdCFnMgK5efGXbDTy4x9s55eBLdUwLQPOAU09Niz0aLgsM6kwvu1bwCal7Fojp0AfegJTSkI9z0RQNMnJgG0xGtTO%2BdWwXi3tB%2BcL1p4Zlrcx9rtCzyL7j1QjTrYDTBSkBojnEq7QCsKUMU6FiVBrqtg4RyiexGRaCIUkLhGd0sFK0knXsrZlZWHZWMpGt%2BnzZJvoL7dfqwvcz8NcJZtaBOZUULTIaCwxnOjY1Z42PbBKTYsHKDTgXUZaSroCA7jZq6jbVFJ04kb785hFPHIr47J6ac%2Fu3pZ0yaCSYi9Qus4dsXbC3y1KWK7b1G04c5%2BIFx6u0lnLAat5UIlxZPZ%2F6UAe8jwheSFtJYi0mobaz0HtGvSkA3oPY1B36eVB7iqSdnGLQoPV6dqcPtu7UvrFSOnzyNxpBEZMzgTBZkvevbjGo0hEEI%2FYgeulRMjssHi%2F3z2b73mH7fJnm%2FhGnM8b6COXwlkWCQRUzXz1PrSfM7lwQlziqevtMtkvybVwAXw%2FD7kJQEqYvLROP1v%2FpzLONOXfi2cj0lMPCs%2FswGOqUBmHpk%2F8MXfvZnQEXir%2Fz7fzzDD835NxTt6ltc9pb0rhLKf5A1l9%2FfFuh3ql62YddFIoPSrHwY%2FAFuoWS6MIOe5uxA9qwVHxx7%2FQDXgdpNj3B%2BY%2FtcUW3U83Etrpl07jzZHE4E7VN3vhIqR8hBb%2FFbITsC5TCt59jtlqQxL3Gp2uu8a8uHqK4XAU3BPvHOTJt82icc2aGsXcj6HU4AXTDzVaPjHKUg&X-Amz-Signature=2a187f8f7f7fd5bf8e118a144ae803299aac0c6b463a93c0bc9af43c73b17976&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6LDGNO4%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCID%2BzfmNCCWv8SVNSTXprUMRGuk84d5rCNRvUO4aXM9RzAiEAp1hNYIb81DMpNy4vVJSG5z5eo14%2FhctJUu%2Bsi9qI4Moq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDGFULndzUNP70j9HuyrcA68MgGmrJxb8zXW%2Bg5b4ldx%2FC8uSRZgUMq6jHVnTalSAgVbgXASCoMyxcqFjp%2Bb810sxtWonvuHz%2BQKYbajbQAjN%2FC%2BDLMi6cnDkDmq9QIbJTFv9VOM4aiZ4DNy636jnOF9%2Bbutv9cxxWk8Bs%2B4W9O78NdNhH4PLHeZV2aswUJCUmuvFtljWv1ageqjV%2BO%2BxSZR55xX3fraRr9Zn5IIwnb6ei9O3sxDzBYLoc0JEN%2Bib3pp%2FOzKEP0yEFThnNuK9deAdkiSdGVUCzLD8C1LVivoGLo1w4PB8aN9E403wWXXAYb9KtaO8XAHnwJwarU3%2FgrHsCokewvdzuOFvwazk3M7YKvNMk%2FzxDZfR5tFzMUMImG%2FGKa9dkorqA2nwgLo3Cl87%2BErVqOl8HCTywe2rn1OovCYo%2B6pVNL3MCwEzdOWWmlmMCjkI7TztVrVssP9HSkhAWLf6wzLKJRBTUyGEOJp7jUopd44Os4e9K2ef26FUNrhXFXRPrX8nl4JnQwyBnAjWTZqLuEFKpNWnhwDUkxe%2FPq4G7JMzBbro6kvJnXpKOxBN2For9sjY%2B9pmGwVKF9SAc9WIjGOLNTRryhzgtuLA4GmsfW6ssD2N2v9BPTggTHTcjlqjCVw6TE6oMNqs%2FswGOqUBemCduqHhnEGzflsFaL6PGGje8Oj0zUdh0luFEmS41QTwLdLpVlS8CCtiXd7djokzYLc%2B3lQDtMuoV3M3fqyY2lCk%2BbPIzdkXIICyBvUYiL1twR7vHCmPwh5YRTjgZRuwImuD%2BRkPjUChbKz1rz8dMIW4iz%2BAGXTp51Wqidjd9CoYYrVkDAu5NYblGbFVBs0PUkG8U8dHgeewc1TlduKCT7Lb0TG3&X-Amz-Signature=842f1dac231c9c09db7b8d82b2db4588ec6409222624b19620530a12c3397142&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6LDGNO4%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005512Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCID%2BzfmNCCWv8SVNSTXprUMRGuk84d5rCNRvUO4aXM9RzAiEAp1hNYIb81DMpNy4vVJSG5z5eo14%2FhctJUu%2Bsi9qI4Moq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDGFULndzUNP70j9HuyrcA68MgGmrJxb8zXW%2Bg5b4ldx%2FC8uSRZgUMq6jHVnTalSAgVbgXASCoMyxcqFjp%2Bb810sxtWonvuHz%2BQKYbajbQAjN%2FC%2BDLMi6cnDkDmq9QIbJTFv9VOM4aiZ4DNy636jnOF9%2Bbutv9cxxWk8Bs%2B4W9O78NdNhH4PLHeZV2aswUJCUmuvFtljWv1ageqjV%2BO%2BxSZR55xX3fraRr9Zn5IIwnb6ei9O3sxDzBYLoc0JEN%2Bib3pp%2FOzKEP0yEFThnNuK9deAdkiSdGVUCzLD8C1LVivoGLo1w4PB8aN9E403wWXXAYb9KtaO8XAHnwJwarU3%2FgrHsCokewvdzuOFvwazk3M7YKvNMk%2FzxDZfR5tFzMUMImG%2FGKa9dkorqA2nwgLo3Cl87%2BErVqOl8HCTywe2rn1OovCYo%2B6pVNL3MCwEzdOWWmlmMCjkI7TztVrVssP9HSkhAWLf6wzLKJRBTUyGEOJp7jUopd44Os4e9K2ef26FUNrhXFXRPrX8nl4JnQwyBnAjWTZqLuEFKpNWnhwDUkxe%2FPq4G7JMzBbro6kvJnXpKOxBN2For9sjY%2B9pmGwVKF9SAc9WIjGOLNTRryhzgtuLA4GmsfW6ssD2N2v9BPTggTHTcjlqjCVw6TE6oMNqs%2FswGOqUBemCduqHhnEGzflsFaL6PGGje8Oj0zUdh0luFEmS41QTwLdLpVlS8CCtiXd7djokzYLc%2B3lQDtMuoV3M3fqyY2lCk%2BbPIzdkXIICyBvUYiL1twR7vHCmPwh5YRTjgZRuwImuD%2BRkPjUChbKz1rz8dMIW4iz%2BAGXTp51Wqidjd9CoYYrVkDAu5NYblGbFVBs0PUkG8U8dHgeewc1TlduKCT7Lb0TG3&X-Amz-Signature=3228623c88eb7cdf0d6d30015f55225760857399d893debb64af66e4ee97385b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ID3UPWY%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIGxmg0zfV3iGW9l61hY9eDZxSjMAt0vC5FEs%2F0dMGea8AiARphmQvpEhtCuB1amn%2FANuro6Cti790GM%2BnEAEEN0zACr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMrLJ50nM2yijRt4r2KtwDJfvojJBhkCEuAOePsLbfQj3NMQF6X8UqPT0Rh4Vl%2Fvk9e52qT9CLOtxmoBbmw%2Bmt%2B%2F8d9j113wcqzEADKWSkDZsjyvc7Gp4%2FvJesbFMoMkWS2TKW0i1uu8Yu6xzjlA7nBtygQrn8X9Mv8fb15Zc0SGHqFMEJ5m66zmh%2FfnDbtqsTNG2oSJEgiW%2F5ZQZKvOLwMSG%2BXl9m8Th%2BzSQYQr1T%2F7UX0F2G5LQN4D0C%2FJ%2BG%2Ffn3HB0rxzu%2BOtI1E%2BsiVJKpJ8Ny2diusVH5Kza5BzORJI%2FCc3Hnirxmiy325%2BDbffqusGP4tGiBUIUxMAZhovmhoo%2FTvS2XRZcYJnA3U32gUb10ofqFz7bVOhYJBmRI4x%2BXHxGqp84Gvi5YTvC0TILPaYVyaz%2BTlSDEkDYOwY6cCnmr0M0fZxE%2BTTAO8I%2ByzrXpmwFOwp7oQM%2B1y4Mi%2B9DqhrcPsQptZ%2Bij9hpvWnhA3DJP7R9gnJr6IM2u5aTZO9ffzIukRJH%2F8813x%2B5UfqFqFSZ6mXPIPCe8IHEgNeyPf%2BEHlcE9rz2btx%2BrfnnQwPP4ev54fMd0pPyF3U%2B6etuMZEEo5nVjewIPG68%2FZA5HHxn2%2BPFhkGzCWrhgtZjISl9tmsiKq%2BfRRJ9PEGEwsKz%2BzAY6pgGHnAN2V%2FFXBLp3Al5Y9u%2F3yY75Qd8yoKoit3x%2FS17BGOOb6kUvu9WX5xcT8wTXLpV0PSFU9K9zNLvIOvXXIEZLh48W3mQgjinYGRJUsi%2FB1BQ9i32f%2FCNlEnfYG%2FCf5PAqhPb5oaLnOfwN3%2FOaNE6RWx%2FXaPzO7WhWd95%2BKTMFN%2FIURqY8XH2RLbMmQ4XmqgWVTodDm012wPnJwXRCRhw4wPvbnSI%2B&X-Amz-Signature=783046f762aecf89119682fdc59b593300c90b6f7f27da5d7b0c7bc33b82b7d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVBCT2MX%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIDjX0cwYYyxofujZeUDZc2aYZO5AeB7atHHs76orcFUsAiEAyzM36jB2Endh4KLlOHhtCFKKwyBeRUft9QRmhDKLXmgq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDNN3s0l7GjV7qmGmlircA4MEx8cS5VUEvWRqz34Tk6onu4lhNk5UGbA8uqthvFBSLyLk%2FAX32MxM0IE9Umy9qY0eVkNLkwIjIStq14tLXu8Y%2FUBwoKhiNwwjnMFznj5eYl9sinH1HaVTU0ckZf9Y3QNpSx78tJHT1m4VIoWaaSb0K1sDJBiPP4Mgpfm27yIgHG4hg1atj4Y%2Buc7Q0Vfm2Yl65PFxnhzx81KmbYa%2FSgQirHyAuqlBWQKqV8N5rRH4wls3nw9SYZLm4n4MK0ddkH%2BWZDZba4mrD8vFTusA95mY3pyI2rY8NZK7LGH2QvG138oFHqFyepfd5XxKlimMDRfNdafDMfmtKhESl1CBdETNEVsPIPYNK%2FwkfSz5nxDiMo5SwJpxpt6gQynP7UTefkoxA0iMJ2SVKnbIbcdzDxyRMGe2af84VMXK7XhddMswn63CixiGUONyCLqSOjlsgNOJ5PqIUHUMpfJ3p8cCca%2B6FKRskkq%2BvQsoQpp2PqzTriTTQRn8A7hqNulPpTppH5iu1HfBB3DJV1D8n202GnZbO4pbuRooY%2FtF%2BtIxEG7uc2lCL3qvhSyp%2BPc%2FsGgj29XTteHltRTBV1Zp1xYcQgRXho7F9b8IRg86SptE1sGjGRHy%2Bf1CdhT3tzTqMLCt%2FswGOqUBvacU5wc8d8Bz3DVTNeRtvmqqvJbiYmrRx0XTVC2XJu7%2FgwFuGK%2BzyfOOUlROIr%2BRHghimVY3m2wnXwbTYxto3qvTKcL8t%2Fr3WB60NzOMBrv79klCo3aCivP9jpv4FC8XM7h5Fw%2BwCzxT0fpNPE6%2BjDxvrOU%2FJG9G1ZHpMIWVrFkZRUCgfaWwUErr7dSh3uqi0SB%2Fw%2BWWwCkVQ67zQV4ZsVgHcSiI&X-Amz-Signature=2b68c5eebae2b659006669ab5db5c4c8a6edbe4aac77aa81ed04b331bb8311ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVBCT2MX%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIDjX0cwYYyxofujZeUDZc2aYZO5AeB7atHHs76orcFUsAiEAyzM36jB2Endh4KLlOHhtCFKKwyBeRUft9QRmhDKLXmgq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDNN3s0l7GjV7qmGmlircA4MEx8cS5VUEvWRqz34Tk6onu4lhNk5UGbA8uqthvFBSLyLk%2FAX32MxM0IE9Umy9qY0eVkNLkwIjIStq14tLXu8Y%2FUBwoKhiNwwjnMFznj5eYl9sinH1HaVTU0ckZf9Y3QNpSx78tJHT1m4VIoWaaSb0K1sDJBiPP4Mgpfm27yIgHG4hg1atj4Y%2Buc7Q0Vfm2Yl65PFxnhzx81KmbYa%2FSgQirHyAuqlBWQKqV8N5rRH4wls3nw9SYZLm4n4MK0ddkH%2BWZDZba4mrD8vFTusA95mY3pyI2rY8NZK7LGH2QvG138oFHqFyepfd5XxKlimMDRfNdafDMfmtKhESl1CBdETNEVsPIPYNK%2FwkfSz5nxDiMo5SwJpxpt6gQynP7UTefkoxA0iMJ2SVKnbIbcdzDxyRMGe2af84VMXK7XhddMswn63CixiGUONyCLqSOjlsgNOJ5PqIUHUMpfJ3p8cCca%2B6FKRskkq%2BvQsoQpp2PqzTriTTQRn8A7hqNulPpTppH5iu1HfBB3DJV1D8n202GnZbO4pbuRooY%2FtF%2BtIxEG7uc2lCL3qvhSyp%2BPc%2FsGgj29XTteHltRTBV1Zp1xYcQgRXho7F9b8IRg86SptE1sGjGRHy%2Bf1CdhT3tzTqMLCt%2FswGOqUBvacU5wc8d8Bz3DVTNeRtvmqqvJbiYmrRx0XTVC2XJu7%2FgwFuGK%2BzyfOOUlROIr%2BRHghimVY3m2wnXwbTYxto3qvTKcL8t%2Fr3WB60NzOMBrv79klCo3aCivP9jpv4FC8XM7h5Fw%2BwCzxT0fpNPE6%2BjDxvrOU%2FJG9G1ZHpMIWVrFkZRUCgfaWwUErr7dSh3uqi0SB%2Fw%2BWWwCkVQ67zQV4ZsVgHcSiI&X-Amz-Signature=2b68c5eebae2b659006669ab5db5c4c8a6edbe4aac77aa81ed04b331bb8311ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VN3YIMB7%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T005519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIQDbujhw1tI6sgi4oT60%2FUF7Wkqkcm7zuxt9S87tomqYLAIgZQMq0QZFpaqOTw8%2F6KYEQEvScOM8oaNJn%2B5s1P5BfU8q%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDL6IJx5l%2FZRRGcZZrCrcA5iyBzxXKB4OSUE%2Bg5I1c7MreXw5%2Fxw05bzPrpRK0PZ1tEOQxTPWkaDFpOS4jQ3jn5eIFVNY4Y%2B0vlO0qNh734EwFvFt9CqsRr%2Fc8lZ19vmQlA09il8VgkUmdfWsb242cmgLJnwzcXLsyoAJ4lHZhTu9zfTrl%2FhFot3U9KtAXBS3E3tZ15MeiFrIQRs9ye2bJny6CTbyg788fcz7y0qSyQjqJRDgVMjLJNncawoFxIDJeiHMNhNLf6Gu1qa%2Fo4GrIiZmiGb99r6Z7PY9pboHUF5IkIq%2BfuPcR8iLNkflOirt%2BNT7LUPjqY9e2ysrpY33XSXM4JJ%2B6D0QXK1Z75R8o4ELmzNld%2FBReqpHUfjI%2B2739mkN298KfENpkGRCpKarn4pEbQtOsjEze1%2FEg%2BpmC3XL%2BsJHN9Y4mQgFL%2BfY5PPIpgByZOx1m1fRns9cPytWzdd4dXxO8DNQ4ab9Z%2F7Zs6aDoH1VRP4A6Usp3aszQ%2Bk0CINvk0Etk%2F0wjyh6n2%2BmfNx%2Bu2Zl37ZWqPPrlwiCdQCrRHnPsD%2BsPCU%2F6q2YP2%2F7LOcsRHOIRHprFPnRrUWfSteingUp4qxMdVaewLLV4UMMkDZGb4%2B8Zwbl1qHa%2BeKRd%2Fq%2BiTq3n26YTWFPMMKs%2FswGOqUBiY7PvgIu4gpDCXtAt7bSWZYE6UbmgHk0IQ6WLGbbQ%2B0eIXRBY5iYdPGraKDehGdcGO7IX6p6o8JIUfFmfAQQbpagwqrB7T%2Bqa85VHiqJclFk%2BLOOuyORyKnmPsi89w5y8IHSoPRYA6QnThxVrG7hYbnxHUVbOaBDVWHgB4d4852ybed9tO0cQv4OYaZ3Xe5ws60YpqRLxeU8EmFaMaX9UPXBf02E&X-Amz-Signature=e0487ae286db3d9339483438d850df86396a4885e98647ad1df3613745b50c5f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

