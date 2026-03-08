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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X36FQ6PS%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T091618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIBA0nLeTH8xuTyTChBXj5iCwX8NAjEgvysAmFVyk481vAiEA1CapX4FNXDCdkYkw6JIzFNvA24QQB28I%2ByoSWQVmvW0q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDMsExmPTd%2FhJDbQZOSrcAzSB1Hotz3NiugpZgezzF%2FmtIiCaDhO9Nz1TASdyc6nLfvRD8UxPKjBq9kgSGQZelDpyhz95MJq4F4onAErq%2B5ygTTgL0nT1NnZpMY4ro1dS95Tx0Xj06SPKyvL900Jqn%2FbdaHAoETJrfqO1G069JFzHd4NdckI5cdrKooEJXmDVKMcWjEmKceefFMNxHUWM6OEfkg1VbeZ24Q%2BAjqgbShlpwcU0%2Bi%2Ffs6TmukDOanFzy2eezbVYW0BuJGoNfCrLZl3z%2BY9iyz16MlnIaCLP%2B9aqps1oS1nvwYUMUCwGokLbtELGxHOTDBLt9hJwwnJuOpv%2BLs%2BRZtmQqdlE9ms3PColqXCKQQ6YP9kUESXED6jQnX6GIgEd1VsR%2BIDtYcpyPXk4V%2BKtDtGmJTc9%2BSGyfsNf9s1ID2%2FDNkv80Q6NS9NBYp8rtV%2FYr9V897pGC6zzdtTbmU%2FSUFiv8sFlhaiLwlA7dI9kGJaZ7r%2BW3cnPsR%2FH35u0ClOFXDCzNclT5GG2EbpPcv3rTXO1QnokCl24iIZhwKpSMqKf5noyKAMipWtIcBY7E6F%2FtLwEO60wyK4YMgAdQ5WJgWrOTr8U7a9P7mvdLVjVDtXfXQPxYoSivnx6dNywQdBdHP9XYLDdMNrYtM0GOqUB5fZzIUZOUTpfcgP3oz%2F0QTNWSkFqx9rxETyLrUphbvP3oFqWtKDaZ6f0RT3oWXqQRfCmAsq%2FaljjHzP%2FboUQznmttaJ8twhPzRqzNY%2B3Rv3Nz%2F5Rq5NI9kIOWprtE0p9Y971UeK86SSF6QiBQUtPGgVIDo2zwW25cotmbYB0nnvL4qzLn8e6wDquJjM99WWV4RtYAF4yknoElcCsIuizMeDB7ext&X-Amz-Signature=58b511f0671bbcbf37a9bfad63b1c2357b0eac085b5c5ebe0bda434abe4425dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X36FQ6PS%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T091618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIBA0nLeTH8xuTyTChBXj5iCwX8NAjEgvysAmFVyk481vAiEA1CapX4FNXDCdkYkw6JIzFNvA24QQB28I%2ByoSWQVmvW0q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDMsExmPTd%2FhJDbQZOSrcAzSB1Hotz3NiugpZgezzF%2FmtIiCaDhO9Nz1TASdyc6nLfvRD8UxPKjBq9kgSGQZelDpyhz95MJq4F4onAErq%2B5ygTTgL0nT1NnZpMY4ro1dS95Tx0Xj06SPKyvL900Jqn%2FbdaHAoETJrfqO1G069JFzHd4NdckI5cdrKooEJXmDVKMcWjEmKceefFMNxHUWM6OEfkg1VbeZ24Q%2BAjqgbShlpwcU0%2Bi%2Ffs6TmukDOanFzy2eezbVYW0BuJGoNfCrLZl3z%2BY9iyz16MlnIaCLP%2B9aqps1oS1nvwYUMUCwGokLbtELGxHOTDBLt9hJwwnJuOpv%2BLs%2BRZtmQqdlE9ms3PColqXCKQQ6YP9kUESXED6jQnX6GIgEd1VsR%2BIDtYcpyPXk4V%2BKtDtGmJTc9%2BSGyfsNf9s1ID2%2FDNkv80Q6NS9NBYp8rtV%2FYr9V897pGC6zzdtTbmU%2FSUFiv8sFlhaiLwlA7dI9kGJaZ7r%2BW3cnPsR%2FH35u0ClOFXDCzNclT5GG2EbpPcv3rTXO1QnokCl24iIZhwKpSMqKf5noyKAMipWtIcBY7E6F%2FtLwEO60wyK4YMgAdQ5WJgWrOTr8U7a9P7mvdLVjVDtXfXQPxYoSivnx6dNywQdBdHP9XYLDdMNrYtM0GOqUB5fZzIUZOUTpfcgP3oz%2F0QTNWSkFqx9rxETyLrUphbvP3oFqWtKDaZ6f0RT3oWXqQRfCmAsq%2FaljjHzP%2FboUQznmttaJ8twhPzRqzNY%2B3Rv3Nz%2F5Rq5NI9kIOWprtE0p9Y971UeK86SSF6QiBQUtPGgVIDo2zwW25cotmbYB0nnvL4qzLn8e6wDquJjM99WWV4RtYAF4yknoElcCsIuizMeDB7ext&X-Amz-Signature=58b511f0671bbcbf37a9bfad63b1c2357b0eac085b5c5ebe0bda434abe4425dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUM56Q45%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T091618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQCJh%2Bz6U3DMCJrbuJj30hmCftoofhrk4X1o1DgqgN%2BxtgIhALkwMhfbCV1zzsBF8%2FlyWAzZ7%2BNCd%2BS8Fkk1OlOJ%2BjyMKv8DCBEQABoMNjM3NDIzMTgzODA1IgzjyQdn3A5FZSCy5Ecq3AMCpbGgeJSIl%2B5KAluSVdh%2BhSgC7rJDsMXxjZqWnOkjNYYJC%2BhH5rIrhJgN8k%2FTjfg2v9vRPnCREmjACdivQx6iIJgWfUF%2Fgr73pkPRy%2FURZxJICElDv%2F187dOlJHGCZphG7gjAAeqzZuPq%2FS%2Br1AwB6OgR5xogN7wJdhJWKteKEAqCBhUprZmgRWysPLwGCA6rLu%2BfXiRL83OHmaWI4bMbDGK2QJ3Ks4E8xskVQ55Z8Z2Ho0dC3GFu1JfzGX3ffSSwchAtvMwFrFgCAo2CKe2RbJN%2F3ag7lxp%2BMZYScKvo4wiMJxD4LUhRVM0pDYKDccFDAwc%2Bus9mS7DoQHSzQgNBrwRKP8GEkxSR7STXjfUPvaykeoo2gHucIuTnFPdvbdWnsYTbIXqvK%2FzkkLRxFyRsqLpNF%2FJf8T23gRCk%2B19AMLiHNRMEs%2FJfFR1iiDEmFuYYJ0Sf9nBRLGHpQI%2BfEYq54jWWOaYedyp2VZxbtWKGxn9hCedr%2B%2Fw%2BDaEDZeVcGMw707OlR0M5SBkRF70CUYP4%2Bzavn7H7HC%2BALS44aynGMfZMsJizF0xzYAeemfd%2BaH3xx6GvCWnPZNQZpup279PasuK67DEaE01Q15TtL1yKD2LowP2ApkFUT%2BWFKDDK2LTNBjqkAZ6mYnnaXaq4Sv78tWrs%2Fl%2FHbN9Qog4lcNE%2FI4yPzosPzZayndJ3VsFlyVy6VEV2PnU%2FE5sqsqrTA1xxWPcqTf9%2BfSeUNxj%2BjnDxID5yazX2md4azq1AczY5JP61dX5IGmlt62035AvrguQSzspByx2uJrvWYqst8HZYhfUyBR4Bghi37oTD30P%2FXdxutPj%2FdAzxlHcJAeNWETvWSfzelD3Y6u5b&X-Amz-Signature=85768179c3c95edd7cafd27e8d4ca4c5b238c7f79e2149826f3612951dd75b22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665UYQSLPJ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T091621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIGEIF8dj0YHYujUT%2FguOkI17OMdfPZ5RMmU1%2BX%2BeaxJuAiEA8UVZ%2BrjAN8VP6fIMFjlHUmwD9GAr%2BI7prAuQU1bG0I0q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDMBNBq91%2FWnk48PZsircA%2FnGEGuO5Tmd11SKUAAVkaNclYVsFqibcz02I2N03TobTAHwFW9O7%2B1R%2B917kSeyvPqLxTh7iQxhSoEb1TAF%2F%2BBKq4%2BwP5fVxquxoRk9ZKsKtAIdmWjLcQlt4VERP0H4KWE98bnZQNzu0nWvWM%2FP68q9ctKD2dB5xSqs428H7kOA05dzjI79lOmWI9J4kZLUaO6xgDAnVYdb7MxNyLw%2BDkhE%2BtbgBZg1HCZcaleN5nKoXs%2B3JGE0Ptp8DLtIiktDQbEs%2BBSPytDNe3lHTfczLz%2FdhLLvky5xNDWvJNm0QLTGFJrh1YBCUR7Sw%2BkpHP2nO0yzvFkCcHaKC%2BhwW39P8Fizdp4DaPAlwod6FNML3mnnTSkNwhAoedU636Wnqn%2F6QR0xZt1kYN31dLVAl0HDRJETbv%2FyIcywfZhcCc0rxcZRVbOtAnOv%2FQHSW2dd2KlVdyEkRWnSSpkliRxfi0h8zscpPgtI87ucvow%2F%2FSUEBV1Tr7MUG2YtFS%2BgDlm9SJk3bk5z3ISkTvXAZCmyZd6ld3MB2UtjZH0cPI3ToVbpVHTgHTYeQkbYPooNgiN%2F3NNh72OPa1LGGT7YxhoA7fP667u%2F2%2BZnHxMWH9aazluBBQgu34WMKpjF45d%2B%2Fr2lMO3XtM0GOqUB6ikjn5mXrfSqswOYmKT%2FmN0%2B3H2iPg%2B2xxSSzyApAEwci%2B%2BM1e4%2BurwmewY53jGmFcAPT3OD%2FYZtOWhfxmVIz4asR6dk7dWkLfnYvDheHOs31pG5WmAAnErocUVZWrGJdO1nXjGrYr6FvAnMExiF9FMIywhkakeLgzKh7SRxLTjY6iSBdLC65%2BDoWQC2CZUuNdye0q6V9ZEAhK0V1AaThrQ31tpN&X-Amz-Signature=0d957ea077d69c59c1ec80f6918bb1b7ddc2f3889b6855c22584b76954b62677&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665UYQSLPJ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T091621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIGEIF8dj0YHYujUT%2FguOkI17OMdfPZ5RMmU1%2BX%2BeaxJuAiEA8UVZ%2BrjAN8VP6fIMFjlHUmwD9GAr%2BI7prAuQU1bG0I0q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDMBNBq91%2FWnk48PZsircA%2FnGEGuO5Tmd11SKUAAVkaNclYVsFqibcz02I2N03TobTAHwFW9O7%2B1R%2B917kSeyvPqLxTh7iQxhSoEb1TAF%2F%2BBKq4%2BwP5fVxquxoRk9ZKsKtAIdmWjLcQlt4VERP0H4KWE98bnZQNzu0nWvWM%2FP68q9ctKD2dB5xSqs428H7kOA05dzjI79lOmWI9J4kZLUaO6xgDAnVYdb7MxNyLw%2BDkhE%2BtbgBZg1HCZcaleN5nKoXs%2B3JGE0Ptp8DLtIiktDQbEs%2BBSPytDNe3lHTfczLz%2FdhLLvky5xNDWvJNm0QLTGFJrh1YBCUR7Sw%2BkpHP2nO0yzvFkCcHaKC%2BhwW39P8Fizdp4DaPAlwod6FNML3mnnTSkNwhAoedU636Wnqn%2F6QR0xZt1kYN31dLVAl0HDRJETbv%2FyIcywfZhcCc0rxcZRVbOtAnOv%2FQHSW2dd2KlVdyEkRWnSSpkliRxfi0h8zscpPgtI87ucvow%2F%2FSUEBV1Tr7MUG2YtFS%2BgDlm9SJk3bk5z3ISkTvXAZCmyZd6ld3MB2UtjZH0cPI3ToVbpVHTgHTYeQkbYPooNgiN%2F3NNh72OPa1LGGT7YxhoA7fP667u%2F2%2BZnHxMWH9aazluBBQgu34WMKpjF45d%2B%2Fr2lMO3XtM0GOqUB6ikjn5mXrfSqswOYmKT%2FmN0%2B3H2iPg%2B2xxSSzyApAEwci%2B%2BM1e4%2BurwmewY53jGmFcAPT3OD%2FYZtOWhfxmVIz4asR6dk7dWkLfnYvDheHOs31pG5WmAAnErocUVZWrGJdO1nXjGrYr6FvAnMExiF9FMIywhkakeLgzKh7SRxLTjY6iSBdLC65%2BDoWQC2CZUuNdye0q6V9ZEAhK0V1AaThrQ31tpN&X-Amz-Signature=4f7f675ca8c8bccb59f7f88a4eb74fd181620fe778c9f224c69da8968be09abb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URIP3RCW%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T091621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIEUh%2BytXAy%2BqFUySyqldQuk81AiONiYtXEGEf1FEt6j2AiBgErs4ZYG8bDQP3EaC0AVBwu8s84lGK31WRbkC88d1JCr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMgXGnVrsWkqLdYbppKtwD0fOdNPVTXLT10yEFqLJ3UETxv99OufCQxiQQTrpi9%2B7Qt1X6vSQA8mq9Lf6T1L%2Fh0zxxMn8LIfV5vafxY4sDwAh2bUqOtNKWdSa3nFqDhK9WEtUIi8u5hC8dN4jSCHVz8x4GODvUqOiA5QhpM72BtnA%2FQCIMgCowl1ei22%2BEq4mY0xEQPOvEefP9gEHWG90%2F0mW9nKQwdBv5wo73OnXI7VaM5iIbTKf26X4bFP3oAtG1nq%2FqlgDFYT%2F9AiQMPfn1kS0UIfoJg%2FyeiLco08OJ93mlIjBQ4MjB%2B2finYA%2BTpPXVXcWqpgNKSE1wUWi7uP7Dz%2BOQqODXQRiQeot3H3hb2xwqy%2FpBExefqWN9kyvNNHCrnNg0hSdOjDxxTBsepL50greEgi9ZtH9hefdRwIfM1Gnpi6M9ftiI1484MoCmvRAdTjSG4plKJFftGPyPtJBui9eV8UfHIDmg7omezRdOB1Ls0zX0NtvDqrVe7frPc%2Bd3rXV1qgGh9%2FcyRzfZcpH6x6lZwYKsXgyKi5xCP%2FkxfmMQrroH58NgG2pIn0eWmiqJSMatpP8bvwVpU2b2mMtzPhl6oICBiLkdiR39HV%2B8KsjWSYFz6yWugZTLdMzzv5uqfhR9nNVJrst0X0wwdi0zQY6pgEFyW4YX1MfHAv%2BX%2F7g1aA29wN8Mx0vw8KSVuamZ1dlwSMK0CNx36zP3cPXME%2BsVGXs6C80Zh8GSCZW%2BPgKAsJPPeJgGU0%2FrGmsTiFGxtKyDDYsrGVK3%2FVIwBJYSiRlS%2BEAzoo%2B%2F8yw6i6cZ7Oc0wLEL2z%2B7x1QrT0Dj5oWx3al8c5HhGEQOWZFrKEFeZRphpAyeVDhNbe%2BEeer2Ct0eC4nsK7cymTj&X-Amz-Signature=ae6f6175930dd9bcce73eac4489ed410a68a07d9ad048200754e3807408fb4f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVGD36PH%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T091622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQD2KHFQ6qJI9bqAY%2F5JjTocjsXCfYkw2R4DZBsooXUmngIgFcIc1%2BfIBDMFn%2Fu%2BQlTCO0gLtBF8%2FpNnMGWbspFariwq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDGGrtusW00BK0IylyircA%2FjPDZTSbv6GCeXUQ%2FvOe9To42VdSfL8PLCvVvsyV2Cykg%2FGgwqqd4oIoNxa%2BG7NembSQxS38G%2Bve167hDep6Y3zpl3OTLavfsA0rGKw8M4J8klSxTNVeYrv070gkNfGaQYZhU5qZcWH0iWdg1mvThXncOrl12wEKLIAVfwlFWacx39nE2IVJp9C8JU0utNw1bUz5%2BVMdguXgRPCt43HYz74tDRMBG%2FlwX%2BHAH1Ss08yhUBG35S7AhncLfuy%2BhopC8LUrp%2FQfyaRrFgLMxy5opKF00NiM5XyLvLzN5pzfKY%2BEX7lzNEkBZr24t2adlrMzHYFiGCtSYUDF8WzgGLfbDR6ugN6JjQEVyTOEzPyHM%2BSXZMUMLJO6xPEcWBWyNgjtE4LqdDdPImqvyhi%2BKR%2BHsvslkjPi2Roi1ZRNLOV1ijB2LF5bqo8mCuvjHw4jTNSdcv%2Btb2e5oJ6vsbIVslDgbYUUrmIL195ADj3cFSWwb3Pr2Q%2Bpey260unnPd9I4Hy9kRxeQBEwxxfmKEnmCaoA2k3mk5lNwbn1nipl9T4naSsm7Pc%2BsqFdJvWIQ21voMjagasiUYWgWCitmQEeymUAFNzDWmrdeluIfWIKyIhEI8G0HIT%2BTnRpM4ZT9W2MJDYtM0GOqUB8sIu5UpxujEn7BWC7SAOoYjn%2FKhZtzlnWw0siUyq8dR3r706eG1XQjyESmudkVbbqk5fXXMwZKroXwXivskizwLIhX2rvgHnprzHJU6xRTzstQtCwFi0LltQ8chpaK3lbWvn2jEHfw34e0bWz%2BGVdvVLw5PySso1OHUSD8eyDfyOP71wBTjsFa0Oh%2FPNKR4WG2zhvA7J2wafVTvHUVxfhm5I0c4a&X-Amz-Signature=5b3aa16eed5bec94ac60d281a55af25faa61005dd133fd7c13e010d28b524b09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QG7A4XHX%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T091623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQCjabLROhQ8AyFrXzHmzcIPjChZObkG2VIECJEf%2FVSAxgIhAP00dRuLmTZchttlyjxx5f31%2B03%2BiPPa%2B%2ByPCDFGmdi8Kv8DCBEQABoMNjM3NDIzMTgzODA1IgyZVEuuZfHBNHizwkgq3APU5ewqa%2BgNocjrAxprgmKUPr7VB%2FiJ7rjKDI5pX9sY%2ByzPp%2B1l8mD1ZuUKM13fmlrTnd0wXo6Kh3XyyIfw7aBfpIcZBag6C0ecpgwCw6ceAyGcsleL%2FzZ08bdgV50FrEWrgOdfFjB157HFem%2BaEmN6dSCAh9lTnCwJVwVfde74Ms8Yjo0QoX4SQ6k5LRG0gD5d8cbpsWLis1OFXS%2BgEXifYodn%2FsFhrYcfNWsYmTtEJix%2Fx1q%2BiVBq%2FBbSa93f99rnds%2BdfrQ1l0lKDc3pdEEdR3P0GKhVFDIF1zSNt30cj5jt8TJMUlVzh8dTSztvTb8dw0b2JKXEBG%2BuzLCjsswwzB%2FhGJfPDe14kHtDN2m8k7%2FjrN%2Be5ZJooMez9CREOlJe6MWqw5DQy%2FESwvddBbHAvOLS4D84itAA%2FJGK3SrR%2F4SnEYpt%2BhGnzJMU1e18XSQmROzYaxLBWK4%2F5LpfHkhRfRR3x6lWTEyJcufuCxolCZEBGk9PukN%2Be4I0Cpz6%2Bdr6HZEtEiYVr7bBvzM%2FdScBIxvF2cT9%2Bt4iKx3sVCY8HVqwyWUEiALFBhMldLSsGSjnRT0yFdvzrvjRKSdf8ZP6b%2BOWQURqACe6AxVFbgE7Er%2F9I9EvYi1RdGYaEzDM17TNBjqkATGDGPIkTtZIfcna%2B3BGMUu89FWJ%2BEzXEtNsuV0yD%2BnPg%2BzfqG0xZk4GDnbK6%2FhJwiMwnoYLaFRMhyh%2FHtnyUHbtEzRB0wp7wPWyJaxvQN057M8HfxFUtpzIpz%2FGrabK47j5cP8jqcYBQ9SmympJtieF8is0VRXYtq3vd%2FHYn3j06nW%2BbdWgSmVxgJHghlCjL%2F8nwYjEoTJqBJamSpXAi7%2FY%2BFBZ&X-Amz-Signature=fa766240ba30660b47c594b12a982e48ecf228c08aed36973723fc55c54f82fb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V54IEKQK%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T091623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQC7HTORyy2GDdjsvd9DGWrWAmy2yid4LYiQWKru9uEVfQIhAKHG1b%2BC2Cwm2iq3ew2smK1la6hmr1Gp5zT9KNzEvOoOKv8DCBEQABoMNjM3NDIzMTgzODA1IgzyfKuT5zrOK7GblaIq3ANTL6Pik48k4qbwBJsu8mZnj7nuC4xVWfKvJjNSrGyziXLnbDKHAyUTe%2Fh59UJKPYflsiHUNFkTp1WDDLqprgDco7vR46jC2rU%2FLFwCutnbR7st8pznSEQmyc4dYMbwOmkQyPZlyghBO4vO%2BhWxNoV6qcZERisIfLhVJXmpnJsy%2FMs16XVjP3ZZRNOoDiq%2FCS19X8nDof61eyWu5VGh4frPXRhP1cvZezasX2jwaEUR7fR%2BUSf%2Fi1BfjvgacFQjiMKu9kTs3c8VV1rJ75S2TgVRwCNnk3rDpnnPV6BAWrlr0czAWpV4X60m94SBZ8ccnmNgceAZaR6gtJU0WSpzJtMvFI2g1qIIwHjZmgTCx8feOWiryb6sfit9EGnkh3woVcIpI5nIesYrAWrXkeI7TuP%2BfjQCgd0XmoE9Svv812o1F0KeVvKvodZDi7Yknu0d0efqXtJ2A7%2FgEjhTt3F1CMLGiRDgh%2FwqkgM%2BONAjjFOwPB9NvltAHdJmHOzgrJCmmg%2BPzc3l2ghIswZqx0vOd1brZKU1ReSU2yARfpvZ4BY1AKuB3PDbGZnVLgtNIrFmvQJAgRkCIel2bXXcG8OBuvjrR%2FIy6CbjGie8zNHSH9oaIjXuU5Ah0wTSbRqQ0zDN2LTNBjqkAcbS7Hd6z0RR2QXykld%2FPDb1GKJQiBZyuocSqOUlAM2RECNIhTqtRFmKiDyojv1GKkOY8scpYuIMCPYX00rNY2oY3yRI5nK5psd3gikxybcHiT3oKil0poWFvLWOzkiw8NryabP1d7KJMq5359Nb2H2xqWZbi6SStDNbYD%2BX3dHsoUdae0gJ8SNSYK35EvL8xSbPQy4aCxAFn%2ByDUtyFRpzBYUls&X-Amz-Signature=e379d7654800a7bf37006a947eb04dba0f99126790b53bc24e15f1bd38be45de&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V54IEKQK%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T091623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQC7HTORyy2GDdjsvd9DGWrWAmy2yid4LYiQWKru9uEVfQIhAKHG1b%2BC2Cwm2iq3ew2smK1la6hmr1Gp5zT9KNzEvOoOKv8DCBEQABoMNjM3NDIzMTgzODA1IgzyfKuT5zrOK7GblaIq3ANTL6Pik48k4qbwBJsu8mZnj7nuC4xVWfKvJjNSrGyziXLnbDKHAyUTe%2Fh59UJKPYflsiHUNFkTp1WDDLqprgDco7vR46jC2rU%2FLFwCutnbR7st8pznSEQmyc4dYMbwOmkQyPZlyghBO4vO%2BhWxNoV6qcZERisIfLhVJXmpnJsy%2FMs16XVjP3ZZRNOoDiq%2FCS19X8nDof61eyWu5VGh4frPXRhP1cvZezasX2jwaEUR7fR%2BUSf%2Fi1BfjvgacFQjiMKu9kTs3c8VV1rJ75S2TgVRwCNnk3rDpnnPV6BAWrlr0czAWpV4X60m94SBZ8ccnmNgceAZaR6gtJU0WSpzJtMvFI2g1qIIwHjZmgTCx8feOWiryb6sfit9EGnkh3woVcIpI5nIesYrAWrXkeI7TuP%2BfjQCgd0XmoE9Svv812o1F0KeVvKvodZDi7Yknu0d0efqXtJ2A7%2FgEjhTt3F1CMLGiRDgh%2FwqkgM%2BONAjjFOwPB9NvltAHdJmHOzgrJCmmg%2BPzc3l2ghIswZqx0vOd1brZKU1ReSU2yARfpvZ4BY1AKuB3PDbGZnVLgtNIrFmvQJAgRkCIel2bXXcG8OBuvjrR%2FIy6CbjGie8zNHSH9oaIjXuU5Ah0wTSbRqQ0zDN2LTNBjqkAcbS7Hd6z0RR2QXykld%2FPDb1GKJQiBZyuocSqOUlAM2RECNIhTqtRFmKiDyojv1GKkOY8scpYuIMCPYX00rNY2oY3yRI5nK5psd3gikxybcHiT3oKil0poWFvLWOzkiw8NryabP1d7KJMq5359Nb2H2xqWZbi6SStDNbYD%2BX3dHsoUdae0gJ8SNSYK35EvL8xSbPQy4aCxAFn%2ByDUtyFRpzBYUls&X-Amz-Signature=66c7202126f5c915aecec1d32a952836c61ac27b60b1f852efa49f685ef4194e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7MPEI72%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T091613Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIGeQtwDAt6Yv%2FVQrXHQjMR%2Bxrqm9W2pbckCnLZH5WshoAiB5EOzOXCel9uCYtxFYWMKziS5YLpN%2FAYiPaUZ1JsQvGir%2FAwgREAAaDDYzNzQyMzE4MzgwNSIM8ADd5NSa%2B8AuuBf3KtwDlin8tf%2BV2%2BUx46KXnfG7R6uV8Keb%2F%2FLfh%2BYM1BflMY31lj16QvxJspOr8gmIOdkfyHKxYXaAc%2BLSXnhY9xKkJvKClbfg4cJTKfUCs0aP05KGP1%2Bv%2BmcrxZKhTBX%2BaCw0o7K3Eoc4G5ht2azrtyuw%2FPejWvOGPcmB6LQ2dK4f2PVEge5UddwI6etzoV%2BeGJNA%2BibNJE3DWazjVo0PCraetzpFGOgi9PEigti%2BhivtPKsZup9wB6igTPLXJelH5g9QQmYAzR1eHdAhp5t9rrh5vtcsrmSbwUDmw8vDSPsCnWPEAr1%2FsbhEUZc9bZ%2BdXRTDcs9EK8dZyKIB3i9TCEW8kuhVNJmba2UQA9Z%2B6BdNtcjCJ4qg9XENXE7khMbtFeypDJNhtfe3NsKMPyWBMHkqZiJgjgDmN2q%2F%2FPVHPz9NipfGA1kIKwNrsOM7dL5l9uwG2CJa%2FXSqXpWLZYcexCoAS26C8QK2JjTdfgZPyoHGEtu3f2bt2gqk%2Bt9kfOBKYrLNn7%2BetgAhcaWz%2FHkqjRPJTkxulhBLHIcPYFt7OpeQXih4A6yi4yxgtUugarxFTJTf%2BfwD1P%2FLLyMlkjGMyRsbwSTpOmbk6isTDsZGXr43ulCaBFGUmv3tFZpODgIwhdi0zQY6pgFZYt1uUyIPodIemZQ2SBeK6qD448XLG5h8Rw3vIyRQpP8MGMy%2FpKDv9THvzPbIpeN%2BEMv2txhEW7kwutHYyQAA3Pywv%2Fwna5c2%2FMNKeSBPxTVYFpDGGZAn%2BsPTq99lCwdNh8dT5dAD5cHKcYFMhIrH98N%2Bop7MPfdKs8hdlc5G4%2Bro2qAA0F1EhIpih217UIKB2tXp6p%2FMO3GZl0MqacM%2FeZZo2LRh&X-Amz-Signature=3b7236091c504313aeb99ce4270db2b9f032853d9e530b63a7a7eaeba1b5ee01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDRVBRC4%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T091624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIBRQ6zw8bb8oPKH5Ph51KlLl7kn5WYQm7ITzDWANpl03AiAHO%2Bbdka1xvPoqBiDdhM7x87syARHMU3zNLsEXRiirHCr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMFwX%2BGk%2BVAqOJdtT7KtwDBHEIuuKs4iE1Zs0CpSJYEvXpcHjOZxyFe%2FomMmsyLi%2BubhoIpz4mSOEvm%2B4KzyroDzfPId8GbTgEcoQRR7YHyHTYPtaLoItR6ZY84B1wXfVmCdPmvaf1w0r02HrVUvv4LO2VaCF1DHgGatXptZnDc%2F1RcrhQ%2ByvWr1g2VTYoIYb5E8CNP3f8SQ5UjAtKMB5T95uLbid8BCA0EYNYnQtMZThJeXWDlqOid72KSqM5KxgHzpFvmRxsqpHzRBhDz3K95EmIjC0J8AeOo17jLgiFx7lr%2FE5cR2TWRw6Zi1gTbe2rCaFr6JMw6KnAe1YxitTlSUUWry31YkZKerzY6lJjajuTgMiI94m%2F15XwKViFlc%2BSNGfbbQAys1lNqI3jCcNYynMq7MvRWQXhen7nXUXDU4T6Z8D%2FLdh7sUdw4IJoPB2KdPQNRqSZV69l2Y3QCOgEHMtJt34%2BfdNFLMqQLo5AbBZjlxkk32l2t0zsVKBNqReGH1W1iQ8qlbY1tf7CS2xzU%2Bp8dTY%2F9286QfPhM8zzGr%2FyO77MUN2JeDIqqqgQjnQ9t5TDu8wBhho%2B4NHWQGL2XUqC84bTiGcbJrLWdPexjyXJxGapL6Ca13ySIv16kPiqyM5DKAEe48ncjaww1de0zQY6pgF2ZkSmb8fOfX%2BOr4jBaQpB9EG0EqmmQMyW13BQprWSM03BwL4Jwwsx3KUuQRn1NIGrNotS7o7N1aMw7nEOD2kDFpeCjF61cUpfWG4QbU2%2B9CeED720MsubHfMCbiaXCQ5vKPDEwknE%2F3ZZ0DaKcNQjhTBY8VWCrO5rUY0kCQo37MoCmdQFM0beS6NrqdjsPoDnNrbDbFPfobOwvMNtlFDMQmQIQqxN&X-Amz-Signature=4aff1581046006cd37a7bbfcb6aac0868ed4e8532138d61f1c47e89b87f51914&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDRVBRC4%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T091624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIBRQ6zw8bb8oPKH5Ph51KlLl7kn5WYQm7ITzDWANpl03AiAHO%2Bbdka1xvPoqBiDdhM7x87syARHMU3zNLsEXRiirHCr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMFwX%2BGk%2BVAqOJdtT7KtwDBHEIuuKs4iE1Zs0CpSJYEvXpcHjOZxyFe%2FomMmsyLi%2BubhoIpz4mSOEvm%2B4KzyroDzfPId8GbTgEcoQRR7YHyHTYPtaLoItR6ZY84B1wXfVmCdPmvaf1w0r02HrVUvv4LO2VaCF1DHgGatXptZnDc%2F1RcrhQ%2ByvWr1g2VTYoIYb5E8CNP3f8SQ5UjAtKMB5T95uLbid8BCA0EYNYnQtMZThJeXWDlqOid72KSqM5KxgHzpFvmRxsqpHzRBhDz3K95EmIjC0J8AeOo17jLgiFx7lr%2FE5cR2TWRw6Zi1gTbe2rCaFr6JMw6KnAe1YxitTlSUUWry31YkZKerzY6lJjajuTgMiI94m%2F15XwKViFlc%2BSNGfbbQAys1lNqI3jCcNYynMq7MvRWQXhen7nXUXDU4T6Z8D%2FLdh7sUdw4IJoPB2KdPQNRqSZV69l2Y3QCOgEHMtJt34%2BfdNFLMqQLo5AbBZjlxkk32l2t0zsVKBNqReGH1W1iQ8qlbY1tf7CS2xzU%2Bp8dTY%2F9286QfPhM8zzGr%2FyO77MUN2JeDIqqqgQjnQ9t5TDu8wBhho%2B4NHWQGL2XUqC84bTiGcbJrLWdPexjyXJxGapL6Ca13ySIv16kPiqyM5DKAEe48ncjaww1de0zQY6pgF2ZkSmb8fOfX%2BOr4jBaQpB9EG0EqmmQMyW13BQprWSM03BwL4Jwwsx3KUuQRn1NIGrNotS7o7N1aMw7nEOD2kDFpeCjF61cUpfWG4QbU2%2B9CeED720MsubHfMCbiaXCQ5vKPDEwknE%2F3ZZ0DaKcNQjhTBY8VWCrO5rUY0kCQo37MoCmdQFM0beS6NrqdjsPoDnNrbDbFPfobOwvMNtlFDMQmQIQqxN&X-Amz-Signature=4aff1581046006cd37a7bbfcb6aac0868ed4e8532138d61f1c47e89b87f51914&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VUK4CBR%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T091624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIHGGeO94KolUPOjJO5EqnF95GTdiOlR%2Fg7GzlLT9adzfAiEAzCQmjQfZFyEUpANhxbhSZ32olpzCQUaGVTIZvhojxXMq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDDYa69XUYEL5CLroWSrcA3TZ%2B2X87FDJDFOeCKZKSs1w%2B78Ua6sHoZXLXblCjbE%2BDIm%2B97gm%2FtR5sIPMP2UCnP%2B3sYqThhD9fI23ujQSqoe%2B7JISqsKrse70DF3HCpB2x9ounNeTEKGJeGpU8pZ5iheJTkQaYBTuS1KSZ1oOKCVyv7ESMy1oJfv7Nt8RZ0i%2By0UWx9r0AD%2FqRD3ldJDGqv14haw41yzv0lFQDvodw8uk4iW1x2%2BBeLGKXatIRNEUCHwyl%2BX7Okcj1qt10wja9lIpoplNz5PYliA1Y8v8L6c%2BQHY2HWToKID5Liq40JQiKsvLp%2BVOg8P57V1ZI9V6Ko3IrwYmsGxhuboCTR58QIXUrFyTwcs7JyGLXvsn%2Fehxz8HLVFGFO4qhWUrh6TaFfohhFN%2FQqvvk1XdCUk2ATLgPPnaRR7Ni0tPXeh7JLZSkO531cOgxFVwVOTGGQjUb5a5rbj%2FH8DSDqgMskbPjrv11sJDYRBRem0GtsJP15uTeyjOHdUm2xY7BeU9sht0Ww37nBCwdK9RZp%2BmoRkfwljSRVacgzllg2oTfpID2IrH9J8kc5IPHj%2BbioXa2qQcYgJbICrp94ILKZbUcKEIWQDy7cjLTQQtcUZqaraEUToBbwkJguqwwPxefcTG0MKnYtM0GOqUB%2FwHHkN1B7pl5TkXOHvSmYtk88f9cXOCOk4InSV0Pg2Hc5Ja8QRMUfbD79J%2BxQ%2BBHIqN4BiHqS8qy3HJoOB2gVvtx96PHiJnpl6Vx6C%2B99YBT%2BYUfCqmwDyn3Mq%2F%2FUzXlbVVez8HgHyEv6RgGAYwF6IkYgiXF3fNknt3ZkygyTSDFcxAYzpXZx0js6yBQXzOlUhz8HuNgfFVJ94L2bNPQnRv0aLqU&X-Amz-Signature=c5e8fcf970ed7c3cd53796a84c442a1f1f1f2f7570601073c3369ccad156cf1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

