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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EHSJ6LO%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T092832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQC7aD67WrEKuOy5F7BMikiQBNm4%2FFLkI86boxCRgZ2OrAIhAJCJH7%2FY9tLJtno%2FanAbXmqeip3IIquImXHQ3jXkMPyRKv8DCBoQABoMNjM3NDIzMTgzODA1IgxC8UKCWEQYGpQmhnoq3AN09p%2FWbxb23QyHedmrWqvtJnQy6y4hUXZnnXor2aZbCJkMsEl9q6BQGjOSEjUgWdT1DjGcPe5GQOcwf9y6%2FVo2RcpzIajiXV85KdEfKuxc9w4raJYp65GQh3P7Qkv84FhBn2nWCDN2Ja1pmZDOi8G3MwbiolNuewhwUCtq2AN%2FctJzPg9fCmk52kYEKy0x6fBMViq8iw8y%2BW22RHhIXTuHZU%2BWEyhj77GnznLif6xbZ%2FLi7MbMUfOsjA8LOBNAt1czCT5AzrljeHiz9VYk%2FfGqbI%2Fd1qRHAPD4Hc1NPXSgt0BDd49T92eMJDJTiCex9na73Jb8VO4n8GiMo%2FfGOfCDZzOpDUHiRH8X9Vc5n8qT1sE%2BlHdrcKflHUaCS0gG1Tq9WyKiz8eyKE2v9O%2FC0e%2BF9vLQ1pHs2Ap0GchFXk8SrJh3Z9dmTXFiyXQ%2BwHkYPIPES5W%2FiqzLwxvKfCmMPe3gR4B9vyGootKIg4kjtoYNdymdybM8zzDMpSq6bzpUlyJzdS3e7DiHbVwHJ6oj4r0rwRJCHw1NIUwi%2FInMUSfX2IrYlOSJr%2FxfIQtbKaDo1uILqOZDK7xCIlnMkd2RaS5%2BcITCrnnU7Yb1T%2FuJbELNDSLwmmP0LJJIFKJ9HzDB1pfPBjqkAViTDBm84URBW4pyQbUSUJynoCoSp9h28r2bWpKqVmIKschJ6JxPbbcTIvjdMQYyfQjjqZgga7wkHUpHTwNdzQ1YVQtye5YY2EG0r4v5NvagWui9ox6O5FL63v4npmo9jxF2DIcItgGCMZPGrZkKcWuwDcYUAos9M7r4TMxFHVn2hEK73PaMeMQk7REz0O5fSmEwNh6X%2BpThVtJjxWg75MMMBu8P&X-Amz-Signature=7b0fc8c4f75f65f4a51a0e2e0074941f785a8cb1d9d318323388c3c5b545d5db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666EHSJ6LO%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T092832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQC7aD67WrEKuOy5F7BMikiQBNm4%2FFLkI86boxCRgZ2OrAIhAJCJH7%2FY9tLJtno%2FanAbXmqeip3IIquImXHQ3jXkMPyRKv8DCBoQABoMNjM3NDIzMTgzODA1IgxC8UKCWEQYGpQmhnoq3AN09p%2FWbxb23QyHedmrWqvtJnQy6y4hUXZnnXor2aZbCJkMsEl9q6BQGjOSEjUgWdT1DjGcPe5GQOcwf9y6%2FVo2RcpzIajiXV85KdEfKuxc9w4raJYp65GQh3P7Qkv84FhBn2nWCDN2Ja1pmZDOi8G3MwbiolNuewhwUCtq2AN%2FctJzPg9fCmk52kYEKy0x6fBMViq8iw8y%2BW22RHhIXTuHZU%2BWEyhj77GnznLif6xbZ%2FLi7MbMUfOsjA8LOBNAt1czCT5AzrljeHiz9VYk%2FfGqbI%2Fd1qRHAPD4Hc1NPXSgt0BDd49T92eMJDJTiCex9na73Jb8VO4n8GiMo%2FfGOfCDZzOpDUHiRH8X9Vc5n8qT1sE%2BlHdrcKflHUaCS0gG1Tq9WyKiz8eyKE2v9O%2FC0e%2BF9vLQ1pHs2Ap0GchFXk8SrJh3Z9dmTXFiyXQ%2BwHkYPIPES5W%2FiqzLwxvKfCmMPe3gR4B9vyGootKIg4kjtoYNdymdybM8zzDMpSq6bzpUlyJzdS3e7DiHbVwHJ6oj4r0rwRJCHw1NIUwi%2FInMUSfX2IrYlOSJr%2FxfIQtbKaDo1uILqOZDK7xCIlnMkd2RaS5%2BcITCrnnU7Yb1T%2FuJbELNDSLwmmP0LJJIFKJ9HzDB1pfPBjqkAViTDBm84URBW4pyQbUSUJynoCoSp9h28r2bWpKqVmIKschJ6JxPbbcTIvjdMQYyfQjjqZgga7wkHUpHTwNdzQ1YVQtye5YY2EG0r4v5NvagWui9ox6O5FL63v4npmo9jxF2DIcItgGCMZPGrZkKcWuwDcYUAos9M7r4TMxFHVn2hEK73PaMeMQk7REz0O5fSmEwNh6X%2BpThVtJjxWg75MMMBu8P&X-Amz-Signature=7b0fc8c4f75f65f4a51a0e2e0074941f785a8cb1d9d318323388c3c5b545d5db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TVPBWXE2%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T092832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIF0HATjz6dH3AfOYlHskfbM%2FKJ%2FcV%2BxxockMuejwK%2F2UAiB238%2FqtrpCuuAeImUTqQJQFCHyDDoXPHD9ID6ulQpwtyr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMHnJHO6DgdTOwtWBPKtwD3XzVYSL8cOvy8lMTOwOJJIBueqmw1LWfm6dGMUIXI4OGxYr7q4%2BrNeoy3ZM4hojZ4jweUvg12UQGTkCQgkAWvBj07XGVl0dcejbaqi2NqVk%2FDZ9v9EwPB2dwulTRlHw860cSq1qEXRb2Ld9grwiYWwFgJrIC%2Bzd4pm6FqEtrCz0szfSRYpRbk%2FhOuVz4Jvjmt5TfVPKVIR90st57%2BlyNqhwy3J4rkVqj6cxcmz3kHANU2epNY9k3Inq7D65VSpmC0QjvKb6djV4Rxbvn2itD35EBLCqd34AzOwiyKqhbOsEr%2FgcQ96txqolsgq4scTSkaMAl%2BpwocvwREP6vacbHX3xkPgtrA8MbXtYA52oSgeaqVHJ8u3N6H2z9Dv3NtYYPsnbhBCwt5QKXyDFI3vtLlQVpmOoyV1o5gmFintP3uSyg47XMMB1uI75tFPxQVZnga92UE0LV0reB3trUDI17xeH1wP9asDqVH%2BNMbAkGPKfyJ4Sk2RJLGU%2FK88yQ6V7UT34K1at53TLuhP44O6cbfTc97Yne6rfXsOEwKXMJwdEptxw5acR0VqQGj5a628dW5MN2gTWQDU5LMQV3pivwsMt8uzrTFfWoUM1hc7v6PVOqaN3ZQ5R9Q3TrxIEw5NaXzwY6pgEhfna%2F78SPyvrcrBCNST3YATRCV0mPrs%2BjtIDAiV4yMhPg8JJV5Om73osHkJHSvaernj0toCaSVq%2Flpc9nmdAJdSjr4NzKTvEt61Dyuv6dJGRtBKUH9rnZjYVInrgJy6UPTJu2H4feMy5zKzMTB5lJMbU92J9pEKCU1uTjB3op9IeaHPBGoQsrN%2Fs5tJ%2BQ6lUr7MErcIk5Y75yvSpoBHUJvj8eQPJz&X-Amz-Signature=acea1c30932dc2c852fa5bc2bb4f3b54a987dcb27c16cf47e907b6196934c6e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NQ6EBDF%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T092833Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCqYY%2FaCOA79X3mlT5A9ngI6HGNRXPTytn0vlmUjWhR8AIhANOQBwh1TPOQZnH7BEv7HPr5n23dkaSNYkRNNYYJ%2FNVxKv8DCBoQABoMNjM3NDIzMTgzODA1IgwflRCgca%2F8ByxHDlsq3AMYPGOFgE1ID2bTFbSbeQ%2B8zqA1%2Bs60aFmYpB2nBlXagjRMAUNLRVgGL9rDWmXNkOHH8gg31us51q%2Be3MniEp6KvdoIlCpAfCKpz9FEmWS0SlCyCDSAS9G75bM0JZCttiH4Im29A9yASDXMaI%2F7TAOS4LoQ%2F6MKUfB8DXc%2Bh55sm5FeMp4DZm3Ea1o7aURX0MluzEMUZpehRRgeYsZPxEW6%2BHKcgP1q%2BncZ%2BEUv4EqbLGDuBA5SchdfTwj%2FuDCFt8p6uK3627leR19rsVnGZNmvUnBsAsnBfVo1cuSqUSuA%2BvGTHn6Pd0bQDMaCTslTcYhek6Kk%2FUg8dy9iDIX08P%2B4h3wrXd33%2FyYHC1VlqF6DDptXtBK6DOv6IgIsN0RbLKnqyar0nP5LM%2F4mQ4AXR0fAMkRIZAGtndoOeDFgOzMKwBtfTl49Tn1TyOJ32gpSxlB2yvp8RcotmFQqnt6gvNCTjCE3fj3ErpOm%2BPrSaTrl2ghWYj3w0cBC84UYnRsjRt5jHNtqvXszQZdctCodtnUgN2WrM%2FSsX9kftCHrV7vyW6kN7q0vzR4Uc%2BBCpNaClB%2FD6DKvarQzq%2FiOhwC9chENq7dD72Vq1Bvq8rMSx18ScQFhNuChIpKqaNnd1DCS1ZfPBjqkAa07NhueS7npkM9KO%2Bfo89GsXpEDpMREZKOZTiKgXXMM%2BwDVlKiLqozMMSydLkvKWx4KrS1CaF1NEpMInAe0KMUDxT2UCjcW89eX8R4Gp6yLYyz6i4Av1pYSoUya3Cw%2FnuYlgYJ1weU0LWNwkX9pR5GgdKjjYV%2BcJ2El%2BLgBUHBW3OkBfgq8Ft%2Fct6j1lAcvCnl8upE%2BNCoJHxdvOmC2Sst1b%2FZM&X-Amz-Signature=1e06084b6ce448b43cc49327f7641ea7d06ceafa6f96dd203960023c54880565&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NQ6EBDF%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T092833Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCqYY%2FaCOA79X3mlT5A9ngI6HGNRXPTytn0vlmUjWhR8AIhANOQBwh1TPOQZnH7BEv7HPr5n23dkaSNYkRNNYYJ%2FNVxKv8DCBoQABoMNjM3NDIzMTgzODA1IgwflRCgca%2F8ByxHDlsq3AMYPGOFgE1ID2bTFbSbeQ%2B8zqA1%2Bs60aFmYpB2nBlXagjRMAUNLRVgGL9rDWmXNkOHH8gg31us51q%2Be3MniEp6KvdoIlCpAfCKpz9FEmWS0SlCyCDSAS9G75bM0JZCttiH4Im29A9yASDXMaI%2F7TAOS4LoQ%2F6MKUfB8DXc%2Bh55sm5FeMp4DZm3Ea1o7aURX0MluzEMUZpehRRgeYsZPxEW6%2BHKcgP1q%2BncZ%2BEUv4EqbLGDuBA5SchdfTwj%2FuDCFt8p6uK3627leR19rsVnGZNmvUnBsAsnBfVo1cuSqUSuA%2BvGTHn6Pd0bQDMaCTslTcYhek6Kk%2FUg8dy9iDIX08P%2B4h3wrXd33%2FyYHC1VlqF6DDptXtBK6DOv6IgIsN0RbLKnqyar0nP5LM%2F4mQ4AXR0fAMkRIZAGtndoOeDFgOzMKwBtfTl49Tn1TyOJ32gpSxlB2yvp8RcotmFQqnt6gvNCTjCE3fj3ErpOm%2BPrSaTrl2ghWYj3w0cBC84UYnRsjRt5jHNtqvXszQZdctCodtnUgN2WrM%2FSsX9kftCHrV7vyW6kN7q0vzR4Uc%2BBCpNaClB%2FD6DKvarQzq%2FiOhwC9chENq7dD72Vq1Bvq8rMSx18ScQFhNuChIpKqaNnd1DCS1ZfPBjqkAa07NhueS7npkM9KO%2Bfo89GsXpEDpMREZKOZTiKgXXMM%2BwDVlKiLqozMMSydLkvKWx4KrS1CaF1NEpMInAe0KMUDxT2UCjcW89eX8R4Gp6yLYyz6i4Av1pYSoUya3Cw%2FnuYlgYJ1weU0LWNwkX9pR5GgdKjjYV%2BcJ2El%2BLgBUHBW3OkBfgq8Ft%2Fct6j1lAcvCnl8upE%2BNCoJHxdvOmC2Sst1b%2FZM&X-Amz-Signature=d621bf43c458cee7399f149d52ea1037129caf4af3d6625dd434e5eef735cbbe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2GLN2OY%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T092834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIFyaAEuTXErB0M5ZrlasCfQupPMj8Ou0DQEueMKCN6PyAiEArds%2FBvXz2glzLh8XmXn33P1IwMEmPDJXAvEwTfmmumsq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDG1389agfCEkrpDzbSrcAwW%2F1jb58Xa51IIenyb3LKlYY8YVzHUXPBjjpX8enYsw12MxyUAD2KoGGrfBq5ZuGw2KipQqzNVZ9YehzNvNjnGeJcUjuV4VK%2BLsIRQJmX0r%2FkeLcsy9wkVUOq496jdiJng2qRVBfozoulUPMa%2BIbklUhiAJbIjlT6rUCmXN977NRs1RV7xzG3fsPRMMRi294aHYqLRkcBH8AI%2BCVrP9T3g0sU6DMbg%2BWZaI%2FAFNMyTXu7%2BR1G3mVbRsdSgAwFd%2B0p3ipBu1g4Bez3XU%2Bp5uy31Rgut1bxKlF876rXp19%2Bx73Ksq%2F6h0IyGApmkf9BfQZMcIyUN1wg8QYtBKQfBV9qc0CJKbALGpWEXncYxfDp8owZbR6vvrJDhOWWjYtJqZrjlhoqIuBpaebxkLpBF%2BxMMjppIqMrVxIfSpAeKOnc4K9m71cvgyHoAJyjvNluVbvUFF5ENWK0Ddyw%2B9HHUdA2K5jz%2FuA5xyiTytdbBpuAlR7g5v%2FG63KHk4ugrTeeem4Xc%2F0EeN0QgzDRmcqt3FbXnj57XD6mKlIlw7ItMraXOYSJbRBv0QZweH9PbdTVcXT0SVI2LhIwRydo7EOhjdTVH2EDBbOQb4aaxFTmxPCO92nAljUpI1tMg4fLXAMJ3Wl88GOqUByxK618KIj7fXZRccVPxEWZzP1Eqz1AjEb3%2FVcGYmAxDbSrA%2F3ECw4Sx6H9LguFxCmLOjBL9%2BZaG%2BESgOyrALED8b%2FZdr6b0HNio5Pcd40GKuKegrCGK149JR2Ljj%2FGzJOzH3cDQqlV0kRMJ4AYOhkJUzMTM1BYhBD%2BjrbWjXZLGowcX9ReS4%2F%2BCCznCGaZFhs2TN7Qhlfkl8KOrwOCLkLGbW52RX&X-Amz-Signature=5d6daf89fa5652081a8f014d4e08ba2cf8183082b1ac5ef6eed6448cc6536279&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTJ6CDVK%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T092834Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQDYVeGdCI8%2B8wRDviJTfzgXUCkKI4wKB1JPjd3lXbXmcQIhAJZmjWROlUBSEKc5iga48rt03VEo%2FqVcX%2B1%2FLQW5u38SKv8DCBoQABoMNjM3NDIzMTgzODA1IgwOM5w1Ku55SVf9aScq3AP7e2%2B68K74qJDl5S4U4dhFU2YVgX9bNR62omE0yoKgMxd0iEJFPEbotA%2FKG6SLtgrQoXq0zHJ4mcAif7wLAuVZDUK9GvtPuJoPVPUViQ%2B6rTdamnmnmJwbEOazBvglQ0bPaqxyy3rlmAbnXObK3iXm4FzB68XIVOt69HHPI98%2BXE7hKi9FxyG4XeglZ%2FIVWoa92cN1PgHcj7w7Qm9tHybssXV9etrKHoKjV1HY8bK7tFvcM4HnRYlYBdx%2Bj4aAQ8KIwK%2BEXHcszeS9moLaps18tdkYWXbvURLCSRhSk0Fui50%2Bykqd1t8xcXLTkipiDwCdkH7aOALSeDWrVgkFUi3SZg1a7Qsk9Rr620NundNSqSki1rOE76evCSq2yx4zRQsDjvUkwSeI1x%2BhucOUW4DLY8KqWJUliHnNRnvOlzH%2FQrBj8FEuzK1ySSQqvptpIDorEtAoCf4r51BEzrpN6Q1o0%2FY%2FhDxBx0RiG1nROppTKGoq0G63C8rAW8BU6rU0%2B9FjB%2FH8PVsDPRV8FtJFqkEDIP5Letmdw%2BKxArWX8ChoBU3T2GBGbLG3eRHJLOlQHlLqG8sGW3jBiRxGo22Kozdu1%2BK3rvTb%2BNxgGOPFDbHTa3w9J4i8ZhfRJD4gnTC81JfPBjqkAYEjEkq03Y2xev6egstwxt%2BSJo8TQN9D%2B3w7Uqon1uQfMr99qQcA0qQfr3%2F7PbVK8HFWJTWoTq3AMq50%2FIF3oCoWp0m8tikyQh3M74Mv3OFfruVDumdRVzE%2F7Bg4RGH70boCznAB5Ok5az3T7sG%2BWYExmDbjwlNlftbIiV3RXB0qytCe93nSDfOc%2F8UT9Ml8uoCqZbIEsTu2HeraUcbGV2vQltru&X-Amz-Signature=d8efe2f082adb293431b22196c225222341620f60a22a3954cd58d3b4e45f1cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRWQG6CA%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T092835Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJIMEYCIQCXuOz97lJh2YsBe1TU6SttEnPYojRGi3HDCJwO26JJawIhAJh7yghd%2F7AqtNYro%2BrHASuWTPWbnQgnVX4n5B%2FuDB%2B1Kv8DCBoQABoMNjM3NDIzMTgzODA1Igx%2FcwdwcAkXeKC0ptsq3AO8mqhp0yJ6TqCn6KulDxV1nq6MUDwxKoc6DQVnCpbwDZJXiU9NxN1i9GGCzAwu7WY5WgmZhcB4ZOJe0IJlqfu1HwWLca%2B3fqW0wlrgpnEeC8xJhOL69UEVpYZIUWIGulNZlIomqafdZD5BBrW4qUOAXpCaTRl0r%2BEya%2FDos4xFlhSAchY3aKKWXJ04QKrdCtuz5pcDjlnrDWxnmKMq%2FMgViRrdG6sO8%2Bp99FwblXrhL79V7PL3rh0zdc9pXxJL%2BeXLKYMi03lMk9iE5%2BClN8aj8JKaTxDaNwR%2FLI4Wdal0OCwoq3LDIEnDaQbErgr48LMrdqzg11sGFCWKSMawnQu8tZDFmeeIR6q0ZX4SkTM%2BBCEbP0Q1tUUH%2F1osiSiIHVuNyRljOUSicxBNQ4Xc9L48rLeJR1ERkrZUgFCs4%2B121RUqAqP4EygJzaUmzRj5aWtonM%2Bxgv8CedaxKsVINaYIOumplzKJNRHmujlTlRlW2lFK4UwVD65YhtNWu8OGxHRc9FALvySBeokDoeBOMQ31f6W8O5%2FhUqZHJw0%2Fk06txdnEfvM7KpCK52xY%2FrOeDXuaze4qrwv1q%2FJFZ34LzRP5Y%2BtLlNVMOntuVlYUfRstweVp57kp0pAI32OgYzCc15fPBjqkAdAOw%2BNxOAxabrJuak9Es%2BX2D8Pq1lg9on00onv82TU7iO3Kc9zA55AY80OGvyxp2GeY9rvm3olclrHToKfwMmOT%2B4gbJznfJlfG9cO4%2Fbcc7J7k0jvTdLKBddzlMEns1E%2Fj%2BH8RNMCkKrcanH3OPe3WjWvPOHwo0poTxfuvdvcZCrGV6wPWoWndDbkP5roDEcwRoFmRs6iViKgMIfrmKGRtOe%2F%2F&X-Amz-Signature=ada433842689925d1eae72bcaf9ee6d6862eef8429f5b47c1b4bf5774720730e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGAR23Q3%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T092836Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIBgrbgoB3JmR7pMGhh8GkfTlbKub9WKmnVnE1qEi%2Ffa9AiEAj9DYf2SUFuNOA%2Fk1rtGJmgjPgq74XRnvnijQKoNrgmUq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDOckEVWYMu0yYRiELyrcA3XnyPWpW2GMO3QKRT15SCIUd4nPWfQrWYyoZz9ZFrRd0x5Xg1Lqc5uCup8pgkqpbhD9EkFDWjzQ3Y7%2BYebPhtIpwQlf2A%2Bj3SKyyFJ8TekDt5%2FZDICXozUPUkSvPcAyQ4kmlRp9SO7yc8N5Ro92spd2X3d%2BJKL5RZmA30P4Z%2Fo47oDtV%2FUgm%2BeVU4HakPmjonHCgDSRo4qDll5z3peV407hog02%2FUFxM58wlMOGlFZ06VLYrhZP6UPOmHPgxjeaL%2FtIFwG7iUtZlB6yZojJnLMGLGlowXRWXG2z4dAWAnhfRjYxW752tJRuSvW923f5c5vacsTwepNgvi7Pl%2FQY5rkUh0P%2BsWP4J20zmb%2Bay37A5Dt05xMCZ1LcUcsX4WmnPPjUMoE5T0Nc6mCTpeVQsbcrlE%2BpeZ4vVUM0Q8QsxxxRACQqp5c9kgs67jhxTn6JsrRtSukirrbwQyKiJPyOjK684df5797opL4CcwBTbxB%2FaqIGhQo6Z%2F563jqZr9jpnKRPHQImGJzdUhS91VC2gWXVUu3JSlpKUd8q%2BE6%2B8FZ93EQq%2FBXrQckRxgdkSgSmROr4Yk7TWUDx02zLazNjjkXMyDQlSaFzwKclYjRjkRBF9tXD60GAFun%2FF5qqMNTUl88GOqUB788uPIceXjmIk2e6PetwYjPKxyfJ7XHPAfm%2BP3z0FwjgBXb4MnpVtTnPY9F%2FTlFcMUDU%2BJRByF%2FblQKSl6ctsiV7HwicjaJn4sF7XlgY4im0b7oh6Zoy7y7ujFbRutfmdcc3%2BaSOFdt9SwwxDPrnIaFU%2FXzFiYUWZWwbSEfNRx3gQsZ6%2FxOpgU%2FFzFIMIms0YcjvsriC4mQRv65gxRanWIrygY38&X-Amz-Signature=462ce8437d5eafa5552a91895aa0284dc8b7d5b5910fef001935f48b8be74886&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGAR23Q3%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T092836Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIBgrbgoB3JmR7pMGhh8GkfTlbKub9WKmnVnE1qEi%2Ffa9AiEAj9DYf2SUFuNOA%2Fk1rtGJmgjPgq74XRnvnijQKoNrgmUq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDOckEVWYMu0yYRiELyrcA3XnyPWpW2GMO3QKRT15SCIUd4nPWfQrWYyoZz9ZFrRd0x5Xg1Lqc5uCup8pgkqpbhD9EkFDWjzQ3Y7%2BYebPhtIpwQlf2A%2Bj3SKyyFJ8TekDt5%2FZDICXozUPUkSvPcAyQ4kmlRp9SO7yc8N5Ro92spd2X3d%2BJKL5RZmA30P4Z%2Fo47oDtV%2FUgm%2BeVU4HakPmjonHCgDSRo4qDll5z3peV407hog02%2FUFxM58wlMOGlFZ06VLYrhZP6UPOmHPgxjeaL%2FtIFwG7iUtZlB6yZojJnLMGLGlowXRWXG2z4dAWAnhfRjYxW752tJRuSvW923f5c5vacsTwepNgvi7Pl%2FQY5rkUh0P%2BsWP4J20zmb%2Bay37A5Dt05xMCZ1LcUcsX4WmnPPjUMoE5T0Nc6mCTpeVQsbcrlE%2BpeZ4vVUM0Q8QsxxxRACQqp5c9kgs67jhxTn6JsrRtSukirrbwQyKiJPyOjK684df5797opL4CcwBTbxB%2FaqIGhQo6Z%2F563jqZr9jpnKRPHQImGJzdUhS91VC2gWXVUu3JSlpKUd8q%2BE6%2B8FZ93EQq%2FBXrQckRxgdkSgSmROr4Yk7TWUDx02zLazNjjkXMyDQlSaFzwKclYjRjkRBF9tXD60GAFun%2FF5qqMNTUl88GOqUB788uPIceXjmIk2e6PetwYjPKxyfJ7XHPAfm%2BP3z0FwjgBXb4MnpVtTnPY9F%2FTlFcMUDU%2BJRByF%2FblQKSl6ctsiV7HwicjaJn4sF7XlgY4im0b7oh6Zoy7y7ujFbRutfmdcc3%2BaSOFdt9SwwxDPrnIaFU%2FXzFiYUWZWwbSEfNRx3gQsZ6%2FxOpgU%2FFzFIMIms0YcjvsriC4mQRv65gxRanWIrygY38&X-Amz-Signature=109b00c35bfd3386411c2d5fc75efb48c2969618cc8ab755c2fd7cf9b5e2ae8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3FLLXO5%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T092829Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCIHdTINPCmOFQZ5NLXyjgGMlWA1zcfQZbOTZkiQBB3OJQAiAdyPqW3D0vlyoA6ZcTu4%2BoemHItOeI9nDcL4WuQSJoxyr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMM%2BTe1sX36T7uZomjKtwDMCBPs8T2IiRK82jnSdoQdEwiSbIGduW8lqBw%2Fun4ZEpXRvvQV%2FHwRUG%2FY1eVl8Uyool3BewSBAooKXj0uNaTx1lh7mLHDXQ8idhwb8FyiTTLJ3ziOGY95f%2BrH%2BSff8LjYZERPRSodZe4EXGmpbXBLGM7ik8k4VdkKVmxa0zE099cpxV%2FmgfBceSZS41xkHmZ0PS81UQgldzhLey4Cxq7DxrHmc0V%2B71LkVbY%2FM1IfoktTtAqkiQL5PscgVKbCdfJ13LZAHLBYlscYdMhAycAaC6oRQzIAmDKQcaeb6n4ZOajsrfc1pFC8HO3KwsCZzN49LKRloGdX5BI9oL4XDKSCc%2BUC2nC9YxAbt2%2FB8DnL6PK50XlOxP%2Fzc7tUGM5gDDebyJVmnmN1Au5c8Xlk5l2libE7PvLB0MneBx6qm0%2BQbgmfqjs2N8HCUXx6ld%2BlpFAskntB78cOcJeKBoOYWKrauWw3C67HFANbQrte9PWI%2B3k7rmOYYOMqTUh6EViqEeutkz9ez9N%2FKaTKqLJyUw7QDkaEXny8%2FsCbsPWmKQT7rfCXkNMIQ%2B3QHZofqPbX88CeGyK5yIhSJKUeNjalIqHOp83JROzp5GBhOYvG%2F351lhVCH4XdJi2NsgMYbUwndWXzwY6pgF5RE2h7%2FW8TwFvcUKXyp9IpenGEBd%2Bs7M%2FlFW4HhaPzbFn50GA%2BEBrcaVQyq4E4A8nAbLR3z2OlpuHgCfk3NnsFSPx7zBCES0%2FeOLudPRLAuCljYFBlAoJfKUD7Eb0LAJ1yZuo%2Faj43lwSRG7c%2BThHuypOtTv0Qe3Aiy3lS3615AmhF3y6Qrw%2Fimr6QnjnOcG7XAjNL0k2TBtEZyBCnUbNxQ11qfCE&X-Amz-Signature=4eb1191cec394d7fb237b6121945b3952ce2215a8972acd25ea4965c139e5f92&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CFCLQJH%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T092839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIGhgRyzN4dJzqzP2uEuNX3QOb3S%2B6mDTH4xHzCo4tSVYAiEAxcKsnnroWfSVZM0Va7KSZp0gewANtSyrfbTkbpuraSAq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDO9gS%2FDrpRyl0j8wsCrcA0HWcNsqoTYUfVpKF09QVL%2FLP8v3kJTzdHKlyasw1da2htmV6BjsYMXUcZEKMmfn66kWu3hJ0bFViWy8bftwgqVe%2B3UESuGRL21fs%2BI50PR48RUOItQWAwasxQS%2F1ewItbFOPk4awAoR0Nlx0K6Bt%2BjNQnEhYtolp474viox%2BLDZeq0unQCJ7AX7oo6nvNnCFD5wbKPskxX1gWMIGjYobGJC0oW5LERSixsBHz3BjJrxU7bSfbTa%2FOku2xXUxlH3P2dWN1D32J%2F8EFCCy0DmbEsR4g63aGpXjiHtkjJwQ3cI%2FPXKKq1dZPrPbvpzGNGnP5ZbxU1apfn2nDB3alJXrKFKd5lJPRosPYM%2F%2BXx%2FeGAkBUi0pyIL6TCdy8zeI4JxHyiV9mmO6GVO%2FgQpFvJr8wyvOAsFeqGqVucM906ucgpMgMrDpEtQhQu35atAumiai64%2FUhDFb2Bw4kVKWHcLwZuFeGEaJYfq7Klbf16aCoRREBY%2FKHghL46yWUTAjQfabW6ORvIvXczDdL9%2BXLeYDVT%2FRkRtZ1WUWf1UktnxqNrkU4GXaDoyZwyvRhNbT3eO%2BGojMpmby6Mk3Z417V%2Bj1tr4zB1KfPdkRBfH5KYI9ufSwd7siLqWr0HzsBnVMN3Ul88GOqUB0tLIZqM6toPGK1hVqaOCfbEZIKGpXP8GKoluXVpIdg9NjAnenRBZoFWVocV5fvZHv6C1DNda2Q89ZbXakchOdYdyXbIZEIeCfrTv9j5YqSd3WGsCbRC9rZPcjyh7PzMLK78buc1Yu0%2Byf3C8bi9DoUHtQehq5jTi47twgGH8i1XNxZTZwSc4C7WoPjB89%2BmJB4j2RoLGFcmU7YLVHMK4k99oxcoR&X-Amz-Signature=758881919b0be53e445b3d3bcf7d51e71ea36387b11e3f4b085442ba471dd50b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CFCLQJH%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T092839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJHMEUCIGhgRyzN4dJzqzP2uEuNX3QOb3S%2B6mDTH4xHzCo4tSVYAiEAxcKsnnroWfSVZM0Va7KSZp0gewANtSyrfbTkbpuraSAq%2FwMIGhAAGgw2Mzc0MjMxODM4MDUiDO9gS%2FDrpRyl0j8wsCrcA0HWcNsqoTYUfVpKF09QVL%2FLP8v3kJTzdHKlyasw1da2htmV6BjsYMXUcZEKMmfn66kWu3hJ0bFViWy8bftwgqVe%2B3UESuGRL21fs%2BI50PR48RUOItQWAwasxQS%2F1ewItbFOPk4awAoR0Nlx0K6Bt%2BjNQnEhYtolp474viox%2BLDZeq0unQCJ7AX7oo6nvNnCFD5wbKPskxX1gWMIGjYobGJC0oW5LERSixsBHz3BjJrxU7bSfbTa%2FOku2xXUxlH3P2dWN1D32J%2F8EFCCy0DmbEsR4g63aGpXjiHtkjJwQ3cI%2FPXKKq1dZPrPbvpzGNGnP5ZbxU1apfn2nDB3alJXrKFKd5lJPRosPYM%2F%2BXx%2FeGAkBUi0pyIL6TCdy8zeI4JxHyiV9mmO6GVO%2FgQpFvJr8wyvOAsFeqGqVucM906ucgpMgMrDpEtQhQu35atAumiai64%2FUhDFb2Bw4kVKWHcLwZuFeGEaJYfq7Klbf16aCoRREBY%2FKHghL46yWUTAjQfabW6ORvIvXczDdL9%2BXLeYDVT%2FRkRtZ1WUWf1UktnxqNrkU4GXaDoyZwyvRhNbT3eO%2BGojMpmby6Mk3Z417V%2Bj1tr4zB1KfPdkRBfH5KYI9ufSwd7siLqWr0HzsBnVMN3Ul88GOqUB0tLIZqM6toPGK1hVqaOCfbEZIKGpXP8GKoluXVpIdg9NjAnenRBZoFWVocV5fvZHv6C1DNda2Q89ZbXakchOdYdyXbIZEIeCfrTv9j5YqSd3WGsCbRC9rZPcjyh7PzMLK78buc1Yu0%2Byf3C8bi9DoUHtQehq5jTi47twgGH8i1XNxZTZwSc4C7WoPjB89%2BmJB4j2RoLGFcmU7YLVHMK4k99oxcoR&X-Amz-Signature=758881919b0be53e445b3d3bcf7d51e71ea36387b11e3f4b085442ba471dd50b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7SLY6D3%2F20260420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260420T092839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFEaCXVzLXdlc3QtMiJGMEQCICqSZohZSi3ro2ZivLRR%2FsOsIshWCjqYN02TU8HNWj%2F5AiAGfjOltRNQw%2B%2B6ZkIOSgE2YFMA%2FGN%2BACTD%2FNTHi%2FQG%2BSr%2FAwgaEAAaDDYzNzQyMzE4MzgwNSIMd98ZIWZOXJlZhENwKtwDUTL%2F8kLScWZp2zXGp7QhHhI%2B7XvvlOAkw98D1FtT%2BAwobttRKuo5266YKdWtZ40LTr0DihaSrmHMKEMbfWjvguQYavb7oJy2fSp0%2FiiCpp9UNvEaJYB%2BNgsJhovE1aFjRVB2xtmf3Mos6YFBdizfi09nqAd1Pt85aET3dJZ54DMubeY6Tkc7zkJWoH9DFmHgYsF%2BpJiyqbQElQ3tFFyMf4swmryCoGV1rme7pCtV%2BbW7ms7AeFHF9%2F%2FqnloNIJPxWeW7aGZdMfLEPY%2FL7XADgueT3hfjLBnwOvcNCTz8QCgT1lUS6ungSXSLv7GVK21baxcG7S%2BD0e9%2BOofoZQcWYUYWQnh%2BqlzMDl6OVPTk%2FMz7O6EVDb02uqTZirFD4HTB%2Fz%2Fa6ErO8CrUaV%2BXBot4%2BTIxfaafT1W3nZLz0ZmnW7xFS8o%2B6o1lFiPPw224Gd7FukPoj%2FhrFnUB3C0yN5%2B%2B7PnSGiYEXunlcFo%2Ble5x5IkTev05wQ9c8BJ%2FzUVIWIL%2F0ImF7yQm12wkxhrreBYiDv8EvaV3eZymbQD8akjIiY0lrlL5bk6emE9LLxgHfFyLUZf84aPKk%2F%2FiLTATb8cvuWRZzxC%2FtMkaq2zUbzASizKJZa6A8NXaLI3ObGswq9eXzwY6pgEYBJ7fvVgyEdexQ8%2BBxVgQQJyg4KGi5Q2ks51xyyQoWshhfAZuO5ovbOj8nDJBFth09Bz6qHqPuApu6%2BGVDTzuL0YLp0YL3JDPyF5iDtV%2F6NUrSC%2F7t7e4acB8ifoPkJTV%2BtMA5ao3oWZi3P0c%2BTxbMUr1dPOpkBlgWUX%2B3eHjdJ1O1n%2BrrNakMMl27ixwGqYhvGVD1n5krjel0pRqF4MQEiWEAe%2Fj&X-Amz-Signature=f0e97ef8eafb339727f49bfdd17b7149689142351e93d551f6e2f56829a06d5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

