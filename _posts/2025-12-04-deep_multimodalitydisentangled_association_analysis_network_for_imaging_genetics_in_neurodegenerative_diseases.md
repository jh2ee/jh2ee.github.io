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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZS2HYV5%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T153031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDEVMBaJqNBzqM0WyGMqeUN9CkRJcZCWh9g8WdILdib7QIhAJd%2B6bZsOflbyYF%2BFeggeuq4rzupdZzWrIq6BETz8DRsKogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwbAb14uDG6BZrVe6sq3ANR86y7VUAI%2Bkl9xi9pNF1Z03qS8JKgO7ZtJx2KpgDmTDsDju%2Fgd08YV3akh7pB6G6jKWsk%2B2PeUuF9JvIY5oq5jPjGs2TWKs9TFB9RQ5bKzGV%2FejDwy9IpgVOF2AtTTb7EOJ1VIQy1bmUcD80vY7Wqh1gf0gujvGmYh7E0O1%2BZ11ksRDkeXGbwFmK%2Fg2n1DzzTjxYnHqBpZdOpv%2FJKqRDr9N5ChgbvbXsxdvSWQkNk1DrDez1S6Io1oepta%2BsyfdBXZqKsPNs8zzA9zCYCYEtSjpmZAcXWhB0DGERy6%2F6rrZHHw4r91NYUfW%2Fygl1nH2dD5PyKKOcZQP3k1bc%2FgvrNx%2Fqiv27wRXXxnbfX3zQQmoMqEvX9wO%2FIKJqo6xrGPiQGvg%2BWRWQ02JsWSd1YwU9ocB1ezDjM%2BEnzF69vfvAUqb5CcuqziyHiPq5xvqyF29DXZW3CnJo1rAp6EGcKzsXBsJodx4ZVfVFMdUtGtYb%2FX0Gmpt4l0Cp5DLrtPJfrAVOYSr%2FIEvASbl8uAzymyBD941wa4u82N2TMwGxWjVhNC03SD3gw6MlQf7LtyXDxjkbEuRzrmE8hFx2pJVzqLA49iU1MamckLvnxYvb%2FewUGWbYazkFlgKgF8hANLjC9y9DNBjqkAQxpR%2BwU0Zg5llaTHLTQPDAXpalkPR%2Byfe1A%2BV8Xe1hWCPC2FHRE1zE7erXmByiY%2BkFRmnrIcelTNOk4eLMM8nideZfgIRKpBwZjnkjhbLCscGiUimX8NXwPpMEwc%2BZSJCSdtPGQ7ALUZqfkNojAb0e7FsopshNa1yjN6grSMnQArP0LwsnTJE9%2Bd5AGFcypfrN3vEI%2F%2BCVyLegBpNQP3Fq%2FGmD7&X-Amz-Signature=98533c095cd5e3f1d8623a28b2351af1a503929d22c7308cece9162b65845b03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZS2HYV5%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T153031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDEVMBaJqNBzqM0WyGMqeUN9CkRJcZCWh9g8WdILdib7QIhAJd%2B6bZsOflbyYF%2BFeggeuq4rzupdZzWrIq6BETz8DRsKogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwbAb14uDG6BZrVe6sq3ANR86y7VUAI%2Bkl9xi9pNF1Z03qS8JKgO7ZtJx2KpgDmTDsDju%2Fgd08YV3akh7pB6G6jKWsk%2B2PeUuF9JvIY5oq5jPjGs2TWKs9TFB9RQ5bKzGV%2FejDwy9IpgVOF2AtTTb7EOJ1VIQy1bmUcD80vY7Wqh1gf0gujvGmYh7E0O1%2BZ11ksRDkeXGbwFmK%2Fg2n1DzzTjxYnHqBpZdOpv%2FJKqRDr9N5ChgbvbXsxdvSWQkNk1DrDez1S6Io1oepta%2BsyfdBXZqKsPNs8zzA9zCYCYEtSjpmZAcXWhB0DGERy6%2F6rrZHHw4r91NYUfW%2Fygl1nH2dD5PyKKOcZQP3k1bc%2FgvrNx%2Fqiv27wRXXxnbfX3zQQmoMqEvX9wO%2FIKJqo6xrGPiQGvg%2BWRWQ02JsWSd1YwU9ocB1ezDjM%2BEnzF69vfvAUqb5CcuqziyHiPq5xvqyF29DXZW3CnJo1rAp6EGcKzsXBsJodx4ZVfVFMdUtGtYb%2FX0Gmpt4l0Cp5DLrtPJfrAVOYSr%2FIEvASbl8uAzymyBD941wa4u82N2TMwGxWjVhNC03SD3gw6MlQf7LtyXDxjkbEuRzrmE8hFx2pJVzqLA49iU1MamckLvnxYvb%2FewUGWbYazkFlgKgF8hANLjC9y9DNBjqkAQxpR%2BwU0Zg5llaTHLTQPDAXpalkPR%2Byfe1A%2BV8Xe1hWCPC2FHRE1zE7erXmByiY%2BkFRmnrIcelTNOk4eLMM8nideZfgIRKpBwZjnkjhbLCscGiUimX8NXwPpMEwc%2BZSJCSdtPGQ7ALUZqfkNojAb0e7FsopshNa1yjN6grSMnQArP0LwsnTJE9%2Bd5AGFcypfrN3vEI%2F%2BCVyLegBpNQP3Fq%2FGmD7&X-Amz-Signature=98533c095cd5e3f1d8623a28b2351af1a503929d22c7308cece9162b65845b03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VXS2GN4%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T153031Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDtfflAUxvZzXjTvsl%2Fnd5PeoJxcBbUNY%2FXzO6VAvNHvQIhAKXAvap%2B%2FPTkU8no2y2M3tlzGCh444k2c4R26Uq33JeMKogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwzQbWU1d%2F738fIKL0q3AO2W9vh6cLDQLpCI40xG%2BqqscET%2Fg5QYjsmXVsj0o%2BAYqetCbR2tVmPzh%2BhTdyVN25tAxmcfF9QX86t3qHppO6FI5glslRm57lvZIbPOucY8CqCIF48iP2DqWxaCqura8uS8zPv2YVNxjtk5wLHXOoNNxgWiqF0Dc5MgChLDZWHsq%2BRU9ckwxCskdUalcK2EtCexL7NEAas1OEMARm5QdSHHPlYsF9f4%2FOHO5Xda7mV4QNcMdPC1lGlVHA79AguM%2BNPobUgh2wnSEe3uJPV1fa9juBYAk68xlUUTbQwfuqWEGnQTwNeQVgQlKe2T39FRzeaUZ5C3U1JqH30mgAJxhA3BEJNQzLUqmuoCo16%2B0G%2B4NKjOqd7Z4B8XFQ1LSp7E935fJKnSCDSZAGtg97ZGKeVUSzKXJpxBWuZM%2FjkEhQcPKyKzaUjZVYXnWeSmnA7fWLG7feqiEeaWsVbJ4WX64xLdJXPRxxqaPiLpkMElFOE06l1wtFpRo4Z7hI5aWS250wwLgp4Tk2Oro5cV78zhqSAsmN57isq%2FwA4xBTVkuKwqy4roAhK3AAAF82zYWGVx2SnwkGk0czYYsGilBsGFV1ROPE2hE%2FuO2Venpj0lPPM4cADmpxlddA2oTwLLDDNy9DNBjqkAVVJdmNyqPnroLa2d6W1LLkiIwpGcLWO9RuzA92J7lbHXC9%2FathLkgWBTMhfkES9DwasMZv9EGDh4kg7pUG6WGG1RfQjpXYiIs78x27OkJsfYLFgKPy10RtG7ty%2BnGw7Z9odMLYs1nyO33gVtG4rrpMq7BVl5UBqexxH3H3ZXJLHOyLTiaZytOUirl793LTw1m5i6S8JQL9r9r9B1h8hAd7%2FphHl&X-Amz-Signature=e92086ecd57b849915f1602ec41d316728903d57d2b7cc2d68bef9097977ae2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVU77KBZ%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T153035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDWxzH4gobRE%2F13e9gffPdLoyQHf38WLdT597iZ6MR2DgIgdhPB3qgoeb8U1Qt%2FuF1GSLW0GPTYj0mUi3KN1sTj5gsqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP1QljrpAsWAOVDKnCrcA%2FcEYyjk1cA%2FeAXucx1HsyTGla9cKP6vNMHEqdhbE6LB7VKC86KirAimUsqBEEYkWTbmKwy%2FSafIbM%2BLzukiLWxDdgcXHYOj6%2BoFMJiAnb%2FbM7wwE1G6VWFIHUU67AFCbASfsMbZ4xncpWMgpmitQxV6lTbwChCZwWf1UdL4KCsJuwci4K7GRSqSkg8UB6Cnzt55PcQUE8bPJKxVXPs1gS%2BRmczzFnuek7VX004ubh5L14%2BzAlrPZc3WIvi%2F6VBZY3TCw0kYyI%2BbYMhOuaEUbvIN8H9jHqTVvmEO2x4BoKGLKT0SLKy4zCOPTtsz2i3s8%2BRHTryiBIN4HjFfA3ZVzenpJOEogBzjR%2FS%2FDBrGQGqns%2Bv3tmF%2BzV%2BXZKWd7B2ufFQCvtNOK%2BUuDbpcZLKZ2VfiYRXGMOkRGcAK2i3cpOuXYE80Nzrc2l2vePLySlcrUjx46Kb1IKgApQraWqHXXKuV7hIyGy8KCS2QWXPScVJAnyGN6%2BXF47ElKAs0ylWMmcQMyVB7brWFHJ2r6P7e3ypMZrDKSHiNfXaUKUZCyfAaV9%2BES%2B6CVq%2FRFfcbckTVS1gWuOtwZX06xi%2BA91O9BTzW1pDrGHXiPtHglUQFtd%2F0x4%2Fqm23lOy1qyZg7MNLL0M0GOqUBR7ZupIYUGm%2BDxLcc1Ux0AlfZlAccNsq%2Fq%2Br7qK7XGrgKIEMZBBXkhaY3bPRdy%2BbFK5CaH1T3Qai%2FuEXFtA7e5mOzmTbXV%2BtpJbvmhK3KUwR2ToJg616%2FUHGxlJAui3o6nLPz2wpBdfiGyWNMUKdZ40VmI0E%2FeV%2Bh25W%2BdVLTSdu8j3lrUrvV4lciokUIkaYxdBzxMWkpEFKKKMyICbIfnr1hX%2F98&X-Amz-Signature=6a1da838f0fc636654ff9048ac5fb24a74405d5eac0814b6001442934e63668b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UVU77KBZ%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T153035Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDWxzH4gobRE%2F13e9gffPdLoyQHf38WLdT597iZ6MR2DgIgdhPB3qgoeb8U1Qt%2FuF1GSLW0GPTYj0mUi3KN1sTj5gsqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP1QljrpAsWAOVDKnCrcA%2FcEYyjk1cA%2FeAXucx1HsyTGla9cKP6vNMHEqdhbE6LB7VKC86KirAimUsqBEEYkWTbmKwy%2FSafIbM%2BLzukiLWxDdgcXHYOj6%2BoFMJiAnb%2FbM7wwE1G6VWFIHUU67AFCbASfsMbZ4xncpWMgpmitQxV6lTbwChCZwWf1UdL4KCsJuwci4K7GRSqSkg8UB6Cnzt55PcQUE8bPJKxVXPs1gS%2BRmczzFnuek7VX004ubh5L14%2BzAlrPZc3WIvi%2F6VBZY3TCw0kYyI%2BbYMhOuaEUbvIN8H9jHqTVvmEO2x4BoKGLKT0SLKy4zCOPTtsz2i3s8%2BRHTryiBIN4HjFfA3ZVzenpJOEogBzjR%2FS%2FDBrGQGqns%2Bv3tmF%2BzV%2BXZKWd7B2ufFQCvtNOK%2BUuDbpcZLKZ2VfiYRXGMOkRGcAK2i3cpOuXYE80Nzrc2l2vePLySlcrUjx46Kb1IKgApQraWqHXXKuV7hIyGy8KCS2QWXPScVJAnyGN6%2BXF47ElKAs0ylWMmcQMyVB7brWFHJ2r6P7e3ypMZrDKSHiNfXaUKUZCyfAaV9%2BES%2B6CVq%2FRFfcbckTVS1gWuOtwZX06xi%2BA91O9BTzW1pDrGHXiPtHglUQFtd%2F0x4%2Fqm23lOy1qyZg7MNLL0M0GOqUBR7ZupIYUGm%2BDxLcc1Ux0AlfZlAccNsq%2Fq%2Br7qK7XGrgKIEMZBBXkhaY3bPRdy%2BbFK5CaH1T3Qai%2FuEXFtA7e5mOzmTbXV%2BtpJbvmhK3KUwR2ToJg616%2FUHGxlJAui3o6nLPz2wpBdfiGyWNMUKdZ40VmI0E%2FeV%2Bh25W%2BdVLTSdu8j3lrUrvV4lciokUIkaYxdBzxMWkpEFKKKMyICbIfnr1hX%2F98&X-Amz-Signature=20c49131f72a63003cafd8c9ce0bdd34fc135d24e8cdc2c7af73733aa76b7fd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAOZ2WNS%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T153036Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD1T%2BlyOHoyF5bKvDX5C1nxbT5VCzYmScuqYfMgVOipcAIhAMbUuMp%2Fw8deqL3Xuf7kK5g0NRknkEBmpb3%2BWhmbkLnWKogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwvsPZPQof6ou6bqyYq3AO8b3ACEo9wXpU7vep6powgAfQanQJDOJ33fPqfQtOCNaeY%2Bt4kyR9J7XIbs2Q2H5%2FAggdgMEoTEov7Jy%2FtHzsOLAuEpozpaIxEn8XuFUG4bjZenBqxAcmH8E%2F9vU%2BzXhbDL8DMNrCm3UnzmEj0dWyDnNzscFba6Giw3xm%2FJUvoRzekUK%2FeZfNrUj0RY5xMvWB%2B6HNK4sjoj1DgvhYZwwK8JkVQlUWAbUmwLEkI%2BHDwnNjioxDjNiQS77i6UE6UBS%2BaP1gqVnWg1%2FUh993MKPxP1ODnOMv6xfu41X29XnKhIqiUFs00FcUpdDemiSYz3%2B4ny19eXFqZPE%2BZL%2FaXdNxrxccpGvtUp9Z9uLEA9RR3v3VIcyfrh60PAQLbk1%2F2n8C952e3SIlUKvJhRR9LhAumR%2BwhEAgzvXCK%2BCfuSOgRkI%2Bzp21JizrA8M%2BPgAs%2BuO%2FlymlG5ZRdiBEI8BU7EJkjuietIkYoLf%2F2GJ2blhNZoiJ8HutE0zhdfBrU7F0aXB4%2B4%2BASygbz%2FrAlIEneUBmQ7sX5SFrF62%2FcRIAZ4so81dR%2Bno73YbtuBKvXwakIE967DkL1c%2FEWD5%2BvEyTVWweY9gnsF3dhHn%2BuSbLrjUI01o%2BCCH4JUuqZqoJxiDDYytDNBjqkAROKiEfbr%2BdPNrnAZadfzvHkDauMTa9YPSxpZ6jdX7iVXFVe%2Fao1RU6L5meqkjMSsuV8J5G6e1zECbrZJILr3nGFDZuLHYIX3%2FOean36CnQ24xrwWZW8%2BgjN6osplOSbAWlyikSRCWUavyGkbY2a5e4%2F%2FoAO5AWgR18AwVf2Mkodsr6Gbfkbk9G1r35Ce0Vfg4B8yml3yJ1WysTN0tHB12g9Msfa&X-Amz-Signature=e0e6784a140871deb91c92153b26d1bcf7ca396974683ac869457404a11823d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CPTIIQM%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T153037Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDDpVkihu0yNlzHX%2BrydMXsg%2BKr7JAf7cMjlFJ1rvcL2QIgaxVdrPa%2FOg27jmQAE%2FjRAX5ygnk6se2Caa7rVVESQg0qiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD6P%2Fbxith9NnpdJEyrcA8r43XMh%2BwvpgBkhrF9djfM54fbQ2TsGV8nb6K6FholwQpBrsejPetd%2FitaLrkegX10wgH943eCKqyjOc1NKu46ySj8Q0f7dNRh2CEcfVAqix7MN3dx2LMxkqqZiXotUTxsprSLfLsvXSyTBTajsSQ36g9zoO0gftnSwCJBfFX7X82Qpzkkgd9OYTAy9KxbJuDO0NaZdSOu7TQdJI6ib8%2FMKnpM3xOmT38JgFa1Dncn08mKZuoe8YQr8RIigPI2cmDLhaadvydQjTvOqaS5cfp%2B2Sl2z6gJGpaJWtm4y4K%2FxVihxB5Pnlw6OiM5pB1BNveH2fFOhoJylCXXmICt48DtNVtsKazQVSxbdlVKDvqw%2BUkDxCDJbD0uRCmX%2Fp8MNKwHacZIF3okYcIZERaFU7O0%2Bj47uOTzkKRjQrI11XBTzHevDELsrTwcsSl5BB%2BiUNb1aEB%2BucX5UidvqFTNi5w4ppvld3RLzdOISNAtHnELOIDmLyF3qHGihI5k6PRuyLeKc1glWbGQqDUe3319ZvBGkg5gTxiyWC00EflvK5x8QKoNOGnu1K5NbS%2FbJhlHvOyyb0F%2BJMiPgvYeZjyoj5yWGTFg9kvVGFnYz8b5mciMkrDhIEozk1mQsY%2B0FMLLK0M0GOqUBY1ElM2%2B%2B5aRQVZOztRfsNtyxevC8CNX096mKF6Tze8nfPPyGNH0PbU5T7SVfpOu0Q%2BlPz6KQeClXuYp%2Bhe88F6MJATKH7HeeLq39Eg7ch67dPeXboBTySxz1N3NU7AGwQVFEq7Pd6bRPjb4ApqVh%2FKGClTm80D4euj3YRZRju%2BwK9IKFS8hy3PcRxSxZDrTskepNW6rZTwB98h%2BCcPdviY3BkbTH&X-Amz-Signature=147471f89108d0969b4eb6f82c890cb016f5300bb4d86b538ef325afac6c7e27&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDW2DP5C%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T153043Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA907ACfXyAda0fndh%2Fhb7vElj2QvkhBL4vvJJkCL%2BX2AiEA%2BlezP0s4mimB5rA%2BPGoBLt8pz%2B3XpOGybdWZglt5tWsqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOHGXu95nZn%2BwLfnzircA3Z%2BY%2ByETGU2y0m%2FtTeoVocuGh07jclrpyOe67eFJsseVI9m5T1ZCdfzMPY0akp6FG4mo6YjO0yDshElgJkuTEv9qnSV3LQB5KaQX5YDKoSstG38E3XyPQfm9cijqs6xBql5IQK44otq8h%2BCgCROyIBkvYNSpn4UWM81QgFTSlkNp2W7xTtC8TkKmxS4hd1eT%2BT%2B66hbbZQWAzFn6yTSUFTEz3Ne%2F07L7tqpr2YY9JoYYWxEJ%2BSX6GAYkkgBCLNcsHjg8D4JWJFGgwLyehnDJrnajrEQMWj5gkpIxdnluH%2BuECvZPGMcA0bC2Yfmck7lydX%2BCqPJwTzu%2BYyNzwvACmmeJTXbN4e5mogSO%2Bwb4FWWaUP8RoReAX9g%2BRxkmKZrpyiMA%2B75AdclCLpymVEQGm0xpHeB2BK95XrKZjrjrCb278K%2FJPVmEJiCfnlUTWRPj%2BcC22KddAcRAEcWLP51shUGqPQR7PHqITNsKE9sDKHm0HLsMK7QFBJAdOeDreTgEYZwauvtRt6YRcuxDrMQ15YZvIsyeIkDEvyLxA%2B3YHOYfcETOMH1Iuut%2F5BRBD1VCLZ1BTCrIGy5e15n6MEHSLY%2BtqV%2BYbf1Mp7Omsup6I%2FobdWi%2FZnoJQ%2BBr%2FzTMJfL0M0GOqUBvdtHnjO5H2RLau%2BsNGqJghKajBexCwEdtAsbt6bOKlxOtGqP7u6nOLb1Kg2mOpPUNqPwnZ3mjnrLgfEa%2Fgw9R%2FT54VuuM5%2FEx%2F7pkshXgoYzhRafPE7FggMtRTqB4hMDSUZkBv5roRG2yKiOhmRlM5%2BTlK01Sqto5zGciQUXoPG2WUtxauHcpsnHwP8h2tfGbFGZWEDAvsyD31ak%2B%2Bou4k%2FQQ%2Bie&X-Amz-Signature=f18cf868f00646efd2cc0c7faa6568d264eac629c303464d0d72b920d43afef3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZVVFKVVY%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T153047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIESIlT57xzMWYovupfGY8POk5U%2Bvn8sae8KHsDsvo86FAiEAueYbq5psV3%2FLLZ64Mk1TVdCGOYWSWbGd0BkL78GzorwqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFSW5S6zMzr%2FDnCdfircA4E%2Bd9UfReP7LxNVdOStbK3jO0DSd%2Ba1sisw2xFme%2BXljWlaSfBgP%2FB9d2XiOzJZTtO1M%2BdXVpQIqFiHhQbpxKszfqbExOB3qthHnal8RSI4O4B0BCKkz3qd9mjlsFLCDZKbMWTWyj%2FE6YPpKv2TCZJWERLQucozRr704BUpUaS6xR3MuS%2B4Gy8ad4irc4sOP1y3W8pm1%2F1S1CS8LrEKGKgMcN4232Enmxxjb5AdNpIlAMJ28Guo4ULRYwsfSZnp0R%2F6BQ0aIZloyRq7yS%2Fftt%2BKRGrWW2Ugu5%2BSJE7mIPITdnBojpGWSh7e9%2BehbGWR8E03VEC5emlsCVsz3scMlxoIRcRbwxzuYqZBfQKnwgze%2BP9qsg2E7N5Jcle%2Bs4tgnjVYuyVyiDDoUyFrtvwrfOhuWAxvgjnmf9Wl588oX5uDY6zKQlYuQJ6mpVIphIqIarJ3hskq64BqjTYCrvi2GeCgEsc218du2Lvr71zJCTcXdjSuRugZsR%2FgXirZSzH7sTVaBjtzZV2Tb1i0eA4Z468C1kUgt2NS%2FKzGGzpWQGKiu7xorbfMlAwa7ANO6lElhF4xCN6JdDv1evNc6MrBkDNZ%2BHtQjsZlTSGDEhWFqU5l4eDMJjC89T%2FR8q38MM%2FL0M0GOqUBsLkKvFea22qb0LG7uwP4rjhlW55l7whpbl4ooOsGXoGZ%2F9j9ycWTIoBXYe4LJydV7xmK6gcXBpuFfQnoxMljDCNH7vt05g8E%2BY%2FalcusVxWu1LDmHcQ3tI7c7YI60tDPN7ZH%2FNfP3G2pT1PgsbWIVCgi3fBndEm%2BR6RZ3KAZaBh7W2LE9FOtNTq0w2xw9QcTBSS0%2FcsxJICeUBjZ7YruzHOhrY9R&X-Amz-Signature=d26ca2bbd390c1986fc4327b0860eda77117555437de48d1f3c97b6836e5c295&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZVVFKVVY%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T153047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIESIlT57xzMWYovupfGY8POk5U%2Bvn8sae8KHsDsvo86FAiEAueYbq5psV3%2FLLZ64Mk1TVdCGOYWSWbGd0BkL78GzorwqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFSW5S6zMzr%2FDnCdfircA4E%2Bd9UfReP7LxNVdOStbK3jO0DSd%2Ba1sisw2xFme%2BXljWlaSfBgP%2FB9d2XiOzJZTtO1M%2BdXVpQIqFiHhQbpxKszfqbExOB3qthHnal8RSI4O4B0BCKkz3qd9mjlsFLCDZKbMWTWyj%2FE6YPpKv2TCZJWERLQucozRr704BUpUaS6xR3MuS%2B4Gy8ad4irc4sOP1y3W8pm1%2F1S1CS8LrEKGKgMcN4232Enmxxjb5AdNpIlAMJ28Guo4ULRYwsfSZnp0R%2F6BQ0aIZloyRq7yS%2Fftt%2BKRGrWW2Ugu5%2BSJE7mIPITdnBojpGWSh7e9%2BehbGWR8E03VEC5emlsCVsz3scMlxoIRcRbwxzuYqZBfQKnwgze%2BP9qsg2E7N5Jcle%2Bs4tgnjVYuyVyiDDoUyFrtvwrfOhuWAxvgjnmf9Wl588oX5uDY6zKQlYuQJ6mpVIphIqIarJ3hskq64BqjTYCrvi2GeCgEsc218du2Lvr71zJCTcXdjSuRugZsR%2FgXirZSzH7sTVaBjtzZV2Tb1i0eA4Z468C1kUgt2NS%2FKzGGzpWQGKiu7xorbfMlAwa7ANO6lElhF4xCN6JdDv1evNc6MrBkDNZ%2BHtQjsZlTSGDEhWFqU5l4eDMJjC89T%2FR8q38MM%2FL0M0GOqUBsLkKvFea22qb0LG7uwP4rjhlW55l7whpbl4ooOsGXoGZ%2F9j9ycWTIoBXYe4LJydV7xmK6gcXBpuFfQnoxMljDCNH7vt05g8E%2BY%2FalcusVxWu1LDmHcQ3tI7c7YI60tDPN7ZH%2FNfP3G2pT1PgsbWIVCgi3fBndEm%2BR6RZ3KAZaBh7W2LE9FOtNTq0w2xw9QcTBSS0%2FcsxJICeUBjZ7YruzHOhrY9R&X-Amz-Signature=ba0d6cfabfc8cb0d259eebab9c8fd5dff7a4913f31876c5b4d6bb5ef356f9bcd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QL3FAHO3%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T153027Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCEA3CUsjqHRTe0HQf%2BtzEccNi6y9TtTDVGqtmDM0%2BV8QIhANytr%2BIo3weizXuQOe1Dnhpv5rSz3e7o7ESG5pPA2W45KogECJD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwy5H6CPdQRu9X9Tuoq3AP93WRMCufIKk6PX7LtwlBBNhlNxurtYBoEJCQg5V5c%2B9daX7Izv12xgY3mYLLGXiExpYipahv5DAbzk0A3ir1dB0UUAANUJvJ4gU9kgOZi3CcZHFSh1og3aET1YWSP5wy4Pycnb%2FqesfaPIuJ9M73%2B4x4cxNCck%2FmmPKGtZb3y9ol3VAm6QkEElw8JoqRgWWAR%2F5tPiZfH7Q2cNYgH1B%2FL1fcpeJX%2Fe3hzD8roWJWRx4RmKIaqrl5i66AYve5Tb0rS2S4TMZOyQdtJXKHzcz%2F%2Fzd9W%2B%2FVKPdzMrXju9JDwqdxS07Sxc3pH683Qj0%2BGdRLcj9qzXuaEuR3eUzB85BqwEEm2Ki0h0DWnGhW0MI5%2BxByhXIT8EYyNkHFWy7Cflox%2FMvpXmCQbXQ1%2FNujbSOEs0RHV8YuiHJSha88O932WFrT0%2FicWo8XJuUMQYo9rUo72JwNmuB3R%2BaSn%2FsytBErSZy5AR2C4z6445Jf2w9RGEpuzO4Lg6yUQz%2FOJJBDtygoWCB%2BElkGEzL5qYdxB3ZBtgqHTc%2Bj8saIV2CEPKMwq%2BE0h%2BTAq%2B6AqS%2B9A4PPbiujI6hP%2BYKTIVRWtOOT7WQ%2F97PA%2FkYUd4EApxBBmWWzbAarktpSzSUIQ6rpGRjDnydDNBjqkAcmGGvHXj5lDZ3MNp66gG2QWU7Oaeuz5N7MHAGt%2F5iXSVJxotgZiQD8D1YlGuJuQgq3M%2FwDa2Zcmx5M4I%2FjTXQpu8KKvliqmx%2FnD%2BSJTm95eyHTg%2F1msmIYwLJFpPUI6HWU053cOECseF%2BGuQEt%2BJ1vFfW6OchGpmjfcXz1JW83dV%2FM%2F8Hv3ZIX7OINeSgBich5ngfkVMMRGxGcRX5L7NdniKi%2Fw&X-Amz-Signature=ffe6001053bb001df2250f4e3ae7746bae7083e18bc7b46e3fa6e2a6993b7b86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRFQFSAY%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T153050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA6j1B7XOlZPbELm%2FNhv8MW2qinVTBKmMMbzOal0y%2F1TAiEA0tFpIhG8enOiUC5LAN97lVpRLJUD7nmwzGSEc%2FdZZfwqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAxZe4HOQ0MZBUledyrcA1syvhh59JIkeyXYVsgahTBrTHMa%2FCb2el3LcB8eZBFPHvVtZ%2BdrhwOhU7pzOHQqobvlXburPgCWeYV1Ui5TCxH8Ol44n5JFGuo5IJ%2F8%2BwxbOBQhkU1o%2BpKdUPO05Y89MrUTDAIlsErBluPX6AF%2FWx%2BX3p1n10ha%2B33AcsyWaZzz6swASQZN48mrlpkPiKoTNAkbZ0dSNG%2Brph52CY5Mg%2F8vAhl1hR0OPncFaYgRnY%2F9is0ej5P1w%2Bn1jwdb66NwC%2BRePl%2BN73lYW3WHbpUZgPROiwPdocRnZeTmffXhaNfqbVk1u76jWYCYYxUfTnDZT67dddIY809TijufjDJTiMp8D7xMW1e4OlTI0iDcZg%2BpZvl9aCZiRWJ4fEm6tiMbX5FDQCsM3r9r%2BfVJ9mQDrRmucZB06UBLVb1tge8GtKjef6EvJtvloQv0ikgeWBakIjWR9Cv8Pj19eE8hcdOyzMp3VvNauGrya9ZoCKBAf1Hv5X1rdasD8TlnJa9omBTf9ZZZ40Kc2AtePWQi2d2z0lvUBrfurr2FvB7z%2FArdYF%2B4%2Fd3p5WZDX9etsRTDS3hjcI4yhoyIq%2FjKeBWRuav4tgUjchbkj5A%2F7JKE7lWPin3v359on6UsV5TvOPUZMJrL0M0GOqUBejTZtfkUQAhG7pzVV756k0XR95ZdHhXKhOz1ZOiRc9y%2BeF24IylkpecHiG7zo4EhWSB7Pa5c1oM9S1sgVv2bNla5nK8p%2FxAxhaFuUtPpt5apiYIfGJ9mgPX9YuGVi3RjdX%2FuPOoFbfoolUmkLuV2f7iqOgfyC2rKX%2FyKFtndsT7CZ%2FXHyb5vKtojJ7G4VeF%2BSWfGRASluTdRv6g424ew6HxQHVU3&X-Amz-Signature=52d30c4bfc1897ee3660ea790bc153818052680a545afd4df354df32dde6e8d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRFQFSAY%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T153050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA6j1B7XOlZPbELm%2FNhv8MW2qinVTBKmMMbzOal0y%2F1TAiEA0tFpIhG8enOiUC5LAN97lVpRLJUD7nmwzGSEc%2FdZZfwqiAQIkP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAxZe4HOQ0MZBUledyrcA1syvhh59JIkeyXYVsgahTBrTHMa%2FCb2el3LcB8eZBFPHvVtZ%2BdrhwOhU7pzOHQqobvlXburPgCWeYV1Ui5TCxH8Ol44n5JFGuo5IJ%2F8%2BwxbOBQhkU1o%2BpKdUPO05Y89MrUTDAIlsErBluPX6AF%2FWx%2BX3p1n10ha%2B33AcsyWaZzz6swASQZN48mrlpkPiKoTNAkbZ0dSNG%2Brph52CY5Mg%2F8vAhl1hR0OPncFaYgRnY%2F9is0ej5P1w%2Bn1jwdb66NwC%2BRePl%2BN73lYW3WHbpUZgPROiwPdocRnZeTmffXhaNfqbVk1u76jWYCYYxUfTnDZT67dddIY809TijufjDJTiMp8D7xMW1e4OlTI0iDcZg%2BpZvl9aCZiRWJ4fEm6tiMbX5FDQCsM3r9r%2BfVJ9mQDrRmucZB06UBLVb1tge8GtKjef6EvJtvloQv0ikgeWBakIjWR9Cv8Pj19eE8hcdOyzMp3VvNauGrya9ZoCKBAf1Hv5X1rdasD8TlnJa9omBTf9ZZZ40Kc2AtePWQi2d2z0lvUBrfurr2FvB7z%2FArdYF%2B4%2Fd3p5WZDX9etsRTDS3hjcI4yhoyIq%2FjKeBWRuav4tgUjchbkj5A%2F7JKE7lWPin3v359on6UsV5TvOPUZMJrL0M0GOqUBejTZtfkUQAhG7pzVV756k0XR95ZdHhXKhOz1ZOiRc9y%2BeF24IylkpecHiG7zo4EhWSB7Pa5c1oM9S1sgVv2bNla5nK8p%2FxAxhaFuUtPpt5apiYIfGJ9mgPX9YuGVi3RjdX%2FuPOoFbfoolUmkLuV2f7iqOgfyC2rKX%2FyKFtndsT7CZ%2FXHyb5vKtojJ7G4VeF%2BSWfGRASluTdRv6g424ew6HxQHVU3&X-Amz-Signature=52d30c4bfc1897ee3660ea790bc153818052680a545afd4df354df32dde6e8d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633J6F72E%2F20260313%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260313T153051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH%2F5BGZFdSrZxXnhynMPOA3MaFnhBd9xx7bS3iV9QmwuAiAQlYqxgXGA9MyPxL9WW%2FP2b7OTodbngaISaKFmdG2HGCqIBAiQ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMormTDDTCmSgw4GorKtwDN0IYnd5xRJY4j0T9TpxkRiCK32H1PYq0zhHFm25NZ6N0fsZmAmwEN0mME3F%2FoPmwcpg78KgFcIWfQSOknY%2BabsPNiKKgSf0bn2CYUaF5nPGFfhs%2F5Qo1lCQMy%2FAWKlrmV4rLW8L4sBXPFFqwBczTIn9YrFJUtNxGum96%2F4Pt7GV69pRLuyWvS3BKoHPJz4yk4pX%2F%2FopYOurteLxPIxnXduD3N2Y2TZVp70d1Z1aNAiR6Z6qOhmd7EwKsdNEJWbpVgfV%2BV8bnje5rcZO2obNxer31Y7jm%2FcJ2LIvNKnqEcpI%2FwJv2TRz2AcYQRPyPe5jDRmbAFoNH6MVfJH0wyTWwtM1421NMcnVAS90qRmq3yZa5PNKeGXZYIM6NZjOACN6lCRft%2FqC0TuPtv3s0b2aJ2mGubLyR1bC89wj98UVm41NNFvZIro8f57t8DbeRMJ48r%2FiMVJma9Wzwl7QD%2Fo1K4HMyZy4Xd%2BWIBTwlYDqe06T4YYXx4a8dD1sIZ27DB0w0H%2Fg6Zop7LQccgogQ3nod%2FojqluwVWd7Cb5jLXUbEBCnYbBsfwKo%2FXbZDU2K6RkM8Zyld9D8LoJ8DKeS9aaw4Ww7vQx2szCZfKqrS6n7sVqMsfvjDh3PS9lTHzyMwxsrQzQY6pgHeRmBm0TfXFgCrR3eOAOZVW8TquMAbnVr2SgvqQGCH29WRcAsx9zXqAfVNV0UY22VEJXgIacFGVjIZ702uHfBYUF9d19iJ%2B9%2BdH8jg%2F%2B3ZxlbaaGLsqBzsRBeflNdXYt5JSfopklYu5TGpDxVMOpkUBUn%2F2BHogfEbFaFzoWwzWKq21rjWlsa3CGt7Tar3Zz9AtZFGCILDANIEMD%2FX7XHQEybKYoHD&X-Amz-Signature=846d48356424800de0ce858775a666197075d478a601760cae26bdb34ffc4ae7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

