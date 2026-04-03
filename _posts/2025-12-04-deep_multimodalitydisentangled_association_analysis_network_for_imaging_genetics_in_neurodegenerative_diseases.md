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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UL5ZETXG%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T112747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDFIUY%2Fiv5M5%2Bq2BQzqT3MdlffvLDoKK45PrYMn%2FN8JtAIgBDtXDSad6%2BvSUeXWukGxhBsVudDLOZvVStgc8HrHyPYqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGTIAujEUKpPj9h4NircA1ZHjkxYXdnKD3Tnt7dAHPut287EvVY3wUBNuMUdgxJZI3tXFrkGngVK08AKXwHNaudGmKAaKhmU8FLJ8FBWhf1qrAd7No%2FCq71b9NwbDbgsGCCS0Vsf1i5We7MaJSKkHgE5JHmp9ujmwrOoJrlhVUBeAbRoBqFWvRhDmH%2BipnsxRTm%2B9vMfXCecMYfgPnj98y9vMNEoNaThyaLvABLFetqsB5esZiO1JXL%2BJtVRRdmcVP1AOzI48z80ROf%2F3fctT4Z1Zj9LBgbDFn4C0ztxT5N7fjGlD6xyq5xu290Lcbr9mUYYeFO4lniZOB8EQPG5nfhPVIkJpx%2Flo%2Bl89V4jxuKP8LXEiWbNM%2FMB6ecnyfaS%2BMYQMAx6ueG9PPRUZNr%2BvPVPmLHboBOIm8JdWD7fCDhF3WApFZv802OifwHlU2d4QOIcAxM%2FFNN1cgCC11Ppe14KQiBAQPL9BTF0E3%2BiA2WNRNaHKwRKfYiUv3kKpz2JGWkdjGwkDeAJ7zm%2FIQSrNFCso1clqcMvwiciicDjkjpjQ9ekigG3Xg9wRXfkPGzwBf6GSw8lblym%2BC1VaZNsyYFYr0GdQRP0%2BqYurhiGMQlD1EfNK7dgfAc%2FUhGfJ9q71h%2BXlMCzTJRgKmSOMLj%2Fvc4GOqUBuwxI1kXEtlKSoLFiNAbLNKG3incnmXTh8JF4pdQqq%2B6bi9uAeQI5VeUsaFuJ9rYApGBMOIm%2Bx3hmEry3GOW0IDKh6aONmWBPuCwbmJXmtu9QMi8xFhUFtdR44X8bhlv%2BfkUinPKGTq%2Fjurb5bzOfNDIaVwrU6xc5dKWtWNhwg1bkxJHZu8g3pl4i4n84DhU8gtf2K%2BXCE0oatOKOfky2EGS9WwEM&X-Amz-Signature=6708893ebfe4fbf1a10a1f6e8fda3e5aeb47270226662dc8f016dac7e290ee12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UL5ZETXG%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T112747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDFIUY%2Fiv5M5%2Bq2BQzqT3MdlffvLDoKK45PrYMn%2FN8JtAIgBDtXDSad6%2BvSUeXWukGxhBsVudDLOZvVStgc8HrHyPYqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGTIAujEUKpPj9h4NircA1ZHjkxYXdnKD3Tnt7dAHPut287EvVY3wUBNuMUdgxJZI3tXFrkGngVK08AKXwHNaudGmKAaKhmU8FLJ8FBWhf1qrAd7No%2FCq71b9NwbDbgsGCCS0Vsf1i5We7MaJSKkHgE5JHmp9ujmwrOoJrlhVUBeAbRoBqFWvRhDmH%2BipnsxRTm%2B9vMfXCecMYfgPnj98y9vMNEoNaThyaLvABLFetqsB5esZiO1JXL%2BJtVRRdmcVP1AOzI48z80ROf%2F3fctT4Z1Zj9LBgbDFn4C0ztxT5N7fjGlD6xyq5xu290Lcbr9mUYYeFO4lniZOB8EQPG5nfhPVIkJpx%2Flo%2Bl89V4jxuKP8LXEiWbNM%2FMB6ecnyfaS%2BMYQMAx6ueG9PPRUZNr%2BvPVPmLHboBOIm8JdWD7fCDhF3WApFZv802OifwHlU2d4QOIcAxM%2FFNN1cgCC11Ppe14KQiBAQPL9BTF0E3%2BiA2WNRNaHKwRKfYiUv3kKpz2JGWkdjGwkDeAJ7zm%2FIQSrNFCso1clqcMvwiciicDjkjpjQ9ekigG3Xg9wRXfkPGzwBf6GSw8lblym%2BC1VaZNsyYFYr0GdQRP0%2BqYurhiGMQlD1EfNK7dgfAc%2FUhGfJ9q71h%2BXlMCzTJRgKmSOMLj%2Fvc4GOqUBuwxI1kXEtlKSoLFiNAbLNKG3incnmXTh8JF4pdQqq%2B6bi9uAeQI5VeUsaFuJ9rYApGBMOIm%2Bx3hmEry3GOW0IDKh6aONmWBPuCwbmJXmtu9QMi8xFhUFtdR44X8bhlv%2BfkUinPKGTq%2Fjurb5bzOfNDIaVwrU6xc5dKWtWNhwg1bkxJHZu8g3pl4i4n84DhU8gtf2K%2BXCE0oatOKOfky2EGS9WwEM&X-Amz-Signature=6708893ebfe4fbf1a10a1f6e8fda3e5aeb47270226662dc8f016dac7e290ee12&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDRRBQNR%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T112748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCfHl3iJlsBOMe3vk8YGyviy8wyRCFGDfYinLew0hGWFwIhAL0AUr97LvMTp8eXLhbyZZEffAyjlSnXZEur0VflkB8HKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwz6FR6DsjN7ffXTpsq3ANbX7AKEmGYC8KOyGpWgYP2dBB6hmDSyY89Xxq1NucMRJKqKjFEkINr6HyxSN1UxBTJdXkp9ovF0mewGbmxp7KZHd7u%2F%2BeZ4S0E49WXlKN%2Bbxw7S3P7e2LbrWfMtJ%2Fb1yQQ9RI4uZXGkmqZbjJwzDqtPk2DbmhcjsamplAJty8vX%2F4vZmru5VdhOA2kdmc3lrin80hzbRMFYb122aNQRUZI2HRJffCWWOWdpN6SzlBeBiGJYSk2B85lHtBOp7P1mxu8Z4cmKHvBQjAusfdA50bvJzTk3A9DaPIyrMByr9unq4z9L64dZiCmPIckWkTaRKde%2Bjz3qeZFvUXLo0mGGm6WAhzHb6perIFP5a5nUefQR2SOlFDIalOWlqhgNOU%2F0YOAe9GUYm2anSZoBOsRhnnndpxSHEM0GRUgIzJqcIvsEod9X%2FdKD9DLxQK1VWtZVK3nCaPROZ91ztUywLVHUSh7wfZW%2BKH0FB3Fnd8M6WC7PiFLqwenRaAm92F23mNg2WB7QZvDjN8rpo0gUEau6OHzO1ISyVPE1JU6k1VhKhdNQLn%2BjO0W16j5Qq8le7QokpX8trDPC9%2BfnxoR4PlpuUH8wehELL%2FeJoOP9XxMyQaVhET38WyoPPOyhREzHTCA%2F73OBjqkAcC%2FXSr3%2FkNKnhZD8ZyMMoaBAQvfJB%2BOuyPNMSAdIcwmAjOiYACX3PjIZrnm0dPMx0%2FP3FeqzfCwGRVHoVXMVlpVEd9VpEQf7%2BszjI6cMDeMJX9Gqv9E%2BZ3Ev0FlLB%2FQxYisMMPhR%2FVUPbgcfCazu9v2JYQsdIA1gacniVEwi7pRnxFyKVr%2F4fyobWS6flCWY5FDzkq4j7Kcp7zbCHyt7WqjEVu1&X-Amz-Signature=359211aee8946a578194486bcab9ba9a04db038c150990c954b8a23c4da28333&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657KPJYHX%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T112749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF6oloL6NhYc3k8Ol7iR1S%2BU7AQahlopOV25EvRsf2iBAiBiJoRPJFsPMBFae2pZhEFYfkcaX%2Ba15QL64ma7e%2Bvv7yqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnAVnzRxORPIEiPh%2FKtwDyHj6kVucGFUVBLOf8zeyYZ9TfU7rMeuaUTlmNrQBKf2KNZpm4SPRZ4xrT6xpO%2BQk4V9kzHP3Wy676akoIgNhqxrNie5%2FVcnBYzTlEHeH%2FSVR2woEP2pCWvB3wbOea9biH5gA%2FsNxoUJSwI7MntpgGqBz8IchwZGuLkzQaG%2BB58iUVPgTgHBCWfhOWit0LK0bDlFik9YMQy5SsCPzwRN%2BcV%2Fm1Bf1mMNV6IKtTRjMJqYgr5m34Bx3IJjgWC1tJnG%2FUYnlEqkfPuDhkRq41Ur70jL0qex%2FOIKAJTEVtUYhXtYC%2FBncq9OhyEWpLFSNFEHIGWn4V%2FTIlv5eRCcyGWOW82ycWqg%2B49L62PsMnakmauZVvEf24DebMjIeeHSfCcCtGS2RD55bgYU8p8mi98uS7CsGivcmqHQMDB9AqlrzTwdK%2Fa2NJmZHErA0bzYzeQtwit5YGr0QkanGpCYknxaA80aoOjQu6FdyYGnAr8ZteUV2Bl0UEjYKsDmrthFCIfWjfMx4jTmUhYMimSb3pEHMbYscngXeWZtGEUw%2B2qGK61YygD1cqXGFf%2BcI24r1T%2FEmf1aXOmsLVvWcZJR0WPpXHvktXL2NHOYnfh7%2BiM9DFyQ8vuEQh7%2FXsNQonygw8oC%2BzgY6pgFniJ15%2B93Mxcz0CYQqI%2FuhQBQVdP1Fm3jUSiZj%2FqrHr%2F4iUbLw75d4LL57zGT%2FlD%2BFowHDfd9%2FXjvroG2NvVlzTXhQAY7ZFhtJBRrmIR0BAmVzpvoZaJYeRQyCjsKlzQnNmXPfMQNk1sdgEDFA931wCEc41kJPYuouwUdnH8MX8yhLEqG4WKE0uu7uqbyB1zg2oR6%2BbhwYb2oLZ4Sx55vakkE0VUS7&X-Amz-Signature=644e2ce74f6a1b2f0b588f5aa95cce857f9751f53ba4ce1e1aa935d44b0c5265&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657KPJYHX%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T112749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF6oloL6NhYc3k8Ol7iR1S%2BU7AQahlopOV25EvRsf2iBAiBiJoRPJFsPMBFae2pZhEFYfkcaX%2Ba15QL64ma7e%2Bvv7yqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnAVnzRxORPIEiPh%2FKtwDyHj6kVucGFUVBLOf8zeyYZ9TfU7rMeuaUTlmNrQBKf2KNZpm4SPRZ4xrT6xpO%2BQk4V9kzHP3Wy676akoIgNhqxrNie5%2FVcnBYzTlEHeH%2FSVR2woEP2pCWvB3wbOea9biH5gA%2FsNxoUJSwI7MntpgGqBz8IchwZGuLkzQaG%2BB58iUVPgTgHBCWfhOWit0LK0bDlFik9YMQy5SsCPzwRN%2BcV%2Fm1Bf1mMNV6IKtTRjMJqYgr5m34Bx3IJjgWC1tJnG%2FUYnlEqkfPuDhkRq41Ur70jL0qex%2FOIKAJTEVtUYhXtYC%2FBncq9OhyEWpLFSNFEHIGWn4V%2FTIlv5eRCcyGWOW82ycWqg%2B49L62PsMnakmauZVvEf24DebMjIeeHSfCcCtGS2RD55bgYU8p8mi98uS7CsGivcmqHQMDB9AqlrzTwdK%2Fa2NJmZHErA0bzYzeQtwit5YGr0QkanGpCYknxaA80aoOjQu6FdyYGnAr8ZteUV2Bl0UEjYKsDmrthFCIfWjfMx4jTmUhYMimSb3pEHMbYscngXeWZtGEUw%2B2qGK61YygD1cqXGFf%2BcI24r1T%2FEmf1aXOmsLVvWcZJR0WPpXHvktXL2NHOYnfh7%2BiM9DFyQ8vuEQh7%2FXsNQonygw8oC%2BzgY6pgFniJ15%2B93Mxcz0CYQqI%2FuhQBQVdP1Fm3jUSiZj%2FqrHr%2F4iUbLw75d4LL57zGT%2FlD%2BFowHDfd9%2FXjvroG2NvVlzTXhQAY7ZFhtJBRrmIR0BAmVzpvoZaJYeRQyCjsKlzQnNmXPfMQNk1sdgEDFA931wCEc41kJPYuouwUdnH8MX8yhLEqG4WKE0uu7uqbyB1zg2oR6%2BbhwYb2oLZ4Sx55vakkE0VUS7&X-Amz-Signature=ea819f523b3b5fc29fa34705a64ae2f65e82f508f197c7a56fc86c5ebb01543b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZDJWFNKG%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T112749Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCIkXmrZJslMU4HsJVkA52NxE0xFINMub%2BZouwgIdXcRAIgUZdxAIOtcxX7stYgoYYS2Q8E1p3L5XMLAV7SPUsUyS4qiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK1%2Fx%2BD6Bin7d5%2FfsircAxEJH8eTApeGroeIcqLm1%2FedbupTn5NipQrrz6xaHj1vM946NqA4AkVbDDYWMgifeZLtdfK%2BJZNSRnsb1D0WbxZ7hGhX3qkVaH6Zb%2F6g%2FiY6jKeyfoR54NNnvTq5xMAJgUGRHfM7EKqOXMZ%2F2NqHq6AQ%2BRvOlnjefwrlbla8KyivMt88hXpVG0reI%2FXrX4GiOPhZfMgXgm2jodA7ETWnsvFLHcpwdo86FQRq%2FE1qkIBWqQ3fih%2B1PiloXshRMZhJa0%2Ba8Bo4sShxRueNAKkzcxV1Sq2DK2bFcqRtJOXizhJCpkvrc5H3rXBJOZU9jiX8MeB8m6j6JS6e8DcGYBXGUFIfgDtARRhdJt4D1p0CrIvtQ7bcu4jHWfhUBXr4zxXaxC%2BqEZ7E45uKgDxEi75lY9gN%2F50g%2BpwzlMJ6kDW77eDF5dRntNSTd%2FC3lkHzVHl%2Bq%2BzhggBiCbPULApcll1a8UIgGqhOmhapZvsthIGp1%2BPbQihgcHNSR%2BuvGbeOHofNWcXNf4266kGiQxjcN5SF8NdDzazmyF5dyqdhMoI7%2FR29li6PVVvsnZjZDFh%2BSBj5BH8eOrfUvVlyVujndOlKyy52jFXm8aczJxvzQmwoX1dCd66fW69eKviJlpv5MN%2BAvs4GOqUB3kIh%2FRvZe7bVUlsPRaBaqIIfOjpfU5Y4KQWtBW4wJ4Y4FPoXVwbTFVi9WNYHNkGYI2Vi8eVQaKUREAbc4EE3Ex7BDNu5wVy0INP12m%2FpS%2F49GeBkKY9gtSjc87%2BAvRhF9sy5wm0w4QXpVpFkyn0Ym%2Bcai15QbTxzBVM0dZs%2BHIcIBSB7uPenkYWGxkv6qVvA5dUE8T8F%2FERniBnrZN5i3r5ecNEr&X-Amz-Signature=c85a86c553b42d842ffd1ac4674d63e6c8fae437f32ad003d58c02987e37a029&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665L6GFBG4%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T112750Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDFX%2FztGpX5EUGdMbHdwf8LtXY3A63Kjd9NnoB7rnBa%2FAIhAMt5vxVRa2%2F7ipYE6GKUy8VwrHRKeMN3cNjbvrVotNk6KogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyFQ9WtsrB4UmMJh8Aq3AOzYDZd7Wtj6Kkho5JblnNrEko%2FK8QZKb4JWpHKij2T3atyO4LiDrNeZsllvbV4lmbSrFNyqjUy9S8ufQpHxwtPsRmWo%2FHT4DM5bZtxxQrACwJiT6mdmK%2FTOht4ETdc4L2jmnmBMvvCwu6nHAN3FjF0m0CcIItYbW678XkAt4kiD3KP8ClsLD%2BMrOOSdg7F1jvuXTfB6k5%2BHPGW82hraAQEx4OBLSRF6gPqbrmL7%2BfvY3CmwDoeoc4w6ivHp08ualkwqFvQ7QYUVa6fNE1kXd3%2FnceR2LfE6duPSoCVrKKjf8nD%2FjetN8LBW%2BWtLk6cne0ApaFWwhaHwtsdVl%2BxI%2FNuhADG1w%2BypmFUyyD8SGNS2jhAgbRUHXLGVBqmeUsoP9ZdVlalLDhTUPKCPSeW1dMk3B1wzASijJciIZKpAPN%2FhEpbe9TQtRPs%2FdY3XDKGLU34N4GP%2BuhntQvLdkiFxCnPV9rlIZJHeJV82L6SrjzqDbR1r3FGvT0tPoaL6F3MavS313V7EXuh7dBq%2BD2e4YUx%2BtWaCIklIlZTzWaQgydRgdgPIB1NCTD6myJWWXpVgwIllCSdJXPWaC0Cz4%2FoldQnEK2tW7RAMR2pNctbtEL1Q3rBJ3gyaoETyRMKNjDU%2F73OBjqkAeQa%2Bzmq0CQ2RsQ8viPDg7CTNTGlbusrQk1X2uSlgtQW%2BDhwtMUKPDUWqWZgz6tfyzHwQ2Ka2Yh2BA69pGCarRJYt6rJogV6DjDJKl5WDmcaCY8RAuOBF2jKRwHXr6mktBivZJCfXyo8cELSz4bjO2VWq2mUG9j4Mfw%2BegAjZcffQ0qhZXgErDUmoIh%2B7c62uechatcVFjpmSRkerdD%2Bzm81XMLr&X-Amz-Signature=39116e534ba7cb2bcf760d98f05f05108e298b6e606ee41ffbf1ec14c6659303&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZY2YYIV5%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T112751Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCFtEewlhbqI4UZoEiJCeqFvWhkfjP6O6S0aFneJjQjnwIhAIus%2FvHto4EUfxZuesKblaOawMsttfRgQmj5K7ywWxuaKogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxkv7JaoLmSs6qNsrMq3AM3enTJDhEfPwJL9ujueiZe2IylI0XG9cyPmxUy6VLXubcPK7Ub7salF87kQhLM63gNd5IevY%2FJLqI4uPibj7xKoaTub2UPbK1Hi5IfQT0cl1PpYSo4OtqC9caHv%2F%2BYhu7q9nqhkcmqNTkAgQ3pbonCwJUe2Yl%2F4hw%2FNR8C8IZgVzhkWaeEgS41D0GI5hB06Wea7mIh%2Fu6YC3f4kQBlc00PsjOM3H0LYphvnymUB7uL4nakvIwPjKYYFb5pfNQbTqmIhlwkMppCqWwBtogPQaTIzryDNwDSRoWt9TFLUGkSTAU8CAFn3g6LNr3aMfE533cDDA369z9tJ48e03aNoKayvHAZPnhu6tcmuTqYlXGtHV0hWUhGvQrRKTKOM8ol%2BQAkAkC845J661nBtv0%2B5qdXNY9nnA7niInruUgHM9Rxo3ry9Ik%2BqqI49t0FV2jzYzzz8XjJLAwPcgQcRE7C1tIJEf%2FtEMmkX7E7%2Fq0Ms74mA9bUf0hZfjLlwxhDS0g1opMZ1fSgOK18TBFyt%2B9rRW7NZLQ3UAgN5hTaJFlRwaTqQ65SD7yigHJboMl3wVm6R8Xr813d1oF4fwMAa9CyElTogXPksSnhWHmc9HmNlqSiyethItaHAIS0U5mZ9jDW%2F73OBjqkAfpnks%2Bi%2FFoK6ncxM0ba%2BMckVSRB3MceOl9AR%2BWp1x36NmK3oK5feO0xLtUEg60tUjhkDynjbcHZCFmCdhodh8twSsTmflowYeXXKSXZ%2FXwUEDOIS6FaakED6l7TO4aSqrPjsH9u3lFejUYKub4kUyCraUVL57S1y8lJcZ4u%2FHWs40MYHRlft2i6IU4ouJbCsyJAj%2Ba%2BxfnzGkn%2FV5a%2BaazHX0LW&X-Amz-Signature=3a7b32a88eccea614994e461c9743b08a9ab897e43c810f3b2f8463304106bf7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGGUNZPP%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T112752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAMkQs8g7D%2FX8Jpzc16CUpLYO52OpHCNYBQll1d234urAiB9I%2Byrq4emgjpKxt1k1V012Yn%2FAwIRr7KtqjLkgWHBFSqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnYoQsk2WLHwv%2F2ICKtwDyWIHoeAkOC9L6gZ%2Fz57%2BNipmAM19%2BG1BT95mfBi4MYzgfWxbHBhNO6xvqIPMoFYQXgT01Avi6%2BwupmGnAzT7IjicGSPxacFY3JTcQCFkdHdsNfhKAaJcgTbIXOEj0HPmHLzxpGz59vHlRl6%2BKGvs8ZfEnhBFOy73GzaYn9Y%2FMdMGfyKT73qMfS4bk%2FxdjeNQwR8dCD2oaFuSXBq54%2FgaNltRxIF3KDi5ih%2Bzg0v0TfhqrwJhevv2tOjf5PrhE1alxAFCP0OV2U3BxfMEyZsmYxvZnKwQNF4KbozctGW76MeO93fmTdhVgedwMUV5O0%2FL4Ntal7TQn3DkXJWWGW9AMSU0jxR0C0xQFYxlRs%2BaVXvYQOjcPAsB9YB7n%2BHmUMBdMZFQY0rWub%2F8ky6AkZcluxKakhcJPqNAJvaRppwmuQyEW8GN27A5YFP4unKRFJfLKaIdSgiJ6e3NgQifYgjVfrqHFBWKomIvnUH86EsCqJNNfdL1WKUADJOcU%2BQGHKvkmeVlWeHyjFkuTF6GtV1LHfEbX%2BKY9Ghhyv0cny46DmBAKfBIokJEodJBn8lbqtLBELP61pZ8htfxbm%2F7zdZXf2vnwV2b7iVPWHFQouzDvqWHCy3MU80jKeqYGHowmIK%2BzgY6pgFk%2FFJWy7vnsbBezrdvvBw1PTBvdo1INTLU5jnXDCrosEYyn%2F9nLw6POhhPS%2FGiM%2BZCADdFYvosqaX6vKkDzVPS8hP7L4u179TcFFvgkXt1bEziJqfokjx7bcPWDzKzS9cGnyNLWckvYfcYUtk79M3jptrIAHpNCMKtZ%2F601voFHaLRv3WnMowUsiux9GuBbhPSJpTVnBFH63wJIbtx2B63LXY%2BuJMc&X-Amz-Signature=50fa96e450090a929a1dd01175cdd32c7d94bc7e1bc0c199295efee3c5809778&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGGUNZPP%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T112752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAMkQs8g7D%2FX8Jpzc16CUpLYO52OpHCNYBQll1d234urAiB9I%2Byrq4emgjpKxt1k1V012Yn%2FAwIRr7KtqjLkgWHBFSqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnYoQsk2WLHwv%2F2ICKtwDyWIHoeAkOC9L6gZ%2Fz57%2BNipmAM19%2BG1BT95mfBi4MYzgfWxbHBhNO6xvqIPMoFYQXgT01Avi6%2BwupmGnAzT7IjicGSPxacFY3JTcQCFkdHdsNfhKAaJcgTbIXOEj0HPmHLzxpGz59vHlRl6%2BKGvs8ZfEnhBFOy73GzaYn9Y%2FMdMGfyKT73qMfS4bk%2FxdjeNQwR8dCD2oaFuSXBq54%2FgaNltRxIF3KDi5ih%2Bzg0v0TfhqrwJhevv2tOjf5PrhE1alxAFCP0OV2U3BxfMEyZsmYxvZnKwQNF4KbozctGW76MeO93fmTdhVgedwMUV5O0%2FL4Ntal7TQn3DkXJWWGW9AMSU0jxR0C0xQFYxlRs%2BaVXvYQOjcPAsB9YB7n%2BHmUMBdMZFQY0rWub%2F8ky6AkZcluxKakhcJPqNAJvaRppwmuQyEW8GN27A5YFP4unKRFJfLKaIdSgiJ6e3NgQifYgjVfrqHFBWKomIvnUH86EsCqJNNfdL1WKUADJOcU%2BQGHKvkmeVlWeHyjFkuTF6GtV1LHfEbX%2BKY9Ghhyv0cny46DmBAKfBIokJEodJBn8lbqtLBELP61pZ8htfxbm%2F7zdZXf2vnwV2b7iVPWHFQouzDvqWHCy3MU80jKeqYGHowmIK%2BzgY6pgFk%2FFJWy7vnsbBezrdvvBw1PTBvdo1INTLU5jnXDCrosEYyn%2F9nLw6POhhPS%2FGiM%2BZCADdFYvosqaX6vKkDzVPS8hP7L4u179TcFFvgkXt1bEziJqfokjx7bcPWDzKzS9cGnyNLWckvYfcYUtk79M3jptrIAHpNCMKtZ%2F601voFHaLRv3WnMowUsiux9GuBbhPSJpTVnBFH63wJIbtx2B63LXY%2BuJMc&X-Amz-Signature=4161f4e4a35149694e345326a93aa0347ce9de79423725cb0cbb73f4a79398d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPTI7ZHV%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T112745Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDpWvdtgvPXpVanuu5l78V9mhRQ%2BykaHSu9HumPfkCdWAiEAzfpb10KR72ZZATF3zCT6n%2B93Dk06B7KJHZRV4cwZWzMqiAQIhP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNnMy%2BhCfx%2FPTtYQCircA6JdeixbJplkMPAzk4ho7doBg%2FGKKV02eI0kGDBPu4dDi5mpzGDdAt9I5ttdTc%2B9G96OuHU72HGmMKLiasxS1h%2B3t%2B21icrVYtHQUa0Y80OraD8R3KEyFMxbVWUAEpyRG3CoROOYMgiKh0cbXYabXD2UQcGaqEjIDEigOY3%2BUAVZ26RdgWHY1%2Bz0gS4GGEvrQ%2BTI9wnmJwH3WVCfD4SFjr9AnK%2F3%2F8TFuR2zIx%2Bq4H41mBj1xRbpfdVf2D2Cw05pkpyWs%2BCGM2QKt2nun4geLJlNCbLRl5dkyaIabhziX2qFqAWUhxQYOyxKQWEtFJirECezxLXDzNFOjgkyA2j3s4tzv5MYiYocQ69za9M45eTUazGm%2F6cPxdFVRodDwp7CK3fuBixWANMwCLfQ7AA5cXiQY3eJetjVPdmOB6FeXBOkbMAkyB7bBg3G5SNKLKQF2Ul2VhUXfVsawC1BkuLlPy%2FbGg7agvmSzZY1FM%2B2VuM65UzN5CKjW1Sx5JSUW4r%2Bj1EBk6PKTHwWMEF9nbrIyIxBwcB3clR3GnjEkzrUihwW3iI49tX%2BnD9ZNHkEcOobCywqkL78GWXew1xMlz2BpFQM68N2qfCc8Y%2FSZg7bF54rjGFWzldl976ZjvJfMJO3vs4GOqUBARLiwvobnshnxBBqYbxy2UZ7S1QkXeArMLJWaSK2VZ34HLl%2Bhfjv8m7tuQZ10iTYnGUBuGdbsWD34HtR22Vjq08J4RHWZSLAOpErkRe3bX53%2B3N2bPtN4Vqgn7EEYaOATQFSWva84kTbpm1G0Ob4K6qrbNo4hKHZ761lvF9rPU%2BJ2TbuMlPHxXUXC8bX%2F6THroKCyoHeihEFUuSZOp2ZmBUnmiDS&X-Amz-Signature=72d1dfce6fe8e21e14b70b2de7bb28a5ff5f5525af82426a72efc4e4c6ef9046&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVFTZ2BT%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T112753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICRH68Y9oliIceSbQXYfn%2BlVT%2Fen5LpjpcTq5312jZ9WAiA52FzokCMFqU1OCQY7yZJ9mI1UejgH690mJurG578dNyqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMgiYNN7uw4M0CJZkfKtwD1JYnakqU%2FY4l1WizZinvmuYfOu8dXoOy4xMf0aTPs7TQ4wM2778qI%2BxWvjyfW8h9gOu3V8qXYndDgk9AY9C9QuPUkSqGMQp7U0BL%2BMIjvhQI9lvSkUpwr4Lne3YaezPSgRIxPRG6Pbc7X2NR36f87m7ulMQYyZtObJ%2Fhusbi%2BCODbb2MIs0jZZl0bDKc9nUhi71vsDv5hUXZ%2BuMM7FskTfgy%2Bj4gFRAg4W6j7gcO6AQdV9VgV7X6H5%2FjM49%2FwvnXilIkKazZ6q87L14rVgXGm4aYQ51gOfFiOvU4%2Bn6LK0tHvqsIhN%2FxYmi80vBn7bWpn6CQshOhVh6hrhdvLqKgtShYX9lw%2FHiK0%2FiPkm4Op69gzHXVXXMOgD%2B6dWhZnX8CZdc%2FZpiMNqKS0hApFEJVtW9LLYYE4LiInxkN%2FpUsuQyjSXULEsPWnIYtfoCaJYi8wmtOZHZjsV9%2Fsq9UfCc66%2BIAKwFcB4%2BVuhhjNjj%2FvktAH1CWrQPeQswRBIR6AZM6I%2FVSv2MyuWU4bzkkY1kobaN54GarEa7BZiKnPc9u%2BRCVnW7WWbvVzT6%2BXDbigiZjSb1LjapeFRqNioFfRQ0xrOXCl%2FukeJSsLW1PgyVzDY16H8E1OYfj8izfivIw2IC%2BzgY6pgFwz0RI3JYyOS8uYjOPCHeErI7oQOqd8b%2FxAZyjO5N%2BDvQR84CwO6hLvU0nR42UKNPYexVxzluEj5XbWkEeWEDGE8rU0w0Cy955MtTVqTQ8t8DyiTZ7soV75kW9HkgNCdc2sOfuZXwXcyatiReJmEyQmLdkgUTv9gEnuGdgGiMlnXRPWDSa5SLcEQnQBZYTalXPvsgc%2FJgBqWB8hc5jUqCa%2BGi8HdHf&X-Amz-Signature=8536c84033f320987515986f0fcf84a9a54084ea88fc4f63cd642f45607ddaa2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVFTZ2BT%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T112753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICRH68Y9oliIceSbQXYfn%2BlVT%2Fen5LpjpcTq5312jZ9WAiA52FzokCMFqU1OCQY7yZJ9mI1UejgH690mJurG578dNyqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMgiYNN7uw4M0CJZkfKtwD1JYnakqU%2FY4l1WizZinvmuYfOu8dXoOy4xMf0aTPs7TQ4wM2778qI%2BxWvjyfW8h9gOu3V8qXYndDgk9AY9C9QuPUkSqGMQp7U0BL%2BMIjvhQI9lvSkUpwr4Lne3YaezPSgRIxPRG6Pbc7X2NR36f87m7ulMQYyZtObJ%2Fhusbi%2BCODbb2MIs0jZZl0bDKc9nUhi71vsDv5hUXZ%2BuMM7FskTfgy%2Bj4gFRAg4W6j7gcO6AQdV9VgV7X6H5%2FjM49%2FwvnXilIkKazZ6q87L14rVgXGm4aYQ51gOfFiOvU4%2Bn6LK0tHvqsIhN%2FxYmi80vBn7bWpn6CQshOhVh6hrhdvLqKgtShYX9lw%2FHiK0%2FiPkm4Op69gzHXVXXMOgD%2B6dWhZnX8CZdc%2FZpiMNqKS0hApFEJVtW9LLYYE4LiInxkN%2FpUsuQyjSXULEsPWnIYtfoCaJYi8wmtOZHZjsV9%2Fsq9UfCc66%2BIAKwFcB4%2BVuhhjNjj%2FvktAH1CWrQPeQswRBIR6AZM6I%2FVSv2MyuWU4bzkkY1kobaN54GarEa7BZiKnPc9u%2BRCVnW7WWbvVzT6%2BXDbigiZjSb1LjapeFRqNioFfRQ0xrOXCl%2FukeJSsLW1PgyVzDY16H8E1OYfj8izfivIw2IC%2BzgY6pgFwz0RI3JYyOS8uYjOPCHeErI7oQOqd8b%2FxAZyjO5N%2BDvQR84CwO6hLvU0nR42UKNPYexVxzluEj5XbWkEeWEDGE8rU0w0Cy955MtTVqTQ8t8DyiTZ7soV75kW9HkgNCdc2sOfuZXwXcyatiReJmEyQmLdkgUTv9gEnuGdgGiMlnXRPWDSa5SLcEQnQBZYTalXPvsgc%2FJgBqWB8hc5jUqCa%2BGi8HdHf&X-Amz-Signature=8536c84033f320987515986f0fcf84a9a54084ea88fc4f63cd642f45607ddaa2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VPUF7MQS%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T112753Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD20xRMDAr3EVmMpZB4tmZVHej0IyoTWhDIVkgthT6m2gIhAMZyM3DD9Z9pkCWGfdiHItVBMd6lTOR73uQyf4IKlXQ6KogECIL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz490vG%2BDAtvj6Y39Qq3ANoyBI%2BoSM498kdW7tgHuuEjOZjbLiHBqWKCbdfLqTb5gRpFLS0xPSX9qQYbJzcwF0s%2BxPNDvRrCOPPxKlo95LeBMcoMRsi1qgVq3AY20dJY7DZZChPCloEWm9mxP%2BzzwacUWdrJ3ILtpJjA7NHluOi0ytaSnBFtOLAur2aS0hsrcguG8J%2FVvNd5drrCWbH4YeDzUXiFNar3iqCPaRQbvYqYk8td27GXnznNHVoVE714%2BhlDpVzLZeCedqTvl29CFLsKWP2hFvKlHqjc93sMCU%2FQOz62xNFOv4gPtt8SHjnPDckoIMVifMxuZoDqG6MH6%2BqQZBJCnOLvbs9o2F0jasNk3JfldrnUGFDXN9Rxi7YIR%2FicgHhoXeqs8o66gT8oiQr9SAXcs1nnbdGGCdxqbFyrP%2BoGVE97vyV6lK1%2BcYLhZ8S3TuGHKYZ56BHyN%2Fts9%2Fi3J3tdkZTT79FtKIxCtsFX7rfFPQyE%2F9arG37sqikJuqWSye7azgnJYECSGKy6iSJixysCfwfaZuwsdJDg2lcgwTurlnRRQ3%2FOrNj0z1HSMSlRFAmvPHyI%2B%2F818YQUGUaRHVip43h6WmhiQ8v10i2K%2F%2FhtfMps2SmNCz1OvFkeRZc3tmfEGxV3xzA4zCb%2F73OBjqkAZFIbYnJT7N11Lej3naPwz4nJQUVDwsu%2Bci5GXGPM4CK5tMof02UxXBcF8vw9JVmGgcncRO1dxaHgOA36eiXZqyHPaQwiOFhgaRf%2B2pQq9jUMmv2q4L5lCRnG3IRrivzo%2FXSnTwVc019nFTjflKN8rwD18jBkpXMEobqoqZfxCUnAqNmoS0dZ3NjUEb9qljh9A4r2PB8uKAlZEfn%2B0z78I6drtb8&X-Amz-Signature=34ddca9cbb1686f3a658bb30cfce3452d6c4a0f331ecd3c9f9b9666010b3e1b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

