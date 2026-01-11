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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6AZSEPY%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T120103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIQC7dPfakWyLCKsU2QB8LIx4iz3p65vZ%2FquATBgWQnftuwIgPHsUToftlVXjTSVc3wtUagYYmr1xKA0ZIJ7zauu9WdUqiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBp5%2BhEkZYk%2BkRstnyrcA5SpWdEiQmVnImyel2SIeTuGcmwAOEvWS73%2FRwSA2FaO6kl7t2kgKGOsbtxh1hxMwAJOP6BhdqNBJId4ue5to0X6lWrXGl9Dl8aKQubg83fs7r62KdmcpKsIej%2Bnh%2F5qtCpqC0uHMFYwVVcIFi%2BTYZ7REy46nlfW6PbCmFrcNyqUr4Dgc4CPVTC7V0Cxaq090ZRqYW3dSYGwTCG7NmaJeJxBKrrJ4vyBCIR9548Lbhgic3z7vbajC30OvEcvRCl97Gccu66lyhUBpZtfrJw6Law%2B%2F67tixuf0tO59aq%2FHjOcEjUEK2bQmu25JUNxtXRHjIarPWvzgGi1BSiGBICbD%2BjT640BeYYJT%2FePaYcqNLWdLPimB9iqtP6jAkGY4CoHRzFczqpr%2Fii7gFGl5Ndla3JU87USdmfaPZXVTIIm%2Fbh65F21XFGvW4ujaMryluU%2BFBhRuL48IYNK3VPJ7OAkwd6GwlxYmjkYSTXxYkFRycm1fn90s8GfCRLfGbLpUnM9aItER%2F0dtrscWhfrYrtJzRXggrApy5x7Po%2F15vKGfSEla9%2B6kNccT%2BGNw5vf6GNiwWxPdx%2FJ20xqrsE3kJaP32BPZk7CiHvZDMI8fzWmWdulzI0AjVzuc98LtwCfMKD8jMsGOqUBDa4%2FrWros3aUkB%2FHeBgx%2BT0kBNhxqqO3pf3Ap2B5ATk42m9YfRO1fWkNEIDt2ukcH41Ke56cBj7kgsUleKHcga8qe74P%2BVMJIBNbWEziAJkcwjqW7nfBI4GiNbMB7lm9K7iphhK9p%2FLQZ4XmQOjv73ReP5DpHU25GuTrDAIM12vUEbyJp7SkITR9yGQc9FuByBKHnopIz%2FIZR0gr5Th11qePc4tR&X-Amz-Signature=61d90dca17b258cfaaef3c86862fa1ec507c1ca8a060482aa81e3da1ec687c28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6AZSEPY%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T120103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIQC7dPfakWyLCKsU2QB8LIx4iz3p65vZ%2FquATBgWQnftuwIgPHsUToftlVXjTSVc3wtUagYYmr1xKA0ZIJ7zauu9WdUqiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBp5%2BhEkZYk%2BkRstnyrcA5SpWdEiQmVnImyel2SIeTuGcmwAOEvWS73%2FRwSA2FaO6kl7t2kgKGOsbtxh1hxMwAJOP6BhdqNBJId4ue5to0X6lWrXGl9Dl8aKQubg83fs7r62KdmcpKsIej%2Bnh%2F5qtCpqC0uHMFYwVVcIFi%2BTYZ7REy46nlfW6PbCmFrcNyqUr4Dgc4CPVTC7V0Cxaq090ZRqYW3dSYGwTCG7NmaJeJxBKrrJ4vyBCIR9548Lbhgic3z7vbajC30OvEcvRCl97Gccu66lyhUBpZtfrJw6Law%2B%2F67tixuf0tO59aq%2FHjOcEjUEK2bQmu25JUNxtXRHjIarPWvzgGi1BSiGBICbD%2BjT640BeYYJT%2FePaYcqNLWdLPimB9iqtP6jAkGY4CoHRzFczqpr%2Fii7gFGl5Ndla3JU87USdmfaPZXVTIIm%2Fbh65F21XFGvW4ujaMryluU%2BFBhRuL48IYNK3VPJ7OAkwd6GwlxYmjkYSTXxYkFRycm1fn90s8GfCRLfGbLpUnM9aItER%2F0dtrscWhfrYrtJzRXggrApy5x7Po%2F15vKGfSEla9%2B6kNccT%2BGNw5vf6GNiwWxPdx%2FJ20xqrsE3kJaP32BPZk7CiHvZDMI8fzWmWdulzI0AjVzuc98LtwCfMKD8jMsGOqUBDa4%2FrWros3aUkB%2FHeBgx%2BT0kBNhxqqO3pf3Ap2B5ATk42m9YfRO1fWkNEIDt2ukcH41Ke56cBj7kgsUleKHcga8qe74P%2BVMJIBNbWEziAJkcwjqW7nfBI4GiNbMB7lm9K7iphhK9p%2FLQZ4XmQOjv73ReP5DpHU25GuTrDAIM12vUEbyJp7SkITR9yGQc9FuByBKHnopIz%2FIZR0gr5Th11qePc4tR&X-Amz-Signature=61d90dca17b258cfaaef3c86862fa1ec507c1ca8a060482aa81e3da1ec687c28&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WAFTEMMW%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T120103Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIQDB5bOANtOglZ5E02M%2BmPSURXMSG5syCwGxJpooOj2cmQIgBPFOM5NvGg7nQbqFN70DBrSHkv%2FtxCqGo0G%2FdCKrv44qiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCgwiPsyAGfis9WpaircA7B6LjvIG2tEIQiUBlAfvgllMCYpUrJFVR2GSkXinx6HB%2FXg11ZtAWPPDCbonRjKTzp2BumD7O9evZatVE2RxwKcPSujJR9CVSk9AaJXSxt9RutdNl5zL4OQqelmxNBkcPV%2F0b2d4YJkSidimU8zTUv35GNSw6rHRuISKcrc%2F9guniN2jWzOv676llHijKD%2BiLp3pTrm9M8YVq%2FEHAgxZ4r8lPsYupriCxk8to1ql2c2GcmplNAMjjKfZ5L5X10YtgwtB6VKMvSWPQ6MPf0poX6yN0dB4prTwmM1XaO5PdjszgsfBXz8lzjyLPO%2Bnb4%2BnkENI8v8Q%2BSNY9nAh8zeP9VGPYUFzFSDijTqboWEjI%2FbsR8F1i28%2FChCJalj%2FHWcz8wrHZplE%2BBrSd2e8WRIlqLPEcvlaBVYwgLW7dQFFSZoZD0ySuOGQDDR7AR42RN1DF2HUxIewtV93C70um%2FeCaih6Odd9sNnkC3hxr2G0oYIg0TSAIT9EJUdZsMBbUyy66aW8VeI7aXWF8qzIdziWwdt0OwwlSDTyAnIJhZPaa0g81K3GHjdtHWFwrtssKdlJhJXfNSLiC3BGCMQJcJwZbzVpycFQrcOX%2Bi4rWIa7wfk6gY0kVhfra4Px6LsMKydjssGOqUBhjGq6CxE8DHyfqLwky4olxYEuxw255SiysjkkDOc4oIVSXn4gXQeYWdKdg6EOL5%2BKF4mj55t9vHwy8Tlk7vniSOcoh63JVPujtlvSTEGZbDgc7kABdjEOIgrsbJtYUsAnSrlbknIgX6qV%2B6aLRHySkam3hXhazKcOZhkB8NyMNo66qV1C%2FYFp3x0YSk2bwqXoCOiBB%2BhXJ0RG8bWGAT3Hy1tjLvp&X-Amz-Signature=79258b6588cd3b0736b1f92c5d701416ec08bfc0e7b12b82d58baa48cdeb2f91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OGNQEB2%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T120105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIQDDwotz7nb%2BOReOCa8C3e0OKHnkL9aURNNJRk4LtNXn%2BQIgBoZyvPsLMvSJrzQexx3ayruT3qBYVNkle2luaw00K%2BgqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGdfKHMNa%2BmymfqJxCrcA95DpZEXlOVp1i2%2FsOp2CTXZoiSruOZXYKdf%2FiHdrPluEA7dqAx%2FBO5yQCKQzsx8nrSWvaYmXWcSPilQWN0%2FYnT5XAWZq4bgiFFXNFzMSDjXQAp3TyyTnFsNMyL%2FfrqpMv4jPr2zDhtLFMRVMBv4Fbik%2FjBve%2FWG64ltfA0XlBqSiAHnJ57LP7TRmvLpGjEIwVJLq7blGVwGXujNCEyqc7dI4DVYn1bwQvDCR0Yd5Zb%2B0hLMytIy%2FEd1%2B2OTh9ojX3mSlZ2cYWAv%2BecnKxZgO%2F0oxPH%2BPsZTmKrONSj8dBWAgrwxpi07HslSo5kp7AV7CES42DPp0Ivc80V%2B%2FUykaP9WEfhIW3%2FHK%2B6pSvw6WRVw%2FJIp0qgmLVNVOVVLxJ5uE6R3okQyPctzZ2fEJuTIqRKGO2baE4Sp31zK7qjBcIeeLIPlcAv4CAcN3%2FwaQ2hs0PY2KLP2CjaoYfF3RXqWhNuPF98MYjc%2FU9R1ASGZb2VNC7cbBSSjZhHXq68Uw6rXx9yLq6CvLNBz5tVyyz%2FUQ9SPOislRaSYcVJxGMdLY0KZOacHjV8VH%2FhXi8kK4O2OqdruPsPPtqYBjNi4QnNSx6xUsyr9YHZO%2FbgVihGts%2BmjfAK0kKWajExihkQ6MKicjssGOqUBFTdm5uOL5QoIEk9YO4Vq%2BUO3Z%2FA49pXuhUMTC0W5XVmcRhYUrZ%2FF5blQfIiwS8DQwX4MGYTN%2B58HJ5qEf9IoTbbs8ms6zT7UN6YJlmsYlIiYWUIxg14ogrdQJFUub9b4Yv5y%2Bvl2un64pIpe23sz98e3Hvc2OM0w8aSByNRju%2By4JAxzKkmUprYmmpXoNI8GxnjL3F7SX%2Fs%2BGBxUB5WL61QD7Lro&X-Amz-Signature=52152e42b3b6ab853d8cc3e9d9d102c44d12c6f38a0328f205e706bc79bea246&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665OGNQEB2%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T120105Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIQDDwotz7nb%2BOReOCa8C3e0OKHnkL9aURNNJRk4LtNXn%2BQIgBoZyvPsLMvSJrzQexx3ayruT3qBYVNkle2luaw00K%2BgqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGdfKHMNa%2BmymfqJxCrcA95DpZEXlOVp1i2%2FsOp2CTXZoiSruOZXYKdf%2FiHdrPluEA7dqAx%2FBO5yQCKQzsx8nrSWvaYmXWcSPilQWN0%2FYnT5XAWZq4bgiFFXNFzMSDjXQAp3TyyTnFsNMyL%2FfrqpMv4jPr2zDhtLFMRVMBv4Fbik%2FjBve%2FWG64ltfA0XlBqSiAHnJ57LP7TRmvLpGjEIwVJLq7blGVwGXujNCEyqc7dI4DVYn1bwQvDCR0Yd5Zb%2B0hLMytIy%2FEd1%2B2OTh9ojX3mSlZ2cYWAv%2BecnKxZgO%2F0oxPH%2BPsZTmKrONSj8dBWAgrwxpi07HslSo5kp7AV7CES42DPp0Ivc80V%2B%2FUykaP9WEfhIW3%2FHK%2B6pSvw6WRVw%2FJIp0qgmLVNVOVVLxJ5uE6R3okQyPctzZ2fEJuTIqRKGO2baE4Sp31zK7qjBcIeeLIPlcAv4CAcN3%2FwaQ2hs0PY2KLP2CjaoYfF3RXqWhNuPF98MYjc%2FU9R1ASGZb2VNC7cbBSSjZhHXq68Uw6rXx9yLq6CvLNBz5tVyyz%2FUQ9SPOislRaSYcVJxGMdLY0KZOacHjV8VH%2FhXi8kK4O2OqdruPsPPtqYBjNi4QnNSx6xUsyr9YHZO%2FbgVihGts%2BmjfAK0kKWajExihkQ6MKicjssGOqUBFTdm5uOL5QoIEk9YO4Vq%2BUO3Z%2FA49pXuhUMTC0W5XVmcRhYUrZ%2FF5blQfIiwS8DQwX4MGYTN%2B58HJ5qEf9IoTbbs8ms6zT7UN6YJlmsYlIiYWUIxg14ogrdQJFUub9b4Yv5y%2Bvl2un64pIpe23sz98e3Hvc2OM0w8aSByNRju%2By4JAxzKkmUprYmmpXoNI8GxnjL3F7SX%2Fs%2BGBxUB5WL61QD7Lro&X-Amz-Signature=e3bd8464033a2145ced2108f267ca47ada2802f31237ff8c5d1080d9aad5d691&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V3TD3TZU%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T120106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJGMEQCIFMGzb3y9lfu%2BQUA3NPxoT%2B8auR2R8gJ7PvqKu5Cj5wJAiBqGUctxOZNxOvbGOZVwV7eAEH%2FmoF4DJxL2at8cslGNSqIBAjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMyz5isVCVSm2gPs7%2BKtwDv8bERVWO24O9C80GH8%2FOIlm668kb0paezIYqXPQlfhrzZKZRw4rAvHB9VYUgrm%2FXlCj5laUgE%2FSN7srBYy%2Fyacj4eBVxpW%2Fhr2u90jajAQ2crIxGUHMKGUrlng9OfoahGGAMS76rupJO0Z8Dzf6POk%2B0ueK7P5orNeOm9O0Nk1xo7cDXIaQOh61MbowlZLaBp8YHUhySkCA%2FMVYRxGXW7CKSaZr8tun9r8rhR31Wk7TF09mwyRkCCpBGu8WHsJ4%2BJWpCAaQfgsm5uOE4uEQn8FtXEbwmwjMrsBgdPof6bIHXN6lt414xkdeQaA1GVhKSoR2mPlEKRDDPIMB%2BU0vJMV4klBViIyCRG5%2BXiV6wnpJtV6CV3Vxp0mHpJ34ZXkzeHBNJiHtX5r6C0eLurw136Cb%2BYfE9NHdIg9IZBKj5vQU5SAROwKsnF3W%2BSnuNPhUM2kktT71A%2B2a3KJfnLeSizHuxHbrayGcVdugf%2Bsn%2BeVpEWhQ9JhLZXShPfJBEaFElImzfsubF7a3EQnyna1LpQclVETe6tRTSgmY5c5UHgnEcjl25Er9QuurBJJ%2Ftkk58wyGuufGMGmNHB3Hfvep3LbaOYyDGAz3WHA2cMXIjJuLTRab3pmP5utxOAGowjvyMywY6pgFqZwYXAprJAyKvzVo8QCMlKUHO9mSi1lmbzZiOaueU4Xf8Wajj1WbQNOY1nhXd9ejdJ49oVkb2rh0WyzTGinNm3vVcShH4aRYI9pkSDVfMRekIghhX6cxJNtZFyyjZnlDnDVl%2BaP%2BMRb3fytHuz0awJsAxQG%2FlJujvhpbIaN8r6zmpRG%2Fu46WLid5Od%2BNSqITl3SdT3vOzsvSDje500d5WoJHxbuge&X-Amz-Signature=85246cbf14a0517090564bc868b87279e8003630a3af5e964f5cd192fb7efdc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QR2ATVYY%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T120106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJGMEQCID%2BgrXBxtoy7Zl2LVwM%2BNzC3buX8tbK3Gk%2FtWNRUD0bNAiAZAASLtUJcTFXRldbCZXw6cS%2FQ3nkEFRIakqVgbZKcpCqIBAjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM3qLAA9THkRYjPfJBKtwDNaGaQiMLsaznahaIktsbmPzfKM00Pmpx2nVYMiPdxonsM515ikKbYQ%2B%2FtOwuLgSc1KklDhGe5x%2B31DognP6vB79rE1ljQvxAraeszUcyNQc%2BnzkhCraKQ96kmk76hMiCFDo8p0EmmkXhKwv6m%2F6ZXBEYGFZdb6%2BxETjcbB%2FyBmWJ41mYlOKA9ai1d1gUUZkWe1YqykqGGQdRkYyFLohP2gZGnGfHX4TKycFi8T1NjlSk3ekiNlDBOuUdY0ZbP2XiWpuNV%2BuweFVuyavTi9nXZqmeTVzu8YaF628rE2239UtAnBc1K3unieiE6YbI1wYnyBHqYppqvNuDz7pexIOqZzgvEWNM75AFMZxe0L3XfSoS5d9UWe1TYNehlOt6BbVR%2FHQDlG%2FU6s3oqWymupXPOWORpYfYaXowW%2BYnsMhd3cJ3bjrP%2BczRjSyMkJzw%2BSJaBTCOwjDU5TpStaeESucx9CPUPkhE0iQ9gRn3lkgpHw8qFD9Z6CYeoVuFnSfsngZ8j2cL0BW2qB%2BTyYxW8GnWoXbDcRKdoIj0OS8FM4ZomX%2BWWLSCWRVZ3Q6rOqZnBdwHluPsHy%2Fi0EVb1KJK6MACXQLfg34r2v0ZP5ILly%2BsdryYhCKwtVm17uDjbmYwyPyMywY6pgEenZwUqjq5P1m1ySS1sK%2FiU9ueToO6Z2SITkLgHdK3kqqBPNSSqx5C%2BT793rGEkXtYNXodO3IVDvUTr1jz4MhJJV%2B7%2Bm1CandhfpvzcxgM6pAwk72Pjl0O%2FNMrCW3pzc0TZim8q9QXRKxMUfHCgUvXyjbmjXxyqwu%2Fn80lRn6klp87LiUWZDrBhoQjc7iU6odGXEgwRowmGNc4gGtYRIQ88Zr3mbRx&X-Amz-Signature=fbd6101146247ce8399bf5c2df7095fae3fa259d7796d86dc820ef271ba8f452&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XV6NIBZQ%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T120107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQD1d0Tv7Q69%2FswrP5XA1g%2B83%2BqJsH6OVmhNT1Z%2FGv2AmwIhAPMfVEf%2BoeHkrs%2FRxwpumZF8%2BPLyGKHcQ9kyyLHHPMVZKogECNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwqaG1Jp2KS353Vh6Eq3AM8B54Q2EtSbEMX%2FnbPebRw0Wt8PfepAQHmMWRh%2BxrzZYPODMrRG19Vo%2F9BUISYMnaOWG%2BLW631mKYhblZy%2BUnQ6R%2Fn0e%2BClm4X88tumpqEZ0qVhOTERnBmqF9MV%2Fa9Gn5rkfHgNNGE6BXVld%2F%2FN%2B90Y%2BjCJ0Jdd1mL%2FVrkmrGqPHFGthba2VHnSC3dGJv5qp6ds3KbjGcPTZAQPkekwKtsV3GQi4PW9mWYxY%2Fwd0Yz1PKjMZtpo7pXjtvJxMeDKeYZ7k4aFQdvPX9vnQphFdkLhxLnAHl7AlDxbxMGDgThh50LSBNV13SGVobcTLsY81FNJBa4gn2D4X%2Fws7RwUl7EL30Xfm9q3qlVj3RAqPwsMZZwBsWk4EIHS%2BT0SXVZPppaMgdrKuO%2B8XTEko9ejx9GUi%2Bdln1pIeapIBw7HDGI2%2BEgFzDhKeH%2F3UTzuWeDKCUEMaw07Oeayq6ZmC60tiF%2BlSKvYed8zb2GbscxyeSgaWCav0NNjQg%2BfBBElfIAdlunuiopzAjGg1GflarjVPur%2BSCd3WF3h6sp8Tvw9bNbDPNuzd2vnvsgYwJ3zbcpDkkpzWng77UgVobQiZCIHPeXPX%2Fc5%2Fc5T0yr%2FE5i0X5fI91xQf%2BdbC%2FnwccJGTDIoI7LBjqkAQfsXrF5w8kAoYrWaXOXJEzPJhbErWiUxGGsyXs8riP7ZR9isBRzqa8pIoMGHNht%2BBuL%2BzEPNJzaGMkfEGgq3IaPIQRBliKf5W%2BlbbIFOIQa0fjYgDHhDCsdXdz3%2BfGaHZb8P4NkZENa9yrbw%2FtU3q5scrfZufBvIyeK7%2Bz2umJ5aClbC7qVwEFbwn%2F%2FkXpwdwioSPxRLkkhfhZlEGpg3TgWwqjn&X-Amz-Signature=860778b9fecc03e2fd8152bd5b5e04a240b926a16c3da203672433d65375d26e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOLKBDNR%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T120109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIQDhlI%2FU%2FifUD0RfaPhHqHo%2FeSYS0%2BYNoCsUuzHUma0sEwIgddmDnkMAWK75ACCLHlneayhNFg%2BY2TBwq%2FcK1Rn%2BBoIqiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJs2C2Vq5RfqIeIrmCrcA%2FuzaHsOOmQewhn0of%2FfZ5HeNbmd3M88tLl6YZGnihG5PcJJwnCJ53XnHIqVWKy3dXKgLvKvdwW8BcmAAwWL7WIgoe1Dmn0Hx8tkgVe9TcAAeyWFYygzV9YDSTLVTdSxbRAugZdt5LvQqpki5fMVD7uwmBVznon5n5a4FC5um2kpa1KFB9bNKQyW5m2xdHGYbu7KdswEMDROQ%2BE%2BAxFe3zdlmpMYvgtawN5DFbok0XzQ60SUodU2j7pm01A7jO0ois4Z6nYvXyiHtiwfBGbE0dqF%2BNBLq%2Fz7TNGAfiZ8Gpp7apCjHf7e70ys6h8K6yA810Gswuk1wh3fKVPItRKJTHfoukWVz4f6LuqGhTCNnEwqTLTqLzSRcQR0dtGCF0JDMRmJsmHK%2FDVuFkwTjyWB72DYYlyeVEaFfJ3fA02w4j7r0PeFzcCEru55EsKG%2BvjiBPseCE5qVsDdx5cumPb4NShozmoeSlBTkOqRvzlAPfmB4Z1DoPe2vWnAzHzbCO6%2B%2BSvrnrn1a7AcPNW2jmy1f3EUw7amNRDFnjjYQ%2F1u39wFlqI3Q%2FoRPcAJCPbm1ydeseptoi4JRj2cezPZKMR2ldw8qJ1EjtIgQx1wuXHuLII6umSldpfG%2BxxOru4BMNT7jMsGOqUBwvN0uYM5OfFhAr45GPUGATbB4kMOFeWqNlKPcxZqiG7AZeExub9h89vuQVdu1HrF9Xk7P92GEhFUI1KOHRCjKusXR0HMDONbtTpSd80we1%2BP2ivnQz9OyNxPZOPUhFpxvkKpWNg6IYhxHRNCgllML4sTeBJ60KHhmRrJFtH5NBSkJphDdUeP3%2BWGP9vsdKGnhvs3IALO8qtI8laUf6gDaTB495mK&X-Amz-Signature=660ca5c5ce9e26fe2c5a9b110b849e4aba061ee780d7e6311bdf9e153673311b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOLKBDNR%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T120109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJHMEUCIQDhlI%2FU%2FifUD0RfaPhHqHo%2FeSYS0%2BYNoCsUuzHUma0sEwIgddmDnkMAWK75ACCLHlneayhNFg%2BY2TBwq%2FcK1Rn%2BBoIqiAQIz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJs2C2Vq5RfqIeIrmCrcA%2FuzaHsOOmQewhn0of%2FfZ5HeNbmd3M88tLl6YZGnihG5PcJJwnCJ53XnHIqVWKy3dXKgLvKvdwW8BcmAAwWL7WIgoe1Dmn0Hx8tkgVe9TcAAeyWFYygzV9YDSTLVTdSxbRAugZdt5LvQqpki5fMVD7uwmBVznon5n5a4FC5um2kpa1KFB9bNKQyW5m2xdHGYbu7KdswEMDROQ%2BE%2BAxFe3zdlmpMYvgtawN5DFbok0XzQ60SUodU2j7pm01A7jO0ois4Z6nYvXyiHtiwfBGbE0dqF%2BNBLq%2Fz7TNGAfiZ8Gpp7apCjHf7e70ys6h8K6yA810Gswuk1wh3fKVPItRKJTHfoukWVz4f6LuqGhTCNnEwqTLTqLzSRcQR0dtGCF0JDMRmJsmHK%2FDVuFkwTjyWB72DYYlyeVEaFfJ3fA02w4j7r0PeFzcCEru55EsKG%2BvjiBPseCE5qVsDdx5cumPb4NShozmoeSlBTkOqRvzlAPfmB4Z1DoPe2vWnAzHzbCO6%2B%2BSvrnrn1a7AcPNW2jmy1f3EUw7amNRDFnjjYQ%2F1u39wFlqI3Q%2FoRPcAJCPbm1ydeseptoi4JRj2cezPZKMR2ldw8qJ1EjtIgQx1wuXHuLII6umSldpfG%2BxxOru4BMNT7jMsGOqUBwvN0uYM5OfFhAr45GPUGATbB4kMOFeWqNlKPcxZqiG7AZeExub9h89vuQVdu1HrF9Xk7P92GEhFUI1KOHRCjKusXR0HMDONbtTpSd80we1%2BP2ivnQz9OyNxPZOPUhFpxvkKpWNg6IYhxHRNCgllML4sTeBJ60KHhmRrJFtH5NBSkJphDdUeP3%2BWGP9vsdKGnhvs3IALO8qtI8laUf6gDaTB495mK&X-Amz-Signature=77cc497fb092bfe52b8065f757b11b6ee34fe012f714c773b01423a90e072c59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665I4DRFJV%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T120057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCXVzLXdlc3QtMiJIMEYCIQCxRJJKeyktpjJyJ7sat%2FrWaPOy3J7zZde5UPjtUTG8GAIhANAIXnTfSgmlRZ2DVKHKmncaUpjOGCn7ocglzD%2FDxocfKogECM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx1FOy1ZyiKvuPRVKkq3AN%2FTbaqL0Ltdf6kDBtWBGRu%2BWv%2BBsqhFyuCgCXHbBjEPVDMbhT5uvkky3HkfnLgpbAI0U89kQTXq4PhH6cwrH9%2FnxuJ%2B8ZioQNMeh3U5Be%2BnmWfF%2FJMtRa4LpCaGOEzNGLVhSpgpWii%2BZGywi5BD9B9hzuXCGMThubP4xEHK3xnZ0omyaFnOQpndTwskuz2VmKNq0Pm1fGnp%2FPcooG1ESPI4SLVXwXJ71HMQiaPz%2Fco5XrIxNqX20m2wxPKenWhWKWoC%2BKy7XH3pOAwDwgaxYItNFlwzWvWv5I0asRXHzI8hPhBzE%2FGE0FeSKuiTYD5vJeRksQLkKqjdnwtrMtv%2Floyq%2FwLJ5ljK6S%2FvAgGS3ZYyaADKvZsW1aJysZD1KcdToOoNAQVw%2FMib%2FDL5jgc4PNzkQF%2BWwJNDkoAALrg%2FiSbqzGqy0zeDQZPPaaSQl%2BMJAX6inIi3H0%2FmFhELr%2B%2FyBOEColo8sXzX2UOYrWBqAbodM1RiX673GWW0B1U01cBudzas68exhV8L%2BelZ574qp1asmxrzxfzRUcP%2BCitDcIZ4wqpR91YbZS9Uf1QFgtSTuSdzRvEDTXRIAM2RHZhxBOnIYaSs7ISEWe9SMK3V3PJ%2B6sq1q84VpTgc5ZVhjCh%2FIzLBjqkATeq41WBpBr2FFx0UlOZ3xpjNewUvkrkJmb%2FVoxWvSSEtfq46zyc0T92zGAxa0yd2zsbnDPobzcrUYKceL4jU9INLekLMqxEkdKQbBrJex%2BVtGWfXoNCN5zKGyXumcu9Wx4%2Bp9G33RjRukxHpEMKNt9MZub8MFBXJUGbR3uoZqnO3H%2BdkvIBXKoLSIUGvgZg2Zoxkrc7sIJJzZ4geE9jdOMtt6Wd&X-Amz-Signature=7d80b11096ff15f03681f0d64a604788c5c8997d38244c5fba32e992e10c012b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HHP7EAZ%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T120112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQDX3fBcpEk1jqrWmscWrs8lk5IKZg2Bm4esFs7szUJT2QIhANiYJ8a1llz1UKakbXmp85AswrX4P%2F6mPiE72zCgdgiJKogECNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw3MPPv%2FyeExhpF2wsq3AOSmVT68RXkLlChu2YFjs0NyVCWAfEsbwJCw0wyp6ujrkVllzG%2Fm2VpUuXd2g3h6EpEZySyD25c5EUPd6jiNhWGQzZakVnnMeNSmMvOp%2BcBx6yl%2Fn0bna2Y2Cn0%2FxjZ9Y89SMLdMhRQQIeLpqHeTRT2p5s3YfUKgs4xeDEm58B5EwOQXTSnWM2mEEt1z41U1wYVCk0tS9h6XmWnWz4wSDo21mB4RYLbZye7jmg6KrvSoStP%2Blwc6LhFLlHKVyWh3b2MdYt1BSrWO8sDRIzE0gUMvkdEwCh%2B4g6%2B6bWaCJiMhTVwz2XWjgxZTCk1tol0ZAExh08CJ2g77ZLjTMejJPuZe6wsluAH5heVtI7h1if00BoshZUUw7P72URZKz5LFiqper2iyJ2i0NZC3KkK%2Bp0pdnI9QcUr%2BZIMJEABaxX8ifL3fjhWXVoEaB0LVpWjk7XD8T2ap7OqbPgnNK0JM6CGOlf%2Fb3%2BhYea%2Bxd%2Blu4L6pMuerkyVVoxzPwocK%2F%2FS2cVpuBmMLOmClF0t3HWM3BhivZ69uurg6%2FnJDKH1TwPf%2Fgt0mqPy85HEubOp%2BKw%2F6VJTCWuahi05M8BuABvmkR9k07Cr%2FUcBUqzUPjVcik713rmdYKIOZDAtEIq7JTCano7LBjqkAVuKqOaiwHo%2Fjhvs0oBNgKcw0TiIOPPwKRu%2Fz2D%2FTENfKQQFPQQcIeGSQgCN%2BrAD7oML7HK%2FGm%2BTGZ0eVCb1ZdmUTEEk4JJ4iI9Nl1cMjOhF79UNtXSJ0m0vdCjHNTbYHmsr3VU3zZzqaT0861ZJP4NQdJXNAwvd%2Bz6YRPISKWInvCSyglEwtqU5DIduZnvInE%2BQlpaDXjR5C9uPThpJ0xIeAyfj&X-Amz-Signature=05193755feceb1451d071f295b6d950011bf99476f6193323dc1d8bd43327cda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HHP7EAZ%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T120112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJIMEYCIQDX3fBcpEk1jqrWmscWrs8lk5IKZg2Bm4esFs7szUJT2QIhANiYJ8a1llz1UKakbXmp85AswrX4P%2F6mPiE72zCgdgiJKogECNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igw3MPPv%2FyeExhpF2wsq3AOSmVT68RXkLlChu2YFjs0NyVCWAfEsbwJCw0wyp6ujrkVllzG%2Fm2VpUuXd2g3h6EpEZySyD25c5EUPd6jiNhWGQzZakVnnMeNSmMvOp%2BcBx6yl%2Fn0bna2Y2Cn0%2FxjZ9Y89SMLdMhRQQIeLpqHeTRT2p5s3YfUKgs4xeDEm58B5EwOQXTSnWM2mEEt1z41U1wYVCk0tS9h6XmWnWz4wSDo21mB4RYLbZye7jmg6KrvSoStP%2Blwc6LhFLlHKVyWh3b2MdYt1BSrWO8sDRIzE0gUMvkdEwCh%2B4g6%2B6bWaCJiMhTVwz2XWjgxZTCk1tol0ZAExh08CJ2g77ZLjTMejJPuZe6wsluAH5heVtI7h1if00BoshZUUw7P72URZKz5LFiqper2iyJ2i0NZC3KkK%2Bp0pdnI9QcUr%2BZIMJEABaxX8ifL3fjhWXVoEaB0LVpWjk7XD8T2ap7OqbPgnNK0JM6CGOlf%2Fb3%2BhYea%2Bxd%2Blu4L6pMuerkyVVoxzPwocK%2F%2FS2cVpuBmMLOmClF0t3HWM3BhivZ69uurg6%2FnJDKH1TwPf%2Fgt0mqPy85HEubOp%2BKw%2F6VJTCWuahi05M8BuABvmkR9k07Cr%2FUcBUqzUPjVcik713rmdYKIOZDAtEIq7JTCano7LBjqkAVuKqOaiwHo%2Fjhvs0oBNgKcw0TiIOPPwKRu%2Fz2D%2FTENfKQQFPQQcIeGSQgCN%2BrAD7oML7HK%2FGm%2BTGZ0eVCb1ZdmUTEEk4JJ4iI9Nl1cMjOhF79UNtXSJ0m0vdCjHNTbYHmsr3VU3zZzqaT0861ZJP4NQdJXNAwvd%2Bz6YRPISKWInvCSyglEwtqU5DIduZnvInE%2BQlpaDXjR5C9uPThpJ0xIeAyfj&X-Amz-Signature=05193755feceb1451d071f295b6d950011bf99476f6193323dc1d8bd43327cda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666RHTTEVZ%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T120112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAwaCXVzLXdlc3QtMiJHMEUCIQDvK66WzSLW0PF7JBIszXz7Eb2BmpQXZ2H1aLuf1jgytgIgL6IitjvQp%2BAwvBhC%2BbNY45RAnyvB5gY%2BaOAT3JK7JzQqiAQI1f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMGvS9xGf2bRCHFUaCrcA%2Fj0OiW3HuSwMdSUSQ1GcvT8mV0sUBOoeQy3UdeGDezXGMMcVd%2F0jF7KZbgJiYRPMv15xfHGl5SwZI0jXURDxBkBETLbew6mmbCtnslu0YozvCDRKk4Hz4DOxDB27lvEkv3vgrIOpkFeFvNxx93%2FqoFD2DRqG%2Fg0JfLlCHqW7kxxlPhnIxg%2B29zirRFODHqT%2BlapKdvo4Tqk8yK85i4MSPnUdI4l%2BPnEw%2FUOAN98q6pFndi0mv8u3NNuE5JBLgSpCJ%2FDlElNhgp1qX9zT%2ByoSOciA0FDrXuGD1GrksIYM1HZ14Emjm8WoEtY4HWcddtBIqFnWGptxtY3pSGdW2rxX%2FJQ61sqSNTzO%2FJXKHJLv1hgRhgibmUcQTxTvU3YKEjo3Ql2qPyREdv3fhx7PSSXmp41dBU4gzWFa507U1KV8VZGvyW%2BTIvKUvEPNb5XAnTjAku4Yccc5o0QDDKLEhXgZE0FMXF1HhNBgUabOG9mtw6B4MAb3zvmwy6vZAK78X5VhC7FZqT4MzkRDcE6geTmqQ%2F6hSyLpZXJLEqKg98%2FwkdTGjXcoknHEaj8o7%2FprRI858vYHDMsCJMmEqtdZf48eOdpWoNWtCWz7t6K4mILd%2BnGoBqNgsD%2BXET%2FjWcxMMegjssGOqUBIDGfqhDWe302lx%2FujasnWnpfIT4oNnces2qaHNo57QKDQxmBi6Wv4TlFwvVoOjgWyCeZ16%2BREdwWB5eKYCQ47K0bShYcmRkij78LHiQ1HtL9%2FY2n1vRBUJ7%2BI7kSwdqmpQ0YisGGFhlzMqCI41YBE%2B1UfMRrL%2BFNJfqlmRZr2ttRY2I6o%2FWrmW19%2FJccANIr7MBqkwEDLSOyykYnsku%2B0oYNH0u4&X-Amz-Signature=220b137e3e3bf8592fb6182f05e60596f18091bbf33db361cfbbc275e2e0c7e3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

