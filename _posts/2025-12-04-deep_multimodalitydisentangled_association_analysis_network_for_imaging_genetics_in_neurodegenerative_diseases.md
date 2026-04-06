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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SI6MWS5W%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T173401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQDQS6SJTusQV89qV13yRpGaPi55r%2BMqa%2BrQZqXn%2Bn8uKQIgJjM9i0K2nPXfJpdTvOeyahg4PoE60sVChW4QygEyWD0qiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDElk6Kp55L6UoBl3GSrcA2igAueE3mHiZ%2F7sn0kmY2JVTv1j8239WMb79klDankQ3qNZkMzzgxO%2FElx0HQ7wg%2FJR0usPqaLGM%2FqCNKAN8B5J%2F5hes2xDRgmnPGG91%2Bxy%2BCYX09IiF%2FMgAM8fdc64wdsqK6nAXduoDOTuNXET6fZyVF83aQ%2BytMovf0UPUj7uDck6Dl6VEovZktzw0B%2BtRu4YD%2Bok9Qp6goGDAPmqep1sbMXdZJdxsc6nd5s095REQf5F2Ze3LZXT4Eg4Lg72pqHwkPOlIG0v69WzzM%2FLXauJLRDRHmtp9ZIjE3JhVV9mvdbMbM87vTsj%2BC4zq3Ob4Xw1l%2BGba8yns5Kf3HCQBzzfgxaEXWeRFxQ8E9Y2AyHTG8Z1JoX30wX%2F3Itl%2BVHqPJHQ%2BG%2BrHgYNBjlpdWV%2BrhO%2F%2FZTFWf1oIn4Mlpq7IeAX56Cs5Rc3PKGN2v3XHba%2FuO6Nk4%2F%2BoQm5eUTkt%2F29K8jT6RN7KAqbWv8JhwM%2BUCrHDQ%2Fs6QyeYvjOSPbh%2Fh6zHGtzdIYrdtQqLMjlF0PqMZ9Aves3ZNsxP%2FTeUP4TdLmv9HFDNV2u1NCeVl3mFoBEKC84E0N2cMJHHRIVm1QUhnH479G1TcG5OnOa6E10x6%2Ba7e54rJHnAHOsmeZEMMnSz84GOqUBtfj5DqNz%2FI1GjTEjDu5pdkrkXyIr0lOM5M4Pl14Wbj3j8kEIwgYIE8OR2aI%2BjCq0eKCoq9ejCEvQ8qWXoZ1YYRXyC9733Bd%2B4NYeIbB2D0CW6zLcxki3nqb5Wacr%2FKAHfeGUIEQsIUiftsQQz1aAD16IyZh%2BHbHmPudqS%2F3VrunlYGHjap8ZUqUi2A46ZEDqz8SN0cnnjKvoqpb6liU5CsI95qXJ&X-Amz-Signature=a1ed9b7f739e20c9f338ebf072ea60cf2e2a5644837333401bc7eb6ecb86c5fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SI6MWS5W%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T173401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQDQS6SJTusQV89qV13yRpGaPi55r%2BMqa%2BrQZqXn%2Bn8uKQIgJjM9i0K2nPXfJpdTvOeyahg4PoE60sVChW4QygEyWD0qiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDElk6Kp55L6UoBl3GSrcA2igAueE3mHiZ%2F7sn0kmY2JVTv1j8239WMb79klDankQ3qNZkMzzgxO%2FElx0HQ7wg%2FJR0usPqaLGM%2FqCNKAN8B5J%2F5hes2xDRgmnPGG91%2Bxy%2BCYX09IiF%2FMgAM8fdc64wdsqK6nAXduoDOTuNXET6fZyVF83aQ%2BytMovf0UPUj7uDck6Dl6VEovZktzw0B%2BtRu4YD%2Bok9Qp6goGDAPmqep1sbMXdZJdxsc6nd5s095REQf5F2Ze3LZXT4Eg4Lg72pqHwkPOlIG0v69WzzM%2FLXauJLRDRHmtp9ZIjE3JhVV9mvdbMbM87vTsj%2BC4zq3Ob4Xw1l%2BGba8yns5Kf3HCQBzzfgxaEXWeRFxQ8E9Y2AyHTG8Z1JoX30wX%2F3Itl%2BVHqPJHQ%2BG%2BrHgYNBjlpdWV%2BrhO%2F%2FZTFWf1oIn4Mlpq7IeAX56Cs5Rc3PKGN2v3XHba%2FuO6Nk4%2F%2BoQm5eUTkt%2F29K8jT6RN7KAqbWv8JhwM%2BUCrHDQ%2Fs6QyeYvjOSPbh%2Fh6zHGtzdIYrdtQqLMjlF0PqMZ9Aves3ZNsxP%2FTeUP4TdLmv9HFDNV2u1NCeVl3mFoBEKC84E0N2cMJHHRIVm1QUhnH479G1TcG5OnOa6E10x6%2Ba7e54rJHnAHOsmeZEMMnSz84GOqUBtfj5DqNz%2FI1GjTEjDu5pdkrkXyIr0lOM5M4Pl14Wbj3j8kEIwgYIE8OR2aI%2BjCq0eKCoq9ejCEvQ8qWXoZ1YYRXyC9733Bd%2B4NYeIbB2D0CW6zLcxki3nqb5Wacr%2FKAHfeGUIEQsIUiftsQQz1aAD16IyZh%2BHbHmPudqS%2F3VrunlYGHjap8ZUqUi2A46ZEDqz8SN0cnnjKvoqpb6liU5CsI95qXJ&X-Amz-Signature=a1ed9b7f739e20c9f338ebf072ea60cf2e2a5644837333401bc7eb6ecb86c5fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UWVW5UI%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T173401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIFnS6au%2FxgPMtlw%2FQJv%2B03UV4SzlI79QD5xD01mhKf0xAiEA2OtYnvXT2djaAC9tJcfMHdfslRWoQHLoJnp7kd0gdf0qiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIVgozdttwueXhQV3yrcA63XtQSoAICUCEYLTUvkyVVCyFCCVBIPU%2BTekXB3v2f%2BCDn0fdPaMLUPPz5rqKPbE8R7i0OS4uLDYmuu%2BCsQi%2B9LZMidtkd6sL76ITa86pY3OdQ61W3J3SMa6KDsW4FabWnKwLxwWdITP%2BRqdxZCAhdJrj85dqkJgHJ9dplbv3GclnBckkh1IWUMORc7cxSR1pRZ%2BGLsjmn24yVM4dtOVGAUwf7fh5BB8SLNv%2BtoHlwwU94DeMrNkZGk6u0YV02kSE2VkqKjra67goHwcqoVS52Jh0%2F2nszbTHNySzIjBqPCIp8PsbG59P5TMrmqXCwAxpwdZI%2FZnFz2oBnoPhFQ9W0EeeXUpGQwLp2c5%2Bp0x%2FxNXiyxReCHcHf3f7dL6FCdPZQGIjzVfl%2B1Ze%2BMUArWpOyVftI5KRhVswtXD3bn%2BwwlGn%2FaaqooUCm1JBBc854%2BbisTcbV5CSktEo0aJVM%2FlRRtBgNC1RmV%2B03%2Bx2nKpJmArK8qOod%2BWm5317sYWzvfqIEoqC4HO06i4RjEQbKLKu3U0bZ6%2Bz10toj2cVgiLhRh4v2fo6lonHA7carRzX4xqzZYAvioJJ0HcFam8ymiuBrBzE5jnkwYktOaxZjtCkT2qYwl54iHPa6jmxxEMP3Rz84GOqUBDPmg89Av%2BR63n8raW7jJxGV%2FxXPbYOdwU%2BKiBwV2fW0h5YDAJSUofWVVcuzuYdQMZo1rv81U4dIH3Itso1Sd2Wo3Zvbk%2BIjXdiSr%2FvgD7p1j54ZBVJSrqI2oHJhyxAP10ssJmNx5bXw2NumD%2FJjUKKKtvfDGkiiPLonTEvbwycOJnlXHI%2FL93hoSsqqSV%2BPI%2Fakz%2BVzUaJ5QVy4ivV5MB8XlooYy&X-Amz-Signature=b820ba856d2ec739da44a96ce9d9c4b78dd835118b1f704bb3fa40804b837f78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662P7HANLU%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T173404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIEcdFpcu1PNCtoXwyrFQeu8hSa6UD7mI1OJQKozEdtG5AiEA9G0q%2BTsxwv2puJd34Fuq3jl0tOiUTx6cpj2BS9fbhVsqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAIO3rJ3AUlIae3T5CrcA%2B9Y5LAIWopivNGyOX0c7NH3OBb2od0LGMSGZNyDeYMqIig7g32WCKg3kOnXkNXvP5hzO8482atkgNiPysqGJjlsDEHlw%2BiYVPWlFSLzQAIrgfY1ruksLbzr%2F73CZr%2BYnpIkLf0UMZfRk6gXFMUxVbgQbxSULuMjh6EkK6Ey09xugjCWIq%2BaTwFJXyVm64ZD5H7PhRxHJAnzl1OOXHR7IlOUJvnTiqpaM25gl0jxzMDsrpAC32jgs03SuxV%2BC0YpZBKbrgbQElNmTo92tDtoJQw4sEuECQLVRnExaVGAPI2zahqHQtqxrCI86GTHXKpdvp1eSmY9Kwfq6GTx8XGB%2FsDy5O061ifoPNVl4k3IdIHT%2FQYkhWjddKaUbGL32FPACHJFGydHWqi8J8pmID8Xv8pYa22Ly17j7nK1O12o%2FvS2iglpFJxLKKG%2FIHvocuV1L9Pwy5q1kGG1ixf2SQEpFNosinBNLaLO7dCNbM3mGuin0A7t4jUJs4U%2FS5uu%2FRav2Xn26tFlls4tZ5zRq0G5YDXiikW0oFOTlRc%2BAOgXRETcW%2Bnss4MfGtuZFMvfXWDJeO5Dj4%2Fbsnx36CiZyzHhr72skmFPXFLqVT%2FpJnr1vFVUkclbFD6UjqV52Oh7MPnQz84GOqUB3GQm4QYMUaCF87pzLNgaafo%2FxUyP1zxzNq%2F%2FlvgL4kOxorQgJd%2Fr72GdmBaWm5rlI6pm8h9xmERWaYrO0e0Czg8wf29JecypLIDpH%2FCicvDNjgzsx1TrDuov6ousFs3nLTo%2BBmjqkNSb2gE5rrNycZ7%2BfXrgzeCoi3MD7bYbaMhNX%2FALmPTjphbRp7agMuqbqFyQlQNJ4sGjvdonjSiCbh%2B7CzaO&X-Amz-Signature=b232716a44dd01c7ade952ae0dc4717d568c141955691ae3d8fab9b84becd88b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662P7HANLU%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T173403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIEcdFpcu1PNCtoXwyrFQeu8hSa6UD7mI1OJQKozEdtG5AiEA9G0q%2BTsxwv2puJd34Fuq3jl0tOiUTx6cpj2BS9fbhVsqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAIO3rJ3AUlIae3T5CrcA%2B9Y5LAIWopivNGyOX0c7NH3OBb2od0LGMSGZNyDeYMqIig7g32WCKg3kOnXkNXvP5hzO8482atkgNiPysqGJjlsDEHlw%2BiYVPWlFSLzQAIrgfY1ruksLbzr%2F73CZr%2BYnpIkLf0UMZfRk6gXFMUxVbgQbxSULuMjh6EkK6Ey09xugjCWIq%2BaTwFJXyVm64ZD5H7PhRxHJAnzl1OOXHR7IlOUJvnTiqpaM25gl0jxzMDsrpAC32jgs03SuxV%2BC0YpZBKbrgbQElNmTo92tDtoJQw4sEuECQLVRnExaVGAPI2zahqHQtqxrCI86GTHXKpdvp1eSmY9Kwfq6GTx8XGB%2FsDy5O061ifoPNVl4k3IdIHT%2FQYkhWjddKaUbGL32FPACHJFGydHWqi8J8pmID8Xv8pYa22Ly17j7nK1O12o%2FvS2iglpFJxLKKG%2FIHvocuV1L9Pwy5q1kGG1ixf2SQEpFNosinBNLaLO7dCNbM3mGuin0A7t4jUJs4U%2FS5uu%2FRav2Xn26tFlls4tZ5zRq0G5YDXiikW0oFOTlRc%2BAOgXRETcW%2Bnss4MfGtuZFMvfXWDJeO5Dj4%2Fbsnx36CiZyzHhr72skmFPXFLqVT%2FpJnr1vFVUkclbFD6UjqV52Oh7MPnQz84GOqUB3GQm4QYMUaCF87pzLNgaafo%2FxUyP1zxzNq%2F%2FlvgL4kOxorQgJd%2Fr72GdmBaWm5rlI6pm8h9xmERWaYrO0e0Czg8wf29JecypLIDpH%2FCicvDNjgzsx1TrDuov6ousFs3nLTo%2BBmjqkNSb2gE5rrNycZ7%2BfXrgzeCoi3MD7bYbaMhNX%2FALmPTjphbRp7agMuqbqFyQlQNJ4sGjvdonjSiCbh%2B7CzaO&X-Amz-Signature=abb86e33060d3d8d012922e167d1efc070e1a2c8fdc8bcd99a6f26c4449b007a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHCUWP7L%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T173404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJGMEQCIGKMN6GhuYKrlUjqghGHmp9L7s9KSbk3CxKQwD%2FQJjjaAiAZBM1kyW8W1dglnz8wExEwFqQOWNgn0eDFKfL3NGNLyiqIBAjS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM7VQ%2FteGssFPep3%2B3KtwDFqLF5qQ3PKhIzahoYJBPu4riKs0pBadW%2BneXir3oDbYZw7t1fyc8YbQ2I4IqznXyYHZkWzW4t52SP2b6dc1FUHR2Ou6ogQssZxG1ZcHGCwmwBi7x6nxu1f%2FPofiC10TTTqKHPrAnvngu7f5Gahk4h4RQOpuTraET0MHT3J51o36i0HqG%2F4yl0JCwjcb2luRH2xiALIqkk4N3C8ZToQMnmaBXmjn1gaPARsppciKtjebIsCzjqghER7gB0S2BlS0CPZkiL0kXERmD8JwVgt%2B8ZQWdkyKYzECtsHr561GxsCH32AKbqXzelcknqVISkpGr4Q34DVBWsARDdldvWIIUG%2B8r0iobjavwUkH5iU0ZSS2OLDW%2F%2BZpjyMjuwtWpt8FQF4PLcyYPZL80mDwDi8pcnssidKnYy0flPKk4wmk2V8Itrzw4EoicqxHOKcURAHLTdoY3NTSkSewNEZDqXmfuJO1er227knd2RlA83b6aFXCuDk9qX4vtutUqHjdnxZTkapd5huit9lbA1MAB%2FvfY2Z53iXzN85lbFi287tpwzfNU%2BGRAlbAS5KJI%2Bs1E1oIZZ3UWL5Gs4RFrRPngZwfJvGfmdYTghzdtmLQoEW1Te%2F2ardnfqD4Bwe6CKDAwz9HPzgY6pgE8wQtfExlfjD3tFruD3MkgSLUiKwTSaBZELiOsUy8pQqjw%2FAgwkGRcKfqojFzVbCexSS%2FOzv8divkT0%2BQhv0Kv%2BHlYel9pCD8mf9D5AzIftVPZJIkwdWMjhVlnWW4QSyDRS9%2FGIc5Xx4RqM%2BVf4AcIOAx50ygP0o7Ibb%2Bk01zvchsu8TezmrpyNgYl2ue8c9uBxvKH6HaxSAtjKyLeQYkqvVTuAww8&X-Amz-Signature=1dcf1c8354a1bbc83efd8ab923d267af4e2a1f8fa9c53e26c7898e2519b36b7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664D7WULHX%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T173409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQCqLcTmg2dlD0nHc3UcExDaqcVjMu6DgA2GC%2B0q4R3WywIgOfYl4UHGWZDZPnmDudt1DKLX75zoOrLOZLu4SaucaCAqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK4NMgIiBwHqMv4mZyrcAy2vxaZiPKKL8%2FTa0qUeOuTGblGiwnMEboJxBs4O3GPA64G9gkrRBgLKcwmdVWj4qwo%2BLXiX9XR8tdk4IMyt3SqhWbgv6F%2B8gtEySmREwRNjKVXbC8j38EXEN7LMxHzIcKIuEH%2FeJY78yt426NklQTSleTEGO8mphYqytEUL9qQgbiFzKsXZSthGj6Eyz4VOmy9wk0nFrEGrUQk1DvWo1uxZubixzYlmEqwc%2BPx8Y4K8RbHKC9v0hTcbvwQT%2BrhwAcqTfnP2Kh764GdtWpaI30wig5n31QDw2wldLAXFuv%2Bx58TqCLe4Fz%2Fs8ET9wb5hppsMhcZZltut8SyK061dN4SCQuaTyOD4%2B0CwzxjHDaQ2QlTx%2F1YT8YM0MVqKAWb%2FLuLvWnfWuO6ZWTBOaveExdkzglOlq8JHhHODfFD4eTLp3TvcfRWgF7ugTn45ybWsoWRYUZIJ1v0AINJ6qVZWf1mzMZVAI8yw2F7VS3CGrdw%2FONOEb9hhhVEtvAFa4wnNsyq8zOmk5ZEdt2xPDLnrODrVnV%2FdIxPlNHG%2BI1OH65s0gy%2FXkcVqaaKxgEIaJvUJmG50bKW0AtKJe8sEDyNepf8QLxQmnhZRvOzooRR3J8K1E6o8ZeltSUNhUr6KMP%2FSz84GOqUBIcv694h%2FXl%2BKv6qiEbXshMLbMBEC6FXGDnnvyA9rF1eQQ7d4Geo1fDpVqfOY7TipMnsJBqKLo18QswR6Wz8wdMa%2B23BuARTQrHYUxRq9iNsOWCX5qtE9rmh4pLZMshyMy3QoqiyD3MH395z8HnEmwIbSl1IDXeVAjWTy8JWjAx4HPZG0UcnMpPSXzuOkAf%2Fmv0Jl5libdhhRiUZsw9zqrZXdGudb&X-Amz-Signature=2c878c7d4228d588c7355ac2f0dd78e38c2ea221596ba299791177f3d1d7113d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XI72IPH%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T173410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIBTNHJJlVlc2Qf%2BdHg9eBe2ltcZGsQJxxPWF80pRuFosAiEA1d0skdRbKineEMfpAHloB2zyKRyGcVaPxNQM43fZeOsqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKI%2B6mYJmK5DcrlT9ircA9hKhExN8ECD9oMPCBS2%2BdA9yQc12Y%2Bwrd0TCpTCrx4IBeKNuL5cGA2ho80zO41AgFzES70HBOKF%2BLeYbqtNiWwpmZh%2FAkzFoMUjyZ2OSCH5Z%2FI3FMrw3v1ENtfubRDck2svgEEDjEUj%2BnNY9xC8miTBofb9PJTzpoE04xU%2F0w8C03gZ0ZjjeTw%2FTsS18oaxiTIV%2BuqGTCI6o2TDYSPyKh4nMPe%2BJGg2%2FHVise90k5xPIKylz%2BhnCmUh8CFpeOVJmmORSA1%2BQRllW3wf6dJVBYiBGZLD%2B7fvnSQZv%2BOs5tdKgdUSuJMx0YLFfUchFwcphnupFt9mD5UnkhPaadMgwoQgEDWYjHMy52%2FpoguL2UhOMV6pA%2FRkDeKSsgOnJSVPnmmG80qcJYrLXUtzU3rDmMh1lfjxrWBrmem64%2BRliZmKCmn1Vw%2B8P1d6k2y8xuBsDXB2Ms4dLiVBYPeVO7xbOvIxEoPfdCDwreLnAOcaZftMtaIfFwBjNirOznOIQV57hC6LbTed1xGYuETjw7gjR2ge7zWiamxGTchtH%2BRqZj5KAswivVF7JVokRAUZHoqfEVkddxbwGYU5YI99z3DY9nDxRF724rSpzHBEmWtS21V%2Bu99oh04rbCcLpdXIMN7Pz84GOqUBF0FfWsovrZ2pwN93aXiwt7vG1fko0EjAVnv2Fan6aNyZp9gc%2FO34LG6Pp9kZG%2B9FvGWaI0o6j4%2BwmbktTBGensBHsI9iNuCWe6JXydXaSzmYKIDigDv1bO6oZjAwR%2FYq%2BW1rPQwjojlWF4mRqVokpCInV6Rtcr6U9LBY8udnROlC8sOc4YpDDrtUdy%2Bc5leQPZ5097cshFeYZxyp%2F8wnB2zMpgHQ&X-Amz-Signature=b77c44848a39e3d15838cfe435b8eb717b2da4fb5b897bef5fe953613e062152&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y436GZWJ%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T173417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQDadIoznwCLIdy7DIvMy%2FE90Gd5a%2FCrUTshkiD4jQH20AIgHM3pueegYf4B6CsDYoeNZhZOoOCe%2Fi64Ii7w11Y726AqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP48qUK9v5Bx7n2itSrcAxkbHdGReiHKn6bac2PLKorxcW546UkTJHc1BXtUhOhhMKafG7M%2F6tCh8gA97cMcvZGpPbpfvj5u1V6kWD3UeMUmIkTTY7vZ7Q4rOKCMcZfWQ6rMV71vwPoHZnTC%2Bh5hPggQGTgkbE7nyjcQqy%2F0bu4pCAx34bF24llQ%2B32OSTyRvMR%2Bf4bQ0JIHya8hnA1EL%2BNFUUDDRav7bbJK%2Bwce0cmVFRwXBwI4d%2FBnub5N2I6LN3071dY4U9cy1q3XRGvzPrXmBEN%2BrXP4ig%2BtMF4tFhkuULQgDQked0VuOoojgqzrDo3%2BkQT8UoBe1FsJ0CbpBMAthlnYIwc3hSXXYZ7Bi%2BOVaEKIGgQdTS%2FtXi6RITyzmy%2B8LKvgDEqtTQHMGieRnaj8wQPrjM4hA0r%2B4phERnrheNLqtv2zRPc4dbXhGHiCEb7sT5sUwJBtcd%2Fwvyib5gxg8bTqaM2RntpI7jm9IokJvTJovYA1Wk%2FZW9Lhfr853xfP5Lw5rcL6Q8J%2Fj21Mp9VgrVyr6bJbJNjuDKJmztPLYb%2F0IRv2ExlhOL6EMSut70qbXdSMlX2QBLqP4UqNpS%2F75p3ctjUmaPiQ7NiSj7c9G6KP%2F4a3t%2Fq%2FGmSge%2Fcz8NJkVpAb%2BsGqB1oxMIPRz84GOqUBYgj9qeuJ1sHKLjCaqtGohiuMN4g0f2hy9b3mCuPutFHnbs8u6U2GN%2BiskVMVpyT5KYctsUuuTVkAo%2Fp7UIoDGlvZLhaQv7DkYp93nfBsNktMA%2FjEyTzcn45eIi9z17CtB2qsJ4J4Bz4xM2dAujsJvZYKh4uTloFWp3TmWi9Kv6KRqvCMs%2BBT86zm4z13geWrgSgDZh55wCbSzQcPPozrmosHE6Xw&X-Amz-Signature=d98f5b150481d8f8fc48d7b2006e7e56ccf3fe8601d65d6f31dbaf075280e8dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y436GZWJ%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T173417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQDadIoznwCLIdy7DIvMy%2FE90Gd5a%2FCrUTshkiD4jQH20AIgHM3pueegYf4B6CsDYoeNZhZOoOCe%2Fi64Ii7w11Y726AqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP48qUK9v5Bx7n2itSrcAxkbHdGReiHKn6bac2PLKorxcW546UkTJHc1BXtUhOhhMKafG7M%2F6tCh8gA97cMcvZGpPbpfvj5u1V6kWD3UeMUmIkTTY7vZ7Q4rOKCMcZfWQ6rMV71vwPoHZnTC%2Bh5hPggQGTgkbE7nyjcQqy%2F0bu4pCAx34bF24llQ%2B32OSTyRvMR%2Bf4bQ0JIHya8hnA1EL%2BNFUUDDRav7bbJK%2Bwce0cmVFRwXBwI4d%2FBnub5N2I6LN3071dY4U9cy1q3XRGvzPrXmBEN%2BrXP4ig%2BtMF4tFhkuULQgDQked0VuOoojgqzrDo3%2BkQT8UoBe1FsJ0CbpBMAthlnYIwc3hSXXYZ7Bi%2BOVaEKIGgQdTS%2FtXi6RITyzmy%2B8LKvgDEqtTQHMGieRnaj8wQPrjM4hA0r%2B4phERnrheNLqtv2zRPc4dbXhGHiCEb7sT5sUwJBtcd%2Fwvyib5gxg8bTqaM2RntpI7jm9IokJvTJovYA1Wk%2FZW9Lhfr853xfP5Lw5rcL6Q8J%2Fj21Mp9VgrVyr6bJbJNjuDKJmztPLYb%2F0IRv2ExlhOL6EMSut70qbXdSMlX2QBLqP4UqNpS%2F75p3ctjUmaPiQ7NiSj7c9G6KP%2F4a3t%2Fq%2FGmSge%2Fcz8NJkVpAb%2BsGqB1oxMIPRz84GOqUBYgj9qeuJ1sHKLjCaqtGohiuMN4g0f2hy9b3mCuPutFHnbs8u6U2GN%2BiskVMVpyT5KYctsUuuTVkAo%2Fp7UIoDGlvZLhaQv7DkYp93nfBsNktMA%2FjEyTzcn45eIi9z17CtB2qsJ4J4Bz4xM2dAujsJvZYKh4uTloFWp3TmWi9Kv6KRqvCMs%2BBT86zm4z13geWrgSgDZh55wCbSzQcPPozrmosHE6Xw&X-Amz-Signature=689ccf485e0238dc31a11ce767c2dc16f776495b48f163c17f769b73c0b6c4b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663Y7IRZXK%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T173358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJIMEYCIQDGfZ3eyxwvOsKjIlyoI9XdN9%2FTA%2B2lwMF5PgjPUinQ5AIhAOUKo4mQNoDXciFG%2Bp%2Fv0PDQMkkBxjwpJKq%2FE5lUFnmpKogECNL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxxk%2BoOyXVxIKF8Ey8q3APCGjT6hjFCHTBM%2FFjJGqQs2TPL80CLQwDn2StwkHyDDAdwvGS0rYXshfm%2BTsUD4ruXRSmcV3H53ajY7zY3JRbO%2FPVZnCvcpwoNPHpIyJZtqLJnxV5kJSnXdNAewjNL1qTypPSFknfGnydtgs0eXQtA0kiFVJ0SUeHlNnZBb39ZQR9e48T%2BLV8DmLw0NY%2F2L%2BMbSF7dr1ATUmx%2FRqpZF%2FboGyipprz765QGqwdISsnjUXxavdm61u4IbCWVlV6oT7BBPpCjlNCXZozkUV6i%2BC172RS3oPXyEpvO258G1IGGCLOUBYuBWJdE%2BFuqMyHEosGm1MlmgBRKoUiBX%2Fumzdu9pm434meKX4K%2FX1A6p2WVk2Rhlbk8HQbl3rJ4aS0zsTRnl2nHQOr3dQ3ChEHiBdntqOD8MCwK52AdzvajfR3VZwayZfxHEUmMfDONbCu5QI3WsnjKcX3bV9e%2FW%2B5NlTz%2FfmxYUCORwLhiS0lxRkf36GNxkH8B%2BOdYpBr7yt9u0tBE8yHts2JtcszbpGG1Q7%2FSVa0G0C3J5ojuQA5kw5Ph3GIPNGh68YNW3o9Io9rHtxS%2BMPOHNwTEcZdR7LSoxF0TswbHMB%2Fk03in6QTu7AV8jipmmprMQvbx%2BKwwVTDq0c%2FOBjqkAcYrrnTraUlZo%2BqQnOXer1DXnjF0tRRoXkJPfPXQx5cAS4fY8hl%2BFEFuwD5CwN7GhnDxXotvIgyb4TcFjzesj%2BMG8kPdlAuK2p%2FAXdNEDH6E9p0RAbaCsFno81nKRaFAWigjsl4vQnceXjdXf5c6XbwmOgRlqEY7qOux1CC32%2F%2Bi6qL6LgH6kdx17oNO57fj%2Fxohv1U9LQDTFlgvylADxGm2fPSs&X-Amz-Signature=e0e3953fe24e42236d1bcf382543f3f17990715faac9b2e770189362b8d69908&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRY6HIXB%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T173420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIGXPveR%2FtoK88mgt1CChTTk4hv7vCNQWZC6RkT40F5gjAiEArDQs8mwH78v%2Bs3b%2BROtYpbCkBtpuJazfHHhAcVMwSYoqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC8tU2R%2B9m4brdo2ByrcA1O4VbdVj4KGljCPsG7aHh5PH1IBzaVEDkmHxRDSqHxQhygU9KwnofjHu%2B2DsvRCRklOylOQXQJIITrrJvjAuOlU1OhOzDLqdMnwtdt3%2FEhVSZDGCmdijxZ36XFo6megVvzZQOkNeAhjP75TIGfZs987tdH7R1jX4ATH0ZF1W5FKYHx26m4JBYyNozVk5w7xX6SvxNqhXWLmRZ0IaB43GRznf1PMRqYEmVQ3IWyynvo8lfaxdWTnuzN7X%2FMHMGS4VHoyyZNsDY4OcR%2Bb7ESxjolI9e%2BoCP0%2BSuh%2F7%2F7xxkpqJvXhoG8mFsflHKx9cfDw5DFvicF4dGMWaQY%2B95ZH6mnjuEdfyh%2F5z2l5swy%2FIvy6QV6aURALfNyNFK2Li66hfo5L%2F1p1s7jR3FbISQ%2Bc3AzulzeUZvfHGNU2fFRY3blYoS42TgzNTSbrAJB8lto9xu3tppFhD3K0tW68uV4DEUwbtepw0szXf8Gqs80Zp0opzoW41%2FqJc4iBZ7ayNg75p98Nko%2B8osWrWA9XbWd8OMzV9JtR1G32b2JAq0lJunh7qNcSArq0phtAn2Fwj3L70KguLzyE5HMJ%2BTG4amCvqz7h7WsWxcmcvw6Xej24ww656KnsXa3VRlv2IbZ5MJ3Tz84GOqUBvTc40LIHxjHw8LEavpqS%2BxrKWTirCwKcqu7sebWxswefadmCTySTQ6%2FWyVf16aIV2jVbyuTrdjcTjKzFOxCaCcE3F%2BUKJqJFB5w8KJtnOG2v8Zseigg6TFyc6FI6sScvY0PV4nRnGf7q9X3%2FmkUoiIN37Vtizt8JwVhIiY1Cheab9Qlq7vh9uJIGZc%2Fp3rJXco%2BdQc%2BOUDCE5Y2BixWxsaAaIiUl&X-Amz-Signature=4a52fff3259f74a7523fea270d3aeed96208cf5b36e275ee068b1d49624476d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRY6HIXB%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T173420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIGXPveR%2FtoK88mgt1CChTTk4hv7vCNQWZC6RkT40F5gjAiEArDQs8mwH78v%2Bs3b%2BROtYpbCkBtpuJazfHHhAcVMwSYoqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC8tU2R%2B9m4brdo2ByrcA1O4VbdVj4KGljCPsG7aHh5PH1IBzaVEDkmHxRDSqHxQhygU9KwnofjHu%2B2DsvRCRklOylOQXQJIITrrJvjAuOlU1OhOzDLqdMnwtdt3%2FEhVSZDGCmdijxZ36XFo6megVvzZQOkNeAhjP75TIGfZs987tdH7R1jX4ATH0ZF1W5FKYHx26m4JBYyNozVk5w7xX6SvxNqhXWLmRZ0IaB43GRznf1PMRqYEmVQ3IWyynvo8lfaxdWTnuzN7X%2FMHMGS4VHoyyZNsDY4OcR%2Bb7ESxjolI9e%2BoCP0%2BSuh%2F7%2F7xxkpqJvXhoG8mFsflHKx9cfDw5DFvicF4dGMWaQY%2B95ZH6mnjuEdfyh%2F5z2l5swy%2FIvy6QV6aURALfNyNFK2Li66hfo5L%2F1p1s7jR3FbISQ%2Bc3AzulzeUZvfHGNU2fFRY3blYoS42TgzNTSbrAJB8lto9xu3tppFhD3K0tW68uV4DEUwbtepw0szXf8Gqs80Zp0opzoW41%2FqJc4iBZ7ayNg75p98Nko%2B8osWrWA9XbWd8OMzV9JtR1G32b2JAq0lJunh7qNcSArq0phtAn2Fwj3L70KguLzyE5HMJ%2BTG4amCvqz7h7WsWxcmcvw6Xej24ww656KnsXa3VRlv2IbZ5MJ3Tz84GOqUBvTc40LIHxjHw8LEavpqS%2BxrKWTirCwKcqu7sebWxswefadmCTySTQ6%2FWyVf16aIV2jVbyuTrdjcTjKzFOxCaCcE3F%2BUKJqJFB5w8KJtnOG2v8Zseigg6TFyc6FI6sScvY0PV4nRnGf7q9X3%2FmkUoiIN37Vtizt8JwVhIiY1Cheab9Qlq7vh9uJIGZc%2Fp3rJXco%2BdQc%2BOUDCE5Y2BixWxsaAaIiUl&X-Amz-Signature=4a52fff3259f74a7523fea270d3aeed96208cf5b36e275ee068b1d49624476d5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XTU4IUE4%2F20260406%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260406T173420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAkaCXVzLXdlc3QtMiJHMEUCIQCbDshVg5JIErWR0kcKnr%2B%2Fa8GSyI5A7%2FP%2BhT0WDyqLNgIgMYiZxBPUcoTTFObD4W1NHmJ6rqrHuBlonb568sFcQccqiAQI0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBOVF5vAxoUf7fhPoSrcA5YDG7xBRn%2BRrdZE9eVMD2p7cM%2BFABRJo8g0WVXx0frUHG6Ko3sgXW2ZDcQeb%2BCGSuPBBZzLy1zITWtxF6EYIgC9XwBjJZtwh55YntcoHd5sS1niCoFEeoBn3Sw6SALCfQ%2FfoQoJ4O%2BFiqnceWEDeL%2FK%2F1mVkRPoaRKwBRl0WGqjLcMsWokyZwFo7JL9a6ZNn1TLxnjf6gcq5WxhktIsbkuTXKD6ZsM%2BCKzlHcQQSvQDRTj3yT9lljma1zCJGkMwdK6XYBq0tRF5XqmrH446R1osiSz0KfzkmCg1ejglBaHW0rruEmzA0KdTxdqPV%2FQarVkbDYH8rpy4sS8CRrPNt6hBdv9ftFTTrmeH7QeS18ksQRNifaCRvxAlxZ3Bxx34ScuZzmrgvz41jhSp0SPkApSY%2FsuFflwWevfb945kFiylFjMRAkrj4TOoM7PREFs4sbSTwIK2E8zfuqCvDZcuKmPI7020DDV9M5LGBL8NHrNthkJzmx%2FdBeGe%2BRbfoaZ3N5wDbSpDVqZYpnYuoRRyymccbp3arzJX6pGH9ihxjR3R9IhorUx0ebyB%2FkUKGX4Xo8YDb0tmrJa9ZgosmukrWWtwrH9G8eBTPGJldO7boTk%2BUOXqeGo%2BrJC7pasLMJfSz84GOqUBPMfss1KkqcvSbTmdxz8IOYN3DxZ8JphDlvu33k0uONELdrWbY2jrnw73Nise6hskcrG6QOkpUbfb2kjYuGe0UwewtVa0RVLqbrUCrRiV9CK2dRWi43AUi5tpG70Lh3Vf5uNe7lE1s0ZCxXzXUCs%2BjagaH2KiDJ3pA48dLjqENAaXVg4syw2QqgKimUQe3Wv28dmB8HOikOc8LFMvfIeDrOuMgf89&X-Amz-Signature=1ca7ff73ddef65ac340eaff585b676358f5eaf59c2ca1a312d3ee7afdc29d757&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

