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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3VMXJMH%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T221403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQCbdUl1bF6k9qfamUswQ%2BfVzt3Bi4%2Fr26mQTQHwXgN%2FiwIhAIQ9%2FttlSYQhKfwJmkRlLcI21Q3gtLnoVCA0aODAIEM6Kv8DCDYQABoMNjM3NDIzMTgzODA1IgwlwHXDWT9SXmmqU%2BEq3APwgYztte4ASRiTnFhFuSOJqLGOnwcy7a2dI31nK8lg4LqfjSPkvZteciFBZ12yvId77MgDTcb4k1M0qhO%2Fa0CCijC5LtkraL42MclJBo9V2WxCyQDH5quAySK1g30S5bKwRVPifeHLa1YrZTQnOefAQ3%2B0Zh0Vj05bSrySjt5DIewyq5dWIzawG5SNAzjQc4Ju2lFiCbL1wIGD%2Fm5O7i3O6rb6pK9pqLw%2BBr%2B9qo4tuz1F7%2F4FnDi4toCd7VXTmMyHSsjQkx30XPHFT6mGGn4lPoJYTexB5q%2Btv2fuGWOk7aMFFneZzOOvr%2Fl7yNJWoSkWF%2BE5Du%2FIhz%2BLzhkoqPgxkFaBQ59Oa56fe5udCU9aYY5eiqUrMk0EThE2Cybcwbs8WYYLSAJRz2d6WAmH%2F3UAgujp8ppEWfTr7KmIqnX23Mkk02NF%2FeYjA%2FBOuImSB%2Fe%2F7K43PY9MvSsfiK1DNvhIvBTCs5pU6vp0ZYWPxYHVkxbkn19Dq%2FVVlGsdMOgPmAISugr7B5%2BKOL3YsOaBlh2Qrgq7MM8MZbmQns0pv%2BBDPZsHatTcgOY90cODCBd2sT%2F2q0plP2Tlj8mRAU6ssaKA%2F9wHc%2BVJC01jJqVhRHW5EW5%2FCdnOqF8KHAgo0TDdi5TMBjqkAS0Xjt88%2BDFglDT%2FFWlk6VTh2xpMORm7W4bHggnHf%2FI2NlijODdgBXqyksmAAsrTxjk%2B%2FzxckIYrDICs%2BH%2FPjz%2F9IE3BZei3wwlORZTm6V5cztqM73xKfoTyTYHF5DghOZ9WzQ7xWNAz%2BqT6ttJvqqxWcC65fnE4r0G%2BQqpSVnEifa6zA7pYBmhZKfA6IxQ1Upf7%2F2N7Ls4hOBc2CK%2BbMLAJFqZA&X-Amz-Signature=43cc2f62e5757c2a5661efa1353a461d3fbfc1f8c8a09796fd10a86c767e9c2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3VMXJMH%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T221403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQCbdUl1bF6k9qfamUswQ%2BfVzt3Bi4%2Fr26mQTQHwXgN%2FiwIhAIQ9%2FttlSYQhKfwJmkRlLcI21Q3gtLnoVCA0aODAIEM6Kv8DCDYQABoMNjM3NDIzMTgzODA1IgwlwHXDWT9SXmmqU%2BEq3APwgYztte4ASRiTnFhFuSOJqLGOnwcy7a2dI31nK8lg4LqfjSPkvZteciFBZ12yvId77MgDTcb4k1M0qhO%2Fa0CCijC5LtkraL42MclJBo9V2WxCyQDH5quAySK1g30S5bKwRVPifeHLa1YrZTQnOefAQ3%2B0Zh0Vj05bSrySjt5DIewyq5dWIzawG5SNAzjQc4Ju2lFiCbL1wIGD%2Fm5O7i3O6rb6pK9pqLw%2BBr%2B9qo4tuz1F7%2F4FnDi4toCd7VXTmMyHSsjQkx30XPHFT6mGGn4lPoJYTexB5q%2Btv2fuGWOk7aMFFneZzOOvr%2Fl7yNJWoSkWF%2BE5Du%2FIhz%2BLzhkoqPgxkFaBQ59Oa56fe5udCU9aYY5eiqUrMk0EThE2Cybcwbs8WYYLSAJRz2d6WAmH%2F3UAgujp8ppEWfTr7KmIqnX23Mkk02NF%2FeYjA%2FBOuImSB%2Fe%2F7K43PY9MvSsfiK1DNvhIvBTCs5pU6vp0ZYWPxYHVkxbkn19Dq%2FVVlGsdMOgPmAISugr7B5%2BKOL3YsOaBlh2Qrgq7MM8MZbmQns0pv%2BBDPZsHatTcgOY90cODCBd2sT%2F2q0plP2Tlj8mRAU6ssaKA%2F9wHc%2BVJC01jJqVhRHW5EW5%2FCdnOqF8KHAgo0TDdi5TMBjqkAS0Xjt88%2BDFglDT%2FFWlk6VTh2xpMORm7W4bHggnHf%2FI2NlijODdgBXqyksmAAsrTxjk%2B%2FzxckIYrDICs%2BH%2FPjz%2F9IE3BZei3wwlORZTm6V5cztqM73xKfoTyTYHF5DghOZ9WzQ7xWNAz%2BqT6ttJvqqxWcC65fnE4r0G%2BQqpSVnEifa6zA7pYBmhZKfA6IxQ1Upf7%2F2N7Ls4hOBc2CK%2BbMLAJFqZA&X-Amz-Signature=43cc2f62e5757c2a5661efa1353a461d3fbfc1f8c8a09796fd10a86c767e9c2c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZNHOB2KH%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T221404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIGnqqMPus6Z9YL9fD2UM4whFZD1Gco0SyRxxtlPJB7rWAiEAx3RrqBjO8Zum4oFQBLZF7tigW9D1e5chp%2Bj%2Fig5t9eYq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDLYGzTaKUlNdpE9RbyrcA%2FMPaHjCqP53o1qo%2FRaw3OLa%2BiyhWrHfi2%2BmzjURCH7aQbLPplmyWYnCZ5cvWjyYP2yXZPsF7432glTKeZb1jQkAmts3w%2FoAf%2B5Lhow09s9Qyw2hPHAuQBvCULPHO6O9U5LafSIGrCfVQXzI6vkYNCBo1HUOokfxrOO2GAW8ehVV6Fbra1VeISISRrlMYfPlWi2Sx%2BjaOuqUm2nwpxerWr4zV5uzcU11P6PzUNxa8gcLbm78iWft9rmChaL9ilosJmF079So%2BlkqsYpLyUuaheSN0noC89IpphNV7IIpUU4aevWgs1OtKlW3cgk%2BJMNFuGp52EXWoQsmGewTKfmlvJ7%2BEuMnUSY78%2BsEBRCueNPhQrG94x5xnuy5ySvdjNMC7htThuOpYU6u7vG0LY6qfbNPov3SNDBv2dgKV%2BMVO5H6%2BJSyktTlEOx8Za5voFRw7PIy7VXkzAjo4tiO1j%2F%2FBZoIzix9RFQBPJyrdENkvCxk995C1PWs9%2FLCH6i%2FSBOvfa4bXwVgko26CODiZCUOmlv4n8TN8CmVpencJrArL1RCHb6sxSv2iNxPMsom3xhUGC%2BpOUeJmrCgv9cI%2FBym9SR5EQHAunoS2wZNnSELU45UmT82qjYBdu8%2FD249MOuKlMwGOqUBZ1jHbyeiXGkNuwCUT0FhThgtH2N0e0FOxzJ%2BQy4DkbYraIVNQZo9vDVcsA9QL3Gq%2BKlbrwfdk8JXqydsW8hpB8mNk0RFghfl4HH2rDRBfOp%2BcO3aQcbQD9YY%2F63%2FP8nycF2Qn2I9bUEL%2BK0ZO%2Ff2kiqAg7gcTdr%2FkEZoJ7BEwcOkSUO3lsrg%2FJ4Cyah7jaHrs0vKSrAPu%2FN0I0q4zPpJ1B1OBfiK&X-Amz-Signature=fbc851fc8088aa85d14d73a7de14209db969b23120a4d21709868e7522083e1a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7MMSZOS%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T221408Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCFuWSStb3Q7rBYWwt9CD0NULwhTBqUd%2F5qy8lZfRJ8jwIgA3JRk75OtO0L7VDYY4lCMYoYnIS17sPRFrMrWSFytXIq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDOTWEaKrl7Ak3azJ5ircA27ITiewY8QAijgTqbWiVnafnfqe4kzk3PxiZgaBTmgk9guXCP8f4x2ZCHxhNXf1Q0Af00Op46tUCoPrhLPJ%2F37aK2JzmrfreBcwf%2Bf%2BIf6iSKNy8oVDiI7MX7WAGhHQoaJYCV%2BlVZuzVaOvd7MqRLT5qB3KbTTUbPHCpgIoPKwwmFPMKuxba6o%2BSQt6CzNmmsPqV1cftUHXddttPXQg5On6B9fKZlbGutUTkcmglQxzlzlwL5KFOtXxSeD7fXbj0843%2BNZz2yXmi3kMSPufTWdXe%2BXOl7%2BIZifVaO4xUP%2F95NDgYQsLX9Mg%2BZjODK0rB8th87CkUSuhybjGqLigbAleR37FmlX%2F1jRSg2pX2b7O%2BJSNkyaYUu4KejlmFlQ7s57wBkUoMrVGEcZuwsb6SQzE%2FN6qqzrDR9hVdnHyBwkomi%2FyorpAGYjostrLfj0UNTNUTvi1sDPCmRJZWSW0St0HjKhTiRhwTikh5TSZu1hBK488VFz5zLWkRlwCevI%2BGFv6SMGeXZTEx7CgJbU%2B6JL6fWNl5hpnMx02Y8qkGe4QHNk31hcRSoIe2lqrcoxncCNcLh190OARQEF4VH0VJAJc5RSFVkrse0QAFfYC4SycifoN0QHKw%2FfD16V%2BMK%2BLlMwGOqUBNpTlj2KPn1T85deaIXkVIAA3wigDf9zX6G2W5jdxdJP4CIC6wsRF8uTQS7TT3%2FjJW5ePd4DHliJ6M4CwtZfQwTjrn1T80Rfiyh77aR%2Be%2BGVGeMDp4UB0idG62dMJ0fmEeyYtUeBx8ZGT2HCzBA00IzbNcvYYTEk23ecE68GL3TsBKhnKZA9gTYo2wqgMpmECjh0M5VbLoi7P8arEb0EGmN%2FLMuoJ&X-Amz-Signature=583cddddf439e12e3fbfeb3d535c7906d38758ad3d5878054949543306b123e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W7MMSZOS%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T221408Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCFuWSStb3Q7rBYWwt9CD0NULwhTBqUd%2F5qy8lZfRJ8jwIgA3JRk75OtO0L7VDYY4lCMYoYnIS17sPRFrMrWSFytXIq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDOTWEaKrl7Ak3azJ5ircA27ITiewY8QAijgTqbWiVnafnfqe4kzk3PxiZgaBTmgk9guXCP8f4x2ZCHxhNXf1Q0Af00Op46tUCoPrhLPJ%2F37aK2JzmrfreBcwf%2Bf%2BIf6iSKNy8oVDiI7MX7WAGhHQoaJYCV%2BlVZuzVaOvd7MqRLT5qB3KbTTUbPHCpgIoPKwwmFPMKuxba6o%2BSQt6CzNmmsPqV1cftUHXddttPXQg5On6B9fKZlbGutUTkcmglQxzlzlwL5KFOtXxSeD7fXbj0843%2BNZz2yXmi3kMSPufTWdXe%2BXOl7%2BIZifVaO4xUP%2F95NDgYQsLX9Mg%2BZjODK0rB8th87CkUSuhybjGqLigbAleR37FmlX%2F1jRSg2pX2b7O%2BJSNkyaYUu4KejlmFlQ7s57wBkUoMrVGEcZuwsb6SQzE%2FN6qqzrDR9hVdnHyBwkomi%2FyorpAGYjostrLfj0UNTNUTvi1sDPCmRJZWSW0St0HjKhTiRhwTikh5TSZu1hBK488VFz5zLWkRlwCevI%2BGFv6SMGeXZTEx7CgJbU%2B6JL6fWNl5hpnMx02Y8qkGe4QHNk31hcRSoIe2lqrcoxncCNcLh190OARQEF4VH0VJAJc5RSFVkrse0QAFfYC4SycifoN0QHKw%2FfD16V%2BMK%2BLlMwGOqUBNpTlj2KPn1T85deaIXkVIAA3wigDf9zX6G2W5jdxdJP4CIC6wsRF8uTQS7TT3%2FjJW5ePd4DHliJ6M4CwtZfQwTjrn1T80Rfiyh77aR%2Be%2BGVGeMDp4UB0idG62dMJ0fmEeyYtUeBx8ZGT2HCzBA00IzbNcvYYTEk23ecE68GL3TsBKhnKZA9gTYo2wqgMpmECjh0M5VbLoi7P8arEb0EGmN%2FLMuoJ&X-Amz-Signature=a0dcd8931386fe9073861d2e8399bcdec944be2ade89036de736c10f2398e48e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TK5ZNCIM%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T221408Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIATaCt2zlzYrOeRbwdFeBJI7F58S20OxIsf9HiXEvr9OAiEA6ANXYHaG3KfCgLDap%2FHZbCFoUDqcapGtXyrtW%2FNSw14q%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDBWfMJhML3kVf6UxQircA05q%2FNXUAwuvxv%2FDrE5GnvIk3TJR%2BmpMavXebA%2FpzQgWTSzEAwAPlS%2FdgCZyI16PuM0NTxN53LyrKaJ8nRJrFJG%2FYn3ctJB0OeIOkVWfo3xStCi9QzwZs5oLhujuR9VAgUxK3pR4X92Dbxj6tJrwJ%2BF2v5786TX6a96lJ06kbfs7pYswZUrUvEqWr9jQCmbKfu9wk5I6%2FQQhcm9YWwP5Ai4Me52WAGfSOzDdNKaKGKxB8kZbtYOwfys46XSy%2FYVJUVUC51a6C6yoQsCZOZFVowLwV6TdK88mDZ1oTgErILZbRjBiC9XPW%2FMvhf7b55awpp23rVP%2Bx9Gu7i5PuRouZbNowi%2BUjaNiWa6ZwFv2fy57fWMFArTi7YJfdTpDfvOQaEq6EovoBaTh1p1lAAffEuXTdpvPdCVJA6YslU7oEbDqkidHFmxHhvFB%2F9pLGhb2v%2Feee%2ByOOrqkwiyNTX6V9qDG7y9EGJA2r7jAiQN%2B1PJP3f5YFX0KJvIbO0lEBBXj6%2Fmr0G0P1974D82go1i7E%2BHkKk1h%2F9SXJ%2F1q83AB7Al%2F8dy6pW9bU1RUU0Z%2BQqIm9oG%2FwWIWI4fBxwzpH2cObnEJYIfw3T03Iez7hBrib2Fl9rV9NlzzZIyqmgtGMKyKlMwGOqUBbV0TqxoeKlSVZVoe22HjGeJWLco0eUWAOFoCMdBCq%2FE%2BK%2BL%2ByEG%2F1QNCGY2lhgSo4wJ00JOpOnNgvon3u%2FBZQKq8QCIbvVjE8JZ%2BLNA%2BCK0BYQzwV9da8C8r9%2B%2BE7KSdreEf90RQQVSf2Jjd3QHzqRBK%2Fl%2BGbOYMloALSFQCyhVnYMJTz4CpyZPdcdSO0%2B1fbS4FcDs%2BznZoXDEhWoboLzEVbO%2Fd&X-Amz-Signature=ad38c5339eb9f1e1706f497ef37d56ae1aa870eb64afa94ceebdcbcf8347baa2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W67IDLPQ%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T221409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIBVs%2FkIlhVX8VLoYmGIHViNrclWhINjZIFv7RM9P%2BaHwAiEA3Tnz81%2BbHVLNHn3mKxIIBIYQdiErKUiBz4pnhkAmlfUq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDF2nA2yEa1WOj3V6iCrcA%2FCaRovhDR4sZ1aY0kvus%2FwQgvJH4MESYygkDouBXYpvb9g%2FNSacq07SSIAwbKRc5VVmByPK30teU7GzMrTfN5n8vN0ImDZJosQhK3cob3UTjaZv5LKsXSgavz%2B5o%2FdeyjUTZpEEN387mCvxRdkWu3GgMA%2FXsYqCWWjzHV%2FH37TwVPwC61QlBhE3FkmFJgnglFw7z%2B2LYZ4REmhuvPbtcfdX8I7%2FB8Fclwl8Tz6Gk2hWfHTQff3wugk5PCCDPlTz11M%2B%2FV82e1DgePWU9CtF%2FMaatGJjMWU7b%2B%2B5z5w7tyba35r5slLgpHRubMH84RmVCTmp5aZ2EAjFtz0ljm%2B0mTdUJzqINe9ErfVRerSgGx8jsQxa6NhDnQuGT4c%2F3nu1S6GVg83sbV%2BZ%2B%2F7%2FaqJ5N7b2KvhLvjLAIBXqYreqziS3eH8E%2BCz2rA95BnrUymEHZQeyEJSpNnU5FjXBTWADRCrxgBDJhxPeRnKznVVjg7%2BcCS1bQJtV2kM8gelS4fK%2F9yZibuf8jLaPAiEKs17HDbHHGzIoXavVPY2C%2BQhjcqxhu56Vi2krLppaaHFvHXCWxtsRIHMiJ0eona%2BH%2FtLL1CNzGyb4ROnYdP2RJCl4pBdgIkVeVyqbxGsKk7P6MO2KlMwGOqUB%2B%2BWUGyyWMRrn2LtX7l1G2zO5SXIdVvHXRVUhaZBV3q7amRH2kZrwvMYPIZcjyJkYcm%2BGpRuK5tfacEB80IgwpukEDcNAMng5yLYkto20i%2FUMA2xh7DYhWoFFqJO2l5sWnocQesUX%2FSCeF1iOw33CGHUjCXMc6vhQe%2BObxec2Vf77dXG%2BFe28hnthFlLsM8ynMPoaXpq8MWVLYzKVWt78lsJ%2FliCj&X-Amz-Signature=9bf6e3deeb75f9ca1a78f688b6b120116f3ceb4b18d729bda3e82c7e06a5f56b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666PY3L53C%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T221414Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCQMFaibu39gL5jJqWrgcWWmqmssbBOhoCd61nrp0wxMQIgEiFyW%2BFUOvDpKpGF4%2FJ00rPVMBZHVoV14YbcKlEu1%2F8q%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDJbVroHhhaI3%2FhuWUircA12a5wk7fd2B8L6xJOzIrEirtMz6wcusKZeh2TU1NKqyPrzbI7I4YVOIvVRf4lHi5h7pnorWJOSC7kKeY0%2FnGiR7XxjsKUDFeKtyglaFIyVZ9vqHmtCAZC0ilB9IiBWTh9esVUINuHSYi8M104FdhaQ94SQAIRSQ%2BsDxQjtn7ZEUbdiyH8nqvJLc3FZ6GUd2vuXRK0Fjo2KfWdg4pfz1b6gs3rZ%2BeMmT5XyfzXlGw65lsOR8nIMc38bLnqZY96MhxtMcl6NTEd5l33midS0JE0kbq88DVBwpT%2Bxdu4%2FfItdgXX%2FqS7429u9Ff6ETWd%2B%2FmZinpG0a2TcgVzY39t6OXFlelEBqShAJpieJCNOdIa72%2FWrferDBkB3q6JlT7yu6TCw3q0MeFk0zP1%2Fm5%2FjyQ6M70xfTE759wNZH%2BxVfsLyQfPGkkvv4NAohk8H4Z4pOWqCgYm54BhKjKvyyIhG5f7HjeJeUTnMQjsU1%2Bnnf%2FpgBXYxD5juusI7dnMm2BaurlDJ1w7hO4jXeZbOunRVQCW1M54bObLH32smNY0kz63ByOiTZ9yuTwllzd2Amr5FEcPSrnKWAVNGZln4tGktmG7EuCcTndEqRpLdo3TpiR8lMxc32h4dsv1hVsZOCMKOKlMwGOqUBlB5XVDSnGwVHPK7wHXUwJTyz3IecCoUqs%2B3zSesp%2FsuIz97WmWBLRwpN4QWzkgixyfZDDItSufDXoeDL1IEqfcFtNvbDGg3Cclwi4qYPhLRnf7Huhnyig%2BpAJQl%2F5zsXAlVVSi14uoagIaCZlQYeVzb%2BxewMXT%2FECJfkCMZnGx%2Fq82g7fVCIoQPVqmMyIXXG%2FFJaSOIukd05yTxCDxWY3pkcN2%2Bf&X-Amz-Signature=2d2b87253d8f7540c75cb6b5c4e4ffd3d4945291c859d59f58184c3971ba19c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TS63E36%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T221419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCJVecbOe4lembvdwv6%2BIg5caBsPkD8WOJ%2B1w%2FpQSkn0wIgdqTSJyZjPvn0T4ekj5zJyUY7pvIurjeGUSqU37v8c%2F4q%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDI2eVyH%2BMksZuRIi7CrcA0i29fCRACFINZd2LQu1A%2FLy5XkWbfNmP7%2FHh1MYPvO5qtNRRROfaiBjrF17y9m5n8z8VJxJfdxvwj4vSkvTw8JlH2qVLM0nWiaWBd3UhOSCBwDgSz1hpLqjAwh8JwUq%2F%2BiKlCkXWpVE7xYqrknpsneKlzG8fgyz0R2kICRW5UXecj4AZostUxhp%2B%2B8zH7j7d%2FbEzUapCJG1DxPcBnnSf5pQECabLvYAexkEgi5MXvVvi6MNnVfUiRisUqLjcLs4MIM%2Bia7cONDX78UasxEcvPw4uHowXUakiFHcmk5FZsDPynEt0bm0pobXV%2BgzI0snxe3ofuKdkOhGJ5pOBfLn3bLzZTG1ohRX6%2FV4HEKAmd2dQ3dhestoV8thPz7xXGh3rPLywCwYFKDFSypaLsZnlypNoJ3fqvJlgkT2jDQs0qo3NmNFh9%2BYSNOB3Cssl%2FoDNY6QeE7NU9BJL5B9WPrpOFzELp8nkLVLc4o4ffaTLOXvrkAi%2BYeh0iSh9UlNH5cZH0kNUn%2BhaTBVMjh05PT5JL74fLtkwQ1NZqcgDi%2Ftsm%2FnEdLfY8uLfsxHSUBCeA4XRTYCMUIsfGgRChcS259aijAnxJt21oK%2F26ge1i2sh25zacBT0jkCLpiv%2Bnr7MOiKlMwGOqUBDxGlcoeMC6DC707Fb%2BjCdLhrSdZTzfy78M%2FwPRp6tuxTzwolRNrvv1tJEdblxWbkmmlF4qcA%2FYoldAepTUOAef4p4%2FOYlLZ%2BrFe1xtigX%2BN1OvzL4r9swAYBQfvvzt%2F2Hb39aisfddhqRdiJ25UOwpDmvvF35GOJekMlZyJSLt8BglAtNNqhvL9utHyKMhgd2whGn%2FzsWA0X1q2y2KnGDpeIiRsF&X-Amz-Signature=994f3f809aac3b8c39f2ca28c7b3e85dea43ce17f4d1f0c622ac87523826767c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TS63E36%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T221419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCJVecbOe4lembvdwv6%2BIg5caBsPkD8WOJ%2B1w%2FpQSkn0wIgdqTSJyZjPvn0T4ekj5zJyUY7pvIurjeGUSqU37v8c%2F4q%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDI2eVyH%2BMksZuRIi7CrcA0i29fCRACFINZd2LQu1A%2FLy5XkWbfNmP7%2FHh1MYPvO5qtNRRROfaiBjrF17y9m5n8z8VJxJfdxvwj4vSkvTw8JlH2qVLM0nWiaWBd3UhOSCBwDgSz1hpLqjAwh8JwUq%2F%2BiKlCkXWpVE7xYqrknpsneKlzG8fgyz0R2kICRW5UXecj4AZostUxhp%2B%2B8zH7j7d%2FbEzUapCJG1DxPcBnnSf5pQECabLvYAexkEgi5MXvVvi6MNnVfUiRisUqLjcLs4MIM%2Bia7cONDX78UasxEcvPw4uHowXUakiFHcmk5FZsDPynEt0bm0pobXV%2BgzI0snxe3ofuKdkOhGJ5pOBfLn3bLzZTG1ohRX6%2FV4HEKAmd2dQ3dhestoV8thPz7xXGh3rPLywCwYFKDFSypaLsZnlypNoJ3fqvJlgkT2jDQs0qo3NmNFh9%2BYSNOB3Cssl%2FoDNY6QeE7NU9BJL5B9WPrpOFzELp8nkLVLc4o4ffaTLOXvrkAi%2BYeh0iSh9UlNH5cZH0kNUn%2BhaTBVMjh05PT5JL74fLtkwQ1NZqcgDi%2Ftsm%2FnEdLfY8uLfsxHSUBCeA4XRTYCMUIsfGgRChcS259aijAnxJt21oK%2F26ge1i2sh25zacBT0jkCLpiv%2Bnr7MOiKlMwGOqUBDxGlcoeMC6DC707Fb%2BjCdLhrSdZTzfy78M%2FwPRp6tuxTzwolRNrvv1tJEdblxWbkmmlF4qcA%2FYoldAepTUOAef4p4%2FOYlLZ%2BrFe1xtigX%2BN1OvzL4r9swAYBQfvvzt%2F2Hb39aisfddhqRdiJ25UOwpDmvvF35GOJekMlZyJSLt8BglAtNNqhvL9utHyKMhgd2whGn%2FzsWA0X1q2y2KnGDpeIiRsF&X-Amz-Signature=904b259cf6ad478fdcb501c5d6a8064627afef6afb53c0d617729233a5b3904a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SWTI73MK%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T221357Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIGsB%2FFPojudC6261bWVlbYBKQ%2FPu7K2KPcCqf0brXBTxAiEAyUxyfJLDEIg55u3GpW1yNd0UN9%2Bu7QFwpBCLAbmZwkAq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDMN3ATi2u7YimV02iircAyuQ5odJXM7VIptr%2BAE7UHri%2BZTDEmXAjQeHGMyonfUBCaoLpsZfgweruRmnaZS0Z872vYdSQrlwbuN%2BEj%2BVRjYRi1jJiqKFwumhBp4NyRLeZNob2BPad%2FwV25W9ETBQGCfHFULALPJ%2FdEae%2FweWT96SP8WG%2FJA2WrtoXZkM66rE7zx3cW1IJxxdbTzqL6KJ%2FaJHzW%2FpbOiYnUEprjEk4ZiyVTeA2jSevypVX6peXGAVE2l7jfoE9XelRMIE3Ve5K5F0Xsn6Ifer2PDfVcDz0l%2F1sssHzvHgdAAC3tZy%2BqPH%2FMmQysxnMrNhd5xD33w%2BqHdVpLoVVbIG7ElCWycashPC%2FMHD94LyhuJo36m3A5NNvmEuIU%2B6Fb%2BUGK71%2FXAwteb69W%2BmynsfRc5dg0U6WZWrgMPmJMtkJOfDmshThsOnlPTeJS0P%2BYe7sVmIU8YPiu%2BL0nGQX%2FMRX1a5GIRH3w2GcT7fuJNV3zeUB%2BiHV0UE5Atm0I3m1iiTAxPkj5peNhaE%2BD2iKhh3rA1LvRCpr%2BojP%2F3M8w4mC%2B9y8dWxU9ujyEiMABqBU3W%2BbDdUyEMN4KWnMKgAY%2ByesgB9UgqQOGXlhFZmv7FQNxhw09OeQg26H0w75t%2FqeqN8peSJMNeKlMwGOqUBCi3XoIFhkvf1MCVCfiwUHw78tt7SioYQmzrzXH2M0LhZUspnQV7%2FoAfRzZ1o1%2FfxT9enBlnOvV2%2FXPHuuPkqgbO9NnfQgRuHmlPAuPpNLcap2ZqwwAcHCnW%2Foe9T1vZofjVY42wK0RBIF4cFOsPmx3FtunnWfRyhqJXoWi%2FhWufrAUfA2goPSP3fQd%2Bhf2IQfG6L38uu6yBDTtOVritSJZDoFHVg&X-Amz-Signature=55cceb6fc4b8529eb83f557fdbd8d604605ba641206b79cc727796e3211dfdfd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUDWFTMY%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T221424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIHD5%2F1%2Brkpayy4TOiedZp3vjJWZD1aJ04ELYqHHkreukAiEA%2F5MHObfcuzNo7JWsGCVl7JuKGjmiM4VutSPwA%2F5ZYQsq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDKCK2lrDVv0iIeXXOCrcAyDdu6Bc573Tpn9a6Y4%2BA6Ex3XolFXGt%2FVoA%2BB1oQq1JAFlQCNMY5etwn1Hgz9SR5InhqAhUGTSqNus%2BZVinRmmWXsTmovnV2brnCJnC1kBCg3cA4hhe4fuzdXXLTlXhtpnGx61lbohAQgWNCYgcDgRBVvz3cHPQ9sKX05nqnqJccIkKi8wtPm3XmWCCwMlKo36zKLGxjyMydqCliz5Hj7t4%2B2E7Oxisf65udNE3FAje0S2MOYmf%2FOEtD2i90Rp%2F7QbUtXvqFg4Tqxd0FFCm54AFyB1EX2ZRUSNX%2B4mAExDHu5GVozC%2F9gOal9orTwF5rJCFozW7UI1u80%2B4wqLxs6oLCJPz1y08CNoDiSNbTU2dZViPyAZkV%2FhkT5%2Fwu%2FRyqMr58gaXNqKaqkbyITxR6OqIVYYFxe%2B53EI1Mi3HgfnfWj%2BU6h7vU6kxvTQ2IaEJtmP4%2F1ds8Y7s7FI65GlPn9EVaFV7v3tJcYtHcOR7nJ%2FIp4n6bZUXUDC70fTmjPbpChJ7%2FCMUY5BL8fyau4fJ1iw13ff3rpYcT593uvqiHiODy5HSFm1EL2F%2Fhu1Mfk7LoQ2qx%2BySr1n%2FQg313yQJzgkSeLABg5GjJ9bxi2hXSqD9qwEIc1TyzQxHkEoHMMiLlMwGOqUBDD1MIauetSXZ4gH56jfAFQkjPP0Xb6YXOa5XyX2dxjXngpjkr%2BgsGNy5lI2BOqUut6cJlD0m2UbYKf2NtgPHAI7OAOmhQ7veQ5Ci%2FPIWVdr5pvlJUFV2rZqe%2BpumdvtgFQt%2FJ6Zu5xxYSpzAZLiMinq59HLQej9HmJjTbwO0qfa3EWf6I%2BSeLEKjCrLgVi78Wv2STbnNhx%2BcnmENXW%2ByK0BUpTc2&X-Amz-Signature=22881ed318ecae7c2c8b51c8e332665e3543b3813d8abc421fab82b2e17db328&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUDWFTMY%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T221424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIHD5%2F1%2Brkpayy4TOiedZp3vjJWZD1aJ04ELYqHHkreukAiEA%2F5MHObfcuzNo7JWsGCVl7JuKGjmiM4VutSPwA%2F5ZYQsq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDKCK2lrDVv0iIeXXOCrcAyDdu6Bc573Tpn9a6Y4%2BA6Ex3XolFXGt%2FVoA%2BB1oQq1JAFlQCNMY5etwn1Hgz9SR5InhqAhUGTSqNus%2BZVinRmmWXsTmovnV2brnCJnC1kBCg3cA4hhe4fuzdXXLTlXhtpnGx61lbohAQgWNCYgcDgRBVvz3cHPQ9sKX05nqnqJccIkKi8wtPm3XmWCCwMlKo36zKLGxjyMydqCliz5Hj7t4%2B2E7Oxisf65udNE3FAje0S2MOYmf%2FOEtD2i90Rp%2F7QbUtXvqFg4Tqxd0FFCm54AFyB1EX2ZRUSNX%2B4mAExDHu5GVozC%2F9gOal9orTwF5rJCFozW7UI1u80%2B4wqLxs6oLCJPz1y08CNoDiSNbTU2dZViPyAZkV%2FhkT5%2Fwu%2FRyqMr58gaXNqKaqkbyITxR6OqIVYYFxe%2B53EI1Mi3HgfnfWj%2BU6h7vU6kxvTQ2IaEJtmP4%2F1ds8Y7s7FI65GlPn9EVaFV7v3tJcYtHcOR7nJ%2FIp4n6bZUXUDC70fTmjPbpChJ7%2FCMUY5BL8fyau4fJ1iw13ff3rpYcT593uvqiHiODy5HSFm1EL2F%2Fhu1Mfk7LoQ2qx%2BySr1n%2FQg313yQJzgkSeLABg5GjJ9bxi2hXSqD9qwEIc1TyzQxHkEoHMMiLlMwGOqUBDD1MIauetSXZ4gH56jfAFQkjPP0Xb6YXOa5XyX2dxjXngpjkr%2BgsGNy5lI2BOqUut6cJlD0m2UbYKf2NtgPHAI7OAOmhQ7veQ5Ci%2FPIWVdr5pvlJUFV2rZqe%2BpumdvtgFQt%2FJ6Zu5xxYSpzAZLiMinq59HLQej9HmJjTbwO0qfa3EWf6I%2BSeLEKjCrLgVi78Wv2STbnNhx%2BcnmENXW%2ByK0BUpTc2&X-Amz-Signature=22881ed318ecae7c2c8b51c8e332665e3543b3813d8abc421fab82b2e17db328&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XWDJMYZZ%2F20260205%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260205T221428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCbQDAguMWs3uRoLhaP8KaXq5tDbKTG1pZOHfR3%2B3VV%2BwIgDdV8IPt8RJnr2mjXnkc0smPnKvHGVh1w1hfaTQNNP2gq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDPVRL2JGMtPVTmW1kCrcA8cJPlFwlwqfDZ1ZFIc8LHkV0Dmwyk5NYajInuOppq8FWA4S5mA66YxOqm%2F0vQUM%2BQafwnu%2BrG49onCx9auHdzrqkpBq8SXtoX%2FGUx0h7Q%2BcqZHJgQNSGZ%2BRweEjftVCpEyvz2gWNlZrpNh94%2BLVnw2vIYEyjFBYp15YFWr9eZhnD8cix%2Ba8J7cO0rog3xO9Qd245jYBmtiHz30PY3JLDIYfr2btzb0ErfK9Nt09LIuSTD5BG%2BsZER7Ilz5oy3D%2FnDLjx8LX4K9OKWamcO4jC%2B2fPi2Ax1zv7yXMWnXik3psyM%2Bozqp31gtoGw03ouXtG6NOsb5uc%2BiqEWtpAevW0ToIVa%2FiKnhPTnnsG754NF6EdRWPonCLC4okkKujck%2BizYUGSjr1IOuyM8O%2FAkPqazOXaU%2BNBl2v8imot2wGpleQ1Q4DuJywLlGwgPORYCiVKlXFRBKd0ruVnxpZWj1N56iMMiCL5PEewjkvBbxsnBb4dVqDbEzW11XiYyNuu1Dv1lZEzqajvrue4RTWx%2B%2BKqHo%2FYfwn%2FegDCMuvbYmr115c%2B6N0cLL67zFu8xZLck560I5GH%2Bu6WT2YApqYwGux927l99jmRHaqwjncIzmFt%2BzS2OTfgUp150yH%2BCDuMNyLlMwGOqUB8kfi%2BVeXo6L%2FQuOYJecj2Hy0YTZmVdi7OAKqMajKPFu6zZLm%2FN%2BQT1PlIppcVXCSjWwTUxQ8w2O8cvigtmUAUSfPhXv0gWJSodKg35gZG55%2F%2FQbCnbT6f84nYRqHQM%2Bog%2FsWinGTeGmkGEqh7Eo%2BCFoZTTqtqPZ350BcpSn01NQ3zjZ%2FXigY4QTA2I0AEqdK%2FmgWZBDhaUGA5wFMclbwoLtTrKfW&X-Amz-Signature=0cb7a3133fb5525898cc79a353f758b24323a44f31228a83ecee85635a6df6ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

