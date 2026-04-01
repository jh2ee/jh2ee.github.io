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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPXIMOXX%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T222246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDoevNXowA2I43W021KOcvI39BQg3NZ26CZssPZjf7CaQIgZz6FCsf1X4js83F1vTFsuhJbhN2NevQRMi%2FcytNm53wq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDGp6V5fmJZRn497T8yrcA0pnOKHCts9fAxL%2B5dJaPN0lbtD5o0VIwHkPuv4wt6isGrLv9WoWSJNpshweYHPvSI%2BKSYuHoNODJoJ8bQXPqnmigQ7UBh5lJ71%2BFPwQF1Hu53QbTzcLlNevbrYJ43tyugd%2FgkI%2BS89XAN9TV%2BOi5p0qvEoLB3yf4o3L1Cqn7sAwvfIeJzaQayPGuh0IMCixLGJL3XBCtJJTNpPxq%2FzY4yHeIUE84nr5ZMPjXm41UbPgRaXw%2FQ4%2B8xusPDvgPn9X6tiFtETb46KsIc9Eg%2FjoUpakD2EuHdKLp89gJyU92ufhDyBs2%2FC6tlegolB9nawZobxJwku5l%2BEOH8CGKcNNo8TiV%2FuNCqLOxJLFE4ePg74fa8rSFA%2BopBMMeP6DcUf9heXCDDEeEXr8pEhMNxqi6Sca5rEKmYujeCzNHjSMX%2BkMvVkGldt%2Boh6pxeMHQk6eD6Sv%2FuOYERdTIhSbXLFHwzg92UviVg9aWnkhOs1ZzSvyxQoEzUtCgoW9jh3cXtojQTKDmiHSEiAv9JabeSk9YwnwfClFZuRTZs%2BF%2BIdue%2FdJ60byzegE5ccz5WlIprhpmjBXJ9nqa5l7zi2aF0mbYCUZNn2I%2BMjCGhXvdU%2BHagwH52oklec7teZ9GH%2FnMMeNts4GOqUBJIlKGzxXRJI2mnUet4HymerfbMjomHJOi81rb8yCnG20sJkPsXAfxgmQlCR6r%2BxQnBQnrvcwO4uRfcfUzR6H2ALGTSoIoTp2e%2BL%2Bf98wif%2F2ab7UUsQ7mAf1JZRUMtvMfPNvQno7UkNhKo%2F1bLnC5iYwzKGh7RHRLv1TFKTQzKoS3BBBEhiQDW2Ie8iUZxjDNggarEa8ExGmvfN1WeGu2HS8t9Uy&X-Amz-Signature=d7b19a5415f2207fab87d05b820b274310d2f54890b5f6f78a5680d65cb356dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPXIMOXX%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T222246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDoevNXowA2I43W021KOcvI39BQg3NZ26CZssPZjf7CaQIgZz6FCsf1X4js83F1vTFsuhJbhN2NevQRMi%2FcytNm53wq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDGp6V5fmJZRn497T8yrcA0pnOKHCts9fAxL%2B5dJaPN0lbtD5o0VIwHkPuv4wt6isGrLv9WoWSJNpshweYHPvSI%2BKSYuHoNODJoJ8bQXPqnmigQ7UBh5lJ71%2BFPwQF1Hu53QbTzcLlNevbrYJ43tyugd%2FgkI%2BS89XAN9TV%2BOi5p0qvEoLB3yf4o3L1Cqn7sAwvfIeJzaQayPGuh0IMCixLGJL3XBCtJJTNpPxq%2FzY4yHeIUE84nr5ZMPjXm41UbPgRaXw%2FQ4%2B8xusPDvgPn9X6tiFtETb46KsIc9Eg%2FjoUpakD2EuHdKLp89gJyU92ufhDyBs2%2FC6tlegolB9nawZobxJwku5l%2BEOH8CGKcNNo8TiV%2FuNCqLOxJLFE4ePg74fa8rSFA%2BopBMMeP6DcUf9heXCDDEeEXr8pEhMNxqi6Sca5rEKmYujeCzNHjSMX%2BkMvVkGldt%2Boh6pxeMHQk6eD6Sv%2FuOYERdTIhSbXLFHwzg92UviVg9aWnkhOs1ZzSvyxQoEzUtCgoW9jh3cXtojQTKDmiHSEiAv9JabeSk9YwnwfClFZuRTZs%2BF%2BIdue%2FdJ60byzegE5ccz5WlIprhpmjBXJ9nqa5l7zi2aF0mbYCUZNn2I%2BMjCGhXvdU%2BHagwH52oklec7teZ9GH%2FnMMeNts4GOqUBJIlKGzxXRJI2mnUet4HymerfbMjomHJOi81rb8yCnG20sJkPsXAfxgmQlCR6r%2BxQnBQnrvcwO4uRfcfUzR6H2ALGTSoIoTp2e%2BL%2Bf98wif%2F2ab7UUsQ7mAf1JZRUMtvMfPNvQno7UkNhKo%2F1bLnC5iYwzKGh7RHRLv1TFKTQzKoS3BBBEhiQDW2Ie8iUZxjDNggarEa8ExGmvfN1WeGu2HS8t9Uy&X-Amz-Signature=d7b19a5415f2207fab87d05b820b274310d2f54890b5f6f78a5680d65cb356dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WW3GAMKN%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T222246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDTYfAvwicpaHg6luKjyzdGX2yTmuXWJJyd%2Bk2iS54WTQIhAPgPqpcfngsCt9%2BPToJxrFh7sFH0evhfWaI13QAUq1Y%2BKv8DCF4QABoMNjM3NDIzMTgzODA1Igx6pmrpk1k1JrbwUJ4q3AOI7RlsesfP7NzzbgfrLrQRuU0CnLOO4yv7kRk0jpve9NyF3RVV01weGrWmjwBWg16sNK0wPaYAyS5VkSis3RpjqPXNlEUUCl5gGXixrD7Ft69cRpOIcFWUFN1JAPlUfulZFGIegS7CL6rEAVIbOsGlngf3EayIfyDI%2BzYGT2D7asEABqSxyyXTellvOsietxGZu7zEFfyFQ1WGoDR3XVr1iZnEpJCfR7u1AJHJDV%2Buow27OUSIept9d64f52g4eVXc0T9SAvCbWhI5Wq28zOk8H6918mYrRDVqwn3ftDrBGyqeVvkUSkBavaUSf0giHD9RNeCWZCprXs6YHxjKQZeKSqNbA%2B8spCJ1WAn6LVu3WtW%2FHlzIsaldJMS0l70gelm%2BO8Eb4D%2Bu%2Fl1A6In6JFeSnwjXQ0y3OQTp7HKNvlwSXFqBOR3Q29U28rw0Xy08hkUDAzyQ%2BFjMgkErtvhmDk6xHJMM%2F20xQPKM1lWHcZdgHBF1buqK6uYDyg5MU8c3f3n3Uu3qUvjx5aAUKQFvuoddje1h9quj2Ja8ppe%2BIg52GqGsDt8md2E96ZxeG4pVhz4ZimHcoHTVFjjA0ufK5wMguRbHqYQ8yrnqUnWZUHWSUlVt6ecWFipV4kfvezCvjbbOBjqkASJyq9hcdSvGeU7pZJcRaLQ6rZzYKnMSZweO4F3IJWnc9DA251euJ9654yLTeSwED02NPxQnvFG9OoqIQ8ncJHSRK6srQMYkLbTGbPuZOR%2FNI4rjrPAVT8Enk%2B%2FSx43n%2ByXRjATtd9wte7WVBY5AmdgWONvkWQzQ9YasYiDoKbVT33BWSDaBnwVyPYXXjbm81TNEP5VjZvLNdAECCh6N79wGaTYh&X-Amz-Signature=d2cf22a975bea28a68b4549be16b684e6796cd1efa11db98a165390bec23ac02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNONZD42%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T222249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC2UkT0J9GbT6lgWgaT27xnGD0oDp5E99mLLCA3lNSAmAiBrhzhyHwCnjAMaErvaLaCYBCTwgAQbrXuddjKTA3kYkCr%2FAwheEAAaDDYzNzQyMzE4MzgwNSIMLbzDFBPvttl%2FMk%2BXKtwDlBkBJBmqJ%2B%2F9P7MV3vRZOxnnJ%2B1W%2Bp5iXhgaVUgZUISnFgkwzb1EIHvlq2xDUGE1MDrZK8VhodDcTTyFQ02bUq7UOoO%2FD8tlSnhBSyOSP%2FNGXLpMagd5fpPS8z7z0UFe1dR2bWIbs%2BbceQlEHqBlulITehUJwjQY6%2FliNUELt1QglU5ydvVpojHqlFSKGfnY%2BS7pwGybS3dr0u52N3KwCd4nWDMtqWC0eFOU5Hc0iS6x6qtyDiocifMvCVCt0dXC%2BOgH2bVcP8oha%2BA6N2FFuVS%2BXEeGAgrvz4c21AKjBYaXWsRMLV4GyLT8YNjRhE6tMnbA1tCkZVyXeEmJirkrdo1UpvknpLw1U1WzIxAd6%2Bi5Q%2FIF45IPAozmVneVA%2BW6YcFdO9ympud2WWe2rAVqL5cp21sOzQbhpwX5jzZJO2zS8aHld%2BYGzEgT7kWnuDk0xQirx9gNdG5zx6naqrgiQ4n%2BzNIlFnoB4IkNgDkd0xYbtlk3V%2BnwqzcnX7HqmgiknJ937G85sYLxf6txWXO01B5yv4zbOQSlCIrPGwsLBcFZFi56UAf8Fdeo73I02UrGb753tgfVUvd2vapKPbNQLuTvxjhTQ6GTR%2FWPWFwtCP0IMZJPclQDz0byLmUwhYy2zgY6pgHjvUH%2B%2BXYvRGBxpj8YBDFtphPgxzQ1pPI1ZSaCrHuvMPY6s2tcNyS9v2zt7HK0qxwRzro8sDtLJQE99MX22I2KXBqnqLR3iVtpDBGoP0Niiy17plHrukEI0LWT1GWf%2B6V4zgvvDAeMDDHt8r5E%2FvZG%2FAi%2Bcpb%2FzK52wAUrlX59%2FYZervyudiJIPHRdo2NeZhBoTh%2BVD2qP7z7Sx45jGzlhQnW08V9g&X-Amz-Signature=3edb8e091bd7db11bf0a6c24205ace67db589682eb7bf07b9e22c430efc9bec2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SNONZD42%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T222249Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC2UkT0J9GbT6lgWgaT27xnGD0oDp5E99mLLCA3lNSAmAiBrhzhyHwCnjAMaErvaLaCYBCTwgAQbrXuddjKTA3kYkCr%2FAwheEAAaDDYzNzQyMzE4MzgwNSIMLbzDFBPvttl%2FMk%2BXKtwDlBkBJBmqJ%2B%2F9P7MV3vRZOxnnJ%2B1W%2Bp5iXhgaVUgZUISnFgkwzb1EIHvlq2xDUGE1MDrZK8VhodDcTTyFQ02bUq7UOoO%2FD8tlSnhBSyOSP%2FNGXLpMagd5fpPS8z7z0UFe1dR2bWIbs%2BbceQlEHqBlulITehUJwjQY6%2FliNUELt1QglU5ydvVpojHqlFSKGfnY%2BS7pwGybS3dr0u52N3KwCd4nWDMtqWC0eFOU5Hc0iS6x6qtyDiocifMvCVCt0dXC%2BOgH2bVcP8oha%2BA6N2FFuVS%2BXEeGAgrvz4c21AKjBYaXWsRMLV4GyLT8YNjRhE6tMnbA1tCkZVyXeEmJirkrdo1UpvknpLw1U1WzIxAd6%2Bi5Q%2FIF45IPAozmVneVA%2BW6YcFdO9ympud2WWe2rAVqL5cp21sOzQbhpwX5jzZJO2zS8aHld%2BYGzEgT7kWnuDk0xQirx9gNdG5zx6naqrgiQ4n%2BzNIlFnoB4IkNgDkd0xYbtlk3V%2BnwqzcnX7HqmgiknJ937G85sYLxf6txWXO01B5yv4zbOQSlCIrPGwsLBcFZFi56UAf8Fdeo73I02UrGb753tgfVUvd2vapKPbNQLuTvxjhTQ6GTR%2FWPWFwtCP0IMZJPclQDz0byLmUwhYy2zgY6pgHjvUH%2B%2BXYvRGBxpj8YBDFtphPgxzQ1pPI1ZSaCrHuvMPY6s2tcNyS9v2zt7HK0qxwRzro8sDtLJQE99MX22I2KXBqnqLR3iVtpDBGoP0Niiy17plHrukEI0LWT1GWf%2B6V4zgvvDAeMDDHt8r5E%2FvZG%2FAi%2Bcpb%2FzK52wAUrlX59%2FYZervyudiJIPHRdo2NeZhBoTh%2BVD2qP7z7Sx45jGzlhQnW08V9g&X-Amz-Signature=21b6a6d06d89312dafddcd5656e06bba71e554ad7e1e7085b6f7cee6cdd9fe13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WISO7ZMO%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T222250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCxhtq%2FnrL5xSnbn5Mj3V78pRVuTZn43393WaetDPVwQgIgN849PfLUiK2cKDs5gAMdnWPexbdFXahK4PcRDpXNi8Aq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDC9G3SAMs66aRkbyFircA4IKm%2BAXXZOrWAKQjtn8rb%2FG65K2K0Rqi42zywIP5bO%2FKcLZfcYLXTILGcFp9v0FYMz1ZXGMKXbddkHuGxvu%2FdBKW5%2BbghN%2FufXARWQa5Svx1fXc5PKuID92HBWSFDk3X1Yj8f0Ug70hH%2FZSOpiLGh4N4xFWEsY5nKJDV8yRw0Es2RbI4YkekZI1tv%2FDAOPJhcfT0mNe7DOGLMSUvja7atuEcgvpoArcuiorz8ROjyQJAqeLuqWZw5W8O18aaMUX6L70sbmbmqij7KththGBDp4hW%2FD8rN152EH47I7PCUvZi1nQGGlLgTb9px7id0nTDLIuuTiL9Mzg%2FBU98WIJ1smc8c88XkI6RNYmTsUvXjmy%2FgnlrWGcrxx9xMTKR8xfXVv8ANmt1YK1THywcgrUpg7YATA8nLfurw32uosM7Pe9O9VA9qXXxlmADIWW3lTGZHk%2BDlOhW8z76R2rZwS1Ob6Iv%2FSf%2BoqgDV4Oj4r%2Bg%2BCuB4gv%2BHnXEryjii2v%2BKmoeblRwyg%2FkqKhFP6BijjrQeFB0NTw3cUNl2gdP9FGs6ITW4rTUHO3o3EWbJi9rJR90BhGrMXL2Oo14D%2Bz8DV4CDzAYVX5BBFbR9f%2BgntlaKPxCkSWWerI%2BS6tgo8RMIyMts4GOqUB8OC%2F6M7abQ5toksccxeRndPDrqbGp%2B%2BC2UuFWovd8fr4WaSVlWXcKvQr6coPE1i6XnsOSfZ7qw3m0BRkVe7algK9MkWHidALzBLrhFSOF1WdkyoC8kNU2LcH%2FF%2FO1WW83gpRzHRb1Huf%2BCYt3hSXkQdzqW6JWU1OR%2BaZ%2FcLJYzNhhms0hwnIRIBxyuTXJMRlDDlJuAq5IIzg%2B6NuK7Ww%2FRm3Sp8S&X-Amz-Signature=5585080251dd97433eaa24c5a5be77118cfc70ccb24b2edded6a696b9c59856c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YWY2MM6L%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T222250Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFn6JNm52g8HT4oj5jsXFDJ%2B7aRAZIR4kfpooMRjvgauAiBAeiNtZoeXmaO%2FW0OGalZUln43UMWUoi3OoUimr78Uayr%2FAwheEAAaDDYzNzQyMzE4MzgwNSIMCleJIIjSOfB5OV2lKtwDL8Qj77c86shapbT8cUiUjBYLgjtcqn%2BN9Qn2vgRHP7onExYAXudE1Q0AKNTIQiBuCWSZ8BvWpdHVtfPUr1k%2BKsBABcM4dTCJA%2BJ42JCU%2Bc8l4medtF3hHbgTCfWcp%2B4%2FN5E%2BNUr8x%2FiXK5RfREyKvQVg0W774jKadIS5q20W2XaaNrdW9rRXRtR9XUAVfEs5ak4a135%2B%2F8tsSyMQzCGjkOgnxNPMKRREX8ZFzM8kzPv7UYnDwNoHtH81Joqj1iKNJhphEFHrkYRqsRRJbkQBaUz%2FEgynH5eyXN30Baxn0psDd%2B7DeOgrnEXY%2FqKjmntCAlNwoGs6cJ1kB8AHlsu0X92nWaGz%2BiGSs7sS28ZqL8dVnEQRKNlNi27WixsDq5ldA2SS8iaQB96fBiLgol1Ve32dXm0lGqeqxhVn7Xrsxze0DCO8pkgBz%2B2Dr0QxKVcpI3ughjrqvLMbadBmBHoke3EpOAoajK6n8hEeRTEXcMyUnJzXEg%2FGCT7GYWnzQ9AkvMFqx%2F0L76n73SKjR%2BX035caenVZ2ss1iROojTcBAYvMYRNZkkpCkpZ3Q6q4j3uLoI%2FWMHOaiEKhqIV3NBwXADH75xoRiE2a%2FEn4edoZSgSvTPYLzXOgQvNwLH0wo4y2zgY6pgFcpKXVkn9VRClOODhtymI09iUmeiQnVI%2BInUSj06SC3K2B4dNwf8Cb3ZlZEtR9Cnp1QNgFH8mp7qYSFzFbGZpo6gTpuG6gzK8packxORDb8quACRhsERCjkp8c3NIZPX6FP7rTJeEB2Pk6S7BJyg%2Bq67%2F5I%2BV7olq1I9JBqdX0I9YwvXearANLpRhWbydnEqw2yPLNHd7jyJ%2F2tXG%2BfNxpJY0MJqW6&X-Amz-Signature=eb9abd85532ab5977aae005885098d392ddaa9f1d9519288b3b992e34ef29952&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JNCRGKS%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T222253Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDojqpkO%2BwuSnDcSMTtvUNrXLza4nk9cEqAAfSmDDOggAiEAgmkNJTn0cSNJ%2F%2BAEgND5uqWUvHieBqw0HcC23OPsq7Yq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDCzl75HaQNTwNaPIOSrcAxigjzqMLwOxKxHoWvWi93YIml%2FWPtfnLPyVnYfqqASO9XPIt%2BcUIdzyoAbP9Kwpa23YkoWoOrzknAv1cjVX0r%2FVQdB8eyKFEWeQ5JPqpXYGssj9y3tqcGzXYu%2F3BjBTRB8Svh2L%2B0XxGb%2F204aFcUP6OQS2yocXzVQd6ctUi31Fnb0Q6q17%2F5MECGcKX6bayYO8whNHZ0n18iqkXu1EV5sE0BDGuIxlSsSIDyNg8srIvKNiI%2BOVrNS2JuNxH%2Bg2N5mJvYD%2FFe%2FLV7AheQJw3flvXaSr90x7GVh3H9vtiMPqwDZKJlJ9ua%2B0bNrYNeAnDj9q87KVSfFc9Ozv%2FDBDwUeZ7j6t5o45PMe%2FD0poF2OLXNvGXnQunvfbUxfffIDCMD5%2FlTcWvzL4K7VI9bSGQ4FSIUEVwnWAaRusEjzlyITLgrU5aGqKWf47CE8jTZNfjBLXyi%2Bh2ylF4UCd0vEWMbqtXHsE98P31Js0K9fFTnMylp1eyf9mXHGhLohvycxAEO5qEhPFiZHxvBiuXGR34iAfQpi%2FgCoEww2OW0QttBl%2FuW%2FH6EGoNUwKUcUJ7S4cRfMJrZ3CpLFGX084COyXQAFaPxk0HX9bcKZUmUaOD8f6E4FxNCt5ghk0esNfMMGMts4GOqUBov3qtRU1arZnZhsAmIqPZVPe9WMLH8hFbKRvhSIwcNBvPKOZRrGoJiITw6dp0%2BFiNW1OUscmaKhFnaxs3qALm0ySsNZfp2%2BZhnrgpZB5c%2Bx6mcaQYEa18aJkFPGWS7fYPY6dTxAhI3IhpehHAcq%2BmEHcZrAmxAiHe1IqzZvrEsg3tB78dFOrLIx8kOIcRSmjXZZtmJNgc4u2cEo6KReAAcShNkDs&X-Amz-Signature=adfe07b32c5f42d1d619c7bb14ea3482ada2308cd7857bf894b490172da4c9cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZ7QLNXT%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T222254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDTfDQyLoTU8iEAt%2Bx%2FJAuPSfcF%2FbNcUpSm%2BzN%2Bkush5QIhAOdlma%2BkXG%2FZlkOVR7EgPK8%2B48sa6gZ60yWXe9P9bQFDKv8DCF4QABoMNjM3NDIzMTgzODA1IgxIY3vkRPZa%2FtKgs7Aq3AMERcM4Dfp6oIlEtSGi1DisuPJ8G9KZz87a6AlMVwLso6Yg3X0sFxuLH3Dzn9BMRPdj3q%2FtLVBmXBrKQhdhfuZxNxWmi3OLDJdJg3MMVWISEjnA%2BIEdQvnJHD%2BH0HUWHJJBX016rKZx76lkK1ZaG6YE4v8iCLqH58oA8%2BNFd3hU%2BPY55steqH6nhqn6IgUSxgfdoPhCJQ5B2LbjqUJE8m6O1%2FnoNNX5iT88%2Fagv1kI%2BjqK0JR%2BcFAMtHx3ADoDJKRbBLu4JOlInhQBDkYLShvpUcnpF5ehMKL6GmdBeKu6Nfa2MGpgmor%2FwB4SQ7eclmyq7SoPc3Rei1mmtuM3TJFMycoiVxbDCdHNSgddgayPy13Epzk1IX%2FWaBMyiv3qmxldi6hYkm7EBUXVVoDbkszxw4C9YZt%2BzZ8b95Zwd3hl0%2FUrUTC6kLMiqkpQmGGJhV1VtocQYH%2FzCEjeHsziy4Y%2Fmy6W%2BL8r5N2%2FE6ThcfkE8JFijwBmiTiLJesXawKmW%2Bi9yfo3YT0xlJt%2F3KToRx4C7fB6RycDTpUruB0QvU%2BoCFfQTpHc2B4FGhev%2B2Jmbh8RbmgED0WGDbzgBMB2LxLNCr%2F0IGbnMBfjN6vdb7PC%2BbjePSInzxMpGEd27rjDjjLbOBjqkAbF8uy%2Fi7irVMp2Zn7N1YzLqw2yZPfGkWfXqoju80tovd6r3rVgfy8ekajrSdCqPltBoi%2BakVYlL%2Fv%2FgabhuXy%2BG%2Fqz2fxhNDsUkk6cDV4j8q3l%2FPXiXXeXjM4iQBjz2gNf9z5bKloqdcwDc50kg6dO7X9632oUhRhHaYp7%2BG3mfkrBbxD9T9kV7P84kIGouJlNWRAwh6Fssc5HzYq8aJFy%2FPMIh&X-Amz-Signature=574e7e3d113815d90ae204f5162a1c63d85d0f18df56e17ca98f8f1369233f85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZ7QLNXT%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T222254Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDTfDQyLoTU8iEAt%2Bx%2FJAuPSfcF%2FbNcUpSm%2BzN%2Bkush5QIhAOdlma%2BkXG%2FZlkOVR7EgPK8%2B48sa6gZ60yWXe9P9bQFDKv8DCF4QABoMNjM3NDIzMTgzODA1IgxIY3vkRPZa%2FtKgs7Aq3AMERcM4Dfp6oIlEtSGi1DisuPJ8G9KZz87a6AlMVwLso6Yg3X0sFxuLH3Dzn9BMRPdj3q%2FtLVBmXBrKQhdhfuZxNxWmi3OLDJdJg3MMVWISEjnA%2BIEdQvnJHD%2BH0HUWHJJBX016rKZx76lkK1ZaG6YE4v8iCLqH58oA8%2BNFd3hU%2BPY55steqH6nhqn6IgUSxgfdoPhCJQ5B2LbjqUJE8m6O1%2FnoNNX5iT88%2Fagv1kI%2BjqK0JR%2BcFAMtHx3ADoDJKRbBLu4JOlInhQBDkYLShvpUcnpF5ehMKL6GmdBeKu6Nfa2MGpgmor%2FwB4SQ7eclmyq7SoPc3Rei1mmtuM3TJFMycoiVxbDCdHNSgddgayPy13Epzk1IX%2FWaBMyiv3qmxldi6hYkm7EBUXVVoDbkszxw4C9YZt%2BzZ8b95Zwd3hl0%2FUrUTC6kLMiqkpQmGGJhV1VtocQYH%2FzCEjeHsziy4Y%2Fmy6W%2BL8r5N2%2FE6ThcfkE8JFijwBmiTiLJesXawKmW%2Bi9yfo3YT0xlJt%2F3KToRx4C7fB6RycDTpUruB0QvU%2BoCFfQTpHc2B4FGhev%2B2Jmbh8RbmgED0WGDbzgBMB2LxLNCr%2F0IGbnMBfjN6vdb7PC%2BbjePSInzxMpGEd27rjDjjLbOBjqkAbF8uy%2Fi7irVMp2Zn7N1YzLqw2yZPfGkWfXqoju80tovd6r3rVgfy8ekajrSdCqPltBoi%2BakVYlL%2Fv%2FgabhuXy%2BG%2Fqz2fxhNDsUkk6cDV4j8q3l%2FPXiXXeXjM4iQBjz2gNf9z5bKloqdcwDc50kg6dO7X9632oUhRhHaYp7%2BG3mfkrBbxD9T9kV7P84kIGouJlNWRAwh6Fssc5HzYq8aJFy%2FPMIh&X-Amz-Signature=2c04e67d5abdf5b2a10e3ebbd2c21ff9bd68a43131f4301184066a7c0330b529&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X3TIRNSS%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T222244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDKd%2Ff2J6pTykfkEZT%2F87EFPAiSmK2GqbfAl897lGuKcAiBBk%2FGSWHqvutWjcg%2Fb91hHMs42WYKOLu1wHQOy2zsltyr%2FAwheEAAaDDYzNzQyMzE4MzgwNSIM%2FWGu1SrRCDq0LCKaKtwDLW9TLMwZgeOkLmt3wQy8h5KnatfoS5xjL0VhsMuTpIl5eJ7ZYpNT77aYfzGoYnDDoMohwTM29Z2GcOxGQ8lz4P7Dw52bnGpvPsNgaOqJRzcVDfWHzgEdOMj6v3aGSEkpnQKClVyZzH8nELtlrViAm7e43X6wQdD9kBnXhZ8UVB5v7fmVRCVgSXqbLvgqhlDGrkVhgWK%2FjJSXZJpl%2BhOtjJxnYS0eqLPRM2IhELVtnFWznq5PihEXje47m6ObpzFgz8dqjPNJbVHW0aeian5YgUwGWToG1VW0%2FX%2FnPSqF919uZ7Jnp8zmQbAkOLzd3vtLQZmgMQd%2FZgy0CHvq3v0UZ%2B1Uf8xrlPP4Eo2LLyNcmaqVOXKrW9kEHFtwxs7opnM4pz9YzYaksJvTVl0RKEKJPGFtLGo7mclBxDrEmgBlxOiFF%2Fr0ElcVAOss5DehPidG1RyGBv09YHqqVXsnfjomHs546ldXfTPBzbus1uSbq6%2BkK%2B3XKQys2w6hrcbvjV8CCeXyzN%2FiGGQlxh4ckYH3kDce8x7IvxDQ9xQE%2FTbBSTyrsTiu17Npq%2BWyS3JG5DyVP65azI%2Fc3m5HVJJhTSFz39LN3%2FR1%2Fx%2Fmij7afwAyTtlKOcXIWGtoXjec1fYw%2B4u2zgY6pgGRt6gUCnkj76EYOm1WY5VxKyDT6KSv140U3dx5eS%2FgEY6dUfwf2oxqkBPScqJCyb5qvT8S90QxyZmBzW96JLmSGDOOG4sFalaADgSaKBhAnln1yoZ5CNl%2BIqRDaE8ZZ%2BTWDr9IHX15MIks%2Fpnk9LMy85N25t8zMDwxP6d%2FTeUC33urpY91092zTDk7hlH8PCzPiing%2B7vK91RBpEmhR7Jje5qQkl3o&X-Amz-Signature=9edb6d880b38f795aa094a66ca6967e34a2a966c96e6599a72dd16c0050408f1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SU6E2IBY%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T222258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEhU9W9iE2RwS3zK%2FHPWUv%2Fpf65er7Zn83y3U%2BLax7aNAiEA0cBn2OJ%2B%2BvUaZC5BztMK6e2c3acuVnNgQlGSDNvGbccq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDFhAJGbeU2ijT1ugRSrcA12Uu5GMypiYAbkcYR1PHyxGv6C1qoz2bqgicwhIJK5gWuWKgA1b9oWVhlW2nGEyqSIm%2B2Hfn4o5OY9DGrdgYLYOUYKVsa7fXrqIchsQ8RvL8ls2IxtgzNjjo7%2F1myXyOAkr1QyntRfkKEiUcrUJ1%2Bh%2BpDpC7IdZ9wsfGL3PEXEfZeAlajJdrW5nUKNr2%2F5pcVBRrbvpJqEh%2FtT8hdaowiiT2AYJxYBs1XEUxVnoS0ufeGzYBFQ3LqBFnIKHa7vZG3QshURA1TvBfNLEETjrrZ%2BamwFohZbd33lq7eaVZh4EJrmH663jPDCrh%2BUDxh7gFfXy0%2FjC552%2FgaRnLYlr3zUfFPc8rT7RyBxZbHRnXe6t%2FwMk8cjguzLe7SdngZ%2BhjwRoEIiKWt8jgY%2B%2Bs%2FPenEDXtcbiVwWDXtp%2BwUJNxSTxhEQk0TTl4NIi2NjzLPJU8MZNaJvPHl78fzXQrV71mCRBoymPM1oM2yYwVJUiJG3zrPGiU534wJYfigDHga8VpCh6kEXZT6EPJX9C1hv1BrCBPhx6oRJLhqREv85kqKLP7CIqUSCSiJKtdf5WCPe02T%2FEtO364GyDX2Q7xvBUAXP19XZpmiNlcoHzakbY%2B29hvmpMR0p3kxVBkzSnMLaNts4GOqUBTHxujo8NQL7ONn6JrvKq4wUEpcYaFe6jVwzyWtaxRFBGSlCLCzDGhg1X2zX%2BCpyLMjxgpgMXvT%2FSCxAX8hbPLQ7aB9Zqk0k6leJh3GixlzLsN0oL7RL5t%2F%2Bbmk41jh967%2FguTnlzApbbyIT%2Ftq6MVjgMJDJKoQ9O5GXg6dKcQCr4TyOu2AufTubvmEUDOQgA1vgW%2FcQS3aDmaAKAXCSEU1zVe5w6&X-Amz-Signature=f6d7e7ffa5b9da6bf16f3a4126a157200522ece57c51c5cf97e51f71622349a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SU6E2IBY%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T222258Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEhU9W9iE2RwS3zK%2FHPWUv%2Fpf65er7Zn83y3U%2BLax7aNAiEA0cBn2OJ%2B%2BvUaZC5BztMK6e2c3acuVnNgQlGSDNvGbccq%2FwMIXhAAGgw2Mzc0MjMxODM4MDUiDFhAJGbeU2ijT1ugRSrcA12Uu5GMypiYAbkcYR1PHyxGv6C1qoz2bqgicwhIJK5gWuWKgA1b9oWVhlW2nGEyqSIm%2B2Hfn4o5OY9DGrdgYLYOUYKVsa7fXrqIchsQ8RvL8ls2IxtgzNjjo7%2F1myXyOAkr1QyntRfkKEiUcrUJ1%2Bh%2BpDpC7IdZ9wsfGL3PEXEfZeAlajJdrW5nUKNr2%2F5pcVBRrbvpJqEh%2FtT8hdaowiiT2AYJxYBs1XEUxVnoS0ufeGzYBFQ3LqBFnIKHa7vZG3QshURA1TvBfNLEETjrrZ%2BamwFohZbd33lq7eaVZh4EJrmH663jPDCrh%2BUDxh7gFfXy0%2FjC552%2FgaRnLYlr3zUfFPc8rT7RyBxZbHRnXe6t%2FwMk8cjguzLe7SdngZ%2BhjwRoEIiKWt8jgY%2B%2Bs%2FPenEDXtcbiVwWDXtp%2BwUJNxSTxhEQk0TTl4NIi2NjzLPJU8MZNaJvPHl78fzXQrV71mCRBoymPM1oM2yYwVJUiJG3zrPGiU534wJYfigDHga8VpCh6kEXZT6EPJX9C1hv1BrCBPhx6oRJLhqREv85kqKLP7CIqUSCSiJKtdf5WCPe02T%2FEtO364GyDX2Q7xvBUAXP19XZpmiNlcoHzakbY%2B29hvmpMR0p3kxVBkzSnMLaNts4GOqUBTHxujo8NQL7ONn6JrvKq4wUEpcYaFe6jVwzyWtaxRFBGSlCLCzDGhg1X2zX%2BCpyLMjxgpgMXvT%2FSCxAX8hbPLQ7aB9Zqk0k6leJh3GixlzLsN0oL7RL5t%2F%2Bbmk41jh967%2FguTnlzApbbyIT%2Ftq6MVjgMJDJKoQ9O5GXg6dKcQCr4TyOu2AufTubvmEUDOQgA1vgW%2FcQS3aDmaAKAXCSEU1zVe5w6&X-Amz-Signature=f6d7e7ffa5b9da6bf16f3a4126a157200522ece57c51c5cf97e51f71622349a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QF5EPW3V%2F20260401%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260401T222259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIE74zwLy4u8U4lg4jfO%2BbXhrmTm9VqecJign367FJ0fbAiAlxZsVjsMgaESqDSvhBR%2FiDYUM%2F6iEK9xA5e4YgXDBwir%2FAwheEAAaDDYzNzQyMzE4MzgwNSIMPyVjoGxwO5GaQNv%2FKtwDP71xOsrkvgbj5PYNYSnZJhGQby01c8YyZoSsUAFEklU%2B0D9S5UmT0lj071B347ENv6nykSXEaIHLCUbGtvpIn63MvWO4K18YtJ2WqzVKORNv%2BEprRyrbjv3fMcHH7WoR792kQ76x5hxyWqwTnXgOeJpqorej8UIY5YtyQulw5ekgARX9h5lbRTVsfHS3kr2ormZC3RUQDu05EsXmF6Nw8lzDxRCt33lNFzIsoe9QPaucdiGWzuIbxgI5EOad3QvMqOdkxEIf9eUZ3VaYRuTBzuoRUj3HQLcdkj1A5xOZ51I%2FYN2iAq%2FUgijo7m3BI5BCVAIEpU7P8xHVVDsaOcNw4isUlBhKf%2BbSD1ifJ82%2FDm%2FQAOUNZJwLC6SslAzVttv7xvYf29lnGhJiyz8vO2LNv3YfOZZ501vlyls7xg6FV9PYu0niM7zlkzWWbQhwm%2BSC1wjeuUd5P4k%2Bc9u8FraCg76YFosmodvzc6ubrkUayRpZ2J11IJ4IpL6WgWgwwwVGzo%2Fc6yMok7BifiZQRiStpbkUDrLgZMGvQm%2FJcsJFNOM4JdgUZeckSuGbn%2BxvSURuuc5Nlziqqbq2J5vYcbEGVGfkqYZs%2BA0xnapz1bT7GQg6RdWcNJlyR3vncUowoIy2zgY6pgEOBSJR1Lnn%2BKRnLCdCilaipt82W%2F8XZV82dcew0s3vglXM4kvJ8zT8b%2FcYufFTDThOSC4mpuW51CDW1DMY55gYsijpW0hYPHk15Z3KBx11qzgVZ%2Bbe2T16aOvfQQq57pMP9G%2FYd0y62%2BqoN72nFbQncNx4has0vcmjW4kxXqPaqRLJC3CGvENROJhbOFwbYsBsVkR0d6g9F2nbXP1kqO%2FPnfQaiSUd&X-Amz-Signature=9a859709deac3dec41bd3c843c52a13b6e934a7405a2bbf6f41bec805a73fd55&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

