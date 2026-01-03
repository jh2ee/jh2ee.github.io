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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGOZSBC4%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T023015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQDesZEuX0eClyLtD8t1R80GNMfTiLQQv8kgC70H%2FUDxfQIgIrNIT0%2F6jOGZpR0n6YuYZgN6OMysV5Zse1QfJb7mlXAq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDHYIvwYwghEFLlW4yircAxt6A%2BUN3OMpFq%2Bli4EuZDK2WR%2FaNjGliNRtZj%2FoeTyAYjlhhfhPmz4c5v1hx5HYQSY1wDg3C6u1smiL4%2FUQNJt%2F9GD0DapJ5rCaOAofWF17zhNWiS8B6OtZCv0RYRGp4c54qAplbd9%2BWsKbXha00%2FZjAS%2BpqnYzXwQ9NtAJtmQJPCARXu5FBU4oHPN6x4smOfvu8JdebKtoEIh4IVLz9XlCApK%2B3Byj79E1uOSS77s6t7Soiio%2B%2BQxcmWyZ0oGUcc0s6zGGg8lyfMZNDhVU4lmcY8OYkUHfydwwPxlNzwofCR24hIFUyFMiAbMw%2FvtYLZvSKFq1zjEx40Ca7p7mwTT%2BM6PoUnZ9E8Qmiz%2BNyus6A9EZgdqQ56pyUhgaNoGYcYkUJ1eqioI7AF520Us%2FKuz%2FiHitlhxgMb%2BheUBcEGN1ys9dBeYdqfJVVL1vIeTcdduUJwwLjRwP8MvOweKq%2FBTVGEfsvn8MZBwrE62ITCPyJjWTRt08mRFxm%2FTN56%2BuE31quvh2YtUjEPt%2F68d%2FBZdIIfF0jEeckL9sRaRKOrmsPGpa%2Be3pngT1HnjJ2BTM3XbJFeMxB3hVb%2BIYrRugkkNnf82mh07%2FtVf2pUKT8hoZ0t6u%2Bv%2Bu%2B4kluNPJMP7h4coGOqUBYHTGSBJ3UxO2c9EZHQpKrCj6ET677vZrXR2%2FmJtqKZWtTWwui%2FpCw%2FALQPViQHyrzlJ5A6lkDnOl0Wi3qJJzw7EfJwgeUoeanalPkL4NE%2FH88m%2F3EvMUxoh3PMWRHCvt2xXIQ%2Fag3HLCl5z%2BovGCiCaz2JxvbqISDJaGOd7T1ArjfDMJFDhZVY1ZxXKtQMbPD8TskLEEtgyetROk%2BGctr57fXbyv&X-Amz-Signature=8adc9b7a95eedc0e57f0c04e18f38370dfd7fa3173f521b1fef957799e2c3bbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGOZSBC4%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T023015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQDesZEuX0eClyLtD8t1R80GNMfTiLQQv8kgC70H%2FUDxfQIgIrNIT0%2F6jOGZpR0n6YuYZgN6OMysV5Zse1QfJb7mlXAq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDHYIvwYwghEFLlW4yircAxt6A%2BUN3OMpFq%2Bli4EuZDK2WR%2FaNjGliNRtZj%2FoeTyAYjlhhfhPmz4c5v1hx5HYQSY1wDg3C6u1smiL4%2FUQNJt%2F9GD0DapJ5rCaOAofWF17zhNWiS8B6OtZCv0RYRGp4c54qAplbd9%2BWsKbXha00%2FZjAS%2BpqnYzXwQ9NtAJtmQJPCARXu5FBU4oHPN6x4smOfvu8JdebKtoEIh4IVLz9XlCApK%2B3Byj79E1uOSS77s6t7Soiio%2B%2BQxcmWyZ0oGUcc0s6zGGg8lyfMZNDhVU4lmcY8OYkUHfydwwPxlNzwofCR24hIFUyFMiAbMw%2FvtYLZvSKFq1zjEx40Ca7p7mwTT%2BM6PoUnZ9E8Qmiz%2BNyus6A9EZgdqQ56pyUhgaNoGYcYkUJ1eqioI7AF520Us%2FKuz%2FiHitlhxgMb%2BheUBcEGN1ys9dBeYdqfJVVL1vIeTcdduUJwwLjRwP8MvOweKq%2FBTVGEfsvn8MZBwrE62ITCPyJjWTRt08mRFxm%2FTN56%2BuE31quvh2YtUjEPt%2F68d%2FBZdIIfF0jEeckL9sRaRKOrmsPGpa%2Be3pngT1HnjJ2BTM3XbJFeMxB3hVb%2BIYrRugkkNnf82mh07%2FtVf2pUKT8hoZ0t6u%2Bv%2Bu%2B4kluNPJMP7h4coGOqUBYHTGSBJ3UxO2c9EZHQpKrCj6ET677vZrXR2%2FmJtqKZWtTWwui%2FpCw%2FALQPViQHyrzlJ5A6lkDnOl0Wi3qJJzw7EfJwgeUoeanalPkL4NE%2FH88m%2F3EvMUxoh3PMWRHCvt2xXIQ%2Fag3HLCl5z%2BovGCiCaz2JxvbqISDJaGOd7T1ArjfDMJFDhZVY1ZxXKtQMbPD8TskLEEtgyetROk%2BGctr57fXbyv&X-Amz-Signature=8adc9b7a95eedc0e57f0c04e18f38370dfd7fa3173f521b1fef957799e2c3bbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46664XKAOLW%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T023016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIEmGh44QteUIhAC2QPHMjni2gB7ybAfqwwisag6ZzNUuAiAJNs%2FIxylNpuTLLiMYJyJKqfW4YYMzwBjMFb4LhBlKSCr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIM%2FfJcVMDqpFyEKyiDKtwDNh%2F7fteKVKempWnADXQQ8DpShiIdku3%2BaicYegcFASIm4wdVHkk7P19WVngg%2B%2FHrXm0N864EJzOboKFHQc2JADKcgzPUUang8LmRPbTN2HqVawseAVql7DGr88SXqQczzXFrMKT0fJkgHbm%2FfPnO3CCL%2B5WeBSEM2FYUffNod4FkJXbzrfMgOyEYgs%2FJKsTSL3CNDUj03wnyfl40s5s5KNfUXzdUq5kx2dqMy6VuQodRvUTtHTU%2FpXXWC7H01xeuoEXbDw3hHevKufTx63eEGfrxMBEoEIXp4eRywlg14M%2FtJxp65IX0a9RaPq0KW4F%2BKj%2FfW872KI48OPS47qwgTTPZIhP%2Fs7j3X6M2eHcD0poVJgtfmXEbbxxiO5obkCbplbDp2JZYsc%2FMXyaJZotpgO2fBUX3XHbr7QDsFly436%2Fipk%2BBHiNK6o8px0snkyKrdKcN49DFdow2K%2B3bgtj16NOyvnw65RYP2FaqitEQ1gAfpEatlVs1zXSvwIZz1u4eVGRVde3T0ZR1IiE%2BhCzZQ1BRNGMytENEmev9Dp31qedxLcjBWxf3ybYOgea71o0981a9lD3u43cQiROGUhCUL2B2L6cDjXzNZxJPPXZiy%2Fpy2YaZ8fBRsBAgq%2F4wgt3hygY6pgHux%2BdznTwka0UecrtjKRo0lYc56PbRlWMzpMSleSdo8xBOtEY0wD09TvhRFbvByNvXVmpF5z%2BHeTGj%2FenyHOi0zQzRRpPMb0tJedjApjueSvcQxxd6g3woflkTrcO5M%2BcYqYYKNmCKiWBP2b%2BBB54djVB9ooyaAX19XH%2FSoySwNenXtsnCzAoIUexOJpCgZsv9dm2m6vWbcfMdsBwhljj1kKN4KXmw&X-Amz-Signature=1538ccce8e61a5dafe18e6a2490c5f1c5684d27f1fb7458149f308eb93904fd4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663S4GSI7S%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T023022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIFhurwv%2Buy2TNdla4BKeQhunW%2B0WSYzW0EPmB5%2FVFJccAiAWXxaPExOXNdQQF0mHw0LrCOgP%2BGVy%2FnkjNLXKiwJM%2BSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMB6J8Rg006YpPLNHKKtwDzIJc1hGu0wduBUROQ4Acrmt7rbrWRtorc79U%2F3cQ4YPa4TEN2Xxi0VSVKfRf2w9rLCXkVwEz%2FngqscEUPIn7l21HpQHCMZiDGzqBrwqNcfmty1l2QsLeOx6GpuLB54oMIcJQ5D0o3iEjyuJ%2BqLU7ksqQHQM3R2ofvhOy5c3NQ5%2Fwd8Hs8J75gyRWG4tN2Eb3utjn5fZTMMfjz8GP13yrdMS1OALP5dUeFeH8wfFllihaNUuTkgqqye7OTVDsAD6l8grLXuk8UXmxseEFeCW%2BZjwtnPB2PBow1kbzpha7TIc2MkQd3aHc7uXsqspSRcDqHAKB7Wmp%2B%2BudE1Z7SC1WsqjsCZkYLsp9ln6yTJ5HEV3HEp4qqb1JQ%2FavYTd2hWLitAODFPdPRbS%2BEQftqVMAAYnp1VJK6zlLZfJcL582HLL%2BWTfV0nIRt%2B5i7aTglJh4tQCyT8qi87s7%2FwKTsQbDzkcrr3GrK7YIm2y%2FtyDDd98j%2BzxPj4IvXvpEZShFi5U3Y5H9KH2gs3pBuiZmRZpV0hor60V7VEWcmXhDFY8oPevTPM3Ett0EOS7lj8AFWYGFTke3q1mSq5wF4uwurVUvMPGBrnGvCZy2%2BAn7axBWEPJAmhRrVt5gOXdUxu0w4NnhygY6pgFgzjAxCyv3UAjYuSbYMW4tMoumtnkgHZxdCyGs%2BkHDl1qXnJMPO1Y%2FrBTSUU6JhOCV1h%2FGn8qFutjhNplMegZV6Sa2pGDiv%2FOiUMXp4Z%2BlxoZ%2FViYfq3vH5QSHfQ%2F%2B%2FFusnm%2F24J1WVZOkOxS%2Bug6t%2F5izdSwpJ4S%2BHv9YxdSLdhHuuXilhf7I9%2FO4Hq9F5DEPO2oWcERuv4OAZpg5BcxjjBT1E2wf&X-Amz-Signature=7357bedebd5148781e4b156a5c34523632f385c8c5d13481432672c2fddfae70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663S4GSI7S%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T023022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIFhurwv%2Buy2TNdla4BKeQhunW%2B0WSYzW0EPmB5%2FVFJccAiAWXxaPExOXNdQQF0mHw0LrCOgP%2BGVy%2FnkjNLXKiwJM%2BSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMB6J8Rg006YpPLNHKKtwDzIJc1hGu0wduBUROQ4Acrmt7rbrWRtorc79U%2F3cQ4YPa4TEN2Xxi0VSVKfRf2w9rLCXkVwEz%2FngqscEUPIn7l21HpQHCMZiDGzqBrwqNcfmty1l2QsLeOx6GpuLB54oMIcJQ5D0o3iEjyuJ%2BqLU7ksqQHQM3R2ofvhOy5c3NQ5%2Fwd8Hs8J75gyRWG4tN2Eb3utjn5fZTMMfjz8GP13yrdMS1OALP5dUeFeH8wfFllihaNUuTkgqqye7OTVDsAD6l8grLXuk8UXmxseEFeCW%2BZjwtnPB2PBow1kbzpha7TIc2MkQd3aHc7uXsqspSRcDqHAKB7Wmp%2B%2BudE1Z7SC1WsqjsCZkYLsp9ln6yTJ5HEV3HEp4qqb1JQ%2FavYTd2hWLitAODFPdPRbS%2BEQftqVMAAYnp1VJK6zlLZfJcL582HLL%2BWTfV0nIRt%2B5i7aTglJh4tQCyT8qi87s7%2FwKTsQbDzkcrr3GrK7YIm2y%2FtyDDd98j%2BzxPj4IvXvpEZShFi5U3Y5H9KH2gs3pBuiZmRZpV0hor60V7VEWcmXhDFY8oPevTPM3Ett0EOS7lj8AFWYGFTke3q1mSq5wF4uwurVUvMPGBrnGvCZy2%2BAn7axBWEPJAmhRrVt5gOXdUxu0w4NnhygY6pgFgzjAxCyv3UAjYuSbYMW4tMoumtnkgHZxdCyGs%2BkHDl1qXnJMPO1Y%2FrBTSUU6JhOCV1h%2FGn8qFutjhNplMegZV6Sa2pGDiv%2FOiUMXp4Z%2BlxoZ%2FViYfq3vH5QSHfQ%2F%2B%2FFusnm%2F24J1WVZOkOxS%2Bug6t%2F5izdSwpJ4S%2BHv9YxdSLdhHuuXilhf7I9%2FO4Hq9F5DEPO2oWcERuv4OAZpg5BcxjjBT1E2wf&X-Amz-Signature=7c09e03a48f1b4abe7f1d2a895b3976479c2b512f5d82e68beffce6073264f3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTY2Z47Y%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T023022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCICPz2%2FaMy8p54iKtxjuVFC7OPbs%2BlK%2F%2BNR%2BFNTwMkMp0AiAZCaDQg6so8ROnMy8TMc90BwK64s089EuKrh3GRqkovSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMaovB%2FLpDrPu1N9AIKtwDZ2DqYLa9GSY0aJm0v4bVbZQ9MnGNUILmMleBJWc%2FcOFS4gLxAEg8B25FDlnBJGPVLe6MM1ax0PQRJbk47U%2FCcEUwMxFxOKr%2BW8puWFrWutEMRbAOFV93whRExRIINYDc4vXR07hQz4OCGEKdB5EWVtJKQ7I%2F%2BHC3SVxbpoQ4lglF91BQWgP0tjiaLOcDnSMK1%2Bg8hbSbBy6dusi%2Buaab4klFVeIK%2FlGZVNbnKpgLVoVCpHz70qBvImMrpiVprHN9CY4z1ZBwahe2N2blUOLKCHa96Fmuk0roIkuthRzgSVUg7w99iH%2Bo2HeUU5spTln765%2Fv402jL1CZNm2edNWR8jQKZAAkArMYYCSRmN%2BL%2F3x7Z7zaFjFipOFP4oY0iAsgp56xanDxcePVb0rht5mYc128YTtmqn7dpQEP%2FYHqwhwFtrHUqdN0YOgHWHNmvRTbIvu4WzBx9NEiZQbiJ6AVJrbiOmIRKDoGGc7FDoDTd8PKMeAcISyp3qg9oYo45fvXO%2FaiSdfqjFn7bY1sw2Fg01ClykOch1%2Bye11eVfIyHUjM60zTsfZ5z3DjHQKp675KciZQn9N7mskeOeHy03bMYrqRmkWOl%2BkTBKbESBoGk5h5hpQp0vrtKqNpjXwwuNrhygY6pgH1yZozBl6KRIq8hMy%2FX63DpaWhSmINvLkRCF4fJVxMZCRaTH88l0uaRNflKBOEPhQZmMkw%2Fu8r7GDqYZ3xDdlDzHXchCJ%2FxJa4V%2FoPxJEXobufe4FaHgTQc9p%2BG6bhHAymhUMP4gtT8gslWBT%2BN0YMfXshNK8UB12sQhM2CQeLfaOwuphyF2Ep8Iri8ibocvoQrAFZOHB2WMj%2BQVC3U0qBUA9Q%2BFKw&X-Amz-Signature=4a578d9e207128fde35831aa3fa8486d7f43cdf13f463ea387dbdfde39ac5c95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QTC5UIWB%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T023022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQDRjVa9Fq5MoPxkLTpPcft60plnAIrQjzLD4WQ8dF%2FDWwIgRM%2BnaaMINuX0dN%2Fml7DF3YkAZHsY4HBMV4E9T7rvukcq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDMm26BQ1pyvrOxplqSrcAxakz4t0nkExNGc5hveJYL4XSgWTPNZNYWTQwSxGT%2BESKRaPtuN4pT5aKbqnOj4mFLzKc%2BilG1V2r0mtx2787beGBq9Edr%2Fr7rFkPGai5S61DR4vbRgeIy7qEl2BcPvbfulZfYT2b2EqFJrZYiQ72fD4St%2B%2BwvyexSGq9MMcqlCfz1FS8grTarfku9GSigxulP0J5WasUsjQiMgfQYgvvTzSF9M%2BSENZP2cg3VSJVjujz74yuk6BQ7S1qSRHvRuEDMypyWMCHjfbPzeWeYhzXKjHpHEhS2qRAvtuVnXxgH%2B2xuN3Ixgp0YVHf2%2BKIMGVAY5VyW9GxWVpwpP4UY9jm4%2Fh12VS1MV6w744yt0XroS7JYZZPiP4TP1FuJ7FzxMbiLpVtS7fGyVjeqh5rLgaq%2Bp2Pm5jAb6qbv2LVq7tzGczES0nUubyd2kWIMNyFrc7W9ZybbPQtQWZofvmjwqE%2BF9AIfALyLNSpOhDUhISlz4wO5%2BoHesE9jp4Pl0wUZFHqxx4F%2BEbi7fml%2B%2FMBhpT8zRQkb5NAUp%2BHc1LWxlAZJXGukje1ocB1Gg4JW0rUjTobIHxqgAvyq9fXBCsrUn6Og7b%2FsKYD2jEIbF0kh2dBIvRpQK2TRXFKo26rHxAMNHa4coGOqUBL2mvPU9V47ZrGM4lBKK8p7vcCzeqWeuu%2FZtu6ct9k387LhTUIq9qywSl9paW1C9GeHBoYNZlD58xvChNdvGBUTq0t48kXw7A0ch8vdAUjaRRIYSEDqdAQPZhDAMDjfzxCChOUG6ooELVtZty3BUx%2FzqAqRcODFpOzTnyAksQwt1WiXLn5WilEW2Z0wi6KfRo0cOp0pQPgEA6NyS0YXkUufNKzpCV&X-Amz-Signature=840edf1e630e9c4d362bf38aed1442c15e215c8849dff2368860d210ed0b5146&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RDSRO46%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T023024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQD2s0o%2Fd35DjCdrHXGgAc0LYouNGMgQ0KSJuBB%2Bz1hvNQIgSaKaDsA6FdxmQY7tfneQ1xSK0lrYoJvOkNvmBeC91Gkq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDJfROUqjABxncqS9UircAzo3PltjaQjr7DalU%2BB6YGncYsMEGexmHk7KMIpMGzaWB4T6w%2FjwFbad0O6Bi2GFW9JvK24h9LlV1xkLeDIxZWYNqp%2BHjL7e2hv1gfY01ufThK1VTrnE0JbvNirtNkx2e5lUH%2BK6KcH6E2%2FEe%2B8UoLLZ9iGKVLk6XSdR0L7vqGl2BGr%2BGiAIQLLmZXoIt%2BfeNFHm%2Ba1nTd8fwknWdn4QYZqQWPjKtYbWDHTHhwMjwEqX0helWfGa%2B2doKZRb%2BtzPuTY0pRk19OqopHonUkDzR78MN5VHwD4cqOdRyBpwe0DY8wWp%2B%2FfN9ytgWp6S63OO7hQCLyxs5eQMugMU2obwMHKt5wfPtBFjhXLG5xAswXci7R7TdLOSGFQ2cjITXnzU5Thccw8p5BVN7oe8AHdo6%2BEbGTE4OIHiAulLjX%2BrPlm%2Fp%2F1paSfMv7qqVk768xyJP9wRRq8LYGnIx%2Bw1uOfuFewbQSwfecFOgJBnnYu0xAQF7eMtk1SBrpKm8U3vBeHcwElXynlnTaL6wv%2FgzWNhy5rqJTbDR8wCAZl4Zc1kPZeP%2BUhz3ZveuVzkXd8NJOhUCHMIXFQvGSfrXXoHZxfCBVv0U4DfeO%2BUahrUloLsYJR7iDiSA2cdEZAQ25ipMKTd4coGOqUBZxLDgdrzb81qAdhOh8RS3Nn5Th5MhFtN3xrizBnty2G3seHmCl1mveRFkLBIrCkA8k2q5dQI0V%2B8D7LzK3QvC%2BwMx%2F2DENAmNVsGvLi75moiGpQNTQ%2B4qnCZG%2FNAWj3zryq7lE0vDg8M%2BgRiv0N1XBueN5ilaKRFl%2BHP60iUgEsHxrAQiHJk9WhkbqvsCJpaFIi4yq9L6DttMBiYG5a6g4AFOKir&X-Amz-Signature=76bace412bb1cc0d0a4ee35f3a0deb4d0f34fc6a9a7710b29a5577c9a4ff2bac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RY5P5GNW%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T023026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIATVJaQz0qBa1Z7vH5maD1z6AmwfxvgQKCk9pNrODgMtAiEA8%2FJ%2BibQ8Cn5Wm3yhPAqjSS9CGlkqw6g7JiEWaHUcZfkq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDHSi7c%2FzkYa5r5cWjyrcA8QHgZcBe0ecwFi7NtUGbxvbBGsLk%2BpTOk6WmUIqFsUtR%2FXMOIFc%2FuK8VwVGgBaAsh7vpRh1Dvb8YE7CksxpKIxFCq3qUPOvY7qJRZLfZfQT0km%2BKWaE5kka8p6cP%2FB0RLz5ZJJ%2BBLmiUcq8e5qBG53nlxZAVjoZjF2dGo2iXqg062R74O0S95mb682Wog3VBIrD03c99QzraIkPEQP92oT2%2B1XWikMde6DWTI7I%2FvfG2Q4jjFR3QJVPyJasLbdjIMEC0NES4g%2B9OYB%2FnbCwOwE%2FiLN%2F%2Frq3FR9IiseWO82%2FTVZHPPZR8a1JRPdiv2Mp14PekKdyElMsGazbtvpO1S02QfP0a4O71EVuaEzHHN0H%2FSdfhS9htj9ajW%2B1ILMDnqjZhygrZn5B5M6uulGMMALMbAPuHqS8cEA8w5wtlEaFFvqg%2Bq7%2BvXf0O4loUTfI5pHL4RA1d86CP5fhbh1P7PqN8joZEN1k45V82Y%2FMC%2FDkklG1PX%2Bf%2BBzFKiX1dSYSpwcaPLp%2Feb1Iyh5MBEBu3F7lqM4V6f9kJ7eXNPIHMYwsIJDjG4aF%2BERGovNVtzWOkw6a9ILRb3nW83A3il%2BZx9kEeVslC%2B3E%2BP9TqaqxdGVl3lVvTd%2FU6NQFuZwWMNDe4coGOqUBjEZbZTlX2twEOzkeYX%2BuYEg4wt5Bnifu3boX%2Be%2BztHDNsbANEadQuzu9mSBwawjmHU2%2FV1eWNg%2BDVmZkFRXvQftw1puok39G2JPTbZIkeEZ6LXeLp88UaZI3shgNuhsEAV1PvHVXLPOjyHD07X22d1ApXQ1bMLGbCZgbdVLNf%2BC%2Fb819Wsn0UbCaNFYuLMn5Z1m%2ByjVoPa475fC4ufBMkZBLvyhG&X-Amz-Signature=53c5ad1ddd5b8bc3c24063ca34c0d00ec59854bd06aae92803e2e11743ea20eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RY5P5GNW%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T023026Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIATVJaQz0qBa1Z7vH5maD1z6AmwfxvgQKCk9pNrODgMtAiEA8%2FJ%2BibQ8Cn5Wm3yhPAqjSS9CGlkqw6g7JiEWaHUcZfkq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDHSi7c%2FzkYa5r5cWjyrcA8QHgZcBe0ecwFi7NtUGbxvbBGsLk%2BpTOk6WmUIqFsUtR%2FXMOIFc%2FuK8VwVGgBaAsh7vpRh1Dvb8YE7CksxpKIxFCq3qUPOvY7qJRZLfZfQT0km%2BKWaE5kka8p6cP%2FB0RLz5ZJJ%2BBLmiUcq8e5qBG53nlxZAVjoZjF2dGo2iXqg062R74O0S95mb682Wog3VBIrD03c99QzraIkPEQP92oT2%2B1XWikMde6DWTI7I%2FvfG2Q4jjFR3QJVPyJasLbdjIMEC0NES4g%2B9OYB%2FnbCwOwE%2FiLN%2F%2Frq3FR9IiseWO82%2FTVZHPPZR8a1JRPdiv2Mp14PekKdyElMsGazbtvpO1S02QfP0a4O71EVuaEzHHN0H%2FSdfhS9htj9ajW%2B1ILMDnqjZhygrZn5B5M6uulGMMALMbAPuHqS8cEA8w5wtlEaFFvqg%2Bq7%2BvXf0O4loUTfI5pHL4RA1d86CP5fhbh1P7PqN8joZEN1k45V82Y%2FMC%2FDkklG1PX%2Bf%2BBzFKiX1dSYSpwcaPLp%2Feb1Iyh5MBEBu3F7lqM4V6f9kJ7eXNPIHMYwsIJDjG4aF%2BERGovNVtzWOkw6a9ILRb3nW83A3il%2BZx9kEeVslC%2B3E%2BP9TqaqxdGVl3lVvTd%2FU6NQFuZwWMNDe4coGOqUBjEZbZTlX2twEOzkeYX%2BuYEg4wt5Bnifu3boX%2Be%2BztHDNsbANEadQuzu9mSBwawjmHU2%2FV1eWNg%2BDVmZkFRXvQftw1puok39G2JPTbZIkeEZ6LXeLp88UaZI3shgNuhsEAV1PvHVXLPOjyHD07X22d1ApXQ1bMLGbCZgbdVLNf%2BC%2Fb819Wsn0UbCaNFYuLMn5Z1m%2ByjVoPa475fC4ufBMkZBLvyhG&X-Amz-Signature=13fcb3f06d83d4f5013c73a87bb56a46c05eeced4c1d9dfa58c15e29f126a13d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OH5QJ74%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T023010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQCaU1BTN%2FZfZZpmGKjXQcvwmvZYZ0NjPqP4DBwApgf8HQIgTmrUzQoMP3%2Bg8sFB3dysvVASvlXvpv%2B8EASbVvE6s3cq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDJSahgdfwK9hurdaiyrcA3%2BTcMLOznurhKkxb%2BWQ2kyelLsgow3u9KIA%2FtksWo3in%2BKksSwX%2FR3zzzQiYhHvBUMaChkCRKueQdRznlD57s%2FAC64wGspXF4bGnGrW2%2FfLeXDGQwndAc7fIpLKxWAEAKf%2FK9GtdMxZE2jW9JEQWCwbwxV31r%2BaCWjKFyBbQCMOrLiQ4MUE2k%2Fnjde%2FxMnzXwwP7lm8%2BnmgOuf37W2yg4zG%2FdS2hmi8VPsPlKmA7gx2RvZ72vUppCC6gH2y0I1d3R6%2BdvJP1XRQMUJ%2Bq8cmodfKHCf2OfRr7Pu6YStOOyzGuEex5B7hzaFFjGHTglCozxT12RXQU8%2FJi68nCx5PyFK1SJoD0TueeH0DrScaJpGDyPc%2FYZY1G0aw90woVTFzl3kl0oRmvIbnWOE2ZW%2BGR%2F8Urj6xEWKAn985QPsHlMOtTnyZyIiRe3FaAzqV%2BlcWIc1Oogz789chZM5QBqEEK0ymDXORH8HiBZ0V7VekeiV7GV4n3MEGPuP4az%2F8%2FMGOY9ig37jHg1GwqD5E9X4btUAPjlSf%2B%2FkD%2Fzjz7BjQtL1yI9ILpvqEwaI%2B7fzSdO0JNDEwoLzElL1o5BZxEJ1F5E367%2FeDSbLPdnf8%2BZjvLfL52zpjv7wv8qKgXLNAMITb4coGOqUBLXsfcnYDJ7884%2FmGeKKy1ZKJtamr%2BBgtN22%2Bbu9j7c5FpRFwukNUWeIheokkXxNOOLkHbXTgSao7jQdp2UbPagZtfoqyIIIAjb4ZWubE9dM%2FUPROz1qQYTneGxgapABpfoO3Jhnx7GWyWnxAFofF6HeVKW8d9styLbjZkTs9JeUqwMFbgccF61jZilA2I8ePSvDF69P%2BYZIGhj%2FrbGYKxEM1kS%2BX&X-Amz-Signature=d88f335bf6d7f3196f6fc4282cd7c9221c920e124e1289b4a1595142e2ff16c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663T3FJOKS%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T023028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCo8%2FqGVfkU19FHsxnz1DtBTqXkgIh4aVwJWzZJUekCSwIhALqltu%2Bp6TWMc0lQ26DKS4fSQuVnjhm%2FzRsZGa54I036Kv8DCAoQABoMNjM3NDIzMTgzODA1Igx2sPU9ebQLpnF0zK4q3APoSFZtfRlDn5l8txdk5Hq%2BGxzMiFLnfTyOF8r43PA7ul5lSi2lTMetz1BFl9g3NWoYlEZgzWtI8thdjAfh8GdaLzdXwya339QjFJWwDiCsKADmaCuFJ92cKLnjMLh1l1%2FOCFPVVv7qNnArPmvUxiun0uH7KUxFB5LXUfbX9neTO2xvYNQbMD%2BbF9nndvC2CQytrMA04zTUMXl4zJ8c%2FxbHrNo8WtVxU3RXkeby%2BI%2FU0ToJCw8%2FNWUaiGQqZ0p8mm0UIg9VT5ImJ%2FLc3G4B8qRNJsZJ%2Bkn5nnFWr3TRWu969PEB3iLONEX6Vy0gY9SsYdjsFUbOXedJYhfbxmu5OM9Zg1TLoGpdDfNppJfwVH2QStd7OczaTshtSm8tHpoPhAwn%2FpTvcf6ZFyC2ZAXW4ifW5luSuxInM6NAvSsIwp1qOraxTJRA6E7DHHIEKb0VyZd4Zxgmuuxxf%2F7woO64TG0J6%2FaKrQM8389OVIlt55syYIvC5Qs00Yao17sVkWMbZwaxJYwm8dpFx1hMfodwjiMIC9g871z4WwnU2W25UnV9P6qrC2HldDk8bPWIOXrG5o28%2Fb%2FHibFy7kGI4N242UPAm5zxGPCHVlEfrwzLZaA%2BtMupb7ebFi%2F6TwY2HjDh3OHKBjqkAf152vFeYdJQf3bjmjR%2BW7x6hvM4K3IZf0NB3GDCivrtVcu7PCvOOUd8gHFx9Peqe8fLU2drjZFpqo8Yags7yhDoVyjpqH%2BuJKWb%2B0GsSKX9aeSEGymlftvSPGxAP7P2HZwJZMYd%2BoVtfC0sSHi6lZoqwuXnSdynrgRjXINW82WeyE4cHmHHURDKK%2F9ukzGQ7f82sQcw8XCIPK2WRj2QLHiXz%2FgT&X-Amz-Signature=410a0c912defb6344c89b5689a4df073b45545b2be378587da64562f2a6ebcb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663T3FJOKS%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T023028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCo8%2FqGVfkU19FHsxnz1DtBTqXkgIh4aVwJWzZJUekCSwIhALqltu%2Bp6TWMc0lQ26DKS4fSQuVnjhm%2FzRsZGa54I036Kv8DCAoQABoMNjM3NDIzMTgzODA1Igx2sPU9ebQLpnF0zK4q3APoSFZtfRlDn5l8txdk5Hq%2BGxzMiFLnfTyOF8r43PA7ul5lSi2lTMetz1BFl9g3NWoYlEZgzWtI8thdjAfh8GdaLzdXwya339QjFJWwDiCsKADmaCuFJ92cKLnjMLh1l1%2FOCFPVVv7qNnArPmvUxiun0uH7KUxFB5LXUfbX9neTO2xvYNQbMD%2BbF9nndvC2CQytrMA04zTUMXl4zJ8c%2FxbHrNo8WtVxU3RXkeby%2BI%2FU0ToJCw8%2FNWUaiGQqZ0p8mm0UIg9VT5ImJ%2FLc3G4B8qRNJsZJ%2Bkn5nnFWr3TRWu969PEB3iLONEX6Vy0gY9SsYdjsFUbOXedJYhfbxmu5OM9Zg1TLoGpdDfNppJfwVH2QStd7OczaTshtSm8tHpoPhAwn%2FpTvcf6ZFyC2ZAXW4ifW5luSuxInM6NAvSsIwp1qOraxTJRA6E7DHHIEKb0VyZd4Zxgmuuxxf%2F7woO64TG0J6%2FaKrQM8389OVIlt55syYIvC5Qs00Yao17sVkWMbZwaxJYwm8dpFx1hMfodwjiMIC9g871z4WwnU2W25UnV9P6qrC2HldDk8bPWIOXrG5o28%2Fb%2FHibFy7kGI4N242UPAm5zxGPCHVlEfrwzLZaA%2BtMupb7ebFi%2F6TwY2HjDh3OHKBjqkAf152vFeYdJQf3bjmjR%2BW7x6hvM4K3IZf0NB3GDCivrtVcu7PCvOOUd8gHFx9Peqe8fLU2drjZFpqo8Yags7yhDoVyjpqH%2BuJKWb%2B0GsSKX9aeSEGymlftvSPGxAP7P2HZwJZMYd%2BoVtfC0sSHi6lZoqwuXnSdynrgRjXINW82WeyE4cHmHHURDKK%2F9ukzGQ7f82sQcw8XCIPK2WRj2QLHiXz%2FgT&X-Amz-Signature=410a0c912defb6344c89b5689a4df073b45545b2be378587da64562f2a6ebcb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJRDK26G%2F20260103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260103T023028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIEXhncHRqTTdNe%2BxjGOzDbbPlPmgq0BFNzFVW%2BTVrnT%2BAiBlHVBQPZmqV9tvAu4WJ7E8yZimirtwgTIUZ5n6irF0hir%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIM1Z%2B3M%2FfuJLT4%2FWIaKtwD9PZ5gbn1Tj18ft2BLEpzoAUdGVMfCEM1CaGRVmN%2F5CFRfVe1MMK5YyCN6iIa9lQjNxEzP6CYl32yk0EPy6Sy%2BbnHlRwUN6IYLdpzpZJWKs8NbQv8f1atopJjG7w7trnCvruqde%2FDM5%2BbaZGuetCHZbD98nd0VSCuL1q7D%2FYbyHV6lCwMuQxXmtApvZRufRxMmd93SywX%2F4ImDvnzNpXqeRb6at8i5OzvWRcbW0lJCgqQi8NVb0iuXfegPGsfBwek3ikzlIffmug8NrfQ7nEGz8Hn%2FkKiNln1I7hkdG2PJjvNGoEcAl0JSFofE4Lk4ygxg1pSaqS0%2B6KAN1diR9R%2FjsNT38hIEFTS43zgrhW5d6uxca%2FLRrKOKDPRoQz4ebUrg6ES9QTT7E2MoglC0N8EeuDFVOxlFriRSDQgt%2Fnh06WmFaw9WsuQmaY0k6azlx4R5ferivs1KGWW9%2BRejQAdv5rrMr6ZeeDdCI553VNhp6SBL3igJtE8zd31784iUsicys9DTnr3r5iAG1zQ0hy24%2BeKFX4vgzfwDG8MC2aU6GhctZxtJe5QrWxum%2FLBCa6h0eXRs3C16HYFI6ZPLwaVHBzSqCnZjvIr3OhjzsEeVHkDDfnp59SnshEMgwIw09zhygY6pgExVKmtvxtSIltl6Z8zbLb1Kvv7Le3KBBEA2NjNsNQivnV9diVaoJ87wSXSJ3QIWFy%2Brwg4AGl%2Ffc%2FEsCvSOM3bRLnVOUUSEsrElfjanYRQcm4A6jaX%2BdJrdt4YwCBA%2FXqN9SnVjjddcKtdgaKgYdL3E5ZsQveFkrESUKoErPqfxyeedjnwEt8dOFyeHkLRpbydJ166%2B9OYBYd8XCAZigaaFqCi%2FIeE&X-Amz-Signature=15b7df5ce89944ce0e66a61e2f3e7a5b265f25aaafe40db396ea182c70c55604&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

