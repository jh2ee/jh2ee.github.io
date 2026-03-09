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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DJ5JAR7%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T173713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQCgNkf0b%2FekYlkmaNT7QplGe7EVY9zVEI72RtGy2yBL2QIhANfzprusrZdy9wnAAHbQIuMqDaGOLATxT22GvZKoD0jWKv8DCDIQABoMNjM3NDIzMTgzODA1IgwpyFjptNrhfqaWMjAq3ANNm%2FhK%2BcSR49Tq3n9e99OrfvYD0uLDVuqfbubeJir2ctvcIlIkO%2FsQeo4U2PJaxxRBjGQ0BITyxG%2BQu%2BPqBhbSx1zbHNMhryoI1rq1DW2YrIkAMjphAXI5xZK%2BaSOqOd6LVqo8IJhOO5jUqbJzvf%2BOfc9SnmTXqVCVX%2BXDUjjZnSwutMtWEphPKZROr6oPGfdeUPCaJO3pW8AxliFw373BIFfFpMzMFGzKJASL5ttapQpi%2B6mkx9TREJNXWHadSEQYEB4FumRvSaM0%2FxzRHLCsu1mqnLw6NUzPmKd9GMAswomNPAhFU4zOCxJuSJc3%2F94Gke10W5iYkzUzNo0E8IeJoPtNAj%2FSU4O7VzmdCi%2BYK3UM1PkQUdX11olp6yBS0GGuERBb%2FAZmLTmm%2Fa%2FkWz8M8QtuuHeqj%2FWb1YDIErXPZeeE47EBkS8%2FtXEa0QUImz8D3vq7v3gZ%2FgWkz8ZmAi75XbyQg%2FnIykpVzbGqvrJFriKwtIK4r%2Fy8f%2BBzkji4G6Hku%2FHX%2F9p5g4HJnc5aVo2IMy9Fho57A2QXqAp%2BLGrO3DpVH7vyqtvgZCAdcCzi%2FE8a93vsFNzCaM39H5MBelSsMqJYb9kSq1JwuMuiyfgRECosbm%2B0Uv%2BnEwpB5jCy%2FLvNBjqkAYyyEUVw2BawElqPBYnnlgoIO2fow6Kmxk0XvS8BHf9EAEg6ngEpEVQdocqhTeYMuPkQ8JTFyekSiJXHe2FZFMGtjzM07yjjx2LPJ%2F7bZAu8vwImkBwkPNRH0JDyP2CCG5J8OS%2FbmBM6nrWw8nEfPOu300ZWf5kGBMG2qCREs8iXdRz5ACme%2BKMQ5o86siRS77GTUjOFJmhEaK7p2Oi3bDTOV2Cx&X-Amz-Signature=ae600866d6eab97f7ce21f39bf0a742d6c69cfc5d923d1e42efad2c73d5aedbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663DJ5JAR7%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T173713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQCgNkf0b%2FekYlkmaNT7QplGe7EVY9zVEI72RtGy2yBL2QIhANfzprusrZdy9wnAAHbQIuMqDaGOLATxT22GvZKoD0jWKv8DCDIQABoMNjM3NDIzMTgzODA1IgwpyFjptNrhfqaWMjAq3ANNm%2FhK%2BcSR49Tq3n9e99OrfvYD0uLDVuqfbubeJir2ctvcIlIkO%2FsQeo4U2PJaxxRBjGQ0BITyxG%2BQu%2BPqBhbSx1zbHNMhryoI1rq1DW2YrIkAMjphAXI5xZK%2BaSOqOd6LVqo8IJhOO5jUqbJzvf%2BOfc9SnmTXqVCVX%2BXDUjjZnSwutMtWEphPKZROr6oPGfdeUPCaJO3pW8AxliFw373BIFfFpMzMFGzKJASL5ttapQpi%2B6mkx9TREJNXWHadSEQYEB4FumRvSaM0%2FxzRHLCsu1mqnLw6NUzPmKd9GMAswomNPAhFU4zOCxJuSJc3%2F94Gke10W5iYkzUzNo0E8IeJoPtNAj%2FSU4O7VzmdCi%2BYK3UM1PkQUdX11olp6yBS0GGuERBb%2FAZmLTmm%2Fa%2FkWz8M8QtuuHeqj%2FWb1YDIErXPZeeE47EBkS8%2FtXEa0QUImz8D3vq7v3gZ%2FgWkz8ZmAi75XbyQg%2FnIykpVzbGqvrJFriKwtIK4r%2Fy8f%2BBzkji4G6Hku%2FHX%2F9p5g4HJnc5aVo2IMy9Fho57A2QXqAp%2BLGrO3DpVH7vyqtvgZCAdcCzi%2FE8a93vsFNzCaM39H5MBelSsMqJYb9kSq1JwuMuiyfgRECosbm%2B0Uv%2BnEwpB5jCy%2FLvNBjqkAYyyEUVw2BawElqPBYnnlgoIO2fow6Kmxk0XvS8BHf9EAEg6ngEpEVQdocqhTeYMuPkQ8JTFyekSiJXHe2FZFMGtjzM07yjjx2LPJ%2F7bZAu8vwImkBwkPNRH0JDyP2CCG5J8OS%2FbmBM6nrWw8nEfPOu300ZWf5kGBMG2qCREs8iXdRz5ACme%2BKMQ5o86siRS77GTUjOFJmhEaK7p2Oi3bDTOV2Cx&X-Amz-Signature=ae600866d6eab97f7ce21f39bf0a742d6c69cfc5d923d1e42efad2c73d5aedbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZJNZVBE%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T173713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIQCSAUIUdBOMbKfu0VcKnBwO8lsn48i3bx5AWyqEhrFliAIgW9Z3gkdmE4h28VeC%2BYU%2FSqro6k6cO4wGP8XPwNro2OEq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDF3etn7uZiGiCC2BhircA9N5Z%2FCeYsuZpYyukbhfML0mYybeebo6%2FgqL%2FB%2BQzB4D9DCFO4ZajDwyt%2FrC315NNMxyvorrUMTYq0YJohID8eLU%2Bvl8lkP5%2FcQPSjmMWqG1qTfOzxtne63XW%2F7%2BNXLhox8uceg3M%2FNgoBasSp6DlqP7n0jvvjhvK1mCMGpX8t0gF8PyDLVWdIZsrGN%2BttPs6J4ZVtwB735m1JEZQ9IOzCq599P9EWYRCyfsrKhGWQ7x75uKafcrQnNZexG83bKEQ%2FAuo5V9MQo5iDsJhLlln55w%2FBR1E3y5KTXxOaOPkZmg8fieUGEQbH3GLuGin5ic2PZSvYX8gNNJiYfrBN8kTGPR%2FCJIJ6y8DAq86Ob2e1kk83Ck8ToTnsF6bvkhRPy7%2FJihbKhZjUDBY7FCg6DduyLTazPDRI17xj6J0tGMA1vk3BpxqgyULUvxhf17JanFmkzNJ4ipWFK3ULIBLgRMj4OMgWCn9DT23Y5eE6kSAzEFxjlCHiHM6bjR9Oq3rWzy3auO%2Bl%2FGrMW60e5MYacQpQHlzZS%2B1rzTg1Pv2pZuTzqZMPjpIE37D80yQJRhsq7NrHm9ksS3Lttk5TCtEE2EpaAl24x5F9RlRXU5NAdiXz0wtblqJRieis5ZyrvlML%2F1u80GOqUBH9zwBuqTRBsADrdIkz4uglWPMBiQ9dVaL310v%2FGF1kjlaTzfol2A6ZcuEE8D1Ys60EKiUHdV2exokJSEv%2BRoVSW3rhELBooG%2B60di%2BfEmDEMZsTBn1jZkTNCqBUzLAW0mjzTNdYSkS4umZ7wePI6z3UWvLt4SvHW0Y0IykRfX1YuvixBHvUbkDWkjUX2tsM0CzEFn1E1vh8x6VhvDRgNqDzh%2FT3%2F&X-Amz-Signature=da37d2e9709adeb2dfde48bfd69270c566b7af18211165cf52eab09a3956e64f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMCRHVBH%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T173716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIEpYoPnF5n695RDhDJq18%2BCSDPB5gj02WvJAXr2qQ8aOAiEA4UzLq0C8HI%2Fq8fPHX1a%2Bl6mmX8iOj9aMu3TC4iWGY7Aq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDAP5mzbLyfDGy%2BqILircAyfqz9oWr5xGvF4stlYpE4%2F%2B5vDX0nFaOisNr%2FKAeW4DmRXblZ98i2L2RdBrQhBFesKH28xt6CqmvkVMoguSx2dTx%2ByzGG%2BDT61HZiYV7zlbPMAy1PTEGAZa5ZT%2BSnyTeoZ8HMe8hp%2FJELBPrwxdbhcEu77h9rmoSDq0QTpWWFm%2FMXpy0U9wz8zWQ6tuMrg6tMxJK3rxSAzcVxRxuhkTOQ3ppCduI%2BUA%2BBCbjCFnOfcv0rP7WTElTht261H6yk4%2BKu1q8H39cTGwYzKL5U8tKP%2B8Z1Nol830C9N39toNTyFPmFz7%2BXT4SVZ8IICpe2x%2FLlJ%2F%2BjQcKUpk20mxi9aw485LfXq42Qoe%2FhKkZ7oEXYB5Ptn7aflii0NR91YQGZhwy2YqZNW2KOQ8IMVqycaLe1Hx70yrHpZXbv5wPJsfbdXHupi9Sl9imUePbe6bsTkoM8XzSoyqyQNmnI0nbpXhycf1t3tvLI4twcbKWxnasNCseUKJ6Xi6L%2BZLyUGSMOFeXn5bm7Xsud5SmI8nZTS74%2BTFN7dLBalv%2FM3mqbtqXXuRsRqYvKfvzL4Wd6VLYmsjRTIuXfbj%2BAT9YPCmTPXjKub4WdbhTj9OcPM3bhXDS0e21%2FPqKhjz1ycyC7SwMO32u80GOqUBxsD9w9Aw8pidTzN9p59NvL8doqPozwdu9atkhClKs0OBWq9wSYeZFPRUmMpCWjSdzsIshGJooUvHg8TY7sIBf73eGpcKq%2BJAWcGN2ZkxfD6f9EDiLTujdTM%2FloD3jPTSdEekyOc82rcwjXYxqN%2FMucbvB55U8GItxmk%2Bq%2B0%2FzIgxYplOOUlzvjbE7SYS3iQ3%2BK1y9ZsmjzfG3%2Fz49SF%2FqVVsJ5DA&X-Amz-Signature=23c952c77d8da6f130f8c3296e7990df9cb74940d46ccd4e7abd3619d7afbf62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMCRHVBH%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T173716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIEpYoPnF5n695RDhDJq18%2BCSDPB5gj02WvJAXr2qQ8aOAiEA4UzLq0C8HI%2Fq8fPHX1a%2Bl6mmX8iOj9aMu3TC4iWGY7Aq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDAP5mzbLyfDGy%2BqILircAyfqz9oWr5xGvF4stlYpE4%2F%2B5vDX0nFaOisNr%2FKAeW4DmRXblZ98i2L2RdBrQhBFesKH28xt6CqmvkVMoguSx2dTx%2ByzGG%2BDT61HZiYV7zlbPMAy1PTEGAZa5ZT%2BSnyTeoZ8HMe8hp%2FJELBPrwxdbhcEu77h9rmoSDq0QTpWWFm%2FMXpy0U9wz8zWQ6tuMrg6tMxJK3rxSAzcVxRxuhkTOQ3ppCduI%2BUA%2BBCbjCFnOfcv0rP7WTElTht261H6yk4%2BKu1q8H39cTGwYzKL5U8tKP%2B8Z1Nol830C9N39toNTyFPmFz7%2BXT4SVZ8IICpe2x%2FLlJ%2F%2BjQcKUpk20mxi9aw485LfXq42Qoe%2FhKkZ7oEXYB5Ptn7aflii0NR91YQGZhwy2YqZNW2KOQ8IMVqycaLe1Hx70yrHpZXbv5wPJsfbdXHupi9Sl9imUePbe6bsTkoM8XzSoyqyQNmnI0nbpXhycf1t3tvLI4twcbKWxnasNCseUKJ6Xi6L%2BZLyUGSMOFeXn5bm7Xsud5SmI8nZTS74%2BTFN7dLBalv%2FM3mqbtqXXuRsRqYvKfvzL4Wd6VLYmsjRTIuXfbj%2BAT9YPCmTPXjKub4WdbhTj9OcPM3bhXDS0e21%2FPqKhjz1ycyC7SwMO32u80GOqUBxsD9w9Aw8pidTzN9p59NvL8doqPozwdu9atkhClKs0OBWq9wSYeZFPRUmMpCWjSdzsIshGJooUvHg8TY7sIBf73eGpcKq%2BJAWcGN2ZkxfD6f9EDiLTujdTM%2FloD3jPTSdEekyOc82rcwjXYxqN%2FMucbvB55U8GItxmk%2Bq%2B0%2FzIgxYplOOUlzvjbE7SYS3iQ3%2BK1y9ZsmjzfG3%2Fz49SF%2FqVVsJ5DA&X-Amz-Signature=9fdeb19cbd689e17f6c05852df1fd7dd6c6d3090948824626873d229ca6c9077&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YA25OX42%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T173716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQCpZYPRBzdP1kPl84bZlLTnTPwOZYdRlsH8zBfcTzkFrQIhANQ%2BejplT9XwBxxh43gU4GHQscL2Tzdt4VcQLcqAykBeKv8DCDIQABoMNjM3NDIzMTgzODA1IgzJBnOcV42zAIjw22cq3AOQNGQZndR1gkQjVYbhcdixz%2B8nb2QUhvuayG7mX0Y8MdcCFBiS2oEbaAxWBW23XmOxMQ2uY3bwMFXLfcCF%2BuA9t%2Bg1Bbh0sZc%2FSBxkgkwMLtPP6FVSsjm4gLU%2BhYoRqKg556fp9vIrhm3WCqCDMXfQ3zLnUtGcCq5yFqX2rJCsc4CQuTuFj0AntSTMI5%2B6HRhTmlYQiXf8b%2Fc3PhCtRDo5onHhQMFgXNQCEg7FvPNykZtjHw8%2BnxL%2Fykpox7ulR5cdZ%2BBCvFY7Ex33AByuZjQfJYXW%2Fqj6Ob0qVRpVVxEQ8r3d1pfVwfGEOkQhch7w5YJcdQ7AhiQFmRM4%2Bae08XuxP9RpcFy0XnF%2BAuccfou97VmcIVKAYwENVxbnnwum8BghERxklhpiOV%2BTAIRCPSUsVV8NrOLJmi2OjYUmElWPB2B9Cn3EKILDevV7lDmWYw6V7siqysdV7vdqR7YROH5954nhMu%2B9UoyOjJ393JEDjcJJTWImNrEyXhtfVw6gAfw2rxhFHWyamX6ObK%2F4lNx9lL%2FHmw0cL9Wlr3BA3e%2BpQk7bOmTgxHtcbyZGIjrlKKWtY0yhIN8UEJJL8TFXNtvfMgf3y%2FgJ9PN2QEiqyDUvIxHIkbSv8uyfVqg4%2BDCz9rvNBjqkAde7kEmdu1IXZFqgGelKXzSsOop0x2LQJmJLbFAJDfiqmxPeGh2278%2BAqFd4bdTTIkpWpGvC4x5bcindWhME4nAJYY6rMx15PYGiZmVXqe9YPdxvt11nQ%2BXcdCEnmhwCP8xvtBqypYwoJTkB0YRaXb3mbIA%2FiVQuYspUHIf3ufGInILqujRYeDwAfPWaf%2BtU09hM%2FsGjkfrNnsy78sE56GWHOid0&X-Amz-Signature=0bd2b4c9054d4bed2419ad4e8ee49e3eff28ea0749e13c42c26941c1d7c9ac5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBUV23WZ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T173719Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIDOv9P0o6jed68Zrp1pEejhI3mLljMsOp7qWFkU8JoalAiBIkLK1ejnp51Hn%2FTQ%2Fjko4yxlva%2FUCjXEhoNrOxGlxbyr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMZk3GJ4AcdAEOX5KnKtwDt1HdfZLI6W0OrqAY9yhdsKusRy2%2F2D6frWS2oEWr5OFXyMCEHmiA%2BplUq0kGFZH%2F63j17mBYJ2siE8XpcrLswtCbvgWXuTomvoMekox%2B7YMIMUPpd11hZ60%2FkG3ik6Ytiiod%2FB0sdVmfeHOZG4%2FtRDZIxI9dvIfQKDRGL6%2BuJT%2BHBGmMzCPXjnQaGL%2F%2F7E4Ou3ivX1Ate2q7B4zTAg%2BR%2FWx3HlYeC1DVxYpZ7UAS4ZGM20WuXg5TXCIgBd0jwkkDznXBUpzF90ph%2BjFqNGg4P5AsuyW5MghxvVwaSmdHvihsTH91nJ%2F3ElFbNQeLKzo0MposAIDGQub7m2nKN0hDLBUXKvwtkagb%2BwJrg70gpxrbQldg4dZzUJ2upvNQBWpyrXxBq9N0w777VlvPSBQxUX1NLvBPx%2Bz5ODa%2F3LilnqnT8gIMKYsg%2BnyvupMT72aDSz3ZtoQFVkFIdPRbgidEqcv9AGvAiJgM6Y%2FxUuZF%2FBArjoLCG1k%2Bm3yuRTP9lHbWkIFwOUGl3nKTfCgeYG3Jb0CVz%2BYWWlcO3mspQMe2pvlBD23wVOeg2rnfociw0QJ%2Bq%2FfhV5Tq%2FnB4u7F1v850TK1%2Ftt%2Fp7XQSyVlscPOfynnjSeNj53mEgofQZ3kw7fa7zQY6pgG1i%2Fol2M1DNDPIm7djX%2FFplO6jiBg3XfYs4kyAjmMxHU7%2Bf8oaGExwq96TVByF27qahzek6U%2FYD%2BuVYKhlw8b%2FMnsrknFDgqV2Rtr%2F2PFT7W1O4iCQACaRv%2FLvpDgH38wH3r6GczYuhl8bPhTuHCzKXx6fyviDvVzHMbudazjJjhkA7VdJ16gRGjA8udXzmkl3RMsYiOuId%2BZcob%2BJsbOq5s84SVYy&X-Amz-Signature=7c59a77a2db8d36be2241ccb179f061ddd5c37768537441709a74f3318c31be1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QDOHTIRP%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T173724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIGQTMgAD8iyKDmNsQNzx5zmagwx7fhf4%2BchUqNKftyuwAiEAr5Xq%2FnGvDKvAZxKj%2B8BjbGKIHq4%2BWj1SMnQEgcLxJiIq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDHdoBeFEvn7Nxbd%2FaircA8o5c8N116%2BHwZd26ZyRI5jfplRRFknzsOPaPA68VmE2bjYll%2BanUEaVcv3qfaK2dzoNX%2Fo3Bn%2FddCbpeiexrAP7ZxnNz1vxNby%2Bh%2B2%2FC2h2v1Ca8VDgQbCjcewWXDv6EMGMnn4D%2F6q7BjToq8ZvO4WLwkoPn4OJ2ECvbBpdyfFZS4R3kHRWWxlZkaD1T7MPCztGKblURYhzLy52QDfc80GSQG4Bk0tP9nYgYe%2FCG9EFip%2FfO694%2F0BLgc1sSMP%2FhEy%2BqzScf2Skrv9XnyXh%2B2gk81cHgDNZyUslxIGYdL9fCbnRvXrtKjtYZj2ER5En%2FWrzQV3yhaSl2Ye8eiEkHEQb6mf7iqiutfA6VcjeaxjS6%2Fm6r1RNgxABcfciS4DR9Z4zGX7Uibcl8DgG%2F0KgHxK%2B%2BIQH5Ag7fhp0ly2QGDVsveDFQJxi5qP7mwaK5VJqR9zjIqamipKEw0ASsRrgg11kPpze%2Bs6uhOlGu%2B3jnL1mZXbSC8pTX7bLXALIy1FQYYvI%2FSyKYIEDQV%2FfILbly9VXwp9uqGAAzFDCy4io59F%2BjSSIXQycb2GEvhTTZ3I4U1twW%2FbHSrVo8BHkvMXVY5T0iox3QoFkwU7oC1ueHi6aFSLgRAUFxXuhr6NzMLT3u80GOqUBaH4XgsoryvgQ8HxPCT3Alqb4hvy4fR8U5KAr8EJZst4el5B6zelD9ZksIURhx6EhSKqLE9j7hUWUoLsetUxIbTS7IJTZ8Pac8pPPPGTRM4%2FBB4fXBa0FvO5lvfNIjxIPFv%2FYlIBzvOlaG39JQ97L68OdQViurylRjzcRIg8o%2BEB7q2KusR%2FMDmLIGYguolG2Y4f2R0hbVeSqgMr8AdBpMrxSCYat&X-Amz-Signature=0296dc298041033cdbdc215551cc76b3b08d4dfc12cf4893ce1b1c8791070f7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIBX6DM6%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T173728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIB09HgC76oP7AqP0ZFV2baS1Jij5c%2BB%2BI5uLFYm1nXdGAiEAhEgujS5sLe%2FpYOOgaRFIDuafsZ2i6gfy382qSz3EpPgq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDKoSEkZzdNojj4PXmSrcAwnY7eb%2BvlgZ%2BpgWp2vOT3GpdMplZ65lVZ2JqPrRQ%2F16nVLjsNJ9%2FvvlSnFPUyXQpya5eNmfENIYfjqoiP5%2BZmCdxsJG57dPmgVZAlpNel0nzYjiZSGnNt%2BDlcKBVVSKabJQvFviN3xZIbV2GSsfqn%2F0bkAwPDeZR2MzommmjhwofH8xo%2BjgJMdP1v076ZO1D8P7Bs96%2BZnKblOEGegeFQ4%2FjrDD0dtRVwE5Z%2BdP7c8x%2F4YHNK8bbPfrJdWpU1zKxJQA8xZTnMPC7OntUs%2BEDQn73qZeY3hR1yRA1gHdU%2B17Wdf6Ii2dxN64lunL3%2FGS86cXV8P82GWk5tOgReQZIUy4VqiFWpREqX%2F9mN%2F7%2FopBwZn%2BoAszGUv%2BJoiKJcB%2BRQr0oTHukEyUTJPL2sWDaYuh7LO2SlJodNSsTrhvBIdKJFzNzq0r3jb2LC%2Fvqp4ILx6S488PFwA5XFyc3IQ5XYbJWDJbIyy%2B0nqAiwJWiVo9t1885o%2FtmpqMJ%2B1HU0A7rZZ31ivE4J4TCvWb1rj3jQepIKb%2F3Ry%2BPZzZNG2hfAuI4aDLLs%2BfMu7zoIsjVK79pIWRU4C8mPJwrRAFlcZlkswoMgZe7sOmrTXRfsD38ZIntJCNe8w8revGTtl8MMf1u80GOqUBr1PaBnU2ueey7TdjLatMKLbYNE%2BgeUylloXgF5oevwt5P8XGhRCX4mza9sxzFQmldh%2BfS8737E8%2FLmxOTN47mgzUsxMwTJMWrD6%2BX%2B8AXkHgOsClOj2MlooroM1eIwSxMqF6lQ2zcPz3RUhfTada4lqQIc9mBBVnpr5uf8rZdTDM181u4xIYi06%2FLQ1fZgZALvcm2fU3W0It%2FHXqGIriWEmNHPJg&X-Amz-Signature=f7ede3e96b8c318a1e51f923be37bf5813fcdecb48b66689b287cfa9d6fd3846&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIBX6DM6%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T173728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIB09HgC76oP7AqP0ZFV2baS1Jij5c%2BB%2BI5uLFYm1nXdGAiEAhEgujS5sLe%2FpYOOgaRFIDuafsZ2i6gfy382qSz3EpPgq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDKoSEkZzdNojj4PXmSrcAwnY7eb%2BvlgZ%2BpgWp2vOT3GpdMplZ65lVZ2JqPrRQ%2F16nVLjsNJ9%2FvvlSnFPUyXQpya5eNmfENIYfjqoiP5%2BZmCdxsJG57dPmgVZAlpNel0nzYjiZSGnNt%2BDlcKBVVSKabJQvFviN3xZIbV2GSsfqn%2F0bkAwPDeZR2MzommmjhwofH8xo%2BjgJMdP1v076ZO1D8P7Bs96%2BZnKblOEGegeFQ4%2FjrDD0dtRVwE5Z%2BdP7c8x%2F4YHNK8bbPfrJdWpU1zKxJQA8xZTnMPC7OntUs%2BEDQn73qZeY3hR1yRA1gHdU%2B17Wdf6Ii2dxN64lunL3%2FGS86cXV8P82GWk5tOgReQZIUy4VqiFWpREqX%2F9mN%2F7%2FopBwZn%2BoAszGUv%2BJoiKJcB%2BRQr0oTHukEyUTJPL2sWDaYuh7LO2SlJodNSsTrhvBIdKJFzNzq0r3jb2LC%2Fvqp4ILx6S488PFwA5XFyc3IQ5XYbJWDJbIyy%2B0nqAiwJWiVo9t1885o%2FtmpqMJ%2B1HU0A7rZZ31ivE4J4TCvWb1rj3jQepIKb%2F3Ry%2BPZzZNG2hfAuI4aDLLs%2BfMu7zoIsjVK79pIWRU4C8mPJwrRAFlcZlkswoMgZe7sOmrTXRfsD38ZIntJCNe8w8revGTtl8MMf1u80GOqUBr1PaBnU2ueey7TdjLatMKLbYNE%2BgeUylloXgF5oevwt5P8XGhRCX4mza9sxzFQmldh%2BfS8737E8%2FLmxOTN47mgzUsxMwTJMWrD6%2BX%2B8AXkHgOsClOj2MlooroM1eIwSxMqF6lQ2zcPz3RUhfTada4lqQIc9mBBVnpr5uf8rZdTDM181u4xIYi06%2FLQ1fZgZALvcm2fU3W0It%2FHXqGIriWEmNHPJg&X-Amz-Signature=4e73abcae0844eadf6b0ce42863ec55d0222bc9288266a93bac59b97c6df2728&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDKXQI42%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T173711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQCTg9hQmm21kDBohq69EpszvqBb5uDKNsIoCPNkc%2BSQbgIhAKxK5hcHQ7TFJWqrV8oa9kOQvj4Bvr%2Fj%2FU%2Bdhhu%2BlIWBKv8DCDIQABoMNjM3NDIzMTgzODA1IgzhhnIHXXLHt1dJvEsq3AMjvZOeTzm%2BISHH47HG4Z1ci5WoB6HFioXexLEAx5kmLdmUfhXP3DLbUWvishxuALwUFpI%2FuWu2ENFzmyOMhFljEFKFvd%2BxmSR9PVSl7zFvcGFm6wijtI5DOXrsTqDqomjTloR6roqHoGeBw9KqNGz7zEZxFJuVme3n%2BBb%2FYzLYeITtMC4uPghJ0bB7oInppyars5LEFR6T6pBnwIaAzU%2B0jr5%2FWegjhL2sqaMLjxfvLrSRnB%2BJtmzvt5iKHMb7Krwy9wKXw2sT6huhNiscWyumcOlSgfLxNvzdGBEcFspslfw1DEy1j1tCJOpg9AonBSXOZl64jfbzqNPovnPaIisj2cXSd0VnLQOj1Jhl%2F69C1iEJy9%2FtTnBW9Hnws9vSLfP4yJ7IQdZpWSgU7pQcNxgKpSdsi970XDIk62Pj0Wo9i16i1XjuE1XEr0eYaTguA7B%2F4xee8obkroi4geMyGPCgraWg%2BGGuOsO8UVFFO6X5HBn9NleiOOBZ98A1lBUH1yvTASqxGfSMnZbqoCxu2UVPlC07GPYMbNBDhE2XNOqaNExTLtIMCZ2cgStjR8BdiDOkTcZF%2BaseCwkVGsaFU%2B%2FZ1lpaDsChBkF8VJtWFwWc%2BSqvEQn%2BJrasA7bM%2FTCR97vNBjqkAYa50nEBtNLAoHfKnETM%2BMXPLJRCp1jI7RP4FmTOR5daazXDCukPTLkatTNwCDgwIrcVtmmNIyu9rWAmTbKKg%2F6qnTxCarFJxrd6UVI568jSADBLFfgGugfJ0sV6zgBs%2Btm6KSjVvXyQhKMMwFqjY32bOT0O9wDo%2FONYSTEVpI%2BlyoP6LzIf%2FonATGSIui%2FSWCMtXuT%2BiICwefZLUg%2BkvwriHkAD&X-Amz-Signature=e8c11af90126e6b5d8c4dbff8f342879c7ac6702fc5372b428108df27e0ae500&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466365BSE33%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T173732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQDn%2BgN%2F8JdMHn9akw2TCxMQnllCpjoBJUg7cAiTXTwseQIhALTCtHebAcf6BdSEPKqFlzKP3mYzyd3ObHE202WMBUa%2FKv8DCDIQABoMNjM3NDIzMTgzODA1IgyM03cBCQk6ZNEZAukq3AMhIvqKlktpgb%2FVcJdEBrkYLHugcBZNWJuhnE3OrnbC%2B1yfFgNjVFbnVkBBSZUKF5TuM96ySNmMwDPwIcv3fP%2BRQdp0eYGfIi3VtOQQsX34UR%2F1uC54UnhOquifMfqJBnEf0zUAcVhxWVd9DDkRYNGnnvbaTbRlOMwXdEB4Xs8CyW9ibufAEl%2BHUliffy5svFXdjkCqzv9ffVKkBuywnBfCJTjFSlra5DWmKATruZmppH1Vg%2F5yUlAiK9MnU5clIc7y7WVGibmWBgd7%2FyMAu8vJjsay5%2FKvfRnBX12EetLI48NsoYwFUy3h8CS7EaMVYi6NibnQVFuYodSWwTHhjeSptNwSivQAXzUp%2FuZUSHBCWpradnpf682jpd%2BnejOi2PwsTSHw%2Bbv0oFhgwNjr1WA58pd%2BNjs1Z%2FTSG7STaXWuV%2B7C1wAN7G7%2BB99H%2BhjW6RiCUlbVjc3qerq1xwt%2FzD8yyS6etUh1YuFEdzd0p3oe1WGfPLtgI6ZF%2BwY3cix3Szk%2BqvwtMl54ZP3iV4D5HXpRwMZl0NdqCVi%2FB1gMGiyfaSsyaA6fSqkwxNZDPGxjN22a8XbBJTT7%2Bm64M5ODFyAbhnojjgubPxjD3HxlIE6DZZfDWTfyRQOmocYa%2BzDS9rvNBjqkAdcvAXsQziLyS%2FaS9ikdo1f0nXEzC2ADwVd7E0yCQXwS%2BvqbnG%2FYhzyOtgJmvTL4N5d8Sgmu2hLpspKbgviEabbhp%2BUJCPJ%2FuBAYQiio%2B9K5ESfix8JDp8iXqslpBdSZ05TxWKMriYQjUkRDzmtWjiD7sb2jK8JRl37OLsBXrEMrFjWFkrtJKFLC1f4L9qAHVlZ%2BSDJghs43z9N%2FpxAKE5BL%2FsX0&X-Amz-Signature=6db15cc2bdd52ee2897f7071ffa6d83a8a8122e6d421093a7b72d2ad5e8f0200&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466365BSE33%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T173732Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQDn%2BgN%2F8JdMHn9akw2TCxMQnllCpjoBJUg7cAiTXTwseQIhALTCtHebAcf6BdSEPKqFlzKP3mYzyd3ObHE202WMBUa%2FKv8DCDIQABoMNjM3NDIzMTgzODA1IgyM03cBCQk6ZNEZAukq3AMhIvqKlktpgb%2FVcJdEBrkYLHugcBZNWJuhnE3OrnbC%2B1yfFgNjVFbnVkBBSZUKF5TuM96ySNmMwDPwIcv3fP%2BRQdp0eYGfIi3VtOQQsX34UR%2F1uC54UnhOquifMfqJBnEf0zUAcVhxWVd9DDkRYNGnnvbaTbRlOMwXdEB4Xs8CyW9ibufAEl%2BHUliffy5svFXdjkCqzv9ffVKkBuywnBfCJTjFSlra5DWmKATruZmppH1Vg%2F5yUlAiK9MnU5clIc7y7WVGibmWBgd7%2FyMAu8vJjsay5%2FKvfRnBX12EetLI48NsoYwFUy3h8CS7EaMVYi6NibnQVFuYodSWwTHhjeSptNwSivQAXzUp%2FuZUSHBCWpradnpf682jpd%2BnejOi2PwsTSHw%2Bbv0oFhgwNjr1WA58pd%2BNjs1Z%2FTSG7STaXWuV%2B7C1wAN7G7%2BB99H%2BhjW6RiCUlbVjc3qerq1xwt%2FzD8yyS6etUh1YuFEdzd0p3oe1WGfPLtgI6ZF%2BwY3cix3Szk%2BqvwtMl54ZP3iV4D5HXpRwMZl0NdqCVi%2FB1gMGiyfaSsyaA6fSqkwxNZDPGxjN22a8XbBJTT7%2Bm64M5ODFyAbhnojjgubPxjD3HxlIE6DZZfDWTfyRQOmocYa%2BzDS9rvNBjqkAdcvAXsQziLyS%2FaS9ikdo1f0nXEzC2ADwVd7E0yCQXwS%2BvqbnG%2FYhzyOtgJmvTL4N5d8Sgmu2hLpspKbgviEabbhp%2BUJCPJ%2FuBAYQiio%2B9K5ESfix8JDp8iXqslpBdSZ05TxWKMriYQjUkRDzmtWjiD7sb2jK8JRl37OLsBXrEMrFjWFkrtJKFLC1f4L9qAHVlZ%2BSDJghs43z9N%2FpxAKE5BL%2FsX0&X-Amz-Signature=6db15cc2bdd52ee2897f7071ffa6d83a8a8122e6d421093a7b72d2ad5e8f0200&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RTRQADRN%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T173734Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIGuwJ0D1Ry8QY9eqhVCyX4SvDPuVT8EWiv6LKLsklcVXAiAaV2rwoTMDEeES%2F6dKKQz04F%2F1IeRg060Xt38FxM4PMSr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMInygwYtobebcS6abKtwDuXESJ5jEDfNIV1U3mP3w7tPKAr9Jy0IuvpnNemkKji%2Fwpv82fdkYyJh4m7QBXlKDI4Xyp4sBpJtSIJ2Vb0FItxqp4C3wuRPL9PibYTYRN1PnpQhU4cii80ULn0Ru%2FdhE45WKXbQjLu6FVzTXRmYxEOK42H3kQMQuiKKiLEuS10iaVCvLUCCd%2BU6QlgwBA6WBjazS1bSnCejypLaVoy5L9AKStL3twn7Ec%2BBlK%2BSM1eZ3QJb7F%2FLY07r8F83e4DUupfl1OarmvqX2RS0Uls46M00jhFFMlFkTLFkzsJ1INO%2FMwNEA6JRkcxYb%2BiNqNrX6FUcRN3P%2BtUIMCs6SZxeAImlZiLAqJH9Ws09MNDltIVjvBjZddKpHuqSUK7P07Koz3cXN0nkE8W5y00zJG13GqwujBEbUlHuQsi66u7MjCnq0eZ%2BUvzzdALALmwIRkQZTI%2F7RFb8rVkvuVC6WJghmcntS3giaKgYtPYt4nvGb0Ge%2BTPJLtQmBy5oYIJ8zsTEhdSsIN2ypBNY5e9eNTeQj0Pes9Up2jq%2Fw4sc9JK3rkWt6bUGVR%2B607NXtiD%2FEfG20SWtdo61kX0FCg44gYGmghz5OxlDtXYpE4dMg17bhW%2FnivOhwQ9%2BLzeNYR9Uw1ve7zQY6pgGsEnAHxpLlRQAKUXbxtrcII4Rsz3rtASqsUFUkoCMVxMOZE46n7bMv0vBUDiRYNNbsKH51tVx39tF%2Fui0DVY%2Bbhwz2fU1FpCVLQ8JfrdOMt0H5fv%2B%2Fwk%2ByxJtVtKqXm1qWP8jfkAk5OtzzsyKYh3D5dAl%2Bl3H9CIJxTkoNS5SZyoElskFw1yHeqVi05RRPXyDzq5LL4GG7BuTgnG%2BjVlS9PNLkYqGo&X-Amz-Signature=1a943e333f164a14ddc828d34d79652f19fc431f3e8754626fb20aec33595944&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

