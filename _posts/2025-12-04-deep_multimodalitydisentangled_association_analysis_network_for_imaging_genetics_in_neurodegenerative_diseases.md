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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAE6RZHP%2F20251208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251208T181413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEGK2nqIIlbnK4dk1HRU9l5WbszOlL5UCJKwF%2F5WymROAiByXw1A17PkUPfQonCPPKoUvKR%2B3H2u3v3rUfSvwU4FTSqIBAir%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMmMzsij7XAlRJZPy1KtwDqCtFy04au1Yx8iXfVaA0RKYDFG9CyU8y%2B8oIZghYOBFDWCY%2BoMkK7mODwzLK0mpm2Bp4ehBkaay9T%2FiFJZ4Cb2VYgRwiqzWtvwxKi%2BGJBTtT8gF6ZNHzTST%2FzlxEVmCRK%2Bx3njBq6J9zcbiqigqdgmhYfJnYjunf3fC31EQEjQJtx4y715Q%2FjmwJa%2F642s8W%2BXRQ7Ar6Muf8NPmcpAW%2BPGxe2ki72nxD0O3TCi0M6V2qbO43badHnV9SRHBPgZ194v7AxNW1khS1Y4rM8H37Yv%2F4Uw9466AEVin2Ell7%2BTEbo8hIfjW4%2BVkmGj5aRKN4a2m%2BWwGd1RfLgsSt%2Bep8J7QaZ3oEvnYB8aQ0CJgEmVsEqo3CCi0yCbiZFpgF3CNOogMt%2BrMddd42cxkEWxVS%2FZBrH5JFa9t%2BpdzmkPAFlGk0JMpAXyOsjlrv4nT4wME7FRieUo6aWkDuuKXnqIadeFKLwQzVX2PF8xx4ZqnkppcDRmJEUMbnTKTLOgUwiZEHI0xOkBqtzOPkc37Fnh%2BnIuFqH9CRQcJsUMEZT2UGftAKq%2FFIKnEsUFJDWYCr2dvK59n6sJg1vmsdSpTJUlNrpASXYBDZGI4s5wDjcaeVlUs92sMTa58PiBTra4swm5ncyQY6pgE2sN%2F87uSqZAgYJe8%2Fb010y6h716IZiMicGjI3%2BynNw8PK4c%2FztfaAOAOP0fH6qVFZkQ0qeGqm3ck2GxxXIGy%2BonzaaEUlGFWN%2F%2BkyXzCsO4OG0SfwowDcCwzaWxK15g6yAcsQ%2BmMjTwDF%2FnLd5bsxH46GDPWeSX%2FtWJWHaGEg%2BhWAtjnDFF0hJNx7XXy8MIgW2enfWpXQakVWRM6sZW9CxvYEf6K5&X-Amz-Signature=722ea1ea115e07f2f257a1b85f0de4fff7966d0c284d4bebd173d981b67c44eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAE6RZHP%2F20251208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251208T181413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEGK2nqIIlbnK4dk1HRU9l5WbszOlL5UCJKwF%2F5WymROAiByXw1A17PkUPfQonCPPKoUvKR%2B3H2u3v3rUfSvwU4FTSqIBAir%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMmMzsij7XAlRJZPy1KtwDqCtFy04au1Yx8iXfVaA0RKYDFG9CyU8y%2B8oIZghYOBFDWCY%2BoMkK7mODwzLK0mpm2Bp4ehBkaay9T%2FiFJZ4Cb2VYgRwiqzWtvwxKi%2BGJBTtT8gF6ZNHzTST%2FzlxEVmCRK%2Bx3njBq6J9zcbiqigqdgmhYfJnYjunf3fC31EQEjQJtx4y715Q%2FjmwJa%2F642s8W%2BXRQ7Ar6Muf8NPmcpAW%2BPGxe2ki72nxD0O3TCi0M6V2qbO43badHnV9SRHBPgZ194v7AxNW1khS1Y4rM8H37Yv%2F4Uw9466AEVin2Ell7%2BTEbo8hIfjW4%2BVkmGj5aRKN4a2m%2BWwGd1RfLgsSt%2Bep8J7QaZ3oEvnYB8aQ0CJgEmVsEqo3CCi0yCbiZFpgF3CNOogMt%2BrMddd42cxkEWxVS%2FZBrH5JFa9t%2BpdzmkPAFlGk0JMpAXyOsjlrv4nT4wME7FRieUo6aWkDuuKXnqIadeFKLwQzVX2PF8xx4ZqnkppcDRmJEUMbnTKTLOgUwiZEHI0xOkBqtzOPkc37Fnh%2BnIuFqH9CRQcJsUMEZT2UGftAKq%2FFIKnEsUFJDWYCr2dvK59n6sJg1vmsdSpTJUlNrpASXYBDZGI4s5wDjcaeVlUs92sMTa58PiBTra4swm5ncyQY6pgE2sN%2F87uSqZAgYJe8%2Fb010y6h716IZiMicGjI3%2BynNw8PK4c%2FztfaAOAOP0fH6qVFZkQ0qeGqm3ck2GxxXIGy%2BonzaaEUlGFWN%2F%2BkyXzCsO4OG0SfwowDcCwzaWxK15g6yAcsQ%2BmMjTwDF%2FnLd5bsxH46GDPWeSX%2FtWJWHaGEg%2BhWAtjnDFF0hJNx7XXy8MIgW2enfWpXQakVWRM6sZW9CxvYEf6K5&X-Amz-Signature=722ea1ea115e07f2f257a1b85f0de4fff7966d0c284d4bebd173d981b67c44eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Q2EXSEK%2F20251208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251208T181413Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICxbVmAoRSokBq%2Bp%2BVNT6nHVRiupoacHEa6SqEFQSJbLAiA7aW4klZYvqjcm4amrhYAF0vHIoc29rTgu6cVJmFaTuCqIBAir%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxL7W5Bb9%2FTZMMvqrKtwD91w3Zi1UAIHvDjGNkKOgg4AXQqaW76goWgV9jcBNpwShp0AvpiPoGzeb5uTaLR9ULtGWkvA%2BHkWb5sdiR1nit43EJAoShAv165TN8XmtZ%2F2nMEcLqlQ%2FQWLtGvuykLwlfB34P824Wvy%2BJXxL3oc0CrUiNPBtskdZA7O4PdsqrovXCLK2q62HATBEcrNNp3okVGSicIg%2Fj2vnJ%2Ba0ncggeG7xhhYnxPwiQMjiNcRzTjy%2F7UP7iG%2BDYOHl7lgrDtwdmnWFeXBvDns%2FLRUZez3k4CeutnYLDLYV5kZboZ0PT9th70AWr1AMPNPca72k9QqwzfpIpN8ZBqZvcN2taBeuY84PsYvmA%2FGtelBiHI4MzV9E0Zb6zTxvayFVAaKpNpSgoYuisU8Ykf%2FX%2BamJxTxhp9YW8aUAHCGuibRySHG54zHKrQMOFkH%2FtMfytN6WlbhxCVFibIV1viS%2F4pWTGusvfj7hZnNh9%2FUdd2BqRKpFvjxvHsxSgkDr4c%2FoXptS6LAWG2DYN5lQhstzDW8A0zdd8tnw2TtuqEnwa75CaajI4FkdG2bAo%2BFQOpZipkQYQmZ6Ok1wXD0qk%2FuERm83Z%2B2YcXEUlIm94EK9ruxKeSrbh5CLRUpQ4HibCGYyXnIw9pncyQY6pgHFxB5TSNS43LBmdIef4dn%2BhlQOyKDg%2Bum4%2FmmCBQHx1ZJlYY%2B5j5WUG19pq4c3T01HQgZ1RDXz5hmX%2FReOEWpH75%2BrBuMvMDat1nAbWQvHpfFr2M5sLPzMSdYcHmJ3nBo3JdjR0cerFPVVedCoNSqt0Ij5rVKasZH9l2Xh7d%2FeQSEAyucTS8bHb6BAqARvLRT4kec1QdJEknLJ2FKOuQz%2B8Q1dUcM%2B&X-Amz-Signature=e0aafaaa1a450e37d1f99db4e24022576f5fd5206753871bbb39e62026289442&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W37WEBHZ%2F20251208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251208T181418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCS5mka3aSAhI9vObr6wTCyJrzeq5n8CB%2Fp5fCLGsjEDQIhALzhqeI%2FBueeU%2BVUrMGgDLHmXvxP8bTUZeKEVcB77I01KogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx5pqSnTE2vGqH9b%2B0q3AMSJ72%2FKOkuCUMVRFujkwuUPdDAVJoX%2FkyCsqK6aF9jKisW7V1sHTGtTVCSRzQM8wo3REsEp0EIk68GCGSTBAvhpJUSE12NjqQEdKRH9iJDvoYIyCaTy%2FbBiPqMe3BIGXLfKeh9lfu7cMlYsyeuLU9INRlfNg5rdJLVmyojakFyrbRdx08hQA0Bd7pM92c%2B5czWjiKSPkzqGgXyKRo4%2Fvp2KWtd57l67Gxi26oDF03FkgqC8Y6oRmx3YhwJHbfBpl8Jh0NB42kWJviFhQcInazLfVgWKmUv5Nmcc2LWgRka%2Bbu%2BvT7eYojxE9HY1XhY7qsmdrsWCpx%2FbOKd4zUhKJ21PGDUpDirjlSvl1ZKG1z%2F6o6mVCv0QUGPSn3HdjDi%2B%2FrrQMy3Lh2LXyq8HnrdSsUiWhxyjywpOhd4WuIQL%2BZ%2FCi9JwhP70WNILQjL1KH%2B%2BoamG1hwbvtkR4WHwMfIkhQkAeEzR1x7fSlRVmPsbdjVH8sbhmS1n%2B%2FZ8%2BgBwTVkEmir4I3Ix5RJGHEJJQZCTSuP8F6pi42bV7bZUbeFhMNsjqnJlykp9c6MxK0ZCZLosJLmwc99RPV1Sm1MSF%2FvHNmCEiE3DM7x%2BL9e0lvSWBZHZB60k6p7vxJ7c2BxsTCpmtzJBjqkAfrxZf%2Bnw2ZmXoCMpZUnt87s%2BTrWZKL0qCznJ05SxQcZT6CRn5VRwNQYDFg3wzQJTodEhvDw8%2FWDy33Tn6I%2BRhl%2BqPavU8KiL8UuzOzRXg6%2FBrJ9VVxwMZsHMK1MnklFvA8OmBLsDoWnUAetjPklgLkv9OWfODcWME72hUsaVLpIC84q4Tfkms0csR%2FzUFvIAEYc8PAMvhpr1RSYqMBnyGjwndsJ&X-Amz-Signature=3678634d89e9b7d339f0d75777a0d722119586f9ac3697433caaf3131449736c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W37WEBHZ%2F20251208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251208T181418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCS5mka3aSAhI9vObr6wTCyJrzeq5n8CB%2Fp5fCLGsjEDQIhALzhqeI%2FBueeU%2BVUrMGgDLHmXvxP8bTUZeKEVcB77I01KogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx5pqSnTE2vGqH9b%2B0q3AMSJ72%2FKOkuCUMVRFujkwuUPdDAVJoX%2FkyCsqK6aF9jKisW7V1sHTGtTVCSRzQM8wo3REsEp0EIk68GCGSTBAvhpJUSE12NjqQEdKRH9iJDvoYIyCaTy%2FbBiPqMe3BIGXLfKeh9lfu7cMlYsyeuLU9INRlfNg5rdJLVmyojakFyrbRdx08hQA0Bd7pM92c%2B5czWjiKSPkzqGgXyKRo4%2Fvp2KWtd57l67Gxi26oDF03FkgqC8Y6oRmx3YhwJHbfBpl8Jh0NB42kWJviFhQcInazLfVgWKmUv5Nmcc2LWgRka%2Bbu%2BvT7eYojxE9HY1XhY7qsmdrsWCpx%2FbOKd4zUhKJ21PGDUpDirjlSvl1ZKG1z%2F6o6mVCv0QUGPSn3HdjDi%2B%2FrrQMy3Lh2LXyq8HnrdSsUiWhxyjywpOhd4WuIQL%2BZ%2FCi9JwhP70WNILQjL1KH%2B%2BoamG1hwbvtkR4WHwMfIkhQkAeEzR1x7fSlRVmPsbdjVH8sbhmS1n%2B%2FZ8%2BgBwTVkEmir4I3Ix5RJGHEJJQZCTSuP8F6pi42bV7bZUbeFhMNsjqnJlykp9c6MxK0ZCZLosJLmwc99RPV1Sm1MSF%2FvHNmCEiE3DM7x%2BL9e0lvSWBZHZB60k6p7vxJ7c2BxsTCpmtzJBjqkAfrxZf%2Bnw2ZmXoCMpZUnt87s%2BTrWZKL0qCznJ05SxQcZT6CRn5VRwNQYDFg3wzQJTodEhvDw8%2FWDy33Tn6I%2BRhl%2BqPavU8KiL8UuzOzRXg6%2FBrJ9VVxwMZsHMK1MnklFvA8OmBLsDoWnUAetjPklgLkv9OWfODcWME72hUsaVLpIC84q4Tfkms0csR%2FzUFvIAEYc8PAMvhpr1RSYqMBnyGjwndsJ&X-Amz-Signature=1f4e3546509df3805046b7f473f2cc7041bc7c4946f2cd3faee2e5691f3431d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RKQOAADB%2F20251208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251208T181418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIALLcTrqNYeVkbLjVOEhNtGg2ht7Pv7yTan2d7zuvitoAiEApf%2BRV3WCFJBhaU8ETXhV%2F2b81SLO6o5A%2BIKSSJqGPD8qiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDvVWZWVwyJ38lfW0CrcA7RhN7b1qft5VIY1FM1nIISO7BEpySV%2BSDGH%2FcWES%2FMTLd2wROFwEnqkcc34rhDSJQcj3r%2FcVvk6z5ztziGGtrOvanLUUH15w5KhYSJGsHp7ZQSgPB9MbMmrgazn%2BfcVqNzOXhhwQ4ZoxrqLWJngkKIRsPv5LKNJSVggMBa5CyAA4cUjKriqYYnXdxbxNWp5gRk5CMy88z5UMxse4AUTLcDK03BAbvG8mPbrg9y3dTyDWlgz6sUYesrGFM8ZwCniB%2F7ua99A0dCC4Wv5ZiKgoFlyenRW891BWxMgIfM%2FU7cx0Ly2zwjjrZ4%2BrZVKebnuym46TNPxxLsxlTtierApQQ68%2Fa0A%2FjYtwzp6O4B16USA6uj8vEOkPZ8gobP29Ki0uFf5s5otzrEW3BL9Yi55VoFXb2L4AhRlzJJ%2Bu7CwlzWraB%2BFOeC2IrBD27TWNIJ%2Fa6Bm6v3NAliuciQRRFhESC%2B9ulo6E7osWwfM0%2F9w5yAFMf%2BA51m3M%2Bd4ZqUp9lqpdctl8rhofzHawyUT8Dq%2BZ2xRHz%2BqzNZylCuhsNvZxXD8kjA2x95ZrH2a6WWrLS7Png8piw6iU0QnN1VqvJDwvYjCDcTo97X9Fb1iBGRRkxnctLzvNXd%2FFwjH0XocMPma3MkGOqUB6LnYlDS3QWUqouOZn6yoX%2F9zO5%2B4D%2BVy6s1a4hdkvvXfF8g2v15GAM66TZT3Xfafkx8%2Fd0ATWeTsE3fGaCr8gnWptuaVsQrDcQydQELsialBH%2BTjNCb8hIJqKspSJp20QmKQai%2FpZAG3qFdxeE6BqZ4O2F3B6zp%2BOarZdNA%2FiAdWcpb5xBhLRuXeyu%2ButQ8snXHS8ZVwVDiXH3lXKuKQXZJ3ictF&X-Amz-Signature=69c406d9eb43e92e69e372ad5503422f0b02c47a0c357d60d3d294d1a7d5f1c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667TSD5VVN%2F20251208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251208T181418Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCDhSryEYWv%2FWtFtKQt%2Bp2d9DtuGEO6GkIis2a25X8aVgIhAO%2FeKrOzAjF3CsZsE4LUhdB%2FyW%2Bob9bqAaVVHe5tm9EDKogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz%2Fhmo%2BnzYfWQModeoq3ANSZg05AQW9SAo0LMqoD3UiuOKPSLwknEkk8PDSK%2B9TCULH1PghoIX8oBte92WFzgIdwK34%2FXbz2RiBzqsRgPdrkaQc2KrFft%2FRrsocyKz6WWLGbMGoUTja9hEMCNZwW94gCcW4%2F5r8TYdIZUk%2BoflpZ1gceOvuKvl5rO2gEFbmfvJkt8JvBh1Z7SHB7t%2Bo%2F2jjTu0YvhDCLSAsUtlABxo0dka7viZ0SAxpwRrM%2Fbby8J1R%2FIiUtzWPxi9uBh4qgziclDOSMzOPLk2cN%2FFd%2FHHSnx0E0GJK41z6ZKegVrCOWYr4QdKWxigOuuSyjsF1SJSjL2Svh%2BiqlWiZ1U2aCeCifcozMq4uUqvIMDO2TsZj%2Bdf6ohR76b4%2FL3EwyRSwzoAB2hCmu7RXtBdx%2Filg%2Bu9huo895hkIy4dyzVbpev%2F7wz%2Btd9W8dOAmCyQcp4STmeQXdRs8%2B2DABk2wo89cGoSKaQmg1y5%2BK2glwc%2BQcOYEyWmKTZs%2B%2FFEM3RnqnRPX%2BLpCF0TL9im8726Z44RcCvShlyd35jGy8oiNgRhtJ1i5zCqpOZweILf8gUSFVd1E4NoYLnCnW2xBxQKqeK2QLJwrpZvghNoOMrv1ChQHYtbpN%2B0gWl9KJZpra22LYzCamtzJBjqkAXoHVBSaSy5aBNdTpCDzDozq%2BsT5ah5qKMKw5bsnjf4%2Fn0uTL7RIZtRgLvZbmdAcS5AA66kBW%2F0vtwK0ycnXa6hTgitD%2F6dpAoaHhbGs%2B7I95vWyitee4YRZV93g2rnVOp0nTiY5IBj9esxV%2F8aN50BZAHQzgS1QSynjKt0gnwxdJ15YxEBzNqnKHFlk6vWHTbCJKNXEpxxZTAPicmOikgpYC%2BXw&X-Amz-Signature=449dd234ad1b10bef2bd94653bc9829b588000cf34aa27b5f30d8ad8cdddfece&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWVJJORZ%2F20251208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251208T181419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDElTQbkshtRtyq%2B2YD2uv%2BqbRYCYP%2FFQRGOpgXjyZN1AiBUyCXQ38%2FPKSJ8KvGPvDf0aYQhX6rC05a1jCuMyLAQBiqIBAir%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMetiYGYm9AxB4P%2BYZKtwDZoCR5CkL1NWPTxbc0eQwTx72AOUzFM%2BMDV5L%2FSaxvrydHVVjOMpdsuFEq7isbUrwdq4zuZG546PtJuZ6EYNeTcCf%2FzIgXjBrSSbnUpRxGjVTeCeTc9CYFCBAODVdtOJkwEHLoD8Bl9F%2Bp2sr8Nb768xdinhzS%2FZbHacxjtkWc5rkQcW4Hs2mBQ%2Frb4ZG%2FHhwPP35whmmxeNr%2BEqsYDAE%2FtG41uU4mX12Hobg2cX7sQCYDzly0vBIJkTl%2FNDICCIRJrIZp5BfhBCYuQ9hpWdyRl5twuL6zXnpdljQW3bXyv5wWv4CvM4g6hnvnJ9ffywoBaEcRWLEKAlWYRgXQ%2F3Qjku83%2FO4YmW32zT9uQK7YV1KPrJzdsBykzLluJP7Wv8gZFdrmC4twj%2Fdf%2F%2Bv0Nfwff8trXyWas5CZBEMJxaNTqb1NHSOtEg3fO4gBp07gvr8vvQzNMO8GChBwpvQ9nBOkGsKcvCRiKQaMKSh%2FyiQfTMsOEVASWzXesbOgObp%2FOT5CXYGh6ny%2BYuE13y5EyiJT1PSKzsOoR6BKM2ITNP%2FpZvGQVrLEVJpEUOOcaDFnB3mymN4xZtP1ObpPq2q193axnwL8OQm9qTRYcJmBefxffcwtg7Vyp4Cuk9dgiMwn5rcyQY6pgHudMM61uBnEKCJlhHsf480gZW%2FzqmMyKJrRRPKwhtw8ll82Y4HdSOxxBOGIFSVVTLWqLVVQVcoaQOaecsRik3PEVoX1LQ0g%2FAbHsiOz2F3HFEet18I%2Bk95MueWf04IVwAtYZI6q35PuvPBpgC6Q7gkXgmEI9Lx8N7kZW3n9SLN8RZjwMcjfS01w4QgmVEX5DnfnJQ%2FtWtB2C4VLvj%2BBi%2FR95hi5Dd1&X-Amz-Signature=2141b6d68f231211962af2df94b697747f484cdaec1ae9aed23ef432b08a6ffc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6YO7M6P%2F20251208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251208T181420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDoymMhoJyw3Wjyd%2BjHyy9QdcmhZeuf71HaOU6cZZYb7AIhAOnx4DNF4H89ynKayOjq7oucOPoWIBJm9Qw4yV4OQW%2F%2FKogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwlUn3cFvl%2FMRw%2FgHEq3APYCTAzifvh3KaHZ3niknGCIDws%2Flg5Af9WXi3N%2FFxZ8NyBFCqbRoIpPtf%2FMWM0nY%2BFO4ygJ39ZL3mpWRM6yb%2FYr5A2CiNpl3FlxJDztHBtwX6POZModAUJBXbEaLLrT%2B27C%2BFrCnI6YKDB3qz%2FKWPgIAlTmcyJYcja11Us2MfHadQK%2B%2BhAR3ygXGcNPvOPXoSPKJuBRRurP9x1%2BjlZn1Trzy9h6bsmU%2B2E8C2hz2A6XozJVjCMxT0rxGobVO5t3XN8d1zZ5J6ef5ylrC9cNibXtD59V8qKE5aiaTF2Dj6u3smUtk9EmNABSpKu8GPkMWrH3Cv%2F89MAntula%2FmhNxxkWinQOs4R4g7ZgQumLYLPfKnPYBnvrEe9YP%2BJUkf31nl0DfDpfWVwTWH7S4o5wjbaDQ3D4tdYFPx0cjBDMd%2BoT%2FII2zWkRRjjN0%2B1L%2FU9as6efhLKSvLUvQ5Qa%2Fx%2FW5yAArFJsgw1gIpcgFVd9cY4cWG%2BVykgKMTELAHDRXxPNWSqKebu5PIRqoaPHraM9KM4MzxxiZ9KS6%2BX%2FmQuvVxONaf5tBersYztXm33x5%2FnyAt4HgCxWswcaN1RpeeSIlC8UPr0tlr%2FLKFDxL5xf0WrxGDaDcFcmy7aQiNAFTDlmdzJBjqkAdqQdSS6o5bryhSonKpJJwRfOCCdJO2kZ8wjRk3QyJarJ1vhRTxdyzNZR%2FLGWZ5Pad%2BmW9aK0U6NqYA7A%2BQ65EI83lYEAss3A%2Fsa%2B42vbIpQXbSjQ2ueXgC9BrDbyBYwWZaQiO02K3XCYu0Syb5rqHRCpLhB237Y3sNrjX4uHJgTvthcfHh9hNbvzYDBh2OC6SgkBabcm9Qs1SMgqvgJr7UoWwKQ&X-Amz-Signature=aa02c9f60aa347a638f7f9669c823b5e8e0de0007073f1f9f5a590bcf5ac8d68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6YO7M6P%2F20251208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251208T181420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDoymMhoJyw3Wjyd%2BjHyy9QdcmhZeuf71HaOU6cZZYb7AIhAOnx4DNF4H89ynKayOjq7oucOPoWIBJm9Qw4yV4OQW%2F%2FKogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwlUn3cFvl%2FMRw%2FgHEq3APYCTAzifvh3KaHZ3niknGCIDws%2Flg5Af9WXi3N%2FFxZ8NyBFCqbRoIpPtf%2FMWM0nY%2BFO4ygJ39ZL3mpWRM6yb%2FYr5A2CiNpl3FlxJDztHBtwX6POZModAUJBXbEaLLrT%2B27C%2BFrCnI6YKDB3qz%2FKWPgIAlTmcyJYcja11Us2MfHadQK%2B%2BhAR3ygXGcNPvOPXoSPKJuBRRurP9x1%2BjlZn1Trzy9h6bsmU%2B2E8C2hz2A6XozJVjCMxT0rxGobVO5t3XN8d1zZ5J6ef5ylrC9cNibXtD59V8qKE5aiaTF2Dj6u3smUtk9EmNABSpKu8GPkMWrH3Cv%2F89MAntula%2FmhNxxkWinQOs4R4g7ZgQumLYLPfKnPYBnvrEe9YP%2BJUkf31nl0DfDpfWVwTWH7S4o5wjbaDQ3D4tdYFPx0cjBDMd%2BoT%2FII2zWkRRjjN0%2B1L%2FU9as6efhLKSvLUvQ5Qa%2Fx%2FW5yAArFJsgw1gIpcgFVd9cY4cWG%2BVykgKMTELAHDRXxPNWSqKebu5PIRqoaPHraM9KM4MzxxiZ9KS6%2BX%2FmQuvVxONaf5tBersYztXm33x5%2FnyAt4HgCxWswcaN1RpeeSIlC8UPr0tlr%2FLKFDxL5xf0WrxGDaDcFcmy7aQiNAFTDlmdzJBjqkAdqQdSS6o5bryhSonKpJJwRfOCCdJO2kZ8wjRk3QyJarJ1vhRTxdyzNZR%2FLGWZ5Pad%2BmW9aK0U6NqYA7A%2BQ65EI83lYEAss3A%2Fsa%2B42vbIpQXbSjQ2ueXgC9BrDbyBYwWZaQiO02K3XCYu0Syb5rqHRCpLhB237Y3sNrjX4uHJgTvthcfHh9hNbvzYDBh2OC6SgkBabcm9Qs1SMgqvgJr7UoWwKQ&X-Amz-Signature=8dc1c8d2a07748cb13b2ae0816cdbdd568b773167a54883a5b5c7d82704d063f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUX5MWLW%2F20251208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251208T181411Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6tVfSEU0RUblMsbTS91q%2BE9z3g2%2FYvfLGWJj6Eg4FWwIhANzCZCJzozbjaTDx8P1oAXbayb%2BSjibjLEPbQnbnuYySKogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzQfVj2vSH3lok4R4gq3APtM3cM74Vxt2%2Fqiscfoxmewrm2SL0RFzNG3eWLZJ0QTjE7elJd1O%2BIe%2BVugEamV8EYMToOlLpuDeP9LPP9%2BEM0xZicSAUg1rY%2BGvqLUHRbK5nLxw6sgEgwnpY8Mo%2Bk0MwsOOUZukxHOFidHnUCsVBxxUzwkgX8xo2ixzZCVglQ1mI6EhtD%2FDRBf%2FaDQeTyhpFF9fODiTxjqQczcnzi8jHM6PRQsGqVGBxfkItMH%2FZpfPv4w85PCgkp%2FaOK7tc%2FiwBZAUUQcpDBFoY5ehOPBN7WX0hsbL2D6CLDsCCME6j0dHYH%2Fudvn4xM0lsXvfjwBGIddpMu2Ep%2BFygtG3b6A0qHmcf6Ai3%2BC767nEcOHobhNbq7KRbmAIi6x2zdVkdWY8P0zc0vKDy2U9BzKUrj15w7O0EHqYpeUPOVh5B6IYUfGcqxf3L98R5eoX5Xa2C1ljwMJn360o7w4M%2FS7y6JIziQ3tvaDTCE55zyaN5eThTlu4fPS4%2FujuX7P3sqXt24Mm76QiO%2FdJIy2OkZlPb1zpr%2F8roSzmI0RHRDOSeEimnbjoo%2BR%2Bm78BgFnKt4W7MpItJGqUIC1Tt5pJS6B%2FYDNQDHwisSsRBGE4vJdnpGcuFszR3bIoLW%2BrMKp%2Ft3cTD6mdzJBjqkAaJWCVsYk4%2FgbtX0jFOP9ANvScDq0sSxbHy7zPSkJuHeUpV5KVdVcpN0JGBUFGCh4retqiUSZUjztGPGqOWGG30WoyN1p7fldBXISpeY67BAB7R%2BBXnjw57UtwYp1ms%2FifFhJlwkCsY0AS3hFLe6mA5yKYVIhmTckx85eTZ5Y40ORi9w5SfdHf8zG%2FIpeEqmV0oXqV4BWJ50BLpFW%2B0tWwp3vgCf&X-Amz-Signature=abb64ec71ef95b75fbe7c1fbac785ebe42fb1c9af3159a75aa3e2ced7a1c0996&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUPWUGZU%2F20251208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251208T181423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBlMkwTx1k%2Bh2GYO8EK2EwcvuRP%2BJRpqKlJmat8m%2FLXtAiAQS8cBYQiLvkxDuFJ6u9y7TbGaeWK3CEyfQGZWinUzSiqIBAir%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSDOv%2BTwIarNC1D4CKtwDqdctBBmNoHaTvKehW9WlDheWINjNJwj4ZedEx5ILn4p20B2r5XnZytchcaAHAcvnqzWL4KJlfAuGLVK8yiqrS8OxyCfxvQHazFopEJtCwV9Qn%2B9PyouwRMg3rZz0jAA1xj5Gi6LaU72XxAYaA1dOxc9RSMZAHhcIOcZIhHJxpUP4XKkBQslop39m98GNuquS3wmu6kKSv5ZnHrHduQbu3lfgESqfDTx0N7bJBbSULcHjATY38u6oqkMTRq89zzgCe1lrAkCks0fUZJPkA3fuVpEMt7q2YXuan3aAfXJknEibRWnAaJv54jCGgBfojTxhX8xh%2BIMg9hX3UE5fo9SNX7QqsFIf7SB4wm84f9nc9RWnlY86s8rgaRADLbzG0yTSLbToDIo3OmjOtg4NHGuw%2BANuJkVkA%2F3%2BneLGSyo%2BPFOCuNPAQF0UWDC%2FuBGJHnElHhuXBQJzS15Xp08YOv7h33M6xYZ%2B0qfKi%2F8pcZLl%2Bkd5Ul1PuSlg33otdt4KF5temvgbo%2Bdw1AjaaDGJE81MoOZeSsQgz%2B5L7gUW2FIRVCW1PMele08wE%2FdClcNTZbEh1uhOWkN2auVGiz%2FvnYNbNIvdQgc4X917NQ8KzHAOTLK3M2bBAO4%2BCHiUzD8ws5ncyQY6pgGbImizjAVyAg8Tgd2KPwatn%2Bhkj2%2FFQbuX9HUITTiBnsvU25zd57SZtUkApdxT%2BHwbKsxNH4biY4r1PUlJLRJOvPbLfyN7EPW1WCb5ovBeUhn3b1hsawX0wQE8p9DvxFDLPw60YPAUsoQl5GTQwYLf5w9ADhCwyaHJ8l51YrUPfVqAayvgi%2Ffie22b%2BsoJYUqKLt0dXjuUOchtbuovVvEFUhJA7LGo&X-Amz-Signature=1bd926ee41a3176b40e35abf39c5f938cb1b024c00ca082539de0ab82e00334c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SUPWUGZU%2F20251208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251208T181423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBlMkwTx1k%2Bh2GYO8EK2EwcvuRP%2BJRpqKlJmat8m%2FLXtAiAQS8cBYQiLvkxDuFJ6u9y7TbGaeWK3CEyfQGZWinUzSiqIBAir%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSDOv%2BTwIarNC1D4CKtwDqdctBBmNoHaTvKehW9WlDheWINjNJwj4ZedEx5ILn4p20B2r5XnZytchcaAHAcvnqzWL4KJlfAuGLVK8yiqrS8OxyCfxvQHazFopEJtCwV9Qn%2B9PyouwRMg3rZz0jAA1xj5Gi6LaU72XxAYaA1dOxc9RSMZAHhcIOcZIhHJxpUP4XKkBQslop39m98GNuquS3wmu6kKSv5ZnHrHduQbu3lfgESqfDTx0N7bJBbSULcHjATY38u6oqkMTRq89zzgCe1lrAkCks0fUZJPkA3fuVpEMt7q2YXuan3aAfXJknEibRWnAaJv54jCGgBfojTxhX8xh%2BIMg9hX3UE5fo9SNX7QqsFIf7SB4wm84f9nc9RWnlY86s8rgaRADLbzG0yTSLbToDIo3OmjOtg4NHGuw%2BANuJkVkA%2F3%2BneLGSyo%2BPFOCuNPAQF0UWDC%2FuBGJHnElHhuXBQJzS15Xp08YOv7h33M6xYZ%2B0qfKi%2F8pcZLl%2Bkd5Ul1PuSlg33otdt4KF5temvgbo%2Bdw1AjaaDGJE81MoOZeSsQgz%2B5L7gUW2FIRVCW1PMele08wE%2FdClcNTZbEh1uhOWkN2auVGiz%2FvnYNbNIvdQgc4X917NQ8KzHAOTLK3M2bBAO4%2BCHiUzD8ws5ncyQY6pgGbImizjAVyAg8Tgd2KPwatn%2Bhkj2%2FFQbuX9HUITTiBnsvU25zd57SZtUkApdxT%2BHwbKsxNH4biY4r1PUlJLRJOvPbLfyN7EPW1WCb5ovBeUhn3b1hsawX0wQE8p9DvxFDLPw60YPAUsoQl5GTQwYLf5w9ADhCwyaHJ8l51YrUPfVqAayvgi%2Ffie22b%2BsoJYUqKLt0dXjuUOchtbuovVvEFUhJA7LGo&X-Amz-Signature=1bd926ee41a3176b40e35abf39c5f938cb1b024c00ca082539de0ab82e00334c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIAP5HB2%2F20251208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251208T181424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDlnHOJoZP9EDjCI8HDHxps1xam%2BK0%2BK72C%2FZ%2BzP4j4NgIhAMuGFMfTTwfY%2FGO9kJTiJhySjfu60dIgNaUPWLjmDbN8KogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwv0BLGqgasZDv6m1sq3AMc%2BAU%2FDW3k8uWfd8mCyYc08b95Y4GtBnsO8hyzNVjxYEq9eszOTbzyddTbGtw45fEdYBXZM18cHtRIOT7LeztjGR9TGQ%2BuCXc%2BBPJVfgSt5rheX%2F%2BM73hQOhV7YfEHqt9hto%2BlJgx4SU2%2B9X5kpUiEuO7P%2F9LlPlqy2CEraUnsqaFPyEZdz1JmyIJ79mmPuN%2BL7fskXHH6rISxdwWLzH0TGDJLDnfQaEruvKxFo4uQ%2BSh%2FnHz78QLaSGLUnA14QSOChkOLnRWbltZ9xHW5Bq9RwErV3mcOLvsv36dZleVXnlJeIW5ux1cMw6Tg2Yvc%2FOio4AT6oRRuzuB5O4AbiFIrCpRuiFaZpTamsfLr%2FjkecIn2oemHMyXy78dOHsSv39dyjE2vfMM4xAhy74U5yy3KtMtQn59CZsDuhrRA15hxUsenqhDaOsrP6PALL1bEorYfJL0lrfWkF97pXR4gGeyq3Fo9f3arfrFxsOMlXHsx69igCJN%2F7ZndyCt1dvH6LWq9sokHlXwWM1UT6%2BYGfj98yDMz1SYbLZLA2jTndE5VpJIkA2oSANIo9Ec3KNCfrN2J5p2ALZVfqlFHr0TRjA1EEwKW3NlyQqAVfdhiclhai82teao54ZX7lhZtnjDAmtzJBjqkAZcDFqUUkCkk73bJfffOqTIJQjl8dQjXg4lm5P4GXx6g7dwktLVYHpFrAFtYqOYsxKq6pPtX8B7sfdLcWAscxhsrzwjGxOML8gg3x0cI6IX5mVmNYBsDEGs09IB3eay3TPEN4yZDKPNuBZdY9dHxGU8hhevG37qB9nUl1SXf88As3MA3luMPVl8UWktHtMh%2BD2kLCnEAxmyQEJyCJ61ybXgAM%2Fos&X-Amz-Signature=0e195c71c8222996f6367ace3cb3ad535a88559c6e2dbfdeddf69c2d75f04db3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

