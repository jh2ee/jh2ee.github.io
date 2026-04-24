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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QH6WZLUQ%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T142515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA9IElG0vHUqdQaqCBk2s3ZVfLb6OFCqhQoTlyr%2F6RFdAiBv3E2Gx608KdtEfHzxMWR38mXtNGq8VdtlJejWXqP3yCr%2FAwh%2FEAAaDDYzNzQyMzE4MzgwNSIMS6KBtAFymhkVBZ5hKtwDlRkxzIbxc3X6JseCp%2BgP7EQaxlXwPeSbYB0Ev1TFsoXfe1qUeSd2K8RRu0oZxErsBfZavDv0GgMfheIg5SQDqwXjwnPZoHHkwRSjpBqQcEN%2F2SG6Ew%2B8rxMMgf5Nu2JKx81wTkBCc%2BnxuK8NJLXZdjiEDPNKr1G%2FITHriNfawcU13KScHLavQ%2BglaeltuFprM9F8ormnzuNi0%2F%2BRqhrp33q2gSRHCwC9lJcKdA6OpDYxsf9E6l5Ps7E4UzJXacqpr3Hc2kALuSQ4P%2FLmnBxox37MoOpxj4KCbGbkl2QHKno4NnkTqXDVAyDuOrtGgSQnHWhjcjE53LlKI8C%2F7HHzwgCNZ1oEuLQvmnPIIYglc527x7vKvMakqtoP3h%2F93DICOf8EqRlNTYkziBg5dl8ORp2zyG%2B0EKX5jdmEBQbfo%2F79azb0f2smIb7WOjQBPgqEMex%2By9jZbMLoybP3MAm7yTiruHT%2BunGiK3%2FIe4CG7LqwBGG8VssRpYKHted1aN9DzC3Vgh0nYoTJq7QONtvzGI38YQSOkIRNF%2BljzOVK9vEWXCZiAw7CRS%2FrL4CdqC8Xg%2BMNPH%2BsENaYR%2FgEESULZ1yu3gn4blTRWxMLjIebYcasGqFEEAeCfpzSeDcwgfCtzwY6pgGGs336dUtWcaODjtwaV9z2Fx4ewedG9Tx9XZn%2FlQq%2BExmrqpCfS9Q%2BQE1KUyrAy1Qy2Eq24zgLhSGEPiTzO6ww4Taq1gk1cVMqpenWMsfSyDPHFHnRU4FFrZ%2FOf%2FaHliCOwsGI5YSAnK%2Bft9xcxg6vy8MsQjE9Zqs5P94clUFmHzJILF4dDVVWStNDOrzYDDmadlBxjhNpGxpG1zWZusmIVLtmdoNE&X-Amz-Signature=7516dc4cd6bbf7f0ef7683fb35100f290d1ffa3221bac820feb601a2609a21ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QH6WZLUQ%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T142515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIA9IElG0vHUqdQaqCBk2s3ZVfLb6OFCqhQoTlyr%2F6RFdAiBv3E2Gx608KdtEfHzxMWR38mXtNGq8VdtlJejWXqP3yCr%2FAwh%2FEAAaDDYzNzQyMzE4MzgwNSIMS6KBtAFymhkVBZ5hKtwDlRkxzIbxc3X6JseCp%2BgP7EQaxlXwPeSbYB0Ev1TFsoXfe1qUeSd2K8RRu0oZxErsBfZavDv0GgMfheIg5SQDqwXjwnPZoHHkwRSjpBqQcEN%2F2SG6Ew%2B8rxMMgf5Nu2JKx81wTkBCc%2BnxuK8NJLXZdjiEDPNKr1G%2FITHriNfawcU13KScHLavQ%2BglaeltuFprM9F8ormnzuNi0%2F%2BRqhrp33q2gSRHCwC9lJcKdA6OpDYxsf9E6l5Ps7E4UzJXacqpr3Hc2kALuSQ4P%2FLmnBxox37MoOpxj4KCbGbkl2QHKno4NnkTqXDVAyDuOrtGgSQnHWhjcjE53LlKI8C%2F7HHzwgCNZ1oEuLQvmnPIIYglc527x7vKvMakqtoP3h%2F93DICOf8EqRlNTYkziBg5dl8ORp2zyG%2B0EKX5jdmEBQbfo%2F79azb0f2smIb7WOjQBPgqEMex%2By9jZbMLoybP3MAm7yTiruHT%2BunGiK3%2FIe4CG7LqwBGG8VssRpYKHted1aN9DzC3Vgh0nYoTJq7QONtvzGI38YQSOkIRNF%2BljzOVK9vEWXCZiAw7CRS%2FrL4CdqC8Xg%2BMNPH%2BsENaYR%2FgEESULZ1yu3gn4blTRWxMLjIebYcasGqFEEAeCfpzSeDcwgfCtzwY6pgGGs336dUtWcaODjtwaV9z2Fx4ewedG9Tx9XZn%2FlQq%2BExmrqpCfS9Q%2BQE1KUyrAy1Qy2Eq24zgLhSGEPiTzO6ww4Taq1gk1cVMqpenWMsfSyDPHFHnRU4FFrZ%2FOf%2FaHliCOwsGI5YSAnK%2Bft9xcxg6vy8MsQjE9Zqs5P94clUFmHzJILF4dDVVWStNDOrzYDDmadlBxjhNpGxpG1zWZusmIVLtmdoNE&X-Amz-Signature=7516dc4cd6bbf7f0ef7683fb35100f290d1ffa3221bac820feb601a2609a21ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIZUTKOM%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T142515Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDY63131Lj5mClG3lAXu93NfC60iCLHKdZCMyIvc1WnfgIgQCGJ4LaYLF%2FiSs81V4adhkB86PE4EaDKSbq5uq0TKsgq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDDd%2Bl%2F48hTtYNnThoyrcA15RrbCzjxI27wL93vdrX38ITQ8YvPctVsz21R%2FRnASUU%2F6Kckyg5ISSbgF2l7Q6eGqbgoThmAL8yLTu3CuAXMCuX7rZYz9BNW%2FRKKsh%2B8n8SLAdZiYBvCiwEegnavPGgpUgR51G9LozboLT07mzrRucao%2F0FSBLHB46Lnc%2BTN0OfDr4bRNCR9zwFviU%2BTvRKTOF39XFADX7qS1NxIhLhCJ0A3Qqv7RA0Xz%2BJHWJ3KyJCxv2yedARiETiF8N7cPOwvvStfjE%2B1UxzA8vr7cgBMClqg6MxT0rYFhUgcD%2FOFeKbs%2F2iEQN19ezyIp3g6VV87lW8A10NSabbNuC7reWmECene1NjCvtBaWNyYeowFJJm0KlXKXTDq7fOB4MV0jLT2v%2FrL9jD5j5z7MW9hqHHymaF4opzgCLr%2B66JWF9YDFKnjJfvtj0ZVtoA2asB4DagYGdQGjLeFH9PAeBd%2FBJt%2FBOAmnXs4Z2%2BrQgZwsMeFb205sJr5mY8yh9kw3dET28aRM%2B2B4Lw5yT1hStVc5AMOLSCV6%2Bl%2FveZQinJYCXX6kHtPZ7p5OESOQfsSrRPZKAjkESRTqEoO4GUMGRIA0DNTMx4nF%2Fbqt1b2QISoeuKthCz%2FYEkxdjQt%2FHIRRlMInvrc8GOqUBdEx4CzAXQO4ROLY%2BnfrrkSmQ7etT9CUxWCMBRFj8JW%2FUjuncqsQCT3aVjPJggHJdGJfiaQvz5FJ6rt7%2F%2BVVvIneBsg6JGvoXYlO3xXLoInGGD9xFQt3z3QVtTkfCu1K8VpLuADnDfesDQ52Sk4m8n7XzaAMakxC3d8%2B030Uz2fecZPwG32QFQ4ps0%2B6YSicyhj1LKaQ%2F81AqcG386UaSB1Cd4ZM8&X-Amz-Signature=670c1398f26728c82475a3f9a3b3e74119d5719c4aa29e728be8c6c767fa4b40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDD5AKFA%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T142516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBw8aLAKcT96AdUZC98yU3LSY3hc3x9U19nusRcdznkBAiEA5woqTB40CAwc2y%2FTmXCW%2BShPbgdabufczibuCoF1MVUq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDH0jlmrqwOY3RHkkbyrcAyttDT%2Fm4oBHf%2FFjWwl1HxabN2CV39J6IJoC7Q0FfxvDySC55Z7vOEvJcUz8u9qstwZ%2B5NBvtdgBttQ5SvWR8gj4EpFESn2vVrvoWEAb5ZMs%2Fvf%2BkVHJ4nqJXX7IEUtVfEj%2Bby4SYySTo4cssGWL8u%2FYe69tJav2xStwzsf1wjrx8RnyPu2CJYxIETLs4R527Ej%2FosFeZoDxotB%2FsnaTcwTlFA%2F9wPn9m7AxjHfzRF017PaepasPWD3EVpUDBDBm%2Fzhq5QEyVAkk%2BhEwDipj87cIx9hTzDvw2lKZ98D41yALntpQFlKz3c%2FQQ96k6CZReJydQFNUTfhgkT%2Bt5AgX3qD8VZUA0wUJ7xjnfrcA9RPsC9bg%2Ff6YThS9ig%2FbJew719LV0F3boInAvAJL%2FJjPVTqrt9hSmqYp4bXPIq0xY6G2tUaZIGpnVxsM7bO%2B5sFTyC8lWXth7WSa1nUBKOUCR3P9bkNkdaLCgldk19jTS8ACGAGe4YdvvV8owpQcm1MuoWkXB4UE4NEit3CB6mbsWu7yLYIQ23uz%2Fpz9hXEsEpalN8SYkhS3kJFH%2F%2FfyrXVrqlZd%2BjZko%2F2slz16fskd5Bi9L0%2B%2FQgyOdb0cZb5lIHyDXPqB9ix2vAFRsgYKMOHtrc8GOqUBtnn44FApormBPY6OpjaJldRDvu0UTXwGbcphjMGb0ZEgWya%2FPl11O5oZ9SzApdbfonHGdsJqTlfDdbyFy3Q%2FUO6VbT4%2B36VlBV%2BRgxLRcOdcD4MFW95OC2pwnCjv5qIQBq38Gw5bnD49WMEMVSGIq9Bxl%2F7mp9mr8sMADSzSm%2F%2F6nTBLOX2DV3d0yay%2FVmDl%2BmMdY14bkE2dmr7YLiw7MNyIxuUT&X-Amz-Signature=7100d452f16d7f8225e16fecace2407f0353ff6a00760eb660b2120209f31f94&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDD5AKFA%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T142516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBw8aLAKcT96AdUZC98yU3LSY3hc3x9U19nusRcdznkBAiEA5woqTB40CAwc2y%2FTmXCW%2BShPbgdabufczibuCoF1MVUq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDH0jlmrqwOY3RHkkbyrcAyttDT%2Fm4oBHf%2FFjWwl1HxabN2CV39J6IJoC7Q0FfxvDySC55Z7vOEvJcUz8u9qstwZ%2B5NBvtdgBttQ5SvWR8gj4EpFESn2vVrvoWEAb5ZMs%2Fvf%2BkVHJ4nqJXX7IEUtVfEj%2Bby4SYySTo4cssGWL8u%2FYe69tJav2xStwzsf1wjrx8RnyPu2CJYxIETLs4R527Ej%2FosFeZoDxotB%2FsnaTcwTlFA%2F9wPn9m7AxjHfzRF017PaepasPWD3EVpUDBDBm%2Fzhq5QEyVAkk%2BhEwDipj87cIx9hTzDvw2lKZ98D41yALntpQFlKz3c%2FQQ96k6CZReJydQFNUTfhgkT%2Bt5AgX3qD8VZUA0wUJ7xjnfrcA9RPsC9bg%2Ff6YThS9ig%2FbJew719LV0F3boInAvAJL%2FJjPVTqrt9hSmqYp4bXPIq0xY6G2tUaZIGpnVxsM7bO%2B5sFTyC8lWXth7WSa1nUBKOUCR3P9bkNkdaLCgldk19jTS8ACGAGe4YdvvV8owpQcm1MuoWkXB4UE4NEit3CB6mbsWu7yLYIQ23uz%2Fpz9hXEsEpalN8SYkhS3kJFH%2F%2FfyrXVrqlZd%2BjZko%2F2slz16fskd5Bi9L0%2B%2FQgyOdb0cZb5lIHyDXPqB9ix2vAFRsgYKMOHtrc8GOqUBtnn44FApormBPY6OpjaJldRDvu0UTXwGbcphjMGb0ZEgWya%2FPl11O5oZ9SzApdbfonHGdsJqTlfDdbyFy3Q%2FUO6VbT4%2B36VlBV%2BRgxLRcOdcD4MFW95OC2pwnCjv5qIQBq38Gw5bnD49WMEMVSGIq9Bxl%2F7mp9mr8sMADSzSm%2F%2F6nTBLOX2DV3d0yay%2FVmDl%2BmMdY14bkE2dmr7YLiw7MNyIxuUT&X-Amz-Signature=12090e237c1b86f6039617481e8a88e4d8dd536f0ee47c7738129eba8245fab9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMLFLR6Z%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T142516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCjkvyLshfmOEc0fxerealHnI%2F9IMvRvjlOicdCmKPMrQIhAPXz15XQGfqxSyAS63l5Tix%2F44LZXBFzoa%2BSNgN9s%2BjkKv8DCH8QABoMNjM3NDIzMTgzODA1IgzjhR66PlNSp85lf5kq3AOd6cXh7w0wDzWFrbFpzFb4lrYkDa0XJ1gCU8Xi%2BPUgQ8%2F4I4iX9F4lYM4HmZ7ikju8UdNDnttNlCUfJGOHLGoAk%2BbwOPFFHEfm%2BCHe42MDZTRzqhNzqi47FLambZSb3jnl6Oyfw1qJhg49NFXBK1NMiHWxtxC5aXg9rxa1Dc7uElJRpPuR6k5aDSyqBVRpjaaU3zu0FJpJsxODerGToKYASi9XGE5F%2Bwg9BfwdA1nBAb%2FDLAudiLv6MYn1Ee9Wj5%2BneWQHwsjPBUx8KEfz%2BbiLFXu%2F0TWOgc7UuhQ9sNc0kIqyRKSNW4ovyVvNxwckWG7Rsg5RhXcHczvwHHVXVrLqhxoGX6iumrGnTXou5xVuhLuCVGTfuuZyGhy5NhwY63%2FAGPPNZexnjCsEqKovJIdoQ%2FEWC9AYsrADwRmD7OPFPmvtwz9NSgnPdK%2FSoj2uLZt%2BdB3iQowmlLGOXkFL5QsWpr3U6gJwVhcs2ZIegDuSG6xB6jk8HBIan9p71Loa%2BNz%2BkN5fMAHt7tyvLs46IQ4rqh%2BqRKv2DiCADZv4JTy3hYDJTT%2BbmURInyBn1UDuUE7BvdhUKlBTnB9JtSrWnrskFPRdVMyU9iXPdI66tFIaIM%2BtreE2gqCghNlIOzCm763PBjqkAYTQDotMPaG2WnDMWj7F5ubfG0ALWVeV7uGudm8im1IUmZhQBIoDIIxCcGOdj2vfPJNkRKJXITg6bk6SsoXw4kthX%2FPWEPUOPK5ajBysuZhpWQx3FFfL6V0GucXjx%2FqNdMIErVnurBISdFSj68vghbeJGyu0%2FO8HIy77Q8vFEftU29kE7tBGPgRyJa8zU0ZRpW%2B3DgHu2Y7AXp6qzgPd5A0p%2FLnx&X-Amz-Signature=728de5814a62a1c11371974f41830e32e96430af2b3c8c31ca7a1b60592b7e37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662V2WTRL7%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T142516Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDZUJNCF10o4Q8GjDXzZIVzo5D04cwcrUm%2B2AQSN1hZcAIhAJtgQHOUUJbdg%2Buwtmvy42rDOW9wXNmXMF1RfAc7VKaNKv8DCH8QABoMNjM3NDIzMTgzODA1IgxTHpGx5zthi%2FA4d8Iq3AM064xuKxWbBhTUhzuHB3ZTC1xTyETOgjdYsHMcJ01hVsSPR4fumfVlKA6r1WioCuLJ5K%2BqxM3D83chewZySxE%2Fw2FnEf1vWEe9aqOVHcHW%2FQYkWFVbYJE1ZBJaO8RzUcwNS9ocXRi7pSHWvpZhJqv5duYJEbkaqk%2Bd5kwmWLew%2FYG2wn%2Bj7EYNWJv8sJmoFCAgOwwWuSY68ArfGQSFbT%2B1sIn21kyl1EXs%2FWlQB999BV2GsaTvvGpH926MuuuBBihSTy0%2FoL7%2FvXyhW0dTl3E6U5tZOCHJ6jDT3CbnX9edlJmIjxdddxvF7v5Gwpw0dJpUZdraXBuL%2FmlPC8cB9Nxe1VlOyQdW8cbnDjkeKUb7buSMxArHGk8HqudzCY%2FdnHEuXwsfgpz9ta1%2Fyw3qK8Rk1BuMZvT%2F7%2BRTwnKDzkHplDoCKp77mIX98lM6DvpJ%2BLRoU%2BrUpT6G6nJAbFxGfKFCXP1yto139VhqPfa7EvjFXpsAJm0RIvvS016OzlOdJXhe6nVG6Pvl5AlXmlveNYukoRf5mLmCrIdkUv9aQ3BzRwObZOfojYdL1z6nUFCDsHVDWUQW9PhfUmNKespzerC1wgFXGVcbTZym%2BbvGmFzRUliqJwVtH8n09OrtpDD47a3PBjqkARljqLEk3hdgG1wA5wrF039mwuh779HemL4XzM6dQDFtzBcglfmMAFnkL65sGbVRRQGD4TQLMixpfnolBxio%2FKOHR%2BXuuUXB0Ul3IT%2BpfvAEM7glNKPjufx30sL93x3SRVN8i7JNstzh7C4%2BW4ohRP%2BTR144i9kuhIIA6JQZyiGO5J3R%2BE8BHfCW%2BriUjshAA9xmm3%2BpfzkhXzq3WHy%2F4Chna9dA&X-Amz-Signature=cceb91bee33cbdaea6c2c17b77654b364f0b703551295a34eec781ce4f69b321&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663LEWE6GL%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T142517Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFje9YkCcr2z6lDfsyTL%2FIYEK%2B7ErtNVvj6BgTMQ8eLxAiEAmH0W%2Fv5goZRkZRtmb4tMeqVzZCcogQ%2BgaurJ5ZACpfcq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDExMMzMt5WcnkSMTvyrcA502P5KnnLRypImuFgJWsKqtejBK538Vw%2BQVsQ18GdTYjNPO0zIBUtm5I51XGGl5RLKje%2FZ3OfWbDl4S8s0xzp9o8vfczJrJy1VbQq8GRXrEAW8iqIHk%2BIsDNSQDbFkHyK8oh3fvTaEE8Vz%2BZLCr%2BpBbqGg%2FRSsONn9AmsBjT1sVYM2UEZKDQsXGlheRZ2QTdMhBSnJmf0raG9GaDEifN%2FPPlK7pqR3RDJ7rvk4aF3icKI8gXJ%2FhG%2BFaOuQlIDwGsEju1cEUQXsASpKeeGeOGqNqelMOTMGnBZ6m0F7%2BUrq6Qg2e6oxxM8u5i%2BEqsZGo16aFAokMlL0IyYLZXFuN1SwSkoQbQBo05dRY2L9UEoRj8MZF9lDqNgBZqrD2SbceeB8s0Zzih26sX5Qel0ScZJqApUyd0v6XeSGvOXWz2Kfw7ypcJulCORbfF2BEIrd60zSOqi9jZ1dC01E1Pzr6JxcVpD%2BbyE8N3qaH2Rw1ORKIwf4wrvpE4S9wNfuQ0t7LxwtAiVFGliZnXmh%2BAZgPCFupcS%2BlnsjGy8SZPnmWwDsUTq7WKsPWpEQu4SeFzBMJthHZl38V7QuHwhWT41SjDIdP6FJGP%2BT3X4kgUFpYm5Uvpqw9352XiAsU0Yo%2BMMrurc8GOqUBqfv9Sn6HK35yV6HzhZTBl1OtFK1znqgFhESOO%2Bkm6tYqKWPERwZosjqvDVfh3gIwQLMMMWX2tbYtOlIyedF2%2B8rFrIpI6MKFygaRehm%2F9EWbGkQvkDNTfZqd1KWLGg3wK1w9XLKfszQ2P5ar8osqfdP06v1%2F13%2BgfuXQv%2BGu5H8rLvLZDc0d0ISGZufDT8%2BWy%2FyPq1WRkucKImmoZScwQ8v2m0tg&X-Amz-Signature=cf9a35c528156361b635a26dc2755a6a623e5a4520a7ede6142ce8fef3554c17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRRFQYGU%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T142518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF3%2FXsX4qz6J7CWkcxuBMYoRAI8%2BehbVaNyJXj55sJa1AiEAntdxgOZG5XSlJIQk%2B5%2BP%2BtVTd6JsB7vY740UxDzGRbIq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDEtfo3Edx20hRgZ8syrcA2vyPRvIrX%2BmROYAU%2FKinqZBSNAoPjE2OxKrec9sNZRZEtIuNGwt0vyAz32dIhpqfYUDPEJ4aiGz1NW9o7rggiwIjyhT%2FdvkNorXIiiLP3B0GoAFRX8iQP3MtOIA2b9LfW5nFT5VJnmJrcF2bPd%2BCJzYCueG8H%2FTpItKdhuhhmImyVXQR%2FsYt1g%2F%2F6mRen%2BZYO%2F0pFp1016HwumTrzsn77La%2BRa%2BXaYmlel1dt6u%2FPQxrcGwGoV%2BUDqw%2FbVJIQFQsI%2Fw2YHxb3%2FT48oPlQIOZ3NPFAWuTUplB6tmaEqmvS5EBrQckqDv4fOEkZDsLn4I46hMloD8hwCJ0djqCmgvh0F9qrRQYmXvmsuKtP2hQR7lVK%2FkdhGjKxguFVnibXwlstpjl1hwTAO7bBshl4OYlP1Y8nGZYFwIY59p0CrvVxetTwo6liyAjceYUAzIsBZy4sosZMncaShwwgT1fVata%2F4EuB3%2BtJfKClvDOjaGZHpz%2B2GbdTIWwEPcXvuZyx4BgfZUCazpiz6Ee2aH4KbVPVz%2FzEC0qCTfmCrjNRwObD7pYl2Qv%2BL090kFrOcIicxxK5DPk5Mrfnp55exreT7aPsM75tsPMkXRZd%2FHZ3PC6urg0Vu773uGSkUL3cwjMMvyrc8GOqUBHNrJP%2BGvhvFyDTNHGNRXqatYeQNMo%2BnAa17YgbZXFICmEK5ynKCufd1yDZwYGc9if%2BZyh8HN0ccZnW61HH2OHdU9epTotJfvX%2BaMC5QYfakkJvseX2xTEQFC8wiW5Ivi1SfT%2Foq24Hn1On0a9lsmB09r3vx32l6T8B%2BLvsCo10bHYEzI0XrTAOB65fhLmRnCAXsola7wUSyMoMSJySIThKnn07He&X-Amz-Signature=6ee523326fceb874179178d1a519c28edf71f1833bd5f1cb0158a011c6aa8e53&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRRFQYGU%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T142518Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF3%2FXsX4qz6J7CWkcxuBMYoRAI8%2BehbVaNyJXj55sJa1AiEAntdxgOZG5XSlJIQk%2B5%2BP%2BtVTd6JsB7vY740UxDzGRbIq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDEtfo3Edx20hRgZ8syrcA2vyPRvIrX%2BmROYAU%2FKinqZBSNAoPjE2OxKrec9sNZRZEtIuNGwt0vyAz32dIhpqfYUDPEJ4aiGz1NW9o7rggiwIjyhT%2FdvkNorXIiiLP3B0GoAFRX8iQP3MtOIA2b9LfW5nFT5VJnmJrcF2bPd%2BCJzYCueG8H%2FTpItKdhuhhmImyVXQR%2FsYt1g%2F%2F6mRen%2BZYO%2F0pFp1016HwumTrzsn77La%2BRa%2BXaYmlel1dt6u%2FPQxrcGwGoV%2BUDqw%2FbVJIQFQsI%2Fw2YHxb3%2FT48oPlQIOZ3NPFAWuTUplB6tmaEqmvS5EBrQckqDv4fOEkZDsLn4I46hMloD8hwCJ0djqCmgvh0F9qrRQYmXvmsuKtP2hQR7lVK%2FkdhGjKxguFVnibXwlstpjl1hwTAO7bBshl4OYlP1Y8nGZYFwIY59p0CrvVxetTwo6liyAjceYUAzIsBZy4sosZMncaShwwgT1fVata%2F4EuB3%2BtJfKClvDOjaGZHpz%2B2GbdTIWwEPcXvuZyx4BgfZUCazpiz6Ee2aH4KbVPVz%2FzEC0qCTfmCrjNRwObD7pYl2Qv%2BL090kFrOcIicxxK5DPk5Mrfnp55exreT7aPsM75tsPMkXRZd%2FHZ3PC6urg0Vu773uGSkUL3cwjMMvyrc8GOqUBHNrJP%2BGvhvFyDTNHGNRXqatYeQNMo%2BnAa17YgbZXFICmEK5ynKCufd1yDZwYGc9if%2BZyh8HN0ccZnW61HH2OHdU9epTotJfvX%2BaMC5QYfakkJvseX2xTEQFC8wiW5Ivi1SfT%2Foq24Hn1On0a9lsmB09r3vx32l6T8B%2BLvsCo10bHYEzI0XrTAOB65fhLmRnCAXsola7wUSyMoMSJySIThKnn07He&X-Amz-Signature=261e3936e9d1c28c517d6c49ea8a60473f81b3956c66eff5a01b7f77dfce03e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663GLTTLRQ%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T142513Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFw%2Fbu7ojXYSEOlthreQmwga9Fu1UdszdidnhiNVRROlAiEA9ScusmZSs0%2FhKMgULdOZnLpN9Q8r6fm8gxIkKftHHvAq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDJSJboYeUO3JkRp7ySrcAx%2FOMbJqgXv3fN067zxePJg%2FyxujFa4rqHzAHy02G%2BNuNaxqjKSEnSgv60E%2FnIDDdXVbzW4JFps9ajB8osttXakHO70%2BURiqWQDxpYkbV4mbCjRH3XpZNvA4NLGv9y3mT1z7sydVqyo%2F34yVpadLWrjgspEMsP9hGTjDSHbuXjQRd8hhvdnfCK0YAh58yr6t97C1xW0XpUOK5OnH4bSjPBDjp%2BSYQvSlaD08IX%2Fv75RuA2HEW4gK9%2FVnifvenj4ceSH7EWr5abPFnmDUX03JLd1Re4mqtNWOcFJUX7zWb7FujB1ATkwkBCNk54W2kYimDhqbCZQ6yVsJvMVT%2Bo0aNPdvv42XKVjuHhJk1LRC5rXkvHuaEHYg34omuq03zBeRPigdTCHn0tTC2eIlG422SLUfR0cQRvFBmra08r8OvgoBgWb43WL%2F6S%2FK%2Bzg89Ga2PgDq9dxYxAItSS2kWoCwZDZzdenzhNfyiBqn3vyWyIm2o0TF14WZMSR3hCDE%2FMFqIpTIUmx9jM2YWr67gPx1znVUIOT%2FOPZxQUbX75qiN06TaDkmJOFB33O%2FYGrwv6EZvp0jVMVdiKRcGTw3atueRIZ29GLgOdbOIPBEE5Os%2FMSkX7sc05Cmh4uktDL9MI%2Ftrc8GOqUBHTxVZjIoIO8uWqkF412M4oTq3OaU0jJcjxPEbST5HtHNJwzsJ%2BqxnXrJkXa1U4PRMFxut1pDJCZf%2FuTbEAgHqkVo7VRGaku7tCooFrJZ6Ecxraf8tUxJXuw8ZYu%2B6TEPhkZC8t5lFBEJ6oKXbv69NNSeknw19jT8KIX0d3KtumWRmlY5SHXVQsDBjmyVIFV1ScJIRueZHaQGivsZykyDpG91x65z&X-Amz-Signature=8269ecaac91456306bcd7bd3c420efb8cc016d27101f5ca9368ee5171c317496&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VF4ANRKE%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T142519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD2EMCa54STWZJ7XVR3IdXlFhbR0AXWhMSm40EvKDanegIhAKGPrcPCqWAorKyHwJy%2FmxMVoxWoV3Pk1bRtLcSWiVWcKv8DCH8QABoMNjM3NDIzMTgzODA1Igz5JhNAnLmaQ%2F75T2Mq3AP5zS3TaMcj8Pm9IZ7%2Bw5uCxd3ZgDbAjWgzdEStRP%2BMGa971wwuPxIo01rx7O3ldVeU9YeRWzIllbUO7tecH5zmMte2qQVO3%2Fcl1Zqve1ZIXSKgwUJdFb8W9XyutVEC56xeN9riER33VYBAjgwe%2Ff0j7GlUV2A1Ufcv30YkWlki7cSIJX8TtIcUiw96VrrWGCv6pCReYj0cmbq1YDH%2B41ykbLuvB3t8lJplyQvKbmCRwd9qtzeku%2FKhc6zlyfg6wIRLg5q0NsHCag0LHTmQ4mAZh7o1zgyQ5r5zKPEokN7p22ACfYBucStCyUehnkIvSQe2yoGfS4hGPHNayjfsfHW0mqQI7y6twkrjtvrteXOHryVWoIeLbsRCL9Dn%2FfnFx258NVPiorE1EhUJ9wEF3%2Fa3k%2F8F4xv4XekeJPNj2BMSNsceIJ8FL7foKtb6oxSTzx7O%2F31n%2BYFAE770NF61k61dD7laVKIbqRC6zR%2BOGtyDqEqm2a%2BgYOw099%2BbVULbAT4iUMA9sO4ZOLtH6PsWp7N%2F2t2eCiRMlMDyT6XoNeIPnfoAWOEoT1MCCBI1C4FcyXdcXbsDek0FHMh2Mloq6L18x0%2BPMyCHq4a8RP0e%2BQeKDuW%2FRVKc7pPmlJlG9zCx7a3PBjqkAeUhvukMbf5CV7CXZVs%2FlKohEGbjDX9i6tV%2Fwvta%2F%2FX2Trx%2BTZai4fAcuAqNF7xVeafBohZ0GqOlq8tDMZxmodRhfXpxsgG1nqVOBRVG6K5JjpnFlS4n6IbdtIHisAN5AQCdfndBfxLyW%2FxMlVG4x%2BbN73RTNR9%2BoABavtY7SoaMfhTJgCGciIJoduepuEBOqSnJbkyFA%2BNtg5n6FHMpXv%2FfWVIf&X-Amz-Signature=5526167ab0cd7b7df7f9d1c45f9f2bafbe32e066569ddd82cde5a6be41ecde33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VF4ANRKE%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T142519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD2EMCa54STWZJ7XVR3IdXlFhbR0AXWhMSm40EvKDanegIhAKGPrcPCqWAorKyHwJy%2FmxMVoxWoV3Pk1bRtLcSWiVWcKv8DCH8QABoMNjM3NDIzMTgzODA1Igz5JhNAnLmaQ%2F75T2Mq3AP5zS3TaMcj8Pm9IZ7%2Bw5uCxd3ZgDbAjWgzdEStRP%2BMGa971wwuPxIo01rx7O3ldVeU9YeRWzIllbUO7tecH5zmMte2qQVO3%2Fcl1Zqve1ZIXSKgwUJdFb8W9XyutVEC56xeN9riER33VYBAjgwe%2Ff0j7GlUV2A1Ufcv30YkWlki7cSIJX8TtIcUiw96VrrWGCv6pCReYj0cmbq1YDH%2B41ykbLuvB3t8lJplyQvKbmCRwd9qtzeku%2FKhc6zlyfg6wIRLg5q0NsHCag0LHTmQ4mAZh7o1zgyQ5r5zKPEokN7p22ACfYBucStCyUehnkIvSQe2yoGfS4hGPHNayjfsfHW0mqQI7y6twkrjtvrteXOHryVWoIeLbsRCL9Dn%2FfnFx258NVPiorE1EhUJ9wEF3%2Fa3k%2F8F4xv4XekeJPNj2BMSNsceIJ8FL7foKtb6oxSTzx7O%2F31n%2BYFAE770NF61k61dD7laVKIbqRC6zR%2BOGtyDqEqm2a%2BgYOw099%2BbVULbAT4iUMA9sO4ZOLtH6PsWp7N%2F2t2eCiRMlMDyT6XoNeIPnfoAWOEoT1MCCBI1C4FcyXdcXbsDek0FHMh2Mloq6L18x0%2BPMyCHq4a8RP0e%2BQeKDuW%2FRVKc7pPmlJlG9zCx7a3PBjqkAeUhvukMbf5CV7CXZVs%2FlKohEGbjDX9i6tV%2Fwvta%2F%2FX2Trx%2BTZai4fAcuAqNF7xVeafBohZ0GqOlq8tDMZxmodRhfXpxsgG1nqVOBRVG6K5JjpnFlS4n6IbdtIHisAN5AQCdfndBfxLyW%2FxMlVG4x%2BbN73RTNR9%2BoABavtY7SoaMfhTJgCGciIJoduepuEBOqSnJbkyFA%2BNtg5n6FHMpXv%2FfWVIf&X-Amz-Signature=5526167ab0cd7b7df7f9d1c45f9f2bafbe32e066569ddd82cde5a6be41ecde33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VX4M6J6R%2F20260424%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260424T142519Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID94ue5aypD7c33rB6d5UJhn91D1KQVAxGs2lspGvYbLAiEAtgqMs2tuh4974oG%2BTFRsxIX3MtIlethqmn%2FxdWy0Fpcq%2FwMIfxAAGgw2Mzc0MjMxODM4MDUiDFWHPlRRtaR2vqHU9yrcA6Ttrk1AAW5hv%2FmdPjujE8aGMj0yALLE3jCJEDRLvoFBd%2BQ6zUVl9YqqYkCaA2KTRbkCZFK2FFAB1DipsZTQXyFu%2FQGHEtUYm8C4%2Bj%2Bwuc7hXH7ZtEQb%2F14fywkdrvVJ%2BRnLeR0n2FG14aHECAVcZ4gPPMFE2RBfXBLIpR4eX%2FQnabPi7ZDwjTwTuPzRAkovYRmXPlqo%2FPmA50oaHdjDx5qRZk4vMDe5ptvBI0R%2BPqpPc%2Bgc0L%2Bv9IZuqPZRHYVqziQ8UI%2BU%2FUDued8ja2dawD3uuE1is97ZQb3BQRIAil4YhMJfUX0zqSm7v36kHiGSxkh%2B29tEBepajVA%2BHoAgzUjRA7NhQfCC%2BfqfUsKzyNBKaUQ3%2BciOZMPxtgxtB382rjiekprg%2BHxil7pAMi98DrcqyQ5SGcDwiHnxZ8ZeOpzPTl0itPi3oFagrigfDNx5z%2BccHNdJwiqokp3COzIAxWf%2Bsbloedhcd%2FHyIXaalQ6W6WvGoj1SR4ESixfj1VOiL%2FZietOC8thdhGch4RBlgCLbMs7mlp1TvnUmDJq%2FZM0WwA%2BrpMRhwPLkyd%2Bu5vwdlrgr1Vt8gtTA5Zk%2FiBeSyTl5fLPmpokjYvwjdLa1sa71fUUvdKK0cHhlQs8dMIvvrc8GOqUBl8kp2HyYDx64wj9L3g7XK37P4aoAGrXPKEE%2B2qhBaIIfF3VA07iZnjVyaLrQSUFrM5VbwhSAdb2uFW5%2BUWbAPyDSCuQwrbJQE0TDB7ax1%2Fjg1HvnT%2BG4TcTIWRsoxiVHo9yflLs6xx5MXSPyPtyRQ0fMB5wrgeO81mchX2LAjv34vWBC%2Ftdnbjm%2F2siJsXjc6VTzHq5DZ%2F2O3RO%2FytyJ1go27ucl&X-Amz-Signature=917c82ffe1cb495aece2c705ea2b506984066579879e0d3d657384c8fa817ce1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

