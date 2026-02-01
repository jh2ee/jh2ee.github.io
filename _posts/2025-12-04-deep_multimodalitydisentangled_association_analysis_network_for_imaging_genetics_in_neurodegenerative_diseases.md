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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VND6ECM6%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T161303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQC3Eu%2BUw%2F8TdQMYi3KbDkBJ8589qNUIa0vOnKRclTJg4QIhAJzwbnI2lrQl2sLyZRfNnwkriE46NCkKIV7%2B8cWhKFcjKogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxORDJ5dR%2Fffj%2BiKSIq3AOZTffXB4Q0r6lkayBdW42kPIysGKiTknqWjaQw3FeUkVUfQUu5ypCrML%2F6OB0VNpKmEuPP%2FSV5HGm8VfeOI2Ujlkc2JVamfEcmHvGZLVCD%2B3%2B%2FYsxmWm6wlPzsa4ggUu4wlze8yRwjptdJen7cp9%2FPEX4BVbvSOhhJyjyardkQFRdy9R46CmONeDFJLh%2FqUaW%2BUxIs0d91v7ird%2FRNB3CZ%2Be3KwNzSbhPOKRQk8ZObaAhAm1GpSvF56a6uLP2L5kLkjZKzHzAjxnzXlm4twXRVLyX9J2DRv7Zquf0du71HQ6a3RMHpAKKIM4HmCbSq%2BFjcOcsL8paDV5P2cXaH4yaIhYEYVwGHpjB8lveLc3DqR5atTHbX6sEkZ%2FmzAwbcm%2FP3DXNa3VX4Zs3jbCsNocfBPpS6SF4FZOHAi4q6zNY4C%2B0qh%2BhMh11o5%2Bn0wSwwNN5pjByJyft7eZYvVtF6drGJnXUsAip1dB2QxFYSSGI6OMhIhQuzRIlxrFXJbCHyHpPB34WAw4RLtAtbFX6BPfYvAmT3yXzj%2FQw3glut1jNHY6Sz9D4PMxijA7PJ22sc2LTta6uX%2BdXRtVuQAuSgwqJ%2FmKH6kKQIOpoHYSCYtnokcJLKyv06Ikn2686iNzCJ2PzLBjqkAWraef0kYtp1cVo0Y%2BzLvg%2FppAHgAn6vLRq5c22DzOVigYD4TZBKTHyu8CMUK0JB7MciMdN4O2CnSaDQ1O%2Bd01gzhgfyJKupTOFhMC3byBu1a311DsZrmQLPr3B%2BGX%2BTnEDhugGQVgKquzs%2BIsDSSpC2Xi%2BgYiZf0aIekmOhfZXTR6D4z3reQ5PWrukGN6cAfbDwughFtzQGCxs2YEOL%2FzwypyBG&X-Amz-Signature=fcc4ce6d49eba4303fb4fa4176c1cb48ac592759d49a2a9cd07cbf65a7d2f1c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VND6ECM6%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T161303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQC3Eu%2BUw%2F8TdQMYi3KbDkBJ8589qNUIa0vOnKRclTJg4QIhAJzwbnI2lrQl2sLyZRfNnwkriE46NCkKIV7%2B8cWhKFcjKogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxORDJ5dR%2Fffj%2BiKSIq3AOZTffXB4Q0r6lkayBdW42kPIysGKiTknqWjaQw3FeUkVUfQUu5ypCrML%2F6OB0VNpKmEuPP%2FSV5HGm8VfeOI2Ujlkc2JVamfEcmHvGZLVCD%2B3%2B%2FYsxmWm6wlPzsa4ggUu4wlze8yRwjptdJen7cp9%2FPEX4BVbvSOhhJyjyardkQFRdy9R46CmONeDFJLh%2FqUaW%2BUxIs0d91v7ird%2FRNB3CZ%2Be3KwNzSbhPOKRQk8ZObaAhAm1GpSvF56a6uLP2L5kLkjZKzHzAjxnzXlm4twXRVLyX9J2DRv7Zquf0du71HQ6a3RMHpAKKIM4HmCbSq%2BFjcOcsL8paDV5P2cXaH4yaIhYEYVwGHpjB8lveLc3DqR5atTHbX6sEkZ%2FmzAwbcm%2FP3DXNa3VX4Zs3jbCsNocfBPpS6SF4FZOHAi4q6zNY4C%2B0qh%2BhMh11o5%2Bn0wSwwNN5pjByJyft7eZYvVtF6drGJnXUsAip1dB2QxFYSSGI6OMhIhQuzRIlxrFXJbCHyHpPB34WAw4RLtAtbFX6BPfYvAmT3yXzj%2FQw3glut1jNHY6Sz9D4PMxijA7PJ22sc2LTta6uX%2BdXRtVuQAuSgwqJ%2FmKH6kKQIOpoHYSCYtnokcJLKyv06Ikn2686iNzCJ2PzLBjqkAWraef0kYtp1cVo0Y%2BzLvg%2FppAHgAn6vLRq5c22DzOVigYD4TZBKTHyu8CMUK0JB7MciMdN4O2CnSaDQ1O%2Bd01gzhgfyJKupTOFhMC3byBu1a311DsZrmQLPr3B%2BGX%2BTnEDhugGQVgKquzs%2BIsDSSpC2Xi%2BgYiZf0aIekmOhfZXTR6D4z3reQ5PWrukGN6cAfbDwughFtzQGCxs2YEOL%2FzwypyBG&X-Amz-Signature=fcc4ce6d49eba4303fb4fa4176c1cb48ac592759d49a2a9cd07cbf65a7d2f1c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QW7JLM6G%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T161303Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIGvck3T3WHVK6BYjuHm7aV9NFh8hb3oEFGLBI7GCYIjRAiEAyOnz%2BOrZJ078L%2FxawYViOsXs1NiI8Ay2z60ZVccVXTQqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOuGmEpfNIKMxoaKJCrcA7kAi4Aas751kqRBXFoRFhkHTB96J2pJTNiJZe%2FeayhpRMP82obHx74%2FSht3pIPr6lXw7BzHM9PdfQwhdVE0vOek3t2P%2B7B37FJ7Fn6W94qxKTfSvpLxA4GyYg2zJENE19deNDMpeaZMIydP4G63BJc5D7brGXNTsrGd25KFyB%2B5ePr5BRLm8J32BM1LTmR54hZPGywIcFdvoAzXLxCC6MZITvirmXswUxwmI5smzD9NTyhyG6vKU6JDACvmoOv3UTQadc4tLiE7eJLxFegzGeK7XIgyPnt0ybCE7K6BIasboVY3Jt38a2tewP%2F7B6clMzd1LSJoin9EoF95b0u2WqKh63gcRFIv9juE3nIzc97U2cxF8jbdoIzXhZxwld%2F%2FW5lIsVu4qcOeepRPCbLRLE9RlYtu2iOKBCdje4m2PWnZEMQ1oPkpAAUlNXsm414m%2BMxuqhTziWzfdoZ2Xzngo0tE3X0fDxVTxZnruxgJya7riK%2B53d4ZS%2F4hnGl9%2Fcwp6oNgjTuRVQNoYlSIwyHEY7VLs9izCzqolf6kR%2B2N77hEDCxF5axBCGonogi50%2BDTcfWJyKZMQ8RdttnwzzBKZhK71UQdiH1kpfZc0xbVrZrzskPluwgd%2B5oc6JCfMKDY%2FMsGOqUBr1iwC3QpFEsjPLXecEzL9h8bTbEuwwewUBfKBy8XiPhJLzbTlVMvhtgyBJdNEuOJmyqpqot%2FiA85wBPOSuFxMzp%2BS5uy3MZoRq%2FhG2cicDvWKOvYXZptnItc7uqlSaQO7Zu9H%2FM4eBvoJ6GUNPBaSuxnreBpKLd7EeTVLYoYa7d%2F5Y3FloP8jKcbv0d15IHPN%2FkcUdcjquMdwaKS94ZUpm1dYsMj&X-Amz-Signature=6433096ab64a0c9e9442268008b1db87248bb875856064ab2d460ffe4d75a37f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YV5D5LBT%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T161306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIEyPVwjqDiJfaHZsMMlUNv3qE%2F6UxxRyOm7QXpxuO15gAiEA0pSU3KFZrFg5V5IG2RRPs6P7fUzzhy0ZdjuuGeCeXvEqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ7zy5ztj9hmJiMHWCrcA6Q87og%2BgMRd7tpgXH4CvCC7zMK66hZRKyGmbodyLUJV9EBUpj5u07jPtsCkqxSvz%2FSUESDCQ5gXoXK%2BwUE1AfaE6o4hzZfhXzK7Napp892gteSqKYR0K2FiSZnHXqP2yJXWBYbcWJXTFxidem0vV%2BNGklmErGwHiAkfk4DdHuhYjHtCHVtA51RSFQ0udEv8VtOYz%2FC%2BpnUY39mYQxr7b%2BgpsmTuNC9N613pip0zrepttfaS37uVKgiDT0Qge3xK24A1kt9U3xmkZQmr0etciiMG%2FkkL08Rd2sNu33B6k3owCx%2BnIXSLDJMvtAv02%2Fxc1otC6HwgB51GO3cBcsQvZBPl%2FiK%2FxDTFBHg8rmWTVOPvbZGRp9rvQl%2FHs1b5xoq4i6uVsRe7Z7U%2BuyaSM9AZMnej5sxXw9L7yY4j1up87q4NnIijP4gXaz6BoyvHxX0HJuqpLTNPtASumxkffw%2By5Ns1uf5TcyCybB3PjTX%2FoDUyCX6NMbm6N6xjnTJIEsjJyM3HKmVxreAL4QQmsx77YwaV81tru03ZDVB27dDuPSiFWQwTUn0tYBx%2Fiqc6GALeaYk09RllC3EizRxR42csHieO7GAEk0RDV1JZXNyokQFPkMBqep1OTCVbk6XQMNbY%2FMsGOqUBPEAjAMGTzX4vopuNYqpyAdntIazgEYqbDiw0Nll6gdtmeUvosEL%2FkwXzY8LnYH%2FfWkytX9I7K7AJume0Lw%2BFOJaa52sjAn4wR%2Foaqrh1KFRHjOifbtod8K0twQozTGEeVz6gozbQq8blgYUeQYK2KHfvc44%2FiGM5lH%2FFGvQD1UT6dwAa%2FNrWVtrcc60gy78bepPq%2Bgq5VcKfhBitCedRQ3wcq1QO&X-Amz-Signature=e0f6e2e228a844735af8872a86991355a4c80294fe9c90fb2111a757243f2c9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YV5D5LBT%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T161306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIEyPVwjqDiJfaHZsMMlUNv3qE%2F6UxxRyOm7QXpxuO15gAiEA0pSU3KFZrFg5V5IG2RRPs6P7fUzzhy0ZdjuuGeCeXvEqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ7zy5ztj9hmJiMHWCrcA6Q87og%2BgMRd7tpgXH4CvCC7zMK66hZRKyGmbodyLUJV9EBUpj5u07jPtsCkqxSvz%2FSUESDCQ5gXoXK%2BwUE1AfaE6o4hzZfhXzK7Napp892gteSqKYR0K2FiSZnHXqP2yJXWBYbcWJXTFxidem0vV%2BNGklmErGwHiAkfk4DdHuhYjHtCHVtA51RSFQ0udEv8VtOYz%2FC%2BpnUY39mYQxr7b%2BgpsmTuNC9N613pip0zrepttfaS37uVKgiDT0Qge3xK24A1kt9U3xmkZQmr0etciiMG%2FkkL08Rd2sNu33B6k3owCx%2BnIXSLDJMvtAv02%2Fxc1otC6HwgB51GO3cBcsQvZBPl%2FiK%2FxDTFBHg8rmWTVOPvbZGRp9rvQl%2FHs1b5xoq4i6uVsRe7Z7U%2BuyaSM9AZMnej5sxXw9L7yY4j1up87q4NnIijP4gXaz6BoyvHxX0HJuqpLTNPtASumxkffw%2By5Ns1uf5TcyCybB3PjTX%2FoDUyCX6NMbm6N6xjnTJIEsjJyM3HKmVxreAL4QQmsx77YwaV81tru03ZDVB27dDuPSiFWQwTUn0tYBx%2Fiqc6GALeaYk09RllC3EizRxR42csHieO7GAEk0RDV1JZXNyokQFPkMBqep1OTCVbk6XQMNbY%2FMsGOqUBPEAjAMGTzX4vopuNYqpyAdntIazgEYqbDiw0Nll6gdtmeUvosEL%2FkwXzY8LnYH%2FfWkytX9I7K7AJume0Lw%2BFOJaa52sjAn4wR%2Foaqrh1KFRHjOifbtod8K0twQozTGEeVz6gozbQq8blgYUeQYK2KHfvc44%2FiGM5lH%2FFGvQD1UT6dwAa%2FNrWVtrcc60gy78bepPq%2Bgq5VcKfhBitCedRQ3wcq1QO&X-Amz-Signature=aa5459f603d888ea794a9ec9cb57e441b43e581ee90e95b39c406069c232d467&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKDP24H3%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T161306Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQC24dabUNkOiQSl9w0rpFcCcF0Tu1t4WwVfDMimdux0PQIgIcqWCNpkU%2Bdjo4pLcaI72wnT6e024W%2BNnmWJSjlPKe8qiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP%2FLFiFaz5axHDNOESrcA8u0xJ8V3wpaNZKhkfFQ7%2F7ukA0uJKrcualUloU7OMoRukm%2By50L1VSuANcGT2l6yaWFjb2QWEajQUkX2dztXL2D2ZeoOMPNMLVEDDa6r4Vdc06GAf1ajRYEcaylpRpg%2BM1Z6jF2lrC%2BeLfPD5ACq1hTcZcW%2FWa%2BIe%2FvUqqAph1cG1iDTPVHno%2BbUzbuEzhawH77WYFxoyHvhRXMNTEKF4Z%2BEdp2FHeE71zdVCCGqowfTQvKYK3SZk8g1B0dSMenyfZ2WwFLX0914i3nv55pgpl3obldunaytpB0xqe%2BgRwxm4zm99z%2BKaw2m35KfMn6UveTICfjlgepDTMeF93pUSKZ%2BJ7JQwy7fzXK73%2BF2%2FibIIffha6Eb23aXMgR2gPF%2FA2k0wK0R3AfpzUrLohVvQmevdaaKYlKAg4aDX0RzG9TFSIAVpZQb6xbXALaAnYnPpr7N5%2BGM7ETDVSsiKL6hWtN8LtLZXK%2B1kY3OlnEn1FZaXzM4qm9ODWB7vMq87NFGsae8AupNxAHD27m8cxABVzPEgTDdzHOUHQY5Ic7Os4glQ5x65DiVk%2B%2FYyEeJExizfl2VHIT8OcfyUutMF5x2sckjbbjTsmBZxiNkKI7sgmtD5dFevyuJGXFUFZkMIjY%2FMsGOqUBGrtSYtYm9FYfhMHb0S144SeQ6xxF65h2viVRj4vCrlNAktguqejg2GuAiuv%2FePdtbTMu4HLwBrbGDS43G1qm%2FGU%2FqUzib6VkFl9fwZYqGeMDMsO79o4ZM608%2FLMd0NatX2TEVElq1c5K0K3bBbocUNXwZe9IEcrlYC21TafP40FQs%2FlXA6yLOJhM7YDwqc7UuOhvdDm9jH7qJQPE9zS6aUMFpOP2&X-Amz-Signature=4a7712c7132d6b52256619ae25d4a0209503d939826100ef37624738ebbdd13f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDHK3GC6%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T161307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJGMEQCIGQBHfbuM1e5xDjcOMtWNnLz%2FmRh6KLjoCf2z7CioJcSAiBraZZ6LzJvS6hZfHjFQYT93KAYpRRax4sCjQqnBbg3uyqIBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqVKOlXJYpCKgMliXKtwDpViprCUsFgG9QP4lp7CHkoZmhj3%2FdkpRDedd%2FFSCfd%2F%2FnmYQXvXEi0R8tzPbEH80GNRiyQU2BzL2w8kfYfN0qDbfGDTSDE%2F%2BHMj0489oT6AZGAL0nig%2FjR%2FgRZRYQKtZDDhzpZAb6Q6HeSr0BMqfyJyg0QT23p1GQdogkFT%2BDKB9U%2F8n9iJ3VqyQo2lEO3DkVTy%2Flny3p7vUGEdXZnG13qYkAzdfsDTuIpACgh1YAfSS%2BSDy7AY8jezIoxcOjFXhCA0LJa63bd%2FsWUqF3jrF%2FOd3cEQV6fIu50MJ7iU338r9BADnxU1RNlKFF%2Fi76oBRJgL14s8Mdv8wu67b6sAh362dasGw6r61TlK6NcyK%2BWbSTzGGErsTwTK4X13TUoxZpM%2BVt%2Fv4qUyPN%2Fi5GXcXTdUbhndNuFvMN3sD%2FeNHrzTH6kb54MGk1nborv5xGu4mpz2AodCVA%2B2tTqNdDgjpfZ9KOuhpAXNeH%2FuprKYWm259Ybcocojp7XdhJgvWr6wSsznUZnJgEzlOyFVQYJqMHcbl%2FOus0WivKZBPcP3HmbjXV2Bqf9dCLnCPGhfuJcO%2BIv4SNSqivuPHoslmzw2dAa99cIb4cXXB3DI6bDLZrpc0sy%2BHWWrVVxkY9%2Fkwydj8ywY6pgHC7fD0IjWtwu653kFiKpI2LBDha3XQvCUbQJ%2B%2FR3XD0VvAN%2BXyM7w29c%2BFxIRQ7TbQrENAEm9DLs3s7eF5EcrIMyMPWWfEHPPvwP3U2LkX3OOL20Y7l1MHH1lxV5sxlStlH6SL1pdqsBld7lFlXPYAB5FRSS3pXPIPisTiS7hHSzFAe8ZPePO9%2FY9hAMZb6Mojs4VFIbOQMourbX%2FTXz7zwMzOMhf7&X-Amz-Signature=7eab8a437a094067c4b56d7bd336e145d1b421f3de1ad96352d914fa2c5b9725&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666V2WPXUR%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T161308Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQDKssdxNJplEVKNjOtvX1bdT%2BqCUl0I%2F1RuyzqNIlOHVwIgVQwfv9FcXsVcscRXIEfwsVZ%2FLFB3KGXRsdSjNDM5c%2BAqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGrZL0XZBjpxk2XHXircA7lkr%2F1NoeQE5Q9FSnct7bu60cra42hwRWJ%2B5Hu2DQPPC%2BtJcSr6NPcxVVyFbLZBqprWEge5EZNjHr%2Btf13nczg39Q1fVxgIPU0MRxZG%2B6ozlALTzYZq5W9wYDniffyCwzf8F6qBn404pra3k4U43%2BxYv%2F30I3Hb3k3KTW%2FrN6en%2BpGKPZh4K9tDSXrlIM0Rawy%2BYpTjCIyyhFvXIifD0uZGmvd0uHJP7OycsoIAWYz03nulWzs0HXLM8qFxqeCVzcLPV%2BYIYPBho1iLNRV8FKFhVr16xh2G8Vaol8L1O5TBBjbxAVaKfp5q8YQPeQeZ%2FNq4KwNtvRT7E42ZPRteNYnN0vhxJuyit8QOT%2BuCT0AFCeYSQn8qzZbJOpQmgYDR8mgcUCzJICsuFjHDt0KP33uPOOS%2BRXjphQMCFWo%2FSO2SBNlsQhuwWvD%2F1PXoQPiXT4KoPzXLSyI6CSZQs5PoiRwUGet%2BlBGKshz0wRclZRo7N%2B5KwpG77lD6Ffxw3ODYrVqiionO%2BPAHiGOeOY%2FWP5psdCzX4bhoPo96ipWARbFgSfmEp3I%2FeLMYuMLs9qYpzjm8kQctUOPupN54csSwO15nmYIEXA4lxinX56Rq5L52D2EPxX9yRgVx4DcLMMDY%2FMsGOqUBzZEoebxpNuOBtlfhtfcRWttP7hyaxpqxVIkdsorUuWYzE6dN9WHCbnSip4SQZ93HY9PVs%2FxrK2cv1BUl%2BRvTL89P%2FajWlgM52wdyNGXJEa5Qj9kuuS47HdC6JckF12kOC7e%2F%2Bas6rKhHnH2tDJ28wRsl2P3jd8ij39V6ps%2FE%2B4gCXpcFAUqnqL3dD%2Bo7zQPN8HiPExhjNH7SxHGIyczW2QVaTNdr&X-Amz-Signature=887b8e1d2f571ad2adadf1116fff85adeae4750767174abd58613570cf9fa81f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5KIQ4BW%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T161309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIAnjTNzt%2FfSdHD93kuG3Clv%2BQmPMxH9ARN0O2RiHgHvlAiEAgSQ6w%2F75Xnpc8sTZTsOzbAaWeqNVWEPZSJSPbE9%2FQbQqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCavUOJ0kRFc0nIMjCrcA6ZtpCI7%2BeMC0kVEmbrECxz%2BXWydy49uwZDTe3IKf%2FdWMQTdPaA4d3f4fhV4xnuVELq7w5EwzwwN3zMmZ4MFVbXF%2Fkwlftd%2F2MFHbrN%2Fie1uRLeMS327gwRWfjLELyPEfl5UOlCe2bhpoWmXqmTj4oGk02air1JGh%2FSNhHkEROsy5Tb3ZH5t48RP1HdCjAqRSxbGsmt2VeaG0vgXE5Bftmhlzoh4g3dLLzcKapyQr0uvExQ5LioYondT7SLi0eQZ%2FVUz3v0cZE2Z%2BBl1QIwpq0tYt84ny5PzU2%2Bbdpc%2BWqA1wa7nFnwasFCVobf8apa7fh5EXtinvwVxMgD0%2B8%2Fmv7origQIag2VYkeOR6tuKmPPX4iF6ZAj4k%2FJ2Lg%2BY07VqWOjlArZUp8aQ4%2BbqNv7OgOYb%2Bmx3cLyEg4OKoL4LOJ%2Ba8iAppSjlmFNsVua3atmEmSO9t2EC8PU1pbpTuykzXbFsZ%2Bk50lqbJFZtPnEVdZbZJZ8WPZvrc0zr6oZfsuGHxZWkEkKVbBYykE1oSlcyTd7tgvsQ7CyxC3vjkC54TjMXvHCasKLlDnp5e9m8IF8byq%2Fp2sa0HtTWSe%2Fz2OdEdD2ajm3lXEyPc7RnijOTNFC8DdSk7xZGomsv0ljMOLY%2FMsGOqUBNauxrg2VVrpCOwPS1Jr2laSGJxAbOLsH9wWaeyT%2F4qXwIsA6xRniqt%2FUUJeaRULMXVk3JNNIk2Bd%2BZKNOOLbnBp%2BmQYVB2JtcYQ29fM4N16Vy5oQ4DX%2F7TEEXWf1ERbh6Jl0tasXf60lZOkJmHIaqxnE1hALZSpBtTnONIJN8iOL%2BdGGiP95nT%2FLOoCiYOWT%2FeBDISmHhTi7PnHgy75JdUAvS0Kn&X-Amz-Signature=b0c400fce9bd7c07e50d5da8b845d8e634aefdb6870da840cd13d015b8a8a0fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5KIQ4BW%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T161309Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIAnjTNzt%2FfSdHD93kuG3Clv%2BQmPMxH9ARN0O2RiHgHvlAiEAgSQ6w%2F75Xnpc8sTZTsOzbAaWeqNVWEPZSJSPbE9%2FQbQqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCavUOJ0kRFc0nIMjCrcA6ZtpCI7%2BeMC0kVEmbrECxz%2BXWydy49uwZDTe3IKf%2FdWMQTdPaA4d3f4fhV4xnuVELq7w5EwzwwN3zMmZ4MFVbXF%2Fkwlftd%2F2MFHbrN%2Fie1uRLeMS327gwRWfjLELyPEfl5UOlCe2bhpoWmXqmTj4oGk02air1JGh%2FSNhHkEROsy5Tb3ZH5t48RP1HdCjAqRSxbGsmt2VeaG0vgXE5Bftmhlzoh4g3dLLzcKapyQr0uvExQ5LioYondT7SLi0eQZ%2FVUz3v0cZE2Z%2BBl1QIwpq0tYt84ny5PzU2%2Bbdpc%2BWqA1wa7nFnwasFCVobf8apa7fh5EXtinvwVxMgD0%2B8%2Fmv7origQIag2VYkeOR6tuKmPPX4iF6ZAj4k%2FJ2Lg%2BY07VqWOjlArZUp8aQ4%2BbqNv7OgOYb%2Bmx3cLyEg4OKoL4LOJ%2Ba8iAppSjlmFNsVua3atmEmSO9t2EC8PU1pbpTuykzXbFsZ%2Bk50lqbJFZtPnEVdZbZJZ8WPZvrc0zr6oZfsuGHxZWkEkKVbBYykE1oSlcyTd7tgvsQ7CyxC3vjkC54TjMXvHCasKLlDnp5e9m8IF8byq%2Fp2sa0HtTWSe%2Fz2OdEdD2ajm3lXEyPc7RnijOTNFC8DdSk7xZGomsv0ljMOLY%2FMsGOqUBNauxrg2VVrpCOwPS1Jr2laSGJxAbOLsH9wWaeyT%2F4qXwIsA6xRniqt%2FUUJeaRULMXVk3JNNIk2Bd%2BZKNOOLbnBp%2BmQYVB2JtcYQ29fM4N16Vy5oQ4DX%2F7TEEXWf1ERbh6Jl0tasXf60lZOkJmHIaqxnE1hALZSpBtTnONIJN8iOL%2BdGGiP95nT%2FLOoCiYOWT%2FeBDISmHhTi7PnHgy75JdUAvS0Kn&X-Amz-Signature=d956489ba0b2604c3b08a261860c78f573a7b8f2422e6663e3dd5649c58c4a0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZSWVHXQ%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T161301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQCD2lqg6LCWdlexw8uWG34McPYHwaaYzQTeJn8M00sbggIhAP07t7gyh21gLdH293pfLHxalrzZTEOUS2RGRbkssEqSKogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxHHt9pU%2Fe2P1um2eAq3AMe5BDMT6a7SjwERBNBF%2BqI2gvGE6Edmt5wW6HvQ%2FvHMZ%2BTEZ%2BM%2FeAQKRpxv4m2%2BLnyAvS03eLxMVOwLx6ZeYOfJHI9Pn9kEwrxu463WKBjdaSTaVbiS8VeyUxLfQZ%2FkJLbRyC4iQrexCTkDnU8uQOa5CTRw9O%2Fo2KNSNRIiCVh044457DU2QWUtUV9QV1GC5C48bbJWIW3lDvmynjzVfMxWpmxsLRdkRKk%2BESLfJHnFtJvAiAJr0MdDyAR%2FVjfejLJ3GMfEHfp7YhHfEHjYn5G8FTWtlEIrWOjPFJUaIzNzB8ATZcRjaWCYgS%2BMt8l6sUEa5rGFKQW0WE0Wxj2XVrIuMYgUJEyyCK4be0%2BfzWrxiyhv5TpQBve0TKeMi9cAQipeosgh7W6ibpNZsB%2F5YkRAhIgjoGj4%2FT7aSLezM3mShmpMmVhDZRm8rNXJLHGfRHou3vJccZwLplxlgDfbgihGnTwbPKtmLWrvZK%2BQ1LrfUSqMYkhJWQwZ0C5MQJVXLohGKkcP96Evzcj6UYLXKGrxGHA6Hy97IXURhn8%2BFDqomBiQSROPci6eo%2FnBspuNCqBZdhL%2FxSTzsZCWHn1m7JNA6bYQJAh9H1UFk7L0G2Qud3oOGf%2BTLeOafHsdjCk2PzLBjqkAZv9HVRG%2BHCpWH8E3hxLfGGGYvh3JNcSEAaO9sMh4SManLdYCOxM7lxi57rd2KKeVZmjZgJc3a3WPv%2FlZeP8fulENLaBRQArVpJT193wBFtp%2BqGqoAeR%2BadZ5kv30jVCUmhezkHeegHRHLxYOjn2KYqJEFOsbjt9w%2FPVdB9O%2FuuqTN3yult0eEfsXbYR9LB2aXaZK8Re6xUikCvkLTyaBs7eoIaZ&X-Amz-Signature=03ebd62b4d24d6ac2cc7842ade5ff46fde5c75e0d94ac50aa771fc05770e8790&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KFPVX75%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T161310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQDGU7f2HzU2VOitfiWbEep906zBN659XtxKl9MWEFh3aAIgTkc3viNpJSR37UkAELNqsolgj%2B1ujWHr6%2FzBlS94D9cqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGGdaw0fYKAdNxWA9yrcAxIqV9SDSiQ6qmThLvkmm4BYUacGNR9KCsK7mprHBh7OPBVoQqh9O6%2FB91dmX1QdYmQ1AtfgAdC96%2BEKElBz1eEUUxBLHZT%2FHdnkxOpEGZvffZm6RHArA5l2CHfiY5j%2FyILzQuyORZoeVOxhG2U0nRZz2jPaYBjykgH8k5rKm8vRt1bRKILlNYCKDCPpdrwAa4VxswgXOHPsNrvbCaLCwejkpnJFKLcUYpeDEtomvnmoi9DfgGhq23SUEfBHyB%2FQX%2BZ%2BIfzXilJd4yFvQxUL%2BObnW%2FtC1HIu4Se7v85jF0XJvYbCS2gG2kYHUL2MU1blsacEtm2%2FKFQWpY8uMz3Ob5Das6kaKfOj3S9tZGBZb7IDlRvg4bqX7OdPQGBuwk0rJYjNonM%2B%2Bov3hkLil7ZFhBHnnIQkqaUzRva0J4GVkSRohO%2BreevuA1Opa%2FpOH84Q2OAfSakzN%2BGubMyOiQaOpfSlOo4qVznGJuVRaLcumEvz8z757EmSOGZkVZQioHDP72ttQbrJLqApOPkY%2BaZghCD4t6A7hV8olYKYVyDXZiCI%2ByGnW1miBra3cT%2Bkm3TloZKNrE7jdnqqJKbPPdqD1ctq4E4sIVy5a2OAmEOvBlz2HApDUnvKkLRfLAslMMDY%2FMsGOqUB35i1vRZwbcvIm1kXz%2FtJxGoESrnRGB4fzMKaEH9uSmDZTBmN%2BKUeXIUCF4UW87rl%2BCfdP2s0ig3kJzOe66ShstlU1e66OsEJYkkJsOS%2FU%2FiOJzEEfOWw4og3MwuBvU5rAroMWGgBhjDvIE7CqdKc0rd1teEchQDJU8gBY4Ge9Xqb6S9OmJexWhKx0Ki9owBs1vgc3YhuqEw2zJIsgMsuJhZETZ91&X-Amz-Signature=dbcb7d22f382b7623d9027514cefeb810f3e5b4d5f7d67885ff855bbc6c19f00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KFPVX75%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T161310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIQDGU7f2HzU2VOitfiWbEep906zBN659XtxKl9MWEFh3aAIgTkc3viNpJSR37UkAELNqsolgj%2B1ujWHr6%2FzBlS94D9cqiAQIzP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGGdaw0fYKAdNxWA9yrcAxIqV9SDSiQ6qmThLvkmm4BYUacGNR9KCsK7mprHBh7OPBVoQqh9O6%2FB91dmX1QdYmQ1AtfgAdC96%2BEKElBz1eEUUxBLHZT%2FHdnkxOpEGZvffZm6RHArA5l2CHfiY5j%2FyILzQuyORZoeVOxhG2U0nRZz2jPaYBjykgH8k5rKm8vRt1bRKILlNYCKDCPpdrwAa4VxswgXOHPsNrvbCaLCwejkpnJFKLcUYpeDEtomvnmoi9DfgGhq23SUEfBHyB%2FQX%2BZ%2BIfzXilJd4yFvQxUL%2BObnW%2FtC1HIu4Se7v85jF0XJvYbCS2gG2kYHUL2MU1blsacEtm2%2FKFQWpY8uMz3Ob5Das6kaKfOj3S9tZGBZb7IDlRvg4bqX7OdPQGBuwk0rJYjNonM%2B%2Bov3hkLil7ZFhBHnnIQkqaUzRva0J4GVkSRohO%2BreevuA1Opa%2FpOH84Q2OAfSakzN%2BGubMyOiQaOpfSlOo4qVznGJuVRaLcumEvz8z757EmSOGZkVZQioHDP72ttQbrJLqApOPkY%2BaZghCD4t6A7hV8olYKYVyDXZiCI%2ByGnW1miBra3cT%2Bkm3TloZKNrE7jdnqqJKbPPdqD1ctq4E4sIVy5a2OAmEOvBlz2HApDUnvKkLRfLAslMMDY%2FMsGOqUB35i1vRZwbcvIm1kXz%2FtJxGoESrnRGB4fzMKaEH9uSmDZTBmN%2BKUeXIUCF4UW87rl%2BCfdP2s0ig3kJzOe66ShstlU1e66OsEJYkkJsOS%2FU%2FiOJzEEfOWw4og3MwuBvU5rAroMWGgBhjDvIE7CqdKc0rd1teEchQDJU8gBY4Ge9Xqb6S9OmJexWhKx0Ki9owBs1vgc3YhuqEw2zJIsgMsuJhZETZ91&X-Amz-Signature=dbcb7d22f382b7623d9027514cefeb810f3e5b4d5f7d67885ff855bbc6c19f00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SKWDKQJM%2F20260201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260201T161310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJIMEYCIQD6M9%2FUHmrt5sOe%2FrMT9z5GT9z%2BNjSpKqBbOXIOD%2FELvQIhAP920j03nRqkAYmfEUYhTRpDH71%2F2YBdGfeh7TIr7i7EKogECMz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxH8Prld8F%2Bf6j%2Fe4Eq3APvYO9FFZz47UCseXE0dz%2BikqO9R3upDPo9%2BK4DFRN0OxwOpd6kmMUfaEKjg0rkcNHd%2BCbZSq2Clyu1cSU8oKGPCdXhvt3HXkGSTFNOZHTlzSVFhL3Tfl9RcHGeU78T041rTT%2BMPuu7yXqTscAWSq5TAXbkZlQDfZqjtpCCQlL9e%2BXLhtrvkE7UiBor1UZcOsMYKuqKGrjG1MDoXoLifJ%2FKj56ww7DTS%2BDiUu%2Fb%2BMo1%2FfJxImMSLW3TIit9ui2dhmjPg5fTwgRsqPxodjHu9Xx%2ByWxPgbWHjmmmVKwMcOLtlXbFany3id7%2B1zZbBY5%2BwpJBAgCZ2WG2ZXWcDilzyGFe9CjOVJ7emxBLhbuWkYldK5559t%2FG9mxy6vsVjgc5uG5qvcHhQXh6kPscS3lOjJWwf%2FhDvC4KPO6k4V48sPEgnWL9y5%2FSwhy752q85%2BEBHNuwi3wqsZSYVQUwIJUKHIPdA6Mwu3MX%2FPS3vkmBZlwiANjY9UFIgtLuC%2BO8J9zLPM3O4L5HdYKaF5e9nMfh%2F33lMDW%2BYiLWdYHg0v%2BSzXgJ8heeym7%2BzaI6nGuQUjyPtXlDZ8bNiiKDhmjW8zn885Wt9WoMitgkeuEX23SgiHZXB6agDdVOtDHO7kf47TC%2B2PzLBjqkAXwWw7KaKNaGFKgZxV3IYfG9HGznVR2%2BDTtiRjZiWW%2FG8H%2B%2Fjss5R56Gg%2BEFvDOfgn2FwNALEj2B1%2BQdQ7M%2Fx9CETTD4IucjeeHhD2%2FhirKpht97zvgvYQN2eQlAIcxOK2eEj3srTwFfKBhLE8htGAYgnZJUwrVMbJigTkpickTaDGhcuCMLvS4WgSyARCPYkbmh8ur7z73O2gLeArrCx3IUecHO&X-Amz-Signature=6ffb3efd4899e187db5da7fedd51d40011d0a9ecec7a06104eeda172976d1aae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

