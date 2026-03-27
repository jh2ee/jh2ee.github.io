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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6UJ5RJU%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T173928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIF7LZwuEMZsDBg0cjbSEhq9dDWUIaCophSliJuDwOwUWAiEA7oL1CxoBfFzAoOyGzt0hOy9lgla56kZIssuhqQIkizEqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKbf%2FqIUm7f28fiKeSrcA%2FcCci6InUolBUdsOuHXjK97x4acuCM8K9TaDHuZJwCzf7a9onYRgcsJCoUnqa12jCF3yjCXAYW7wkOxAuacbYfVRi6FOUXVuvf0fX54Q91qYEHJy4kxs%2BIwa%2FIhBauUUpcLucogjJRETTRY6M%2B%2BXy9%2BC7YMg6CPnRqDEmID9Di3DdYnrmCfbzOXMqc40%2FqVnX5Cj1e4t243VumoC2ldc0WV%2FUMckUi5pmJCi%2FzJ8FaW8AH3Axnex%2FE%2F1o%2BITJ2lFvWON6cGdlSJNDWUty6BfToIM5AoqKY52EpqGYlhiC%2FyzFBGJrJFYa5GXasMdOcfsmcVqzjMeMg4cYZZwCNogk4hWpaLtS1FF9z6UNFifvaeu%2FLFcTXadrZqaenxFBt9dWy89aGPTQmv4%2FB9cTk91HPsTy%2BaiYhXIeyw5cJJFcY6LZYLUw9vXrYI3NRJo0uCLXf9g85pX1T8nN4zAOmHAscdrygTaYVDUFobNfx9hfJyB0cRQifmhLgnbzQRrFiBVPHm0zVF0d%2BeWY8ysw8doMSnEva2cDfzjtLzRDvR68LQhVJSBuWA6GWsfVk6KEYi3JXpY%2FUpTDyqejuqVT9u%2B%2FvBpfnSzV%2BI%2B%2BQ%2Fi8GHFFRLS48u6VKLeoE1AiSEMOzhms4GOqUBxG2PM9U%2Fdo9hh%2BF9092o%2Fv3KBRMp7i9fbNCTGAqHLIKjyFNiqoIbnCmxJK8vmjWUGZLQcOX1ZlPNHKnjeG7LrJZCiMh%2Bgti8C4PtpYhVeI013UIe7xZZbO8xIi3VZERQ4FKzC8MhiLZuVD0Tax7Yd6m%2BJ9fZZBH08OU%2FIWOyx%2FnJwFukRneyxVyUe3RxT388vfiJycqNvATiNjQfOHKyO1F3hPAZ&X-Amz-Signature=ac55e257dc97bda6bbb4bb18cf5b3c47665b8c8c3f5eab2839eb4951b50e1fc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6UJ5RJU%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T173928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIF7LZwuEMZsDBg0cjbSEhq9dDWUIaCophSliJuDwOwUWAiEA7oL1CxoBfFzAoOyGzt0hOy9lgla56kZIssuhqQIkizEqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKbf%2FqIUm7f28fiKeSrcA%2FcCci6InUolBUdsOuHXjK97x4acuCM8K9TaDHuZJwCzf7a9onYRgcsJCoUnqa12jCF3yjCXAYW7wkOxAuacbYfVRi6FOUXVuvf0fX54Q91qYEHJy4kxs%2BIwa%2FIhBauUUpcLucogjJRETTRY6M%2B%2BXy9%2BC7YMg6CPnRqDEmID9Di3DdYnrmCfbzOXMqc40%2FqVnX5Cj1e4t243VumoC2ldc0WV%2FUMckUi5pmJCi%2FzJ8FaW8AH3Axnex%2FE%2F1o%2BITJ2lFvWON6cGdlSJNDWUty6BfToIM5AoqKY52EpqGYlhiC%2FyzFBGJrJFYa5GXasMdOcfsmcVqzjMeMg4cYZZwCNogk4hWpaLtS1FF9z6UNFifvaeu%2FLFcTXadrZqaenxFBt9dWy89aGPTQmv4%2FB9cTk91HPsTy%2BaiYhXIeyw5cJJFcY6LZYLUw9vXrYI3NRJo0uCLXf9g85pX1T8nN4zAOmHAscdrygTaYVDUFobNfx9hfJyB0cRQifmhLgnbzQRrFiBVPHm0zVF0d%2BeWY8ysw8doMSnEva2cDfzjtLzRDvR68LQhVJSBuWA6GWsfVk6KEYi3JXpY%2FUpTDyqejuqVT9u%2B%2FvBpfnSzV%2BI%2B%2BQ%2Fi8GHFFRLS48u6VKLeoE1AiSEMOzhms4GOqUBxG2PM9U%2Fdo9hh%2BF9092o%2Fv3KBRMp7i9fbNCTGAqHLIKjyFNiqoIbnCmxJK8vmjWUGZLQcOX1ZlPNHKnjeG7LrJZCiMh%2Bgti8C4PtpYhVeI013UIe7xZZbO8xIi3VZERQ4FKzC8MhiLZuVD0Tax7Yd6m%2BJ9fZZBH08OU%2FIWOyx%2FnJwFukRneyxVyUe3RxT388vfiJycqNvATiNjQfOHKyO1F3hPAZ&X-Amz-Signature=ac55e257dc97bda6bbb4bb18cf5b3c47665b8c8c3f5eab2839eb4951b50e1fc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z52DCMAX%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T173929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQDIrTFXLSlDHd3VF874rkm8Qg5Qb5ZyBBtCOCXNtVd2AAIgX1e%2BMXEhltm2kgeA1Crj9MkcY9%2B0NoXp%2Fsp5mK3FH5UqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKuY2ZXNRC%2BhXBg%2BgCrcA0%2B6bFLqdzGnbaSSYmhZtsu%2BQDAVFW1GBK9lngcRyWm%2FAqa2mFNOJmCZSZVwL0cIEivXzeouWQAOYw1Gx9veYoaeDJboG4CCvYfvH%2FTijGzI%2BzyVLLkTpUahxrL1cQXUhx2gcPaaqSb%2B9bTXzmy3qjYBSYL3qR%2FDbfON6mR5PC3QDSYNXIWooQsictu1JMAIryA99mq98pUU6%2FIBWTfli5T6WOMJSEPSz6RXb8QHts%2BdaHMa6hLiBio5LaKLhI1AzCwcFUY%2BXu7QIwsd0%2B0bOgBBjpZSxnbfUxS7jWhHGHnQ3%2FnlgiVXY%2FUeM1DyUFhZm85zuK%2BV93JjaqMtAMTKLCDu%2FZZFQpNECyJFT2Jp%2F2M56BBKzrrHdaq49187zwuiiyLdypq3yJZUy8clSvujg823bPueFtPeoLyjxPg8%2FAkW6H0SMuEAxs4EuTAwFVParPV%2Fy9re7AcjVDSLVITWg31iIWfTZbCK7Uloxksd4FVHry0X%2F1n1fMsTAFRBiUeumu%2FW%2FM35n1mfySbz%2Fj6PTX1LDW3m4fLz7bB9LjdjsRVrXZe4NTNK4ukJcPXeR5CMK6FB238mpOJxVdmL4npADikYxWDGNbac77V3jwtUTtAUHY7Bh8JBKMsm0HPiMNLims4GOqUBlRcb2mYSe3b9Uz9LOsEi2ejDlR9hExtQCC25VPIx36YM6T1swr%2FAzj6x8MvbcQAq2yCminakKoH7mdXSZn6z04OGifhyS9vTaxCCLyoKTkhM%2BuJ%2Fo62lj4%2BJaiZPTCpCz0UCvW%2FWvZUm9xhsvW%2FDfymDeW3DzzLXhJG5FnupdjdOkXaEevaOr7juAnT9aBvkWlbtj4nieucd0TjR1WguxpSRPrpc&X-Amz-Signature=d9cbf471eb3feb9b8553f829329bfe1db5ffae9bda2269eea58a17b115166f20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEIZXFBV%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T173930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQDE3LCBZB3PTBK5vYTFDuIRo6OY1nrncusSRFim2e0FpgIhALRV4QxlOVxMQyig2yCondYjkRdsNBA3Y8zoY9DDVv77KogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx9sOdezNCOKTxJmxIq3AMkdVxJYxKY9ersVAKa1KxrnCfvuUdOFAzqydqJNVp4BGObsbtl%2BIlOAy1vXYp%2BdJ85q9RTvFeV4gYCtCS61lP3oxNw1RVpPcBgtC4Usq10e168dnFTplhgv%2BomtDEy%2FD5iw%2FT4IV6C5RRNdpkvRa8fkDEr8VeK%2FvsO3Vr1omlAXCSQsX6sIGQTtXO%2BGgir6py5CVPe956g7wmBhAFn%2FIM7c11JrsT0TWlbc9MaYrkINRtSIYxZE%2FH91PDhhBk9qpNCbmcFyuZGH055nvevoD5WtFNfy4%2Bobr5IIbC%2B8oO1MGU1NCNB5zq%2BSu4fVhR3H%2FF%2B%2BUkiKdzG2vDvuR8ngo9nI6XfYL0wJAVPsuHBD1vtohGVhNxKMTORacV%2FCs3PfluAmz0LOBAkWl4Olx%2B9%2BRncmeB8MkUmWOAxcOzjDs2w7uRwQkzvEdp98Ztdln7S2NvC92iWt2478sYGKXcbESlNgZnxCjmkjIx1cSKAw2cZao8wosj0JmcpNm2serrvQEolLjxZ8pCxXNo5WgvZd6o9jqdTsKajEf1BiVFCajVwWjA9U8%2BIlEgMNgshB7YfbfxXyBPDyFh%2Bpwlo8mehGlHL1XeAjG9we%2Fmwwg5JopMmP%2BJmo%2BC6EnvA%2F4o0SDDW4JrOBjqkAfYTE1rbQDT53R%2F1U84jnpExW5NAuoBqqLDK46QanM8nyBx1McUbcrCCzv90cYIuOu7hfhOjF74khUWltdJM8nDYR7Oagz4RMhHUqJH%2Bxho65L4eDTsLw%2FflhwPfsKWSPnGWHEm%2FdhKdSZ7ruwj6sfAXHG6lYzr4G2jZQroPAMvw59AmW64VXShbwDTon%2F4X5jxwt2rZ%2B74SEMAOnlXtTj6YMBWS&X-Amz-Signature=0f17b00df0d5cef9d3801d204ef6035cbee2f0e2dc6a42ada50ea92dbdb71c60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEIZXFBV%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T173930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQDE3LCBZB3PTBK5vYTFDuIRo6OY1nrncusSRFim2e0FpgIhALRV4QxlOVxMQyig2yCondYjkRdsNBA3Y8zoY9DDVv77KogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx9sOdezNCOKTxJmxIq3AMkdVxJYxKY9ersVAKa1KxrnCfvuUdOFAzqydqJNVp4BGObsbtl%2BIlOAy1vXYp%2BdJ85q9RTvFeV4gYCtCS61lP3oxNw1RVpPcBgtC4Usq10e168dnFTplhgv%2BomtDEy%2FD5iw%2FT4IV6C5RRNdpkvRa8fkDEr8VeK%2FvsO3Vr1omlAXCSQsX6sIGQTtXO%2BGgir6py5CVPe956g7wmBhAFn%2FIM7c11JrsT0TWlbc9MaYrkINRtSIYxZE%2FH91PDhhBk9qpNCbmcFyuZGH055nvevoD5WtFNfy4%2Bobr5IIbC%2B8oO1MGU1NCNB5zq%2BSu4fVhR3H%2FF%2B%2BUkiKdzG2vDvuR8ngo9nI6XfYL0wJAVPsuHBD1vtohGVhNxKMTORacV%2FCs3PfluAmz0LOBAkWl4Olx%2B9%2BRncmeB8MkUmWOAxcOzjDs2w7uRwQkzvEdp98Ztdln7S2NvC92iWt2478sYGKXcbESlNgZnxCjmkjIx1cSKAw2cZao8wosj0JmcpNm2serrvQEolLjxZ8pCxXNo5WgvZd6o9jqdTsKajEf1BiVFCajVwWjA9U8%2BIlEgMNgshB7YfbfxXyBPDyFh%2Bpwlo8mehGlHL1XeAjG9we%2Fmwwg5JopMmP%2BJmo%2BC6EnvA%2F4o0SDDW4JrOBjqkAfYTE1rbQDT53R%2F1U84jnpExW5NAuoBqqLDK46QanM8nyBx1McUbcrCCzv90cYIuOu7hfhOjF74khUWltdJM8nDYR7Oagz4RMhHUqJH%2Bxho65L4eDTsLw%2FflhwPfsKWSPnGWHEm%2FdhKdSZ7ruwj6sfAXHG6lYzr4G2jZQroPAMvw59AmW64VXShbwDTon%2F4X5jxwt2rZ%2B74SEMAOnlXtTj6YMBWS&X-Amz-Signature=c0c7ad14672575f432604d911060eea6a19a31b7971f318059c1031a2cbe3b7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IINULJF%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T173930Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQDYJ%2FhtCPHn2TbKiEGwEcgyIgLhkfkvohzndAE%2Bkj3EOwIhALVVT4I6y%2BkRsZb6ZyxAzRRaBVfdqnF280H5DOGlfhm6KogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxngsp%2BypD95WTLmaYq3AOZ2XvHmUv%2FvdI8Xl%2BSqUSzofT%2BmMuQpQSA0BNAK20lYs0Rh%2BRN0B66Os3A9H48ENuDZg9BwTSdfeI9lPVraE6XNU%2Fen5KGTQNYS8z6z7kQ6kBs65tdZsuOYmiDMsd6PYNS1fRki%2Bxw%2F%2FjhTN763DhSi7XzC06j5tViXuiF7BX%2BBIdzzebSVPF3cSbG4ipGNNaI4Pp4A3xwi%2BYIk2KC5IKbky6BFN6g20qmy9nviFpGMgtlqtyliFBZ6S0Yy5IutROqejkubfUQhZPvLBLjTrr0ZRds153HlY7%2FUcZI3WwkjKrl9oGTkgpxkWGWnUoAIzobJZIyHuMAJwqePvaXx84MWTIuCJw4m28kg%2Bztzlv4AVSJRL3L%2F%2BTsQN2DpSA9FhWelWz9bkTx9Tbk5zMWtx2cp7T47lgPbKBPXF%2BwZrva61liA6KKUFCOB6eh54HusypMeU4Rhc7S5obi0bnu3KAqFO%2Bjf36PQKZA3jRIoN%2BblChI%2BktaKjdBC0sWJbQnH2%2FnNar704CuRULQK0Zp6xR%2FaMYMn4m2IASFiPryoPwJwkk9c0WzBY%2FMOKwiS%2FRc8jvy5K%2FHAKAeJmqpb%2Fq9NRq2seARKalxWK7tkOdgCkTmfrdSm6BIrqhTO5LvQDCG4prOBjqkAQIrD42kxYDneLabN1PahA6bjeSVZEVkYZj3585%2B80JdXeSodo0BZ63tzuZX%2Bv4snWJtRQUiXqPPoRGjcBx056FS8I%2FC93%2FyaobG613XUvIGpuwUBhSYbReNt9I%2BVy8T00fs1tMfIz8Dly1bXVWJfAnhd0AzNrcKqdC02BX7pdi8ABUwAxyS5glyGp9VOwgZ2bAhW24hpE66mS1Vbgr2I%2F0A1d14&X-Amz-Signature=85614788c59ceec0a85c36b8a62867944268d808a6a7e07080774d38e66fef9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XCQS5YJT%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T173931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQD%2FikDjXg2zLJK41uEYKD1qzTvnCc4zroSTIKzpIPacEAIhAORzkkO2K92%2FmswRpVfAtFYyXgLgyXa5iqTTi%2Bb6ptwqKogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyNYDGk06jtaWL2Q9kq3APZZpWiWWPeMJpOOOXToTsQUDKEm1khRy9TTRnNcdT%2F52bTcb3mkWOgUNZZ%2Fy1xlsih1D%2BdHfLlaCL2myCnbquTnZopzaphLptcA4aw8jHnzDVkYvbzLV7Y0vgRYMLkY5kw4uh6A91adYpUZf%2BGIYmpluiC23KsiLvRpuJ50EEB5pjImEdehvsoBAoMh1m12Rz5AzoS2RNk8DGXC7%2FSayEqQ%2BwSbwNTJKP58Hv%2Byy7chit4HtCRPOf4LhnREIpPuhsXRC%2FSwrB8YDLrJgEBejGNi0%2BqKpsYOsSsBHdib5B0uaolY9LkftlDMZtyrFHyAJym0xqHJyDEnHO%2FDWpXfUZR1QLuR3pbfUNvsASTX9rw8TZg%2FU36aInaMXWmhSVemBhMkYaLhvwmkEHzA9Gk26oo1lnAFUCNuWsqW2mngR%2F7zo1pa5ULh1vPhL8MaOFT28C%2FWX6OxChz9KXjlrtqvTdnpWhgAr2QRacEL4ciE1A6rwWZWkhCm%2FGYlyQ4i6BQ3HpBtw00Oo3LyCtriQYhiFlFxz21W9Liq7AfH9E%2Bt3qplWiLQioXQPHps6gb5Ay6BtYm3XdvSNsZRsUPDFFuTs7YhtQcmURyBAAr4UVe9MqQSXFYD2CPy7MlvmziBTCE4ZrOBjqkAUaSXNP9RMlvCt3lkZrC%2B4kdvBSFJEXCxiP072qnMIITMH%2FYjvsLSmxIk2ZFASlVcGuLs8g8YIPyj25rjzyNCmVfcA5H0t%2FxRFHFKXwMHlfcU6RNJeoSSF52Y1zyWupSbMwWvVcES0aLsTeaT96nX2ocg4%2FOefcPhmho9oWwBK966FvlEd%2Fzmb8z9Xedow26BSzzTxQVAVe%2BAGdAOG4fGmNtVgPW&X-Amz-Signature=defe9f381cd70101e5e876dc65735d719e7486ee4e3d30e66a1803b8e93b3ef9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFZBGZYN%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T173932Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQCAJLY1nB3btCNfVGAIDeBpDkYGD%2FWlYcxRbZq%2BPqSrOwIgbFQiwwsLDIm8Dlbu0EJLKR2cny%2B1XIaWKBkplmsWVioqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLvMDrGt1XfV0Rp1nCrcA%2F1S9N1RGck0bKfY1Dd285ux4Y4%2BfYRF%2FtPB5a%2FIsc84F25UL%2B%2BQlZ32GXfN%2F%2Bg0Zy%2BlmsxtzEe1gOCB10EXPaWa8fMBKkU5SiYBx%2FfbeYqMQx3qKQ61PcAAre6rMBcT5I25qhMpMAtR%2Feg%2BtyufYuQdssoBIedZtEt3SZ1jJkfdLvHbf1MFkUIERt9Jvk01nhya5RP4VkNtFztjVmoDrvYn%2BWqNKjhEtpTkXO0OYuwRH1h34fYqvG%2F%2FkIheflttohy60Wu9%2F4xv3uZ%2FN8Nt3odQKrx4rwlI0sSPLqnS0B344x6GTmfIzN%2FdwJsG6%2FVgj0T0gq%2FXah8vOfVbZi6BJ%2BNZLbEYhK6Khhz%2FiL6fR2%2BHtfU275xdVYoVRh2%2B9D5C3NJV2FPfioZmHygGeDo%2BT%2FTytzZcf4g7JjOsI24jX%2BoferB9e9Kf990442PRYQjbf78hChMII9IfHrawrQhSl3LW6WSAyxymsNb3sVze6SrBuEo2zkt6ScUtOTcEwfQZyCfylb4E2K%2B190w4p9c5RERpQvznYhbdj9W8tGMU030L6YGtFH8U0XSdg51UDFyu43KL9tIIblJctlRHEbghVLtpP%2B9l4xj23jhxoSl3HG8DZJ3ZXu2t%2BBf9yhV3MILhms4GOqUByiDmalDZzkSwJvublM42QA3c7BhyK%2B88oXh2drkBNhIwzxXye7vLn6uJpp9fbv4Xej9iKTWFEv%2BWEmxd%2B9Wy%2FkrUOSdf%2FPfbsmJqa1ax9monoxn9iTljonG6HllOs9h5cO3scd%2Fmw0Id3gF1opuMByuuWuC3%2F9q66DulhcccJt5d1ooGZbqUv40sE6gdXgXphPMDlRMY2N%2B2xPOFAYwwPPdhDjG5&X-Amz-Signature=9aafac33be318a37d6de36fb9f91f9fbbb7297d5d1f8d75310d25eb8a8bca0fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QF2GYRFW%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T173933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQDln5e%2Fzg4z6EK3Mn4CILMI84IXUtQUqvNcCs56s2sh7AIgOl8vO0L4S4wzxE7OG3KAgNbYDqULqtSI%2BMWcDVS7HwUqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPm%2FiA2giox0LXU01CrcA1oan0cbitXXrd3zQGtt8wiaff7U0pakx%2BYugP7uef2R8%2FTvm%2FLv%2B2IAJsIDvpkeL2nyJXl4ymWCn1%2FyBGv9Ye7OKtDiqHE3LUJ%2BEshnR%2FVj0ZE6Ws%2BWAI5LkzFBL5jqGETdC5MU7boKp7qNxCDDPsFZcB4f8GTY9IDGI2LaYr61O5TZwhVhn83ytnUqhzgCawgMPGEJC%2F8f4obvzVq5qj2eJWLr5TyzZ8B1VHIY8zs7rIK9L58%2BN%2FjfLq2LxEEIHtagAA32xvISfqYoVy00Up%2FOScrQOGBhoBGVGVUfJVFtL4w56tmCeN7XWVMRzKf5hlqtO3cVaoLlR0xyodDlYjJIpVOqvnwUSKvb4BlPEJ32B8j5galdaSCZjppz7rplAAmDv%2BRNqB6Z8YOhjBLE6ESqz03kWo4gyIzZ%2FxI5V4gyz5%2F%2BRA5HYcWzfwzs%2Fvcom97Bvx7r5Vti6nlyq6OE6eqwk%2FYoAK9kjT3BHEKwngH6UIv4nL3C9LQUypS2%2B7Vq3WdEQIVDD7MWrwnX%2FMI4uaCOjl1SwP6aHFI8Sfz7eqdM0x6BT4Q4RdeB7LfWCY3hUCiv1hqg0zCxWqKm86XCfiaLl1tmQpAPVkoOiG%2BaU%2B1kVm7L8WQI%2BSr%2BWBltMI%2Fhms4GOqUBgHOfKGvS5cyVWzMXF2tbRHIF%2BlmcHearkzcy%2FfGlgoGm%2BV%2FLVB173m0MLT3pk48uIDDXUIqtsdYL7hZpRnriatJRg4gwuPJx1q1E2vk7683FSDZDEQW%2FMzD1MTHiQBzT6UWZnL2vLuqSH1Dlf7deg9P3nIyZxpn9wM%2F55%2BoutQfGm9qh5oJEY1a0bwrBF8%2B37dmE2%2ByRD4X%2BPjGP4ZDgI5a0Aj3h&X-Amz-Signature=13ca84f4bbe8a0e2df644adb7b07dc13a5ab278364e6d4c0d0b4d10bedd8cbcf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QF2GYRFW%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T173933Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQDln5e%2Fzg4z6EK3Mn4CILMI84IXUtQUqvNcCs56s2sh7AIgOl8vO0L4S4wzxE7OG3KAgNbYDqULqtSI%2BMWcDVS7HwUqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPm%2FiA2giox0LXU01CrcA1oan0cbitXXrd3zQGtt8wiaff7U0pakx%2BYugP7uef2R8%2FTvm%2FLv%2B2IAJsIDvpkeL2nyJXl4ymWCn1%2FyBGv9Ye7OKtDiqHE3LUJ%2BEshnR%2FVj0ZE6Ws%2BWAI5LkzFBL5jqGETdC5MU7boKp7qNxCDDPsFZcB4f8GTY9IDGI2LaYr61O5TZwhVhn83ytnUqhzgCawgMPGEJC%2F8f4obvzVq5qj2eJWLr5TyzZ8B1VHIY8zs7rIK9L58%2BN%2FjfLq2LxEEIHtagAA32xvISfqYoVy00Up%2FOScrQOGBhoBGVGVUfJVFtL4w56tmCeN7XWVMRzKf5hlqtO3cVaoLlR0xyodDlYjJIpVOqvnwUSKvb4BlPEJ32B8j5galdaSCZjppz7rplAAmDv%2BRNqB6Z8YOhjBLE6ESqz03kWo4gyIzZ%2FxI5V4gyz5%2F%2BRA5HYcWzfwzs%2Fvcom97Bvx7r5Vti6nlyq6OE6eqwk%2FYoAK9kjT3BHEKwngH6UIv4nL3C9LQUypS2%2B7Vq3WdEQIVDD7MWrwnX%2FMI4uaCOjl1SwP6aHFI8Sfz7eqdM0x6BT4Q4RdeB7LfWCY3hUCiv1hqg0zCxWqKm86XCfiaLl1tmQpAPVkoOiG%2BaU%2B1kVm7L8WQI%2BSr%2BWBltMI%2Fhms4GOqUBgHOfKGvS5cyVWzMXF2tbRHIF%2BlmcHearkzcy%2FfGlgoGm%2BV%2FLVB173m0MLT3pk48uIDDXUIqtsdYL7hZpRnriatJRg4gwuPJx1q1E2vk7683FSDZDEQW%2FMzD1MTHiQBzT6UWZnL2vLuqSH1Dlf7deg9P3nIyZxpn9wM%2F55%2BoutQfGm9qh5oJEY1a0bwrBF8%2B37dmE2%2ByRD4X%2BPjGP4ZDgI5a0Aj3h&X-Amz-Signature=ac330c0e933eb71c4108970a894a6fc9c1b8bcd334b38260a61bf1c8fb3ed42c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664PZ2LN62%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T173924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIHwkJWZPXVVNa5es0tObIqgKvOoIop%2BqlfqdWH9qb1BiAiEA2Vvbgib6GzoGH3VukUf6cTSFPSvfWACwXzOtUdySEvIqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLpBuA1Nk0IsdQqFkSrcAzor6To3QCgacexCza5EVM08rfkRdDy%2Bo%2Bnik4Y0EmlyCvpg7fOOMiqHJNsg78nEozUjj38cAiL1w3hO5tNfzPdJ6gNAnyhcrS1ibnp%2F9ZQzF%2FH%2BrPQ55nXcw7H112t5n%2FJIIqq%2FKXCgMAvwQIi4XaoKr7uJT2gPj0Xkgj1f897yzM%2F2OWwwX9l7O7a2%2BFFgCv3F54xCSQBo7EsfgSVWoXcJUxMjQRg5ueU17XSM2SBIda9jJVLgsdrdwuvghTAwPnvubfLyfwUxqFHMep7nK6gdqnlAQ4FqORBLffqAN96jgEU80Qmc5Dp7YGn5GFxdW%2BWep735hbqiHW3s6vV9qqkyjpAzBYs5GFWY5eu1Bu3nVG2K6SoQG0gxVQLeTwvwLwyHR%2BmLP0qwhTnqH7RL9a8aDsIuMJdUn%2FcA3X4Wrk%2BsuXXcPNXvjXMkGLso3zYZNMvKZ%2F2W2bSXSpkNV0cttvuc7OA3Cej3tdjzVCRwvQlfnE8WReN1TRFsPsrHnmtYfwR1yROM2KQTTlDanaQLxOl%2BxQ7RFMKU2T5TuLSwN%2BQXo4KDRRJrtm%2FZc2Elnu7MiZ9OQnA%2B0sa0bgS7F3QyWns0MA3w45ioKLT9oTb3wYLvtJjP0NpGk2f5VxMKMLnims4GOqUBS9o8H1Yrj4%2B17%2F79XMru5%2BPfDXU%2BSP2%2BorNfFAIkw09cW2Cy8zVkLXwxtYvSDCfwGxpvk6QPjNCP3YPwzJFeVAvwIJ%2B1PDibaQ9MaEyiK8T%2B8yj8yZan82ki540JpMGZeRR32Sa4jsms6RI0JoluAizIIHA1M%2BuVlACivy6ud7z0MSTv5h8PMvaP31%2B4O39RKFtaQn0q8Qk26KeAdl%2FPong7EsnY&X-Amz-Signature=a887687599112ddb72248dd4afd9dcb6884a8bcfa9b71e5a549a0774d9427c48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FNHBKFO%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T173936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQDMrWSarB9elWPqgFUiiZ8IU5PzWpsd9Y%2BCSP1SivLpqAIhAJdS7yZPElE3adags%2FBBzNON9JyeWNPJGWWzCapc%2FhzkKogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwkKe6gmvKOD3A1aYoq3ANCFTn8z%2B1Vr%2BE8qAchVqfXuG3gTky0v5JU0skuJyQmABTLnxlhUoMiutxQY5KwxC0%2FZHG4cOW%2FQpvomWr%2FOroeKO%2F1sbi54UCPdBOhcOLyVywxOlquRytfa2aTkahPTpgrKxYGssQhs9zUegKJUt0CFmS%2BSd0V8WV0yknuCdZLcjE9wA%2BhuLLQv3tkWPUUVsENbM0iKRYpnVGsDLy8clHiCBNmAOMlCFJQgiR7iuLjHf8IKkXzKLf8CO7sA1RNO1qa76JQ12kBUygjNxZTX8wDIeaum9rSym6lV98JN1S3rnc%2F70Z5ftyvWv2wSo3EObVBwFI7OCcRFXx60vQ%2FkQ07cB75%2FJvmQPpriUDZ%2BhvJWjW7595YMg%2BvhMWa4ce1REC3qRttzaFQ6o%2FS30YNFkjCcwXQaqhAtKv8UFN3KC%2BJboQ%2FNB1XEuuL66A0zw%2B8SYtECczo1%2FdXA6DuJG6x0%2F8ODJY%2F3JE0vqYEQXtfEx903FmWKa6OrTityD7D7Ia79Zq%2FNix%2BdbWx5fkYC%2BZSpGXdU8lZML18bztqmNBMRzDrojL7L68FJ%2BMg8sjjGfmQnequdSgOA8cZ%2BlmtYVw5RjNkyE37tpwfeD8m6GaTG2A%2Bm1nm%2FyD9EP5aLtPQuzDW4JrOBjqkAXKG3KxWsDVOvZtEMRf1iPIDH2H4pqGAtKgDyi%2FD9mUJ2ihhfBctsDQSWV3LVc4YLRX38Z7eJvg35w6d3jrJyEiNu41qsceEulfCo2pXuGqpAolRIGTMQtSd7V%2BtL4JmDxuL303nzp%2FyIuG11Dwvzd1lCskvoX5KmApf9fREN22iWQlKHBj2cYkH70QLttbRrJvV9cW0%2F2UWJhp%2FDH1Xh7BfTaj6&X-Amz-Signature=f399589a05c70f73d18bc3506f7e9244b9af524ff88819f2dc9e3c3b9e5e4066&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FNHBKFO%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T173936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQDMrWSarB9elWPqgFUiiZ8IU5PzWpsd9Y%2BCSP1SivLpqAIhAJdS7yZPElE3adags%2FBBzNON9JyeWNPJGWWzCapc%2FhzkKogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwkKe6gmvKOD3A1aYoq3ANCFTn8z%2B1Vr%2BE8qAchVqfXuG3gTky0v5JU0skuJyQmABTLnxlhUoMiutxQY5KwxC0%2FZHG4cOW%2FQpvomWr%2FOroeKO%2F1sbi54UCPdBOhcOLyVywxOlquRytfa2aTkahPTpgrKxYGssQhs9zUegKJUt0CFmS%2BSd0V8WV0yknuCdZLcjE9wA%2BhuLLQv3tkWPUUVsENbM0iKRYpnVGsDLy8clHiCBNmAOMlCFJQgiR7iuLjHf8IKkXzKLf8CO7sA1RNO1qa76JQ12kBUygjNxZTX8wDIeaum9rSym6lV98JN1S3rnc%2F70Z5ftyvWv2wSo3EObVBwFI7OCcRFXx60vQ%2FkQ07cB75%2FJvmQPpriUDZ%2BhvJWjW7595YMg%2BvhMWa4ce1REC3qRttzaFQ6o%2FS30YNFkjCcwXQaqhAtKv8UFN3KC%2BJboQ%2FNB1XEuuL66A0zw%2B8SYtECczo1%2FdXA6DuJG6x0%2F8ODJY%2F3JE0vqYEQXtfEx903FmWKa6OrTityD7D7Ia79Zq%2FNix%2BdbWx5fkYC%2BZSpGXdU8lZML18bztqmNBMRzDrojL7L68FJ%2BMg8sjjGfmQnequdSgOA8cZ%2BlmtYVw5RjNkyE37tpwfeD8m6GaTG2A%2Bm1nm%2FyD9EP5aLtPQuzDW4JrOBjqkAXKG3KxWsDVOvZtEMRf1iPIDH2H4pqGAtKgDyi%2FD9mUJ2ihhfBctsDQSWV3LVc4YLRX38Z7eJvg35w6d3jrJyEiNu41qsceEulfCo2pXuGqpAolRIGTMQtSd7V%2BtL4JmDxuL303nzp%2FyIuG11Dwvzd1lCskvoX5KmApf9fREN22iWQlKHBj2cYkH70QLttbRrJvV9cW0%2F2UWJhp%2FDH1Xh7BfTaj6&X-Amz-Signature=f399589a05c70f73d18bc3506f7e9244b9af524ff88819f2dc9e3c3b9e5e4066&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TFTYASEJ%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T173937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQDI8TUwbJnuFU21eKJDMCAGLB74vk4QLAXGPuNc4MPFPwIhAOQouS2uHg%2BzzLsyyc7i8P2YX2CU3qFIsM900G6z8ilKKogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw5XHcYjM21wXcM7Z0q3APsa2nsV8Q9Os0gJVmyBY9HRG7TAOLAAxRs5VxHnT5ZVa5LqOYNgP%2FXtmveDN1kaqjaR%2BFqfe6Ni2suJnA33DA51D%2FUE6L6PouYdLraNDdh8qjH70RTyNzh7SvEEi02jfe8XLF1g1XR%2BE4ObdFk3kqoQZ%2Bi0FIJvET7u%2BFS1FgLLR6kbOqp%2FDjM2C%2BzM%2B2gOUz%2B1uEHJsyMZzypZy4ndO7UCeUt5BimCpvec01weupSAixDHTEAhrL%2FCKtR6QW0PyE3G1iJC0hi%2FNKfOw7YUVTUlOSQYJgC91m870nFcwl4kgLFA%2FCTTTgu7Sm5GoM5rCo1Q%2FAgBDYPimN8JiQ05o1QM%2F9%2Fia8EeO6GCQz6IqAI%2FqL4JOqKUMTa%2BeXuA4mhIR0XiDdjnveNjEmLsqlQr8VISqyF6me6qyhfLv7GeCl9yvQey3kERKfe8GXrqivUrhQBEeZ35Usi1DAkfJVALo266t8U9Fgl8SUfFVub0ALsgFLxDgKfye8OFV9gQZdLvadrxVGJJH8cUEMzB%2B9j359r4t3%2Fxz8ojoIde6qYBi3LiGRyP9ZTkqZG1D13F3kdl%2F1AK%2FXM0sdhI%2FWgDRGsgMIZ5L3lhTqtRWodd1ahIGcbXz4KjrUqczVSKBquqDDC4JrOBjqkAVXYnvfWmGhKEC8uvXZSxO7Zt72s7Bqv9I50J%2BIbXtMx0R3dK3SrFLzVNz694aAkuYGZDPZYou1ervRFvRtu2c001BcsspFsReNbqG7kaJo5VHwc3dRQLFtD%2FNeB4LzgRDjh201Poz7Bs8iCV5HSCFMVLfYETA5LR%2FUbSvIDRk%2F34AGWSTCwb89D4iKzjlALl3yHi7aF6pvE7C5bIP8dNjRDRZKs&X-Amz-Signature=624c28f58575bbc828393d2633fedff14684c8c165171497aea63b0dcb08f73f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

