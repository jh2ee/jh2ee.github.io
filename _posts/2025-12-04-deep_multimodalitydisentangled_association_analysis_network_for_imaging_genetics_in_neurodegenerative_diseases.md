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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLTHENUA%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T221536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCA2cnVqE7Is09ckNux9qBdha6AaiGCu2ZA5pqgZ4%2BciQIhAMx6%2FYiEpR5UPtIGdib7oD6zcZD2zsAuJNHU%2FaXtob1iKogECI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgylmHSv%2Bm0bcxOAEOcq3AOSP%2FDoPO1Ko9zIs2DcBKwealhs3k7HNqB5Uk3%2B9IhTlDnaaDo9QE9d2JLo3U3f9i3cJFyzqAJ9mCQMM32b95rSfb6%2BRxvN6lSfv0u%2BY4rgO0u3wc4Op81n2%2FZjigxzZyiFjRGg10JClsibWahJmqbg%2F1YmH0qlg23YPsc6%2F2JyG3gEXeikIuTYrio3qq4MyU%2Bov94wq%2BZEb9dRxdqhuhzz4c%2FHJx4P2G4ojtGxQl%2BdmuRsJgpxZgjHQd48LRMQDjvhRuv5caKfQqI01me2BOxogwISHYe0uo8cr7aSZkePMSeisul1mk0bVxb2p8xPfAkxBWrQugzi8nR%2FNmB9QkGlZy9s7w6zyuH0uL9p16M8Nkr1SAy%2F0Xj7vbYdYMAU0gKG5%2BBez1yo6WJE8AE0bpCSy3KKLqwiYHwguN8YRjrG3N2HnN1VwyzuyTvD1%2BsWG2yX3zrPqZ0YdXbo1mc5%2BG108LFfiPPbpC%2F4oaH2nQX%2Bi%2FKgyUM6NDbW9k9%2FYUvb56XuGXSnUAK0jiYotn%2FtXwrTqoBx6hWYmLwIdpkzP5TedHWRFeG4u8SOH%2BOAfVSwSvcvSONKuyHZ6D%2B9cEKdJxfwyoHTuORkmAVypWuE8%2B7AES7teEwithlgvXgL8jCR75fNBjqkAQvJPowX9EvGQksNQTmPzT%2BKdKmU3NzF9zC4Mm86V8fF%2FpfBjcVS842pnC7C0My6gGoqmZ7M%2BgfI4vQOdg96NFyiAYN3CGZOHC3wwYklsaGjKUekygd8Mj05SUbXXmomddHkqRva%2BfeI4vW9BE03q1%2BFHOQuJwHOdrboPz%2B5fVq%2BNTKp%2F8HTIp7BuqVuS2B5G4x6dz%2B8JOLquPTaDeCR%2Bz3xfVYl&X-Amz-Signature=1f28c8590d27354ca5bab0d63b8e8f4522249a5229906448c677ef4ee7f0b09d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLTHENUA%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T221536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCA2cnVqE7Is09ckNux9qBdha6AaiGCu2ZA5pqgZ4%2BciQIhAMx6%2FYiEpR5UPtIGdib7oD6zcZD2zsAuJNHU%2FaXtob1iKogECI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgylmHSv%2Bm0bcxOAEOcq3AOSP%2FDoPO1Ko9zIs2DcBKwealhs3k7HNqB5Uk3%2B9IhTlDnaaDo9QE9d2JLo3U3f9i3cJFyzqAJ9mCQMM32b95rSfb6%2BRxvN6lSfv0u%2BY4rgO0u3wc4Op81n2%2FZjigxzZyiFjRGg10JClsibWahJmqbg%2F1YmH0qlg23YPsc6%2F2JyG3gEXeikIuTYrio3qq4MyU%2Bov94wq%2BZEb9dRxdqhuhzz4c%2FHJx4P2G4ojtGxQl%2BdmuRsJgpxZgjHQd48LRMQDjvhRuv5caKfQqI01me2BOxogwISHYe0uo8cr7aSZkePMSeisul1mk0bVxb2p8xPfAkxBWrQugzi8nR%2FNmB9QkGlZy9s7w6zyuH0uL9p16M8Nkr1SAy%2F0Xj7vbYdYMAU0gKG5%2BBez1yo6WJE8AE0bpCSy3KKLqwiYHwguN8YRjrG3N2HnN1VwyzuyTvD1%2BsWG2yX3zrPqZ0YdXbo1mc5%2BG108LFfiPPbpC%2F4oaH2nQX%2Bi%2FKgyUM6NDbW9k9%2FYUvb56XuGXSnUAK0jiYotn%2FtXwrTqoBx6hWYmLwIdpkzP5TedHWRFeG4u8SOH%2BOAfVSwSvcvSONKuyHZ6D%2B9cEKdJxfwyoHTuORkmAVypWuE8%2B7AES7teEwithlgvXgL8jCR75fNBjqkAQvJPowX9EvGQksNQTmPzT%2BKdKmU3NzF9zC4Mm86V8fF%2FpfBjcVS842pnC7C0My6gGoqmZ7M%2BgfI4vQOdg96NFyiAYN3CGZOHC3wwYklsaGjKUekygd8Mj05SUbXXmomddHkqRva%2BfeI4vW9BE03q1%2BFHOQuJwHOdrboPz%2B5fVq%2BNTKp%2F8HTIp7BuqVuS2B5G4x6dz%2B8JOLquPTaDeCR%2Bz3xfVYl&X-Amz-Signature=1f28c8590d27354ca5bab0d63b8e8f4522249a5229906448c677ef4ee7f0b09d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WTCMMUHQ%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T221536Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF9oXj1j9NbfkwCjFVkW56jiyi9pyMieAdGO6dLTS0mHAiEAuJMggo8e4hNY%2BoHvp32snInYIFsp%2B8TG%2Fnbbk9asvCIqiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBEPEbfKw9XIPVwKpCrcA9LIvw3IpRf8VyTd85VUmOXywS%2FJBLQIUX%2BReCGaaQgVUZmgzDa7Otito42my772M9As1xCZVpz%2FJk63mH27XGPz%2Bi4qDw8pPUs%2FWUGRTuTOfds80Fi678LuHIusBLpkvJm5J9dh9vCiYlVD5P95JEE82xjAknTxPMaT0NbglhKmWFlgB2BzcknizNFVVmJZLj3EsHkW%2F9v%2FPa7%2FRHYCu0uhQZMcLOe3I4Ndxp02F1hsCTvdPpjxQZaeNFYxtUMAMCpmafq9ir0DVBRlougSp7aCWdOyN1BWRTFw2KMBG%2F1Y%2BTLNJeg2SChR17uVKu4%2F%2FM3BxaOvt8yCKLIoLR1QKrqhz7KEzGUEF5elWWh0MPUaxwPZ0aEEH6ztcV4%2FuQOnH2EXMENxvp6ssxn7fLzVJoep%2B4RDBNaCU%2FAwcG3697xGe2m4Cxdm7QgbZQKmPQtWGxGq5zPJL8ON3tVYxcsuDK%2BpLuigVXCTa6z16UtnVccR3%2B7c7pSUCWZa21Y2LWPnALisf47Cc5MBSRYzTVvqm199jZQCdW%2BNJgPb0AXmJ0%2BYAiY1dT5%2BtqeMyawNbFkTIn8oYBXlyR%2BDFLRJjLSBgaz%2BSgxFqBaSMFoOStyzlcLEX8ANRIs6IbMS8u4bMMDul80GOqUBmVYhS%2FZ%2ByHZ1BjlDrrlOs0o9tEXeoGD8Mem8xVPsCPQ5L2zXPS3kwxwxDT8N3N3fZawSamB0QSOFP1VN1wgUDEIQF2xMQkixLkxUdTHqW5oo3Yjttc0DSmjyVlla%2BsABgqOZ2CmyxPNL0Hnk7pWw6U4gyL61VNrfy1tz8sMjh1d8GQ5NRhPCFl%2BKH%2BEpve5B%2FjoYcfJXoZ96OCc3EbWGpsGeslXA&X-Amz-Signature=4ef29da87511952264c3482e94a8d120021b32bb5a09c5a590ea4a6587615448&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVEJ4RG4%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T221538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDnSgL%2FcDULXUs8oqA2KuhFrRqCA%2Fk6Ui0JxBeYJc3fNQIgN%2FvxWzQuNLLS%2B4qosR6Ac9wLE2RHAU3Bs5%2F7mH9hfMAqiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAKE54x%2FBlotB5RfzyrcA4DM5gv7Vfxj52wqPsssZTu%2F28raXhsp7GzYJujqbRA%2FWWB0%2FXq3yE%2F%2F5bwP0ETSVP5Qe7WHtWGCo1hU%2FyDEE8nci2PtC2%2Bi5ox0VZoRsYX5qprriFvaVHiLaPsleoDqLzgubEKnL6o7PfzAlYfqYLSG4j%2FXtskFw4VA%2BNQ1l%2FI7uR21bZIHuQY4qEFCSx9YdpxsGQt6TWfg47CafYwbjg6vysLO3Q0wXESYUAZzMfRWC2KFXE7ab3D7Ak%2FNxzVL%2FZRiKA2Wxl82I%2Fukqn8tdfcX7tX9rg2gQFmcF9vSz1%2BADku9udeeyrwcw2LxWpVtF8qxkx5SWsb0aJol%2B3JBoopuNozgA%2BsJDK8dJEaisCuv7ny4jkb1z9PydJE6vqKXD1hrciyvKRxkRvr%2FeJFT8d2T6KE3F9bekXz1%2BjhXa9WEr%2Byy8pKiYdupKeSZVZbGpncINd0n%2B3ALmDRqeh%2BFxEVnlmDCt7ozwcNHsh2uoCvakdOK%2BY%2FErfwpxUIDTfFFV6TXn9J%2FxIfm9XQQLQcxWSF7HS4eBkvWC73p8n9xO%2BkmSeoGdB4mQGts9Kih1bROU2SpWIdCRQRx11mA%2FNbRcSkOaFCqtZaz043bJMFz0%2Fz8yIpmJSS9%2BlR5pTXhMKDul80GOqUBxDarGItq50d0jc03Ooxq3S85J0U6BQpv%2BDxfi%2BJsJ%2BiuiixslXskgmfYdI%2FLhbU2lPS6%2BQFA3U58eagU5ZQ7VsmGi6cv8fOZRDv%2FRv7%2FXKl13jkDdmnzBcLxXUpqDB3q%2F6vDrDxa9iwRtny42e60wslW1OWQXFMUdjqRgrnzBlBcep7J8i2fxT531ndmiKlgjGttMCnCzo6um1ZiuaH0HtNGa1St&X-Amz-Signature=a635c3b388b6d1092eaae2d8633220d85f11a55ce50d425bb48c515321c217c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVEJ4RG4%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T221538Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDnSgL%2FcDULXUs8oqA2KuhFrRqCA%2Fk6Ui0JxBeYJc3fNQIgN%2FvxWzQuNLLS%2B4qosR6Ac9wLE2RHAU3Bs5%2F7mH9hfMAqiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAKE54x%2FBlotB5RfzyrcA4DM5gv7Vfxj52wqPsssZTu%2F28raXhsp7GzYJujqbRA%2FWWB0%2FXq3yE%2F%2F5bwP0ETSVP5Qe7WHtWGCo1hU%2FyDEE8nci2PtC2%2Bi5ox0VZoRsYX5qprriFvaVHiLaPsleoDqLzgubEKnL6o7PfzAlYfqYLSG4j%2FXtskFw4VA%2BNQ1l%2FI7uR21bZIHuQY4qEFCSx9YdpxsGQt6TWfg47CafYwbjg6vysLO3Q0wXESYUAZzMfRWC2KFXE7ab3D7Ak%2FNxzVL%2FZRiKA2Wxl82I%2Fukqn8tdfcX7tX9rg2gQFmcF9vSz1%2BADku9udeeyrwcw2LxWpVtF8qxkx5SWsb0aJol%2B3JBoopuNozgA%2BsJDK8dJEaisCuv7ny4jkb1z9PydJE6vqKXD1hrciyvKRxkRvr%2FeJFT8d2T6KE3F9bekXz1%2BjhXa9WEr%2Byy8pKiYdupKeSZVZbGpncINd0n%2B3ALmDRqeh%2BFxEVnlmDCt7ozwcNHsh2uoCvakdOK%2BY%2FErfwpxUIDTfFFV6TXn9J%2FxIfm9XQQLQcxWSF7HS4eBkvWC73p8n9xO%2BkmSeoGdB4mQGts9Kih1bROU2SpWIdCRQRx11mA%2FNbRcSkOaFCqtZaz043bJMFz0%2Fz8yIpmJSS9%2BlR5pTXhMKDul80GOqUBxDarGItq50d0jc03Ooxq3S85J0U6BQpv%2BDxfi%2BJsJ%2BiuiixslXskgmfYdI%2FLhbU2lPS6%2BQFA3U58eagU5ZQ7VsmGi6cv8fOZRDv%2FRv7%2FXKl13jkDdmnzBcLxXUpqDB3q%2F6vDrDxa9iwRtny42e60wslW1OWQXFMUdjqRgrnzBlBcep7J8i2fxT531ndmiKlgjGttMCnCzo6um1ZiuaH0HtNGa1St&X-Amz-Signature=6f259a07a691921051a426a6677f7a326fe1748bb63a84020010003c222266f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPNRHVJZ%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T221539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCXLU6wP67843UT2P8EqqidOxm2h0%2F7x0EiR9fv9EGAWwIgYeEPwp2VoXW%2BQJRz0eGQbBMmh8LjiGM%2Fi0m7W0%2BTpvQqiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDG2FvU2ykcWchkRwsCrcAzdBbcRwzFogTmt7uC6EPX86z%2FiSJpmffYIJcANuaJ0GQyaFyqnkSb8F8EkKFIW35laJwdRX3bK7wcuQkNNaad7yTLm7WXNZ92hR%2B4085s5z7yh4ZxhjzEIpRnY32838WFWjn8i59dAOaYsGUMp4avlgUl7vc71zAtoKU7kDuAN56OA2FT5HUJxzjqre72bLOqsGLrzrJjF9b7R5NTzCXehFdNR1XeXQB%2Bpuq%2Bfy7OYp5mfuX6QNRiGvSKijxDITj%2FrrFPXJimm2d4OCsuo1aVVG%2B9%2FpgwUnB5%2BaXPej%2B%2FDtM7yMlmDDvUazbGkI%2FCnW85oAUsAow03s7YQaob5qbnCQ9Xy63UVkpjkOnLQsuILFDQ0XhYfu0YA5Ad7UW%2Bfk6lIGhwHgdvCfgm7knaUGDnCWCJfSy3W%2BQCkQ5Vl7C3%2BdLePlwF%2B6eZD%2FAGQMfXdCa9ND40uXnQTU%2Fjd5a1jl6d%2Be%2FvWHBoYv37smejtJgXGfgzGsYnIaC8QRIPR8z%2FgzjgESUnbiI0gogtBFn7igB%2FCxy7dAFIZRupRLoon%2FxeAazIGxpwBv3sd1r7woVmikqkP5HOIqMFohy5Fh9clCAZKaXY0g2ryLmdVz1W3tM7h5WRLTPhXMprfijVZUMMful80GOqUBPWvLxSrTb5RHMtfxeolclS%2BRAt6s6rnVzLj29u4kaZ7zIKh%2BT%2FvAWJYLs75v0GX%2BTYUMgTjn81YLQpef6Q8i36dZ7sxUCdFZayHP4jfXgC3EJAQsrHqnEWTQQ79r5UUC6zt6IhUVOJB9PcKQzY%2FqIQ5mMX0y%2BMFv6kDHOrxK%2BIGr559QFWziyls89Yhag55OPjpTqq2PBvR7hCTLCRtfwhw6PLZw&X-Amz-Signature=af08f152d84fbd4956d92c794cc61fe96ac941bc8213873e722d922b62dfdaca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NXJCACW%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T221539Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCAUV5O%2BQzZ5%2B%2BXU%2BiTsU%2F33IlzFsiku%2BpKEDFkPQTfJAIgHWtkmVbBi%2Bjq2sGB87sOe5tc1nPBIsn9xLK%2Ft6Q16VIqiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHflojuac5UUloh0eSrcA0NLQCQ55HAvj2GtwcL8VQyTXNHVe0HQf%2B2%2B1g1EnXfnY4AjAIu%2F0Y4L8%2Bcz5TQDS8HYKvetpcPReTUMKtkjCRSCT8ommDI4ZFMXCQzQYgW2jgcDXtavqyj6mQBwaSYQFsBYFy3AzgA%2BFau5%2B69tnWt4ViCLFVqZGJuEBPBJrphJhvvoF92%2BqXZICces4rn4qOE%2FvJTmFTjGpL3%2Ft%2B5eokG4qdKcmxRHsU8D4bSNvhA5tt06ZDmlpTwxGsGz0va%2BMvr5OI%2Fmqp7JxLZfMAwfQzuaCkbcz6c6oe99ElsUrTMsIfK94fm1HPdsJOUBoWK2ZpNaZhryV0%2FCwwZ%2FmqnlxVfLBI8OzGKW8JFt5JoC8RgMIZIGAfSdyZpUekCXSE60lEjpjWwUxPsmJwfzDxioIoPzRapzc79nu3nzjXGKGIRzo97eRCxiYUPYEaetReDLR2zWD76XUoQNPOfSBHhQRLzarGNyOB%2BstkKghTX9b57TmIzE7eEC%2FwDmg5n2C6S%2BMZ05IlW61aP56dVZAfFQTQ%2FDOzkHcgNtHSlCtj%2BXuRmlvNhMbVp0yfYP0pZy4rCOqdu%2FD0gE%2FKLx05%2BEqYH%2BgaMQeh%2BJb0%2B3E%2Bai2djDqdLFZHVGqq8iaVwFvH9LMJzvl80GOqUBjPLREdEvRHEayRvJJMYVqYAn2sPaFxDrsPra2bTRlE9DpgzWboOu6BIvaoCnEXauiYVrCGTawhVtLXg238CJTlWPwGQqkyyznkh8brIUKwIKGMhbA1hS7pekBJJjCdjmgFBysLtygEEMS5GT2%2BGqgLNZyyZUKZCj4HG0UTBQW2jHAdK6oEGcufaL7MJFUn7C8%2FrbLMuLSq7VlIclgJBnNTYRY4WW&X-Amz-Signature=8e56135069a2b6d9fabcc1642d64897651078225b940cd9f9fa46dc5d2af49ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WY6URDMH%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T221541Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBMI9KvvpZ4lj47OSa8WHLzsg5ps3b2U0l4ogwFN3uDDAiEA3IZF3V%2Bnzwrgs3DTLzy5EkMws5p5yGc0DPhM%2B5657RgqiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGUd4jagjhadOD1ysSrcAzcakQwUBE5n7vCVuU1XezAqfU5vWZApT8nxGK494o16bdlEp7olvxLrakHkJBWA7Sqh4uHdCtzo4DwJX%2F%2FXJ4UAmy%2FJCVc84gTlP53ENGWn4C%2FAQlcaqGbG4XKS7pGFN1p9OxALvINUjCgy0t%2BMyKd6%2BoF%2FRd7aHNuu3FwAfO4w7fVV2pOj2O82fPbwNEHUFcOYAwShHa6ya7mlCsE%2BNrYpGiRmE8ph56F9nPlYSLn7y1mFA0JOo4HRPWhAJc3HNpUfCl4t8A%2BkW786y%2Blv3FcUV420NdP10djHqGsfssQXCON5rhPeDUnABvLAYXE908VRrGIdAdh3dGB3%2Bd2AuJ8M44kpQB7t3UdOHRPN4mSDC6b0HLFCDP9KqIObWY8DbbcIiItsEkfLWGA5MiGO%2BeTt8duTqRO56MTDAD0XQnYgvE8HhHJch3oxbjnwd%2FEuSEW9UcgSs3lnSwPQRSDFiX4i5A2UGM8c3KNCKvPRFEjpuFIR%2FK0ZD63%2BVpPmYAAQpXmFPOARK%2BY0Tq6nVB%2FoIUSDrNP2kTM%2FPintPC81XltokUrL9tTPJ5p9dQgZjglvsXCmC2RbFN7zb88a8ArlaWF9CqqrYc472tdxyyyUnSdqJ6yWQwZ9KWVxK%2BfoMKnul80GOqUBHAovh6zSAMwK16e%2FaXpD5eDBjGzG2dRH9mZpMNRiJI7W1Uv8hQX9h57lTKXCkY52srC2Z%2FBu6eIU4h5kQB926GSIyfye9ouxvaDmll%2BPXCd%2FhLxUy3BxZYWAqLdYotIlQIzamwQgxDHYRVHkVt76DDCpqjNBhnD%2BCfrUabiBwBWZBLV072KNqRcNYf0qNLW9PrDHpJxaicTGdZFc4AXp%2FUQxL8cf&X-Amz-Signature=9d9db6c8338013b63d3db35c49e0a9a0c975497822df2d7d9afc6ba6db19a5a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCN2ZEDS%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T221542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC3J2te0bIHHp8KJoYHq4myc4s7VNXhuS5R8kB%2B67jZewIgXJokq1A1va0SITNH21s1DRgkum12wZlPBTGmEesLrhQqiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEbIyK12udET7gzWCyrcA757VSOozS%2Bf0uLvMkAKBfYs2S2R%2Bg%2FUKqRoFMW6MhWWJc1l8gaHsMEzeio4AmsTPpgcqvS2PfR3K36iCKr9SgsfYU%2By7PuKvWhIUNUZRqTYyXri%2BLZ2rBm15e7Z%2FoS6Cw9Ur5xLX%2F4o2MM3jZ9I6h%2FzT4Fs8qFfEUQ5m3sqd94S%2FlCRk8jZJdhr4K3j4ksvmkoIrvHtr0VqKF27kHxRwS9X5FWoH0unyb1BD8%2BypbfleOd6fXMY6tS1ix%2FuJzu5rwWIE1rJL7qRlgrCnrZEEIuF1fc9ge3h3gEOTJ2Z%2FEhSqlMa3u77Tsxo59gwhM%2B5yE0evjrNAZHmyrhpOZQjb7wpvibdyVyXnQ%2BpMtGJomkZZdG8ZiIAa0%2FOguGJewRNR%2BG8O1RR8aDVuuFDsfQ4%2BXQz7NgdDByTl%2BuYSNf9hAwxHL35K8McxItds9fXBdUMLWgogFzGftiN0QFMrAkPv3z7woW87G37K9ercFaXKWga%2FufloTjzxBDJjQREmk7sc1hwlaVi6xTFvgzmjKKPyaywmgnLvGzNGxWzcaSR3Wn5s2TZG7YuGK5JWwak%2F%2B4kuyQPxMFWJaK9Ppwkf2IQvcbyufcS9pwt1aoyMnUyqOdag3rc1Z07gIlMy2FnMIDvl80GOqUBJkfjkSWqBc60namNa2tVPf9v1Pa8x4apAXjgoO8J1hoX0NOVjszpYgKKI5zcizST6iyYvsCEh%2BuOyhLgd0x%2B6guhBx%2B8TKpr0btRLgPyUMg8peMpkl%2B1K1yX4cBZ20c2ImBH8eqlbWEUlvke3%2BW0iImMReGgjhGVxTwZSh642n9Fuo46UxZR0a0HEzlsq%2BD7jZXn%2FttAj71R2NIfFnXD4XvV01Ru&X-Amz-Signature=0d81a04b7d845fa868cf8180ce22fb0d50b7da65e378d13cef890c711238ea01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCN2ZEDS%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T221542Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC3J2te0bIHHp8KJoYHq4myc4s7VNXhuS5R8kB%2B67jZewIgXJokq1A1va0SITNH21s1DRgkum12wZlPBTGmEesLrhQqiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEbIyK12udET7gzWCyrcA757VSOozS%2Bf0uLvMkAKBfYs2S2R%2Bg%2FUKqRoFMW6MhWWJc1l8gaHsMEzeio4AmsTPpgcqvS2PfR3K36iCKr9SgsfYU%2By7PuKvWhIUNUZRqTYyXri%2BLZ2rBm15e7Z%2FoS6Cw9Ur5xLX%2F4o2MM3jZ9I6h%2FzT4Fs8qFfEUQ5m3sqd94S%2FlCRk8jZJdhr4K3j4ksvmkoIrvHtr0VqKF27kHxRwS9X5FWoH0unyb1BD8%2BypbfleOd6fXMY6tS1ix%2FuJzu5rwWIE1rJL7qRlgrCnrZEEIuF1fc9ge3h3gEOTJ2Z%2FEhSqlMa3u77Tsxo59gwhM%2B5yE0evjrNAZHmyrhpOZQjb7wpvibdyVyXnQ%2BpMtGJomkZZdG8ZiIAa0%2FOguGJewRNR%2BG8O1RR8aDVuuFDsfQ4%2BXQz7NgdDByTl%2BuYSNf9hAwxHL35K8McxItds9fXBdUMLWgogFzGftiN0QFMrAkPv3z7woW87G37K9ercFaXKWga%2FufloTjzxBDJjQREmk7sc1hwlaVi6xTFvgzmjKKPyaywmgnLvGzNGxWzcaSR3Wn5s2TZG7YuGK5JWwak%2F%2B4kuyQPxMFWJaK9Ppwkf2IQvcbyufcS9pwt1aoyMnUyqOdag3rc1Z07gIlMy2FnMIDvl80GOqUBJkfjkSWqBc60namNa2tVPf9v1Pa8x4apAXjgoO8J1hoX0NOVjszpYgKKI5zcizST6iyYvsCEh%2BuOyhLgd0x%2B6guhBx%2B8TKpr0btRLgPyUMg8peMpkl%2B1K1yX4cBZ20c2ImBH8eqlbWEUlvke3%2BW0iImMReGgjhGVxTwZSh642n9Fuo46UxZR0a0HEzlsq%2BD7jZXn%2FttAj71R2NIfFnXD4XvV01Ru&X-Amz-Signature=df377c25f39d93dc073901c91803f36e76c0cc22dccbc613d6e239dbccf438b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VWANXX7%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T221531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIADVsNg0NmgO4O%2BfHB%2F2f5QDyoE6i8pO1DDS6%2F2ODpNOAiEAokAok8FUSuCtOl2DlkRKFxovf2mrmuTQ6ImH%2BCfOExIqiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEyjFjwDKWhbbxsi4yrcA6vaEDvGKVTj%2B8KeB7ZDyNPcfC401jawO7%2FRIfWta0belJO%2B94K8r%2F%2BBYhzY2XY4Qp3xK%2B2CzJ5CxGOsARqnl7hXJ5UzvswdSdjPfDRhZqbTX0efgKvYoVzzick%2BmB9TPEXspgMXi%2Bw80tXezj5Wxn15a%2FpqMa8G9owdjCGMKAH5wAqarJCT%2FZHnohrhFH%2F473Yh7P3njk%2B5liuK9O%2BBQ8rUz08jRzfp9NkqsBf79QSnCh2%2BLkpqai5fazqxHdIo9LWBkZ4OdboL6urKVUzJk9ZzU7iQKrp635U7JwiaOmObI6yDdlwzYJhyqAZnJjQ1MghBvrXQerKIJXgIw9JcxleKhZ%2BYdNh7sPZ1%2FalDfP3xN6GMKuKje7znyFmDyYuszb%2BYJM8MRCcSK7MWcR%2Fp8lwhldaehi40aL2YGIaScNOQuREHk%2FzCDePLfB3HrqDPV%2BgPQ59KporBcUhoxJ6Wrg4KfiAvjiSO%2FzQq824DuOJb94QlPH9JmsGzIR6hzWx%2BcRR48WXxteequrZ22uEkkTWQBaoB%2Bu1tI0ttEiNihvDBuDvAlfijJtOmWnFebNePWozB8lUqe%2FbuoBD4cE0xXyuG4e8%2F1iiURRxIvsAni%2FqOF8yNd%2BQW3o1gpv0bMKjul80GOqUBpatsyUjrKd14W4WYAGTAkeYyXX3LKVZatsFJMjbYL2zDg2CC55XJedAk5YI5jp5u%2BBuqXbQBXpe13ZEo4%2FHL2X5D1DiwIvYB30Pj%2BVp2r%2FZEH10pfeLuPIb9O%2FihVIDoGZF9rR7xF%2BD1D14iCDRC%2Bjd3%2FQF7CEiD6%2FR%2B1fa747HQRemHcu8z7Aq707kyhDHuIG8e66RuEgM27p2ZBh1jqovt3Qoi&X-Amz-Signature=d8f3b3f170024134227bec5b1f9753e941fc42c5ec5e0f6786a544a90051ad0e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3JYCRQY%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T221545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDKXPlGJicHWoxkLUX1UIoUgzvayEkhWrTK8dZ%2FU8S2pAIgPn%2FyyELW91rxHsZfkcCkoW0mNqYg8IahOsm9KH1o%2B94qiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOwtreUdOwWu1GTCVircAyhQahayP493AJY8LLG%2B9MyVCwMJJEfzVtyGsiBAneb46f5RS9kVTy%2Bz%2FZdIImoBsmxDPWpJfls15DdpTOCBcc%2FLClzoqmkIq2ee2djIf9xk3pVmQU5O7W%2BTO7TSfFmKhE8QfZr%2Bi8NcFxGQmQ7mlNlbQe1oOESq3AIQzjQAtZROtHvq8YKH05Zz2Y1U9Ws0KLT4HVDVrklm8LObzGnxbHCyvXiKjFRuUWvXdat%2FeItB9r7hgOg8UIOHi5esyVYTtpkNsiOHovPwmSONJXP5S67EzTgqXzITt0JezDtzcSGsEje68o4eNeSNbE6QBxCZE2PD2sEm8Y%2BSwBtW1%2F90rD7R%2F1LdjzgK%2BD77bfqSMIeEXpj5ns46AQGJEbzteiNO%2Br9bcp3%2BiS%2Fz2KAPGZc8stMAF6eIWXkfEZqU7QZE%2B8glWZ61MKX8q0Q0pI0ZMtnS1Gwl%2BcglAD7dtB5fbiw9I6XHqSQUh3g3DYhw2DoWsVUA3%2FMTMYzez4g0Sgghztrcv2DyqPaNT5asK79OaTs%2BhjqoF%2FK4h94U%2Bt0Sdf8cQLPnSQWdyEt5YlYVGxTq76omkt1dDFpwx9lMPfTnNoZIRtUsCraAaZhly7EfnhfNEeyi0afX3m%2F92%2FRDbaPQMMHul80GOqUBIOEi5Ff%2FNcNecqFXmDX402u5WCKt3uujdMOL9L3VjUxceM4WiBRP7t%2FBql6op39gnKYUvZ6n%2BzwP9JpRaUnniBqw8E%2FiDvmF71N9jdUPX3ge%2B7DvLJUfrK86ODdfM7rYGC3pIjPtTXesbxsl2FV4wNfdFJOTYfn4z2L4WzVOywm5dQ6lnxmn7vdxwGswZepjDJYq%2BMVPj10JmtEGv38R3sbZO3ZP&X-Amz-Signature=10239b86152a7f4d2c0b4598dc777f9490658b819cb74262fa4093fd09a23464&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3JYCRQY%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T221545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDKXPlGJicHWoxkLUX1UIoUgzvayEkhWrTK8dZ%2FU8S2pAIgPn%2FyyELW91rxHsZfkcCkoW0mNqYg8IahOsm9KH1o%2B94qiAQIjv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOwtreUdOwWu1GTCVircAyhQahayP493AJY8LLG%2B9MyVCwMJJEfzVtyGsiBAneb46f5RS9kVTy%2Bz%2FZdIImoBsmxDPWpJfls15DdpTOCBcc%2FLClzoqmkIq2ee2djIf9xk3pVmQU5O7W%2BTO7TSfFmKhE8QfZr%2Bi8NcFxGQmQ7mlNlbQe1oOESq3AIQzjQAtZROtHvq8YKH05Zz2Y1U9Ws0KLT4HVDVrklm8LObzGnxbHCyvXiKjFRuUWvXdat%2FeItB9r7hgOg8UIOHi5esyVYTtpkNsiOHovPwmSONJXP5S67EzTgqXzITt0JezDtzcSGsEje68o4eNeSNbE6QBxCZE2PD2sEm8Y%2BSwBtW1%2F90rD7R%2F1LdjzgK%2BD77bfqSMIeEXpj5ns46AQGJEbzteiNO%2Br9bcp3%2BiS%2Fz2KAPGZc8stMAF6eIWXkfEZqU7QZE%2B8glWZ61MKX8q0Q0pI0ZMtnS1Gwl%2BcglAD7dtB5fbiw9I6XHqSQUh3g3DYhw2DoWsVUA3%2FMTMYzez4g0Sgghztrcv2DyqPaNT5asK79OaTs%2BhjqoF%2FK4h94U%2Bt0Sdf8cQLPnSQWdyEt5YlYVGxTq76omkt1dDFpwx9lMPfTnNoZIRtUsCraAaZhly7EfnhfNEeyi0afX3m%2F92%2FRDbaPQMMHul80GOqUBIOEi5Ff%2FNcNecqFXmDX402u5WCKt3uujdMOL9L3VjUxceM4WiBRP7t%2FBql6op39gnKYUvZ6n%2BzwP9JpRaUnniBqw8E%2FiDvmF71N9jdUPX3ge%2B7DvLJUfrK86ODdfM7rYGC3pIjPtTXesbxsl2FV4wNfdFJOTYfn4z2L4WzVOywm5dQ6lnxmn7vdxwGswZepjDJYq%2BMVPj10JmtEGv38R3sbZO3ZP&X-Amz-Signature=10239b86152a7f4d2c0b4598dc777f9490658b819cb74262fa4093fd09a23464&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7NHS2EF%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T221545Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCu9uglfA8yfHFPJheMv2orubveTpjfCCg5W%2FdEdQZQbQIhAMFhT9c%2FVmH4ZkUXPrDGN5kywgBgSBhPb5xF3nvlvh%2B8KogECI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyQzGdt9p%2BfFX4eqcsq3ANH95h12WCkb9FmaEBO9tOkyP2JUi3y1riHy4Q3ZL5IHwoWoFbMSlqcjsCREaN1A6xFD8BWiWpVtSdN6z2uKN4Hma%2BKifC0nuo3ZHI9aKZx6yE99zzOBRf3sJ4ER00N2S%2FM4UlE9NKNu74DH6N8WSvweCu%2BOpiHLhFYgmHyqEBLRmoG7S2dm6jnL4ipe474myNvXFHi2JEeBzBi2N2PAy5cmLkIx7a70DoynXWPYYDoZZWDZvqLe7vMuyahrza7crb5jPyRTHLGA7MJ2EVG3cfiDSlXGechdsY75fXObFdO%2BzTN3dlI1Hr6NC8dvf9uoNIdRe%2Fb3tmPhZHssPjtJwT6dkQilPwv6E1w3Tii1BNcrehMP4dIVHZLAif%2BWlMkeqO8MjtCzNM8TpmMlty6265xzFPOR0nn5MyFwPzTEeWJtFMuJlo1Ef4gP0pghtTVTBm3ZKLTw%2F9YXBFrQSzGhkjTW7FjYIFRmXdW3RoYc9GH87mD2Kni7t%2BEiZRXiNik8e6T3R%2F9YSLeV99jFj1L340sGXNeWFhadunCP0q7XyewnyT6tVp0fwf73LYkjwPVzzpTO%2Buj0syvcb9KYrIumr3sG%2BeoIqMyiAhV3%2BSOBl1I%2B7ZEt4hcK8UJTXtV6DDc7pfNBjqkAWy2Gu9zT0xnJzlFUbyUOT7WybgwZqghDLdgX9e2r%2FUzouinrgM72uCeqyQ0RkEKTVycD7mowrCWYyhiQz9jmwiu21opw3lStnHkUeS3KsatGOPqZASpWL8Szr7PT2Rq5sFwCOoeU%2BmhSL%2FYlfqN1h6EPqUZmq4TOy7wPAmvUBmDy8gEFSyBxbWPXDGt6FKVcwi%2FbG0MAzrgK8OqrgYH3YGG0UMy&X-Amz-Signature=034f480ca949639ddc048ea5e31e28f372ea5b9a3183897c8cbaefc6d8b5c9a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

