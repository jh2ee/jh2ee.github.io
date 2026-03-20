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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLRJDY5B%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T192830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCNonqUaD0YiUmyB%2F7CYPWHqr%2B7ZnSbT5U9LkjcUsPilwIhAMCIkRZPL2E2jVjlv1gXEiRQJX%2F3s8DrhqBiw9aHD3iRKv8DCDwQABoMNjM3NDIzMTgzODA1Igx0qVPPnzmAnGmdSEwq3AO2xMJB9npX5Bl1WGFbMdjnRQeLSZugsPeE%2FVn8tG%2B9aQfK15gBk8ppXn1Mn%2F%2Fwc6IJdPbE%2FFpEcTDotiY7isVxxf5AMZqViSxAzr5FHfJpUsmA5CRgLsg%2BJrOH0FYc8k%2B0YNzjbATIht1AFPbAv8fXlMlvyRiWGIMF3lnU8UgwUzsNOceym1B9tZDlrFE6r7VVwgaieRvqiMkmYm8mbLEUxZ83Nbf%2Bg2u7JyZdcNjvr27lt9kFhmhuwAUjwcA95KBWqPOrj5vAHDmvR58FELOtzA49pLfhwY4raNehovJNNoQttvHWxGTnV%2FNMp6P9AWOyO9prlXQlW8pO5%2BtXbxcM8L7m9csTJv1CqlSSjMHOds47m9g2V22nEL0fCMhCihfBekzqmH44nmMTFM0UJ6k6OQAg36cvie7LDR5y4yjNzaNoSoQhNOtGM5S5DhLvSilAOR29%2BKRSlh%2BKeAbG0ztRCbOkfUHzvHACrfzvKYaOWAPK55XA9HwAbwq3L%2FEVmtfuhn883T8BwokZowLoEUIwX0FDbO5vBwFTs9yd45VBW12eCrsNs1Io4cji5%2FjKwZlb%2BuHBJ7kqJutvM2HCt0AT1u2HdTAVHaybdkyh4Sb6gLLdHWIv2GuUZPtkxjCavPbNBjqkAU%2BmDsG009UkhkzWistlisMymSFVLvGsrZC4SCOs3VPRIj0HRtspTsCuSI8opuZDpDfxeF2EWlYFu8mRcKQd8e8MXqcip3RppntgJ511YqamBZGgNfG7%2F1U1i9zhNFLJuVWs%2FQyS8lUD8LHW8Yd4RGUs6xzw2IzJLoZkJDTA79qh%2BLWEhnP0hgeDnZa7ZQLZyrMrFg1sGYbN8DkduPByha%2FF0t2D&X-Amz-Signature=63ceeb4ed35250cb6989844a2102085de82f566c198cb6eef66d93a20ab9793a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLRJDY5B%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T192830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCNonqUaD0YiUmyB%2F7CYPWHqr%2B7ZnSbT5U9LkjcUsPilwIhAMCIkRZPL2E2jVjlv1gXEiRQJX%2F3s8DrhqBiw9aHD3iRKv8DCDwQABoMNjM3NDIzMTgzODA1Igx0qVPPnzmAnGmdSEwq3AO2xMJB9npX5Bl1WGFbMdjnRQeLSZugsPeE%2FVn8tG%2B9aQfK15gBk8ppXn1Mn%2F%2Fwc6IJdPbE%2FFpEcTDotiY7isVxxf5AMZqViSxAzr5FHfJpUsmA5CRgLsg%2BJrOH0FYc8k%2B0YNzjbATIht1AFPbAv8fXlMlvyRiWGIMF3lnU8UgwUzsNOceym1B9tZDlrFE6r7VVwgaieRvqiMkmYm8mbLEUxZ83Nbf%2Bg2u7JyZdcNjvr27lt9kFhmhuwAUjwcA95KBWqPOrj5vAHDmvR58FELOtzA49pLfhwY4raNehovJNNoQttvHWxGTnV%2FNMp6P9AWOyO9prlXQlW8pO5%2BtXbxcM8L7m9csTJv1CqlSSjMHOds47m9g2V22nEL0fCMhCihfBekzqmH44nmMTFM0UJ6k6OQAg36cvie7LDR5y4yjNzaNoSoQhNOtGM5S5DhLvSilAOR29%2BKRSlh%2BKeAbG0ztRCbOkfUHzvHACrfzvKYaOWAPK55XA9HwAbwq3L%2FEVmtfuhn883T8BwokZowLoEUIwX0FDbO5vBwFTs9yd45VBW12eCrsNs1Io4cji5%2FjKwZlb%2BuHBJ7kqJutvM2HCt0AT1u2HdTAVHaybdkyh4Sb6gLLdHWIv2GuUZPtkxjCavPbNBjqkAU%2BmDsG009UkhkzWistlisMymSFVLvGsrZC4SCOs3VPRIj0HRtspTsCuSI8opuZDpDfxeF2EWlYFu8mRcKQd8e8MXqcip3RppntgJ511YqamBZGgNfG7%2F1U1i9zhNFLJuVWs%2FQyS8lUD8LHW8Yd4RGUs6xzw2IzJLoZkJDTA79qh%2BLWEhnP0hgeDnZa7ZQLZyrMrFg1sGYbN8DkduPByha%2FF0t2D&X-Amz-Signature=63ceeb4ed35250cb6989844a2102085de82f566c198cb6eef66d93a20ab9793a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWMIWNBM%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T192830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQD1SMlhSbEPOo1VnToNLjkaBbf6yuUP2H2sMhvetHRZqwIgRTZjPWTX3GY4XCkeUB6AW9gtyvq2Dxkiy1l2VzCiJJEq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDOZX%2BryngiFVSDcfVSrcAzla61nYld7yAhKT34KYmymPWG47LLp7pQik1qJuAcf2NhmFwHWmm%2Fp72cZPFH9okHNexwbuZht8DExXyVePJdDSVWU8Sb3tb2wKifns28vkmqEXroS2%2B2vk0jcLj2p0zvTYj0LM1ji5McBw156l5Q8t%2BDo%2FwhozwcF7pu8s4PWFALRNzRYg7n7GTLjM2HWRHsPwaJHqRgVTl5rwhA9JACf1pe164p28PUXqbQ4v%2FSYVCnDaseToHSYcbfMG6qNdiByQN7YRLc3y1WClPVo%2BFDQVw7cSoLhTvb3GEWMq5X9ikftYL4v1WZL4OIDVmCSvmopJECvCJs501XDsq%2BD1XEntgwjm1fKueD0V93duRr05mHszmUYa2KZc79LzWUG166fxqfYjKRqWRdPl%2BBqIHs6JiW9NMX1Uw8WedPVqeb0hzG0KVoNZ5eax6oVs5wBAh8cgM08Oa401VSQD6IksbhCe3ZLfFwYU3edev2HkxsAXchCPyhkq5wasVy4FMZRWlBUXkX2kcms5BC7YvaHqXxL1KWCO519Fmj9UPSJsZzt7%2BadhTY5vrTE5er4UWAYcIFkzt6yohQSgfS4BWgu1HqlvasU9lJR5hS6TorvTtXsFyOxhgQu2hXjcAWk9MKC79s0GOqUBmQ3HFMN1zC9YCnJR1ZtjBYQ9iD6XUzvAs%2F1i5%2FRgZes1JQXzHjb8v0j1U%2BFHB6iEmuRIlY8gtSkd1P6PbhmHkqQSrRDC6hB%2FnI8Bflsl0i%2FnQLyUjVpZim8mH2RcEY0ijs5GjIQfgW8CbVFgPx3YubVFHNWhSItTlYabUjkQ1KqAlbe7zxan30U3s0%2BJ85Vcy8GavjnMHe2AXxHrJ6zDQXbk6CHR&X-Amz-Signature=81ff3e5179c2c3694a783006f10a92e7c9538c97dc0cf3a1c934810093963af6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXVI7RU2%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T192832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCwN7bsCdXa7LEfwzhSGYDglxhf6283H%2BoUI4NLPT8%2F2gIhAMyFbIvwWNwOTx3ARS6CbyiTMFPwW%2FOSe87BmjfLmq0TKv8DCDwQABoMNjM3NDIzMTgzODA1IgzYOjQyJHJAsnAiXRoq3AMkPeBzO00E7qGFQ4ZmBig1WFjWNTWy7yy2NvnPUPzvpGORmmVOVwLnCIld8nRNZpWF7tWmgRasGH5%2B%2FBr75xuILsWkQGzVByTR2QuxCYHBBqaf0%2FSKJ9Ybj9KKVS9mvhm%2BnYoPnaaAd8G2xIAvrDqtdxCNoiuitWD2xUhcNKI7ltLORcIDAwbn75oWoBBa20KbVMrb9RhnpHIK54T81O4iHJ7qTCFSMuC3Qyg4eOGGwSag%2FgcD%2FwzyMym3lMGv9wLr5fd3UQiiQx4nqw0fG3qmI%2F3TjDb7qM%2Bw6OA6qSACv74%2BNj6Om5KLXWl9e3G75lf79%2BkQG60OKCrBK%2BUKVWiW4U%2FunFiEqJ6xFMfII%2BI%2F65VeXGalZqoxfcLdRqWXyZji6Mg8W6%2FWB2xJarO7PHW%2FyNvLslSuoTuxzA%2FlSEcZi3vn4hfq1TKTBwmSWsuJZTW53MFnYUEmGggiLg2sWFnh3NJ9WoW2YesTKY5a0thgL3CRChLleE2XK0Lr3oWwrLaF86b1Z8paLN4zrEJXuxeVx44sjHNxPvBQkB4TJMBEQCeeNR%2BjTKcJwej1yNl%2BonPpOq%2BFuKyXB%2B28YP0FsPzr5%2BSCqJXtjMxWh7TW6Nosv8bf0Q3JY1r63z%2FdmTCXu%2FbNBjqkAXgYrmTsj8%2BY79JKM8HtwoKvIcPAgtVQjagoQn156VZWCaoikmwL17wshehSN2FXw3orFPRgvQAtgdmVmDc3O1iXFlpJkbghATAE4pD6i%2FIlTM%2BnmXDCQkjQ1vOGCt2z6K9Tf7R4jAngp1062TXfyZpco7GOxVKDe6RU7U6PtywoLOENlRIC%2Bw%2F21IzG3C0nTrtEcHOIVLDWT4LwrRkynY92WMyf&X-Amz-Signature=639924465b87dc84fbacd8235443f08216650926e29bab1c8e4c318792b660b6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXVI7RU2%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T192832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCwN7bsCdXa7LEfwzhSGYDglxhf6283H%2BoUI4NLPT8%2F2gIhAMyFbIvwWNwOTx3ARS6CbyiTMFPwW%2FOSe87BmjfLmq0TKv8DCDwQABoMNjM3NDIzMTgzODA1IgzYOjQyJHJAsnAiXRoq3AMkPeBzO00E7qGFQ4ZmBig1WFjWNTWy7yy2NvnPUPzvpGORmmVOVwLnCIld8nRNZpWF7tWmgRasGH5%2B%2FBr75xuILsWkQGzVByTR2QuxCYHBBqaf0%2FSKJ9Ybj9KKVS9mvhm%2BnYoPnaaAd8G2xIAvrDqtdxCNoiuitWD2xUhcNKI7ltLORcIDAwbn75oWoBBa20KbVMrb9RhnpHIK54T81O4iHJ7qTCFSMuC3Qyg4eOGGwSag%2FgcD%2FwzyMym3lMGv9wLr5fd3UQiiQx4nqw0fG3qmI%2F3TjDb7qM%2Bw6OA6qSACv74%2BNj6Om5KLXWl9e3G75lf79%2BkQG60OKCrBK%2BUKVWiW4U%2FunFiEqJ6xFMfII%2BI%2F65VeXGalZqoxfcLdRqWXyZji6Mg8W6%2FWB2xJarO7PHW%2FyNvLslSuoTuxzA%2FlSEcZi3vn4hfq1TKTBwmSWsuJZTW53MFnYUEmGggiLg2sWFnh3NJ9WoW2YesTKY5a0thgL3CRChLleE2XK0Lr3oWwrLaF86b1Z8paLN4zrEJXuxeVx44sjHNxPvBQkB4TJMBEQCeeNR%2BjTKcJwej1yNl%2BonPpOq%2BFuKyXB%2B28YP0FsPzr5%2BSCqJXtjMxWh7TW6Nosv8bf0Q3JY1r63z%2FdmTCXu%2FbNBjqkAXgYrmTsj8%2BY79JKM8HtwoKvIcPAgtVQjagoQn156VZWCaoikmwL17wshehSN2FXw3orFPRgvQAtgdmVmDc3O1iXFlpJkbghATAE4pD6i%2FIlTM%2BnmXDCQkjQ1vOGCt2z6K9Tf7R4jAngp1062TXfyZpco7GOxVKDe6RU7U6PtywoLOENlRIC%2Bw%2F21IzG3C0nTrtEcHOIVLDWT4LwrRkynY92WMyf&X-Amz-Signature=0d806773de0cbb1926e1fbf6cc9509a662c641d0319bb8de42f92a0f1d4157c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665QVEBVOM%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T192832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQD3unpZ1ljVkyeCZyJiu0I0GR7YQGpPRlBJXHq%2BXnon8wIgFiifsHhSmZpn0brtUtvkDSVik7kQu8B4p%2B5yy3OY7dEq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDH1GZZ6oeNtxyB97nircA8q0R5T4twZlrAFmn%2B%2F0PpVNAQMv35mOcodptXepwjJas7OE68InpLsOvfjsD3XWIsLJMKWcXCUasVIN7qIHV6eDv2eh2zdL9zVlIJKN66wuZBdfYV3ebYmGFe%2FGruGVYhxc8naw7NO6jN1apFOroUWVtBBCgeoHb0id%2FRe%2Bx8EAsjNVOkQu5hRayh4efDhYoPWABgXI6orFAH9p0sk4WOOnL20a5Id3Golii7IftDnIGbjAItdHAC8nqnCBFM5%2FPBRRvupnAszptZ2Jd7VvZkL4%2FwJB0fKHrOP47%2F%2BvyO5Z7L7Q126aqrCkLhfiRSL4MF5NV354CM5OHlqBHizhCpeEGB2HwlybmuEOjzFMAlJRRydveFrkbs5LfBDCvoQRt9wgqcVi4YOygBISti07DcVWK%2B5%2BQyqDap9I3xVz45hOj45XbxNNnwxcaXNlQNLRCtSjJ7c3Q4B3Ke27%2F8FuMTVUcoDTktym4URV3dtinciDwliz4nWTqUDQkE1TSFtDtxq4QbaFOR3AQPQPzOKM4cmLZ%2F8rmoKg2q5YOBj6qNJhrHjsvsDT8Y5p639RYljSZrLBP9nmeRoJfK7d63teezZZhe3%2FYfXpTamZ97JYGYMY2omlZ9dAbB40aaWhMMi79s0GOqUB%2B0%2F%2F9NRlwyDnyJw%2FDnYr5LA3q9JW%2BIwxGZJwRXQkV7UV1EbsZVcw1lg5mbk1Kn2IRMPst88pL%2BFwosoFuU1R8E1pU4oEmlj6ewhjbSiXb5IJaCvjAHfHudKHZPHV0AJ4C%2B7cdrDfQPriH8AQI6nAZ2cb23EouuR6g7ZojGbi207VX2MaDFx5WHXDDtobtM425p2uAf%2FHjAwLB7RGPzbAcOsp0pzv&X-Amz-Signature=cb57b67698fbc163abe17be535cf73c1cb65bc1d8e7111ba5c6c7661e80f6f54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAVMEXMP%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T192833Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDKVcEiDtyyE5%2F1mC6i%2Fr2jYSrbJ6h5mwy%2B067APTMwbwIhAJFs%2BqUA9Vnh3eK2aa1BLMqMy629bC2Aaat0AD7krXweKv8DCDwQABoMNjM3NDIzMTgzODA1Igxxw92730lK8qOcg5Uq3AMbxhk4558gz4pxv09M93Xy2NJqeVChom98SipyLLYG4GZZ9TVX7nfm1CbAVcxWQ69ZsvoJPY0ZWoh2tp%2BuevIeoR%2BnFvlunfHQDZ7DOiYK8YIg1JSrSpTaaQunzUctQSgoYSA%2F5msG0UzBnVKt3pweOdHI0YX6xK4cdDiEjQWZFkk1BvSe02Zc28B0zP%2BzdaozAdPZwQsF5OAYIcebrox8tLvGWHg28%2BF9gsiEmQa0%2Fi73YOlqCLW9v8y%2FSKUAoa%2Bmy%2BlxdUOOhslAWNqzUdciF3L%2F0nsmoaEtYiIgbgjv1FfYm56rEYEAUAhENmrlV1C217iXn5b0wNbgyTPnP8qHxRN9JIZhe8U%2FN5c%2FI2OrnpYM5TUAO9njs85gF5NR52m%2Bko5bAzSF0K3tHdDtwubSX6VxKgkMlPyiclvZuGV5js8A60Eyi86i7E78TFPJdiJpYbxo5uLq0Gd08xo7zHiZijkweHLnS1ueZiOWn3EIW5IFn58z4zLXNjSv5Oxzh58jEyzXcIqqYqCCqDyb251fWMF473i80wrFKiyWL1Jsb0Sp4MPwU0EeDyTP7lhywuA9pg05bYcaNb1Sm19cPhsqQ3xWMUkmc7XcNPtlQCCQIT4RDXDUMuSyGx1aDzDvvPbNBjqkAd0MjGlMtNESiVmkP68ePQgP59iRz0uDEJQm61WqRyziihXYrnGQzS0bevOYHZZUazeD8lRhSIhlDgCjKYtKFBmT1gBf8JbU%2BZCWJ4jNgYbC2VZZGLXcXv1AD2EeqgggDkicuNeB08gqKsJe%2BZEWJiigPqGKLiNu%2BsZbN7FAtkMN4wG7fvlufa7dmVO%2FOJJ494GCDizbHUTnaEiia8V56BlWTpU2&X-Amz-Signature=158facef5cf6124ceb4bcd2e4c71bbe30802004e114cada91bbe9cc093a97461&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWU7JWS2%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T192834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQDmzphF%2FxCSr958venGlrwdTpkSBA0JqNJBtNipfBRPVAIgOzSAg2grzh5PiON987O9dBfTtufb%2BgWW3SpWy57gVY8q%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDM34rv%2BMLUwN4OUB0CrcA%2FTnzaBEOn21Hm4UhRoRzS5q%2Bvo3eIR8r9KovNa44gkz%2FMsHm04%2FOVUrJlnZaeP6bmAhPQBWoeehFzZmUwjQeufqWqFLcznb%2FOYkMGJ7O1gxG%2FHl2i%2FuXscmGXyaNisAckEHVZKLoJOHwTKmQRSA%2FnVqB9kepqbOFN7gMJ6%2F6woNHXdaSOjCe4mAeEEW58JefF0h1iul3O%2F0TZ%2ByaPZZxm8GECiAQy0QnEXLLKU7Mm7Y8EljMv1ugEjF%2B24XwHos4n2rpm3gqSSbSO67K%2B9eM%2FDch%2Buyvp%2FP%2By3PGVFZDMJA8x1AC2xSUMESRPEuusR8P48a7SXQdWOnObDnXaB%2B2g%2FY8rBDkqWZMHqI4LxSNY9Y503HFmrGdhiBp8sVOIYB2lLFgzv%2FrJSLt7YbrnZehWYSaYbjEfpg24C5uGi1DOOgK7CS2Qp%2FoZZMglz%2FL3nmqxHm3ct9IBXZUxL5HcXx4F%2FDe%2BTqwxtDHSkNKmneKAwYEBMvJw82f3G0wucmsaQcRmKZ2Tr%2FtvL6o4TOZgY2DLX64lOA3JX8%2BYJEU3o65DGuxXlbDsbxnSczzZZJ52Wm4bkPh5t%2BhtehLn6bRo2odAsfDYsfMpiupWaFQMp9TCBHEPftsCdUWOhIneHMMO%2B89s0GOqUBP5Z%2BrPe%2BH3ngndOvuWiv5wAA6%2Br7ALy065HhJk6ZeBARsrZMPmskTHrT1fJgX2aIW7t5gnHWs2n3aWpqkRfkRyBqAOqoqDCTySU%2BQJo6hjzCcKxlBq%2FrM89XKuA74PDw9n4yqDkzkbAFlvdP1Xm0B3boJHZd4%2Bi3%2BeaPFl%2BOzZse2SRiUrhm%2BBnoYAzWjo4uuitST%2FcM1RplJL%2F5daZ50MVnYeyQ&X-Amz-Signature=1b4811d013a6be05bc2d45f8dc0bd4d4743635e78a0ee8ad1bb598db49699543&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662475WYUE%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T192835Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCr%2FWgVdHTpFJJZqjnKq2bYI7wi0asfP7jAQqcRFwpi%2BQIge7qXdspZur2ywMw55Wzr2p5J1mZJ1NhVr7LM2e6ITFQq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDJaQqO5iTYaXilNIcCrcA79Gj3PYiJNwZrwd4sIlxS%2BSlUzduk%2FswqldCf7tE3vIKe165TQzzcLCEjl%2BL%2Bv2m%2FZgD%2B10tA1rZOjeT6W%2FkcxV8TjpBx8kR9RA86T2KpOdn6AjO4H6TZ7FPjTI0k8HoxpPBIVouqYGIbhKDIGnjZjFpWM7xNnzlKuSARf0IrszlSd03UT1zFIk0flCAcYVwkj3th%2Fyx8Q2HAgXEnn0OIUef%2B0z8j8ZSjZdQCEhs%2BidOm7KgghNhEa%2BnvIp3b4yAThdDaGNVDgtpyjUeg0%2F7g8z7p4kO7sIQmeuO0nQA4zXXIV5bgswAS25spfb%2FuTSUM6E5mUeSyz7z8Tj2LQ4jkQ0GMQtDPi06ex7g5OPPXsV5qLbUqr7czJrTdRsjdob5WLDksvFx8WqxnX0wVM2AH4Bj4CMyuEF5dxzkkV4re%2FtjMGI2xmmxLbnHdIn4kUcqnjYA9W0bFZMJbyG%2FWKwmiKcszLnn1RJoYhpm4a2oiWiaDgFaiQI%2FMPdGSE16Hy9TBejhVbAq9s1g3tTcUvPud23ncE7GP6pDFvC8nGYlP49zevFBmyNO82ky8UrPy%2FwXL5pQcXOJl%2BhKMan71EUm8YYdqShV8StGcUodBlItau0vR0MXSq2isAzT%2F1KMLW79s0GOqUBPCxp9l0ikLxi4gJE%2Fa%2BlPtJfsquvKw2Be7WmVbxuYg%2FRG9KkPE1i1WJKemG7O9mJEfcHittE7WTpyqOG%2FoLrSGWiXOZCc3HQqWx0JweFkyVq7vFfUrLoLykZlaZLfD9WD2GRDb%2FVXM7UUsUH82pn6VEP82o689PlxYXMfMK1AOd0AJ%2BzAw5HH5lnB9KPQ64sIz2JEGT%2BBzabuns%2Bg9qp%2BjaUhEKj&X-Amz-Signature=c439641ba0fb2182769279ee448f5ab0c976bed34a7043b212ca804e44d51537&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662475WYUE%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T192835Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCr%2FWgVdHTpFJJZqjnKq2bYI7wi0asfP7jAQqcRFwpi%2BQIge7qXdspZur2ywMw55Wzr2p5J1mZJ1NhVr7LM2e6ITFQq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDJaQqO5iTYaXilNIcCrcA79Gj3PYiJNwZrwd4sIlxS%2BSlUzduk%2FswqldCf7tE3vIKe165TQzzcLCEjl%2BL%2Bv2m%2FZgD%2B10tA1rZOjeT6W%2FkcxV8TjpBx8kR9RA86T2KpOdn6AjO4H6TZ7FPjTI0k8HoxpPBIVouqYGIbhKDIGnjZjFpWM7xNnzlKuSARf0IrszlSd03UT1zFIk0flCAcYVwkj3th%2Fyx8Q2HAgXEnn0OIUef%2B0z8j8ZSjZdQCEhs%2BidOm7KgghNhEa%2BnvIp3b4yAThdDaGNVDgtpyjUeg0%2F7g8z7p4kO7sIQmeuO0nQA4zXXIV5bgswAS25spfb%2FuTSUM6E5mUeSyz7z8Tj2LQ4jkQ0GMQtDPi06ex7g5OPPXsV5qLbUqr7czJrTdRsjdob5WLDksvFx8WqxnX0wVM2AH4Bj4CMyuEF5dxzkkV4re%2FtjMGI2xmmxLbnHdIn4kUcqnjYA9W0bFZMJbyG%2FWKwmiKcszLnn1RJoYhpm4a2oiWiaDgFaiQI%2FMPdGSE16Hy9TBejhVbAq9s1g3tTcUvPud23ncE7GP6pDFvC8nGYlP49zevFBmyNO82ky8UrPy%2FwXL5pQcXOJl%2BhKMan71EUm8YYdqShV8StGcUodBlItau0vR0MXSq2isAzT%2F1KMLW79s0GOqUBPCxp9l0ikLxi4gJE%2Fa%2BlPtJfsquvKw2Be7WmVbxuYg%2FRG9KkPE1i1WJKemG7O9mJEfcHittE7WTpyqOG%2FoLrSGWiXOZCc3HQqWx0JweFkyVq7vFfUrLoLykZlaZLfD9WD2GRDb%2FVXM7UUsUH82pn6VEP82o689PlxYXMfMK1AOd0AJ%2BzAw5HH5lnB9KPQ64sIz2JEGT%2BBzabuns%2Bg9qp%2BjaUhEKj&X-Amz-Signature=c1534ae5ea12f71da5645811134053fa500469597c1b2f17ea46c68c06878ed4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCVV2AGO%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T192825Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCICEbFswn2WN4VYO26ea%2Bbl06lcQOvhDz9dfox%2F48w7kGAiEAvpc2I4I34gRv0U%2BYhvBbpBdk8mQ3CimK8MlmZKjl1iYq%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDBn%2Bc90T6DUDxrbxhyrcA5cEXoEPYkAgUqlaM3PC8E10WLpe%2BfKBzTmwoiWEKErNGNicq3QpXYeb13tU%2FnLd6vv3CgF9eiYms7u0Kf2CiqiLD3h5FMWwok1k1IvA5rLraocB%2BNNK%2B1O3kGkHUdAy3D%2BRY1AxZ32wP2s9uH2k5wCiBO%2FBeIIU3zfz%2Frd4bVIsJMApcoE5p6gxRRCJpi%2FSNxCWQcg8u6umidWGRGAYSfSp%2BLw1iVhh5sQi0HHBXDWahZR%2B9zLvL%2ByYRznAufi51LGjx%2Fqv2tNEnWPCdup33keJTEr1IUE4lZCrb7NZ7RbHmNIYGO%2Baum1xbMmvHdBxwhDa6b8SU4bY5SbocekWcu0d8GZEUn07Uhns8d75Sdc67onUDCsnPRFEmDwe0UP4Hz1Q04B7CNMuWQJRoDY53k54LjyxKSgzCMaRA9sv7dCOLtnGNC45hMN%2BKMqD618JRWL5QQAKF%2FuXU%2BMTd9BHFyoVFldVfAnXhmStXnntZwFzK6skU8iKkM1W91ZXd7ympTNb5VEF5xuWtFjRGKZRHEuT0lMCMZYBip5p1T9TEQiiuUE5HTtoL9VCbJfhpp44dipn8qIw20REKmDMASKXWgdC9hR4u%2BAHriQfUmsOKQl%2FzgtsHsQhCpayOmXHMLW79s0GOqUBisVQ9vjDfOVKKxaXIu3DuwOW3oZRas1PTXtiTOIRjGg1f61UxbhERcN1cQMaJVNf8yC32khfhCFdAsTrKXgGPBgA%2Fudh4zcVwCG1c7%2FKIdfJwLM8WF4z1g10LLT1t6rig%2BcnOpfWfhLVQ7s65fHVHXIbvgjzPm%2B34%2F3UW7gTMUJnZpPfv5THx5q7YuCTcmMbZCaCYlK57jjbMR9IFhaPZhL8wBao&X-Amz-Signature=210f8119f841d902d9cef91f89029aa00fbf6018e1c2135153ed45bdf6dc5fba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OZQ55PX%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T192837Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIBuVyqSKtdv850Qi94CMxNfw8R3O5jxjNKbbd%2FuD68gfAiEAgLV2UVp%2FFr2bOINzRkMrwge%2FTVLBSJjBwEHR3EpJYE8q%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDLz27NXvjzUdmznMYSrcA48zqy%2BOh51UYdw14IZy9N5Wf00ohpp7zAKRQeDEFHLxyFpaGOLaiC%2B5bCerbXeoWDLgL%2BHq3OjHZg81JNLy5vWTLva4OmKn8Egatm59KWYHZYU0beD10xCRw3ZnkB5adYzL5OAjCysKM%2BiRHRAa%2FRLR5Ny77DVHIhkgx%2BkCbrwHQ8egPlKQoYAWKSNMWZIMbeOb8GeGhW3cnMwWy2Se0EUuwo6Pyug98QqEo7iVSP0TsMLIhQoNoJmgyuN0ruhIEi9Qroi1g1FjSc495GJERJ5PBiHP22j0VLdieYfrIMpk7BnRdQXyq0E7criAJIV2xaA%2BgA2LkG3c9d16n4QP2R2Uf3mf0zyhZgfbt8Lux%2BRVInnCcb0muLb9QIIqRtd92%2BmF1OMJE%2F5zQ1BSOW8piFXSufE4P71N4PN2Zldad%2FRBUU%2BM4jO8dKxLhF1qzgBoPuYm4RjZafQfQyshmv4qrd22UtMJ5Fat1sc9Ls47LcORHvwpASUUwTyyT5gXT0yGgxrBiVecsRfmVziU2PORrVMoymgaOOq7aIbTLXtDktcbkgc%2FoH9oDeBdl7j%2BalCDLKLLdqIpIvQWbnX7HNQjL1Nb%2BsC8EcTYvoaLJEn8x1Qo5EEdgr5%2BPDK%2FtDteMN%2B89s0GOqUBx6siHquz1Q3m1RMuRbpO9d23aqXPJ4homOhu3h1ciDwJVmHh7LI8P%2FBvYHRzZ9zOEsT1pdRE8i1WfTu42yO868sKhghZ%2BRH%2BQ65O%2FqK7RvfVsA757oUeMGWcQ4ApH9dutTQWY2EugpfbQ%2FZKfUrhTS59rnSzj76YseoeLjaFAMbYcbhwL8olaNKiiDichnskARykyvqoxFlwr09Y3eoEYCZq8Khq&X-Amz-Signature=b22113b87eee946185b41880a4065324432c39bf4f3d317661e8ea38ca18b747&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662OZQ55PX%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T192837Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIBuVyqSKtdv850Qi94CMxNfw8R3O5jxjNKbbd%2FuD68gfAiEAgLV2UVp%2FFr2bOINzRkMrwge%2FTVLBSJjBwEHR3EpJYE8q%2FwMIPBAAGgw2Mzc0MjMxODM4MDUiDLz27NXvjzUdmznMYSrcA48zqy%2BOh51UYdw14IZy9N5Wf00ohpp7zAKRQeDEFHLxyFpaGOLaiC%2B5bCerbXeoWDLgL%2BHq3OjHZg81JNLy5vWTLva4OmKn8Egatm59KWYHZYU0beD10xCRw3ZnkB5adYzL5OAjCysKM%2BiRHRAa%2FRLR5Ny77DVHIhkgx%2BkCbrwHQ8egPlKQoYAWKSNMWZIMbeOb8GeGhW3cnMwWy2Se0EUuwo6Pyug98QqEo7iVSP0TsMLIhQoNoJmgyuN0ruhIEi9Qroi1g1FjSc495GJERJ5PBiHP22j0VLdieYfrIMpk7BnRdQXyq0E7criAJIV2xaA%2BgA2LkG3c9d16n4QP2R2Uf3mf0zyhZgfbt8Lux%2BRVInnCcb0muLb9QIIqRtd92%2BmF1OMJE%2F5zQ1BSOW8piFXSufE4P71N4PN2Zldad%2FRBUU%2BM4jO8dKxLhF1qzgBoPuYm4RjZafQfQyshmv4qrd22UtMJ5Fat1sc9Ls47LcORHvwpASUUwTyyT5gXT0yGgxrBiVecsRfmVziU2PORrVMoymgaOOq7aIbTLXtDktcbkgc%2FoH9oDeBdl7j%2BalCDLKLLdqIpIvQWbnX7HNQjL1Nb%2BsC8EcTYvoaLJEn8x1Qo5EEdgr5%2BPDK%2FtDteMN%2B89s0GOqUBx6siHquz1Q3m1RMuRbpO9d23aqXPJ4homOhu3h1ciDwJVmHh7LI8P%2FBvYHRzZ9zOEsT1pdRE8i1WfTu42yO868sKhghZ%2BRH%2BQ65O%2FqK7RvfVsA757oUeMGWcQ4ApH9dutTQWY2EugpfbQ%2FZKfUrhTS59rnSzj76YseoeLjaFAMbYcbhwL8olaNKiiDichnskARykyvqoxFlwr09Y3eoEYCZq8Khq&X-Amz-Signature=b22113b87eee946185b41880a4065324432c39bf4f3d317661e8ea38ca18b747&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRVVMU62%2F20260320%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260320T192837Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIHQJyabnrvWGzyb2Uv1xrPlQ%2BT2Y6%2FXLCttlxtLrR7QxAiBkIqY%2F%2FQh%2BNm40AJPzMoBJ%2BG4xf2mV4yhGEL3uPKKLmCr%2FAwg8EAAaDDYzNzQyMzE4MzgwNSIMH%2B6S%2FstFYbgHNGXIKtwD%2BjRief3GzCXS5odzjYgQERmRwYKYBTrdN5UKSxDPZXfYEFks984Xdmm9T1Ef2npN0QZlBh3Qt61F62mFBYX0PSaXoCx%2F%2BqOvYtrFIPdJZMVKmDomDq8l9tyBAba0HDo7i%2B6rDgP8IaHOQqsRZv1x0qIR8vBQoOk7EiRBOS73yomldqiJk%2Bs6JOoiFLDLQVmKlOd1stvmyVlzylej1Yy2AV5vGxv0oRX202drHkkD9q7wdOq9E%2FAyDfTT9cDll%2FVIdPhd0a1kRLTP8I8v78tbZxotBflvb8Z8q2XPk0miHnPmoFIClfpNhRd4Ov9XYoQyjV3YeUTKF1j8iq%2BKLmY0p61wPg5P7dwL9pSjigrSFwzdhaPAbssMcReiIH7KoAjCcTfg0w2wKJvvomAvRtaRb7%2Fqhh577aX3k2ASZ3SEMMBmpadMW1frWqD8AL82bWib3pRR1IfAGeQ5LpugAnm%2BgYBKtnj5pxNquwFW5K%2BVRtTCk8ktgcY%2BT30SCBOIufotxqQ9ggLi6kiWqdmR4fC2HJ5MaJo4fH8ngvXA%2ByVAEP9ZrcvswQcTBMBZmow2wNxY6Qen4NwURzEjZTK5ndKJOkovK6RsJ99n92Tj6YRUZetbgK9BNmePL6wecAUw%2Bbv2zQY6pgEgTSLACzjrElqUqXI6g4WQS6hic08f9g85wfXpcNnw%2B5P5UOm9HkAOYLzL6nwrI%2BCGU6C3yZKhoDN5tuqCQXuUoZVV3GBbVlFVx8SaYbfn66yt361ivCiwUoNzRGHV4xc2PFAEZ6oVcDmAz8FeO5nA7ziCOkQaL15KHbBr2zeGG%2B7T6%2F773n%2B1o2NWwL8%2BmJTzngnk0iIrxu%2Bjt4bxj6AG1jF1otfn&X-Amz-Signature=291ef81f7e72f636107a6c436ab66d7347a5cd6c218e911a11dbba96c9437adc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

