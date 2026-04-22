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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QR4SJWGB%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T213910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDq%2BX8Oj8%2FZzrUj%2Bcqcb7BK8xuljibDvzwGzWPP8d3cOQIhALgsO9SD66jv3%2FU1Op5TY%2Fg4fgPIAdeGVCgPZmTcHp0NKv8DCFYQABoMNjM3NDIzMTgzODA1IgwlVUXxEo9W%2F0GwcSMq3ANHS8Rodjq1N%2BpvUP%2FlpC234vepZO2ct8Je4q058eaCM8qJg2S%2Fm8qIURaUsUHALxLOg%2FfRhi7WNINies3w8vMR2vRD2CJUpcEj8SNTKx4LyEBhTzSWWuUZvifBOe4LIEBwwQDHnOjrMlsvcrxNSMfFxPUFVxbIgfvR9W%2B7oLc30n5v25%2F2qpCUvhP5nIu0deYm2Ca8OR88NFQjnkUIfCcm%2Fr7CD9ztX9z10lblhHlSfqP5EJGmsPEoPe6laiAcTr741ItlwsRM5VfU1S%2B66%2B%2BWGwbZeGj7zYtcG0yMSLRKz6o2b%2F63kVvMy1ZejlEy9uU8qplOgDsGAw2uKx%2BFiAZydKRD%2BiUPUOen1XtQIGbsIeTCUEpGyHkeTOG9bI1Rcw5wWKuab4v7a4yuX9gbUu3cUNzRVi4jzuyookg%2F%2BhaEPx%2B4dyR8Mtiyqq8d33EGVUNDxP7Zh2907TEQazeNWJJRlCS2D9y%2BKZnUzGqGye3xLcYHIf17LZDTX7fONffh5f9wF%2FKQtX9%2F56183ul7W7aTskHCST9%2B0hDThWEpAN%2F2gtBKG3kKc1uNgJ7McUtUqPXvTcam6%2FQSeNv3kduq65uUL3bTY4pvdT%2ByEMcsERqz9p2WfXVn%2Bup%2F9yLeiDCv5KTPBjqkAUQ6H0udTf4wZck3XKv2M453KVG8sKc8fbwmDyU%2B2D0EK1RhB3S9CdT2eFtlAHXCLnSEaKLE4Ip3QEnNxr30yLy3UArwDURzZ%2FVFXWQ%2B5AC2pztt%2FkbELeqvJY6cFlEOn7UOvZHW86LfCum3QBlM6m6N0sQ5hZ0Stf5xMt0%2Bu2pO2%2Fd4NX%2BQo2XbyWV3vKr%2FdqXsU%2BkiWn3tNAxIM9KaurkmW539&X-Amz-Signature=565bba60093c4dd17775477e194b8ff4737ecdfd308e29673b4b03f34d4b99d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QR4SJWGB%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T213910Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDq%2BX8Oj8%2FZzrUj%2Bcqcb7BK8xuljibDvzwGzWPP8d3cOQIhALgsO9SD66jv3%2FU1Op5TY%2Fg4fgPIAdeGVCgPZmTcHp0NKv8DCFYQABoMNjM3NDIzMTgzODA1IgwlVUXxEo9W%2F0GwcSMq3ANHS8Rodjq1N%2BpvUP%2FlpC234vepZO2ct8Je4q058eaCM8qJg2S%2Fm8qIURaUsUHALxLOg%2FfRhi7WNINies3w8vMR2vRD2CJUpcEj8SNTKx4LyEBhTzSWWuUZvifBOe4LIEBwwQDHnOjrMlsvcrxNSMfFxPUFVxbIgfvR9W%2B7oLc30n5v25%2F2qpCUvhP5nIu0deYm2Ca8OR88NFQjnkUIfCcm%2Fr7CD9ztX9z10lblhHlSfqP5EJGmsPEoPe6laiAcTr741ItlwsRM5VfU1S%2B66%2B%2BWGwbZeGj7zYtcG0yMSLRKz6o2b%2F63kVvMy1ZejlEy9uU8qplOgDsGAw2uKx%2BFiAZydKRD%2BiUPUOen1XtQIGbsIeTCUEpGyHkeTOG9bI1Rcw5wWKuab4v7a4yuX9gbUu3cUNzRVi4jzuyookg%2F%2BhaEPx%2B4dyR8Mtiyqq8d33EGVUNDxP7Zh2907TEQazeNWJJRlCS2D9y%2BKZnUzGqGye3xLcYHIf17LZDTX7fONffh5f9wF%2FKQtX9%2F56183ul7W7aTskHCST9%2B0hDThWEpAN%2F2gtBKG3kKc1uNgJ7McUtUqPXvTcam6%2FQSeNv3kduq65uUL3bTY4pvdT%2ByEMcsERqz9p2WfXVn%2Bup%2F9yLeiDCv5KTPBjqkAUQ6H0udTf4wZck3XKv2M453KVG8sKc8fbwmDyU%2B2D0EK1RhB3S9CdT2eFtlAHXCLnSEaKLE4Ip3QEnNxr30yLy3UArwDURzZ%2FVFXWQ%2B5AC2pztt%2FkbELeqvJY6cFlEOn7UOvZHW86LfCum3QBlM6m6N0sQ5hZ0Stf5xMt0%2Bu2pO2%2Fd4NX%2BQo2XbyWV3vKr%2FdqXsU%2BkiWn3tNAxIM9KaurkmW539&X-Amz-Signature=565bba60093c4dd17775477e194b8ff4737ecdfd308e29673b4b03f34d4b99d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665AKMHYUQ%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T213911Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCk0J%2BN6VxaOzvmYubx519rLu7AftZnip6P7Uj644lYGgIgTfxeBNbpaAWnZugVbgz7ZEu2bOm1E8emamnt1aJHfvAq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDHhJy%2FYzHtnR6J11%2FCrcA80tpfhmam%2FKiCyqfGl%2BEWSjBhbUCICaTnKSjeenYGcKFVFuiOxAdBViTAO5nfzmPnxJ9Vya34XYt%2Fp1Let8iOxeehnK%2BZzF0SkezlWvGkzXfhapC4tbVT8z4FYQf5NsLLe%2BP8qL%2B%2FYdUgJaVcu4U8NbUn%2FsP4GhbM5xy9EiwkDCQaGPfNXqWbXSK5otmL%2ByfYiw02cy8fuRYlBkcn0D%2B4nyqq77mlRQdTgT%2FPExKkgBW7njzRgqk78ZNT7xCWJ5WKG7uk3SCvSC9N%2FK%2F6Dwv2Afp9P5bY%2F3ccsOTI04rDEihar86%2B5hlGrjyxORQg8LMKYSR%2B5NBJdI6zf1DTcfgscaYT8NWzUW5xHRb5diCcQWfj2xQIiTvV6Uo4RpJni1mQycmHGJneKQuPr4mBcU%2Feu9rTDzirQsLMNYxDq2lyQr0cfrLz9R%2FT7UN2YYT6pnsqeGVHJohQWlmZTz78rZbCZgf1Mbnef9WXMrvdf0oGJIbEQNXI39Rtp79hToeqZ0ygkXUuIL8x5XVDNUP6bjFlfx4ZLHG7E9WDvMJpE0NjRj3%2BB5KIDnXW6I1U1jqhIw2Z%2BHEOslbc%2FXcwn6C5Nj46SAGdl45g75Lxkl21qji0sSvudpMUfMEysaStYSMK3jpM8GOqUBQKaR5NYygDxlA7ALa7TcTFZN%2FXYbaGvOiacKRh3y6Cfk4lifaLK8kVy7ojyFbV96VOXNwjmHI%2FvWXcIDVXFSmuYgz%2F2KsPUPiK7xkr0jra%2FA3yn8kcbxRZn4OeQgz8SQ1XK1ckYMIg6fcjMTCfsSPLG8bLFLqWl5y%2F0e4qgcpT1fask14OK82MdGWuIxjAD%2FZzkMGO1LMF8OAxDYcMJJMsP3%2Bbh0&X-Amz-Signature=039213355c74f284b5f42df79e274d1015ae67eb4daf7f9ff37d99d454a355ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDC3I572%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T213912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD0K1Sk4UsQVQiisOp%2BCrMlzxRPGC5uTYbr%2B94K6GlSAwIhAI7wrPq87u5Cli9pEyzgTBf92GWbaP6AdFO7lDF%2FlUfmKv8DCFYQABoMNjM3NDIzMTgzODA1IgzbRq8DBRzVLcENljsq3AP50paKvZIeWgLrbtQv8OvFyw6A5XIVYxaXkswvfoqLiDlTBvzf9IIpvG1BxgYDmgkh6dN7eFwXwwFvsXJB7JdY8%2BHpT2rbMzs468J2G2i2SSeIGsPzI4kSUanDmFxnPFT6hYOMFR77eF9LyeedzaJdCVpAfNVqSstVGnfQUBxl1K0Y%2FB5b3GS%2BTI1bcfTAEwBkdjbxbFN7kd5JMcX7m6LEwULUwvZKizhH0Kz3R1gNE1tPBfg1y4LtwT5YX2XuziVXJQ4SIsnkQY5TPurKF1NWqpRL546L13Z9pAJa%2BlOwrcHF7v2VR2H0YC9MlHWc%2FX77d28DaKpu5muyQpDoelKq35mjUWcywaLXUU6rj0jJrDNVlJG7EJiwlHvU3ixTkJ1f%2FosMGUO2CCYpB8IrJdCM4%2FaOre8jh9xU%2FLaNqki%2FY0GfNBXFc1f3lc4qV0MvWu3T6Q6U4nuiJDLpMDMjg6%2FdT6YMGmQwam2g8ZIIhnkOYFyTN9G59eHYthpw5ny1mXNk2ICazNkiuA5kHDAhe1%2BqOhx7%2BKi%2BT3F8opWHg6z8%2FXvJtxO9SYiXDMnjpE0Unyjpmsw0N46YjMXifgNgUPND0lBXoM8cACV5%2FD5wLGh7pI1tRssXY1fmAfITGTDY5aTPBjqkAa8gZp%2FDyGJGwliAFw8ptgDBWELGJMiXvGSYf60KNaBJKMB8W92jtRte2QAiHDHT8GksFlSFHoDDxJGo64dK%2FdJJIWFW24vMNxIyUZKGoat%2FG6FMhI8M443O0D9E8KA8xosKPPKhoEFTYmDNNtgf9hV0H2sCnJCR0OWKvOwvSlJesQqtsOPPSOduPiqutsflVBNI3k5bA0jcJxwolAodzU78NtNW&X-Amz-Signature=c3547db94d8b6807ae67b693a4750ea421ece87a00dca73c04c6d53b8cadf21c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RDC3I572%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T213912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD0K1Sk4UsQVQiisOp%2BCrMlzxRPGC5uTYbr%2B94K6GlSAwIhAI7wrPq87u5Cli9pEyzgTBf92GWbaP6AdFO7lDF%2FlUfmKv8DCFYQABoMNjM3NDIzMTgzODA1IgzbRq8DBRzVLcENljsq3AP50paKvZIeWgLrbtQv8OvFyw6A5XIVYxaXkswvfoqLiDlTBvzf9IIpvG1BxgYDmgkh6dN7eFwXwwFvsXJB7JdY8%2BHpT2rbMzs468J2G2i2SSeIGsPzI4kSUanDmFxnPFT6hYOMFR77eF9LyeedzaJdCVpAfNVqSstVGnfQUBxl1K0Y%2FB5b3GS%2BTI1bcfTAEwBkdjbxbFN7kd5JMcX7m6LEwULUwvZKizhH0Kz3R1gNE1tPBfg1y4LtwT5YX2XuziVXJQ4SIsnkQY5TPurKF1NWqpRL546L13Z9pAJa%2BlOwrcHF7v2VR2H0YC9MlHWc%2FX77d28DaKpu5muyQpDoelKq35mjUWcywaLXUU6rj0jJrDNVlJG7EJiwlHvU3ixTkJ1f%2FosMGUO2CCYpB8IrJdCM4%2FaOre8jh9xU%2FLaNqki%2FY0GfNBXFc1f3lc4qV0MvWu3T6Q6U4nuiJDLpMDMjg6%2FdT6YMGmQwam2g8ZIIhnkOYFyTN9G59eHYthpw5ny1mXNk2ICazNkiuA5kHDAhe1%2BqOhx7%2BKi%2BT3F8opWHg6z8%2FXvJtxO9SYiXDMnjpE0Unyjpmsw0N46YjMXifgNgUPND0lBXoM8cACV5%2FD5wLGh7pI1tRssXY1fmAfITGTDY5aTPBjqkAa8gZp%2FDyGJGwliAFw8ptgDBWELGJMiXvGSYf60KNaBJKMB8W92jtRte2QAiHDHT8GksFlSFHoDDxJGo64dK%2FdJJIWFW24vMNxIyUZKGoat%2FG6FMhI8M443O0D9E8KA8xosKPPKhoEFTYmDNNtgf9hV0H2sCnJCR0OWKvOwvSlJesQqtsOPPSOduPiqutsflVBNI3k5bA0jcJxwolAodzU78NtNW&X-Amz-Signature=d0ab3bc675120f56c05d7635edcae8e7ceca091da2de7272c989051a61f1543a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QB6HQG4Z%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T213912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC58vREljjPNtyq%2FDCddifXTEat2oHkxR14hhyaDi77gAIgdXHj4Mbkhci%2FEMk8v57Us5PO7XhY5ye8mY9wFRoFyxkq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDMBEnk6Jwm48YQLe3CrcA8bq4zXmblzlzc4YPLvKIGaSZlBKZ0OB7o4WPe8DPynXbr88ic3tnYf341xFJgxW6IBCuX5NzvjDS94zlNiIi40%2FjsAI1DQfWQAYA28cTmk4MUMkPllo%2F4MkDW0EPlOXhmW3WYE4RLVzszOSGm9%2B5%2FxbhthLDF%2FUNRAFF4Y%2Bus7iW3pHoOOAlXFPKg1Qpv%2FyFfW6VfvBmT3iyVJNIcGlTcxcNShmqUCJC3EFWMeXRjsWenL4LQu%2FnTPla5JO%2BbcOanQvoiICICU11ZJkpz9kUvkSWchVgpUMPIuDAZCxYgkgUtijNteOnkoV8FZa9L%2FPCCQgT8LfSIk1R57zVsH%2B1%2FGSnjTDD3IkmTcbKSmyHFayWDLttLsHLsC6nmfEc68hxg78qRZg4zoBEozmMiRFjT2TTsWMKUbpHdktL84w%2FfXdFv4FUDocrWkqa%2B6oZyHIes7VEXRWPlElNFpM2duaHpqV%2BLarqPomb17NPTSG9AGRvrELGQTIIDNc6aPKZEN28BtOuW%2Fjapmgtj9hhVbniwmnoeHcMRS2h3mqp29XongUaoKYqNuv3U12M2v2S41yPK73yipBVS%2BpQx8wFFD37q5jun7TNavatPK4JQMKPt87IM1AoQStRs55EzXlMIzjpM8GOqUBcZAui0P7MBvstW1PNXac0knR3SURiFw1KvXFTTUjWwPGXKuWAKNJp%2FcPj3eGeb15o2YNojbOp%2F6re4gzK823%2BO%2Blhs0zhtuYZ6IBBORFHe0WSVUrhN0rcwsneI8f0ZeTSD%2BwYVbmoI4fTxDeeLzfTmlfjJO8cFChbKNgD3UcTHaXv%2BzeL%2BwZLHFs%2BadjeueNatbYHMe2WG77i6tsYbQ41kHKvyky&X-Amz-Signature=d2c46722b465676637d8207fe3b031865360605b00c38d84676225bfa0b51574&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLASJREA%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T213913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIALybpONINb3U%2F3ySmaLrh%2B0b3KK4DA6AIAwhUUtJnJNAiBThOxMJU5hvHY0CAijrXbadEMjcq1oijbEaOGmuYEfDir%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIMJhISFdDhgBN2VwwJKtwDjD5XLmwM9FU75kIHRvpAJ2IKjB8IGpdn2z2%2BWH%2BggBmsZ00STX9uTTqjjlxw%2Fuzb9FukOi%2FqLPkbTEjzIgkKmAdgF8a%2BdRCYFRN%2Fx8VLg8tduMBB2rHojSoX%2BC%2FENH84VxRX%2FKBEgP40VA%2FKTkK13Ig7oBoWX5R4hn0ewULvJBIL0W3GJ8bxaI%2BKMJo9NAZm4m0unhDXOeu%2FI3oF6VuPFrG3ewJGWubHYTeC4AgjuniXWzGdL7pbW6v%2FnHYzeDGWtKZ21T9dtQqNsNb%2FjDjEqxFkxOtJTVbyVMy7m2q8FeQhjwNUwBgQhjVb%2BGz6iDU15D2ACzS8Dod40rXivpz197JxUe3MBgUT37pawLdX3Njgw4fqwIeML4TSkUYQspP0JLmkoQGk8Kc9ZJJgwjTGFW%2B1rtnPIZPmbGr%2FWhi9R9rHfw7gY4NS2Ib5ra9iUhtW%2F47qjIzKlwWoqLssLDICDewIkQy1ZMWbf3ndfjy5hBWhneex14O5q5b3h0i2tcX8k4PwG%2FuR8ZdiK2UVW3ti1QasViSfPkJrxGXlzfpk%2Bc044%2Ffq96vGkpC2SunUF9ZhYBU6AN1%2FJpzv%2BkXFVGImAWv0Y9SDTf5zBrEvYc%2B%2BrgkUA0hfOcSdz6hgntwwtuWkzwY6pgHlC%2F%2FM2pOgnskNBeOA4Ix%2B76xnCF8iuZQ3hAAmX%2BFGADZZIl0mf%2F5iScWRQ%2FAhiZQGMs9xFCOaOlxWHGffgHrZTGfWQYVpUnnXogFEksBPHBFD55cg9WtXxhaMOsXyPgCJtkUnWrzOkRpC0hdJwoPdaVBVwRq9VU4RP5t1bFCbs%2FbW8CqzKQft8FqfipFnIu7giI9QgyXCpaEmMGDneSM92lrvyWZq&X-Amz-Signature=40c441a38814028a535c4e0658f8874e470f38d52914fb2eb25407465eb73d08&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YOFNYHEH%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T213915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE51OM4DmqtADLI%2ByN2I1lHh9MkbTeAK%2Bw31PFbAa3PQAiBApix5FdqbNY%2Bqiz%2Fo0fi8xV7b1nQ1XZlTjAWxMcODmyr%2FAwhWEAAaDDYzNzQyMzE4MzgwNSIMad5dzYfhlN2VkRhAKtwDBRmRUcYzniCWXrecPU%2Fd0hpOtShaz%2B0PwPWp6exvbTDPOsQ4nUTrWYV3AzuRXT3D8reuJ5REDxh1SJ%2BB7H4bRhu3ioKUxKF9MGs3fDEsGR0QNBNWqjbAQ%2FTvRv8Wu8TA9JxHfxC%2FZZGKUtd9xUN1G6EqI1egJgn40xqkA%2BB7sqy2xsSrWJfaXoY60gAjbndtuPDMvEr2cmuqOXcaqJ%2BLt0%2Fu2egJF6KpBEG5uSOhX%2BGQT5gsOQswNLFj%2FZC9pbp2x3naitT%2F8qPDIIlGHUa%2FvgnVQJkk%2FnhFbrZhPrQAVip6W6Vc9tQ1k6%2BXdTHVHJLUvw0R%2Bjd0QC17ZxpDfsYlUb0xcYO8s9xODQ6RKR%2B9t5h3TaZ9tOPRWGkJm3E37zsYMli%2FJITbs2HhX%2BDR149Jk0jYHtHM7%2B2suMynpldOys%2F%2BaRtQdkizdFT3KB3pWsidn7g5PnNEDyCbnkQB5H%2F3i01k%2FE4bcTaX2LIPrpeZrQDZbLIYzCCZkAamf78pv8DOjInuFwvIW4tXN2FGednVA1Cnug7NzGEF4WYn0xPXRatrIzHxUanRhmEKp5A%2BGJJMGJcw7msrFW9qTg%2BQtEExzVWjqwAVKafxR40xRdYsV6%2F4nvteqf9Zn%2BHxtKgwuuikzwY6pgHP2H6sUo8E7moxr2KqypzeOdVoQBhAlSIYfUl6ygDQagHStybDaRdYIwKcWjZP5phthi4nIEwObzjh6wfCxlaHHqCN%2FI1pdwZMmvX2drJSfcqIkpnFZrQ1n1G8prQthjk2suqCoSSeabWrfFWNNLErWs04zkLwwE0usTWGSqH6Lgit4gXb%2BcaA%2F5Ij4KJIG%2FY%2B03tX7ypGnBskWwHkjz2I1qOkwyPL&X-Amz-Signature=2d43efa7a9cab6ace9d48d1397390e7a2be692d8cd994525026ff5e86521b6d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662X7EN77B%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T213919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCl3r64xn2i1HpEGDKfeNTF6h%2BA24oZchAv8qTiZRYZgAIgR7gwWeSKKRjHrzMOyMz5jVveZlFo3g0pS%2B9zodteHTYq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDKU8qZgRjWHe5WM8DircA318vc%2BX%2Ba1qmFS43qZ5l3i1ZlBchOoDJUvRV1XP04%2FqZFjzmGk606N0Ov8TckyaidS%2FVecaUuVsA3l67eIW4CBod2AX%2Fv915K3NK5mHKp2YyCMXjx2cg%2BlzQ1aKGxXVsB151Sq88WinkVKry2WeJ7WI0TNw5fzhOCzymFdeIheSeBAx8TUv5pv76uLAYwWNhT3jlJMydRNyxB84NSngpzBXCLYqJHneV0y6Fg%2FC2UsesOVDee8LG1Zfcfn9ws9x8cptzr1iqpuNsCeQMFjUut8mj2Oz2hud24TknKgoMwLRwkogWik6tfFZt8pZ3enhOHIV1QjkV%2BhJLbQNcw72fX0QvAsx1%2BfEmqz8FG0%2FL5TzIdA0HR58G%2BCru%2B9Py6Gq0qQcTsTVVrMwAhauiJCr4nVa5da4B5sEU%2F0ox12B4qvkBn9EHFcfeJclnFyJ6MChBuY%2B66k5jPBH41frrNgSy8YRJfAbmF3ap%2FvwSTFdPQ5iUkxI28ZeHIhmBTB7jePoIVFUdw%2FuambRe88oMg7r%2BOBvV9HPG5r694u%2FPyXs9uLW%2Fnd5IOiHScS6FzXrGOpCtys%2B2wEMneGUqQGgDYF8O8%2FUNGjfEbrp%2BM0mN0sd7H6HpHSi88NSNFvEC%2FS%2BMOXjpM8GOqUBPbAeFNRp1Hl2qar4BektOiY6eq1B5DwI4orPR%2FCPEaxeEDG8iEqH4A7C7X9ErLDUtxoZM1bIKCw%2F6OWVHjHxNAIHQSf790oEs%2B9LTu6i6v4ypeIU2s4PW9g8T71aPZPfR1O2uVYbHG0RZ%2FNWkiU%2Ba6%2BaruSNeeggAqZ3Y%2F2cNcICQvWiA%2FFae48BLNTkSS2gN2tZlGBFNxML4L2yrESIl3qqcFfd&X-Amz-Signature=4ac35d263749f101cf0c017ab0bd405b8b9057d9e4c13fa2b14c4bb01268f66b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662X7EN77B%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T213919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCl3r64xn2i1HpEGDKfeNTF6h%2BA24oZchAv8qTiZRYZgAIgR7gwWeSKKRjHrzMOyMz5jVveZlFo3g0pS%2B9zodteHTYq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDKU8qZgRjWHe5WM8DircA318vc%2BX%2Ba1qmFS43qZ5l3i1ZlBchOoDJUvRV1XP04%2FqZFjzmGk606N0Ov8TckyaidS%2FVecaUuVsA3l67eIW4CBod2AX%2Fv915K3NK5mHKp2YyCMXjx2cg%2BlzQ1aKGxXVsB151Sq88WinkVKry2WeJ7WI0TNw5fzhOCzymFdeIheSeBAx8TUv5pv76uLAYwWNhT3jlJMydRNyxB84NSngpzBXCLYqJHneV0y6Fg%2FC2UsesOVDee8LG1Zfcfn9ws9x8cptzr1iqpuNsCeQMFjUut8mj2Oz2hud24TknKgoMwLRwkogWik6tfFZt8pZ3enhOHIV1QjkV%2BhJLbQNcw72fX0QvAsx1%2BfEmqz8FG0%2FL5TzIdA0HR58G%2BCru%2B9Py6Gq0qQcTsTVVrMwAhauiJCr4nVa5da4B5sEU%2F0ox12B4qvkBn9EHFcfeJclnFyJ6MChBuY%2B66k5jPBH41frrNgSy8YRJfAbmF3ap%2FvwSTFdPQ5iUkxI28ZeHIhmBTB7jePoIVFUdw%2FuambRe88oMg7r%2BOBvV9HPG5r694u%2FPyXs9uLW%2Fnd5IOiHScS6FzXrGOpCtys%2B2wEMneGUqQGgDYF8O8%2FUNGjfEbrp%2BM0mN0sd7H6HpHSi88NSNFvEC%2FS%2BMOXjpM8GOqUBPbAeFNRp1Hl2qar4BektOiY6eq1B5DwI4orPR%2FCPEaxeEDG8iEqH4A7C7X9ErLDUtxoZM1bIKCw%2F6OWVHjHxNAIHQSf790oEs%2B9LTu6i6v4ypeIU2s4PW9g8T71aPZPfR1O2uVYbHG0RZ%2FNWkiU%2Ba6%2BaruSNeeggAqZ3Y%2F2cNcICQvWiA%2FFae48BLNTkSS2gN2tZlGBFNxML4L2yrESIl3qqcFfd&X-Amz-Signature=3ec85e6fb1c97dc0b0a0be6fb8ee0a38deec2fd0ed960f075ea790b0fca803e9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YJLW5YH%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T213908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDfpedF%2BaDj0WEGkDv0FGF%2BJXtEWOvc0or1SgYVsYgbdAiEAnROq8raUaEhA23unRrBji0KqUJNZPr%2F5LP0ooVs9fBsq%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDOriysAGqOa%2BH1wXPCrcA1niB3Nyq0dhRLrZoesayh5JGboAtqOqKdoHTGs8ioxCgTiOFYRW%2FDJCLrHKOpMpan3ETBxXZOI8QQ6l1ALxMdAuJqAn2zdNR6cwGwM3cWGqqylf%2BTtV%2BzlT%2Bl5jn0QHIh%2FL5DcPNHoB8PVQWXtV7eKswOXyNx7kx9YYzf9jRwPsIaNjFgUK1%2FOR2h2GtJhvF5j4wKsN%2BUHekGqThXVrbipqD%2B7uhwuTv1rMWxdO%2F1A8BAZViGz76HxlFEFv%2B7ZnpoSzGQnlJFiuolv9UNQD5ZcDGbu5y2us5hnjL8GSRq47ZnPvtQq%2FdbyYyb%2Bkwd%2B4CNNrWn7V5gwsFZUR6%2B6pB3OvJ8QpsI4Ik7HgPEth5gKl9Yiy8f6%2FdUp1eTA94tFceonXhgDPGKEQnQBFqc8u7YQzZOwxoG%2BDtO635hGqtc2CzTAbuJRjx%2BULq0WlGymrgeKXhKi79f9UfMwhuiE8JJAvypkrsP7zdO7fim8PKcYnutW6LzCvFz7Xb3nGJ2k7Ekb0bb7Xw6YFhj%2BMbSPjYDYifZzb93rrTwEuCQRVmlAYkuAT2z1L6iylIJrA1bJKq3n0fk6yO6rNiZbQkBAB%2FQg%2BsrSpIwsM9GNrsPx8AjqGNeqdy4KE8lBjtlZEMMLkpM8GOqUBquJQHiVUbjBW01ssKTk760RbiUMIWO%2BBLmcfy3mQRMQEMrzawpjJuBtndCzLS9xWDJGnTDudyH9uUzjP17tqH4UTaASa%2FdO2oqX8IK6ohG9uHM3uZdgjMNm7qMCbczVBX0RLiRx8ggqlxjiZkNsxKwEVzWPTlPmCcDPOdlgNIQKlTv94AJdmFifbtesqVtPLTPPLuD%2FybwBYGJJx%2B3%2B0UtCmwKED&X-Amz-Signature=4f9e4e82d20ac340138e44b1fb1c279cb18622e066e126b7d3daf3eb81401415&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PHHVWXI%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T213920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNQKAwt9%2FZEokdeJ4S%2F6QMWZ4AKMA0oBeU%2BfKf0G3LlQIhAL1zvuFDmWaAhC1bFr41qh%2BOmKiNrrFjioVeGL1xwGrYKv8DCFYQABoMNjM3NDIzMTgzODA1IgxlwFsRqvGGvUB7KxQq3ANoKje3QXxgxV5LvFZeY7%2Bi9aNumJHPwPguCfyjgrg6RuWeOvxfc3D489kBhKradIoUQOOzij9yKFNlilC%2BIZL86NcRSdSuYXwT6VBYIsBqikqW17LUEcGvXMb43cyoTczWHdEhBlFG%2Fd86Q5H3JR%2BHIag%2Flfgx2XXrtHSZ6RNrtCx0zwQENrfG5ed4MLivaRloMsXkh2yoXvifeMd7btx8OpiExNrq0jwU7cO9NpxqG5A2WIyQF44yZThc72BjF9PJj4joVygIVIvwQ8cWXjxgeXPzzEP1WJhGwiS5udn6baIvFMIlBUftVuVYZB928pSmpTf2O96MjKRrKS1uDX%2B3h1Zeuu29ldcmN7FEgN0hTCSXJaCirGSGsXN5FYb40SBUCVI0cY5gmcgiq04fL6jymdM3r44FubrnyF58THAAAH%2BnmS9FwX3xd7TuVlkmFnFS%2FK80%2F%2Fk7ecY5c1K8tLxliq63jXxvWALNeWeglL7S%2BXeg7nSFzjmq7FfRFzp2ITaYb5whdJBzqg5ozvNZT7f9LeNhxB27d%2BJluo%2FJok31UM4IxNkbBNp5ti9idfBkWWrkMKdAl6iMhdkugCqisoh8ym2OHDPc%2FuU2kjIW4Y3SkhRE%2BBq5WF8e0xbk%2BzCQ5aTPBjqkARmKbmKkMeYhzhQs%2BnCe7d%2BeZEPw8zGCx%2FlEdy7etemOGSXM0r%2Ble78TqWeGEAaIXKXk8udsW%2FQOtGtKp6kAre9b9K7Y%2FvlYARaPVbdaJiAfjGK7mCXY7pNb%2FldzBiycxZ%2FyGK%2FxSkMAc6RUJqnoAHYXXCjJWMcQEMEL%2B%2Fnt2P62cnUD%2Bmxa8%2BfuRd%2FGsCuAZ6JRrylszaOCi5m19pJx6N25AFNW&X-Amz-Signature=780e45eb4eec27642aed4c7f7b291a860dcb5446fe071335c7865d5207bcbcd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PHHVWXI%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T213920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNQKAwt9%2FZEokdeJ4S%2F6QMWZ4AKMA0oBeU%2BfKf0G3LlQIhAL1zvuFDmWaAhC1bFr41qh%2BOmKiNrrFjioVeGL1xwGrYKv8DCFYQABoMNjM3NDIzMTgzODA1IgxlwFsRqvGGvUB7KxQq3ANoKje3QXxgxV5LvFZeY7%2Bi9aNumJHPwPguCfyjgrg6RuWeOvxfc3D489kBhKradIoUQOOzij9yKFNlilC%2BIZL86NcRSdSuYXwT6VBYIsBqikqW17LUEcGvXMb43cyoTczWHdEhBlFG%2Fd86Q5H3JR%2BHIag%2Flfgx2XXrtHSZ6RNrtCx0zwQENrfG5ed4MLivaRloMsXkh2yoXvifeMd7btx8OpiExNrq0jwU7cO9NpxqG5A2WIyQF44yZThc72BjF9PJj4joVygIVIvwQ8cWXjxgeXPzzEP1WJhGwiS5udn6baIvFMIlBUftVuVYZB928pSmpTf2O96MjKRrKS1uDX%2B3h1Zeuu29ldcmN7FEgN0hTCSXJaCirGSGsXN5FYb40SBUCVI0cY5gmcgiq04fL6jymdM3r44FubrnyF58THAAAH%2BnmS9FwX3xd7TuVlkmFnFS%2FK80%2F%2Fk7ecY5c1K8tLxliq63jXxvWALNeWeglL7S%2BXeg7nSFzjmq7FfRFzp2ITaYb5whdJBzqg5ozvNZT7f9LeNhxB27d%2BJluo%2FJok31UM4IxNkbBNp5ti9idfBkWWrkMKdAl6iMhdkugCqisoh8ym2OHDPc%2FuU2kjIW4Y3SkhRE%2BBq5WF8e0xbk%2BzCQ5aTPBjqkARmKbmKkMeYhzhQs%2BnCe7d%2BeZEPw8zGCx%2FlEdy7etemOGSXM0r%2Ble78TqWeGEAaIXKXk8udsW%2FQOtGtKp6kAre9b9K7Y%2FvlYARaPVbdaJiAfjGK7mCXY7pNb%2FldzBiycxZ%2FyGK%2FxSkMAc6RUJqnoAHYXXCjJWMcQEMEL%2B%2Fnt2P62cnUD%2Bmxa8%2BfuRd%2FGsCuAZ6JRrylszaOCi5m19pJx6N25AFNW&X-Amz-Signature=780e45eb4eec27642aed4c7f7b291a860dcb5446fe071335c7865d5207bcbcd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SE4S2FHC%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T213920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBVPCqvWeLMaBT7sEZzSrlxlknJ93J3LKVMm2TpQodwgAiEA3%2BhIYXMJ3c842GHK1MEQz9%2BwWsrHyL2pty0YNLw5sC0q%2FwMIVhAAGgw2Mzc0MjMxODM4MDUiDN7kpUCOZFyY%2FiiVkSrcA7IBgTyJUmMJKrsO%2By7ZtiKW%2BPFkMtKmdi6ktoz%2BGDqYVaQxCMiBGGCTZIuX6oq7n%2F7XTuf41qlNcNMLR4wcefERYJd%2FifadG3Afu83CLkaVoQtj88N3MAo73AlIIQvdjQI9O83Ki9fpM35cHno1WCa2ZzCwlu%2FqESWh1737PUHGpjpTWora8WGLOIjv63EUvM17wFh3B8kBmAolc8dAwagSgftaSvE%2F8x9btwRzhM%2FBBMlNJju7GrDVszP2ruSqhjIYm%2FHOCkSR1dyyiYvsC1zZpTLngVxrjPejrISSvPuiIk8%2Ft0AgCVAz5ri6WV6eTDHP0h58Uh%2B7ucOkxpaqg49s6EDrzs0F4YL8sEfaGiqiZgf63anHDO0dPJXqoQx3YJFCvR6%2BtwVT4HIlT4oVCCfSxGE04JcboqbeHgj%2BF7oF3OcFMPCZLXPgDHzB9iBqX%2FopXb8%2F4i51Dbpkyae43jYCe2PC7o5GQAf77AWv1kCAWjpWY7LUdDHtQD%2B%2F09jb8ohPBLJmHz9sWwU%2FWIprNN0vRaPcAJ9LNppdw1Wu1AUTvQE1uunpVWFl7z7aovlf59PLt8mDlg1TKXMR8DHU8bGqGaio4Ty6ZkAN7PlpDm%2Ftl%2F5Kj9P1pWGxIE4OMLvjpM8GOqUBhUBR1fRvl7Zx%2BJR33yPwuXj9VMDCJaS2E7yXRhR1CBhMqoywnzIHePI4LN9JKODZHubh1CwNq99t7ezYjqyLKksy4ifTwzsAu0%2BWsj0ea9J6aei6lxI5xq6RukouroH3bij%2F%2Fkb2Hpwe1n2DGQXFCt3Hmc36f01DS404DeKO8hTVkW8EDDpQZj21VN47IepsjH790bTZaCmOknJG3R%2BUNtsYB8LT&X-Amz-Signature=8a18606b75c0a34ac4a6f4c0beb99c2df2209d92507c0563c8dd750ce023e682&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

