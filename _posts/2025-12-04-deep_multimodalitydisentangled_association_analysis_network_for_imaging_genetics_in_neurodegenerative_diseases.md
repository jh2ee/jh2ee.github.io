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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AYDVWMO%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T155128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJGMEQCIEsPTLI2l1EOAVp2dyD1MdPsJeC9STqVPCgBCIwaMhJyAiBPrCY4hgzo00YNyw%2FAAWeLohHVxMBVJUNoqcaWxjk4zSqIBAjY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZ37v%2Fdk1T%2BjhJuWrKtwDl4b29ZKDHXdK1Ztz6wqXOFL9jmbH%2FS0%2FY%2FTgUl%2BW90A8N%2BkDZScb6jynaC0M5q75k7oqoZsW4RLqjwrL2V3rH2NI9sWbSUaYTAVi4%2FI3T7GWk4WbSU%2F48oXCTy4HNhnXVzKwcVIEvtlxIgAIMFGzBbXvtC20CjWl890QKSbQku82E3tlAZCvyXj%2FyXymGv%2F62ICmynM21K5n7muHj%2FnNziGWU7USb0wc%2FeCf0%2BXZSYxjWdqN9%2BAL75WrEUz%2F9pD21BlEKNrmf0t9xt4ky5px5u4gHZb1ieOkXtMpKj5cTnjiqk1CY1VwE5e27rbBO2ua37FUiKRbtxBb%2FVtl8%2FR098zSE3lS%2B1OVTumJuyGLRmFGRBi81TT3zZe12xBbd%2BBzVBvjXR4wdSiON%2FDxWtDsCGhw8e%2BYkX3VF2ogZna8Leqg6oMsALxIywNVSeKmVLKSUUa2nKWQnJVKeK444phraoGIsQAycRKysZm4M04IUqWYPiZHCCNOOX8vQK8WAViX4Rz7xSftVXl%2FDKRjhpjAUt3TlURgozuyJp9exLEBJAXtTokHiNNApZQbLBkwtO8OV35rTkURFXXtx%2FHjEC%2FBkuPF2JAx6svTh3VNpx76H%2FuMy38uiZO0h7o0VuQwubjgzQY6pgFj46L1fvJQ%2F0dSZrAkS1GVjxS975qRSGax51IjPle1lfhhWjuVJ8tYNpBwlCuQr7BPPS3iCb4ULJbujLnlnwLSpymm6KGaeXwY2dojwpj0M9k%2BYCvrlxFsof3IG8u%2FujlkF3CWTk5dFrAA7H4OdvSvCRMvUdjQaZodMdTiw9xLUTF%2BiUMpzIvAhOnBvWbifFEzfp02Hypg31IDYWGxwobm7OYX920F&X-Amz-Signature=14d5a5554de6da4c83ef8dcad52bdae80795283300d3f47b1da88880d45ab24f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AYDVWMO%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T155128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJGMEQCIEsPTLI2l1EOAVp2dyD1MdPsJeC9STqVPCgBCIwaMhJyAiBPrCY4hgzo00YNyw%2FAAWeLohHVxMBVJUNoqcaWxjk4zSqIBAjY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZ37v%2Fdk1T%2BjhJuWrKtwDl4b29ZKDHXdK1Ztz6wqXOFL9jmbH%2FS0%2FY%2FTgUl%2BW90A8N%2BkDZScb6jynaC0M5q75k7oqoZsW4RLqjwrL2V3rH2NI9sWbSUaYTAVi4%2FI3T7GWk4WbSU%2F48oXCTy4HNhnXVzKwcVIEvtlxIgAIMFGzBbXvtC20CjWl890QKSbQku82E3tlAZCvyXj%2FyXymGv%2F62ICmynM21K5n7muHj%2FnNziGWU7USb0wc%2FeCf0%2BXZSYxjWdqN9%2BAL75WrEUz%2F9pD21BlEKNrmf0t9xt4ky5px5u4gHZb1ieOkXtMpKj5cTnjiqk1CY1VwE5e27rbBO2ua37FUiKRbtxBb%2FVtl8%2FR098zSE3lS%2B1OVTumJuyGLRmFGRBi81TT3zZe12xBbd%2BBzVBvjXR4wdSiON%2FDxWtDsCGhw8e%2BYkX3VF2ogZna8Leqg6oMsALxIywNVSeKmVLKSUUa2nKWQnJVKeK444phraoGIsQAycRKysZm4M04IUqWYPiZHCCNOOX8vQK8WAViX4Rz7xSftVXl%2FDKRjhpjAUt3TlURgozuyJp9exLEBJAXtTokHiNNApZQbLBkwtO8OV35rTkURFXXtx%2FHjEC%2FBkuPF2JAx6svTh3VNpx76H%2FuMy38uiZO0h7o0VuQwubjgzQY6pgFj46L1fvJQ%2F0dSZrAkS1GVjxS975qRSGax51IjPle1lfhhWjuVJ8tYNpBwlCuQr7BPPS3iCb4ULJbujLnlnwLSpymm6KGaeXwY2dojwpj0M9k%2BYCvrlxFsof3IG8u%2FujlkF3CWTk5dFrAA7H4OdvSvCRMvUdjQaZodMdTiw9xLUTF%2BiUMpzIvAhOnBvWbifFEzfp02Hypg31IDYWGxwobm7OYX920F&X-Amz-Signature=14d5a5554de6da4c83ef8dcad52bdae80795283300d3f47b1da88880d45ab24f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BYSDPZX%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T155129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJHMEUCIB8Mp%2BmmrJOb%2F2GHE%2FxQghiOOY9tXJDevMVyKUCX5633AiEAhnUasC7sIMSmV5pspFyJCEEMNG7tV%2BnTLOPnZ7fyy5AqiAQI2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCYTFS8K%2BIQOUrM0PircA8%2BE2jsVOL2bfgrPi0SoDYT1Kp6N0VYhCQF5rvMknPoLCzmpmexTdtIo0aXdHnYrHStKdLF6TH8STgctO4wepuARXPLzeRVGDarnudb36%2B4WhFfgj12xKqXMwPzwulffE7A6dYCR8sJ3JxWpjb8X6cKGGqjoiX8AbYfKyPuA3Wdcf9vO7NVLdGy5DWuMT1tQpaC4iKO3hFWIiLY2O1Lk0XtpNOQt8t55SO8KBpaONA3k1VnVP6h%2BcDaIAalpbMnopbR84ThuarKKHaBFwOCok7SLcgU3sN%2Bv7KtHwAs8LTAAR78BCWUyMtABYmC4TIt02OtD8b2Ss8QW5ehHKrKdeFEEO6A025KBmfCDvy%2ByHSkodzy2cUmS1L6%2BiTNI7Nj5eeepdBPNhKIsM4N9ohcAC42AM5%2BvyqP5fYm34Ko%2FTIqvNNQ7KYQjRtZejPeUoAN5jnHsjZQwpNP954SiZ9M528eqzbtuoNe%2FAqmvcU42qXK3ShCGK9aw0lqvltZ6rOlKES2nGbAWcYeoylvP8yJQXEPydZQi%2BHyIU0j%2BFNw6C3%2BNsyzlxtuBU0CUFWw9HSH1Hhzl%2BbBz%2BSJQJaKcUAbQH1WMsMddtsiqkRAkWnN%2FAeRx181lYgbL8ucsQsQKMLm44M0GOqUBkixhP0yOfZAsHvOGyPTVgk%2FR3vV6COqB%2F35%2FWSdwwFVvegg78rNOcWZh0yA1qoQdBsj1%2F1fYilfB5fpNz9fIo1HZnCiCLOJLDOFFjv28BuZTB2ij0TqdBVp%2Bmi5cvszf2H6TLKvfe%2F%2BPfJZE4ttC1risbXHy7Dp%2FT3JbemjVTFhtI67YW9Rmo8VRsse8J6DAU4uh96ZAmLfGn%2BBB7ZeIretLe1Ec&X-Amz-Signature=d9c7af6e1c81658cd998915d98f6486a62c4d90b6fa2819ea237c055eed88ec5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7UFHREY%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T155130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJGMEQCIBWptswfq8JLWrxxR%2F533C%2FaJQf%2Fv36LfJe0Kv%2BQe29kAiAbtTQ3wZIw46SDyvDuebvFzDObjrfZpeN%2BMl8dGK%2FtTiqIBAjX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsz6LLN4evSFv5JJXKtwD4%2BhPe2Z8K89uLWod%2FGxfH8PlYjlaZIJ7ZpGJbwVBbfMxSzU8%2BPW4MgNNlKQbIf3TLWNTeWPI3UN9YYIcpEsGt3p1WnOQvveInrfA23%2FnWMRfy8gg7ArAVLbmY%2FGevxL0JgsJB9YRr5tcYW2XtsxT2qzfaa%2BuacOd7giEf3%2BH5gj4oHgAMPP4MFWYMebot4P4ksUuMUM1Dx0YZ7AWwEhWN41zkNfTvKsoUaIS69BbIbJfbXoQIiD0oynf5B2MvlQxefJk9eOKUIRHWlxl1jNN4cGiWUIuGgIcAd%2FfW06%2FXcQiv6YtpboSg6%2FepQspn56A%2FNXBUtjwOw3yY85jCBhWlRFasajlYi6zUXVcQz7l3svG9HvqfptxzfFwTabUyemZZQ8MJj8ad%2FlMywzsUk3joMTpxcWIO2euDF8i0Ua3Z9Lp5uZjaXUQpwTipOrnDKG8ynYgpW4uDb31bUxdi5VybRrQOME0sTKjGl18lDyOn00F5k843Vj4SXPZ%2FyGvqvYmkzMD0Wtl21A8%2BgeLmvSrze1HlY17qwRBjo1XKKiztVD3S%2Fuq6TTUSt4lxQfWmEQIgxExMU7OrJHE02zmIl2cBAet4RyKIyCzvgd%2Bm%2FQMG%2FlCFgxxkecUWyytrm4wp6DgzQY6pgEhYkwutSyML4YNGmWe2eMugTFVZodxFZtRsSpUFKKC0cAOqvVFj3m0e4F865WXcTPsT25xKnzPIVe57ngBve4xMmE7rjk7B4zIw5wYA0cppHgWdMCMmqcz5TytSDy6LbW%2FCIk4PHLlqjI%2FRV7AChwf2WkDp1blo2M6PaEKHWhEWtmuXAGNw5jJ71%2BQRftcteUqPgwhknjarU54er2l5K0nSdBCfbxx&X-Amz-Signature=0b41d9f0984322db35f8a1091321b33e171fdd406c9c37270da3f57b36453c82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7UFHREY%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T155130Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJGMEQCIBWptswfq8JLWrxxR%2F533C%2FaJQf%2Fv36LfJe0Kv%2BQe29kAiAbtTQ3wZIw46SDyvDuebvFzDObjrfZpeN%2BMl8dGK%2FtTiqIBAjX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsz6LLN4evSFv5JJXKtwD4%2BhPe2Z8K89uLWod%2FGxfH8PlYjlaZIJ7ZpGJbwVBbfMxSzU8%2BPW4MgNNlKQbIf3TLWNTeWPI3UN9YYIcpEsGt3p1WnOQvveInrfA23%2FnWMRfy8gg7ArAVLbmY%2FGevxL0JgsJB9YRr5tcYW2XtsxT2qzfaa%2BuacOd7giEf3%2BH5gj4oHgAMPP4MFWYMebot4P4ksUuMUM1Dx0YZ7AWwEhWN41zkNfTvKsoUaIS69BbIbJfbXoQIiD0oynf5B2MvlQxefJk9eOKUIRHWlxl1jNN4cGiWUIuGgIcAd%2FfW06%2FXcQiv6YtpboSg6%2FepQspn56A%2FNXBUtjwOw3yY85jCBhWlRFasajlYi6zUXVcQz7l3svG9HvqfptxzfFwTabUyemZZQ8MJj8ad%2FlMywzsUk3joMTpxcWIO2euDF8i0Ua3Z9Lp5uZjaXUQpwTipOrnDKG8ynYgpW4uDb31bUxdi5VybRrQOME0sTKjGl18lDyOn00F5k843Vj4SXPZ%2FyGvqvYmkzMD0Wtl21A8%2BgeLmvSrze1HlY17qwRBjo1XKKiztVD3S%2Fuq6TTUSt4lxQfWmEQIgxExMU7OrJHE02zmIl2cBAet4RyKIyCzvgd%2Bm%2FQMG%2FlCFgxxkecUWyytrm4wp6DgzQY6pgEhYkwutSyML4YNGmWe2eMugTFVZodxFZtRsSpUFKKC0cAOqvVFj3m0e4F865WXcTPsT25xKnzPIVe57ngBve4xMmE7rjk7B4zIw5wYA0cppHgWdMCMmqcz5TytSDy6LbW%2FCIk4PHLlqjI%2FRV7AChwf2WkDp1blo2M6PaEKHWhEWtmuXAGNw5jJ71%2BQRftcteUqPgwhknjarU54er2l5K0nSdBCfbxx&X-Amz-Signature=89b6338ccd29205d56b89da217e1b867fe4ebeffb391f401ed0c41d5a84a242c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZCZOKD4K%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T155134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIQCllEOk2tI8CjJZQxwXpZzSScnExPkpHrBHKRx00espnAIgE85LCNgIGzB5DJyPFHfPoVWA0ZCWePk6I0zeemz%2Fj4cqiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBK7CBkK2gaWbrf3SSrcAzkuod6nnp%2FcRjVKqX%2FQEBpk1gcH01vH475JZHT1S131qwRQ10m1sMMx4Z%2FgfnZZhnxMmDfl9V94VzOn3qAGnqjQ1v1maBIvNcd9qM%2F3rNotofqMk7l1iUHx%2FUnCOAQb5y1CFN3THkki9H4GMOC9ZeD%2F2BuCukVwccXV8bWp6%2Brf4AqQ6%2Fd7zC7WgahZ1bpdsqVC3OSpDsuPVByYvivvUi%2Fble6sQw5sb58LtO5cIDdUgeN%2Bnh%2Bt%2FauUk3X1LejSzbGQCU4Fl0GJbowVHziHRrpIgNd7oI0WYXf%2FIyM5xSDJtD2fVzHHfGIxjqFHVIsrg8Q3t70JUup1qat2za%2BQE9XDnhbGpN%2BnootbVZz9V3iHVMMU2AgYb%2BL%2F7a7FPRaKKqmlAWFi9MJf3UHHJqfX6%2Fyc%2FsWFrgrwq%2B5LPAWXn3Bi7Iuyox10ohIhgjU4B12y8GInxYfy9Wq7Th4IWubAw%2Bw4JDBCjU8fDol%2FR%2BtyZ4piq99rhGnbH4FQzGNOuvH18QyylDEtJPuBJ8DR%2F%2BiyiFw4UZW8KX1jW8A5soLDBek6qYdFZ2Gloa4joVVy8KQ39QybirUT9tdQ4m3IRO3MRtPjMtjSGEKsFcAzUdbmztnqjVfsJjJSVphBhJf%2FMPGg4M0GOqUBt%2B7ORMgDt5SDw5GBlLchBUMl3n1sZv0Xii7FCtUAYkzSZLZMDJKuZXQ6bgKNXxtdHz7c8%2FsI7gTdjAjauousjEhKwSK0fYa0pQ3CmnHZh4oghJc5R8RVscZf4Ru8zvD2kqZMzIolPm3%2F5WP4qLwhvelQYf0ZhraKWVgtuF8DBdXUcKK0ki%2BYN5Um5UomHyeayz7u7%2Bwa3TbZoZafbPvsLAk9Swya&X-Amz-Signature=ebfdbab5a0dae0481aa4ecaa1265215c440ed88736ee63e36d65de37a7b1baa7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XGZ2WKJQ%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T155134Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIFkAM7Uk1OwYnx%2Flm%2BU9yasTK8ttlcMrBO3Qsm%2FFbWPMAiEA7DKXhRKhgP1EhR3lqFVwAguWA5EW79Zl46UdD94FiRUqiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFedWc0e5M4AKSNQJCrcA4idDTk9bl4D3mNuM6WNX3P9S6VhV45XXYQCVWvuzVqoJP290O8SGLEmSBq7nN1j6RGweVCjN2c3HRC6u9K%2BZPCauy39t1jFkk2YNe39cf6ImlA%2FV5IS9o2YyXfjJElmXona5nI1jH9bhTwtjg2tSuc4scsWmw9jK%2BhPCwaThJ2n19BCFkmeyYFxlTtnGQoZW0pO%2F0KtRN%2FiwY1HLcChE1GwINfBUwdmroE86FQTjfpd%2BPZAhEh1sarcWIjHKM30K55N%2FNXAzSngRaayEwTxLknx4%2BxpT2xJZMoYHemsL4h7wegUPPxNUcp%2FYiNYBLAhjMDTakZW496QJZ7vFcLTHNHuW%2FlXyj1yh%2FzwvUZmP%2BKxvgUEGlWfcfcAHmcf1NLzknyQMCPtfaDtxBGH683mLQl0lBU5lA1zuY2xPln5QUlXGjBARVwhpwka7R2u%2FAoxG2G6zPES9cEqE2juOqoKFyKpCatiO83ljGgKRF3nGa1Dm0lfUpnfZ5J9LAXA1NozP6hJZwrNr%2F3hvaY6NWD%2FVT0JuE3nuZWJZnvX1tDyiuPqLLfiIMyG3i6MMHq%2F098ZCNL8QLS54oHabB1AHs16G02Oj9%2FWdsOcW%2FcqZLCato88f4YW9NtTTMTtH4kSMK2h4M0GOqUBSUhQGYylbBZqB4rfIcuZnVXmUBV2bfl3OiHVRc2brKmaIYykElMiyvk3C80Os4E2aqZqX1B0V0PUlWoh4NoRpWsPYCTFebOUudatXU%2F2F9OBmvcGIamBBpthpeYePR%2BgfmfZyQgRRkmNy7TYnkAZCfYHnR85naM7b5iImibTwNYdnKPlCTaTGl4Q7p9Oa9ArCa4NavML%2BGIQdDQMc1bK2AK77dxh&X-Amz-Signature=2b764a980e536a1c1b60072049c24f0c57e47d7781f6533dc90b6521dafa1d89&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMD3AVID%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T155136Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA8aCXVzLXdlc3QtMiJGMEQCIBTxU2DvGE8x%2FH7fVnowC9RpY9npIqgrrjOnj7C8EF9pAiAMWiXyI9%2Btt9Drv%2FZ914Ih6cqDv7mqlYZmMeM%2FUJ5OpyqIBAjY%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMM74qixb0LdAPrXdIKtwDI9BnwHvcKU4TWBWZ0OwB9yNdF9dIwgSQTVAv15EDkZurR0mDw6smot28KyMViCnXTInljL2WdxLUBDrYbrobrNyzZvfYfvutPNjvqlBcVF0ZZ3XuqBY2DgqzSfCEl0F7V3TAi14mpIhc4aeKcmJJAEZ2ohUbZj3OpIo4uitD1HCDiNHZoSp3rfTfAxH1c7tiwLTrmnVQLxz%2BmFTqJu5yYRseG6%2BEMa1CeBthEDGHfrEyMG3HPOnwqqwLHt2kOIvA0%2FX3mqn2oLtRIQ9abNdEcHQmLgRUALGsCh04vpelM8p%2FD0ipVA9EKEXznOgIJttocQETJHPxIgt6ZL9%2FeVv4wDXbdjdJZrcfWflkcjuIJdalfsudhUSv7eyv0ZH0dl5jPzoiv1AKG9GV%2BZ%2FTYNikyS9%2BAXTMAoLkmQYhNS1xQLPcw%2FnSLmxRiGK5nnGcU8aUofZUaAax%2BXkE15AEJZgv2jM46SltRPSiMhRTWDi%2BsKoD9zH4HrqXeJSKtJzXjMXNkW%2FkGxaVDdPYWKmpC5K8WKfOOXz%2BL%2BVIAG0RxWPmN42iLOYlDEoYlEOilcHub92bl4Dk%2BU8r3yzJw48IGIpH7J6Ibi63ERoakud6g7ZUA1gv5Vu0YAfifN7fYyIwtbjgzQY6pgEFWcRv3JEKNxL9X1Az%2B9%2Bj45733Pi5z6scZ0DGfOP%2BQnKRmsHWGYdiUWP13A87dPAqN03YHghd2VknZsnw0NDHcoVakgCL4kdZWU4t5t6DsXV4SQOwH4ZaT8HCmZSXntF6H3iTImMFS3uw0fj%2BOXGzJTBSfDDSREo5yyoKxIDixgv6xldZVxhz6I39o%2BjrAzMIakTY8N0CByHIJYlB8lG%2BZ0A9A1rU&X-Amz-Signature=f298ffce99f44c955344d2817432cdc58fa897694ad4567b7387fe2476811043&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ICFPFS4%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T155142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJGMEQCIAXK6%2FpTzdfG5Yr46rUTTpWwO9q1apuWnpHOWbCc06WIAiBSWe2qsNj1QEkySSvQqay3tf%2FkvZxrOFtN501QO%2BFCtCqIBAjX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMMAx9Wbf5wLkKJnL8KtwD1jLm8RAvL0B7pMsu7H9NSMgFWPOCRnJ4ExnqTDJuLqMd8RINWTbyrd7%2BWh%2BfiwOdyNfTRLaQfgZRou%2BVcQNkce3h19f5J%2FyBo8FV8fkwtW8I4zagPvDwZJlkdYX5tZmQqbHuqRAXtbNBE%2FT%2B78xVVpRT2Low07wz0Hs%2BaZKdzBAbGLXBUgO2vNj8CiGHpDaTW4YIDOiEcxebvw04LjQN377OYWWPDm8RK2INhgJbkkTpp5uujG6uK%2BHevEAEYuwNkIHUxwSeT6HG9Ha2dE9UOUdLPHbyf5MRlP04ecJYHNh9ltsZo4iGGTyE6Xlp8ERL%2Fky5G7wd6uO1oy8EaknH1MmzajcTWkwdsANEfHYf9OJH81OiRcMifvYfmlBaJHXG0r4QGYIIdfDh04s0zFf40XOvN1I1AJG9jjPmBr%2FyKx1XkDcPfiPruGpI5gWnl5L9UudBgNWkjM3hdieLTdXYt4wNJ2qY1LDH00O9QmwA5KFgOqV%2Bzqi5cYv4NRYUqX1b44puFGgBF96wAhnaUp8mTcWX7PW6VtyaQlefD2YjabDOBxY8sktUnzVu8qRurFQUD%2B5nA2s%2ByE8x6r1QgTTljSc3t1fb0MNCc6X4YWcXyAnEqb6tsOOOBrJlsPUwnKDgzQY6pgGD%2BSBXhCcSMMV19bbzTj%2BzClXpFR%2BMKq8wnAQMFx1%2B9yUFDlHKEw39tfpL93wDx2vHGzOIA0Orl2axFPyPnHUkl7SRJUyFFUOBPu3Z%2Bs4%2FHLTGQJJzNyTGQSJzg3U6Uwr9gIQQ8IAkOJABcXs1axyPaPWtqmTAMDqUCbhW3%2B22C6yPUjm1PtH4cw3zbym2UPojNBrRVGQGnP9MXXRJSaDZmgd1ryJe&X-Amz-Signature=0a6869bad11f32ae40e0dd9137fff435e462fe39858bd8ae824c6a598c714bee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ICFPFS4%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T155142Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJGMEQCIAXK6%2FpTzdfG5Yr46rUTTpWwO9q1apuWnpHOWbCc06WIAiBSWe2qsNj1QEkySSvQqay3tf%2FkvZxrOFtN501QO%2BFCtCqIBAjX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMMAx9Wbf5wLkKJnL8KtwD1jLm8RAvL0B7pMsu7H9NSMgFWPOCRnJ4ExnqTDJuLqMd8RINWTbyrd7%2BWh%2BfiwOdyNfTRLaQfgZRou%2BVcQNkce3h19f5J%2FyBo8FV8fkwtW8I4zagPvDwZJlkdYX5tZmQqbHuqRAXtbNBE%2FT%2B78xVVpRT2Low07wz0Hs%2BaZKdzBAbGLXBUgO2vNj8CiGHpDaTW4YIDOiEcxebvw04LjQN377OYWWPDm8RK2INhgJbkkTpp5uujG6uK%2BHevEAEYuwNkIHUxwSeT6HG9Ha2dE9UOUdLPHbyf5MRlP04ecJYHNh9ltsZo4iGGTyE6Xlp8ERL%2Fky5G7wd6uO1oy8EaknH1MmzajcTWkwdsANEfHYf9OJH81OiRcMifvYfmlBaJHXG0r4QGYIIdfDh04s0zFf40XOvN1I1AJG9jjPmBr%2FyKx1XkDcPfiPruGpI5gWnl5L9UudBgNWkjM3hdieLTdXYt4wNJ2qY1LDH00O9QmwA5KFgOqV%2Bzqi5cYv4NRYUqX1b44puFGgBF96wAhnaUp8mTcWX7PW6VtyaQlefD2YjabDOBxY8sktUnzVu8qRurFQUD%2B5nA2s%2ByE8x6r1QgTTljSc3t1fb0MNCc6X4YWcXyAnEqb6tsOOOBrJlsPUwnKDgzQY6pgGD%2BSBXhCcSMMV19bbzTj%2BzClXpFR%2BMKq8wnAQMFx1%2B9yUFDlHKEw39tfpL93wDx2vHGzOIA0Orl2axFPyPnHUkl7SRJUyFFUOBPu3Z%2Bs4%2FHLTGQJJzNyTGQSJzg3U6Uwr9gIQQ8IAkOJABcXs1axyPaPWtqmTAMDqUCbhW3%2B22C6yPUjm1PtH4cw3zbym2UPojNBrRVGQGnP9MXXRJSaDZmgd1ryJe&X-Amz-Signature=4b1687ed4c74b30beee0eee0b7efd1f12537abbc6f58269e575f1026f0499963&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRUSIECO%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T155123Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIC5sp9iW2DUH0FV4FaBP87EovzPqNL37Gld3AdbuniNdAiEAiobbpZ6pqkGqAuZUSClYLxsnnmGKQYR8kffF2I%2FWOQ4qiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOLbzZR4hQCEHNMpcCrcA5LHJohdC24gd5gcRvNEmtn6NdXiZ6FbriF4RmXnc%2BiT0MkA2Qm9n%2BXDtHNRmiRTuIMvClXrr3GCiWF3un3yhSjuVVlsK6iOvrp%2FBC4KmAKZsGWSP3XKh8l%2FDEiMKPxzjfupNSrOMZWew9xhzZ%2FmZdpi6ypn8HU1msFkn4m5ATYwt76SVyQr5zc1xSqtsDMxN6%2FipfemkUE%2FWRH6aDIOvJKVAR2VpMDCp7cQP4fHS0dhhUmQRGwbr9auGLB2dVYVZohzLGlIvLFGiaymZQWErScThBNPJJvhUeFybEPusjbU9XsZ1nh08cc6epegqSzHW72%2FWc9RB9OWPS5t32CSyOhpUsOnnxWDTI%2FnMXvMmXJ5RtCE6AC%2FI%2BHFrKFAoTbsmaP%2FnDz%2FDhVSzlekP2%2FcobGjaookBzUlhAl8lKuKg6sVaB2VoBtkohkHw5xY03Hc8L9fj4iSR4oM7tk6Ijxvk%2BM9fN06LdFFs3UCz8afa1aauhTe%2B16BhpoZ5HkRjSM3W7XjA72ZeFZ%2Bl%2BfcqZz7z4x%2BPh1GufgVBdA1vyeYHgdEzvFZ3LJo7MiezaGUnCX1S2nI7QTq9fYe6q9BWMiGnDla7yR0jaB3zzrP75payqHwc%2FF0Ey2xx6HHTDZSMMKg4M0GOqUBzPVu1nZAOVfPz7N%2BC9Ljf6FtI%2BiWz0HiduaDIn6eY8IomRYnhosNlI%2F88WUBcvVYai%2B6Fm5uIp1rZDLwOcoSyvP4KNmC%2BcI9loJTAOSagH991vfNFVHEOBd4AzZw8IrDOrywvYI7n8zSOSX%2BLJ1rLWrh4lAzo1EExrtUSDkvM4H4Cd%2BoRahIo1XUNNNfm53zvORqylJMSWsyuz3CEElfzmr%2B1uJC&X-Amz-Signature=1d5f9217691a643b17ed0608c1a98a4efd2461004499ad99cf7993179df2e1c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666X4XCOXI%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T155143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJGMEQCIHpSN14Zm5%2BOFE9P7Z05tpwroks69WsSuxEIe4SkyPHLAiAjNxx0VptWx2mdH2MfslNRHJYJXi7CE6gXCKxsA%2Ftt%2BCqIBAjX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMepOgL00kmNU18vcUKtwDmrsF5YGsARFP8QG%2Bmooh0CaXaEs7yYOvd16ne8kBnpUaEKfAz7pfuwGy8LrJ%2FSNsQqT2J16uR9xYTeVp7xuK9bdAbQYj6LVrh2fbpPgmi4ia4ryPJLXbsBaMfJ4twyj6yt8mvfTzQBKGR6PE35qho%2FNVcRWS3fKAUwt9IabpOn5dAptR%2FtAqfXBziolJoSpVp2OuXGX32In5tk9Zk9BJBhbAl7lwPCsC6tmCxGP5GiT93Qw9EMF7snpMADXvCqbdctLnow1XQmbj1IjjL80sr%2BlovkwOt68bUguX6cjkOvpDE6R%2BukbTa%2BeW9oxr5iP8od%2BVW9fKasOQMZErhDeqegMi1mMcVI312Fda%2FTBkLYE7krYqshvN4BNWOZ7LaR8XtaGgToyQtbq4hKU5%2FMoij55kinBJOzR%2FsZjLAMTA%2FI8rhlyXIcOILSnHMXM2kPdj1U%2F4sbg7FIsi0Jz9GWMUOUH9Zhw3DaCvDns7dNG9vNwbYGhA2nwTU7j1Z0P8bE7gZ70zpx%2BPt0I16%2Bkvh6ZYDwK1ra3aJTH2TgA3F%2BLXEkLYPOrmU5swxLEBY6fMcvUAQTwWFvix5B1sv9OuFgBcTeFsFE6myXXvOrNqBnGUYnCxcQWuAvKma9iZK2gwrqHgzQY6pgGJEDVPSaoYWC5vvElOHEaIXtH4owSOmTjLAbk%2F1Ikd8Ok0I1IeD7zkxjCv7qufN6DUg1h5xB7ct%2F%2FTLe5HeUgVtb5Kw4cvc91RoOUVtCEDuH95WDBYxzBikqZqlcS9drpM29fx7I91XSSeMVauzV%2BDmgRHazdrNjdX2eYgFwTipCO6zdFKH5p96Yhufc1H5F5qyzDJCE6laFljjHwD27JT%2BBOhW5cj&X-Amz-Signature=833a1c9e47516ef71edaeaf3cd7754740337cc385c4811210361fa52958140d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666X4XCOXI%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T155143Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJGMEQCIHpSN14Zm5%2BOFE9P7Z05tpwroks69WsSuxEIe4SkyPHLAiAjNxx0VptWx2mdH2MfslNRHJYJXi7CE6gXCKxsA%2Ftt%2BCqIBAjX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMepOgL00kmNU18vcUKtwDmrsF5YGsARFP8QG%2Bmooh0CaXaEs7yYOvd16ne8kBnpUaEKfAz7pfuwGy8LrJ%2FSNsQqT2J16uR9xYTeVp7xuK9bdAbQYj6LVrh2fbpPgmi4ia4ryPJLXbsBaMfJ4twyj6yt8mvfTzQBKGR6PE35qho%2FNVcRWS3fKAUwt9IabpOn5dAptR%2FtAqfXBziolJoSpVp2OuXGX32In5tk9Zk9BJBhbAl7lwPCsC6tmCxGP5GiT93Qw9EMF7snpMADXvCqbdctLnow1XQmbj1IjjL80sr%2BlovkwOt68bUguX6cjkOvpDE6R%2BukbTa%2BeW9oxr5iP8od%2BVW9fKasOQMZErhDeqegMi1mMcVI312Fda%2FTBkLYE7krYqshvN4BNWOZ7LaR8XtaGgToyQtbq4hKU5%2FMoij55kinBJOzR%2FsZjLAMTA%2FI8rhlyXIcOILSnHMXM2kPdj1U%2F4sbg7FIsi0Jz9GWMUOUH9Zhw3DaCvDns7dNG9vNwbYGhA2nwTU7j1Z0P8bE7gZ70zpx%2BPt0I16%2Bkvh6ZYDwK1ra3aJTH2TgA3F%2BLXEkLYPOrmU5swxLEBY6fMcvUAQTwWFvix5B1sv9OuFgBcTeFsFE6myXXvOrNqBnGUYnCxcQWuAvKma9iZK2gwrqHgzQY6pgGJEDVPSaoYWC5vvElOHEaIXtH4owSOmTjLAbk%2F1Ikd8Ok0I1IeD7zkxjCv7qufN6DUg1h5xB7ct%2F%2FTLe5HeUgVtb5Kw4cvc91RoOUVtCEDuH95WDBYxzBikqZqlcS9drpM29fx7I91XSSeMVauzV%2BDmgRHazdrNjdX2eYgFwTipCO6zdFKH5p96Yhufc1H5F5qyzDJCE6laFljjHwD27JT%2BBOhW5cj&X-Amz-Signature=833a1c9e47516ef71edaeaf3cd7754740337cc385c4811210361fa52958140d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7TK6EAE%2F20260316%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260316T155144Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIQDyFfBrUFaaVPJ%2FT7puXE3tmRSku4uCKjjn%2FJjzB5VyDAIgKrX7jKUKEB1cIocGG0GzNAWzH6CwtqwQNmr%2B3Z0zblsqiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLh5WdGPGslrFwDlMyrcA47wsK3HvFi1gNHKFudlMuNPTQoVgevo3ZQYUhvvPzzTt00Sd3ggoCTHeC1kZaZmu8Nqj3hnnmqLAe%2FK2ZyGcbG3eqtgXZxyIqiaIAbk%2Fov24n3MBD6uAO85pCYVoQM%2BnQ1g73w%2BSaqP6raaCnDCF4%2FKuZeHLOB0KnXgp1vH8AOQTFLgSv%2FTJbcr30njik81bo%2B1T6TYynz3u0YICPZ7I4AyPl5pJWsm4KF3E4fT6axZwIOMfcE7uyiMFJCSAG35AaJ%2BUknuyp4hoWsCtMVr3ava88wrytPA5PuDHVJSAfupS%2FwWzfzcnz41Mx9XHNF9IVa%2B6smDMzSA3IuPuZcEil2l7CQEKNcTWB6I82dxOcsu7ZaBHnkgdltiPIjojLW7BiUpPp0LeRicQ3sgGqBNz8ZvC4%2FZZ0PcE7ea0Yake32BZN2BT2pZLaWy5jIiWosWo6kBCs2XZTu9WWzF%2FuzVwdCSlRD5fllW9uqgcRowicmm59pNIPP%2BuR67aa940iSmvpQYr0o0o%2FruqTXfNEXrMBrVbmf0wE3xAibkdOCNbgf2VtcYcGNLsL0jh3wMPtrdn3I25%2BRGDbcJPG7qVLswo84K6Cr8ROjPbbIQqp%2BLzX4juIWEVSqAhJcd%2F4seMIuh4M0GOqUB8uBN7CzgXD1dLCnf2I3b29BD7CcqUNPRoMCaiNZ8F6bJuJGkY70D89AsUzUFX0aKnR%2BWiDBIuSuEQsjEzAZg7eLMF8mPED%2FP1q53Aa%2B%2Bi7SGamUP95gRHVqd7j%2F2vmyM8xNr8RJz9AHnRpoWAckTRiA3Ya7kQUoO1TeEmcz6OViz2vcfaUyMWFbJj7mxiMEK3BxwT7RQNFsyuKYtEQ6sbT%2FmSRc5&X-Amz-Signature=d3e0e24d341f0b7e8dadd3993cab767fb694a65300ae850c2f06339eeb521452&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

