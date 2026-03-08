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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZBVVQ4B%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T062628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIF2bs1VMeoiZ7BKPhmHwmIeBaoVRR40EvIlRU3oi%2BQo2AiA%2F1shOCZg6m50QX8zAVby0YOVrgbzQHE9%2FOx6XRUhjqir%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMtu8R6lMXDFp6ie1TKtwD%2F90nycn1ho9iaEfkSPpa%2FdKyjawRvEVo1Wh4Wc8sn%2Fy3g0Zr73fFuky5I4yhL%2FdGy%2Bz1d2NURrTtDgE3WZNd8CHsYtsJLUqQpUrOrTe9hYxBk9vsfupsMrYoUVqBXz3ZsF0L7bz5RcHYq6i6bhROkCw7DEcwzJYcd9KSLLWPTfSjfePJHa5oxb4jqQfPdm6cqUhhjeugJk%2F8nN8fh7UzPNdRKqQmYz01En3h1QxMPQso1%2BWgU%2BeKYRMvdxMLSwi31FXrlJ2z3JHWIcKyIzZqop7KKg7xDM0H2D%2FhxYm3%2B8lqeFYY4Er2lWF3lh%2FDCuo1V8APcsjBCzV5AsT4rPLLWnCYstQAWFEI0WLazsS9CVeQFvdneMbLR%2BEmUa13nYTOQSMg7QsPpCNiIab2VpYxjIBi%2B5%2BUtCUn8QTMqxnDZYUST85xHjwjaDtUNa4O5JUISh5yvbFkwNcHNTiC7StwPZ%2FCD%2BewO8Wd0Qx5hjTIqvyypvF7RwqdfuIXtQGwPg9w64Ix1%2Fj0H5247zNeMhtihQ1zFQ0%2FHPcSLLHFZ77%2FEYxgY%2BnAtYJtcg7a5rsBdH%2FPq6ky%2FKo%2B4SsaUq666wFlzmE31oUDNDkeStaU0oSyIosO8xM0qZ1x4r%2BjXWkwx%2FWzzQY6pgGiYHPu%2FFWqylxdaIb7XX0Wl4%2BkyJ5tEAAVYRPYuPJAtt7a0GoA7GnaQYCvYvduShWpn9eU9bnYhIbEMtzNn1ixBx%2BLMhtVwpW5y%2FdjhhWJET7zj9wYAaC1IBIJy9jlDFOpUc88QCSCDXEvFJdN9cCIcdnZOy2H%2BMpJA9BeO1aVh5tgsDRHaLevkbqQrrZHifxEe0X%2FPOdMCYeo836ejQ0OhSTAWW%2Fy&X-Amz-Signature=287a969259a9dc2e635d86bcc808e58fb100b3bcc8c0430507b74b7c64a1f29a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZBVVQ4B%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T062628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIF2bs1VMeoiZ7BKPhmHwmIeBaoVRR40EvIlRU3oi%2BQo2AiA%2F1shOCZg6m50QX8zAVby0YOVrgbzQHE9%2FOx6XRUhjqir%2FAwgNEAAaDDYzNzQyMzE4MzgwNSIMtu8R6lMXDFp6ie1TKtwD%2F90nycn1ho9iaEfkSPpa%2FdKyjawRvEVo1Wh4Wc8sn%2Fy3g0Zr73fFuky5I4yhL%2FdGy%2Bz1d2NURrTtDgE3WZNd8CHsYtsJLUqQpUrOrTe9hYxBk9vsfupsMrYoUVqBXz3ZsF0L7bz5RcHYq6i6bhROkCw7DEcwzJYcd9KSLLWPTfSjfePJHa5oxb4jqQfPdm6cqUhhjeugJk%2F8nN8fh7UzPNdRKqQmYz01En3h1QxMPQso1%2BWgU%2BeKYRMvdxMLSwi31FXrlJ2z3JHWIcKyIzZqop7KKg7xDM0H2D%2FhxYm3%2B8lqeFYY4Er2lWF3lh%2FDCuo1V8APcsjBCzV5AsT4rPLLWnCYstQAWFEI0WLazsS9CVeQFvdneMbLR%2BEmUa13nYTOQSMg7QsPpCNiIab2VpYxjIBi%2B5%2BUtCUn8QTMqxnDZYUST85xHjwjaDtUNa4O5JUISh5yvbFkwNcHNTiC7StwPZ%2FCD%2BewO8Wd0Qx5hjTIqvyypvF7RwqdfuIXtQGwPg9w64Ix1%2Fj0H5247zNeMhtihQ1zFQ0%2FHPcSLLHFZ77%2FEYxgY%2BnAtYJtcg7a5rsBdH%2FPq6ky%2FKo%2B4SsaUq666wFlzmE31oUDNDkeStaU0oSyIosO8xM0qZ1x4r%2BjXWkwx%2FWzzQY6pgGiYHPu%2FFWqylxdaIb7XX0Wl4%2BkyJ5tEAAVYRPYuPJAtt7a0GoA7GnaQYCvYvduShWpn9eU9bnYhIbEMtzNn1ixBx%2BLMhtVwpW5y%2FdjhhWJET7zj9wYAaC1IBIJy9jlDFOpUc88QCSCDXEvFJdN9cCIcdnZOy2H%2BMpJA9BeO1aVh5tgsDRHaLevkbqQrrZHifxEe0X%2FPOdMCYeo836ejQ0OhSTAWW%2Fy&X-Amz-Signature=287a969259a9dc2e635d86bcc808e58fb100b3bcc8c0430507b74b7c64a1f29a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJVA4I3Q%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T062630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIGgYqey31ZTc0QI%2FLnchCu25eKDjORvEPstXaJYuZzQrAiEAyTYQ7PCEw0Rqa5VX0Im8ljp7xCg04RILE2NQG%2BMXfosq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDOZu2dEGNqkfLdv7IircA5QkRtvlCJ3u1wb94Q5YaM87%2FcnMs4K49ncLoWvKtAePXhDjvPmJ33Q1yGjs%2BVws8Wwdw5Z4FEVBOvg1vStYusXq%2FB2p8JQ0pZNHpEpp%2Bpsp2AGRVAIaL6RaIYE7dbJkrNP5rqTHJ3705hxXNCwfF%2FsnCMks6L%2F5CwHw1rITYzI4SaqieJarh%2BiYA%2B5uZs8uF%2B45DcRHKNq3QL86BNNi0vKvgt36%2FZDygOAKT5fq%2Fs6hSc9cFD9kf1XBvshXiJg%2F9k4%2BHZR4R2dBBslmse4CzZcle82RwGmD6tRdG5kyFlOEEhY0t5KnwocS4CtYH2gZU%2BereSOCX%2FDR%2F5Ze1IKLjfz8GGXaOYXLl0E5cdagaEzb464HGO%2BTAagvFO6WdpKpM4B9JyRH2ok1y84MPznW1FlK161%2BjNp2WmML6eghOlWERZr2tWmZeB9UjalQzUp7VortThEBS%2BzzOrvGnyr13uWwMM1caHAQYBmGD5myOuxDGLW18YMV2Xdd6TxeKZuYK82WNpCNzKZ%2FHWAcI9K3eSS6zgMuLdd8jfKgtDyD87XJgWpH7wp8EmBVnIORL0FXPk%2FSPWBEBw6D6Bg4s6oCjOmdT0NXfuj5g9Za8P2GVEYNwkez%2Faa1u1%2FQD4DfMJf1s80GOqUBIM5yHge4gYxUXUV%2Ba%2B2axcybgCpX%2F%2BWSfFJo9AYWECOeNYv8yUa6v0teYMcX1zKaiyl5r6wdMjniaGvz55IYupf7pYVvX7pEHP6b0%2BHDYZAvarHwxL8aRi2NPhVzUZEXpo86S3PV47g%2BAlM3r6tK6GF6QM2ov6vew2LosnPyaaZk0lnnFojhaUmOdPorH%2BSFqvf6IjoB2BIn%2FvAc2lgJhmhvYQIm&X-Amz-Signature=ebb2d445897bce5968deb80411f0cd5338184051278a6d9410add6ebb529b9e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTA5AIBG%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T062633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJIMEYCIQDrl5XnPsQLcxJq1ICRVnReSQB3QZYahFXgNsnIaPZ6hgIhAK7aYXTjpt8NaaMLBKfgjslM5EjrLTfG4brzM4zIUYP9Kv8DCA4QABoMNjM3NDIzMTgzODA1IgwMhV5PzsPr1AggbG0q3AN48T9lLHHvqa5HzqkNQGZ%2FtxobYgJWMDQGJET7WZJXZoOLQzubto3v2sm3ArnV9A9TPIzvjgUyTrHm7phWcnk30tC%2B%2F2uozwWTr%2FRvJyhCFQMKcrsIkJQ1EXbhwbv5WVWgwx2scnWFRuv5LXynLcMsebn31GaSfrKnckFHKeHWFzb1jQDAufSf92GjB28oDkHFbJUDO12LzpSvE6NvTwukdLHGPOD3WzJpxBVtoQUC%2BgcnCCuGXwwvQJCjLJI1nq2nLove3d7bQPOC3kmxai%2F%2F8dnnEoSBzLzUfPCXw805Z0mXAe3t0AF0mFDHiWrstGaZHtGYCJhkBoRDy9xJm%2FmmHUkDt0WEcisEmcrRioizYNeOVe%2FePUXjtsAG32yUJVGM5xgWCPfNPFOZUskjJG3Bth7vGRKGK%2FEL39n9uypR2ltPRHArcSl7wFSgJlnZpqWqQEWMOLQ7We2G86ifJn7n1aa40MpsbTXreGZjwk2qrU41cMYmNUQjWa4a1MMw%2BUzpp9gPHbClNInGLhAqLS5GQ%2FaJHz5C%2ByetTBA%2FF62%2Ftlv5%2BSMPBhSFoyrq5%2FK6wBau8Q07QscNw0PoYDh1Artoji7HxyAoodxMfDS%2BE1GpnUdXnUNhkaqDTtgYCzCl9bPNBjqkAX5Lqnra%2BbL7fuzlzlmE%2FOcRJhnwIyI1VQeqfED2PnT%2FHKSA7d34bnbSJzdnsMJe9DEiEZQcg%2Bf2K7JIpjnDekt3WvDE1R%2BS5HOtKVg3TbxGF2ttJqMzr0oQteK6RUAyn1ohWApj%2FwmQ0Xt5K9zbqjFC7iG3rH96Mvm0iMqhrn85vnqD094vTzFVDclhWUavm98XMfzRPK6hZGpAPBospSif17RJ&X-Amz-Signature=4f20c6e46ad4e228cc83ded2ba48192b6e221c1f4cd7cbb6914689bfad26ed10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTA5AIBG%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T062633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJIMEYCIQDrl5XnPsQLcxJq1ICRVnReSQB3QZYahFXgNsnIaPZ6hgIhAK7aYXTjpt8NaaMLBKfgjslM5EjrLTfG4brzM4zIUYP9Kv8DCA4QABoMNjM3NDIzMTgzODA1IgwMhV5PzsPr1AggbG0q3AN48T9lLHHvqa5HzqkNQGZ%2FtxobYgJWMDQGJET7WZJXZoOLQzubto3v2sm3ArnV9A9TPIzvjgUyTrHm7phWcnk30tC%2B%2F2uozwWTr%2FRvJyhCFQMKcrsIkJQ1EXbhwbv5WVWgwx2scnWFRuv5LXynLcMsebn31GaSfrKnckFHKeHWFzb1jQDAufSf92GjB28oDkHFbJUDO12LzpSvE6NvTwukdLHGPOD3WzJpxBVtoQUC%2BgcnCCuGXwwvQJCjLJI1nq2nLove3d7bQPOC3kmxai%2F%2F8dnnEoSBzLzUfPCXw805Z0mXAe3t0AF0mFDHiWrstGaZHtGYCJhkBoRDy9xJm%2FmmHUkDt0WEcisEmcrRioizYNeOVe%2FePUXjtsAG32yUJVGM5xgWCPfNPFOZUskjJG3Bth7vGRKGK%2FEL39n9uypR2ltPRHArcSl7wFSgJlnZpqWqQEWMOLQ7We2G86ifJn7n1aa40MpsbTXreGZjwk2qrU41cMYmNUQjWa4a1MMw%2BUzpp9gPHbClNInGLhAqLS5GQ%2FaJHz5C%2ByetTBA%2FF62%2Ftlv5%2BSMPBhSFoyrq5%2FK6wBau8Q07QscNw0PoYDh1Artoji7HxyAoodxMfDS%2BE1GpnUdXnUNhkaqDTtgYCzCl9bPNBjqkAX5Lqnra%2BbL7fuzlzlmE%2FOcRJhnwIyI1VQeqfED2PnT%2FHKSA7d34bnbSJzdnsMJe9DEiEZQcg%2Bf2K7JIpjnDekt3WvDE1R%2BS5HOtKVg3TbxGF2ttJqMzr0oQteK6RUAyn1ohWApj%2FwmQ0Xt5K9zbqjFC7iG3rH96Mvm0iMqhrn85vnqD094vTzFVDclhWUavm98XMfzRPK6hZGpAPBospSif17RJ&X-Amz-Signature=40036a7377c965da1213e5918d4a7d4293fcc126882b78ba6942de9ec35803c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XJHTOQZR%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T062633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIBSDAt9DaM9PcPjUG3W9h5419%2Bc5OmGFambpaqo32VOsAiBH8jAIjWY%2BeRoeWfjUQTDO1ugvb0mthZvwsXvpTnRzySr%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIMVk6rcx6Orz%2B8YFyjKtwDcMuGuPa%2BE902FHSXCFfSVmSwQKpYxMisFouMSY%2BPchjiEufvSZ3oxEsLSKLlFUPGCt7sLWCeeNQDh%2BOhh6HgRRCZpURU3zR4%2BKbLIat9xflLPqz5ixKSNXmwN0ws3xGSQTjmsk9msoZl8lC0kZ9e%2BU8pNDKPTFQNOB1jH%2Bj5pYOmvA1T7uY2AgR4Gr6l08p57nXdnO8ewGrkAdrALSGzM7YUTB4ICZvbibK%2Faqw9dRcLJuc9yx3sgMnMCi%2FzC0ZW5R%2BrMsL0kyqrCsazqefF3Hf4wGmTSGhXKPVxG3UT%2FW2KQjlVUL7TrU3d8s4p7hynS7Nu60RtrYghJbwCsqEJzQ23tSbRrsFQ9cfbANa9aOka8iJQMfP0UfmrsBwqOXQEIorhqX71bp%2F4J%2F6WajrN%2FdhYvjKSU0L0C2JQvrh%2F%2FScNEAiq6gmkILwosNHkQUnk1%2BB%2FaH0dGSWYzJU7KHfrjAu6B1Nz1rypovsNQS%2FfRKXJgRfj%2B2j4lb%2FQgMSI5jIsgNBmckoTMq3TgG%2Bw5QH9w00eG9I4UqqUGA7n0pyom%2BKUCvXGM3VK7RpTQKK6PMBOEwwJOClv%2B6NkMwXppKUQOtKdOdwDoCc8epCNbTEoZ0gh2iII1jKnN2q4JOAwtvWzzQY6pgFA3S46XYrVt5l2B%2FPx1H6K8aW2T5AIryWdBTFC9N3YucrF0jG7FRu4LyZ5WDlcd3DIdYCw7r%2FjdSWa5bYLZMLQxzxemD6acUpZdeFFAUBIAyjlfrRN6T%2BHu0KVnICs68iSoDbtiJZUKzdgzDDoUkanpHrDDgV0ycxNohlNwjoogtQmik7jJKHDkVXjN%2F1DI2eLK0YFCCzJtiPy8W9ONH6bQsXJPHB3&X-Amz-Signature=088291b03a85ae2ef3fc21bbf24287f563ba2baa8032988bb8010a25611b8834&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ZEIBBLA%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T062634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIBPrAw6sBrA4a4odVbaJHg02GMFMoX%2BdvarryeIWsJfLAiEAoVroJQCBLaYyn0pWYY7zeuka6kwI2AK8WU%2Fv6FV4rE0q%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDJQiV7YpyZAj2pAEiSrcA%2FIX3r4acsIqri%2FlJclMRaIseFb%2BBu1iIWYWBiT%2Bd%2FmorPUiwRuWijjVJrxsGZLnI5p4HzQBRfZrdHrq%2BXj27hsbtH9hoZIqbyqLXA4YO8Y%2FyJ8jyWjfyh5UZpUKgGjUT7KR8Co51C1vpqEiI1rVOp6gB9NuPmPA7rB9CgZLk1sfKINSIrVZN7%2BXAQU3qf%2FGNPJXLvWbf9GrLJ80n4ytuMdR5ob7YsR3qd5VG74RabGI4aDe7J34rHX4jnpLc7zYvI581gZEPvPVJLPpf8Tv9Ob2N6bMagXLrQdzWXDxAZE9zydM5yDx4lQj5mzPIjrZROvZNhW6pFxYp3KrGic%2F46m06g8dy7SdEEdkObOJ9QicegalZgLPJoyM84yl4wK6W1LSlCAAD9rhaMsra4NZMVIVazzx2PakmmOS8swKd5MurZ%2Bz9Eq%2FAXP%2FKmaGaBOCJH87JtlbhVItawZ4XjxH2CwUDMQddV1IUgB01Snb1gFODQGSNXorQ17rIy7AchqGMiukhnjrLoAhhUwbk4%2Fqznn8HpKXRJ%2Bfx9kLLe1nSTnQ%2F0ZqIQE2LtkImna%2F31zFttbTJWf2wbHJ5k3TZpc71WJt0P5ouqYI1TGQZfda7W1rTwGRCDG%2FC0KCj8hCMIj2s80GOqUBHu3nO0qDS6A3YKbyBvb%2BhS%2BCrj26MD0ubQ5BuHtm9lGro2Omi%2FDNqx1p6F5YG6Bt7yWHHDyyuXfAE6YY45Wt9HV1L3uxiMnqB9fAZJ6h7LzKEx%2Bs6cfeitY6Lhd1ys4obIZ8GekUiHNCSnbGLgJ3k6GbhK6H709aXgFT%2BAyl7eHVjmK8PM%2B61%2BzFensILsR%2BcEaDL61frltfdcqGKSFIMWbOpufi&X-Amz-Signature=c8cabc6aa1a544915d45fed44f8ecb302e1a56c76baa58b27a6085187272c028&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667AYHRV6D%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T062635Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIQCxWlJWTMubeu7dHIhQ5%2BqJa703BsAEHMdcNF84YxmwrAIgIqPEaTNLMnDYjk0fE%2F0W158Gx2vK41qARyNowdIt8%2Fkq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDIZXJSJ8NlYYaJj9eCrcA4m7o14n37Z3VtAZHXkRsTegwZXMJ3kIiGJgxAgj6m8DkSlviBW%2BunhaS1UEzOFGFCUD8Ekztpudv59wFj0Sh%2BK9%2FdZ8cGsyHJL47Irz3I1%2FtsECRfjoTAaG%2BlwuxML1Cy9tmtCzuwyBhDhpM4upCTl%2FpiVsZVbgTJuIIB2kBV1zWNJD8Rhu%2FRJC%2FdFDsfWNDMZNigOS%2FXrClnEs4u7PJNlmhRuXYC9iIo%2Bq%2FxehVquWUN2qt%2Fpn%2BW0PzVJ85uTbCJdJRhd2jsu1ifSaTn7cXkCCkpylsvIIE4IN3IXj9GEz3ZCCYdy8Msnwc8xtVOHNAPA3tl%2FZSOr7xebD1i7%2FWGj4jDbjm39ZsqxY2cTTPw85eVYhVF%2BvmaFw%2F39iC%2BhepGuwZPovasTy1iXR0egp5rsyL6PWZ56tXvKqriYaleQlxoMhBxBjVckOiOg8WKTTIkm4JSDycdboA%2FFplqqwVmbPPIKq52MVZLSv4j8WfCKHioqISrnPsE5FHqEEDZm6EdivImQIcaXtwBFaDLK1%2BNoVwBjzE02CrJoQfqlyKDHwEPDyrprss2v5D91ORCfkBf9xoNRockp3GasSr9pziXHBUnpyHzOH7Xk8fykXpDOCNGzOXAvJKcBDOvI%2BMMv1s80GOqUBcliYCBL8VQXpZEGShBIYW4KKvk3kyQwFR97dPRFyD%2BzXxB%2F1lI1zf73QKGz6E2kEqCAlGTJ%2BccUcY1Xz0eZ9sTZKhDSOmr5revqQA1ij2As7BnTYhHl%2BGzn%2FZVZJi51Xc9F1C7gww7zdG2d9rjewwFiyfaAXNdCUilYYYOZ3mC4F%2BbUGEIC4nHxtqB2lyV2vxWsrKubaD9Mu0Sr%2FWUTe28edQ1Oy&X-Amz-Signature=61a0c0db59520b2b484fc599ee491b615f0c864a39f9f3838c95b65264574561&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3XQFDNO%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T062636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIFhTN1CA%2Ft4rdHgt0fPJD0rFFW%2Biu3xEmIJ4SxvH8y9FAiBk9ndFsvGlmNtDGA%2F0P1e4JzwkvhOHS%2F7t%2B6%2FmEwLpRCr%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIMDQQJxQl%2Bx1R43s81KtwDTBGziT7sbSqUWAuOjRK20rxSEpSRiL3r12zIeM94MDZJHZkVUqlmHB1TtSv6YmbdjDM0fIHYHckgwLsRud5kUq3qesgPE6suQzojgCf4eGqeyJwGGoJ5UInzKHN57L1rgoVJQRkW6GgvWXXwhzA6o%2BdhZa5tleIFf01E2YRCCCNx2tuSLbLWPK1nD07ZFPoQY4NNc36k9A%2FwJCkGx7Sbv4xe%2FWZ8247d%2Fg0UwN%2BI0bBUmHpy%2Fqu3AZys6ItPDbRbRszsOFK9%2FN9TgY3sDrMeIIID9TfMh31PoVQgLFRXGg3UpEQawuF1A5TNuFyxC7BuKk65QuZA9RLBFovW7%2BBQsQoBCU9JxohDCO9x6Ev659EX63H596ycAMEMz6%2FyvUIq853BsYTxNUfBoegfWTsMol1ecAlRg3ouow13mUE96UYVYdZ0RUn37htJ%2B9um04hG02kBY159tXbmdgX%2BpolxhAfvb1eCPELezsp6RTvv1UrVq3dF%2FxIIt8%2F9yRgjYqv409p3Y0d5NHsYM%2F8DTdOGuhFvDy7nIo%2FTeLiQzjpljfWBJI2HaX9Ijm6RDSjYmWF3NqJmc4pi%2B0MWZrJIVzM0DNiOTkM0GwVfK8B3VD5tJwkMIScBxsYqAsuM9SEwyfWzzQY6pgFjEbFFozCilyEnnyfOXphEHW3f553vMlr4BKaGVbzMRxVrOjFBcqZWiIPGqvaLy3F57t6IVuO5haPZevze0ZgZqLKEinzHUpJFPtiBntUfMHtc8ppAxEFD%2BLUGWCxq3AImIbD4GmfGjRlctqchBOOSwUw55zuqcb5QQd%2Fs4rfSbXrC88NEFZamsflB9PVlm72QVvxpZ44vDpkG8cDuQuU1oBdjiXIz&X-Amz-Signature=1491ebb93efae7c0ad35a65b27a5d3e50bc29f2d838edfd8df8058c38b0ac556&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U3XQFDNO%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T062636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIFhTN1CA%2Ft4rdHgt0fPJD0rFFW%2Biu3xEmIJ4SxvH8y9FAiBk9ndFsvGlmNtDGA%2F0P1e4JzwkvhOHS%2F7t%2B6%2FmEwLpRCr%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIMDQQJxQl%2Bx1R43s81KtwDTBGziT7sbSqUWAuOjRK20rxSEpSRiL3r12zIeM94MDZJHZkVUqlmHB1TtSv6YmbdjDM0fIHYHckgwLsRud5kUq3qesgPE6suQzojgCf4eGqeyJwGGoJ5UInzKHN57L1rgoVJQRkW6GgvWXXwhzA6o%2BdhZa5tleIFf01E2YRCCCNx2tuSLbLWPK1nD07ZFPoQY4NNc36k9A%2FwJCkGx7Sbv4xe%2FWZ8247d%2Fg0UwN%2BI0bBUmHpy%2Fqu3AZys6ItPDbRbRszsOFK9%2FN9TgY3sDrMeIIID9TfMh31PoVQgLFRXGg3UpEQawuF1A5TNuFyxC7BuKk65QuZA9RLBFovW7%2BBQsQoBCU9JxohDCO9x6Ev659EX63H596ycAMEMz6%2FyvUIq853BsYTxNUfBoegfWTsMol1ecAlRg3ouow13mUE96UYVYdZ0RUn37htJ%2B9um04hG02kBY159tXbmdgX%2BpolxhAfvb1eCPELezsp6RTvv1UrVq3dF%2FxIIt8%2F9yRgjYqv409p3Y0d5NHsYM%2F8DTdOGuhFvDy7nIo%2FTeLiQzjpljfWBJI2HaX9Ijm6RDSjYmWF3NqJmc4pi%2B0MWZrJIVzM0DNiOTkM0GwVfK8B3VD5tJwkMIScBxsYqAsuM9SEwyfWzzQY6pgFjEbFFozCilyEnnyfOXphEHW3f553vMlr4BKaGVbzMRxVrOjFBcqZWiIPGqvaLy3F57t6IVuO5haPZevze0ZgZqLKEinzHUpJFPtiBntUfMHtc8ppAxEFD%2BLUGWCxq3AImIbD4GmfGjRlctqchBOOSwUw55zuqcb5QQd%2Fs4rfSbXrC88NEFZamsflB9PVlm72QVvxpZ44vDpkG8cDuQuU1oBdjiXIz&X-Amz-Signature=cb72cc2aa9a89c65c180977192e1d1917b6c4656265fe3ca04184b5e6a2b9d6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYQEKWIJ%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T062625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIFFdct7bLHjKkWiTh8NYjKJcEHYHLoqeY7o8ZzjpjrEnAiASi8dBZoZYkriRgcRDJRCKoxwtcIM3cssoBxByPcoFxCr%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIMHqsSjkV7qqn%2FttcYKtwDCmWHVN2P7gtwNRIOdoNANAlr2f%2ByLwzwYbqWYtUB6hzavTNYY2h6DKWPnEGhhMEti9orFITYbMFLGZkrENx%2FCw0%2BwAHQp%2FWPkBs5P9yLLJATxrIrV3LGVb0Utuj8Gxz70o8Q4%2Ber2BplK06lLKKRiswxIQyQR1eSaXr1j%2Bbty3D2hsySAsJpaHyxRvD%2BnDhjmN22g9zI1Imcgl9LZfdX2yN8mhbLLcl0xQsFsd2WK7pB%2FTj4pm6OKegX0g3tGRaw%2Fk9CUAHp9p%2Fn2H2G36u%2BvpuT%2FGavPzQ%2BahD09teYkzsIXFJzyJoKdMbTnqTOLXJJtm2MA%2BiUf4%2BEleZQN7ttuv3r3i0%2B8VEpTf%2FQqHvZkSQpz7oNt7C5uHZc587UDbo%2BVeVZwTeUzdesdRY2DKnCOH2YueUFl5l02wGLZPu2I89UR%2FoRAMrPaf%2BxDuTZk%2BxNfucPjHfARrFFCpBq5wcbJAOfnqYR8Cord7iD%2BgH%2BxnZdN%2BaVnXO%2FiQp7S688yf%2BuZVIh9%2BrQPpYFPFxNKQcxW2w0oRb%2Bptf0srUPrbIgx7cCxRnu2TuJrj4mHmdv4Wi83MqE0h0O%2FfdebHa6zFVqU6VZVSRt7cuVo6FsMt9%2BCcUbeFQX2KX%2FRQqeDKMwzvWzzQY6pgFx0enAW0IpDYFUdNK83r2eIbWdp6%2B93o%2Bh6D1d%2B6pF23ptxBvAg57cadk5RtMtO%2B4RylZ47078gp7GERlUWK2DPUtMDLc4d4vNMKm8codPx3znNWAf%2B6toZj6z0mLMM8IwJPm2AuAoBEfl623uqtBAkLvjqeUL4V1ZjcND2kCSHoNC9tZO9WYJeVF7rIemJnBVWC0%2BzgAdfi7pSZW03qA86yJUBJ%2B%2B&X-Amz-Signature=8d5a99b4187e6a2506f8a4ac801c93d5bb35a9242d3c2005dd8938475261e9b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7YZJNBI%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T062637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIH08grzugRb5ufbjJwtKwkc6lxaL9q5ckmNIQYq3BTLcAiA4aDGXiXMaqFq9NVnvkE4VxzBQhEgj0AKasgKb2RsaeSr%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIM8VK9CwRevuSVGn2FKtwDEsOJ9OsY%2FV3Z7vsK%2Bzu27%2B0ECO4Mas8fFUyTwCpS3NoZS3%2FKs%2BJ%2FOqoXNpk%2FHsWVjbsM8fAF0tNe8SB0QJlE2wujIqIfNnnYiyqjwOLSWoDWdyae%2F9VCxVemc817yJFZsjDGQYEtNYBLGjaGspsWMc%2B4vh6TOx6v1DHM6EGv2ZmOO1zkZKFhN1KekYqoO4dUCzMCTfXLC%2FvY4uSd%2Fc0s198VjIndSEQ4G1dwWGA1hXBkov5baZkeUsCDjJbJHQsRbrcJVyGL0srOmwKshv3XdFuxCyE7ljNyvEIw6pFsSMoml75pK%2BikvYleTkpyp7hWFshFd%2FW8R%2FqQ3afnEpq7txnUlUpMie4Ks797y0qhHL0bdqg8AkZXpt%2FJZN6StyIfu1OH84mX%2BoeR1xaJxCWT94nfXU7x3cg9boYJ%2B3c3etJkwe0kgt3iuGK0rN2DhXMc6WXjX%2FfbLLd1vSMgjN9VWBP9dL4oXwksSlh91Pg4CXTbqiMJ4t661qTyTIiSjYOc4dfw3CorgXLhrsbIkn3LziQOUqDN8XA9DbXBNQ1ROWqF7FNd0mBVAKq%2FcqVS7AJY57McbZsi%2BAyYRViPmisYZhKh1%2FoXFHsOWW7KaimLIMJq6opgG4m%2FJV4QCTAwpPazzQY6pgHs%2FG6q61FHy60hf4AluhY5TU2dMAqFrU6VfT4Ji%2BGLE7jFwQGo%2BNWz%2BpGljiurpRXeNnB6PBvkro0zVuJ8XtHjxJCBKz5PYnC1vbirfmwqH6ChNLJ0dFig7AHGuexa2Y7DjtNBV6nWSWsNURLkq9aODpy96eW1j%2FHfZQHPL%2BxY4t7lCNmZ3yEvIy2WS8mTtrOuxoRpoIAcpn3quRHXdXwlnIHzr4Jg&X-Amz-Signature=7b29daeea5c752fb516283cb4e268dd95385e7bdd06730de70b048e46e7fa860&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7YZJNBI%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T062637Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJGMEQCIH08grzugRb5ufbjJwtKwkc6lxaL9q5ckmNIQYq3BTLcAiA4aDGXiXMaqFq9NVnvkE4VxzBQhEgj0AKasgKb2RsaeSr%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIM8VK9CwRevuSVGn2FKtwDEsOJ9OsY%2FV3Z7vsK%2Bzu27%2B0ECO4Mas8fFUyTwCpS3NoZS3%2FKs%2BJ%2FOqoXNpk%2FHsWVjbsM8fAF0tNe8SB0QJlE2wujIqIfNnnYiyqjwOLSWoDWdyae%2F9VCxVemc817yJFZsjDGQYEtNYBLGjaGspsWMc%2B4vh6TOx6v1DHM6EGv2ZmOO1zkZKFhN1KekYqoO4dUCzMCTfXLC%2FvY4uSd%2Fc0s198VjIndSEQ4G1dwWGA1hXBkov5baZkeUsCDjJbJHQsRbrcJVyGL0srOmwKshv3XdFuxCyE7ljNyvEIw6pFsSMoml75pK%2BikvYleTkpyp7hWFshFd%2FW8R%2FqQ3afnEpq7txnUlUpMie4Ks797y0qhHL0bdqg8AkZXpt%2FJZN6StyIfu1OH84mX%2BoeR1xaJxCWT94nfXU7x3cg9boYJ%2B3c3etJkwe0kgt3iuGK0rN2DhXMc6WXjX%2FfbLLd1vSMgjN9VWBP9dL4oXwksSlh91Pg4CXTbqiMJ4t661qTyTIiSjYOc4dfw3CorgXLhrsbIkn3LziQOUqDN8XA9DbXBNQ1ROWqF7FNd0mBVAKq%2FcqVS7AJY57McbZsi%2BAyYRViPmisYZhKh1%2FoXFHsOWW7KaimLIMJq6opgG4m%2FJV4QCTAwpPazzQY6pgHs%2FG6q61FHy60hf4AluhY5TU2dMAqFrU6VfT4Ji%2BGLE7jFwQGo%2BNWz%2BpGljiurpRXeNnB6PBvkro0zVuJ8XtHjxJCBKz5PYnC1vbirfmwqH6ChNLJ0dFig7AHGuexa2Y7DjtNBV6nWSWsNURLkq9aODpy96eW1j%2FHfZQHPL%2BxY4t7lCNmZ3yEvIy2WS8mTtrOuxoRpoIAcpn3quRHXdXwlnIHzr4Jg&X-Amz-Signature=7b29daeea5c752fb516283cb4e268dd95385e7bdd06730de70b048e46e7fa860&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QYAQDUME%2F20260308%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260308T062638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIBGeCrQqJup93gvHxhY24Ye6Jtb9sQ0AJxz92xUVbDudAiEA6%2BcHyCLR3UJCLfEKxz2D5W4qEpkvyN76hXJlngz6HnQq%2FwMIDRAAGgw2Mzc0MjMxODM4MDUiDIrt3KMo2eYgkRSRayrcAyjjgq2m0RfyUKQUOrXDEOQZiHIZ%2Fo5nmAxjLBtQ5jK8xhQbnIV0DH09a59Z8kdvag2zYu4gYX551aBm0NeuFePlvHKXkJOdUQtdwKEHsq87gIIiVro0Oj7YZczzApmLpIZgFG1tF%2B5UlqbHE8vHIk1%2BeNLJu7TcbhNxse9cEBxhKaxZVl7BLWij8ACbF8it64br8iJdabb7%2F%2FmLw5c3g8u84XF4cV8ULw5bb3RyU%2Fj4OYjhiU1GcA043teAwZViNeit%2Ba%2BcDlfx%2FBvnUwPeKeKAZczs%2B13mw7eQAkWqUT63QHc1iVVTfdY46yLme7b9%2B0eEknX9JNNcm0Nq5mp%2FuYPCSWPb7O5oiu3OpdbooPEPt4wTkE50BKj51dB5GHXOnu7ARpDwuXZRUmH%2BPJU2ZomIKjFM6FJAhNPix7a4q16iJe%2BeyfDJpGGsrGqSal9WJhbTEK%2FfrdVxuwWh%2FIQmPmvNCXDoXpBGe4TmqEZuDr0NimNzm0uxkpwq4txSPP%2BgZrEQiXB%2Bo0k2EECHo27LwnklNUh8rV5qtLHzOPfNiZNRxFHOnyggP7MdUOHn1VZdV3HHVkkvyt%2BTsG%2Fa2fUH6fwB2GQzCpU4qHWFvInSok2xWwoL9beq4lHC9eR8MPr0s80GOqUBJiC9c4C6P4Oa6u6a4qfn4t72N0nO3hluHC95rj5eNfe4%2B4a9TfkAnK5M9rKoCofYvMxiVk23FiaHyaRkgaUVaG03iAb%2FlPuOS5llAdkuj0stw5Hm4goYyTkyn67ulyieu9OYWQyzDRSoI8QZg79cY1vuXvomSu%2F8AyM1L5rJZekTJk7TUqG6DmO6FJwEoK%2Bn3PkeixVCUrqd27zH0VAdI3U67RbU&X-Amz-Signature=5aafec1e749eddb5679f55cee7d659c317141e20b7cb797b8de949f7ce3cfbad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

