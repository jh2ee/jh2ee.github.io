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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKZZYMZ6%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T041009Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIQCgOlR4707x%2FPEtQVGhQzTjpQRnWBCvi0ok41JuyfPhTwIgG%2FoqzELVAJOT3tQFxNTgh1KsvV3yFdXzbc1dnPHUiFUqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBbmren3mxLv48zBtyrcA5WZrLa3saq8EfWua%2BOnft%2Fre7LkWFmdbflfByMpX7m8mUeoHiDqiYKor3fr54Pf5c5MSjvThReikrAOWGT8acPek9Mgf8VibvcTJXPyj%2B3YiigcgApx5u4DpOtoi14KOUdzhwpBjBl1LVk0Ch%2B58amIw6709WjsE0sIohkIVg%2BiBhlCYW7%2FhxPIoQ5bbA6%2BTdvR%2BICp0DYTGAo%2FftZTyMwROwSoPI9yylVDOiSgbqCS4XyyMVD%2BWohg9PHYpm2V8tuKpiNNlS%2B%2Fz6ePGWZXbJEvk7xYyjvsplQ1jG%2FAJltv%2B5Nqv%2FkOS9czdHc59daCZIOFct62pJE59PGMwez7bAavVSvfU0prAjDpAPfTzlCdREiGkMA1Nu7OMfGiQuU7unyND4KmD2T%2FwEweE%2BJzrAUvSg2nTvOdbRI3gDIcqGboBdDShWDYUMgmMx5CWGQJwuY54xcz5B4h7h01ZLFu3GmZJymnmXI%2BhNh4DQPhmRHOO7Yz9Qy1tOzMz8185AWEp4%2FmhDrDd%2Bh6RVoqHZqHv2dz1OdRChMiwWiF3utJUfpCB%2FczkO97iM%2BwNmaDUek%2FkN%2BHMkf1DFF4HWeGlPg4%2FqJOs5CDRLSKBGSQDYqdC4tLjgdj2oXYoE3YmNieMNi16M0GOqUB7BP7VLYHqvnG3MLWWILoZPvBlBO709Am2JarIjA4kv8JJ4vaou9TMGggP6etWOFpRRJAeu93nbeHr3V6m0gIck6pNdYrSiAkeww7HChnH%2FywQZfvvMJij1Vb1IJW0dNuDxiGtt5UKKpjw3WHVYkyJvtVLtfcxoxK1bD%2BUg5sEfljB4qaBABcjtybfgf%2BeJDkzea05CBugZiCIDBFy3s4iAQS7885&X-Amz-Signature=0c8fffbed4faa57b03e7e45710529bbd00c2843197e27cee13a5bcfbc40992d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKZZYMZ6%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T041009Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIQCgOlR4707x%2FPEtQVGhQzTjpQRnWBCvi0ok41JuyfPhTwIgG%2FoqzELVAJOT3tQFxNTgh1KsvV3yFdXzbc1dnPHUiFUqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBbmren3mxLv48zBtyrcA5WZrLa3saq8EfWua%2BOnft%2Fre7LkWFmdbflfByMpX7m8mUeoHiDqiYKor3fr54Pf5c5MSjvThReikrAOWGT8acPek9Mgf8VibvcTJXPyj%2B3YiigcgApx5u4DpOtoi14KOUdzhwpBjBl1LVk0Ch%2B58amIw6709WjsE0sIohkIVg%2BiBhlCYW7%2FhxPIoQ5bbA6%2BTdvR%2BICp0DYTGAo%2FftZTyMwROwSoPI9yylVDOiSgbqCS4XyyMVD%2BWohg9PHYpm2V8tuKpiNNlS%2B%2Fz6ePGWZXbJEvk7xYyjvsplQ1jG%2FAJltv%2B5Nqv%2FkOS9czdHc59daCZIOFct62pJE59PGMwez7bAavVSvfU0prAjDpAPfTzlCdREiGkMA1Nu7OMfGiQuU7unyND4KmD2T%2FwEweE%2BJzrAUvSg2nTvOdbRI3gDIcqGboBdDShWDYUMgmMx5CWGQJwuY54xcz5B4h7h01ZLFu3GmZJymnmXI%2BhNh4DQPhmRHOO7Yz9Qy1tOzMz8185AWEp4%2FmhDrDd%2Bh6RVoqHZqHv2dz1OdRChMiwWiF3utJUfpCB%2FczkO97iM%2BwNmaDUek%2FkN%2BHMkf1DFF4HWeGlPg4%2FqJOs5CDRLSKBGSQDYqdC4tLjgdj2oXYoE3YmNieMNi16M0GOqUB7BP7VLYHqvnG3MLWWILoZPvBlBO709Am2JarIjA4kv8JJ4vaou9TMGggP6etWOFpRRJAeu93nbeHr3V6m0gIck6pNdYrSiAkeww7HChnH%2FywQZfvvMJij1Vb1IJW0dNuDxiGtt5UKKpjw3WHVYkyJvtVLtfcxoxK1bD%2BUg5sEfljB4qaBABcjtybfgf%2BeJDkzea05CBugZiCIDBFy3s4iAQS7885&X-Amz-Signature=0c8fffbed4faa57b03e7e45710529bbd00c2843197e27cee13a5bcfbc40992d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X4YCEWWK%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T041009Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJGMEQCIDDCoaBfKmKTTRROWaL8ioQqDHiMQwUVO4TMVFl1APr3AiBBgNEqzXIkjznCVtd6jSLd7BDPCjHmjGoAzBnxqv2cXyqIBAj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMzXyHpK8EBmkcOcJEKtwDYhtnQJWTMKCLcAICxU9BLVndKLQh9pu0rLyHOw0fpJHdiVe%2BCftK8ZKAvuVg62XXfE%2FpauKamqQyDtNrKuYIV8QsX99GxRauG2eCszxyV2CAROlv5sNyIti%2Ft1CUnP6CqNMfqASIaE1KxGCkACzpu4QC1imaPxyzyZm7lfHXNVJrj0fAKK9TCHFNXjIJWjA0G1AOWR7Gbae1Ig9a%2FcMx7uT5Qc0mwi%2BsZVneCFB2W2rXtg%2BLTxbf0Zs6UPtmU8pN9PPPU6XsjqMPaOxe%2B79LR24yxTxuGPp4RwTyAtVttokZYH1HBpYr0mju8R2qnKfziGtS6P7unImZ9a1Y88Y6S9%2F1EPFiHtMj0EFCHDXdNZEINZ%2Bqkw%2B3yVlZR6jILbrSOUKH6Ce5jmlohRcFNWFiVXCjvajDShuzuaRIwuB15%2FDASU3i%2BQn9NBeKT2BVaE3q5Uw5dRKducBJHNGPw25L1W%2FMnmQuPSCjtUiUisdsm%2BWbXWrFgaF8KaKz6ShQKUN%2FyEBK1NqEB6bEyjkZXA%2FOoGQ%2FxUkt9UJGU0dYwt7WwxVEx7x3c85LJJT5O5iKqo1eOe7JERDz3EjuCu%2F4umpWApn38OiDjXn98twTnuSXhytbGhOY7%2BhiSRUH3EYwhrXozQY6pgHhMPf31LBnHJazdBmbaO15NwW6vDNCSbEZTw2JIDJ2BlKB2x7BFc5QqAjk%2BoLMhy4cOFksdhiIM5gpaeij0qi1qmyfnsWif%2BDYSt4iSP7nvCxX1mzrvO8pAzTmScqyuvWt1dTfaMcew8p%2BfS8ypnD1BOscGJJfs3LMIjomEuZ8RHkftF7oLBz84UyTkIyJfO%2BCKk2diz9stc%2B1%2BOnrYkli0zGUbMNX&X-Amz-Signature=757521c9aa7f5b56b25375c8ba23a808358ce30801bdd49da456681666559a01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662WYUD673%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T041010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQDOeq7%2F%2FGmBx5BfvbC9et4fAeD1RMcyCHklr0WKq2GzQgIhAMubhgkA9h%2FFxcLUpQSrI%2B%2FiPdXHCpklbHaKth5exod8KogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzp%2B67gTuuDNtUyT2gq3AOsZf1emzPfF7yj1ikstPhWHcgyetCThZXIsw53Qg4EqcpsXdim6aiL%2F1pMKT8S3BWgyFe6jsmgz5hXDlLmRIstBUwMeF2wbFsB9Fav4O73iblGUX%2B4WcCH9CuqEaiNT8fq6OE%2Fkf1e709M92n4GbnWm47ej6B914nCl65sSg4egvHbq2%2FRjyoedHzrO1Ept%2FehJtBOU7SD62v7b%2Fh9REf4j5XKyaPwN8GxaOET5k7SZG2MPv%2Bk4peO8w3sLbgwaTd9S6UY6g5u8QYzd6KofTVAY3PX6SnrT5CRPJnchYw3Fkn1WwIPiNfo80fzO1T6DyEJ2QG40VWPrvPrEjxXfMXXdPe5IX4R1clxivhE7EjsZyDe2kHYlnMNipS0TskswrHhNwS1QjJtAq5VJZJ4nuRfEFfPccROCQPnTcjuly8SLCv4W662ODXpcmS910hrCqkqXFbeaUE4gkCStHxqITmyNokDTe6TjQ2pRUSw%2F0KhpBYWPO0G2kbc%2Buk1y8mYAW3ElkslhIasoCbG6VrwjgwpXI7%2BVNE5UnuRF3pZXq20WrD8YQoOJbrzMpJqDMQ3AJpnkZcoUREK05yVTzhjla6zTwgI2onFuyx6NkN2MzTDnOPeO%2F3F9FtqpeYuDzD0tejNBjqkAXe46Gv%2Fj02J6b1jUD2iJWtzkEoqVlT0AS1AByCo%2FDEkdXIzqA4Lxv0iiGhCX7IvizUee5nYgd6n162Ex3IOxcch%2F8DxH5JAWkdVtVwcX7LK6oIDIArxrvzr7m5CGnl3I5QrV7XDl99mzN6LtMy%2FKEKQg418eJZhLCCkrtu%2Fhosd9OlLMhsBQc6WuMoDxLlpwtVwFFlPL7RQ4rK9WFMiBuCaU5Xb&X-Amz-Signature=0adc2abd948e88f54d3eef9e5a28b738b1b7df1f629ad4bd5f219990d98c5a78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662WYUD673%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T041010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQDOeq7%2F%2FGmBx5BfvbC9et4fAeD1RMcyCHklr0WKq2GzQgIhAMubhgkA9h%2FFxcLUpQSrI%2B%2FiPdXHCpklbHaKth5exod8KogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzp%2B67gTuuDNtUyT2gq3AOsZf1emzPfF7yj1ikstPhWHcgyetCThZXIsw53Qg4EqcpsXdim6aiL%2F1pMKT8S3BWgyFe6jsmgz5hXDlLmRIstBUwMeF2wbFsB9Fav4O73iblGUX%2B4WcCH9CuqEaiNT8fq6OE%2Fkf1e709M92n4GbnWm47ej6B914nCl65sSg4egvHbq2%2FRjyoedHzrO1Ept%2FehJtBOU7SD62v7b%2Fh9REf4j5XKyaPwN8GxaOET5k7SZG2MPv%2Bk4peO8w3sLbgwaTd9S6UY6g5u8QYzd6KofTVAY3PX6SnrT5CRPJnchYw3Fkn1WwIPiNfo80fzO1T6DyEJ2QG40VWPrvPrEjxXfMXXdPe5IX4R1clxivhE7EjsZyDe2kHYlnMNipS0TskswrHhNwS1QjJtAq5VJZJ4nuRfEFfPccROCQPnTcjuly8SLCv4W662ODXpcmS910hrCqkqXFbeaUE4gkCStHxqITmyNokDTe6TjQ2pRUSw%2F0KhpBYWPO0G2kbc%2Buk1y8mYAW3ElkslhIasoCbG6VrwjgwpXI7%2BVNE5UnuRF3pZXq20WrD8YQoOJbrzMpJqDMQ3AJpnkZcoUREK05yVTzhjla6zTwgI2onFuyx6NkN2MzTDnOPeO%2F3F9FtqpeYuDzD0tejNBjqkAXe46Gv%2Fj02J6b1jUD2iJWtzkEoqVlT0AS1AByCo%2FDEkdXIzqA4Lxv0iiGhCX7IvizUee5nYgd6n162Ex3IOxcch%2F8DxH5JAWkdVtVwcX7LK6oIDIArxrvzr7m5CGnl3I5QrV7XDl99mzN6LtMy%2FKEKQg418eJZhLCCkrtu%2Fhosd9OlLMhsBQc6WuMoDxLlpwtVwFFlPL7RQ4rK9WFMiBuCaU5Xb&X-Amz-Signature=d18e72925831832a8ed718559ae010759f9eeaf1889d98406c6a755509a822a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQ3OJTDG%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T041011Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJGMEQCIHqllEeWUALDr2%2BjOIkoTzXYzMlX0C5RDuI9gBtMpU9SAiB86FUNLAFfpNBuHzlnJ%2Fn9lGPC8Mq48A5dD7IqRXseCiqIBAj8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMLLBhkg6rW2xTyQDEKtwD41%2BS%2B5ywi0TuViOJtlgg7Q4bQP93CVxY3i3vcbCji%2F%2BnPMKDotzB1mFO3PfpBBFcAYjOxjz2QqQuTY8Xs%2FLhqTTPtqADdlyBsXBfZE1PXTi8YDrHhcsC5nVXXUTu38v5Hmif45wyPpTU18fuWnPMfugVvDJcjJs6rpBMVGNnqVtvJabTt85qg1o%2Fc1a649GZL9Bfj3VNk4TFH2C2dNUFNy7e%2FwfjY%2BEUHantm858FJ631PrQHiM2w1HqnpGQOdt7%2FiobCN6oneJLDPUCb4XT9bPhvByiUT%2Bxhwd7yU9kOe93%2BNZu2i%2FI5skXIhut6Rl2ZEeB5IQdzbEDunRn%2B%2F9tLEjFUeAwA%2BujMZPmyztQ7FtTnxpnxIm3GuPwE%2FBdcnwdx1pgO1BR91%2BH6PnyKJoncLq7KouXRECKLtG05Or80s8q4uKKn3ujaiEgiw%2BDrutMAq3nbitVpte1bQqjx0BhnrNSHBASJJiF%2FHXE2uPdN5oS8RZuNXoFe%2B0SP5Ud1G7eCEYl2Nt1IkO7K2Esmgty2%2FPxDFPvStRLk%2F7ZiUW5QwLVIX8nZu%2BLtT%2FC3lV%2FQ86nQgE8ZEaWzjdYYi3as3fjgJLBdpe03yMEcyaZE1QRfX68lkVgTyDzZSWzew4wjrbozQY6pgFjsN5nKKb3uKlFt79OTtu4fMJdfRHwufWa8qnO2AbiYcO3grZXzd050kXkJ1fqWZXiuOwLBkm%2B1FTqR8oTyXARSLGzznKPdnw8Da7n4W4r8vKbrTuI7BfwCVo921O8OqWu8KhuGFGzyJdL7cOCgLLSUEUDU%2BY1FL2xufBj0aHXIjuI%2BDzHi15XtlfFYBwF%2BTVQJpCz%2BfBzRnQgewKn3uUFVNM9H69t&X-Amz-Signature=67dfb0c83df3719602d84d8950e9f2f167f3c76484865c122056fa3c9cb1eb8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HISHQEW%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T041012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIQDPyWeUKwoHsu8DShn%2BqPrHWsc8Oo%2BmJwZxqhpwyWM9wwIgCKnCaO%2BXonzVi5unAJlq%2FdyeCJGsqkpTXgYMAsko5McqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFNcCO8nrPE8r8GF3yrcAyENJSYsBJP%2BPoy7hSHhAFxXHLzpEz3jtLFJndWc0JTC%2Foh6CsvNrKqZCCWfkmRRv5qiaXpJtXMpNow3bwsN8bxK%2BBlZjK49lVt55SPe3%2FQR2WxluRZXil0p3OXsodrRf9JdqBoakj8q4C13tTfa5BunivAU%2FSFe6gVqkXvDm0Wh2sWg46jJav9UNyv6voorYc9j46Ed%2FFE8TyMPEBaW6ceWDVwn7%2FfT4hEZoBHRKLV7N2vVZdpl3MY2asZM3V6xjwsyNlJOah6SwDWLVQT6rPUoogseW%2BlJVKF1qzM%2Fc2F6hLCKJGZnHaXmKOi4eKXGkuT7zbX0I1Xn53pLThc71B%2Bb8%2FfXvH5nR3P1EDKFKbzv3hHmZ8TSsFpuNO%2FV%2BgEKA49DEun8Mm%2BwB9aIpGil8Cug%2BSUvdfZ95UsRYEZgDKt331zIHELQ%2B2%2Fb0AqXeqh9gbQDwwLBjc%2BYeqfQg6q%2BqEe7bvzAGAfaI82fYFu70Tn%2FWdhL1CrWfm9jb082lZ%2Bp%2BoFjCiRgJrmyg9nPJcr2T%2FRZJNvNf5rUV%2FF%2B7OQ3VJJIOz8HHVg8mnVfwF0ZvYqSx48%2FtvUOFV8Wa2uJsXMoYDcOVaAIqioJCNsrU9QyjRpdcBF5sZI8as7u0NapMJy16M0GOqUBZV6JlFPJjARQdHnnfWeMpFBjv%2Fai6dZ%2FHEy71TxubcD98%2FgCbR9cxjMG67Y2JKDapvcM0YUyHjwCMrgIIfXNuwgcY7J1EchiSCLMEwOrtF47LsH%2Fdpn%2Fq1Ekl0qsEu1S04n1cnMoBz87Po0p3wLO%2FpsGLrZomjM9uQxB9CW45N1KqH5hpCNDDYpA9T20Lz72uA4IX6y8l2igqnZ45UdzPbrUDkXJ&X-Amz-Signature=4961fddc94dcbb9232d0465b121148619589143178461a6df2b3673a59f49938&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WBERX3QD%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T041015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJHMEUCIHemghn6gi90J4xFoR%2FVzjspJLSklbcrA4KJixfLCkuSAiEA8w3%2BOKhB9M90lplLfYJHUrom8vxhaA2eAgn%2BrxZ5%2FVkqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD%2BcmHNWiL73S5WonCrcA85i%2Bro%2FKb4uaPcFWAhDhs%2BOHjA9kS22guMZt91wbNHffywvzrodke%2FPATlqqLc9xAPYg3BBblkxiGmSENWED%2F%2Fj2SLwM60hX7lHkZV0MoO6j%2FwMUp%2FO4rHxYlm7SoolsnfnNZQHJG2ldar8rG0myHd23R7WR0mk175nD87qFbo4N8uDxTX95nNLZjKr%2Bxic%2Bt0B6DkheneLDCdgIArWV2v1eRrzcQtOEACNrZpzfRKV2YSx7EVmsnlpT8k0ydXSA%2BH3PL53KSigBspb4P9CE0xJLKyoS8fj4z408I8mvwhVPYWMb%2BKU9sxISaAiaJSnXiiw7iHzD3Qm5OvssQx5OgYBg6AnBeSD49jbaZIRvNShlb1H76Je1eFQIZfcuSM4Eo0Be6VUBfGsmxtfEeeSBq7PsHbLpwnmm8iU983rSE7pwSA3Xz1MbWPJso0walOlemtyPFXngL16wG2tLwCVKL7ipCmyVmfcweqx9Z%2Bw12XS%2Fn78e16DmPwGESPKuj1puogrO9C0RH68ccWFBrXVl0gjyAjRpSIwdU9zWjtqy4Jln31n1ILY3DjA1o2sH2hgPjQvd261LyfMWC57Imy%2BemUHG2rzMhYARUilqShb1rgVHc5qC5KBCCwFGGxeMKK26M0GOqUB%2FiEuRgh5lyVX8SVy%2BEsgRblC5GcWM9I8f%2BOUHlXDPkC5lPmvVoIliyWgM0LeOdfJ8nWrEJx69uU9N8WpIU6FiTreCjwScl7631NxrszbVO%2F6SisNqhF2Uqm123El71aOTVvfrEz9aHITDEqlpqH1lUEMr3Bm6lf27Vxy0WDxuwXdQ2UgYsKM5Xdyz1noMHK%2FHuq5t1Oi49E9LtUpxlQm9nlcvk%2Fl&X-Amz-Signature=d923fa0832cd7ae9728477e93d180a5787a25817d1388bbbe5215806682e49ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKTPGUGO%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T041017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJGMEQCIF2N2Nst3fO%2FLwWbPL7qQ85VisN7%2FCa8nATh1W47vF%2B%2FAiBLH4RnWn%2BROUIIy6f4CrMQgZjZ6P4yLIM48mTAXBA8jSqIBAj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM1pknl6FkgNX0K5zdKtwDFFVx1U0W1aVFWzJD8%2F57AGycou7eQNWPXibznYFKuiO2DQcaLkcAt4IWC2V4snR4W9WWRgKzmGz%2F4yzypUtKZygsi5q8lnG5K4V6BmpSbBzx67yoWiXc0p%2FeO9tO%2Fp3W4bEJGScxYajspXnaWabfufUY8cXENJt%2Fg6XwAoKyVMN4aA01BJLMgJd46EbNL6CwdchVADouSUpHSiUT2RTMFrJ6hTT2vA4Do52%2BaikgiFc5IRz9pCnmqkexsAtG7yqeyooZecK67GH50OPsfbd9%2FkNlDTdWi5y2hsWpIeRkoDHHlM136b%2BY4hvdKxqJTYkq%2FAQPwIwrUzwM2UJr6HpWey8%2BLv5cmfYyXIsKhGHs4QLoDqW7mGepRBe7%2FaGdqTNV19D8VRlQLaW%2BUKP%2BA9aO8sQil%2BYTeAz0UtotG4%2F0TjTOxLxuAQsc82aS2XKMcI9%2FgR0bvhT4XG3AegglTnv23Ni8BUDvBJVgAG9181w8M6El1%2FwK1K6eQIDMXMED0iHbFTG2VVU6oCkIOA%2B2txhE8pAkH8Mwb%2Bvhwjkj6LUWex0fsFV3vYoVdg3qW3KJQWeik050WubPh%2FuCt7%2Fa6kpFb9RcSiuHs5vu53lAKorAyo7cAN4eK34pi4GNuzsw6rXozQY6pgGM0UZv%2Fc%2BIso5M6xggpjvNjZRHbudLRFgbcKJCxQBQcQn7hYR457HnfQ%2FUbIzNlG%2Fs8%2FoXEzzhlhec5k7G4fCQVPguV237rhCS85jCAzmp4T%2BuDhT%2Fo78j340kg9GYIE6ZN7RArpNQ35F3YNok4qxEFdKuiz3CmEzNFhj4KZmSz0wg%2B7xZAyWg5WoQKWCuTf%2BGsa9UNKpArg%2BfCxqf1ylqBe%2FTvfWP&X-Amz-Signature=82d12f79154490ec1fdd0a2ce91138658e9459b9ca1a523b631a7cd57edee6a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZKTPGUGO%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T041017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJGMEQCIF2N2Nst3fO%2FLwWbPL7qQ85VisN7%2FCa8nATh1W47vF%2B%2FAiBLH4RnWn%2BROUIIy6f4CrMQgZjZ6P4yLIM48mTAXBA8jSqIBAj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM1pknl6FkgNX0K5zdKtwDFFVx1U0W1aVFWzJD8%2F57AGycou7eQNWPXibznYFKuiO2DQcaLkcAt4IWC2V4snR4W9WWRgKzmGz%2F4yzypUtKZygsi5q8lnG5K4V6BmpSbBzx67yoWiXc0p%2FeO9tO%2Fp3W4bEJGScxYajspXnaWabfufUY8cXENJt%2Fg6XwAoKyVMN4aA01BJLMgJd46EbNL6CwdchVADouSUpHSiUT2RTMFrJ6hTT2vA4Do52%2BaikgiFc5IRz9pCnmqkexsAtG7yqeyooZecK67GH50OPsfbd9%2FkNlDTdWi5y2hsWpIeRkoDHHlM136b%2BY4hvdKxqJTYkq%2FAQPwIwrUzwM2UJr6HpWey8%2BLv5cmfYyXIsKhGHs4QLoDqW7mGepRBe7%2FaGdqTNV19D8VRlQLaW%2BUKP%2BA9aO8sQil%2BYTeAz0UtotG4%2F0TjTOxLxuAQsc82aS2XKMcI9%2FgR0bvhT4XG3AegglTnv23Ni8BUDvBJVgAG9181w8M6El1%2FwK1K6eQIDMXMED0iHbFTG2VVU6oCkIOA%2B2txhE8pAkH8Mwb%2Bvhwjkj6LUWex0fsFV3vYoVdg3qW3KJQWeik050WubPh%2FuCt7%2Fa6kpFb9RcSiuHs5vu53lAKorAyo7cAN4eK34pi4GNuzsw6rXozQY6pgGM0UZv%2Fc%2BIso5M6xggpjvNjZRHbudLRFgbcKJCxQBQcQn7hYR457HnfQ%2FUbIzNlG%2Fs8%2FoXEzzhlhec5k7G4fCQVPguV237rhCS85jCAzmp4T%2BuDhT%2Fo78j340kg9GYIE6ZN7RArpNQ35F3YNok4qxEFdKuiz3CmEzNFhj4KZmSz0wg%2B7xZAyWg5WoQKWCuTf%2BGsa9UNKpArg%2BfCxqf1ylqBe%2FTvfWP&X-Amz-Signature=20188ce219243513918bbf52c0a657b4514675e66620afaca3a8266f7bc7081c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TGNDQQ5B%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T041002Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJGMEQCIAXkwHcbPYwiJR%2FEPuhwiTcDjUvfACFzafaNzA%2BvMp9OAiBkDqn%2FU%2FsA3XmhAvwhe2V2FuElezyfxIW9GBVHOy%2BP4yqIBAj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhXumMdVjVuURxarJKtwD5YaUNXUXVf8eOQXUWpvRBYSL00xyx3amizEmqc%2FjkfLLUN5XpITpuGWDjx0b%2B4ztKKUuYKrn759ToGroGauTCoFPrjLZ%2FJHRGWWkXfjaYIlvT6YVKKFnX4zYwWAiuB7OYY%2BVVUWWHbsU8%2Bz2WB1fgw%2BkhTY8zqHGJtrYcAh2UrJVFtBaCSjO1c%2B32r3C%2FJu%2FLls6cX7lAXf%2F173k5oyF%2BNvQoasAB%2FZJR77N5r4Hf5CC2H%2FFnKyM45lEl29%2FI3ODTZo5UUbpUOhaUi%2F555jJ67%2F3R5wt%2B3EvCLJMnhfjepyGYID70C4%2B7YQixKKxdfeag3hK2BEteDJmrEORYERqVvIuo%2F2kHR9rhUu7wDHaUzpfKu6gJMn7EPIAqcXZqy3GdTMvF0xg%2BqOZQ7pEZowH%2Bxmu8dZ5OgUFL7Py5k1EIrFzAM5iTT6By71aDYPL%2BeF5we4JubG7blZkMXNcyc7R2mcE832%2BTCgEGb93xS18A%2Bo%2Bpk0cJtfd0fJwpRIRsyz1LnROyh8mzW7eGfXRWY29j%2BzqFfyrZ7ftGdnLoC8uVhOkqiupTg0eCB0XwzazhW%2FmR6W3DDliB6EdmcWVXdrz%2FDjDSY6I3t4zksXQjuF7vKNi3ORtgmxN7Lac26cw8rXozQY6pgEI1b2WqrOuBDZEMXtku7QQs0BgRO6DBSog3HdoMGJ1KkwoJNktCBrRknMpi7fuFVcMFZ7dTrAeKVu57q3m95k8realn%2FScx%2BHrnP%2Fnzdmef56o5%2FKQNf9qQZR4cddlUrVGb3pnOAA2LlDhVQiYDNfnxlqZY9mtekSzcnFVHnd4fga7lUv4Ev15f%2Fw6gNOOE0tZUZvaghJ22A5PWpTUuFWi3N5UD67v&X-Amz-Signature=e7f3cde9412e3fd68065323c7517127d7fe928b2f2c467d9a6a4e3f039c41848&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XA2UQHK7%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T041019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQD2HK2rdp33%2FldHLsZzYo3OXUOE%2BIICtOoik7HtNDSflQIhALBpGsVu2j%2B2%2FIEMGnBem5%2Bg3GZLc%2B1zUULAQ3VMiZwYKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwOGb9zuAAthCWhz8sq3AN0TnOb5OHW5DGHORr73eOxkOV09q%2F6u0dMiDQQMHthZ1rIYK3fw7JA8UUJJtskYULi5TkG7r9GgyRvbcjNeAFUzEQK6YR9PVjDhoACCwnJuOBW71b68gKJvZk2E0%2BFvpwdGT%2B7tfZA3aRoZH2A4mmG9YYh7p1r9E62q2o610ei0UpPmAcZ5itqDyLKs%2FUEjZQAgnAj1ZvQg1m5wlcdXGunaykceGPcL3oLmjJ3Aur8E%2BrFrbfvlz%2B1dS0KkbioA5spWjJhtb04bmB7AaaaKrK6yH3f7rtJ0KFzxdVTeMIwvlyrR3NjE%2BGHybKoN8l9aYrAsu01PcaPkjY89QJ69Rb%2BumSWDe2w8zbf72H9vrS61HseZ4EdaYgWrfxVafgAbpXbbyEC2jpYX66PffAclg6WwiRN6XvreQvHJUB%2FNZdDBppomp5WWPR4S7dqN%2FIzbn4JIWHs2XFfw8eNGjJJvgxlduppSiPmFyzKba%2FPVRfyVl0s07a9K59wu%2FxLBvgGcbL8tXNgmw9qJs3mEAD9VXEZaDA8ZBG45L9UFrfFXa7XVOv2lLi05iAEszVUsIKXViemjP8h8JI0gslMI1EoUBkd0nQm2T8RtpGv%2BFqTa39fm1AVKg2gAPHqT6viWTCutejNBjqkATXBTAf4W5ueTBqIVJBY%2Fv4IU4eDoVhFOaNIdXzBFTfRsYpqciqA%2B62fz8JrGVt3cxvFbJJII015GLixeWSyDPQOohHJRHdViz2J%2FYQUG2gzYT%2BCB82Q%2FTBFntPrnin%2B9UWtcMGXNd97%2FfbF%2FJRlls9faaczzdJJnhAh8oANSdbBheyIJM9VhzIK7VA2eYEfWT6xdWlKFawETosv5Q0B7hMl8RG%2B&X-Amz-Signature=69b8c675354ea4f68c2a9b4b4181f707be80fcab48d5a924e9d74c6c7d5dbfe8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XA2UQHK7%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T041019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJIMEYCIQD2HK2rdp33%2FldHLsZzYo3OXUOE%2BIICtOoik7HtNDSflQIhALBpGsVu2j%2B2%2FIEMGnBem5%2Bg3GZLc%2B1zUULAQ3VMiZwYKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwOGb9zuAAthCWhz8sq3AN0TnOb5OHW5DGHORr73eOxkOV09q%2F6u0dMiDQQMHthZ1rIYK3fw7JA8UUJJtskYULi5TkG7r9GgyRvbcjNeAFUzEQK6YR9PVjDhoACCwnJuOBW71b68gKJvZk2E0%2BFvpwdGT%2B7tfZA3aRoZH2A4mmG9YYh7p1r9E62q2o610ei0UpPmAcZ5itqDyLKs%2FUEjZQAgnAj1ZvQg1m5wlcdXGunaykceGPcL3oLmjJ3Aur8E%2BrFrbfvlz%2B1dS0KkbioA5spWjJhtb04bmB7AaaaKrK6yH3f7rtJ0KFzxdVTeMIwvlyrR3NjE%2BGHybKoN8l9aYrAsu01PcaPkjY89QJ69Rb%2BumSWDe2w8zbf72H9vrS61HseZ4EdaYgWrfxVafgAbpXbbyEC2jpYX66PffAclg6WwiRN6XvreQvHJUB%2FNZdDBppomp5WWPR4S7dqN%2FIzbn4JIWHs2XFfw8eNGjJJvgxlduppSiPmFyzKba%2FPVRfyVl0s07a9K59wu%2FxLBvgGcbL8tXNgmw9qJs3mEAD9VXEZaDA8ZBG45L9UFrfFXa7XVOv2lLi05iAEszVUsIKXViemjP8h8JI0gslMI1EoUBkd0nQm2T8RtpGv%2BFqTa39fm1AVKg2gAPHqT6viWTCutejNBjqkATXBTAf4W5ueTBqIVJBY%2Fv4IU4eDoVhFOaNIdXzBFTfRsYpqciqA%2B62fz8JrGVt3cxvFbJJII015GLixeWSyDPQOohHJRHdViz2J%2FYQUG2gzYT%2BCB82Q%2FTBFntPrnin%2B9UWtcMGXNd97%2FfbF%2FJRlls9faaczzdJJnhAh8oANSdbBheyIJM9VhzIK7VA2eYEfWT6xdWlKFawETosv5Q0B7hMl8RG%2B&X-Amz-Signature=69b8c675354ea4f68c2a9b4b4181f707be80fcab48d5a924e9d74c6c7d5dbfe8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664RDUBJST%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T041021Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDQaCXVzLXdlc3QtMiJGMEQCIHLnwh20fDzTPKnHHzWZMJgZVsKYdCO9JljRiKAt0iOZAiAwHu6ay3wtwHGWOcM2LtMpb42%2F5t63p%2B5gWCv3kVvIAiqIBAj8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMongUOQfyjIK5gnfnKtwDlVudfDfQ1HPFcxwlZm0n%2Brqr5OTXqPkskTSGK7xmjD68I20tUcCtaCmkIN9LmXuvKFore3F3E0jECk2m79j8BYJL3wvmurNhIupkMvl8nTgfEeDjovKgSjFYQGt1wi%2FLKZCvXKtEX5u5TdAppfRlasN7FFhZjjUK5%2FU941VDJM%2ByH8fZlqhFFMNaBuPXZZLE3RZEB%2FNt62DSlCG5aMiO7hnoUV31Sr2%2FfPqluapg6be4BsU14U%2B%2FG8s9A5kuhnl1VGCBgIISLH4Rc7oWN%2Fc6Qfj8Yb8krr5ah49FSJQXSDrvuD3pfEcYVwdsA%2BFWhA4AecSaLlwrjjajqz2KQ5%2BDqN%2BiK%2Bzr6nldfuvsk9WeUmQXvZi4fR4GkTx7ASkD6cDwewVXzZ%2BmBIwQsSpLQ75kqEwCKNIOru7it%2FpCgAZ5ALMl9yCa%2FxIdoHJNbvb%2BOymVz3aYxk7YKatHQMwLu1%2FagYmiY9saIFKvX8G9IREjrC58krrfzLrwb7bSgFH%2BQ3VDDX3NTnl8E2mrmkD2UFSvm8WufpSjnAUpaJVZhaefWTO1my6BbqS6ulnv9kzLkz4a0%2FLBYFhZcy29l1ssXHTw4JfSvN1fS4RC%2FCeeV38dZPWjihL0wy9prqVDLe0whLXozQY6pgGdz6y1ML2ZdCIuSm0ijy5SUKoxxU7K%2FOeW1t6S3QdxPtj7bOSq7sIj%2FYP3YF2FHUf4aYDQ2RFnybpdUO0nZDnw352Ff%2FMIEvrdhcUrMTLvyK8Ey9Vi64zvUlJ6nLzR519lf4rDA3p0yIfht6lqhytoryA7VaNxuTu5JhJYwoKZs0HlKUaW1FEfxgurcZhRD%2BMfjn9v6%2B%2FnWOUv%2FlBjCU1IIO%2BQIefY&X-Amz-Signature=af70f119b5e35aaed6faaa2fcc5fcc53e97571faacbcb0d92423ccdc3b70697c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

