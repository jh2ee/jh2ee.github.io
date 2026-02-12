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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2DVWDAS%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T153737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJGMEQCIB9hpOsBJbvS5DZgeLdeafsjKX6DAFTvIQnQzcpyULmBAiBPJBj9%2BJ95CSZeNUFVvSy2IL%2FWr8Q6sVoQAZ9Bj62HKCqIBAjZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbZuIyhfhRyhFC7COKtwDPeK6EKG9JnX7HQJZu2LXIj90UdB6lFYWkhxCPzGPsUdVptjFwpe5EWE6Sd%2BMcEejgZWaD4svNAwjb9HkQQoCIp1ymZ43NIJqqTtis9iIhQerGwBUPHb4%2FlrmScG%2BTTwjUpIb4f0ls3A3i8ekGuv%2BZCwhLhhbbPs9hQNPTwb8ntb0UDsxdfskhydZb%2F6iqcNvtEpaWgRnwHRrDA3PcUe%2BpiM9t6Ov1lDH2w01FujyP2vW9Qu9jujOLnLPlGXWH9irFPOcY7Y0ekbcyX7U16jgdZWgFT4u1TiGZc75zO986BjfqaTg%2BP3%2F2EHsTlghVUoaOpXe7RjEm5j824LhmPnqwdNlZecPdPCAYF54OX3OjnxuI7XH%2B9%2FW0DdZGDOrjQ7HnC6OlOzjKPJiSqPV0E8DwZCTCSa%2FWy5jNeG15m1byVOBt811COz484z6YYCx%2BktSTFF2%2B%2BEq%2BB2sK3xIjClWfDS3BxGBjzRo1uBDiU%2Ff9pKaYLRSxxX0uxOtAZ44AGnRSVk7skVcBoikoDet2BDaoENoMe31KXyfccbhsratrcR%2BvMte0mJHsmE7Fc9eabIQTm9YP3N1VuIYfwrKFfKKazFKDn3WkpW2y%2B%2B85djj3M1gQ7HwLIPzxNjuiMswheO3zAY6pgH6yxdXluqAxgtIDU8aUc462SR2WMXwkOphjfNAJ1JcxR%2FCmxzor7T6WvXrgyPW3yQtgo2XgTpd7k4tPpT4BsfVCJSANC%2FC16upmor%2FLljiLsB%2BEVj9iRVB%2FD%2FlDkloOWXqfZU%2BXrNKzVxo3F74K6JxJoQlvGUdXKIr%2FJD1UU%2F3BrqGOJARwuzFpALpFd%2BUu%2FgC03FbsZ6LWnTHXW%2FtN2PR30DV09rP&X-Amz-Signature=c6f40b72f06c23892485df112642e51a67c0e3cc3bf0de29a007db43db396804&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W2DVWDAS%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T153737Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJGMEQCIB9hpOsBJbvS5DZgeLdeafsjKX6DAFTvIQnQzcpyULmBAiBPJBj9%2BJ95CSZeNUFVvSy2IL%2FWr8Q6sVoQAZ9Bj62HKCqIBAjZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbZuIyhfhRyhFC7COKtwDPeK6EKG9JnX7HQJZu2LXIj90UdB6lFYWkhxCPzGPsUdVptjFwpe5EWE6Sd%2BMcEejgZWaD4svNAwjb9HkQQoCIp1ymZ43NIJqqTtis9iIhQerGwBUPHb4%2FlrmScG%2BTTwjUpIb4f0ls3A3i8ekGuv%2BZCwhLhhbbPs9hQNPTwb8ntb0UDsxdfskhydZb%2F6iqcNvtEpaWgRnwHRrDA3PcUe%2BpiM9t6Ov1lDH2w01FujyP2vW9Qu9jujOLnLPlGXWH9irFPOcY7Y0ekbcyX7U16jgdZWgFT4u1TiGZc75zO986BjfqaTg%2BP3%2F2EHsTlghVUoaOpXe7RjEm5j824LhmPnqwdNlZecPdPCAYF54OX3OjnxuI7XH%2B9%2FW0DdZGDOrjQ7HnC6OlOzjKPJiSqPV0E8DwZCTCSa%2FWy5jNeG15m1byVOBt811COz484z6YYCx%2BktSTFF2%2B%2BEq%2BB2sK3xIjClWfDS3BxGBjzRo1uBDiU%2Ff9pKaYLRSxxX0uxOtAZ44AGnRSVk7skVcBoikoDet2BDaoENoMe31KXyfccbhsratrcR%2BvMte0mJHsmE7Fc9eabIQTm9YP3N1VuIYfwrKFfKKazFKDn3WkpW2y%2B%2B85djj3M1gQ7HwLIPzxNjuiMswheO3zAY6pgH6yxdXluqAxgtIDU8aUc462SR2WMXwkOphjfNAJ1JcxR%2FCmxzor7T6WvXrgyPW3yQtgo2XgTpd7k4tPpT4BsfVCJSANC%2FC16upmor%2FLljiLsB%2BEVj9iRVB%2FD%2FlDkloOWXqfZU%2BXrNKzVxo3F74K6JxJoQlvGUdXKIr%2FJD1UU%2F3BrqGOJARwuzFpALpFd%2BUu%2FgC03FbsZ6LWnTHXW%2FtN2PR30DV09rP&X-Amz-Signature=c6f40b72f06c23892485df112642e51a67c0e3cc3bf0de29a007db43db396804&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664KLV2ESS%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T153738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJGMEQCICxaZWYCsGZUyK02twr2MObeZDdWqGsc4XMKowWoj4FsAiBCTszNOYaUxiiSn4UbfloWgp2HGMovftTFd4L659dGJSqIBAjZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMIfMCvKWYZBXF7kVvKtwDtVQ9VcHTmo762wkwUdxOZElF%2B0X3B4jlLGrX2cTGP2AOKoKlCWAgn5FEWvhafaytbEITsSK1IVfOsA9%2B189DG4zt21Q%2FftiG4JkDJ287c%2FZ8DDmAA4HatR8OSi4con8hMfwrUPxlj06lXnNUHNX1EYx6Il0LO6mk9TRUa%2FFNFijc4XnCRgsHjP7jbwaKlIWlJkk83DZSd%2FpmueJ0YnlX%2FPeTyc50EAitOHY2p1dgLr83Gb0IZZ7dUM2uKCso%2F22jXJ7TbHFdVAggnDAZUiFP0zdCrYvOIIeIqCe%2BmgSvSpnS87BRD4nJG6x7iN2NF5SdMRNXRc8B7%2BgV1FQ6bFfwZkggw0WfPF0pN54igAxgbC6Io4Oi2YIyWeY0l6SJWcR%2Fep0J1HAfgxth9z8yHA98PAuJMqFxXVxmlKo3gokdnio7oiciAhmolSKAIu0J5BfKxgXPt8f5HNX%2BA%2F590FJwJ5vSlpvFlKTQKSfCFfqdjSx440pKC14fFLdwRlm%2Bgba8YlF6%2Fy5vNPtLWCtehCaMEVJSXIRlcnb7QI7NpLmzu78qgY1HfCMJULdfttHldVbjs84qQToVT9Tje%2B1QlKjTgiBGLchaQv8LhC0%2BO%2F1MilYJpNbjKq2jxZ3gpCMwxOO3zAY6pgHgPvI0wd9RmHYqhosqr9ogJt1L8H%2FqV2ASilWqKc9RF%2FU9Pz3%2BjrLGIZ1lpFCgWyQ78OAWrF9enPlqhwa%2F7anbxtJkoCCwZ%2BXpvQ8A9YYF9fo96qqS66MlHXRY3DY67RJPR2bKYzVXJ4ggZadDS%2FEczsqBAmJfp%2BDSmHAcbEsE2Z%2FMq%2FvUy5Obo5R4jQJnxbB5CrzGEJzJBAasJQw3pxWh7MV42U6y&X-Amz-Signature=2bb7f5377b25498951706cd50b858b0b9408524fa0f0e31a4468224c5a320781&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655UNMH3T%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T153738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIDiwYxvJOA9SvHybs4NA0uhtBnui9MYrAu3NpY03SWb9AiEAjiMi77PI%2FP1brmlStQsLD6hq6mm9gZCKAGV2tYDzXucqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAf6EoC%2BhhEzvLMupircA2eoXLvPR09fxEal7xtO3HhgS%2Fj9p86znqUfgS7LeRPoN9CZoLb%2FVsGN3x2bmmwdEW8ERAR3N3mWYm6KyD2T9FqTKc4cG6y0LedNDE6LYc015AlPVkEanYkAaU8%2B0wZuqjfLU6rX557breT13Co%2FSHVQGHd4fp2Q0Aqqm5pC8Pi0JZa3WoIRODeAPSxUqPtSdIcOxN6ZqntbijMnrZuE8qqnUqV2ZaNOCqCorQJc9mRSgA2sFXoKXC7s0QPMvDE9GggNjRIKos2ogxqBhMewJd7Y0KgjJ5EKWPeo40Ial9efnKPgFwNUOc6YLhOWlgDokdu8TracA8wae6Tb2vnj4SF623yu96yAhGl1WYJcxxiAikjKXWUcK%2BQidlqLGX9JiaXKzGxpb59ukNjGneQ4TZCUy7nYdrFnfUc6j9dFhQuhXOVm5IMiRBNANBOD3ainwMNVqzfKjECQ%2BBAZjTsiYpWLqJACQCaezpO1%2BCAWKVbFf0LCvqEwdsdBebZbzybDqxWNI6r27bL2JOxlH0Lk7OF2QAmRwZ54ACtH8GB6Pt4dNZtVqI0kgDrLQb6KYwQVagmOzVYUG8zcRYhVAVR%2BatJztYZBYNcAFGrktgGpbnfxN0UcadIkifaAXBk%2FMIbjt8wGOqUBhRjNsvQOvEHcaH9%2Fc0Ay25Jd0d7EsknWLm%2BegWmeEov%2BU1g%2FHWkUB6v9wwtXmpWs5hls5lQuodO0T%2Fe9u4qmHVKEKy08ePmAT%2BTa2px2EKJ%2Fgs5mIqnqaTQO6flqTuzosrb0Zc%2FL8I2lxicBHfStkbUgLws4LGSMHuPaxJa9xjvaEqzZNwWWoIiGLRky9XgsS15a0ijBLexnRKgzUb6ObCpJ1EyH&X-Amz-Signature=c403da7a9fd192f43b3a4bb55b86bec0d86cd0a0fc7e7d18c71208a6c3cddba4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655UNMH3T%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T153738Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIDiwYxvJOA9SvHybs4NA0uhtBnui9MYrAu3NpY03SWb9AiEAjiMi77PI%2FP1brmlStQsLD6hq6mm9gZCKAGV2tYDzXucqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAf6EoC%2BhhEzvLMupircA2eoXLvPR09fxEal7xtO3HhgS%2Fj9p86znqUfgS7LeRPoN9CZoLb%2FVsGN3x2bmmwdEW8ERAR3N3mWYm6KyD2T9FqTKc4cG6y0LedNDE6LYc015AlPVkEanYkAaU8%2B0wZuqjfLU6rX557breT13Co%2FSHVQGHd4fp2Q0Aqqm5pC8Pi0JZa3WoIRODeAPSxUqPtSdIcOxN6ZqntbijMnrZuE8qqnUqV2ZaNOCqCorQJc9mRSgA2sFXoKXC7s0QPMvDE9GggNjRIKos2ogxqBhMewJd7Y0KgjJ5EKWPeo40Ial9efnKPgFwNUOc6YLhOWlgDokdu8TracA8wae6Tb2vnj4SF623yu96yAhGl1WYJcxxiAikjKXWUcK%2BQidlqLGX9JiaXKzGxpb59ukNjGneQ4TZCUy7nYdrFnfUc6j9dFhQuhXOVm5IMiRBNANBOD3ainwMNVqzfKjECQ%2BBAZjTsiYpWLqJACQCaezpO1%2BCAWKVbFf0LCvqEwdsdBebZbzybDqxWNI6r27bL2JOxlH0Lk7OF2QAmRwZ54ACtH8GB6Pt4dNZtVqI0kgDrLQb6KYwQVagmOzVYUG8zcRYhVAVR%2BatJztYZBYNcAFGrktgGpbnfxN0UcadIkifaAXBk%2FMIbjt8wGOqUBhRjNsvQOvEHcaH9%2Fc0Ay25Jd0d7EsknWLm%2BegWmeEov%2BU1g%2FHWkUB6v9wwtXmpWs5hls5lQuodO0T%2Fe9u4qmHVKEKy08ePmAT%2BTa2px2EKJ%2Fgs5mIqnqaTQO6flqTuzosrb0Zc%2FL8I2lxicBHfStkbUgLws4LGSMHuPaxJa9xjvaEqzZNwWWoIiGLRky9XgsS15a0ijBLexnRKgzUb6ObCpJ1EyH&X-Amz-Signature=d33a8a3beb0291e8e8964ac598d98d6292111adf727640538b79596ec6dfa6d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZZETPKTG%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T153739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJIMEYCIQDBM77Cj050sp8CWmD8RGthEMcW5OSQMI2g4CNHDfHUOQIhAJsrOjJCaWtEru5DBfUtwIoilB0%2BnucqSjQSdCxW7G1BKogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzuQqfZd6kHb6asG98q3AParHFiq0M4Qou1nAMzs8eXqqYydK0NaUpIvGXPQXdEDfvudzcs%2BNjpTmI%2BJ2tnnfloUAnSU80ECJkBSSH8CJuIbF9Mz2RhAiD4IQnoDTrKqaShqcweMUkcuDaTt%2B1u1%2FItCzPBpx9cpvVO1yPE%2Brbw2LE1xRFeiciEiFCSUi6BNtUNcjpQSSD5pZdSoQtdeveaphj7v7%2FX6hnxIRoN%2F7Nv8JqE6XGq2OTzueM9e8PNThVOkMW6d4AGU6VtOpPc7n1LQ6bW6rmdHvfGUEE6zw%2FUVB5pQJjHWPftpuYh0L0d5FAIE3IADUU%2FNSq9ldMMrf%2Fgk839Qr7TLq5aA30xUBjVxEkpoouuwcP1L2bw7SVz%2B8%2BXVyaj0Ac3uxwE2upirxZCqJ7VzMjtYiFnu1KyYWPidF6PjtiKK16f0PEfC80xy7TijeZtGauvwRrn%2FoELN1dtfopAk%2F1LJso11UmE6E6XWGUpf7cMg3bn6Vdjpi3ZEu9eWDRRgg1i%2B0X4A2eLRbAEdUkbnbnBlndH3Rzft6FF8vMt4DY102%2FMpawrf%2BIoQz126ueOhALN16OEL4DiQeAG1Vn5pBWgeRvs6B13JT8TI0ke0HJfoytM2vJvGzTD%2FO5Yl8Pr3JtIBIYhRjCe5LfMBjqkAUfFY3GZnMFAnq3%2ByddOJkGTudK8XDP7y3KnnXhxamTsuX7ZRTzqZzvTY8NFU42y%2F64HigTmFU5TXQKSqJMAMikchNzaT4Q5T0kyx9X6XWq5hug6fToCWWsJAEezGE8NavFR6%2Bv%2BIZooNm%2FPNJJ7kGDjvzOIx6op%2FmtVKcE3rR5bc6A1TYvtkkvjl4lVBJWGOKFzsVJJcweOUcvNGPFy9ri7GOVu&X-Amz-Signature=c936ae08305327afd79f74b6037106130cea2dbfd0d51b09c97e2fff3db926af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WDTEHPZG%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T153739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJIMEYCIQCeDas3aU%2BYeHX7k%2BOiZ3Hg3vBt%2FbwW3eGUeBbX0JpR3wIhAN%2FqNAGe3bWMWGKl8twoCtdJTZCb3IiBZx3hHkHBIl3fKogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzDnIsb2ljtWa2NsFkq3AM8ggQluQbfIR%2BlkbPqlb6PfELWyWS%2Bxb%2BuThEVZBvar1dgGhKfJrAdYN%2FH1MNn%2FLLU8oB7ZR%2BoPDfvQE3raP2ePuZovnwYiP3Oy0g97pZ4wrcmwW48g6emLcdTPSETVintJC5Ng15LmRTs2ZjsxBuxoJpq7%2F%2FNThTZ8w%2FSVyOzCklNcqsDV3wz4wkAMs%2B7TSaFzXbQomRL5m1D18%2F4alkQaeDQoI0JlYoFabX0MEdKGdQ%2B5JBzxsf0AWUKYtVfwpUzn6PiXesz48%2Fu5FG85P5AMCn2XsnUmFibvUNRi8wwr4bb3mIROaFlJ4ltIXY5HHPj%2BOpzVPzGUU0jUGNHAMdgmw0BT3n1VSRMA3gysXH2U8LuxgEuxgUshROvLXv%2BCU5AGBpbCtOjtSkyDbU7MkD%2FN1mOk36eHyo2iCsm2VKv0Iev66nN45A4cHiP74FqaONdjyh8vyhe6hNrGUQXcBkiYWfEmhRrcGhccdKAJE39Xa7eqA0In9w7Fp5tjGPiIm2uDjl18dCBYjQKLgHqe6YBcL0RnmDRTdJee5CXoh%2FKuI%2Fm%2B%2BUCd7unvhsw6SBYhRbhpuhZbAXdkC425kYj2g9qqS3Jvx3mJhIthooe80jPGl1atuHDVDphMXaJUzCt5LfMBjqkAeSEhsp%2FJpC34vHVqJz70LJXq6FZvtwfnMhv5nvLJm6WR6BtwLm3HRH6agxLXN0NwLiQeYcYkCX%2BZMPUjdE8WuQ1NK2PFLcoS4rlQD6isMCOIIhPnjAz8q2BIzf7R%2BZ1c4dCnZcQ%2FzihpvVkwRd5Hkt9aPR8xx0S9wvf2TZ1Xy2RLAkXUmOUf%2FqA2hxdbrndz1UfSUGg0e4d%2Bx%2FATYGDBXQDzIUw&X-Amz-Signature=6781f192d13c74988cbf7d5f0b2557a28e31674865d27fbccd7bb4c227991110&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664K5CCI5R%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T153740Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJGMEQCIEK%2BgNv%2BhwJHNNosn5rdSOAr0fODQtYnOpcAyqn3lOB6AiAr8214mRKO%2F%2FvHoTJh3HuMZ1gQS%2BzyYDpSGAWUl0EDpCqIBAjZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMtUoBwLKMg4SUIui8KtwDBA3dHOONrwIQ%2FyFFywP2CvH%2B%2Fnw8xZjFdqF7dHZRSF%2FD0kzXqivynhLxHG%2FBJ%2BDobUBc6ZGogWKEXpy4sWONmnhB3kqGbteRTVCeAtOHAbE19xq1qW6hCIp%2Fe4GeR%2BsGMAhFQNavCzcHhCUExvrF%2Bw5jePCijhA1di4KgNR3sQrOVpht4zqvjn%2BQ8QBvhjz4a2RAh%2BX1O2I%2FDnXLEyVJu3%2Fv4p1O4vHaDAYC325lNnoQMZCH6LkGYvAC0%2BLyL0u5ipGaCkRziTn8ybg1kAQWeVzAoo8bXk87UVIXeDDXOQwwNGf71AF5wwQwq1g4Wd%2BQeoyR42AbZWBJu7HOJ8KEc9g9y9qHgkoqr%2FaIxHBd34t5od0BU7q18vAkmXMSgEFutwXZrjLQxwUw4NknrMMyjECx5wsOgASp1mGS7k7XGu3qsIlAz3mLG%2FZBhShpiXCr18uVXDQUM5g1vzRwEb%2BCREz%2FimqdV1TQUogGWBopWfweY1lZbzJsebquTla6NpW9vW1GfjvLohHYhHyOiArPvy4KFOq7yotaKfOLTg4t%2Bst8sY%2FPA7nA11KFhkXbQpJo%2BjaxcT9jS%2BdRIasc%2BYa0zvtQPRVBwDGjJimszUH8NXGaR24HnFyppuGXbGcw0eK3zAY6pgGGjQ14mSd5DyV0qWdP%2BJEK02eCcMgHovgZkYbeMdVNRkm5B6jj5C8%2FxNWr0zwnrsvIztjaRxSuFwPOQKHxOwVJjS9zvZZFx4HkAHH%2FF3nijxT%2BiqEMraFtYxtwJzjtRZbi7rePf9IFP1Rr5FCfWBYu%2Bt5AeZHRhvj8%2BJDdzRIhMUuYjtYuYHk73LKzFhsMUvHQ8velhmZlMRY71FEU%2FqYKlsOCvHDN&X-Amz-Signature=c4f48e23b75d96061639e594bf41e12e3a8ee7346f58b65a1d7926c2307f6c54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMFGRY5Z%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T153741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJGMEQCIG4q4FNbXFe86JWL08oCj9hika6s5rTl80UJ81fwS9GqAiAGbHIr5KwLZjYfKJLeqAGLByg5pJ7xBz6BKVCePf8TlCqIBAjZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsdlxnKjBF1FwJfjGKtwD%2FuORgPkx4dRpP%2B%2BZOGLHIqwJhSp0b9wwLL84CgV7IKEr7CbuWNqZqjqS1bD4RE%2F5t07FvUiTe7RBnoGgm5tPefaHi9KpUPDRRVrvRIaXVgG4izccZbcyvh%2BtrYAG6LoZne%2BnwpXFQfukWiXXJaZUTWMW0FOzo4OlvBatdpZjpfIAbr%2FnsPh0%2BFggaG%2BKrOpyjZHLfdmzx%2F7WRIpEIXWLAg0VugwZ9pGCkF0p1%2Fa6MADqk2%2BZTXB%2F%2F5ikYw1%2F2q5vAv4DTRcaA2UEI3Q9tw5TOM9Tzk9TQzySqg6ELbiZAxgeGEtm%2BaSR0hL0Eb9w%2B582d%2F%2F077JZwA6%2F1Ghq%2BlizoTB3HYg4aZ2xUgzbkZyktPQCkV%2BmMuA4CWyGykBFkqli57fLGyomfXREL7%2Fr5ICSKPLN%2FPFzo0otew5YP726qXFHgJLLEFJREIsvNyHT8hY0r86Jdr4uJJoeBVJeH29XmiKplLixvuySlAjx%2FFUjJLD%2Fa0Dr%2FvWnYA5sb18paHJLJKifIc91YIVyMckMkYnDg8oV0ouQaPBONiGN7Q8NZFtkustBQSZMl7KGDOlLMnP13mX11Vzwr0Iuquk2CqTJ0%2BIWnFoSP6Ffn3O0ZLNdE8I2fvBPBQ1OkOWeXg8wn%2BS3zAY6pgF8pKiwvIRvCn6KVcSszt5Ip3dy%2Bbt9y25K5JabQ0ZMQ%2FA%2Ft4LhUzU5%2Fxk2vtMcx%2Fl5GEXGoo8nT0bZSJX40r5Tu3EMruDCmxnT5KXef%2FKhavk0%2B9cNzvXvpyRNu5ZHVqUCjMjvNR%2FCz6ryA%2BtXpSJigeVQaBs31X4PydpZLyHwyB9Uu5jdU2IIH2t0dDMmG5KEzqR4SX2Z4MdSMKhQ8FhSpvr62j09&X-Amz-Signature=baa98b85acc1988263b43a5edde4b34d820e710b52f6e152570e7c71189087f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMFGRY5Z%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T153741Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJGMEQCIG4q4FNbXFe86JWL08oCj9hika6s5rTl80UJ81fwS9GqAiAGbHIr5KwLZjYfKJLeqAGLByg5pJ7xBz6BKVCePf8TlCqIBAjZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMsdlxnKjBF1FwJfjGKtwD%2FuORgPkx4dRpP%2B%2BZOGLHIqwJhSp0b9wwLL84CgV7IKEr7CbuWNqZqjqS1bD4RE%2F5t07FvUiTe7RBnoGgm5tPefaHi9KpUPDRRVrvRIaXVgG4izccZbcyvh%2BtrYAG6LoZne%2BnwpXFQfukWiXXJaZUTWMW0FOzo4OlvBatdpZjpfIAbr%2FnsPh0%2BFggaG%2BKrOpyjZHLfdmzx%2F7WRIpEIXWLAg0VugwZ9pGCkF0p1%2Fa6MADqk2%2BZTXB%2F%2F5ikYw1%2F2q5vAv4DTRcaA2UEI3Q9tw5TOM9Tzk9TQzySqg6ELbiZAxgeGEtm%2BaSR0hL0Eb9w%2B582d%2F%2F077JZwA6%2F1Ghq%2BlizoTB3HYg4aZ2xUgzbkZyktPQCkV%2BmMuA4CWyGykBFkqli57fLGyomfXREL7%2Fr5ICSKPLN%2FPFzo0otew5YP726qXFHgJLLEFJREIsvNyHT8hY0r86Jdr4uJJoeBVJeH29XmiKplLixvuySlAjx%2FFUjJLD%2Fa0Dr%2FvWnYA5sb18paHJLJKifIc91YIVyMckMkYnDg8oV0ouQaPBONiGN7Q8NZFtkustBQSZMl7KGDOlLMnP13mX11Vzwr0Iuquk2CqTJ0%2BIWnFoSP6Ffn3O0ZLNdE8I2fvBPBQ1OkOWeXg8wn%2BS3zAY6pgF8pKiwvIRvCn6KVcSszt5Ip3dy%2Bbt9y25K5JabQ0ZMQ%2FA%2Ft4LhUzU5%2Fxk2vtMcx%2Fl5GEXGoo8nT0bZSJX40r5Tu3EMruDCmxnT5KXef%2FKhavk0%2B9cNzvXvpyRNu5ZHVqUCjMjvNR%2FCz6ryA%2BtXpSJigeVQaBs31X4PydpZLyHwyB9Uu5jdU2IIH2t0dDMmG5KEzqR4SX2Z4MdSMKhQ8FhSpvr62j09&X-Amz-Signature=31ad00f332b084df768a0c286a1c2aeb05dc67d87b869b9f864c09a4c0acc3d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDODDLE2%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T153735Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIHf%2BtzaVr5WxfpUMocjP80OTPUi32OFqN68roeiZ1PtQAiEAnLRXistDBxL6gfvFy67EOcN0H5P9TjDsltgsnCNrveMqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOiwZSYhDyFKRG8jCircA7byCaKiWpuiJBG5M2Ju6pHsejuCpBL72dFR%2BwRsrE14lma77uTEsWes%2FpMS7GHt%2BTVN78uBjf5UhWsCTpp9tjy3RnvPzmyvT3Mx4U1GbZ4JWMBf2twPWtx1TV99Ouf2eeb4P8s9uNuJfWH61ecfwTUuXiZLxN7yVAB9LG1ptYXDC58sTB8O1CouLhJDLn5s7x8%2FxVD%2FVwCUc7%2BByI0wdzwZlreaoUkDYubulTbx8VGxE3yR8wVvV4pGOxwJu%2B%2BP1g4rShVdk3d7cJFya%2FSBMwZUDoalM6i%2BcIAUyBw5oCaPNLB7MbFEMTWNcpMuqPyT5PJt0fChrJZOfUxRaoSYypocHxl0AUVlrR2dRBIKkIuQrslrcGnx7cMDvcskwKh1s3HsQ5vslK16NcF7mBWZuJF8E6pRCo3La%2FwQI3J1X7Gpwo1eUQRuK%2BHD1H90Wy%2FQMrJikwrKzGvYPT5mn%2Fob26gMdOlmW7m%2BTO2dRy%2F6pLsypb9bqDOA3uFXH2PMFRcfDG%2B%2B1en8ZVDLJI8oZZxVlFmlUvMxTJx05kyIT%2BPnB32%2BdF%2FoS2320ZulKr5JSiExbp37Tw7jHaOHPiOVggkZc5glIAKpWKmkgSluglCCcSFqmKEEtcLCRChg57HbMJnjt8wGOqUBOJsT9x0vmo5CYQyTAOs%2BQksFGaevpUHe87%2F2gHZ5PoFMoaDyAS%2BlE2Qs%2B%2Fen%2BWihZ04P7Wjv33X3ypikT7ea1SM%2BFUPdczJbY3kiSYcY1olx6CYLBHPdT6gcaGKiM7CFN7Kj47G7SgNW2uSix3cgp7YQusyLgRATL5hjKA%2F7a3TnVssYxlWmSAEMiLylEUyrgt6vepwe0flfNpF3nZSvxOcKWNmV&X-Amz-Signature=0a1d29d00c05326ec0ae28b45cbd79333f51e327f246d4d85ba6740049598851&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPRHQ2KZ%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T153743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJIMEYCIQD2P2qagSidQ89g5QPuF1%2F7TgnyyU6r2N%2BTRPPikTi%2BmgIhANWpCv5tLC%2FDJgPCSAq%2BYKblpN%2BsRH%2FkIrVb7ZiQzRPkKogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyTR7cHP7y6D38y7hcq3AO2h5YYCLMaDY7cXx67qA%2FzL2MA1k%2FGmIhnUaEx2wBiV9KbM0rF2XXJoeFk5wY2572wiQwvaCu2LBjTKEHi6EiyKPet%2FaEOiEJtbxUwkilzIY2nthZq2tHxsxLrZ%2F%2B0q47Ju0J060PTR4sSjHORuco%2FqdK2DroSmZIunzz7wuGXaENUD3cw2TlZyQPgkT1eiEOHnk9bhhV7UI9lxLAWMrHbkNus1RGFzlGioGTFYTEZi6QKt78dePb8w9hiB5m8MZTzmQfBwyJuIH0DKjxbfepu2Xm0oXKRXaTB4fzZ1ME1Bz85uLidUpdofBNXZV%2FL8u34VNF8FNZlioiBKGWdjGmbedf0hPyXthen%2BDT7Zuva%2F0PLP8%2B0SSVK6%2BtgGsVWZnL4Mlj2Anvp11h6QtnPEzPfWKXY%2B7e7FoB9Tj4MaEwQFuO%2BggH3t%2BsLF0RVD6FoBMOja2G858so0aHZ48qr5Io7ckuO9wlRTRUz1tNgQT9pNmGzjoGmsOugzjqghrE4nOlsTBOtiLlBHxySlzktgYwYAUhhDL%2FMvg%2FFDOcaiete4mOEuGOcOAGhswprzWbkZB3e4ao2p7mhhcmM8Dr97cq7LA4k8wyv5jniW64HdTPeVcqzNFAXrpAZC8fR6TCt47fMBjqkAQZMS7hb321rVgC0Sn12nM9W5VpQkoKOg2Ag5E0uqXb05Vf6mN9uToIN7Qc1ZboOdMen7jOgoEcs1kI1vy%2Fp8ym8ZZM01dOn2BC5dHcjF715UIfETEyH8DE0SDGslFTbDN2PlNdZANB8HRdLXhYqeQ47DIyPYS43z039op2fF0Eq9MarQTazd%2Fl%2BXDl79a0236W43HYr2552zpOBaZny8rloIxZA&X-Amz-Signature=1c881973d157a8154356ff9c67ed81bdee15a2b4e22e7ae89c5d09ac78f61cf0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPRHQ2KZ%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T153743Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJIMEYCIQD2P2qagSidQ89g5QPuF1%2F7TgnyyU6r2N%2BTRPPikTi%2BmgIhANWpCv5tLC%2FDJgPCSAq%2BYKblpN%2BsRH%2FkIrVb7ZiQzRPkKogECNn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyTR7cHP7y6D38y7hcq3AO2h5YYCLMaDY7cXx67qA%2FzL2MA1k%2FGmIhnUaEx2wBiV9KbM0rF2XXJoeFk5wY2572wiQwvaCu2LBjTKEHi6EiyKPet%2FaEOiEJtbxUwkilzIY2nthZq2tHxsxLrZ%2F%2B0q47Ju0J060PTR4sSjHORuco%2FqdK2DroSmZIunzz7wuGXaENUD3cw2TlZyQPgkT1eiEOHnk9bhhV7UI9lxLAWMrHbkNus1RGFzlGioGTFYTEZi6QKt78dePb8w9hiB5m8MZTzmQfBwyJuIH0DKjxbfepu2Xm0oXKRXaTB4fzZ1ME1Bz85uLidUpdofBNXZV%2FL8u34VNF8FNZlioiBKGWdjGmbedf0hPyXthen%2BDT7Zuva%2F0PLP8%2B0SSVK6%2BtgGsVWZnL4Mlj2Anvp11h6QtnPEzPfWKXY%2B7e7FoB9Tj4MaEwQFuO%2BggH3t%2BsLF0RVD6FoBMOja2G858so0aHZ48qr5Io7ckuO9wlRTRUz1tNgQT9pNmGzjoGmsOugzjqghrE4nOlsTBOtiLlBHxySlzktgYwYAUhhDL%2FMvg%2FFDOcaiete4mOEuGOcOAGhswprzWbkZB3e4ao2p7mhhcmM8Dr97cq7LA4k8wyv5jniW64HdTPeVcqzNFAXrpAZC8fR6TCt47fMBjqkAQZMS7hb321rVgC0Sn12nM9W5VpQkoKOg2Ag5E0uqXb05Vf6mN9uToIN7Qc1ZboOdMen7jOgoEcs1kI1vy%2Fp8ym8ZZM01dOn2BC5dHcjF715UIfETEyH8DE0SDGslFTbDN2PlNdZANB8HRdLXhYqeQ47DIyPYS43z039op2fF0Eq9MarQTazd%2Fl%2BXDl79a0236W43HYr2552zpOBaZny8rloIxZA&X-Amz-Signature=1c881973d157a8154356ff9c67ed81bdee15a2b4e22e7ae89c5d09ac78f61cf0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRYVIEIK%2F20260212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260212T153744Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBAaCXVzLXdlc3QtMiJHMEUCIHH9oTpmH0HPCuzwAFRNOFIFGD8lA%2F40lFGr0vm3x6GAAiEAwc20BQybUSuDi%2FdAchNuwaQVw22x6XJ1sIRqXbjRVSYqiAQI2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJac1ZxnxF6M2h2NSCrcA9UEX%2FegtCR3d5EmprsHM8Wh6w80MSKgSHDobBkt4y50yUcOoZCCpVi8IGTdtCkO1SZItgPhAAYRMPTfDS3OlG1vKNLK5JXeMnnyXOvo0iuESgpKVSoP%2F3rv%2FIBUAzkqg33rFruJ2IlPHliMsIHSSEN2Yl8JcAdcHqegzv6tmbaac16X5aWfpQA2wtixOVbUAfNF6%2Fqdxmjk%2BBJXpqZd8TwzNXOj31maPWykLliJggQNTcqQB4%2BBrVTxsth9GpROY3tA5ThgJh%2BLzOy5hmSBsIjEZu2ZTZ5Xdw2IYHT08d7g85fm2ijOy2QQI2%2BLwFRckxALXvMPfCjgLmmQmiX0ByPFT6fXQ%2BwJmsVvlIrVvHu74bIrIrPaai6pmyKYTtPB8YDQEbIuMbrpUMV3%2FOYNtiG2lmjmYTAv42ud3E80B1QafNWeFaXT%2F3uIWWBXL9S5%2B4Y5en6%2FMq3wPIOpQsuuT9AFSrgjrotu9gzyhOmloSj4YnMhPKgbpCwN5%2F3A4vcsgOATLBG%2FMsrMm6kW7PE5HHRGNR9Q8BbzKEQGrDuBP%2FioBSP8pSqvwoa618lYqetS9Lfduey8hGRIiQbco5YSp3Zq9KhD7CIK5tDzZ%2BY7vXIodwGS%2BSTCjibgMAo6MIvkt8wGOqUBx%2BIYb1kj8xC9c0cra%2BJMN0TlfYWhrE%2FMBql9ptQaas9Rziv9xb5mu2eZpIibF6LDzDXi2yBJWqtJ%2FOTT87qaH%2FBD6GtlijJDpuG6Ur7%2F1DWqTjV7XVkISSQPt0xQ99B02ryWsxYpDm6BGtRHj2CzdEb9tSXGEkfQzZ8WNAo%2F%2BoDR1fARUpuaWlTetASrH5fFTiiD24nDYWrx21tK%2FXsbGiuo9QO%2F&X-Amz-Signature=c6f548fe195230350b784e660de5adf5fb681a9e25eb14a5298e5b1820e73aa1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

