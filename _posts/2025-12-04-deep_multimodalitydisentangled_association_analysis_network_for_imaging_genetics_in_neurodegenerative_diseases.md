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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665UGUVRHT%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T110855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIQDzUEfkctbmMT%2BxaJSLmJNVucC1Dwkw7YXfjbfzFb%2FxzAIgYm0lUoMZtM2NAji%2FlMuozpDYQC2hliN8nf1ywFOcI%2BEqiAQI%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJWC0%2B8BOfDabaGfByrcA18NTubvp5py06xsNYtv9%2FGykOriMxvC6Qh50R1QEoGm3BWA%2Fk4woM20V7V00zywhpPmL%2Bxbz7wDOhE0DWxtLanDyZX%2FjLvx%2F1u50Fvx4oDBYOCiDq9HXzxoUb5XPeCJbAUG%2FNKF6Z2jbl9rjmY6S3%2F6WXUniNGDhcH3jKBLEACVETB321375bCZXPnNSmzy9PQpJi%2BGr2no3C4VwaKaADmhpBXZW1Vbl02IK2NnjfRwqbkt9qxVnBNGT6zFvr3c1O1GJOukLjWZyynXw6puxkUsraPSaERqWVn90LA5Vv820RQoEAA3Ni31z6xdT8xUGsxSMXaLONTVGFQJ7eJdyJOgbMM3rW6NU6uOhKICu4H4Fdh7z2jScoSQGu4cnEy33xeE6FHXbJqeQnnhkb7rmxj88Chqbk%2F91rzH4aOj7RbeaKgrKMQFITSFtfKwmyTl%2FQa6y61kT0ULzYQ5pZB%2FYbb12qYzXIndXgKi80JI5Tq4QJJ8KTkvVTzUN7ax8bbinUGuyJzeeHqEsmUT8M1V%2BKjLUb2Ja%2FwHu0wniCIok7mCjwBsJa6Mnbqg0wxjicxFcd5M5lwefA3LeBPz2RVFohlh9TKazkTtjmWVEgd03uTs3E7S94ZyFRbRS3X9MOL2r80GOqUBb%2F2345AhPhJb71VKLwHJJEm7U8kaHwfw97Z1MYvi9r9Gf3TKyy7pJQYX82F37twkv1h%2BQ6wndX0dwXP9XMF2FfIg0TgtrL6yWdPJORZyNUmYDy5bX5hcxCed1xS5Zro%2BNgLv028TFQbHo5CJrfVScty1z9%2Fg7QcHBlD2Fatc%2BkxzQbN2u7c5g8VS7gEYLPkAZUTjlkpyBy%2B%2FcPSLTxj2YDxTf%2Bcl&X-Amz-Signature=1e6750faefc596355b69ff61ab4bb88e641fe6365991381a83b494ce62d1ecaf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665UGUVRHT%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T110855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIQDzUEfkctbmMT%2BxaJSLmJNVucC1Dwkw7YXfjbfzFb%2FxzAIgYm0lUoMZtM2NAji%2FlMuozpDYQC2hliN8nf1ywFOcI%2BEqiAQI%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJWC0%2B8BOfDabaGfByrcA18NTubvp5py06xsNYtv9%2FGykOriMxvC6Qh50R1QEoGm3BWA%2Fk4woM20V7V00zywhpPmL%2Bxbz7wDOhE0DWxtLanDyZX%2FjLvx%2F1u50Fvx4oDBYOCiDq9HXzxoUb5XPeCJbAUG%2FNKF6Z2jbl9rjmY6S3%2F6WXUniNGDhcH3jKBLEACVETB321375bCZXPnNSmzy9PQpJi%2BGr2no3C4VwaKaADmhpBXZW1Vbl02IK2NnjfRwqbkt9qxVnBNGT6zFvr3c1O1GJOukLjWZyynXw6puxkUsraPSaERqWVn90LA5Vv820RQoEAA3Ni31z6xdT8xUGsxSMXaLONTVGFQJ7eJdyJOgbMM3rW6NU6uOhKICu4H4Fdh7z2jScoSQGu4cnEy33xeE6FHXbJqeQnnhkb7rmxj88Chqbk%2F91rzH4aOj7RbeaKgrKMQFITSFtfKwmyTl%2FQa6y61kT0ULzYQ5pZB%2FYbb12qYzXIndXgKi80JI5Tq4QJJ8KTkvVTzUN7ax8bbinUGuyJzeeHqEsmUT8M1V%2BKjLUb2Ja%2FwHu0wniCIok7mCjwBsJa6Mnbqg0wxjicxFcd5M5lwefA3LeBPz2RVFohlh9TKazkTtjmWVEgd03uTs3E7S94ZyFRbRS3X9MOL2r80GOqUBb%2F2345AhPhJb71VKLwHJJEm7U8kaHwfw97Z1MYvi9r9Gf3TKyy7pJQYX82F37twkv1h%2BQ6wndX0dwXP9XMF2FfIg0TgtrL6yWdPJORZyNUmYDy5bX5hcxCed1xS5Zro%2BNgLv028TFQbHo5CJrfVScty1z9%2Fg7QcHBlD2Fatc%2BkxzQbN2u7c5g8VS7gEYLPkAZUTjlkpyBy%2B%2FcPSLTxj2YDxTf%2Bcl&X-Amz-Signature=1e6750faefc596355b69ff61ab4bb88e641fe6365991381a83b494ce62d1ecaf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBUMOB2S%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T110856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJIMEYCIQCjV6a9%2FupNNVGVYt7ZVPjvisaecRGWcPXx4k74SMng2wIhAOJBJ%2BuN%2FBeKuNEHZfKJAzY3n8LkRxLBnjqbViGpPZzRKogECPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxKe8YkuRq3ZsiHVZkq3AMLkOZi%2BJKmPBmu%2BcACdmtQqiFUM2LivCkJXRh8zq3Q3NGhmYZoqt%2FUGgpIvtUaYDO6twHyixmlbRAcRZBiH6dKz%2FGREQidX17GEZ9rGRaUsfuqmtZ4EIosXSh9AZ0lOdPFyu6ZEH6XusKTDrrIXSUZaGU%2BMBnJYpyKLJuwartc%2B8L5H87I1MdhVbKAU1Ff3dK6CIFGxgeC5vbLqzTE0oWNZ4VXc8gMaVSjj%2Fq2IScIANwHyZoB8ZjplUcbf1iWYx2BI4rt%2BO8tMj7zwbDp6eeO%2BQNW8YyHGg%2FRRFOPuc%2Bbetxun0k%2BUaLqLf2qfqs5xBRsDbZaOWyPtBO3ztbdhkmJGtyW88SOZH7B2fmp7tfAxmMj5hz3oo9rZip%2FCgfs46apf%2Fmg079Mdn84wjTgSR6V61AVFxMqn54D%2F7ssBqn9NLxumAIZX0Rh%2FSTNJ16k%2B2kBp60Sjjy4DvxwBKst31BJVC3vuI%2B7og8XDvJ8bcW%2F9pSsGOipHMagXfES%2BwDhiuYGXFbg0kWUsFZwlMuUOPVGfLQ0Swx29G%2BDGlKmKA%2Fx0U1UDAiLVtN%2BL6VkqHbRZplyU%2Bumgzl4J7tXO%2FJYKrTdcTRjxUozMVUF5DhpkGGUkYIj6G5wPbFYCy7L%2BjCO9q%2FNBjqkAb5p7paQ1xqghFeGqtyyYUL1Z3BBkPsaZgJ3W%2FoRGz0tsg3DYNpTIG%2FYdNgaA8rg63FghijH8DoERqEYRSGPnS3EWg3Fm%2Fi9h7Oxt45foPQGcgqAqzlEZLAmsOl3tvPlC3sx185eLOjbaGRRuVMCpnm1fqS2Z8pGXcA62k4MM4uWB7IwRzEvuFs9V9XPEiaupVTEw1HKwpCEgIKFNY77i5mBsNl7&X-Amz-Signature=7069c1b3565ea4e71bb3e25bd5ef156de05a54b1371c6177809a97c3e074e966&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAI6Y5RF%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T110900Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQC%2BK333fWbL4rn7lPak4gDws44%2FC3sa7PloVS0kYAYk9QIhAN7jOtWn39GZEiqmCbRukT2HACQ0RvYBoL7orqCBpDCAKogECPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzcZ86rR9Q7AdLeiRoq3APSnx9zWi3e68aDY0AIVPJFlHjWYBT%2F5VLnF8qwTsKkvMnY%2B%2BFzbfbGZw1x4DZIOsR%2FnYy8uJ6foxcELgrn7k%2FGOPBrhQi%2F%2BGCcIAuckVBCwPR9Wz5f1wGLrZNBOZ428beUPJcPLGYMN7jdQcOXjRcvqMBNgn7PHaej7JFNbp9WuxFQ0arydeiVtmoVDx4nT90A6gG0IhDtIq0oLoWHQIbx5oqJqdgFOAVSbDKiDUm7w%2BgU43icVAcXN8sdgms%2F7lD8GolKhMJk7hVC54EBmMP7kmstx9l832ncFbp9RDoLd0Gv2DaOZGCek4BU95jL6BMnElVcRAJol3%2FiqvTNwZPVQJtVNX7kOj%2FKkhVsYxWIiz6T%2Fgs%2BIF3ugdbl0nfPJX6zV%2BkD%2F1lyz3Vmk0Z7oE3DdKvScLFglMr4zU9xK7Q%2B3kaOnEUwOqD98l7d6mPxVYI%2FNyrRYcrVtHQ5jYlo0DPE7KImPG22UZ0ngx%2F9xTxaZAFZP5yHHY2YXDaO83h4IBUbCcW81fXOFN0Uc8%2FYvdgvTUEdIFgpc%2FEK9M5FyNKZv5y342B22lCk8%2FvDD0O%2BLFc6CzS8F1E4VswE48MxgDxAKoPaj%2B1hpD5RfzhnPIJe%2Fb6c7emzsuZzXX5PjDCW96%2FNBjqkARqLLtpLe57eXrm1xGSzYgUTL5EbWRK1xilLMS3EFjvRKZvgJTIyQgs1sRzIA7zkDDFuWZL9ohzxghhUM6UY%2F3vOcSR29eQ0ytjMHOzw6YSyjyfcBd5gDfZL0F3IE8%2F2eEtiwqz6vdEuPcGXRniSs8Xa57ipmAHGbg4QqAQwGb8Miyr5J2yufwg%2F6QQx9U71HMyhZfUKVtg8tUrXb2ROSeXFah1s&X-Amz-Signature=9d4bc6832fe28139df3e6c4f5f8b73c928cddc5beb6196cc2ba6e0a43978b0b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAI6Y5RF%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T110900Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQC%2BK333fWbL4rn7lPak4gDws44%2FC3sa7PloVS0kYAYk9QIhAN7jOtWn39GZEiqmCbRukT2HACQ0RvYBoL7orqCBpDCAKogECPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzcZ86rR9Q7AdLeiRoq3APSnx9zWi3e68aDY0AIVPJFlHjWYBT%2F5VLnF8qwTsKkvMnY%2B%2BFzbfbGZw1x4DZIOsR%2FnYy8uJ6foxcELgrn7k%2FGOPBrhQi%2F%2BGCcIAuckVBCwPR9Wz5f1wGLrZNBOZ428beUPJcPLGYMN7jdQcOXjRcvqMBNgn7PHaej7JFNbp9WuxFQ0arydeiVtmoVDx4nT90A6gG0IhDtIq0oLoWHQIbx5oqJqdgFOAVSbDKiDUm7w%2BgU43icVAcXN8sdgms%2F7lD8GolKhMJk7hVC54EBmMP7kmstx9l832ncFbp9RDoLd0Gv2DaOZGCek4BU95jL6BMnElVcRAJol3%2FiqvTNwZPVQJtVNX7kOj%2FKkhVsYxWIiz6T%2Fgs%2BIF3ugdbl0nfPJX6zV%2BkD%2F1lyz3Vmk0Z7oE3DdKvScLFglMr4zU9xK7Q%2B3kaOnEUwOqD98l7d6mPxVYI%2FNyrRYcrVtHQ5jYlo0DPE7KImPG22UZ0ngx%2F9xTxaZAFZP5yHHY2YXDaO83h4IBUbCcW81fXOFN0Uc8%2FYvdgvTUEdIFgpc%2FEK9M5FyNKZv5y342B22lCk8%2FvDD0O%2BLFc6CzS8F1E4VswE48MxgDxAKoPaj%2B1hpD5RfzhnPIJe%2Fb6c7emzsuZzXX5PjDCW96%2FNBjqkARqLLtpLe57eXrm1xGSzYgUTL5EbWRK1xilLMS3EFjvRKZvgJTIyQgs1sRzIA7zkDDFuWZL9ohzxghhUM6UY%2F3vOcSR29eQ0ytjMHOzw6YSyjyfcBd5gDfZL0F3IE8%2F2eEtiwqz6vdEuPcGXRniSs8Xa57ipmAHGbg4QqAQwGb8Miyr5J2yufwg%2F6QQx9U71HMyhZfUKVtg8tUrXb2ROSeXFah1s&X-Amz-Signature=35b3006ffbe447bfec5159b0985d7ee14721fc5d66c5b26b4fb01fbb8ccbf6af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46653QQTQA5%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T110900Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQDKybJTYey3ScveD2nsdkBmH0bOqGGtIq9K8ZkVfSHywAIhAIFKlaAroYRH2hh0CPLWnQ%2Bppl0bU6lVL3dCC40ZSOA6KogECPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyJ%2FAdjsnZFdoKu9dAq3ANHnue5IcF0tDKc4FyPjZ63KXii4dS6aAVEeTRk3f318iXjM%2BHnmhyZ8lySrJ8%2BtwPHNQvvxLcNikxS%2BqTcQEfNBX8EsnfPXluIm%2BQbF7jwNg33OnBCHmHMRPEnsaOXylmV%2FNbKFH3iOhzPsDovktYk538uuoQ%2B9P6Ne7Iy94nepoXCs33kD0%2F0diMEWZusrPvLMybOChH3%2BTLXeQlpgQS7Ij0eRs9xhMNx593d%2BD%2Bsp1DlKRI%2F9ByhN25TY73SqxDv7xUnhQZ%2FKm88ktuxcHMAhv3lzlt8jHhMUWIZpLdufb%2FPwyPZQhjYSahCfDdslFbee2%2Fm3liKSTooAdvPFDPhR3S2iivuSsXtxrVH86bXl16siYYLAogn2rtmUpzuDpTgZ8dQrNxf%2FbAa%2B1x1%2F43AuCocLrxgF2NMXaGM2I4lBMbs9dydD5OOsccyaPYJWczmO9sTmORAdr96UXZRvDPonFNCF1E4NZgAfZazTI29%2FouH1RpiXKPJ9UMyBy8gcafb9Tzd95fECXbYP9iV7KYzvRM%2Bb5TptcaX0yYS8BbdD%2BFyjuFVfb95xXGzXGepzxVSJvAmAq4b8GIqxKUNEKrSCrazHx9jmBghGHKBB6FFi4W%2BISAJ422q2BmR6jDw9q%2FNBjqkAUml3doyAjN4lUWfbT78IVrkww9ZHNa7f%2BGinVkfE5JOnxnukks3MMt45gyq%2FWS6M98Qfd1pxFrLUft8xVuAoIkoCSOsWV8goG4nbUu8ZOaz4eRsTtj7Cs8oZ2Chh7U50B3I7Pc0vBszT8yH8IA7vvusNN11jflgRxNajRPeZr%2F8epw8Rc7506ThEzqFEO2Qb1Rgofznu3Y3fC6XrPQ4lrCjmtEv&X-Amz-Signature=a032aa93ec1492af044cd7bd31ea89817e5de759147b4c929d0824c6b5181c6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7AIIK7D%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T110901Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIQD9MTqUiKXoR1hozUhL6un1JcKRbo%2Fi5PAmpO6dW1Tu0AIgXiX%2B%2Be7DS6GIop65V18YsVm1NncDJsqFTvXNGtXsWsgqiAQI%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEnavC2OnYt6788Z9SrcAyOALckbTzXmb6L0bP1GLzxHx90n5ihQ4NA2qHdE4IFgZc9xU6yJz0b2CMuaAadrOSr5ucIezpt1sVDq9o6YSZ9yvHItdLhU7%2FDHsOJbftbRpjKaaWKOAsC%2BBr7RrcVm6s2Hre9Yk0ZXqdCIje0eJ6e82xk9KPWHwsNgZdDSYGSOCHH4X5AqHgqyceoCiWyWaOgKrMpg%2FUDbg9S2%2FzwqR7BdShAHZgV7zkatmSaqdzsiDBZdEZSkHFHnfxNayQKAteutgQCL%2Bt2npJMKcBT5vWoEsZxXj4a0tb3RrzimNLPNN0ojYC5%2BCLFX2nm3xah1%2B90WJfXR%2FdmV9IDw1s8qjYA648u1s%2BK2mA%2FbryK6idGOiBBTYtYKLBHnaP9zRCXsrlVv5YVqA%2BurY4sxlllT9xSH94Cvb8th0FWkrqsploWPRagdgLrGalbslL9%2B8bI5yXvFK3wsHOKRZ%2FW3nbC1xT9hJymSj%2FxDf8J7fmwKF9oULjvJ0SjMaG40f4p9ABodfSyDR2%2FHnz2pD1mKxUAOir%2FidIN2LIVr4sSWmZI0DoBH6h2%2Fkli%2F9PtE5WIpUc6YkyRDoKIQHvE%2FqbiJ%2FgxygNTLYQI3t9WfIgsoVEmQJl2NvljqkdyLMiutMdouMIX3r80GOqUBRkLwt%2BB0MybeWC4E5VWV4p%2B3t3Nrr1sNsCaGNrQl3pwwbysJsOwkg51yHVdflpmF%2BI7jg%2FPkjUAmYiP%2Fg1JUNCS4Vp7nUagJx%2F9gFbmKVyq5GCccDil54eEkRGvGfNMMmgaHChMPkYu907ORR3BgCecQWRAMCpO5msDJcS%2FJ6wRLKpr5r0esvuLsxpXwCIVmweq%2FdppyPPfSEcb%2FfVyFWUbKG%2FEe&X-Amz-Signature=b14e7f52055c132586026663a49f52338109d407a367282ebc3395d9f02100c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YXU73NZD%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T110903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCICQoCWWB6%2BzWGdRt8Am1jSmi%2B17d%2BbDT3C97eLfpknNwAiEA2%2FGMSWQtzB5ugFfL4zMfNSFYUEd3Iel8%2FXR98Yuc7m0qiAQI%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL9bowL3d5n0m6jGKCrcA66OA3w5n7ryiuTnhohrQTb6iwSyDDS8%2F%2Fde%2BuBgF1xH03gsytjimR0%2FM18mT0XBAJn3UQmFryzKOoPjA%2BVejF0gFENdHjahawVzYYI7EsEwAXYFLl6%2FEQ3sTN8YOz4h9KDrasaUX8bFg43sgp7a7bkDEzNwXs6d8DYi0%2FwH9wA08fNTGsDD2nVro6TZwGbV6pBFwRXC4IFtrbV%2BB2tpAI66F%2FjVhr2%2F5D8dqMO7A6pV2aKJKRi2XivFQFesV40dvDtgvTHxsHKxZitB6sHHf3Imuz8yOWhySMwbAKNGcnPpY0Jq0kfty2wJJEsWE7oVKHQAanSIWGRlTdxeh%2FzQIvtAysv5LsFrDrqWTNKyTiZtW5ewjTWLPk5DlevRuTv8pZKSMjyvr8GO3z79SxWXJ0pMHDv0lQ5V5iKXkjdlkJqbpE7Yx0QlrP0%2BA21gYS3ekfu1LVYh9bZTPIcQD%2FejEqSIkVp6hkhVZoxzBJF8PTlhRzp%2FGD7ffmjqAnzqu76myVZDxBmvqZ5gJauCz%2BazKZDfM26cZOajw3pRpbAauGVMhbyRisuimapOrLylDw7pDxZqjr5pbl5fq62dSlXCs0nXbL%2BHByQDIsnTpqQmLkQEoHi94zELgJmEo7U7MIf3r80GOqUBqqtcjtdu3TdL2Jb1rgJJCTvyDxQOsSfKIcnjxLVokkrg83%2BYRMofDRsUztG94U7W3vWcBqjkU%2B%2BRgLGYHGt4h9s7H8zmhUJ3Er1BCAUXUNWaGsW1nAmXOB95WR36BQw3PuvdY7XEZLNqRsPhQfwJvQWqC4%2Bl0TomhUiSvaay2BRsqZY4izBLtvHK%2Fl7i6M16FBSYPbiyJdjFh01gc9Jzqy%2BS5IEZ&X-Amz-Signature=71be7dc5db58469f008b12a425aa14a097af3f962418d05570c53c2d50c29733&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664V2SZR5I%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T110909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJGMEQCIAYBMrE6RFCadFNAdLZhQm3g6nZP6iKdQ1OAjjsaceHdAiA%2BociOcQOK0HKcYtgdLKfgJG%2BKmt1mGEBIj%2FlE86C1eCqIBAj7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSpRVZceL8UbUyBp1KtwDbp5jGXyFMJA29xCSXF5i7pFa%2Bd2F9vzYYPOwYgqTU3TNPfv3kXq%2B4a9oztRWtUXgG3R1OvZpV%2BjFOMZReHTWb1OxuQJ403JCn6qIcvwDoeX%2BKTzVeLW8%2BSuIdig9IV5R3mUI58IrHCt5oC4v9Y8jS1QOxf8mXqZu6dbIBFoZswrafcf5tHkTdf6kIu9VvC0POW0abrhAywOdpbGRYuGVb5rjiwXhvmfAm6fRggf%2BxYP%2FGpwqX8gh%2BLjGou3H9ju%2BD0jU7XF2HzoQxMY7ZRw5adLHoM2qzyOpaSDr1c%2Bx59VURzDysMJMjTnvtr65Kerd2nJcZBpCczHynOBMfUW4gB0pxGeVV6ry6uBCkO2WHElzTjL%2F1h1SQjNz4ajvC8eKIhWfW1AL6lw2XHnrlVXci1e4Fn4P0c7WZ%2Bmo7swvQW5CKA2dYhom6Il1%2BW0gpwqF9PJJCjU1FzuKGc9J0ITjBSBGLBNRcjWafa3NSazr8uS%2FHrSHrA%2FDPUTgByH4MjM05p1fvBvkJbIVcAncY6UdJym1AWucec9eGTO61yPoTSiv8p%2FB%2BDZiH9wvCZlFToQd1FBTyVjzLXA19ahFRvvqquw14JmcXumfqV2HhHTNfz5HB4bmzbiyw3yc%2BLUw1PavzQY6pgG7scbrOGJTxjFrRXNcIZC79urzQbBKSp0t5QixtZWM05C8DQIAJ1jQrqPKkPHR9OXnwskyK236xasWNwJ2UGTpPcSRt3PRDcffyT0XFTO4NalwOvaA9RibYdh4%2BDSH2D0I22fVqN%2FV6HqXQ%2FbVeLMztrQBXL%2FqO4xokLav%2BKp0NCoMy9k0OhCLwRne6p%2BlokNjLzWLY0hMqvROAOguaej5bTsOf1UA&X-Amz-Signature=87a9c144124750106bb7ad0282b8bcf4efddc4cf7e36151be6ede96d5f6fc4c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664V2SZR5I%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T110909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJGMEQCIAYBMrE6RFCadFNAdLZhQm3g6nZP6iKdQ1OAjjsaceHdAiA%2BociOcQOK0HKcYtgdLKfgJG%2BKmt1mGEBIj%2FlE86C1eCqIBAj7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMSpRVZceL8UbUyBp1KtwDbp5jGXyFMJA29xCSXF5i7pFa%2Bd2F9vzYYPOwYgqTU3TNPfv3kXq%2B4a9oztRWtUXgG3R1OvZpV%2BjFOMZReHTWb1OxuQJ403JCn6qIcvwDoeX%2BKTzVeLW8%2BSuIdig9IV5R3mUI58IrHCt5oC4v9Y8jS1QOxf8mXqZu6dbIBFoZswrafcf5tHkTdf6kIu9VvC0POW0abrhAywOdpbGRYuGVb5rjiwXhvmfAm6fRggf%2BxYP%2FGpwqX8gh%2BLjGou3H9ju%2BD0jU7XF2HzoQxMY7ZRw5adLHoM2qzyOpaSDr1c%2Bx59VURzDysMJMjTnvtr65Kerd2nJcZBpCczHynOBMfUW4gB0pxGeVV6ry6uBCkO2WHElzTjL%2F1h1SQjNz4ajvC8eKIhWfW1AL6lw2XHnrlVXci1e4Fn4P0c7WZ%2Bmo7swvQW5CKA2dYhom6Il1%2BW0gpwqF9PJJCjU1FzuKGc9J0ITjBSBGLBNRcjWafa3NSazr8uS%2FHrSHrA%2FDPUTgByH4MjM05p1fvBvkJbIVcAncY6UdJym1AWucec9eGTO61yPoTSiv8p%2FB%2BDZiH9wvCZlFToQd1FBTyVjzLXA19ahFRvvqquw14JmcXumfqV2HhHTNfz5HB4bmzbiyw3yc%2BLUw1PavzQY6pgG7scbrOGJTxjFrRXNcIZC79urzQbBKSp0t5QixtZWM05C8DQIAJ1jQrqPKkPHR9OXnwskyK236xasWNwJ2UGTpPcSRt3PRDcffyT0XFTO4NalwOvaA9RibYdh4%2BDSH2D0I22fVqN%2FV6HqXQ%2FbVeLMztrQBXL%2FqO4xokLav%2BKp0NCoMy9k0OhCLwRne6p%2BlokNjLzWLY0hMqvROAOguaej5bTsOf1UA&X-Amz-Signature=9e541a7f5f31187d97a0fe87d8e9bcb41864cfa1b8930d2265343e0ee3db8857&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZHCWZNW%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T110851Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJGMEQCIFlDRz6u7QYEZHvGg3vcLxgDWMIShUf7FZ1xzcATgwvCAiA0zXK%2FTLRzXp%2BImSnfbuQMGUZe63cybzqVAovzz1O1iCqIBAj7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMv40Ftks18xNcjAKDKtwDH82wXkFUInTkHBrR0Qr7ikPaCiXVWPRzoRyBpEJSdtsJHde3ZnEK4TcRqOklQ8qyzY5HF2AwAQpgSgiSJImslqgaNjLp8BOAJU%2Bn5l8NUqfHPPy72fDQdnSZaSpoIvpUm%2BjXomvzMIxAw8sWjjskd59nO8csvCrQpntQCL2RXyuwE%2Fu4BqyKfnP4C9wnWDv%2BEy%2FVigF2ckpp%2FNDvX9y4nJpDBcPp8WAbDiLUgXMqAfve4sDntE4tlzWAicTf1RjBuR3axw%2F7%2FpZyrUb04OVtZDOm442NKHC6vha5Jej7suMZD7wd1S6Vhv8gq%2B8cumDiY6V6tDWHL6Voik8h0TYkmHaQ7NWTSSApel6LjAdbwr4Iw9mnQN1vUyzr2ZXgZq3Ea9VHjZwfwft7XNkVFFLbN3hOIWChLlPVGCJrdCcm2TdbFOTtlRbLiDr41VmRPm4FtWcc3JkD%2FDo13XnoaEXuD6p6w0rLg3BLtMgGuruCVsNLlcFDIiKMlcgnhwz8TOG1%2FwS4fu08Gtww7UXEVPrZfLj%2Fou66FgOTahJJVuDxWThXDiZg%2FZPcVnRzbyhh9kgmA69zzYBHMRoCkUXFLh1CS53%2Bo5ko%2FZ%2Fm2LLf8tEpYSpMFhqkqy8Tly5UfUEwt%2FavzQY6pgHoALjQDIDfUMr6fBq7ieMPG67GWrHYqKFx73W751YrcsByYs2%2BRYaUQiSasIkxHAiZW59EfpY86DNscAK1NtYuVbiwM%2B2LyQrUv6B3Qx2bIEBYkGNnHpaF%2BhCw6mEn270qV652vvem9N3YEkWXQ8klwUT5ZovI0uzbt4iz2z%2Fe1ZHarzhBJMShNLwTnYN2U6qDt5hxNv%2BtcjGgwBQhIbh6g8Nq6N5Z&X-Amz-Signature=b3ad96d4ab59ca3e72654526bf38a86b1f74034e8b6764d48ffe3c0818a39f83&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FNWSRHE%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T110911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQCzlLAfg3XTWSqw8gky2mm44k9LY3SVtcxIvSnvcwG4qQIhANC57KHK9O4eqnZQdKFxEQkgQ8XG3j8DT3%2BILeKezQdIKogECPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgySF05LwZ20CvaJE9oq3APgQSm2%2BDESQQG5nP2v1N4XegbORN8Iq19V0jozEdgE%2BrqYpXCOhcRPLb8srx%2F4XQyegjCSA9wz5LYiCCPUmSKJVfJsiEI14TWmSf5dFmGXnQcnBkXVnghUop50WQcH43W17LUj3J7gttj%2BgCbPx4AdQNhLuQqCfeFmh8Jz121YR6y3pfY0FQqTBWuWVVdUliFyAkTW2bXF3l5onfxo1%2FapsVQRL9VXkRJd8o9nwyZ2ho%2FMAE8L6N%2F6zgarassbEffBvjpLAoo7AJYhAchaR%2FyXSbhJnHKZpVqqg88J7SWYYXqTtmdRTiCK9r%2FkTANZaGbMUjohH3rbTl2UsaVKRzd1C5PGGWehCD4rdo8eDV82uAIPFiVzGJ9kidrrylqZlZnLGzfxA0AVi7aZICu2ZtDz0bmOGtuN8U3x3ubSO%2BCk4Pt9YdrxxTjCt%2Ba%2BAaZ8nhVO%2BDNMYmIU3IU0fgUxWsFyaPJ7XD%2FnoJLENXFeJ7bUh8URUFWwq6AF7ab3WiXaDQpB7apa47yfkTvOPqzTLgSGE47PqHUwXlqYP3dAdCm%2BGGWMJqhO2g8ltsVwREMVP7IulUdEFnjNe0ZgQky8RPDw1AHGyfg8wpEQZUqnZc4PBHtYy65ZNPo94tcgmDCr96%2FNBjqkAY7p5alJTb5ZCx85JnfQYOdBV34r6X5jMoR7nL19gWjdzmm4NHPbzzkRrVSFrSJBC58k74gQuJYIEnt3asDSYF%2BDOB1fSXq4yGwoC%2FmGzfMa8hYuPWVt5MwvOxR%2B3Av%2BTtWBGa%2FyIvYhH0J27n9hrY50Ukwv%2B8c0Q0Z2GcAE%2BvsIuZbDlpE%2FMWPl3LlnJVwrYaw3WitOcBgF5RcmY4YBs28X7kKj&X-Amz-Signature=597509f776f883db95330b9e0502043f2119393a48d00147602bf26d3a583a68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666FNWSRHE%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T110911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQCzlLAfg3XTWSqw8gky2mm44k9LY3SVtcxIvSnvcwG4qQIhANC57KHK9O4eqnZQdKFxEQkgQ8XG3j8DT3%2BILeKezQdIKogECPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgySF05LwZ20CvaJE9oq3APgQSm2%2BDESQQG5nP2v1N4XegbORN8Iq19V0jozEdgE%2BrqYpXCOhcRPLb8srx%2F4XQyegjCSA9wz5LYiCCPUmSKJVfJsiEI14TWmSf5dFmGXnQcnBkXVnghUop50WQcH43W17LUj3J7gttj%2BgCbPx4AdQNhLuQqCfeFmh8Jz121YR6y3pfY0FQqTBWuWVVdUliFyAkTW2bXF3l5onfxo1%2FapsVQRL9VXkRJd8o9nwyZ2ho%2FMAE8L6N%2F6zgarassbEffBvjpLAoo7AJYhAchaR%2FyXSbhJnHKZpVqqg88J7SWYYXqTtmdRTiCK9r%2FkTANZaGbMUjohH3rbTl2UsaVKRzd1C5PGGWehCD4rdo8eDV82uAIPFiVzGJ9kidrrylqZlZnLGzfxA0AVi7aZICu2ZtDz0bmOGtuN8U3x3ubSO%2BCk4Pt9YdrxxTjCt%2Ba%2BAaZ8nhVO%2BDNMYmIU3IU0fgUxWsFyaPJ7XD%2FnoJLENXFeJ7bUh8URUFWwq6AF7ab3WiXaDQpB7apa47yfkTvOPqzTLgSGE47PqHUwXlqYP3dAdCm%2BGGWMJqhO2g8ltsVwREMVP7IulUdEFnjNe0ZgQky8RPDw1AHGyfg8wpEQZUqnZc4PBHtYy65ZNPo94tcgmDCr96%2FNBjqkAY7p5alJTb5ZCx85JnfQYOdBV34r6X5jMoR7nL19gWjdzmm4NHPbzzkRrVSFrSJBC58k74gQuJYIEnt3asDSYF%2BDOB1fSXq4yGwoC%2FmGzfMa8hYuPWVt5MwvOxR%2B3Av%2BTtWBGa%2FyIvYhH0J27n9hrY50Ukwv%2B8c0Q0Z2GcAE%2BvsIuZbDlpE%2FMWPl3LlnJVwrYaw3WitOcBgF5RcmY4YBs28X7kKj&X-Amz-Signature=597509f776f883db95330b9e0502043f2119393a48d00147602bf26d3a583a68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4TECWFK%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T110912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDIaCXVzLXdlc3QtMiJGMEQCIHfJowdrhYQ3ixmtUZm6pykvKpt5zk0uXQIheSMjZOb%2BAiAUocLnJWCtJ59XkrqTn0nOVj1wZnX99Hkd1rEyjIInvCqIBAj7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNcJYKpFsscZChh0ZKtwDFJLDhmkJZIWLqV3NsoC%2F9GhWT3YP3XfkIhFye8x7erB50kI2U8SjHZC1WVcP1h7jAIUGAbO95ZNju0e3gUUp6KuD6Mu8xi6bvPj8yVr2KkpQ5%2Bxrees8Y7S4%2BPtdt236wkth9qvy8DDwO8PYjGwKV9ptd%2Bkw6XBdqAv%2FYHDNDzNFLgmofQR0GeXOZnZ6vYJDHEcxqJ94DyM1kkxv1ReaYhIkqURK%2BPgXXfxO9rbsI2cHrSaeGi93O1%2BSE80dqBDiGq4jU2vn8sV7piHsmfUTPhzjMYSLFhsQkfIk1KAVcuckc5JG1Yj%2BfcfoOQt16vebd5ELKvdH5SCZKjPgGiWqoagnImUtsxzeBPcNXWFBWTn%2FPTLJ57b346sRWaatVsU6YwQNbntqgise9wUW%2FOvIePNKnLsV8mBSBeeLdfsaCLoc8ljdgIYozZGE5tUZZWnlvzGO7REPOiWA8Q0mSIODEdCdwVqcXQTanOxK1vRVsdLML4GvkdWWr2QaYYW5JZxBytOOet5%2Bx7OC%2F0zXCExxPaqn6vKkCVTCXetlGWiUT5WcfigrYzo1L9cSbppiVoKbpOgS0P9GiEx2fcWq%2FdLnX5Y4HSdRvOeBnXy3abYsbiNNpksBLk9wXrReYnAwx%2FavzQY6pgFuccNzC8%2FBkSG93gKklsbfRIzZonZg%2FJR41VnhoTshgJfXjsl3VmsVtyopXrcuFY%2FG8Vq%2FuF0SnBede1Ua1ChyGEi%2F92VbvkMzX0i4P5zHSxhnndtlDhu9KOnYHUpm9wu%2Fb8Vw4LYX%2FAEwDCQvfm%2FdnaTUH%2FheE8RPfrEluTTTRdb3GPAMqEyoNQY5iphhRuhTiGPMJ6xHX1GSbSf%2FATCgP58d0%2Fz%2F&X-Amz-Signature=ab7ecbabec3e47d0b5f5b3674c4d051ecd8e510b8db0d1df4e762c9020704002&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

