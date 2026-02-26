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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHJ5HZ45%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T032610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQDnURaOloRe7%2FNqE5tzkYD3afiGebLtucvHqf%2FKZzX8AAIgCiSzt80F%2BiNH9ukFThEZNsMHIJCDCnjk9VmYpYJ%2BkCMq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDLbGBdjDZipZ17a2ySrcA%2FgPv4g9tKsR1Dk7Y%2FGwHmk5t0Shi%2FRfA0%2BgTdxBouiFz8uLc9gM%2FSNks4%2FJxJi0rSE%2BFDdpk6cbrcCwW7zkmBked%2BBfKK6qBWGo85pLM4BoA701XveKnGnvL7rYEV1GK2x3cs26ud853z3yg1sbqH%2F64z5j6U2%2BcQNAxyIHiMB41gE2MFTjXxzorwQSEd9zriVQit6kSsHkC%2FR%2Fc80EmnBZntiYqmqTSW1w1FED3Z1qdBTOL9FBctJVARyyqvjkGvSkPUMfsV0xm4w%2FpWwXYj3giLBradhHe1AZaU792Jahlc39deRfiXQVJ9XzoCx4qyWEsdWSqmP8%2FeLeWVH%2FJ9JYtlv6ip1vZUOa%2FA%2F0C%2BbJaEDgMwsYOStZV30rsvIo5s%2F8nW0RgAq7itQSILfG91H0Gfiuh3Qtb0M64TapqxIMxD4k%2FyIxSQ9bZCsMlcrbd4hJakb%2FUyhStWCNpiu9b6F2ywjObZijRPOiYbB3CmvwNm8Vt9e9w0DaI0lyO%2BrUnKb6TugWS4uX7mhBQMTCSrlRXS6%2FdN%2F5Yn5WBYfS9SB8clBxgHxWjva2If0xwNg1l1%2FL%2FW2AP0dz1rVJXjoRarKU6ji3v%2BLq6XxEacbDz8uq0yqMHn5Oe4nEY0j2MKbw%2FswGOqUBfHLBcCA%2BU%2BcCIxsMhgFUZqxsr9yfik389w%2By32XcYaJNaRJGNimcx54ZPF9661QSGdz57TW2CbfCf9edFtrhowdMtYkMouUMHk6nLmIcTSdpNQIxRxecSlYHsYfDN6DfwPrtvk%2BjcMrRv%2BeBYYAQDqB5BlU3C5H0fyt01%2BnqwAGdhxAu1WwZyHtBTlz0a28DVAD8QD26VqbXxb0GHp0cg9%2Fr%2B9kA&X-Amz-Signature=3d6a21bd74c01636bfde93429ea6d9aac1f6ec75e49e37216a50540060fc5b91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHJ5HZ45%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T032610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQDnURaOloRe7%2FNqE5tzkYD3afiGebLtucvHqf%2FKZzX8AAIgCiSzt80F%2BiNH9ukFThEZNsMHIJCDCnjk9VmYpYJ%2BkCMq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDLbGBdjDZipZ17a2ySrcA%2FgPv4g9tKsR1Dk7Y%2FGwHmk5t0Shi%2FRfA0%2BgTdxBouiFz8uLc9gM%2FSNks4%2FJxJi0rSE%2BFDdpk6cbrcCwW7zkmBked%2BBfKK6qBWGo85pLM4BoA701XveKnGnvL7rYEV1GK2x3cs26ud853z3yg1sbqH%2F64z5j6U2%2BcQNAxyIHiMB41gE2MFTjXxzorwQSEd9zriVQit6kSsHkC%2FR%2Fc80EmnBZntiYqmqTSW1w1FED3Z1qdBTOL9FBctJVARyyqvjkGvSkPUMfsV0xm4w%2FpWwXYj3giLBradhHe1AZaU792Jahlc39deRfiXQVJ9XzoCx4qyWEsdWSqmP8%2FeLeWVH%2FJ9JYtlv6ip1vZUOa%2FA%2F0C%2BbJaEDgMwsYOStZV30rsvIo5s%2F8nW0RgAq7itQSILfG91H0Gfiuh3Qtb0M64TapqxIMxD4k%2FyIxSQ9bZCsMlcrbd4hJakb%2FUyhStWCNpiu9b6F2ywjObZijRPOiYbB3CmvwNm8Vt9e9w0DaI0lyO%2BrUnKb6TugWS4uX7mhBQMTCSrlRXS6%2FdN%2F5Yn5WBYfS9SB8clBxgHxWjva2If0xwNg1l1%2FL%2FW2AP0dz1rVJXjoRarKU6ji3v%2BLq6XxEacbDz8uq0yqMHn5Oe4nEY0j2MKbw%2FswGOqUBfHLBcCA%2BU%2BcCIxsMhgFUZqxsr9yfik389w%2By32XcYaJNaRJGNimcx54ZPF9661QSGdz57TW2CbfCf9edFtrhowdMtYkMouUMHk6nLmIcTSdpNQIxRxecSlYHsYfDN6DfwPrtvk%2BjcMrRv%2BeBYYAQDqB5BlU3C5H0fyt01%2BnqwAGdhxAu1WwZyHtBTlz0a28DVAD8QD26VqbXxb0GHp0cg9%2Fr%2B9kA&X-Amz-Signature=3d6a21bd74c01636bfde93429ea6d9aac1f6ec75e49e37216a50540060fc5b91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BRACDOF%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T032610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQDenNi1z97k4YvM%2FT39Ar9sQQr96ikGdr3cP71hMj3DRwIgMETO0HPMYOtgzhOKI3aVbOb8%2BptROgR5qWRaucn8sPQq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDHNGY5sXTjx56H8OZircAy5MwwYyDei46fulo4cyRsp0e7JEjiYfgNU6BojHhksetV3raJl0QOyCUrB21Dqgc9CilX5UdlSF67HduJzFHC1N65Koag6CCofHTLl7Y%2FsmCaqR6Qd4pOcfKVCJbbppZ%2FqKtnPRqaat7ofaFDTq8ud8B5AeZecaQPvFFW1Hhb2McxRW5tKMRmURo%2Bup4k1wnWMkhjPqBfD%2FLhc%2BQlUf1s7zZdt6utQLp2tv6RRt7HIH1kb1W%2By%2FLtPLXMGkUc3xobFCoegp5iEISIM9GfQNz8I8BVEwYBuSpp25f4WLG9eXPzs%2B8mlBFHHnkVMOW38obAJ%2Bd25GeEFj26mykRYEbE5w6qbMxcxVM3NO0n8h1GfeBG9PggcbdkV9B5W76sK78R2q6b5JrCjV9fwgPefoweL32Ws2M9SM%2F8AbJ%2BElsYpnn60MByi87aULGha%2BKWsL0jfKbz7NVfq46urLQ7Oba4%2FTlir2xQohJDk2yCfmbc0737yzCGMi1ly83BBgQu154sVOiMcOwiFdXZg3kSdqeoHz7IWAT3o2sRV3%2FoG5MfOqnNi%2BVpTV9jV6sOBKd1JsoONnt2C2N0fLc10nMIKomxJsqrLo2ZC9XM7ewML5ondnaI3SgHjmof0Qh2IfMJ%2Fy%2FswGOqUBsfZQyAwI5XrNbO1o6HljZGa7m61BJHzOGL%2BREXEBhFFwJOU1mya41iC7RS%2BKkCHYr7CT9JcVq%2F58hwzR6jtX0UzdQlGGiHoPKMyDJe6QCR3E%2BUBhd%2FDyGLEkf1RT2ghNSmSZb9WcBgTvguygnjQwgKRJnoix0PH2vjFNophUbYj8HmlLye0EtW%2FP4tYjAVt1147kTjWUK5J%2Byanen7yAfTy0tsJW&X-Amz-Signature=2c333510aa76e39ed32013a49fcdefbd2fe352f5a1340bf0e89a3e65b4de48ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RAHWCLD%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T032613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIFQ3kTc%2FySnXZkXWztzMqvbjrEIzQroy9pXSucSxYz9fAiBaD5ahtYcCgk%2Ftt812xV7ioGbPAnB7E4Vb5G5EL0usair%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIM1MAEVjT7pyQeLy69KtwDNcvV7EmV8zIshPx5Ya5Dg%2BFy0cs2C1gzcOAa%2FQ4iEYZ6rUiHL3pxiVfh0ssB3oMhNdgvheSjqrShWh5PopcIiMOJoYvW50kosaLDTVy4CuvzysKzR9kFxINTmjI41%2B7gJ2%2F2d9WYBvA0lovhwC94eiCJFPmXa2esS%2FUaQKLmlR1%2FQjT42Bz0Ov9p%2FEhBS4IKNtlLDCdNfzYrTSWX%2BfA%2B%2BnZf0tg6rkeQpi1VUUuf1w4ajRSyoL5aOrFD%2F1g1HdFAa0zsiO81TXNIAHbtvteevvoFQjBTM8%2FIKc%2BU7zV%2BWmyY%2FdqfMBIembeuYlUzWFYG8OEg79T6K%2BBHDIIJhIYdfQKjZG6BCH6wfxbizJ1RuTNGo8b4aflwTWoKGWcAY%2B9NNrpG6tCWdCBxlylLXJ9D4V1ioCLq6bqVckfqbluzS4sXGnZH2faPKR3rQBw2OhlS5VMeSNhgDN9Ry%2F%2B0mecMrBDDrIpw%2B0f6RkvXu4ng5T90WwvMhpwlfgi2Fw%2BqAkMNYY5Zj1v8hWSpMHUXOXUo6V45CVHrpE4TDJ3PpU%2FcIP42B0Zw4YPp9HbN0VsWHoeFemknc%2BhHD6YRLRCr8m6jqDk%2F4dpZnaYKtpbjHkARDc46lJmdj6rR6n1iplQwn%2FL%2BzAY6pgFdKVpPXhwyVcJx%2Bcjns5%2Fn5klkJsbH%2Brvx3elMfc%2BoR3Hpwg71BJh7C9v96sFqRJ6gvw%2FOs0GW1ZD%2BhbGyMk1v65Iy3hCqdLB9qyfA8Vj3jJcF%2BfK1r2K5RkbU8Iai3It2tMHSOO01ITcRlemV9wAm5M9QSkSLIQ22NdlMuNYDpmbvfLMvn4nyN84%2BQpxwYB3cht67CTkRINdbRPg2SWdr6jC7p58E&X-Amz-Signature=5032dec7f8a79cabc430144977d79febd189e92afb6f6b2a239d8230b3f3e575&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RAHWCLD%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T032613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIFQ3kTc%2FySnXZkXWztzMqvbjrEIzQroy9pXSucSxYz9fAiBaD5ahtYcCgk%2Ftt812xV7ioGbPAnB7E4Vb5G5EL0usair%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIM1MAEVjT7pyQeLy69KtwDNcvV7EmV8zIshPx5Ya5Dg%2BFy0cs2C1gzcOAa%2FQ4iEYZ6rUiHL3pxiVfh0ssB3oMhNdgvheSjqrShWh5PopcIiMOJoYvW50kosaLDTVy4CuvzysKzR9kFxINTmjI41%2B7gJ2%2F2d9WYBvA0lovhwC94eiCJFPmXa2esS%2FUaQKLmlR1%2FQjT42Bz0Ov9p%2FEhBS4IKNtlLDCdNfzYrTSWX%2BfA%2B%2BnZf0tg6rkeQpi1VUUuf1w4ajRSyoL5aOrFD%2F1g1HdFAa0zsiO81TXNIAHbtvteevvoFQjBTM8%2FIKc%2BU7zV%2BWmyY%2FdqfMBIembeuYlUzWFYG8OEg79T6K%2BBHDIIJhIYdfQKjZG6BCH6wfxbizJ1RuTNGo8b4aflwTWoKGWcAY%2B9NNrpG6tCWdCBxlylLXJ9D4V1ioCLq6bqVckfqbluzS4sXGnZH2faPKR3rQBw2OhlS5VMeSNhgDN9Ry%2F%2B0mecMrBDDrIpw%2B0f6RkvXu4ng5T90WwvMhpwlfgi2Fw%2BqAkMNYY5Zj1v8hWSpMHUXOXUo6V45CVHrpE4TDJ3PpU%2FcIP42B0Zw4YPp9HbN0VsWHoeFemknc%2BhHD6YRLRCr8m6jqDk%2F4dpZnaYKtpbjHkARDc46lJmdj6rR6n1iplQwn%2FL%2BzAY6pgFdKVpPXhwyVcJx%2Bcjns5%2Fn5klkJsbH%2Brvx3elMfc%2BoR3Hpwg71BJh7C9v96sFqRJ6gvw%2FOs0GW1ZD%2BhbGyMk1v65Iy3hCqdLB9qyfA8Vj3jJcF%2BfK1r2K5RkbU8Iai3It2tMHSOO01ITcRlemV9wAm5M9QSkSLIQ22NdlMuNYDpmbvfLMvn4nyN84%2BQpxwYB3cht67CTkRINdbRPg2SWdr6jC7p58E&X-Amz-Signature=63c892e363feefe836ee30c213a0f463d06e48f0148c8332d3b9f137dd56176d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663K54LR6Y%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T032614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIALE94cGlewfw04kIKxDD7zrd4K%2F8EkQnVV9Sh0OYc4EAiEAhEyNQse0mQX36xQxDBVwRNqUIAOA69Hp43BNsqBNcg4q%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDHjXXrb01ZEYk0gOeircA%2BTS16iuKPfbL05hHQAUxaTl9uRikdgA6%2FYEi5mvB3%2FqAHiTOws6nRxNLmyk8MwJuu0g6XY5knaPyNk2I1kn%2FlKom6MQMJb%2BLbBBfQWAChO1mFQEdonkihRbgaQF3rb%2BtJj8SkPjF1YU%2FaC9x693tGktqzEuHmahZ6RiQpwW6wdyU%2Fhm8XnfUeNq2fHyZd8%2FSuvFOkHauQQE%2BU%2Bwesg80PKftnHVoj3c5MowMxlHgQL4GtLHklVgEC%2FzO6zHjEor5et2gprcqA8ZcZNuqqxKtk%2FmNXXNHqEqvF0R%2BB2AeOg5W%2FwIucGylexV3S779JxtxKoq2b6On7Rbpo8RJOIu3jqU%2FfAA%2Bdcffm8Wmm23VnIEXgGHWHPwvOAgRMZkvSQmwma0oIJSx7T9ZMrvuk5w7SkJuXBdMXS0CDO0HVt4j%2BoQm6bNk%2BRYNHau7hjv3W6SWqv1AHKOISqYAlLRZCTgkJ7yv4DTJ4mPOmGUx%2FKEimrVzgLb1cSTynHI3H3UDVahhrwVb76DHQXziiTnrKMrh8ZtZaABNqucU1Pa5uPS6jWlgl5jWjfCpGdTbOQkDi%2Bx0G3xhlKcS2AOk8UTC0wQ5CNFiRldI%2FNfG1gsyl%2F8M8g7fZfYak8JQvusdaYSMKHy%2FswGOqUBpUB7u%2FsO5t5pE562Y7aGQaY4ug%2F2Pb4CwOur67%2FUGmsxJKCM3V7emTXN%2FjDLE6Z0cgLL50h0%2B4BYBxjbQWMaLzEyNYpapOvd8xurc2Nxlia9OvPk6B8tmgrYemtjAFKJPKS5NmZHET56GDdZAFDWJL5ch6Suz9boFtX4GmiuAvlt8UItsmPez2WzHxu%2Fo378I1MX1WaEUeGHB2p7QNJKIHLVUUT8&X-Amz-Signature=e263fb2fbd3108549d2164cc2e14cd025af723c3825f70818fac0ae21d6cab6c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDQ7F7SP%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T032614Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIAzKdqZVzezmJjJaug2krUgrMzwGzcYlFdIaSS%2BxLnTjAiBCRrnIRWfFEJiKqGuCcpHrcb%2FPxmWm4XAZcZUp3B6N%2Fir%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMfAB6pFKoFHQcD9YgKtwDsTqPp2SdgGHELmlHPKCKLNDhWwsStlEwWdZmpY5y6dt%2Bp9oNVdnJeBh61bIdGc%2BYJwiN19j7u4ZnUx6tQJ3ZDDiTXvBmMidez4G5YqWOGzmfnfbuEXyl185RUio1cC9hblb91EeiwQd%2FCX4qUD3no%2Flt8HEw8Rz4rnk7ZMGJQnkSo7L4%2F2y0Jh%2B2vYnF4usC2Y5hJ8eiyBiWDsaHMOdZ6FFXMBvhOhQX3huEISIC9UYaLED%2BgN49lspucbHs6ktnLyLjoghp%2FYI1q19XgphE5a1jyn4ie44KQ%2FcbYzaAcYyG5uqiH0CBaLBUQ1InKmtexhzV4fBgd9Kaj1e4LrpLwNnh9FtOcTYzxKLJRpzpZ7%2FmHq0lwFKdRxxZEtEgrjO6glqBZBfvGNwmMh9dDbdiEy1e7XppRh8dM4ck1Eqkw%2BGMr7aX3afUqs%2FtV9QrK%2FLS6nHMtAC%2FPHmDMKOCGYyVRok0WwPI%2FYDRA01dzerdLXEWlNsae2nEMAEegr7zFYLB11iZe6DfCMSZjNJzdlQaKbUgln6wWQ%2FXcP4ywUwha8W2FKV%2Fj4NjUegkPJYWRzxqkQpGY3wN0ugnLyI%2BhugldLDq2h41QmNyFbm8%2FNTGA1ZU9k%2FuUpOesNUYdPEwwvL%2BzAY6pgGWiVqPpPW2ca%2FPfjGbt8YiaizAautwi%2BHTry9UQ3KsNUnXPqeTf8FMvwrj%2FCJ1QpetjOLToUseobULc1ZwaV6mUJOfAYU%2FHmSqvcT4W3pqrOAWkuZCiVQU9RN6IlWJLtw4DmkH%2FnmZaNvAUfJSmQJx2AD1ViYihuHH%2BaO2DFXVBCZqifR3wHKvWvaTfcYJPtc3uCyACfdB9b1%2FPWxBBQ8lry8xD%2FFV&X-Amz-Signature=f12d24787bf1b34e6ff0ddb4fa0090c7287d4f8aec05732753900d4dcb537260&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SA7TQNUU%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T032618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJIMEYCIQDvtjyXAZIiU%2B6tNjEtWXP92yfH%2BVU%2F%2BemFip41u%2BmKNQIhAPCQhOpyY9SSA4ibmRbClm19Zo8h4uXfZIBWtkV%2B8XecKv8DCBwQABoMNjM3NDIzMTgzODA1Igy2bA5uG4%2BeKlY0qqIq3AMGQV6ovLvdNdk58da4NUeQ42T0VHLC8X3nh6XwvjMyT%2B2G1ZHIAh0PSaGNKNDJBG%2FMoQG%2FuTaOHN3qGwtbdhMoR7XZYx8v1B3d6E6s%2B1QJy0gAFL77PfcXOotS6u%2BktMantOTM6uxReIgBx%2B15%2FG4NLx1b5bAjyQmasMcAGJyeAz%2BpjlznUV%2FnNw6dh0%2B6oC45bIqRo8AfPBK12a8OGFjvE6NPZf4xG6AVLBJpjb1Fg5moirqbBjNCV8RT2IRkkNiGZdTPvtmpIrKBItNmscvhTgpwuuLmr%2FQo8xrCl5O0L8cEjy88Jo62SMph8VKT1qb2%2FxD0EadH1m%2FrmTorqB2mlAvxCUpWe8IsSabAEwIlaxO%2BAjPipEzLeHZ%2FpPmt20hia4iWg2jB8JYmbeaPT8dMh7UY%2B7juuFrIR1lnFvrB1RJDW5wh%2BwatTLqQPRLPoLIWxB7v0X%2B6kcfMgdX3y09%2BUOu4CmXLCm3efMBX6smwUYaRBogaoc4uQk1xKLf6%2Fb7ayHVYwI98tTWwcPtGIEYoXUYe5l8Ki9IeGD3AKaYXl%2FoI7lq98aavZLDTfHgbv%2B7cATjI5m7HiVGV46upbsVOiyBV52NzA9smqc%2FUpSRIkM9gcSQTPxi1Rh3sdDCE8v7MBjqkAUSK%2FVAMD2uXIzLCSwmIituHg5uU%2FGb0aMCOmv89RN9rtgx05v7shE%2FAIwknoe05W7IoKIVPJZ%2FbtfKNQ7%2FGPJKHRpqohvUGmEySl31G2DF2mPnLPQJm%2BKRvo0W57vT4fPG%2BMihCSgKmuZtvyQtQsLgqg49HBfETbpeGhrE4G4Y%2BDI%2BSQRFOuxvUm5fSA4%2F%2BkJcR6mx6PzaGtZcfJKAnZwoCr2KV&X-Amz-Signature=bd7003a88bbc10dc64d41214d0e780cae31dca90830b530081d2ecfc2ce65bd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647HRYO4J%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T032618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIG92%2FS%2BglC8zzUe9IvAyFdJvhsyM0P1DGHZ2bDL4ZMTpAiB9j5UF6WymTbbEkWV1WV3p%2FLK0ylLNt4qUQw0%2FhddVdir%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMSuNbpM%2FWX%2Bgo3qRrKtwDnfcbuo0RENbrnp2wHKsu0QQJJJZV2Xk8BuP1ddSfkZdHtizC9rJDggHZ8u9uwoREsxlZi1OeYEIlBjzsNZQcivvze%2BwYaH7aQac3UbKIoDFdFx00XC3LxYtjSVFTTu0lCvGlWSknODMMib8Zk8fpQaiUUPVQyQoQoDR7HqD1HF%2FXG1VA7njquDFPiJrOuf9vC58Yn7d2likY2zc%2FcRsQJ%2BLkqEcpwGpSp9dHVpMKmlQJrSgNIdP37AH1acbxh6a5PAgFFKx6oCAxa5Jtxw1hsGVoC%2BWcT8oQvMtFVEgOSwsdK92yXw12fTBVhjtMI4i8jiPYBHSakUg0uCj4TDTkvD51cj%2F0%2FZpq3O7javTVWVcDE%2FbNEb9PGrAW%2FyXxRgb70gMgArkFeLb4cEsRtnwGOD0CniYgAtgvdGN%2Fh%2FMn4%2FZaudIjeV91rL6kW4ZAcmLHpN25QI1wLB0OwFLJoRvfUHycq1lqbAU%2FPcIJvlxgzVGdyCkEB2sStwU%2BplfTqZW4tM0BecE73t3tg1h7swyCdtcxXFrFnxx7ZveG91biOIHgKdXxXO%2F6C04HD7FCnqvBrS6mVQJTNyWJ9%2FUsV6Oxv8LUUikGdZuNxRwiFGkuSdDWrmG2VaCqo8%2FhxUUwkvL%2BzAY6pgETVNsBCuDHT2hFpqGuOpobyXmSDab5ZnALQT7AaUvwvv6SRsH99082gx%2BQqclzisn0qmm8k4S8j3BoHxe2aIhgJEWQBei8z8BLuzphVbb6zKRKB1Eo38J5eBJouYAVNYNlRQ1IVsrZMx6Hi7kjdRpFavN9mV7S9IRC7Aw6vdF3MAM8khklFgJjyW7cBF9lutANtEcsnPilsESyPeLLfFe7ShY0jUkp&X-Amz-Signature=b9769da912010755f629146d0c160e27df3b0f044d0be2b24d437c2ab1c7b889&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647HRYO4J%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T032618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJGMEQCIG92%2FS%2BglC8zzUe9IvAyFdJvhsyM0P1DGHZ2bDL4ZMTpAiB9j5UF6WymTbbEkWV1WV3p%2FLK0ylLNt4qUQw0%2FhddVdir%2FAwgcEAAaDDYzNzQyMzE4MzgwNSIMSuNbpM%2FWX%2Bgo3qRrKtwDnfcbuo0RENbrnp2wHKsu0QQJJJZV2Xk8BuP1ddSfkZdHtizC9rJDggHZ8u9uwoREsxlZi1OeYEIlBjzsNZQcivvze%2BwYaH7aQac3UbKIoDFdFx00XC3LxYtjSVFTTu0lCvGlWSknODMMib8Zk8fpQaiUUPVQyQoQoDR7HqD1HF%2FXG1VA7njquDFPiJrOuf9vC58Yn7d2likY2zc%2FcRsQJ%2BLkqEcpwGpSp9dHVpMKmlQJrSgNIdP37AH1acbxh6a5PAgFFKx6oCAxa5Jtxw1hsGVoC%2BWcT8oQvMtFVEgOSwsdK92yXw12fTBVhjtMI4i8jiPYBHSakUg0uCj4TDTkvD51cj%2F0%2FZpq3O7javTVWVcDE%2FbNEb9PGrAW%2FyXxRgb70gMgArkFeLb4cEsRtnwGOD0CniYgAtgvdGN%2Fh%2FMn4%2FZaudIjeV91rL6kW4ZAcmLHpN25QI1wLB0OwFLJoRvfUHycq1lqbAU%2FPcIJvlxgzVGdyCkEB2sStwU%2BplfTqZW4tM0BecE73t3tg1h7swyCdtcxXFrFnxx7ZveG91biOIHgKdXxXO%2F6C04HD7FCnqvBrS6mVQJTNyWJ9%2FUsV6Oxv8LUUikGdZuNxRwiFGkuSdDWrmG2VaCqo8%2FhxUUwkvL%2BzAY6pgETVNsBCuDHT2hFpqGuOpobyXmSDab5ZnALQT7AaUvwvv6SRsH99082gx%2BQqclzisn0qmm8k4S8j3BoHxe2aIhgJEWQBei8z8BLuzphVbb6zKRKB1Eo38J5eBJouYAVNYNlRQ1IVsrZMx6Hi7kjdRpFavN9mV7S9IRC7Aw6vdF3MAM8khklFgJjyW7cBF9lutANtEcsnPilsESyPeLLfFe7ShY0jUkp&X-Amz-Signature=c1ffb05dbca3ba4ba4b56418ceb0ba13c541d7c33380c1517728c51f97394d97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GHQJQKJ%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T032608Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIBIMx4gqCj%2B28LQR3KfcTNoUHd4fSmvzkEraEEqclO%2BzAiEAjgxwhKbuH51hngYqAba%2Ff%2Fu%2FikiUhUbwtlv2GL9pi0Eq%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDOKOmVCNUDoz3zrTYSrcA%2F9FMrZ2iWgoK16VMz9fxzdkWruaVRa0KL%2FSTJsCUWj1ZMGfQdhQyuTdaZVXKUrDz1Yu5smSdE4TjvhdOxtlOrENBw%2Ff2gfc2VgKudUT4okwEkC6kzTyGU%2FCKXQWQOMQRcK%2BWRoV8WvV5cB6Y8OLdNaJrypLu7lHmlvPcRVp11TCFwxXYF9r2IIusuG0o8pM3UlDA4oJHzahgbfgXarkNXmLK0qZITUNtKR07txrMf4NrZzfLJZP5WO7EXyXEeAXBv2LGf%2F4p2QSQym1tpgR3oEfzjjcVcZt2WD2WA4nKCYpIjCBJNNOwSt2HI3AEcGU5MVwyGOIXT8lOhiqbdrg9lHiBMntzr65nQjdjf4Rh1pXEbVrK7vzKGjxAa4K%2BpdgOZNkLI92H8PKXivICfTza5gcWD8F%2F%2B5T7aph0T4RHwi2qh%2BrKoazUyiJfvvX0%2Fxv2b2umQBp9kD81fwtMqijjIqR1pLju%2BJR2zZH7Rnn6qU6hSYph0JmfVfeD6hz5grK57HABvhh59aRbJD1ZFJWGlRJJ4dTTFseu3fE14T0w1nf0T1eQQFBgtrXCOsqcdsHvk0N0RYnYPzU7zzCHYqmsMdXpGAdfhzqF7q3sbmRYoDjQv49%2B3F1F1wzmibSMILy%2FswGOqUBszMrk0GyUvXWbw%2FYq2dC4MZu6MN9PB6VPNzfz%2FJXI9P3XwU1pHKGFImM4F6ZtY5LlYPeCoYcaLDNyqVewaK3XdznjmfZY0AnjDI0e72unOrk4hWIk6AqDIts4M7jAaApXPFNojgQ%2BYbF0jwrLsC%2FFz%2FyQX%2FGnEX5rNyk%2B7Opel4Zl9hFt9MZWsckPC5iCv9%2F22RV4%2Fi5YLuP07nuUXO%2BqAWRaGz2&X-Amz-Signature=3ec2abfc96f9e7ee3eb2c4819e5225c60b1cc9d13bf1f09164e33b676a1b0ef3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBEEL67J%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T032621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQCLu0ffjNngJovyvHT7te8OuR2zSs%2Fquzap3nnnScCI7wIgPcMJ5aqEcWbGsESot3yygcm5QJlTJ0CS4gqLwRDsLf8q%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDG6Xy6PFBLaFqXXEJyrcAzsNY%2BkZoWA5ngVXO606%2FMUcVZ3EtIYFhyo%2B2iffz2kK00aqDxAPypcXe%2BbH5%2FT14IkoaK3XLujeBOfQXFDiogFuH4u6Pum%2Ben3PBf3Vbi89Us24s9ELpqGNt4HyrbNZHmAKnNZrgT7rLHGu7nu%2B4iShCAXq0M7dmf1zKs2A2qwaHqjsGHm4xMNlcgHAONYvtSXlGA0EICCQXkVKfvkaoPAAApFFsnBwhwkI570DEG67GL2tekqdD6bAbhy9%2FMfwrFnOpLX19kNRXekZAI5tv9%2BcJzDXMW7wRWAyBfEsf%2BJ17W2vmR65CY%2F2rcDkWLqXrHPUee6LAJoEVcdckSaMLusVrV8iVMXLLnDAmMu3K0FniufOg2BIYJikhg8DsX4oLOqVNT08EcOEhMMMYq8k7PplzlEyh4JZIBQ%2BwGNSGKGTigb6NtutqOTwdrD4YkOLfGeHV3xEjesw%2B5xaY%2FXbBIz7332tfpVmXXeKRiiNWQ8x6piyAfgSG23KXJp5GLSSvRBw%2BB%2BDc504Cw%2BF2BQ5onbanarjuzdTC6f2DbxwIrXR%2BXepIqP3kgt%2BsoLz788hnRM73Oiv5C31I46wnefvYW6zcvNENHnOn4ynewQKVDQ6eEH13bR8djI6WPA1MOTw%2FswGOqUBS5SlKGHGy7lXdCzW7fcP7iI4nn5XQWYJNTskpW9ZShUcr4Lfg3%2FQrmrTPZknoKGK2MrYVWEgggLW%2BOfez3Cl81hi%2FSbw8BlqL9zR03Fr0GidxdqX1iONEpH27dx9K5TEumPr84Nq8%2BcobzIZzCjLtFZrIjZBQ%2Fnc%2B9daeMUeFZrcHz9vF9359xxv0m5WQluGZ6a7Nn43uLDjk32aLrzZmVkf%2BNTL&X-Amz-Signature=f898368d20a26636ef0f1a38727ca1596004f5ba3476fd709ca428085b06cd34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBEEL67J%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T032621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQCLu0ffjNngJovyvHT7te8OuR2zSs%2Fquzap3nnnScCI7wIgPcMJ5aqEcWbGsESot3yygcm5QJlTJ0CS4gqLwRDsLf8q%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDG6Xy6PFBLaFqXXEJyrcAzsNY%2BkZoWA5ngVXO606%2FMUcVZ3EtIYFhyo%2B2iffz2kK00aqDxAPypcXe%2BbH5%2FT14IkoaK3XLujeBOfQXFDiogFuH4u6Pum%2Ben3PBf3Vbi89Us24s9ELpqGNt4HyrbNZHmAKnNZrgT7rLHGu7nu%2B4iShCAXq0M7dmf1zKs2A2qwaHqjsGHm4xMNlcgHAONYvtSXlGA0EICCQXkVKfvkaoPAAApFFsnBwhwkI570DEG67GL2tekqdD6bAbhy9%2FMfwrFnOpLX19kNRXekZAI5tv9%2BcJzDXMW7wRWAyBfEsf%2BJ17W2vmR65CY%2F2rcDkWLqXrHPUee6LAJoEVcdckSaMLusVrV8iVMXLLnDAmMu3K0FniufOg2BIYJikhg8DsX4oLOqVNT08EcOEhMMMYq8k7PplzlEyh4JZIBQ%2BwGNSGKGTigb6NtutqOTwdrD4YkOLfGeHV3xEjesw%2B5xaY%2FXbBIz7332tfpVmXXeKRiiNWQ8x6piyAfgSG23KXJp5GLSSvRBw%2BB%2BDc504Cw%2BF2BQ5onbanarjuzdTC6f2DbxwIrXR%2BXepIqP3kgt%2BsoLz788hnRM73Oiv5C31I46wnefvYW6zcvNENHnOn4ynewQKVDQ6eEH13bR8djI6WPA1MOTw%2FswGOqUBS5SlKGHGy7lXdCzW7fcP7iI4nn5XQWYJNTskpW9ZShUcr4Lfg3%2FQrmrTPZknoKGK2MrYVWEgggLW%2BOfez3Cl81hi%2FSbw8BlqL9zR03Fr0GidxdqX1iONEpH27dx9K5TEumPr84Nq8%2BcobzIZzCjLtFZrIjZBQ%2Fnc%2B9daeMUeFZrcHz9vF9359xxv0m5WQluGZ6a7Nn43uLDjk32aLrzZmVkf%2BNTL&X-Amz-Signature=f898368d20a26636ef0f1a38727ca1596004f5ba3476fd709ca428085b06cd34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTKP3IKU%2F20260226%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260226T032621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLXdlc3QtMiJHMEUCIQDd2gC10IQUMKqn6JnRmxXhA%2BPIs9bJP36RXY7GDiPqJwIgeqshgga6%2FhtrKxtkEYe03GfoM9TTEKkABNB7D6TmSo8q%2FwMIHBAAGgw2Mzc0MjMxODM4MDUiDJr3m87JqPKgezjq5CrcAzIJFDGlo36v3JuDCSH2CpotmFSmSntubVzBAg0ADa%2FpxRS9WYIsZUJpBVBd%2BaVZzGrcIiDVDU4EYT9CHsd5scr23wJqDla%2BAbwCZGoKeiIbWakvsctcpZWWM%2Fa6hW01jtEI%2BjsZiOGuOBSskNwedKhy8A7E1V%2BJifMQ3xS8cZxODzw1qNbVPR3LaOC5A0qKg70jBT3AOFlvYYcYY9lbcrmtOGxYpdecA0UcVR%2BEphg3zOoDV%2FYvaSlrUc63ZGRz2E6OoCt7t4Exzruv3ZP3KFdSdWqn6GGR1fISwVCTBvyxfrc2r1HKiO3VTIoPJYN2Pi0atw2QBCfWYc6qnfol8v8pSrjijDJAAHGL5TJZgjFQUzDjyZ7IZR%2F4ALdyQR2nHbhD5G27w7Xlj8D%2BK2vwBAXvHQXNBPPnus3MFl1YCEJpC%2Bs6%2FryCsGs4MSWmyDXNohKC3IP7GWNhk%2BbSaz8Wf7AZKeT%2FBhD0sI5BS%2BOnYaygBH%2Bqksu0jAcVQoWKZY4kIdWbOUjx3biqGVJIdgxnpevqJjhtiSWWsZCEn7tV8OZQ5MbOUd5LZ2nlGyVqIWyny1nR2xz3g003VS%2BgnsjRGSaK84zNp6SdwWdz%2Bppo44oLJVQH3EYSt%2Bzo83WxMKHy%2FswGOqUBUUWjn%2FTdPGNr429NNF2CWjkRYnKFWB1sfDH2e7bQSkDb83EB%2BY%2Fy7c5dyrjOHxePgeIlvzNkJ0wolULkr1lCezf1AW1W6cL8ZoFEgJ8QPt1VTTMlp7JDxvAiCpfMewUt6xBnnZIhjDYrqZuC9jDWHzjCWeR3ZxX7%2BBX1SI4au5q5N2Bz%2BOtBDmxgFj2zelPIZ%2Bi20iYaybxuC9jpunB5SDJGHhbw&X-Amz-Signature=b72ddb2f1301f75120bea8241b89a334cf6e2393723cdb2d37b68c4c77336511&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

