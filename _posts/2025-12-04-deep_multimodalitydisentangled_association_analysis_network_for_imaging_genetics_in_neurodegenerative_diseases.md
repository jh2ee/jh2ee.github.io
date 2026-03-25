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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TXC7YHE%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T051731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCO3h82L46xxBn2Wnbm2Auzro0fVcZvJd3uuaR9BRj%2BigIgBxeVMjuSV%2B30AoEazvauiyvIG1SADJJ9akiANHlgshwqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPyxGdjcuAuYACnfuyrcA5Z1Uuc%2F92RPd74jx0p8EzN3mSIxbIILpZ32HLjkVKoD85v0O%2FjEAFPSVVtV8tdyIxYhepZn008Gp%2FYDOWTGS9l%2FAokHB60d1gAymsBlrbM%2F8k7BSCaJktvSNi1PUZsC%2Fd4eHZosn%2Brsf1H4SVJjZXq3RR7xQMz22N4ZVWr6XFZEkIncch1yns0CnPXUGqoff7hU7MMsUQHcwO%2BoX2Dp2rEgcBdfv58meqYuhQwYpOx3TBZL6EaPG554NrkP00ZHC28VWQV0YYZpDYzrhPmI4bm04uH2NCDLzlKWSBWQ6eYvkSceB4wnoTQK5EiYXCRuEr8GNQGqOzagVMVnRL5cXB4LLorRcXPS7xkEyd4k5w%2BAXMFP1plZPm%2FuIh%2BcKBL9V2vsBxTJYF3%2BcXE0%2BVG3DmQEdREEY9klAVkaCkVHvEKdQyFMGPdrEjzRQBdgMhAu%2BHJHLv2yfx5eFKUAVpBwx2mgrcjdlCleMEtB2Z1DXqfzOjsDuEd079M4wXKdPLTqmddeaRSPYcgda7LM%2BGPTtO1eOKtg644HcECasY8jmpSBETlRPkfr%2FeHpUZzur7hn%2FwzwXfVFiUbNWxuDWvnlyv474QauYqAtw%2FTR%2B%2BwtcHnys3g5EBLHc4gf57LPMP%2B2jc4GOqUB1T6GraMObIp%2FExTWR%2FUd3M3hccRi05j4gVeB52ubo7M6z%2FjCAfVt5cOBZldJ9PvxuVU%2FqqVruBIFYAFhsjKDtwJPs7qbLQMpy8Uxrk%2FXXabSFLeka8seSH%2F1yMjTncVdT1K2joaGuA3tXoWSvjwM6Xv0As%2BhhCjnLEt2hkztBNsOfCQNpMScCG2MVG6YBrsKVuaqbc6wd0BBarr2qUYmqFIMtxD9&X-Amz-Signature=ab4c07fb590b4c58282d2c233fa0184be43a87f58db84545fb30e05d561aef9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TXC7YHE%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T051731Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCO3h82L46xxBn2Wnbm2Auzro0fVcZvJd3uuaR9BRj%2BigIgBxeVMjuSV%2B30AoEazvauiyvIG1SADJJ9akiANHlgshwqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPyxGdjcuAuYACnfuyrcA5Z1Uuc%2F92RPd74jx0p8EzN3mSIxbIILpZ32HLjkVKoD85v0O%2FjEAFPSVVtV8tdyIxYhepZn008Gp%2FYDOWTGS9l%2FAokHB60d1gAymsBlrbM%2F8k7BSCaJktvSNi1PUZsC%2Fd4eHZosn%2Brsf1H4SVJjZXq3RR7xQMz22N4ZVWr6XFZEkIncch1yns0CnPXUGqoff7hU7MMsUQHcwO%2BoX2Dp2rEgcBdfv58meqYuhQwYpOx3TBZL6EaPG554NrkP00ZHC28VWQV0YYZpDYzrhPmI4bm04uH2NCDLzlKWSBWQ6eYvkSceB4wnoTQK5EiYXCRuEr8GNQGqOzagVMVnRL5cXB4LLorRcXPS7xkEyd4k5w%2BAXMFP1plZPm%2FuIh%2BcKBL9V2vsBxTJYF3%2BcXE0%2BVG3DmQEdREEY9klAVkaCkVHvEKdQyFMGPdrEjzRQBdgMhAu%2BHJHLv2yfx5eFKUAVpBwx2mgrcjdlCleMEtB2Z1DXqfzOjsDuEd079M4wXKdPLTqmddeaRSPYcgda7LM%2BGPTtO1eOKtg644HcECasY8jmpSBETlRPkfr%2FeHpUZzur7hn%2FwzwXfVFiUbNWxuDWvnlyv474QauYqAtw%2FTR%2B%2BwtcHnys3g5EBLHc4gf57LPMP%2B2jc4GOqUB1T6GraMObIp%2FExTWR%2FUd3M3hccRi05j4gVeB52ubo7M6z%2FjCAfVt5cOBZldJ9PvxuVU%2FqqVruBIFYAFhsjKDtwJPs7qbLQMpy8Uxrk%2FXXabSFLeka8seSH%2F1yMjTncVdT1K2joaGuA3tXoWSvjwM6Xv0As%2BhhCjnLEt2hkztBNsOfCQNpMScCG2MVG6YBrsKVuaqbc6wd0BBarr2qUYmqFIMtxD9&X-Amz-Signature=ab4c07fb590b4c58282d2c233fa0184be43a87f58db84545fb30e05d561aef9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIUY2KCP%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T051732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFIvZ30TTdhWRQOTmazgsMbt964oaozOTPZtQFL0ceB%2BAiBqLVtO6dC5%2B7zq7XWRgBZEqCq8elURelBttpYST2OiCyqIBAil%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMvRAJAyi%2BhKCtWlLiKtwDsjiEciOsdQywyDfssiFCDeOalGrzlRzWrRfenaZDNErCYsS1GV9BuJVYcQ50A8NP62lODlPZH3k2pLgVkzVKUdY2Uq2xywn8onLVYPqdJEGOgYD25nfONUUFZdkLqPfZ80EHMNywz5lLj29U51E3PbOJK0nz%2BstJ%2FZHe5TCora73GYLwbkik%2B6%2FEyaF8uHUS%2BjGhNQdEzhZa41mw9aXjNPuuN8v3C6pJDdIh7Vl9xrLKfJbFdaWpqAVGivEsuxjfBMjnxXn4LIyBjGi8%2BT3FKFWaaWyDybDtwuj%2B8gxzTQZc4ZH4wwlqfk1TJz71I2gFz6NBpjfx15eTDWWfwUzt%2BcNDKbWAZ%2BGn32apHU5dla%2FLLGkZjN%2FOC6Eok7WX1%2BhHN5cWkVH3%2BfkJkVGe7ULp4B86uBJW0RgWoTq9box9nn4d6KTJU%2FjU0dwphe7XIQO7QaAFa6ukRouj5k8xAT0ig3r1pgYI69tkgksz7OQKkxhvStabXMDpr8Wu7ngzY%2BGCxlxJQDM4z5FBNVie%2BmUqST1S%2BV3sWet0%2Bl2ukBMJeLDcHs%2FKsXmD2BUO37VZdhidK9ARuYAy1On2%2FY6ZKDiAp3VwL%2FMF5EgeprpoJ%2BNA4OvnbrMytSZoAF1EY74w%2BrWNzgY6pgF%2BlgKN7eGSSaoAxkEa90biE4%2BNscdNCrxdPjaSX1lPwERKPgOzb4oc7pkfg%2FBVli4Xvx5il%2FDvWViYCgr4pPT9MNrCnk%2BrFfDPfEajNzrmIW4M38RhDNj1KxwFHSbhwjzZlPmfwDz9jSyWfMEq0B9471BC0BkdMXaf2np343EKQjXca1Iue5wlQCRA8g8Yz7KMlN%2Bvyp%2FmxH5x8YfrjsQChfT%2B6fjW&X-Amz-Signature=81f1af86e0b56361ae61daf1a2a8de01c5fbec07dbeaa7f115b90eb3c0e570d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4ACTI3P%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T051743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH2o73T8BvuAn7zIABs0FhFbDQM3vgKU2MqQXIg9GZMOAiEA2HMPuN15uXOWI9%2B2l2Z9Qr0aDhi%2FOir5Aivu1NA4JyAqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF%2FPO%2BmcqdfOIhrJbSrcA7hnV2i4yyUR0lmHQn7jgRP7NSsS8uVYdHK%2Fg%2BzGgt8cME8CGEgCa5tLb8gG38ie7reOsxk08KXSxUJEFldr9ZGKkZoHhSJBe%2Fm3Wn1d2VY8w7nYJsJCIXWVO6g2oKM8G6W5u%2BTaYQX0P8Yk9kJmZKLKJgsg%2Br2ioL1GlTJ3fbsbXHKj73x47fVa%2FgAnQIvSpdLvqKat3RrCMztwSBiDJxGgegRr45%2FcJwqho1bn4EPmAbTC4f21GaIrXQqITgry3j8nCKxKHWv%2F27IvnKGKmi7MXzGpyrKLStsS%2B2LbP2DY%2FqfsyQowDcu1%2Fvu7WUTjIBHs8f%2BZVDSDGnkNpj0%2FHKCTVrMyJ47RoFRREe3JT0JbilLLefEwJgdPXCUBUjRWp4w%2F2U0svB9iuzg%2B%2BR8KfyvYgBxoLR4qelGJ8yyx%2BcBebFTvlVX5orAp%2FeIYyKh7QXkKLJjko6RpKpZ3OfuPwu6NTGUgJWuPgjYJX5rHSh6XbjSTfmXzkznm4EKgwS%2Fb6ASMGLfgxNV%2FSWSjCb5FVqk7gRbETwipg%2Bl%2FaZenojA8JuA1GWUQNGgvuCmu8OKJq1FKzg5YtSglU%2FVcRqUKySvPQqmlKMqM%2BmdmDIT%2F9pM2ry%2FSsuixB5FQHXffMMa2jc4GOqUB6oupuc4MTcK2z1hmB7RvzIAY2WsFyxdzOLdtJo%2F%2FqR2B2nzEr4cwunKSrIqiBAg2kqM2Y6Mr48Gd1hVLygSVY4RCEnbJm48vd%2BDaGc%2FcrsRVns4tf6Nu2vB2WVySo%2BB3MFZb0F5PrKao69MN89zGGqJu17GTETeTGZQ%2FYQqoAXNBp%2FQKDdXxpq9yxq%2BxHoxaH82%2BbTfSUctlNZ%2BNBl%2FoILSvhp5w&X-Amz-Signature=11ac5378c34733275113ae1b935c306874a973acfb6dcf1a14c4557599d0d091&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4ACTI3P%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T051743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH2o73T8BvuAn7zIABs0FhFbDQM3vgKU2MqQXIg9GZMOAiEA2HMPuN15uXOWI9%2B2l2Z9Qr0aDhi%2FOir5Aivu1NA4JyAqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF%2FPO%2BmcqdfOIhrJbSrcA7hnV2i4yyUR0lmHQn7jgRP7NSsS8uVYdHK%2Fg%2BzGgt8cME8CGEgCa5tLb8gG38ie7reOsxk08KXSxUJEFldr9ZGKkZoHhSJBe%2Fm3Wn1d2VY8w7nYJsJCIXWVO6g2oKM8G6W5u%2BTaYQX0P8Yk9kJmZKLKJgsg%2Br2ioL1GlTJ3fbsbXHKj73x47fVa%2FgAnQIvSpdLvqKat3RrCMztwSBiDJxGgegRr45%2FcJwqho1bn4EPmAbTC4f21GaIrXQqITgry3j8nCKxKHWv%2F27IvnKGKmi7MXzGpyrKLStsS%2B2LbP2DY%2FqfsyQowDcu1%2Fvu7WUTjIBHs8f%2BZVDSDGnkNpj0%2FHKCTVrMyJ47RoFRREe3JT0JbilLLefEwJgdPXCUBUjRWp4w%2F2U0svB9iuzg%2B%2BR8KfyvYgBxoLR4qelGJ8yyx%2BcBebFTvlVX5orAp%2FeIYyKh7QXkKLJjko6RpKpZ3OfuPwu6NTGUgJWuPgjYJX5rHSh6XbjSTfmXzkznm4EKgwS%2Fb6ASMGLfgxNV%2FSWSjCb5FVqk7gRbETwipg%2Bl%2FaZenojA8JuA1GWUQNGgvuCmu8OKJq1FKzg5YtSglU%2FVcRqUKySvPQqmlKMqM%2BmdmDIT%2F9pM2ry%2FSsuixB5FQHXffMMa2jc4GOqUB6oupuc4MTcK2z1hmB7RvzIAY2WsFyxdzOLdtJo%2F%2FqR2B2nzEr4cwunKSrIqiBAg2kqM2Y6Mr48Gd1hVLygSVY4RCEnbJm48vd%2BDaGc%2FcrsRVns4tf6Nu2vB2WVySo%2BB3MFZb0F5PrKao69MN89zGGqJu17GTETeTGZQ%2FYQqoAXNBp%2FQKDdXxpq9yxq%2BxHoxaH82%2BbTfSUctlNZ%2BNBl%2FoILSvhp5w&X-Amz-Signature=56507e2d07fdfcf163722c96077cc916c927416f264d345fa1ede8c8208786c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBRM7YVA%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T051743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIATTsx0IDuA2D1prDZrk2Dz3qQyEAYni7gEhjRzgzJZXAiEAqApG%2BLBh2Ro3VyrrGWzcYac9QprdPALvvxPhWdkmwsUqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDBXtPcuqaXSol6nIircAza%2FqjpXT2zG8WFfhkIo%2BA2GXivhefTEj3dhWLxjFEfGze4ERB1m%2BoTDfNbXbJE35HEBxv9CEFIfKc6MnMcTpQjb0fz4DkkND0OTBzsCm7IgmtkYRWY0AzGus4s7OFcjTfKvsj%2FRejgbgB%2FEHGccCLgHWJpbxBvBjzDRcYcc%2BCKcMeEffXedaeXV961FwEM8hoPUn5bKMNwfPELl1ff%2FyaDHvV%2B4wYAQ9I6fdShVap4RnVct7HVKzzDWZdUWk205OovOh2M6W73pMt7%2BQHs4%2FoGLu0gCt7%2BmvFKgF0H%2BEFYsaXSwpmyOIATAYlD4%2BM0x0yq%2BES9eylH7hVXT2sfhA1trzvgIGt355GPDcvjtNMx206hLeuQZeRWmaaNyk%2F%2BlXJ9RqDzGNq5n7P8fa8QR9y9ayGVBdfoSn7obJLGXj2nC1jVPAtt4xR4rkuoUSRR9V%2BLuEMAvGJq4MTmmpYQcIxAfPQcYB1UmLVsGL2ENHYM8JGBOQui5XRt4iFoaLCfTd0yibf7iC%2Fgdc%2B7DoytqkBmrp%2FRzmO6Vh3qdO%2B%2FXipvhtw10PoNacYJcLG2d9ZCD2MscAR9%2BIjRivbHFpwhVKq5M8EvTJMdehq1JFt9XNVLAssautg848SJ51EFFMLW3jc4GOqUBad9AV%2F%2BrRQsbTE41MQswrUyc98mq3E2MFy4ZhuqvEZZSS9Qgb62DYdgQHPztwqXgRRtBq1dEwpCC53X1F4ZAnvB5cA7sqL%2FwTDQFPbAKnPmbkjMECSdMNsq9gAEQ1vLgtiKPxpg15B3ZZQgGD2HzMxtBrEe7U4Pr0txCgj1z89IRQ71GELtxp0jI0Nf82Yr3RMDbEoHFYXr4vOJx1eJeKEJF%2B6%2BY&X-Amz-Signature=1a1ca3050adee3975085dbe2934b5843d1988fe3c728e0ed9484675524c7d66d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXX6UEE3%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T051743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCfhgsyt4tsVd3Ke5ZYFrWmcnKsGis6KfPy79yumYyJKAIhAIGJVPfhc8XWua9QAct4Tp18jOdslQj5Av91j0QYN%2BHfKogECKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx5Jc3IS8r4jhsg%2F4Qq3AOgXNSqNUGibonJvI3O%2Bn6zNyM%2BeCjZ2pwn7qzW5aBZ4tBsVxcgjRMbBRKlDAclGtEAogL3vPcq2%2FkkuhgIqdu0ZYBE5uQd6Fr%2FlzFnRXotkwoQrKHvr158vGtX1i%2BIzbsBWlWwGzQD2XurSnHcIQn71xYiGju7tmOm4IpNHDtXaCJj5ZW86Kl%2FnRQyPl6tkY1aKlGZrh4TFdxNxgJ%2BJuVTZYpKvp1wHgaOcy79Pdx5%2FKrsQSYxuB7kwTWbNfIooJaPfSeF3XLC2H8kkHu6tIikUTb9E9oJG46aUROBBq1GV8938x8ZjUpiX38haImjNVIP%2FB9aYysuG3SjARPp6ZJVUFDf0fbgYykFAv74MhcaFPJULQFldEducdiyBDl7nWUpdCMOCn8%2BywL6MZNUfY5qwFWFo1QGrbL58DwTN8MG8C11f2eB1I51CwLJQvcCBWEUXgP4jc6RNqU6SUWoSsgJL15FdfsfZA9eQtGQ7AGOvt%2Ff%2FXbEMVQUE0GMQBG7IzvfhpmLuJilXkkuEbFD1a6i%2FJi6EF%2FnxXc7xFk9o66GriwhtU6A0Qh9eBFxqv5TTdqQ%2BQ6Xd7tfydh9VvPXbbb6nU6d3x%2Fl4npEf7OBiVAJCzdRHDyMUS9097trfDD0to3OBjqkAe%2BZn%2F%2B6fB5OA36A1B8AxLwhN8HIsKxz9p%2F%2FLgL32aAiZEuKsZjxL4Sd0FFep199zJXXJuGHXr4Yzgq32xB%2Bq0rbHb7MWeiklVXeOYCtjNHwjOebMkRP5CcpjJhIqpfwe3VFUDfxxwGUjpljrWlxoGqth0M7e6O5BxDXODjT57hIOEPidqgSYcXi9ozm5OCLaxd%2FToVrRPGG5ubLiymdVO0Ei7rV&X-Amz-Signature=0d39cae4a02fad1548a9d14200431e74df220d9cbaad04703c20b538c59c200b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAG7E7CM%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T051745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCEcyR8MWUmyxaOhpbGEQJTWm9vehQfchAJsg6iZaZIiAIhAPIkaSYzFGG74JY17eFjdad%2FMNezLFL61s9KcmrOjUEsKogECKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxjvPmecHrW2ggNRGsq3AN%2BlLTaocacck2eTI6taCQjTmTXylEExFbXEcP6gzklw5uIyY75Ze3kR0VhFNV1BmMCFFthb1NU2ZATW9Zjq3U7azBiOJtfEPcBpvRmVKuWgbhyOd6RtBw7pvYhBYNCdQaMu67u3ZZhcACtBvAlRaox%2F5KXV%2Fosw3MRUB8ftk8K%2Bh0r%2BgzLk2G2DgYRdf4uebTI6lSq0M2o0wH6kaW3nFvd3V7n%2BmNJaEqIRcfGqVOZA%2F4YmVZPinKop%2Fwp5y9UW2tHyjYaKzDrRwwICdIytM%2B3jpozTPxC0wQZC71f0aO4dYheHYS6c5VBP5gf0ALCsQBpg%2FNmwHCVzSJ3g%2BXuly69pKpRvGMPE3A1mD2iXqXJaZNB7%2BwgOn9f79SvfarGrF6r94YivLSAFZxWv5lXxeHbAcg0e%2BRU8njJLuZ5zvZHShI27kq2pbmTlV6qs%2F2srdtHA8mPI7NsLoGBeLvNTFxzsu0WRs%2BRz7J84rtqWEG4UTPVJ0PAREHUzLa4tctTItokOrazPlP66sVFlg5oyVPdd8pdFqqGliMTumpEnvoTvUjcYtjovCSyaAS%2B9GTdNFSAfFzDIyf1HhWQ2lwCjvnv2EV7ARvRZ7Bg4lHy2gzdaYSyKBEDZHc4HRbZpDDcto3OBjqkAUX2xDnVi7O2OuKdEQSI3VJFyZc5g0YxkQME9cKx3kkp2uVhZ4641W1GyPQaAoprnFffFsAEWE%2BvDZdEDErGKDU0kdMsz5mG5tw61ff6Ua54v2HSFP2Mq4Hyqc0LnKKa3alvWUe8SqpcfsjPwvYER1KBA9ccgf94fYjRGEKng31VdhY8YFYc57Oo55DXUY3qjOZutWvRhdXBgDDh4QXiILElMWoT&X-Amz-Signature=172e94d3628ee5b6c9e0014d052ba50d356c98881554020fb510f7449f56def4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBQQCXOE%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T051750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD9yJKKs5OxMzDpVazEZiKE5FjeaDJUNx4MeU2rjxBO8AIhANWznJ3valVwhH1wOPPTXsJIxma2NpsrczJA5udqTr2nKogECKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwm%2FsrcXWFwVYTZLCAq3ANszITX78gr1%2BqhhhPauj8VAUfIa5Y8zquxlYGSPLgB7Ca6ErdVeW7tN2UPTcL3qpia1BzX9f7ZwB%2FD%2Bs2tybeIcxNTtT8EUM%2F%2F5S8kkl052S9Mpqlke5U5FviEk8%2FJ9SKjWXs%2Fz%2FPhs3%2Bhae%2B%2BDCnGljtmj%2FMsPQuxvo4v%2B8smzC5eB1YXLGlIpec9bxXaF9YDmf%2FFRK2TR3qoOCs6QkbmxLus0Pn80wdJenPrhPc3n7%2B%2B85kgAkr2zpsmtJL8odlRViHIoHWubN0J4dZy472PTmGZfsyHxbYaphFTHc6xIzZwWdIy7M9eZzOk6ThG%2BYficCIK0mrm1M%2FWWUUHKKdYNyfjdFS0eunX53PAWmMgoipGRkolOpvJOzzoi2RjMTyvxfqbSyUVeFgVpttcCK%2B6b%2FAUzV8uTuYoaLM0%2FYmNo7Ef4cFUH%2FGHPygruRNQdOePyy07iRo66A0%2Ba9AzQZHS%2BXLQyvPxPsNS6Yakvs9PU%2Fl5nVC8JxX%2F%2Bu0HsKbF85zpRJQ0aOLCat%2BgTZfJfm%2FlVz5eNVR%2F91cmPNMf9mZKNar6%2FCTDv7qeasrcYyGhqHieZbDW537ehdW5ASaN8W%2BKnVI%2FhYx6qo4mcf0WO0v5ViL15%2B4vQRfP1EjlyzCvto3OBjqkAZEHCd1%2BOT624otbmfkvQpZmUPbPbCOWqdmsKMiWTuUzbzye2OQokl6iHPoHObjnMHADkS%2Ba1%2FrcZ820Ba%2B1stgqy8kl43dIhoEU4Wp%2Bn1Xr0QH2uD5%2Bhtc%2BdRKNAH7LvG%2BMHjZA3XRvLQtc3kpqJTOkitVvSEYsQUlHCWmnVCQaRve8OkCZOtHqqdFuul%2BfehbVczl5eJSN0fLJN7QjU3CK0i4M&X-Amz-Signature=3044a4d336ef7424d1ddd4481307c71ee250c6f9eee4c99fd5e8f874e96b1b31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RBQQCXOE%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T051750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD9yJKKs5OxMzDpVazEZiKE5FjeaDJUNx4MeU2rjxBO8AIhANWznJ3valVwhH1wOPPTXsJIxma2NpsrczJA5udqTr2nKogECKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwm%2FsrcXWFwVYTZLCAq3ANszITX78gr1%2BqhhhPauj8VAUfIa5Y8zquxlYGSPLgB7Ca6ErdVeW7tN2UPTcL3qpia1BzX9f7ZwB%2FD%2Bs2tybeIcxNTtT8EUM%2F%2F5S8kkl052S9Mpqlke5U5FviEk8%2FJ9SKjWXs%2Fz%2FPhs3%2Bhae%2B%2BDCnGljtmj%2FMsPQuxvo4v%2B8smzC5eB1YXLGlIpec9bxXaF9YDmf%2FFRK2TR3qoOCs6QkbmxLus0Pn80wdJenPrhPc3n7%2B%2B85kgAkr2zpsmtJL8odlRViHIoHWubN0J4dZy472PTmGZfsyHxbYaphFTHc6xIzZwWdIy7M9eZzOk6ThG%2BYficCIK0mrm1M%2FWWUUHKKdYNyfjdFS0eunX53PAWmMgoipGRkolOpvJOzzoi2RjMTyvxfqbSyUVeFgVpttcCK%2B6b%2FAUzV8uTuYoaLM0%2FYmNo7Ef4cFUH%2FGHPygruRNQdOePyy07iRo66A0%2Ba9AzQZHS%2BXLQyvPxPsNS6Yakvs9PU%2Fl5nVC8JxX%2F%2Bu0HsKbF85zpRJQ0aOLCat%2BgTZfJfm%2FlVz5eNVR%2F91cmPNMf9mZKNar6%2FCTDv7qeasrcYyGhqHieZbDW537ehdW5ASaN8W%2BKnVI%2FhYx6qo4mcf0WO0v5ViL15%2B4vQRfP1EjlyzCvto3OBjqkAZEHCd1%2BOT624otbmfkvQpZmUPbPbCOWqdmsKMiWTuUzbzye2OQokl6iHPoHObjnMHADkS%2Ba1%2FrcZ820Ba%2B1stgqy8kl43dIhoEU4Wp%2Bn1Xr0QH2uD5%2Bhtc%2BdRKNAH7LvG%2BMHjZA3XRvLQtc3kpqJTOkitVvSEYsQUlHCWmnVCQaRve8OkCZOtHqqdFuul%2BfehbVczl5eJSN0fLJN7QjU3CK0i4M&X-Amz-Signature=d31cac7c10d75152ff2a95bfd3b229de9e2eac818b5d6a543f59af1a785d4e85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654WJKPZO%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T051729Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGQOlVVTOre8WfFAm%2BwyKO%2B%2Fqv5A8xav0Cq5Pwu5CbM%2FAiEAzSN2DVARyWQbeBhXPgk9fTVDNvup0iV3dzz3d2uBSMwqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMPuqgJhmxvwr%2Bf6fyrcAwq%2BzzsMpdL66%2B1Ln2GqrAMPwmC2AT67En83j945JylTeFqgs30zIrnTDmeevzgqulhnLE4q9dsdPqr6qkaTX3bzoVEpr1gSel46aP3ZgMG%2Bv8FpIZND15ttbriy9w6RueswjdMPvgBLfXDy1JybIUew5u%2FoVg2TxlcZkBjSwGl17CIDcvg6dFBKiKkgy2Ecx6XKg%2FijQuQE%2FwuXIL5zlwD8f%2FpkKdcSHO1VfBMqKKYJ9%2B19Fi4rrD23Xv14QHciJ468phL2x0fHf6zVH2EnB7Xe%2BN1gByBIKuqQ9gWZ4GrvcLL7%2FWa%2F0Hu3%2BRAZBBERqTbQzK43DxX0Au8%2FGS9%2B%2Bwfzb7y%2BHmniIREyNSsR4kjXBScs7EFJLl5yTAEyUkwPfnn3UuqPcroBlAa6q9fgyOqb1h8XWPtiWlju3QW1KjRguEj6aEnvqISIUZTH4dz3r5j5MROTp9ghymx2z7J0CMZ1IgoG4tq7NdmjW8nr2H0saeu4he1meC3TqEsos7j07qXyoxDDRHpo2arGjnnj13mAePBc%2F0af88oufyUAQBH4aMHJUfayjxyc5HozstNbXwbpqbP8CszR1%2FKvqRLY167AT2iSs0jKUdjspe%2BTManTcNm33M39C6C%2BqxZJMJe3jc4GOqUBuEjMYRnUK9cRh7LzePNdIgK1IPExcl%2B8RL6Gt5jrWTgATTF3PU4Xf9LDU1LQiBRoqxwBbmlga%2BJTyMGCKiIcpSz7EwhqP7i1tYFuxmNN7EREz8KvqJhvBgg%2B4PDkAglJsDrAj4ubHZ4zFs2kVrAMULqUosBm52RzoeKOm0%2FQfWkz2STOdOW9F1zMo2jQrVne1B0tXynmwJVf2aXj0WqbL1N%2FUwB5&X-Amz-Signature=a4a0f76801e865f5620101cc47bac1ed15a2f192d978be401ecac7862e170b16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCOSZ2R7%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T051755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHZA4H1DS2piQzS9dRhCxyru6Mr2G1XaJXIcDnZL%2FTadAiAW6NT8Bzvd05kHeRSWEs%2ByHuM%2FCua7gJrQ6gsPRoHNviqIBAil%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMKWsVpvApgAgOAXTZKtwDnwpECuRA1i%2B3hCBfjyiPrKT4gpb5Mev9F836pdr0i2%2BcEh1UrW9hdYbZmNfsbVk5cTXo8sN5vVTE7m2uGW9FD8Tk5EBRpqRav3ySJq8bJ9V%2FS06xPxuIdhzGeYoekEByVVa3At5Wh8eirN55iO0goJ0yZgvIAwsuUwYt00TG8e07zTkvdCufEs7%2Bw6vccOIiUypDbivLnJXdxS0c%2BiFM2dkYhE305IpFsY8GORu6ug8qZMPs0H4i4VX3sqMsNe5D%2FkM3c44rst5VbYNFMNpiKlFuNnKMDYPPUuXsKuT83K0rknHcscthuYWsaRdjQmcSeneO8ZmEi1sOaw7GlHhyPvNb%2FGsrcc0dXgOUl6bPF1hcVZIVlGuR8CC9qYD8QyqELia4qt6o0wMK4dF4mriTTaCKByWA%2B3A9yyaO9zlLWMwotXBCOtOH56jUtBpFYCGuukzpRbp83OoNYZASWXH4dEnwioI8%2Fcfeo3nJFPpgsUuo4j%2FowSQa4VNod9v7SICm4EudT7aK8ds9rx56XlKfwvpy06qU7zOqXRlfeM8sLOFAGbFvLKido%2FaiXXRfzz3%2FLY8WRSMajlhsBrIZe9Sq23hGh6ta%2B735TLqNLGIhR%2Fvi0VW7Ook8jY5MTHIww7aNzgY6pgH1J54Y%2BAw7QkR4%2FFhZGizd1VHPWcArc8zfZQZfc%2FGwzxTWlFGpeuX0OmqXtz%2Bs8omH%2BomijVYK6HBxNOkKSCw%2BpWiHGGzAXsRJTv9h1gFM%2Fs9fhyd4tkEAP3arC6FnjqqajHqzTyvkw%2F%2BG3xuEEehYbsCbX9%2FZo7KpSHfTjgzhOzmFtH%2Fp4sntNf8jm4MqXVmMM1ZTU7IS%2Faj1BiDXGyQhDoxHhTtx&X-Amz-Signature=27d9fb3d39dbe4a83a4bf4e54ae201397e7d26cb29f61a1236badeb824eb007b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RCOSZ2R7%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T051755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHZA4H1DS2piQzS9dRhCxyru6Mr2G1XaJXIcDnZL%2FTadAiAW6NT8Bzvd05kHeRSWEs%2ByHuM%2FCua7gJrQ6gsPRoHNviqIBAil%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMKWsVpvApgAgOAXTZKtwDnwpECuRA1i%2B3hCBfjyiPrKT4gpb5Mev9F836pdr0i2%2BcEh1UrW9hdYbZmNfsbVk5cTXo8sN5vVTE7m2uGW9FD8Tk5EBRpqRav3ySJq8bJ9V%2FS06xPxuIdhzGeYoekEByVVa3At5Wh8eirN55iO0goJ0yZgvIAwsuUwYt00TG8e07zTkvdCufEs7%2Bw6vccOIiUypDbivLnJXdxS0c%2BiFM2dkYhE305IpFsY8GORu6ug8qZMPs0H4i4VX3sqMsNe5D%2FkM3c44rst5VbYNFMNpiKlFuNnKMDYPPUuXsKuT83K0rknHcscthuYWsaRdjQmcSeneO8ZmEi1sOaw7GlHhyPvNb%2FGsrcc0dXgOUl6bPF1hcVZIVlGuR8CC9qYD8QyqELia4qt6o0wMK4dF4mriTTaCKByWA%2B3A9yyaO9zlLWMwotXBCOtOH56jUtBpFYCGuukzpRbp83OoNYZASWXH4dEnwioI8%2Fcfeo3nJFPpgsUuo4j%2FowSQa4VNod9v7SICm4EudT7aK8ds9rx56XlKfwvpy06qU7zOqXRlfeM8sLOFAGbFvLKido%2FaiXXRfzz3%2FLY8WRSMajlhsBrIZe9Sq23hGh6ta%2B735TLqNLGIhR%2Fvi0VW7Ook8jY5MTHIww7aNzgY6pgH1J54Y%2BAw7QkR4%2FFhZGizd1VHPWcArc8zfZQZfc%2FGwzxTWlFGpeuX0OmqXtz%2Bs8omH%2BomijVYK6HBxNOkKSCw%2BpWiHGGzAXsRJTv9h1gFM%2Fs9fhyd4tkEAP3arC6FnjqqajHqzTyvkw%2F%2BG3xuEEehYbsCbX9%2FZo7KpSHfTjgzhOzmFtH%2Fp4sntNf8jm4MqXVmMM1ZTU7IS%2Faj1BiDXGyQhDoxHhTtx&X-Amz-Signature=27d9fb3d39dbe4a83a4bf4e54ae201397e7d26cb29f61a1236badeb824eb007b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YF55CQ3W%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T051755Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH7rtYQQhbnAX6nx88hgr3NJKcrTVRUcC5SVdXG9jL4lAiEAxSjt%2BlGGF8f%2Bjg04ZS8m%2BImw9TkzAl%2F77Ma1gDYb5aQqiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFJ6KFePbIYx25Y%2BtyrcA1HsNKycOuO0%2F%2FIeGarprxcTQo5Q00Fnlej7UlgxXPi8z2Q1vztI5VY1Ub8nLx7QbEBWo6G6SXQtmcReXSBsXog%2BrcnMRrxry8kg8hP%2BuEqTjYbhxpefAdE6%2BZ4GZ7ge05g%2BMy%2B4Pb3gctljfghTrttabpGP%2BvXgrkEObmmlwIF7ZqBXENSLaSvAuGyZOtNvHaK5eLkl8rjOUaM9Yd81jGGZk2Un4J0giMB81D3bip%2FK9%2BMMTiND%2F8XbKxi37aeASPC6beuvJ8lKVekUpyfZFuvtv7AV%2FfhDzOjDaCx27Kpadhe8D3RzQSsCtjqmi%2F6XzxCMuo5Aqlyh0vL2x%2F%2Facqb39SLeYh%2Bh93BY1KMmba0q%2BeDDhE%2Bh7d0Np6Om2vKbmFuaKTVvGJwtkgH1zzJ%2Fucu%2BZWNkTtPUbNCiA2URWgxVk%2F8VYlnn%2BLQoMywZ%2F4jpCko7Y9d1vMnm1htwut6UC0TODlaVq3JQgBCMcJUvhi8vTekw6IXrIkX4x16NL18glhXljlHCMDMq57PY0d6pL3wBs1%2B9G7hLshKZjIf%2FOKybZ9icS7lIAsuXTwNB7%2BwT%2FfBW6Q16gFkb8Iu1wqMsU4F3VyPBF4hOWYCCVXlrEwtWOPnltHxuf6xncRR8MJ%2B2jc4GOqUBJMRMCzDNmmt60PyQ50G67HMtsDj16VT1IuKnCSeZqX6%2F6ZEcUlxBBvibJ2yh%2Beuo4dqqKyIociwMg46tbEqzfuC43xO9kQca2Bi6UDPgBAfbxG8YdgyKcCvyYf2uv54aVADHVnpFIoMqNywZkrQDQNqaHb%2BV0fpB6Ket2PdUFDTautPrQJtkflm4YFPDjAHNjbIquqkfba90njOcc6wZ10ehuGDj&X-Amz-Signature=451fa0b7fa7a2f58a3336c84985333722af00aae5a1e57b32d50a0d1545661ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

