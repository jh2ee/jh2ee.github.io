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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTKKPJFC%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T052931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCIGeEr0PA0j6cnnrDuA8pYZ2OZ%2FF9o4iEIImnqT%2FYhonhAiEAmN5EzcAidNpALeL%2BNzNTP%2BvQfFU5bgYFeHpX%2FkndlY4qiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFzQov3SxW3MD7SrPircA27wJgr9GAcUhbQhuhh%2Bi2%2FzDebszFa%2Fxrq7gNqxyEhDaY0xiS1KdGnJZXv3LL8dECEpGbBRtA3LMRaj%2BYF0U4s1Lf9yOEDNNlOwB7DV%2BiubeFWn4wmigASMAeNxUy4VMphGpa3wSRxpS7Fif13gsnQTBNtsSHSalHpTS8A%2FE0XpQyLvBNmsQZEF2im4U5HNwN1GvcfW%2BIiT9Pz5WIxIrQHMqsD%2BAugvpreENLLdoTJcPCyXvG2fGNnxZRM7fjCbA5PQq629fjZ2QasY7Q9C9%2FU7l6idLAvDuvAOqZ2%2BfsjKC31tkAbWWUFcd9h5nl48dmo97MqKdGuQSKDDNBIyVf31qOC0Afk%2FGqEZgUmno%2Fxyc7HV6W%2FkJutKeFSrz6%2Bjq6B19EAABwrY74Xq048r02PAv8%2Bz0ttp6s7g%2FpHL1he28fBNy3oH2i9Xx834Bg8pxgomCVIk%2B9Fp1JIpNMdSpAnypZWZbGxmHsrvE78NEzt4GjKLoF1ZspIP649Bqi4mWuJTG%2BQjMQqpMMkMoNsRVZdTDG6JxKv0PuEfO4I5oIitDW2qV83ImmfViXNBaQhuga%2FJ02L5VJmJ5XcgpoECZYPb%2BEuiBv2eW9f8fwrkIH7vbCktjULBG0lkdDeqMOjfrs0GOqUBDduZex6V6vVVkyEx1X6dlLOE0C7q6%2BWDTputO0Z3XV%2BS6qC2yjagsJ62NF1wTRBOZ%2FYQhmiXjdHGUCUgKfto0YHas0B0eTyeFygy5XdvqVApMJO4JIdi8QMgCKl%2BQ6%2FQehF7onxqfeb7iYSt1swG7TiEGXeEsY25PPKxRjD6BdRX3B5e0eXV7wUzB%2FRmE%2F6pjlp6CHYG1MiAny2a4BwIhlW4d5fC&X-Amz-Signature=54854e3f20057dd973217d77908bce156a91dbd57d13bdc5d2d12a27043fc5b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTKKPJFC%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T052931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCIGeEr0PA0j6cnnrDuA8pYZ2OZ%2FF9o4iEIImnqT%2FYhonhAiEAmN5EzcAidNpALeL%2BNzNTP%2BvQfFU5bgYFeHpX%2FkndlY4qiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFzQov3SxW3MD7SrPircA27wJgr9GAcUhbQhuhh%2Bi2%2FzDebszFa%2Fxrq7gNqxyEhDaY0xiS1KdGnJZXv3LL8dECEpGbBRtA3LMRaj%2BYF0U4s1Lf9yOEDNNlOwB7DV%2BiubeFWn4wmigASMAeNxUy4VMphGpa3wSRxpS7Fif13gsnQTBNtsSHSalHpTS8A%2FE0XpQyLvBNmsQZEF2im4U5HNwN1GvcfW%2BIiT9Pz5WIxIrQHMqsD%2BAugvpreENLLdoTJcPCyXvG2fGNnxZRM7fjCbA5PQq629fjZ2QasY7Q9C9%2FU7l6idLAvDuvAOqZ2%2BfsjKC31tkAbWWUFcd9h5nl48dmo97MqKdGuQSKDDNBIyVf31qOC0Afk%2FGqEZgUmno%2Fxyc7HV6W%2FkJutKeFSrz6%2Bjq6B19EAABwrY74Xq048r02PAv8%2Bz0ttp6s7g%2FpHL1he28fBNy3oH2i9Xx834Bg8pxgomCVIk%2B9Fp1JIpNMdSpAnypZWZbGxmHsrvE78NEzt4GjKLoF1ZspIP649Bqi4mWuJTG%2BQjMQqpMMkMoNsRVZdTDG6JxKv0PuEfO4I5oIitDW2qV83ImmfViXNBaQhuga%2FJ02L5VJmJ5XcgpoECZYPb%2BEuiBv2eW9f8fwrkIH7vbCktjULBG0lkdDeqMOjfrs0GOqUBDduZex6V6vVVkyEx1X6dlLOE0C7q6%2BWDTputO0Z3XV%2BS6qC2yjagsJ62NF1wTRBOZ%2FYQhmiXjdHGUCUgKfto0YHas0B0eTyeFygy5XdvqVApMJO4JIdi8QMgCKl%2BQ6%2FQehF7onxqfeb7iYSt1swG7TiEGXeEsY25PPKxRjD6BdRX3B5e0eXV7wUzB%2FRmE%2F6pjlp6CHYG1MiAny2a4BwIhlW4d5fC&X-Amz-Signature=54854e3f20057dd973217d77908bce156a91dbd57d13bdc5d2d12a27043fc5b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XBBP32Q6%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T052931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCIEFl3gWDAZ4peZAn4R9uPNi73vJc1mJQaWo%2BL9mlBuMlAiEA6th2hOuIMPtEDn2Ld0fyoTElu3yLamqyx1aPDntS2ZwqiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH6cYUhN6s7%2FowbafSrcA8yR4DNh2Ue%2B53vWuM2cfNX7kaY7fqJdnX4X9RJKQRs1x7%2BT5rZgUGtAgrQkCouTKS6ugH9iSqTKaJ7AVQANqwuCzUvbuB4AmIOW%2BwCqY44wd3VlSYL2Guqry5pH2bGqOlYsdtQjuRBOm48JwGkxRw4RrLWTSqwNDkfi3GQKCx2%2F2l1UMREMDpyNnN0BMAAFh4UbLfaJDMUu8HcXlpyF8VIYSQAps96Zo0syk1g5MWjn%2BpPY3lcGtTcrX5HrFmgxsmyytlrKXLufEI5FSxB%2Bv52OeGUSufuHDIZNDJ%2Fidx5ZOJEP1vAcZ%2FLAAJD2pRuak1JJSl7YV0J3GZwSZUUsHnfZSuH8oNW%2FZxz3k9qTAJZnlOibP5Pigu1v1rMYDMzoHeC%2Bbq9OuT3ZXFMeDuyqU68AEENb73T6Ph%2F%2BLCg8o4dBJqTlmae%2BgJDRQUpWns1kS7OUXNzr3AT3gy6wv0F%2BnnNbeCRm2KBP2jy8O1L0oPP8NTtOE7fdT53CcoSFJr8iaY%2BZXP%2F6hmzhGaFl3hm4cO%2B5emMtKH5MVB6Rez1J5AhVtEsmgrv6C9V8lwW8lk9dE6Q1DFCsLjaSG0cz61kEn5RU546Wh3QdrfS%2BFWG0Mvjz8NF45rEV%2BN1lxVQMMJHgrs0GOqUBvHJCK1W784iS%2B8eVV%2BICyW%2FeehLylAdMaV%2BOWU0tkr7i0u7AzHSm7gcT7LRzIyfJVg6dXq1dmocPBUhu%2FWMJ6fPz4EQTG4n7%2FkWWjHYoEOaBGHsS0Y6VN4xx%2FTKZT%2Fg6Wz7KkK99A5PUHxD2%2F6KoskmEl48570aXF0xBbQFQuH5RYb7CempV89prcV0PF6cFi9M9fpuZ0lesuS09AxCpDVT81EUN&X-Amz-Signature=8b11a8f9288061dbc8ef3f07581147f3b67ca887e4bb709323fd979ad023fe5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2446UK7%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T052932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCIDkCXVyShKabebCnZutRehC2X5%2BCl9dxJQAQqyux3QByAiEA3v7B4lP0Mh6BNqk%2F4gAaktqlg13YVDGSpT1fXZaXhJAqiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOdnibDEyyscdTIABircA4g7gku2j6xg4Ze6NmnBcJUes0Dx6h4vtN6tRdRNhYTxlTlag3YeTJlEnXde8Gv3xCO66j%2BX665wUWLnuWVWm8t5Ih2n57JUWm10sdfezqSyPb1I4V6FI0PtexGQ5AJtdFZmBDkXN16sjwkZ18eqpmceEruzf%2BAi%2BqjJN87%2B4pGXhA6jwqZwjLnefsDeu30CIpGmsUlIuI8fST2jU179LVxofG0u1DOKe3LFqHEEf7At0PL0Ti5%2F0gi%2FSDf%2Fv9VFpWTMH%2FHbeIiUBVQsNKxiTOQ%2B%2BkL%2BVS8tR%2BaxPaLg7GjlDcffS%2B1bKYtmgG5eznJGfrW2vJnIVuaNppA1NkxYEYATha2KohYj6jNN4hD0pj0r5V64jKAsnPTw%2Bq%2B40ym7XC89%2BH756Po%2Fg7siQkHQXg25gkk0n96fyMW%2FZhG1uLJx6tK1RNFCg4BiUvzm28vFrrO1z8afbX00LdvxL3VTHuFB2rqgpTy%2BC7cOaGGBTMgfL5onqjltmj71MYRhJlW85qlxw8PFYnaKGBh5DLpyn0OXKb4teV10AVdD2weMnJTZO%2F%2Fef9YnU1cJ6GRVVkuAKbI0zr0Ma3YoQhfhmftaTZalamske%2Bt488nrcnluX7XK%2FknyliYbglcIxrA5MPjfrs0GOqUBCfNR1YDUqgZv0Oue3GmIgHMqeP3gNlKuxvBVFOA3NLZJvaYvApIE2gTp0xjI5osdtfTtacMoGFf0nHDFI5jhD46KMr0gn%2FdtOw8T5WOj3KhgyZn2mbF0%2FuhpUw2tRR3LKjPD6NEZKeewaAaUwN%2B8sMX%2FR1w%2FP8PzfP56mu5bLqSv7%2BpmqrtucYckIniXCRynu%2FwfVbzWRz8oJL%2FTfqsjn1Us7YCG&X-Amz-Signature=9e890e68fd1e2fa703b15e176c46f29bdd48b064dcfde3ab43583fde44b092f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R2446UK7%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T052932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCIDkCXVyShKabebCnZutRehC2X5%2BCl9dxJQAQqyux3QByAiEA3v7B4lP0Mh6BNqk%2F4gAaktqlg13YVDGSpT1fXZaXhJAqiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOdnibDEyyscdTIABircA4g7gku2j6xg4Ze6NmnBcJUes0Dx6h4vtN6tRdRNhYTxlTlag3YeTJlEnXde8Gv3xCO66j%2BX665wUWLnuWVWm8t5Ih2n57JUWm10sdfezqSyPb1I4V6FI0PtexGQ5AJtdFZmBDkXN16sjwkZ18eqpmceEruzf%2BAi%2BqjJN87%2B4pGXhA6jwqZwjLnefsDeu30CIpGmsUlIuI8fST2jU179LVxofG0u1DOKe3LFqHEEf7At0PL0Ti5%2F0gi%2FSDf%2Fv9VFpWTMH%2FHbeIiUBVQsNKxiTOQ%2B%2BkL%2BVS8tR%2BaxPaLg7GjlDcffS%2B1bKYtmgG5eznJGfrW2vJnIVuaNppA1NkxYEYATha2KohYj6jNN4hD0pj0r5V64jKAsnPTw%2Bq%2B40ym7XC89%2BH756Po%2Fg7siQkHQXg25gkk0n96fyMW%2FZhG1uLJx6tK1RNFCg4BiUvzm28vFrrO1z8afbX00LdvxL3VTHuFB2rqgpTy%2BC7cOaGGBTMgfL5onqjltmj71MYRhJlW85qlxw8PFYnaKGBh5DLpyn0OXKb4teV10AVdD2weMnJTZO%2F%2Fef9YnU1cJ6GRVVkuAKbI0zr0Ma3YoQhfhmftaTZalamske%2Bt488nrcnluX7XK%2FknyliYbglcIxrA5MPjfrs0GOqUBCfNR1YDUqgZv0Oue3GmIgHMqeP3gNlKuxvBVFOA3NLZJvaYvApIE2gTp0xjI5osdtfTtacMoGFf0nHDFI5jhD46KMr0gn%2FdtOw8T5WOj3KhgyZn2mbF0%2FuhpUw2tRR3LKjPD6NEZKeewaAaUwN%2B8sMX%2FR1w%2FP8PzfP56mu5bLqSv7%2BpmqrtucYckIniXCRynu%2FwfVbzWRz8oJL%2FTfqsjn1Us7YCG&X-Amz-Signature=a6b3a8539ed21fe34590bdf26039dbbfe96c75cc8ca34d6c9ad4867a259e80cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAT7COYG%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T052932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJGMEQCIBxhQzUa8q13d8QkHkjaH1gu4EYw3MlfFWf556cyvmSzAiAVlxSjfpTMttKcNGb3GVL2QfmQw25Y9lzMaQk3vx2AAyqIBAj2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMRBoCP0FQ%2B84YnqVFKtwDuNqeyeHhrmnN1OVMteVKl4mRECt%2Fi2svH9CvDnTeyZuA7CS97G38fgNEW1Yf9sbILQLprcpzLChwcwWpeTHcmCB5ITplgzMBEx%2FxsmFpAGqorw815W3UglvLeCU25ZSv5Y3WEaZuazO8%2BswvWD7Yw%2B3Gb7VBTS2QZQYAvmldWZN44jMUOe2tIuM0NQnAzGJUegnEzO5AcXXMH3Gqt%2Fu2Pgogjnxq6gBlZji2D22Rj8UWCRBhDauIEnCtyCAHzNz9EkRrz37onhwQyY0vVnSIVSPfZqflBTm1sSKvwLw%2F7U%2F7tB2maxX7%2BwpZZn19pkxovRqRKr91Qls94nRtJdEGhY3vsvjwbr45dHulgIDCrWlJvYN2ovYHEj8tyqX0in0YHnsIjvKREwUXTYF6wFBuf0dnB3%2BCHi0ZmBUFFEypDORlw1byJCJ6bA0CNfLgDUE%2BGPqp1KVAQsb4Cy9AC0TAEhan5IAxedcL37V9ZDlYiAayFW2ZN6HJqaLLf%2BzTEAMDcfVOZjNOg0%2FSPZ52fE5BjdF%2BJm74aUqZb32RAGXc%2FLCsIaIBZT040YC3lDFZ%2BgCFEi%2Fa7fDp7nlafXN0RIjuw0s1oNMGMbXyxs4JEvDK1Mp34vSWN4BnlE2s1C0w0OCuzQY6pgGZ9%2Bvy%2FwJRxhRl5vvgEz3H2pA73xBh8ZRFlrZtCO8jlL4IRs3HCrkhslCh%2BS45yn%2F5HpCbpqo7oet3NcS9IBa%2FlKxLtq4cdeYW8qtGiHgkCl6N9WMJ4oep4K7gxsY3f21T3I5Xfv2SR89pCkHsr5GiD1yT08lMwitV1fg4Zl1nmvDPk8NubReI9XubXYOXcomXCs6Iiza%2B1ca33xTX9oIOR1K97oLA&X-Amz-Signature=0f8160c91c505b6f30745e74b3d4c5f3a2f7939fc46acbed2d6c4792470bf876&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHXOXDCE%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T052933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJIMEYCIQCN%2BX6bFMZbzpSmYwhOhIN89s%2BArwZCB%2B%2BHOitB4pyDxAIhAO3O9qZ5yeoi0MUmGYK87m25ci2oOU%2FKx0mU%2FHRAZi2HKogECPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw2SBExVaIE2OnbaCQq3ANvw6%2FPi%2FZB1mjj%2BlrqBkVbsPyHzQjTd1mgaZPMY36v1AHJq0JAbky4HcOa7JDoBeYcPw1wnXEzP7qQfSWAjoFbsm7inqrAdHVnqtA7iJ9vzXexkC%2Bjfkl65Ef%2FuHhYGlMMC2Zl4l%2F4qBC9Df%2BldqfYrMzt6Jnvp35X%2FNiJWtWfvT6crLSM3febfDkQtPCnelNe0wV0yv87qrJ7JheGb7Anla3C%2Bf1m%2Fz2givFQ40Hx1JJRhIjK7MAeeAFYD75oJzcdfFjuLTSylwOKCcdle0BRFRr0IxF4%2BIupAFpKHMXY2xtjqWcmifjxOhQS52yu6s03jgcJRx%2B04eGNVGQsfxo%2FXvBAjttoXCqmRDRNfkSZjzVQbVxja6YW3vQxMmSYdbrBBhucnKPsWOXdLBWRvD3FwxQna%2BES8l4JCu7OIO3v5ojptZ36iDyX162hukdJnuQApWBAxzeyhcA%2FasPubIInWdkcueOrTuF8GDr6EY%2BBRj%2B7Bcj45JugFoTePm9Hddn9PSmMOuWEiFzzTHiSNYwluDKI2hGNrdH%2FHPhg5TGkB5PLStLJ1v42jhGqVuS4A8%2BSvYZ8Hl76%2FjbZZsGJwHDkOG8FyJSAZzjfpbSsir5cJoNP47aQdvv76Gub4TDJ367NBjqkARcD4c7w40hMjsjUquKsbkz8AAhnuXHaiv6IvWnCfSdbCuSoM5SyJuXmY8R1rpTV8%2BH1eRG%2FuQIP1NUBlTz0P9Gw7cxY4YLSuDmx7%2BlcNEGLV3jEEqgxmxleSLATOGdk7pGbYPeP3YsHIgJgcjF2A79KW%2BssqgeC49qU73dOSOtzslEXJuSkHd2rnuBNhIQgkZgFetnyJx7K3COlTsLhs%2Fgl3OQV&X-Amz-Signature=e3a578d342a93079027e62fb17bc24e71fd599e093eba99f03729bb03c0073bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZODWXDID%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T052936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJIMEYCIQCkn1ef6xEof2qgXCFZYEYEC15i7dNy%2ByR%2FU1s3QCjCOAIhAJlg1CN4%2FiX5%2BMezVGjhaHxT%2BymI%2BIIzE6Fi6QR%2FcXMPKogECPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxPpJ3HNXyNZzcsqNEq3APbHkB2p11n44W4TLmv11ayVhH1IPUwjsFmdTr9ze6tu7g5fEDWGbJS2W751U23Roc%2BJvuZsJMlOJI47Awn4LQCTmyHKTykvUzwKjBd9czaKRlKPm0YxF%2BMhgkQzzXFea7KN35LALlOxOr%2F4sobv3XaRuHPRJpM6Cua%2BVPJx9sc6bGVQXHMdrN39Wpf4TvmrAdR40qZhtjBsP73XKOmP4%2FHrSOTRzlpP0zOfdQ%2FMIsSJnvAgzyateqbE5uSVLsH%2FZJerRrJhvpdWOEoHWl4%2BOq3xuNd8VYhlgmzj5YnG%2BFjGfHJsKZYk4610ahYJ4Cj29C4TxUE%2BKG8CqVkjbeNuVnYPN6zBeiBARYHSeX7I%2FYAhrXK3nE%2Ficj6m05cUXpxYgGFU8zyBxLnKcp8izu6suFcoGSiDTQ5PJ9YrE8m5fzdlf1Ux4Rgr7nMPvMeF9r5DPC1R849PJsbdwibYb1hRcN%2Bes1mv%2BrzlSP4GApdIfVQTkv5Hk98mnTDuJYKuEN8nB3W%2BItqh7Fv%2FmfCd3%2FqA8Btxn1noLqXn8whWuDC1U2xOKe1UtJCq6gWZFyDQLi8qxesiDV8X9%2BUmtyFXv8MUubGmZ9ZdzEcPh7u7%2FR3Itba3YpUPQQTNBgNtVERyDCk367NBjqkAS13UxYIzSSFsUmwWnaW4peJKl5uMcyibSyROK%2BWsfLJ%2Ba87Jc%2Fg1OZmi9pR727PD71zvfmysdoo590xdED2E3uOfjduqQd9vk6qJwlm%2BRLEb6CPtP3bp80Pv6l5HzoY2hXJ5ukZGXHEb6mXPjQJabcLbIBYqEDCntwESK5xxEeWeU9Ho8xdGY5CaHu0U80YoGNWoEUT73c%2BpxWVAWqkHK1UHphd&X-Amz-Signature=8dcd170fcbf9e0601d329c35400c7c1088452cea5a9a5a86ca0481fbd549174d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXEMIQD4%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T052940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJIMEYCIQCf0khqRFG5V3hpLVF2sHdy4WedP01%2BNUxCpwoLrNsgPQIhAJrXwc%2BH4BOOU%2B%2BkCV9ngdTxJMce5VisZk6gU0%2FTskhAKogECPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwNCdtyQkzTZ%2B2TVdAq3AMkzuG59NXKVGY0VgiHXwx73BvIxIvj9vaz933CJX%2BZO0gH5%2B5M%2FeUSbssHVUkrVeGpZOJesgyTj%2FpBrFnyxiL9%2FSsNTUZwqopcnCVaFJikubWqNambMHD4uTZL4sVlQ60I0dnC9UdEe25CPv1jU3kVvmvouCYARgloxCCva9itc6a9VUnz%2BIVQLxz5Mz%2FL%2B4i8UCWPF%2B3tELXCH9IOjCJc4f2QyFUEadg4F6hrE4E8xz3pLPGo3ZkSZST%2BNrg8Rbf1Uvfk4ogfw1x%2FzpQFdUvuffJB%2BfdH7y1uXYnP7n%2F1%2FKeIW5XMF6UKwwlTafmw1%2FaP916WDtkio6vZCYbKO%2BnKjFDKro%2FP9hpeKWEy73eYHi%2F5KSaVhHkHYIbgOFd7WPB%2F7ElHsedwhztM7LJ48%2BbuA0cP%2Fz0Iae%2FdxZByuZBONZP6BGOZYOaYo2vRw1l9XiAZJu7Pi0Mv1Ar5zigRjUVlcyi5VJq5cXdmoo%2Fb6z335at%2FOaw%2FO8M%2FLW9FCfXPaCXZZxmln6ZdkOAMPWi%2FnrC4JHld91M0W%2FKfu%2FGMTTsTxTRjYwSClDiXOwkCwKSNQpK5GO8p87t%2FkVthvqXg3WdZjVOSEdsL0Tr%2FHCUi9%2Bj%2BFtEo%2BM8k4y4ZuO4GiDCK4K7NBjqkAW7XaENdUXg5lyDf5%2Bku5fMzm47C3%2B%2FJOdULKZxtpKdwfJrIBzF8yOKarxgnXH2SNUnEG0UymtrWmjWUGhbc0keXPJFNr6G%2B0vNxytqA6OVQfDdKAdk1U%2B3AThdwxm0kAsoiPmvsWtJjckKuv8Y1OWcfViX2oZxkcjgeBOeCiQH4zUh023gn1DKfE6FFxEwgGL88rgJbyRPJVupwUTnDMJiA9Qp4&X-Amz-Signature=6bb7573ddb10b67357906d8ad6989f485762800a749602dbe50893d43ae04fa2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZXEMIQD4%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T052940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJIMEYCIQCf0khqRFG5V3hpLVF2sHdy4WedP01%2BNUxCpwoLrNsgPQIhAJrXwc%2BH4BOOU%2B%2BkCV9ngdTxJMce5VisZk6gU0%2FTskhAKogECPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwNCdtyQkzTZ%2B2TVdAq3AMkzuG59NXKVGY0VgiHXwx73BvIxIvj9vaz933CJX%2BZO0gH5%2B5M%2FeUSbssHVUkrVeGpZOJesgyTj%2FpBrFnyxiL9%2FSsNTUZwqopcnCVaFJikubWqNambMHD4uTZL4sVlQ60I0dnC9UdEe25CPv1jU3kVvmvouCYARgloxCCva9itc6a9VUnz%2BIVQLxz5Mz%2FL%2B4i8UCWPF%2B3tELXCH9IOjCJc4f2QyFUEadg4F6hrE4E8xz3pLPGo3ZkSZST%2BNrg8Rbf1Uvfk4ogfw1x%2FzpQFdUvuffJB%2BfdH7y1uXYnP7n%2F1%2FKeIW5XMF6UKwwlTafmw1%2FaP916WDtkio6vZCYbKO%2BnKjFDKro%2FP9hpeKWEy73eYHi%2F5KSaVhHkHYIbgOFd7WPB%2F7ElHsedwhztM7LJ48%2BbuA0cP%2Fz0Iae%2FdxZByuZBONZP6BGOZYOaYo2vRw1l9XiAZJu7Pi0Mv1Ar5zigRjUVlcyi5VJq5cXdmoo%2Fb6z335at%2FOaw%2FO8M%2FLW9FCfXPaCXZZxmln6ZdkOAMPWi%2FnrC4JHld91M0W%2FKfu%2FGMTTsTxTRjYwSClDiXOwkCwKSNQpK5GO8p87t%2FkVthvqXg3WdZjVOSEdsL0Tr%2FHCUi9%2Bj%2BFtEo%2BM8k4y4ZuO4GiDCK4K7NBjqkAW7XaENdUXg5lyDf5%2Bku5fMzm47C3%2B%2FJOdULKZxtpKdwfJrIBzF8yOKarxgnXH2SNUnEG0UymtrWmjWUGhbc0keXPJFNr6G%2B0vNxytqA6OVQfDdKAdk1U%2B3AThdwxm0kAsoiPmvsWtJjckKuv8Y1OWcfViX2oZxkcjgeBOeCiQH4zUh023gn1DKfE6FFxEwgGL88rgJbyRPJVupwUTnDMJiA9Qp4&X-Amz-Signature=f23274fb3fd6357950e9a87539e339b03830bb6a39efea729f6f67eae62da6c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XXGYYUMN%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T052929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJGMEQCIEVFtESejkObbKo0MkZeBK1GpVwVmwebLJElnFxd697kAiBT3bJ6j%2B8iDbKNAMekCJ9UdPF33G5v66HEVcgegYS%2FXyqIBAj2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMCqzk9JWO2XK6LQDXKtwD3u5Ai9Bnh0cZM8nc29qUQjzSFVIWRHQov%2FMlplLwC73CyqcNe58KxzP%2BVmbeILDoI4w%2Foevy%2FKFGjrxRuG2GoC3FP%2F1mOPyl12p5UkalowrjTMEW05avU5I4F%2Bk5YSnMWcqnlTum33xdsJhlSxHJdK0y5cfcXqADlA%2B8f0gPfYyyRnNACNizBTCN7vsJA4oPXojk2Qrlf7yfwOUmxvUGxaHyUSYnARaapY68FHEjAMBs6hmbl9WtIAqkDUSlDb65DF4YlD2dSJGVYbnqS%2BDYpNHdtZTb9gq0q3RwSV8NDEiqkzSWu1SZXe6MqDfNiPzJyrGAbfGs4Wjl03ibyBzEp01CnrN7fJCR247J4a2o2%2FdDS6CxzTBPtuJzt5xJGZvSHOiYDQrGmecJAZK1rKhMCKVyaEqP5%2FBZtiezFyOSiOdcRtHQqGx1RpAwJ7%2BVbxheCsGNOw74KwPHYMGveyomzwRO1rTWseYRkAKseDa9ONlc34L9PKlMz%2BTV%2B3kZabLIMbd88TPgN6w6PPchYDdxSp%2BeoZJNG%2BoMIg%2FBqJUoOyo%2Fzw8ez3Qrvhg3M%2FTChLUtGA4dnJoItsFnFBV4tHZxbbL%2B5geZXkJYRaKmwqq6P4b6LAlv%2FWQ3%2BHWiidQw69%2BuzQY6pgFG0P0SMT5a4osugCg5PzPkrcGyBnncb6V%2B%2FcysgOTTIvTJZd1%2FDBp3l0GPepPz3en8QWVJcrIgAh6zuHZjxdp6yLhMP9AYUoh0BdFXw3spqsalxd1MYjnbu0XY%2B1eRc4LncV2XxM5wswE4Xu6hRUNZL9HIB7pr4zpmxZe6yzya83eDhS6n2FRsDBoDpHcH0zEwWtTcCERhu0EV2W7oOf1hfnfecWkx&X-Amz-Signature=9149a3e52c12e4921a31d10fbaa2e5fe21c2ce71a94bf31ed6414c0402a38002&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676HFNQAR%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T052942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCIQDfCqfKmShP6jdojAHf4zKNQpCnAN%2BJji7GDusMzp0K5wIgNLmnmIyrq4%2B2LsH5YLVdY3%2B6WKv5AD2EfDO%2F4eOpPWwqiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFF%2FDN1FUO36CuDMhCrcA69TxRukSVCSSkkQ%2FwrJFIi8uAvWrqzUMYIuEjldN%2B4RNbc88WIggYXPxKKXdmnP9DOFd6f0zUl7DsMiWuJOBsRvok1t0tYBW%2F%2BMQyhMucGGn7i6aJIE51oI1HBf%2F%2FHdTB5grGe8uALMVl8ZpSZ2rVTZ%2FDQ7B6QsK73y1%2BWbw46B2jNEUIUSzjm1jmP2Bj4evc2brdWNHxGClxt%2BzKy1rEhTnKHZNBlE13wKks7E6%2B68R2mo5QcArEEapSU3DyJlAGf8jmlUsE9YZtAPEeO7FOircb%2FOXMoDgCcwLz7uAjPwqM%2B6BLZX19heRwBfyI6FnQVr26BDQmf2%2BVoJt9u3sMgLpqBeAbKyEMsBPOSXMX6QpdvcxLuZsd9jvi45Y36b0q%2BY09Cg9Vzw17UHlPKBC4ZVZjHweLQKCiJpuc3mlpV4xsOWtmplM7UhPDRr9vLT2C3aonUj8An3pXFEV34F4lgWVIZmlNYay8G4HUTTZf1btqVMT%2F0BHp4Y%2F2bTqLETm4GfGJF1D2I6sE4ezJM69dmYYyiyuujBPNTRW2vNZVIF4miylRXt6Mh9ALNcKfgjdkaheZl7jQpWBxegauu312wY7NwL1XBUwltAv40304%2BMcsuhJTbI1OSz5vmFMKLfrs0GOqUB9Fmjs1N%2FaD%2BQ0J50kDMyGvUJd8JncbRDj3QK4%2FNqoI5WUT7lCJbv2AofbJ%2Bs8zK67tL5iFdVS18QZNER44YC98Rlxn1%2BM4SjsgMreC1K%2BoA80fZCAAXnGI7rDOqIHGtFnIAgLvZGFtLpQaZHoD0pAFhmoBuwJ437AFtuvnKIK4ffE1SsWxAAdFJByyZEWGf0L4ZdWcuv%2BohfpnzGPMBKNWujAEee&X-Amz-Signature=0373916f1a3d32b279cfcd7e781e543dc20cc49ae9e3602e0280e8415dff3e80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676HFNQAR%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T052942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJHMEUCIQDfCqfKmShP6jdojAHf4zKNQpCnAN%2BJji7GDusMzp0K5wIgNLmnmIyrq4%2B2LsH5YLVdY3%2B6WKv5AD2EfDO%2F4eOpPWwqiAQI9v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFF%2FDN1FUO36CuDMhCrcA69TxRukSVCSSkkQ%2FwrJFIi8uAvWrqzUMYIuEjldN%2B4RNbc88WIggYXPxKKXdmnP9DOFd6f0zUl7DsMiWuJOBsRvok1t0tYBW%2F%2BMQyhMucGGn7i6aJIE51oI1HBf%2F%2FHdTB5grGe8uALMVl8ZpSZ2rVTZ%2FDQ7B6QsK73y1%2BWbw46B2jNEUIUSzjm1jmP2Bj4evc2brdWNHxGClxt%2BzKy1rEhTnKHZNBlE13wKks7E6%2B68R2mo5QcArEEapSU3DyJlAGf8jmlUsE9YZtAPEeO7FOircb%2FOXMoDgCcwLz7uAjPwqM%2B6BLZX19heRwBfyI6FnQVr26BDQmf2%2BVoJt9u3sMgLpqBeAbKyEMsBPOSXMX6QpdvcxLuZsd9jvi45Y36b0q%2BY09Cg9Vzw17UHlPKBC4ZVZjHweLQKCiJpuc3mlpV4xsOWtmplM7UhPDRr9vLT2C3aonUj8An3pXFEV34F4lgWVIZmlNYay8G4HUTTZf1btqVMT%2F0BHp4Y%2F2bTqLETm4GfGJF1D2I6sE4ezJM69dmYYyiyuujBPNTRW2vNZVIF4miylRXt6Mh9ALNcKfgjdkaheZl7jQpWBxegauu312wY7NwL1XBUwltAv40304%2BMcsuhJTbI1OSz5vmFMKLfrs0GOqUB9Fmjs1N%2FaD%2BQ0J50kDMyGvUJd8JncbRDj3QK4%2FNqoI5WUT7lCJbv2AofbJ%2Bs8zK67tL5iFdVS18QZNER44YC98Rlxn1%2BM4SjsgMreC1K%2BoA80fZCAAXnGI7rDOqIHGtFnIAgLvZGFtLpQaZHoD0pAFhmoBuwJ437AFtuvnKIK4ffE1SsWxAAdFJByyZEWGf0L4ZdWcuv%2BohfpnzGPMBKNWujAEee&X-Amz-Signature=0373916f1a3d32b279cfcd7e781e543dc20cc49ae9e3602e0280e8415dff3e80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZGWBJ74%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T052942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCXVzLXdlc3QtMiJIMEYCIQC2x5LzPwXusLrO2gx4atkjpJsxD6VduItuaxiAYDx%2BzwIhALPKJNg2zPT71uKt0SZrmASDFbYVbEoGdRLe0TUqNBjwKogECPb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzrgfLe6Yv0lcV5M0Aq3ANWCaUj5opeZ9txnxe721c0nVqhHNm1DVv5UBlLTqdZP8j8JIk4fq%2FfnGMNr%2B8zdAxPoj9S%2BhOBOqVytcyrjxjsyzSDfLZ9q2w7vp9Snh6ueDvGw01IOR9mmic7CUGcojpR%2BIl1kH%2FAjRR2WwHst504IbcX74gO5WkPW8ImoJdjfYRGD46Ib1mnTlnfztbt4EpJTht3MHb8P4KtfgPfVQir4dc8bBLo7mKBKtk3oCSVEzw0Kjn%2BjBYfM7nAiCyS%2Bla0V19fKZ9DuG%2BlaUdueTxJGNGUlf8JFuD1yKyq67t2ZYMDm1mYsBU1IVK7%2F11nrkrLU1gHN4laTGzNnbegllq2JDM7C5ddkfSoDnHnCjIcVAgvDDLVufhU3YWeX1igS4MPy9lwmxu20xqrP2B96sWVGkwArmfttw70cEraidoIff18hGVj9iBigPSDQSaX7WON240Ur0uJSNOgLvxFJBZxJAZcIsN5l1Z7Ib4tyfzLmDdl%2Bq8kRjfzH4DygD50RQeTkLxILw%2FIbxIp2dEJk8Bz0HF5bKyjvNIj7dPAmV3C0NwFQMwMs58Gj3OQPaqt98hlDI5XZpskklMESItYPib8WMHs8HvD%2FmTUWPLVL8W9prJbV9sBq%2BI7qzx2SjCt367NBjqkAZl9vbyN0z3MZO8rHOzLm25d86iGu%2BBeY17k91FaMSuvPCspW2S6wbSaZO5JXM3uE2V%2B7CMrirK83Ivy1DxBcxXs4N%2BS7aj1NSSux3xismLS70sgj6xY%2Fv%2B9Z5K%2FODW5ybXRkIUgZsjYbDNchAzqYpFyBAbbNWwineYQj4xErQHYIYHNI4mu4oqnRqdnl1bYuIJUb24kBhLYit%2BueehzffzwyHAN&X-Amz-Signature=7797b4c66684184ae0ae4cd9571f5088a299dfd5dc5a9fb3362344f5594aee38&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

