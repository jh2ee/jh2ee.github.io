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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665M7MVNEM%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T010538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIGcpuX3BmLIEQCxu0psbAEhNC3Qld8s47k1iBror%2BAAKAiEA2L53nJ9ijA2jWsrke5mfDqGSAaY6OFEKRh1CMfEfd5Qq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDPxR4RoNj8PovcWd6yrcAwchovLm6ia7udlt5g3Jrr80baIqNCGvs%2FOEZPB0vOtxO3whvkEtswW44PERw1XFvLtZeMk8tqt4FTBgpsb0wbqjtZmvKZRbHLBlTv8wZRKWBxi3cFPKzmr64G9d8Njy7MTDZhZI9QNhbqJ7B3wpF7ZfseRrq2uqPudQtLSRnof39ocHyMru7VA2NkZETa%2Ft0jLeDnU2o%2FvFPU6HElWw6Kwso%2BhfYmI1leNq4m6J99J1FyDA98lKXJtWi%2FMRffNjX51Dkk2UAbcXwiQpQciGE3i3aNjEeGMEJfckUsqQTfG67RctEyfPWpdC9yM6gv2ZdpjeNL6hpKr6t7yyAEsAFL5AV2vxGrBcv5Og55wSs39uqn9KH7UQ302ad3huKvix6iWNzj0gE6KeUs%2ButfI8E9X0CIw3n%2FBtUICqTSJ10RkIbay0wUKQ%2Fg%2BN7OSRjZHTlVN5wWJkjrCmnzVHUfqoi4WO4BiWMWU2sHl%2FFAfEMRu%2ByPmKMEuCXlmsvILeW4QRVpYIFodWFyVrRZxV%2FvL4R%2BUzNLG1k%2B7gEeb5OjwVx4pCzBuxx6J%2B5kUpM3onqBK6mXA5p3GQLE8kTiK3Vp0wpcOZioVNyh8I0lXxrD1wu8TOBnN1dYSJ%2BXQ10mo6MMKcrM4GOqUBK5P8vlx1ZrfQM50e%2FeX0SfDgbKemDr7rcoXgzZBhFeUcjEAcgLFtHkZO3fPEJqiehSF9mY30dyLaBeI%2FiCYxH7xn0qyOeB3mQt%2FV98c9Y%2FYCreFGfu%2BgpC2FI%2Bhx4u81kmuaGj6%2ByVjwQj5Lm727gPRozWTjOwdnSPBvkRqpSnCD1CfCxrUq5WvGgpRlmnFV7i0pr8Qt3IbO88qQ5M3ACuHH5kXn&X-Amz-Signature=4ebd19fb0827cbc9598523f3fd260b52e5359d02a28dfa29561ba29306a9ccf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665M7MVNEM%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T010538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIGcpuX3BmLIEQCxu0psbAEhNC3Qld8s47k1iBror%2BAAKAiEA2L53nJ9ijA2jWsrke5mfDqGSAaY6OFEKRh1CMfEfd5Qq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDPxR4RoNj8PovcWd6yrcAwchovLm6ia7udlt5g3Jrr80baIqNCGvs%2FOEZPB0vOtxO3whvkEtswW44PERw1XFvLtZeMk8tqt4FTBgpsb0wbqjtZmvKZRbHLBlTv8wZRKWBxi3cFPKzmr64G9d8Njy7MTDZhZI9QNhbqJ7B3wpF7ZfseRrq2uqPudQtLSRnof39ocHyMru7VA2NkZETa%2Ft0jLeDnU2o%2FvFPU6HElWw6Kwso%2BhfYmI1leNq4m6J99J1FyDA98lKXJtWi%2FMRffNjX51Dkk2UAbcXwiQpQciGE3i3aNjEeGMEJfckUsqQTfG67RctEyfPWpdC9yM6gv2ZdpjeNL6hpKr6t7yyAEsAFL5AV2vxGrBcv5Og55wSs39uqn9KH7UQ302ad3huKvix6iWNzj0gE6KeUs%2ButfI8E9X0CIw3n%2FBtUICqTSJ10RkIbay0wUKQ%2Fg%2BN7OSRjZHTlVN5wWJkjrCmnzVHUfqoi4WO4BiWMWU2sHl%2FFAfEMRu%2ByPmKMEuCXlmsvILeW4QRVpYIFodWFyVrRZxV%2FvL4R%2BUzNLG1k%2B7gEeb5OjwVx4pCzBuxx6J%2B5kUpM3onqBK6mXA5p3GQLE8kTiK3Vp0wpcOZioVNyh8I0lXxrD1wu8TOBnN1dYSJ%2BXQ10mo6MMKcrM4GOqUBK5P8vlx1ZrfQM50e%2FeX0SfDgbKemDr7rcoXgzZBhFeUcjEAcgLFtHkZO3fPEJqiehSF9mY30dyLaBeI%2FiCYxH7xn0qyOeB3mQt%2FV98c9Y%2FYCreFGfu%2BgpC2FI%2Bhx4u81kmuaGj6%2ByVjwQj5Lm727gPRozWTjOwdnSPBvkRqpSnCD1CfCxrUq5WvGgpRlmnFV7i0pr8Qt3IbO88qQ5M3ACuHH5kXn&X-Amz-Signature=4ebd19fb0827cbc9598523f3fd260b52e5359d02a28dfa29561ba29306a9ccf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6Z6CW4J%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T010538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIQDh1gLHckvCgk5kPYKT2yYSNacYO8VGKlhnI8WEO8toAQIgMaVDeGzl5cSeKBDLrwNRHTSsP7cA7XYAlnde7AXQ50Uq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDFGZyrcndw8xsl5U1ircAx0cX442UmkdejHXajB2RbNTAVfaKIqZhD7SyE0UtseMrC3bR65Cpxw89aSWX3lRyBf1puDpWXLcy2PbiNr9tQ8ngydUzKINbfsFMNmhsqO4kypjCi%2B7ZQnVxhJnBwVv%2F46QE2%2BL9Kbwm2tbLsdYlOAzXDwTj0LUXZ%2B4jVonCk%2FO512w67I8evgrpcSmFyYv8xMbYNl2lKilUrL4GXAuS2Byvw6hHNJ5ylsx6GIOn%2Bqpp3Kh1sZDuGrRBFqkjOXO2SnC%2FeE50h2VfPuONMNCEmB3xInDMxGMRW4DG%2BPy%2Bl9uF3bp3%2BiJEbzdd9TtUqQCteVGnJSC55QdAFLnfc4rfxM9ix%2BaVvxMGUssqFtzssWbWlL1bqNxWaOfO03mAJTm%2ByrjyJEIiU6T0S5Anr36GEhNOqY9pXxP%2FWfNCe3ucMlWrq3Vxnmeic9ovr3bcHR30aUUUPnrHQUnFnJSjydb%2Fr%2F0zaMhcj2Fvv2yhJ%2BgXG8PI4lBf%2FwzgWw4jECXBDAqhM%2FZrZnz2%2BhmXuSqnrhLZCUgY6mGwUbyd1t8hRlYDPkhBZLIiQRUa0%2F8JXREHAulrbZvVat5tG6bSQcR%2BWXsQvYUOVuhHxA3xZ%2FM8r0S8CrvMEPROIgWJhRN5pnAMOOcrM4GOqUBHInaavNMrNCYRQFoftJNEz8Fk8TYLqq5K8LC0kIKpXYONTC90owwYhbZmw0MvFn%2F4Tr8d9%2BFjyFJ6bl%2Fh17cjqHis7OmooOlgP%2FjmQ5Yab%2B7zbL0QaLtx%2BeBUh7BEtO0S6dP21YAsq1ui7lMUdb8wQFDpn11szOQXea7PnH3puoaPDXY5lIuhtsKOWZv1GCFj7vvZGy5eIF1qsbBSFh08rSFgJx%2F&X-Amz-Signature=88ef501759f8da59fb67a0795aba4e0f2f5cd160c5284eb3bda4f6fbc638c476&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5W4SHE7%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T010541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIH0%2FXHY1tgn3lgUMhlpkVvuoqAIzLd7liFoLBd04IhE6AiEA12Mokr8xgfuvplY7YaMu8mUH3eKKgvDZTGhXjssVs7gq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDAY1cBVK3fzo0ymn2SrcA4SHtO1O07TOIgbufK9YVmxEXxH%2FnMi0TBnxcKRz7v94DYiqtNPhnSRE3dPY%2FztUXgLWOyjx4XCKLsPtDh5yMVF6NA07t6bVSyjYl9L7TMrAS17rbi5%2Ffb4LHoDYdcTw8qlYRzHW%2FV6Z556kDVxuDhmIBOPI7kgTU7Ezo7HI3zt6t7seO0NhQSV6BmmAjBidbBgx9HfEewxl0Sl8%2FIGPj%2F7whapFgVSlhZZIGlSheSqyyiCokFLAvIh6Ss5dszNJh%2B218iRNc3yexcqJiDalIeh8hJ5RQa7i4snI2jhRzVDQYYEbVD%2FFMe1VP1Q595vNicpZ5Sg1isjybRdq1TW4pq7Swdejyiid3dw1Ytsf2X9ExjXCKTDaZ%2BDIgCxBQUIG0rfBoT0zAxCxadcZ1E3gmpVQ23swiIkPhzOvh20WygWEl3a4MfPrs7ZznU2N2h3x4hQDTjupOUGr4NH3pnyod3bvXXW4RADG2EVvMkzlspfZ5sNNwsoBBRNIPsie4KW4SiemK5q94EcDn7QQt9KkBCXqf3cffQfh9xWmU0Vtu3%2Fo3dFEGKNqaiUTxqUymo9Hh%2BaugI3OWzc%2BKWx3ZlrPzpepvahBVQU2zWZLhvNfS4JCdyz8kz3b8dQZFa1FMMubrM4GOqUBbYkuf93SLEsOGBz3drZTqlPUQekLeJip6kzr%2BVSjwXxyYUTdoyPHFSvxYOa%2Fl%2F%2FzaRft%2F6%2FSF%2FHA0lRADkVUWJiTEfP0%2Fg5XNEh7L55TU94rUZfTEdGCI1pkbsPj7VBGzfa8KL3mU9DtVu4n%2Frio4FWbe%2BrjqqrqBElyzzVTwAE8%2BvNEPdVjZeetQgi4HPVh5MUzZTzQWBp2XvxQSWIOkUAoafV1&X-Amz-Signature=731262069ebdc91eb9067d27f8a21158b57b1a9ab63770335207097a744c6de1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5W4SHE7%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T010541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIH0%2FXHY1tgn3lgUMhlpkVvuoqAIzLd7liFoLBd04IhE6AiEA12Mokr8xgfuvplY7YaMu8mUH3eKKgvDZTGhXjssVs7gq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDAY1cBVK3fzo0ymn2SrcA4SHtO1O07TOIgbufK9YVmxEXxH%2FnMi0TBnxcKRz7v94DYiqtNPhnSRE3dPY%2FztUXgLWOyjx4XCKLsPtDh5yMVF6NA07t6bVSyjYl9L7TMrAS17rbi5%2Ffb4LHoDYdcTw8qlYRzHW%2FV6Z556kDVxuDhmIBOPI7kgTU7Ezo7HI3zt6t7seO0NhQSV6BmmAjBidbBgx9HfEewxl0Sl8%2FIGPj%2F7whapFgVSlhZZIGlSheSqyyiCokFLAvIh6Ss5dszNJh%2B218iRNc3yexcqJiDalIeh8hJ5RQa7i4snI2jhRzVDQYYEbVD%2FFMe1VP1Q595vNicpZ5Sg1isjybRdq1TW4pq7Swdejyiid3dw1Ytsf2X9ExjXCKTDaZ%2BDIgCxBQUIG0rfBoT0zAxCxadcZ1E3gmpVQ23swiIkPhzOvh20WygWEl3a4MfPrs7ZznU2N2h3x4hQDTjupOUGr4NH3pnyod3bvXXW4RADG2EVvMkzlspfZ5sNNwsoBBRNIPsie4KW4SiemK5q94EcDn7QQt9KkBCXqf3cffQfh9xWmU0Vtu3%2Fo3dFEGKNqaiUTxqUymo9Hh%2BaugI3OWzc%2BKWx3ZlrPzpepvahBVQU2zWZLhvNfS4JCdyz8kz3b8dQZFa1FMMubrM4GOqUBbYkuf93SLEsOGBz3drZTqlPUQekLeJip6kzr%2BVSjwXxyYUTdoyPHFSvxYOa%2Fl%2F%2FzaRft%2F6%2FSF%2FHA0lRADkVUWJiTEfP0%2Fg5XNEh7L55TU94rUZfTEdGCI1pkbsPj7VBGzfa8KL3mU9DtVu4n%2Frio4FWbe%2BrjqqrqBElyzzVTwAE8%2BvNEPdVjZeetQgi4HPVh5MUzZTzQWBp2XvxQSWIOkUAoafV1&X-Amz-Signature=db5d729afaed37e7122e0c8acfdd298800f6bf74ea81b5066366b5c87ee81df4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VNRFLA7%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T010541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIDinvV3WP9woewK2Ou9dVxV7Z2WQ3S0%2BVk15YUkuQHu8AiEAks7MkoTJ8Hr24N%2FUbUnb6ew4uwI1rDHX%2BRqlKAczj60q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDA2QHHwU76%2FzXgoZGSrcA05EZgwrZMvUCmIYVCPxpWHSngjIe450LX75X6WHmmufufs8H0RhQyNdudUp7XteNac67oi9KzCHHuZlnsOhUUEp%2FwIKwgkfZBxoGWsHz6eWzG6tcQgP5G958mTtHRMoc7tbJIrai2UTbeBFCLEorRP8Jwz4%2BiR39U%2B%2Bfc4f6ZRLNoZOqBOgsLqm4eIxlrSQJJ%2BKABfqE3oD9iwnNWDws%2FniK5zqswenjeDRq%2BM8OSX686zqDUrPkwMlFAfPNwgZghGz5ZBsJp%2BEys%2B9Blnqm3h%2FOpKGuYH%2BYKK4BVlUFFfdGJAErrw31flWxdqbmV%2BuCpFb2XvcDv2kwknOq4088%2BdEEIpdRzcOx8NCkKx5fFhuhQ2zpuE6bvtmr%2BMDoC6PKlMMEwJCOB%2FGI%2FdL1o8SwVjGhkzJsFu%2BV0zCprugaynlQEC7yI40xgCPFB7gRbk1edNVY5Q8oEEXksquDbmQJMtCvP1qizBPvCnj0sNf9nLHuQveCEE3mfVQiR27C7ZslERML4mXEyK%2FYZDIYTsg0PtYAU4Us6lUqR5s1PMUvVYiR5kFdH4bgu4qz%2BFerRqlTkT3SbypUuurYRzMlRnzoCHs7p3H%2Fd0A1PqugJULb88IST7xm6sCMk497kZVMIScrM4GOqUBF%2FGPEGoHZ%2FloFQyXdHXgsvD7fwQWEGNZ%2FBiEoUw36j3RsgBRFOUUmBmuxODF%2BYN5DLRU4KVEX9mw5cC%2FNlctEJ9nOjsXyvb83%2FdUToGE%2B8Oig%2FHxtr5Pbgb5qrU5yqCYwckrT3kGfGfvAkgd9bojOFoJnyZGH1gsOYghY3qrKYZINyW9SpnU3%2B4ObJdT2fFJ5WFUXIRDyRW87FgjbtI%2F9yw2WYLV&X-Amz-Signature=31ecea5c1671893e963330b05315bd8c479950f88ce6b998ba1f6e99f0691387&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662IYILMAD%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T010542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQC8UEfzqEWhYrykmFaMRD%2FT5muNwu3JS9HEfN5ExCNJkQIhANkKaZ7K5MFYChwBU6TNg9rfkclX8wbfYq3MtjhUc6r%2BKv8DCDEQABoMNjM3NDIzMTgzODA1IgyDsRHZcJ%2BBD9KeznEq3AP%2FHFm0RKPx3o%2FqUlAWfAVfekUGPaRUAKHLR2rOtreYiWzouBwkOZcNxYcbOdR0J0hiw1tVe4VDBYMVWXn58wZHg7Pwc5UXdWa1PeAb7qtSGVDS382GMYwIu9nQBSTRxiJC1G%2F9jnSit6kSzjbqwLvDd8znP0TYY%2BHU%2BFclthsv2gIwiFDCVBJn78TLkgEaEOnWNmCiqwxpC6KgQijpCTUuWKPXHj9eQcQRnTdgO8O%2FaVqSAQsswm3tPC9W1x2C4rOHs68%2F2U%2Fs0VRLwNU5ZMc4j7e15nXxoUI4Ikm0oqm7P7o3N8hsyCXqllDKd9%2F%2FZdR9CrCTzbox9heyGjJg6Q15zACMwYBxwS4pAYHBFOfd1NCQVTUHRcqpNPVF%2BLjp1t%2BfRuqXxCB5AFRVhUz7TDBaqxwBlUozndcLGlq6TrO6ayOCtChcVvXmmuUpydIbiuE8%2BqDjbBDxuF%2BXZ%2BlXzPvmyUtR585EJV9vdV7qimCEr%2B5qMBzgGe4fw5u%2FF2FDj7goc4BUynQPwTMTC259dssk6Typ5fLRtR102kplzskYy8scUxqV2oos8XdFtUo0buJ7kiABTXgK4lpUdqPHJqek7bDkaO%2FIND3O%2Foh3HxLVmuQ8%2BwdnsNv7xZ19CjDrnKzOBjqkAUXflfyt04ydMg0683al3Ugxb8VoDMjw3T3QF14rvKoGbY10vagyNgvhHhwIx9iIwWWZuxoq%2BeqpXZjICrvACqdZK%2BE3vYZ1HtlKFx7PbEKjAFXIwPCbBgXnyjXymsGA6Il5ZEFDXctu0rScnEgAUl02dGGr62hUmlv8kqQTin4dlEBamSTxSPurIIJsVz4azf0VBuixXReeAJOJ%2B5aPd1QQqGku&X-Amz-Signature=adf3f60e21a6856f583425d72a055aa9bb4f6855e1f170b05853250d2866eba1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGPUG4MM%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T010544Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIDv9sF0mrCR6FHpsGuId%2FxgQuISTJPlifaPWoG0FguI4AiEAvJYjgQ8v2tqgDMLcQUXlST%2BQq0bEuSep8OEA0N%2FbsJgq%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDKjQnnMcATHEL5NRKSrcA02Xae6ob%2B29LtKj4DCrnXUuTpAhcXfD962jYFEXxZz66POAXVt9OFG7nhNhYZfHKaMDvbRiRGO8mPeme8P1frtLHb4MjXQcOE%2FMdYbT%2BocuXbEFMzgT5m%2BP5OKlBcxkLKJ7KqbspohPTYIPKA5%2FfDTkH1VzfZR90xdenlFNP6aCkxHmGeKEmXdjwLgjbf1iObqgcrgyZGLC9LZ2KEdoDs9LpfbFQVd9mAVMT%2BDw1CLFtAtsYCyTJr96KhMfmEUWOMfHBWGvST58lliLydFckr2%2B11aPsoTefU6KRzn4%2Fe3%2B1uBxQSk%2BvJezJMb3IL5mEFCNHILvDloXDWqsFV2aSLqvvZTrh0bxLhkgzx%2BwvCZCYfMMdDlXjx0vii2tCWqqvxy3VntOX89XRBZ%2BxKqektWAPj0zWAervUZvZ9palRu2LR9Y%2FDQlOPXbOWGzYgXaO%2Fpixctsigik8Nw4gLElEid6mdSwam31yu2EK7Ua86vb60ldudgSapRL1a4GLoSUidqOcF5g1fki%2FIGdMsXDHmscA2BETXuVcnccjmTxO02h2sTJEhcgUcSNuyMgvVGIiYLC1bSulj3WurcXDkyKB02LpUqjOEUaoB1qwJpAM7%2FqlE1SeA1PEj%2FiAr9qMMubrM4GOqUBp2XEuVoX%2Fyrf3tPoFw3oymJ2Zu8z3y29BGc4TEnon8Lt2Itf4Egvi0KWBU8dTAMo8v%2Fwg49wZBjesY2wvi3UKtccDf6B89vQ9s8RLkCB9xgKfm1oWgNFq6JPrwcZcoTxq7ewJaRECDnKrqfrneYAmkRsrKAw602IBYQIqLcnwpJA988S%2FinObhqnjZnRGacdcCBhIDZFxf1m%2F%2BmvCgo4DayVijVS&X-Amz-Signature=aa7bfce96f249214d35062666829cdcb99a02088a4a9e28c5e8193f06f7f4c6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMTMRVX4%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T010549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQD4bnJ6uRv%2B3afEvxQKTqSNj5ms4MXYgYysmeUHS6hXkQIhAKcx7a2Ucuw7dCyhxj0sMLpaYcH1HZlReacQAek8fyXFKv8DCDEQABoMNjM3NDIzMTgzODA1IgyvNGAStIdu7A4tlpgq3AN%2B%2F5wG2neyq4Mu3xagqCf6ZKkQ0P%2FId4SPeit%2BBlvarAycjx1%2BYkW85q9l4aLfX%2FRYH1hjHnn%2BTUpZCotJ%2FvTyKS9p8hanoe%2BJvOaOowRzitpETR4jSU1TCHja1SZnNi%2Bf1jzWVszSKdyNWYK3ZVm%2BPdA%2BWZYNIrLEr8pwAjmax0ZjZeUnuCMeskDAQXQHbvIDPSODqU1Dgpcoj0XSmmUHNlnVb15Q3UZpIEPwwthGcK4iytElyyZcjy%2Bm15QgibnLPci48N%2BVwxNhNNP128UcZrLE6GSg0%2BRjJjv5VGCnlJUnlW4yalvOnscHEb5YqE%2F5NqlZoQ4iqifq8HHT7Hhq9CwmjC87rl479kg4O%2B%2FZdfROpHdyaajJXGyr%2FzK9iQCf71lyLFzS%2BSza5TD1Me74ifMk541cbdfsWeIekMjHOmitZI2%2BdugBI9kxcuOLP6thtz4Cyrlg8s%2FocCNW7KKIjp4xgCOMEuv%2BHsBlT6U4Xcv6hBG8TQd7pVdTPwvbY3PhnoSgQ%2Fgx2YKe5WgDO838K9uIGlW7aem6y3mR%2FzuOsg8lpDilP6D%2Ff0gZWO%2FNnjDaIBaqzakaRZffx5i3IOlO30J7yq80A6SjNzExyYcGMZCjTL9X%2FpmqxbixFTCLnKzOBjqkAaopJO0FCuEe3Aph%2BUxVwjvsUU3IVBYf7iEi2mdgaUwW6nj0gbwV5mmsBNSP5LsWvejnb1dLOBZhk5Try4CKka6jQ6cgr8kjzK45Fu54MT768DVmHOVeyOlUwtkVWlZQ9yhXP%2FKJeAKmXRqZDd1PJgygJPahsV8va5RuWQdr3Hr4hHuZDbKQzyLSouORj3mU663ykbMyMvTyJdvN%2BUQAtePNoi3B&X-Amz-Signature=f2acffbf951fb75609313f9cd9111d73b39058236016bfb3593822dedd2664e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMTMRVX4%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T010549Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQD4bnJ6uRv%2B3afEvxQKTqSNj5ms4MXYgYysmeUHS6hXkQIhAKcx7a2Ucuw7dCyhxj0sMLpaYcH1HZlReacQAek8fyXFKv8DCDEQABoMNjM3NDIzMTgzODA1IgyvNGAStIdu7A4tlpgq3AN%2B%2F5wG2neyq4Mu3xagqCf6ZKkQ0P%2FId4SPeit%2BBlvarAycjx1%2BYkW85q9l4aLfX%2FRYH1hjHnn%2BTUpZCotJ%2FvTyKS9p8hanoe%2BJvOaOowRzitpETR4jSU1TCHja1SZnNi%2Bf1jzWVszSKdyNWYK3ZVm%2BPdA%2BWZYNIrLEr8pwAjmax0ZjZeUnuCMeskDAQXQHbvIDPSODqU1Dgpcoj0XSmmUHNlnVb15Q3UZpIEPwwthGcK4iytElyyZcjy%2Bm15QgibnLPci48N%2BVwxNhNNP128UcZrLE6GSg0%2BRjJjv5VGCnlJUnlW4yalvOnscHEb5YqE%2F5NqlZoQ4iqifq8HHT7Hhq9CwmjC87rl479kg4O%2B%2FZdfROpHdyaajJXGyr%2FzK9iQCf71lyLFzS%2BSza5TD1Me74ifMk541cbdfsWeIekMjHOmitZI2%2BdugBI9kxcuOLP6thtz4Cyrlg8s%2FocCNW7KKIjp4xgCOMEuv%2BHsBlT6U4Xcv6hBG8TQd7pVdTPwvbY3PhnoSgQ%2Fgx2YKe5WgDO838K9uIGlW7aem6y3mR%2FzuOsg8lpDilP6D%2Ff0gZWO%2FNnjDaIBaqzakaRZffx5i3IOlO30J7yq80A6SjNzExyYcGMZCjTL9X%2FpmqxbixFTCLnKzOBjqkAaopJO0FCuEe3Aph%2BUxVwjvsUU3IVBYf7iEi2mdgaUwW6nj0gbwV5mmsBNSP5LsWvejnb1dLOBZhk5Try4CKka6jQ6cgr8kjzK45Fu54MT768DVmHOVeyOlUwtkVWlZQ9yhXP%2FKJeAKmXRqZDd1PJgygJPahsV8va5RuWQdr3Hr4hHuZDbKQzyLSouORj3mU663ykbMyMvTyJdvN%2BUQAtePNoi3B&X-Amz-Signature=917a33dbc90e2bdef25dff60f77f5d5d985f71ca468fc06a990b561838b5de5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YDUYX3AR%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T010534Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJHMEUCIDalkoSerH%2Fe3bXl1c5uCjfUMiqAY8qgEvVXTjw66BIZAiEAtzOAsA9%2B7I4gDmf42fM8TLjnIvwaTNFSbzWgdM01DT4q%2FwMIMRAAGgw2Mzc0MjMxODM4MDUiDNdm8Jl3xhzMxWhXJyrcAyiIpGNdhg7ZdZm%2FY9bYgEhVzZJPXpEKTtmFVlkaoJTgop8g9stWSNerd0nXAGPQveMtU2Z5qdUBsM3zC9ds61YYNExsZRIzsCrtyioU8BpLh56PBzwD1KbROhzw0%2FCrpjNWMAbRJeXESy64YWcosqH6RIy91ET5t38Q5TVxSq%2BG2T7YNzgq44FTScTlZW1irJ2hnV5LfAa0Zf4pdAAbRUfiGWCuR8ShrZv49xiUhpS6M5BaVQYmuW%2F%2FtNVWptRoJzy28OQytt74xaQuaFQy5FLmU9oo7sqSYFHAirC4IVcHbkK27MCeks%2B1kFM8f6NbwNPrvp8jLi%2BXra2O9ATqgR3iB5FPPthcK61TkgZZ1O9VkXgoINy%2Fneti52EnK%2BoCO6Jup7lW2SsHM9YC9uiv6%2FjbAk2UJkLO6SEvv88zj%2Be5FnKmyTfV3ouy%2B%2F0lprLH4fuI84nYHOstuCoPMaCbG0qayDo87EJNKha3Tol1JYfX8TR25qAYpilRBhTDxOmu1NK2dBQv%2F27lICiCSmWwPQXzHHEfeu9kxO0MXZiqO1deAlpAZv3pTzcswiCockF14YuOaKpoajhCd%2B2zZHAkD3CdKk0pwyo%2BVuZ2A60yvX3A6It5iALZdgFKlt%2FdMK6crM4GOqUBbJNLc4yWBBzhHShNl2NQJA1CyLn%2Bcga6CKBsh62VUu%2Bjz6EaunEQv%2B%2FDI6LbAChf6DXMookx3rdgox2kFnuOpGWnPrGXDn0Tw%2BsiKMbFwLXYchsZUnECc51rAEHOudBxDPuPM1BVahk6IL5MEn0%2FIUYaudLOW1cwC5UqX%2BKoQkLRMMZDtRapt3DligOKPnalzi69AD5VWZJQaZg9LAKNSPTqrNlB&X-Amz-Signature=f075b96506afd4eb7f18f5c344ac096379be479eab095910c893b10fb10be89a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URZJN75W%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T010552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQC7MG0a5NP4sQJzeDQoc2JcGBo5HA%2B5p9Wu5HPSxDSaFAIhAJ6Z0kifl791sGY5ChUdxfHuR9UUaQ%2Bn4QFCtUNQUyDcKv8DCDEQABoMNjM3NDIzMTgzODA1IgyoEE07Uyw3UdtARrwq3ANDwvzERTbYnvgByLx4%2BCHQjeeUDmp2i5cKTO3KEwfqEPhwHST7rLBYT%2Be%2Fi5h%2BYpyrBVEfCkcMnIY4YDC3nq%2Bu5hG5sGWYGfRaVC6W6E3lGVq62kBnUPXq6HYCrCHYyQPs1VUDJh9l2C1AsR7hTHwin9WHY4n3VT0bUTeQHNLncVlFdt9l%2B%2Bu5a12jzyZrVOiKqyqP9U1ZGGZcCSnVmqkTZzFlshfj0lus7eaNLO6WZkXsSWARHHSmtacc0l8gExmQyalcxEoYMCuNjBvZxB8Eys9G5aFFmn5PfFPLQPuz%2BtpXyxCydn21VE61oODNuSBGF5nD8QWyo%2BwMM7VGULMojL%2Ba8GdEuROXLHdPtTmB5yhFYBVKRvWJgA57DlCCPMdDLl67EAUWMJswg1bF87zVo4RtPGCEbH7IkXHwUAugE287cWBtB%2FoAiPOzIsoEgJv4w60NgqcOWgJRmPNnqVoREXo%2F9l81hV0mH1xEn8hhzX7a12MuZ4Ml205h8v0PP5b5fSQ9Qa%2BwJna16jUZOZvdBPy%2BrxStkEdLoxj%2BPb%2BEKYWJqxFt%2BNbPhEdVf2XOrGnjZ1NqrrASycHLDmMX869RaHfHNgSfe1X2r2iM79QWw6Os12RNBJ0TZYEPNjCPm6zOBjqkAZVaWvpZEZFSPbOjfBlXBZTmqlV%2Fv5dG63cJAYcLUgHmEH1jnhOKlDC0Vbrvv2cxph2PwcQkHJRDC1iH0p5raHeB4Fq1pJ1R8WOQ1qneGZWGi2iEOFmbC3Tm%2BeIbi1f6H0Y%2FLPIR%2BjMD4OW%2BIB%2Bwz9hRHBIFdpA4%2FvHnUMmrcLE6ib6XxUlq2Uo%2FfylCcMeUQXHcqwnUoW5Bn%2Fl8%2BmYrnxugQKaG&X-Amz-Signature=20d3ceea6774b569c942b47f0315690817225b58c537c42aa671e4f4573862b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URZJN75W%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T010552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJIMEYCIQC7MG0a5NP4sQJzeDQoc2JcGBo5HA%2B5p9Wu5HPSxDSaFAIhAJ6Z0kifl791sGY5ChUdxfHuR9UUaQ%2Bn4QFCtUNQUyDcKv8DCDEQABoMNjM3NDIzMTgzODA1IgyoEE07Uyw3UdtARrwq3ANDwvzERTbYnvgByLx4%2BCHQjeeUDmp2i5cKTO3KEwfqEPhwHST7rLBYT%2Be%2Fi5h%2BYpyrBVEfCkcMnIY4YDC3nq%2Bu5hG5sGWYGfRaVC6W6E3lGVq62kBnUPXq6HYCrCHYyQPs1VUDJh9l2C1AsR7hTHwin9WHY4n3VT0bUTeQHNLncVlFdt9l%2B%2Bu5a12jzyZrVOiKqyqP9U1ZGGZcCSnVmqkTZzFlshfj0lus7eaNLO6WZkXsSWARHHSmtacc0l8gExmQyalcxEoYMCuNjBvZxB8Eys9G5aFFmn5PfFPLQPuz%2BtpXyxCydn21VE61oODNuSBGF5nD8QWyo%2BwMM7VGULMojL%2Ba8GdEuROXLHdPtTmB5yhFYBVKRvWJgA57DlCCPMdDLl67EAUWMJswg1bF87zVo4RtPGCEbH7IkXHwUAugE287cWBtB%2FoAiPOzIsoEgJv4w60NgqcOWgJRmPNnqVoREXo%2F9l81hV0mH1xEn8hhzX7a12MuZ4Ml205h8v0PP5b5fSQ9Qa%2BwJna16jUZOZvdBPy%2BrxStkEdLoxj%2BPb%2BEKYWJqxFt%2BNbPhEdVf2XOrGnjZ1NqrrASycHLDmMX869RaHfHNgSfe1X2r2iM79QWw6Os12RNBJ0TZYEPNjCPm6zOBjqkAZVaWvpZEZFSPbOjfBlXBZTmqlV%2Fv5dG63cJAYcLUgHmEH1jnhOKlDC0Vbrvv2cxph2PwcQkHJRDC1iH0p5raHeB4Fq1pJ1R8WOQ1qneGZWGi2iEOFmbC3Tm%2BeIbi1f6H0Y%2FLPIR%2BjMD4OW%2BIB%2Bwz9hRHBIFdpA4%2FvHnUMmrcLE6ib6XxUlq2Uo%2FfylCcMeUQXHcqwnUoW5Bn%2Fl8%2BmYrnxugQKaG&X-Amz-Signature=20d3ceea6774b569c942b47f0315690817225b58c537c42aa671e4f4573862b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466323TTAG3%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T010552Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLXdlc3QtMiJGMEQCIEOeGHpdB0e3SfnckLwbdDkhU0ztOMivXsAbgTZ%2FLGoFAiBFQRbtquvw072ptP4NVH0ha5aZm5m8%2FG%2FD4uM985QJiir%2FAwgxEAAaDDYzNzQyMzE4MzgwNSIMC9o9HwoH7Zgo7s1xKtwDzZJlUGAu1dc%2Fwcz%2BmpMWy7WzdcdbHDo%2BfxF%2Fo1DHmf2%2B%2BLNZucT%2FXIhy4K73XE8ChD7e6QDTpyCPlSy7NoXChKFavfNQUWNqyjillGrofKt%2BE05YRuhgFIsrpsFtz7bj80kmKNcbaI5%2Fm6%2BNcPtBBsdcPPnNoyWi39Rb5JA7iOKFExt33%2FonsTQZ127Q8IX3EVE2xZL3zPDH9KdEmmH5AWycGJozRXlpAyr6cP6fuZ4ofDqSiE%2B8rPvviBUDNjGgVCozY81LR2dghqqQJSxtNM3I2ZYTT6laxAQje%2FYdjSPsZnQ5t0Q1sxCV4A%2FteuDrNAn3pKZtgRXK1HW4PN1l6roMX4jxF9zmLv9yyli%2BPr2b3ms06m3fm3EQmPTYWUqWjoeLfEZrC5%2FJfwjDi3GqXi5cPepg5aMs0UjvaInwTqDyPLvh2yKiJkmJGvtEJqhyZJS8Hjrrtb%2B1e6l2F7gg7ibwqPUSBHjsjmmVcfRkSUQcffpuUd4uZrmyjbbhPiZshdcLVN25C%2F9uIwt%2B0g%2FDZOvVlDjRVAxrLN2UfvWWwPohTyWFBp2SpvF1XG0MdN6%2F1Jniu4mQAvy%2BNFh9Wc7Ci3z6FeMf%2BB8OwJB6srULD1urLa3jaKUm%2FflffSIwn5uszgY6pgFxCc9Bkm5HfhNrcuWvc%2BBMy2ZHDk3rwRzLNBEeRYE%2ByA0VreaAf60ZmwhF33Ze1%2ByaKpw1hyx6riXzLWgB2gx6Em0t9qU575vmM7b2rMMA48OKOZG1iHoIjI6WC2%2Fe8Y%2FMJjn2BnEHYdjrNRSuynlJZHKWb0zRv3VeK2HEv28oG3NdxW3x8oR1I0sxzFtpt%2F3LJWcU9b2A0ln%2Bh%2FeNx122DbVOlj%2BW&X-Amz-Signature=ab190b93806cc320735a43b39246284194cfb43c41663a7061c10122c939decb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

