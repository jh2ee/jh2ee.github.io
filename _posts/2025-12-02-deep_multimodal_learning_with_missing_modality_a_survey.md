---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5CKCQZI%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T100108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQDIj8%2FjTqYwh3ZBtSjLXw5Hu8oz9p%2FxptSM%2Bgw5xvitYwIhAJFQdoz666F5L0ec%2Fhlf6lfGvEjJm5t8lsLXMhOrfq%2B%2BKv8DCBMQABoMNjM3NDIzMTgzODA1Igx4NRohZoiXhATWgqYq3APbECWTfQaXjVCYW8vxnmTXojep1ySznoI5kW9kwDZ%2BTNFMydKFE8w9kLhL5nFAXPJLuFCBz8PSimKtMrOjGGT0kv6QQk8kFgtaLvwHOggqU05kOAJ4kIww2qvLC52LtnjitKGd9zz0HDukRZ6fDx0BkqA9wsOuKuiFHJAPVnXsUJqY7oXf6rydLoxKCBzp94s4mP%2B6oV1yXSsMrj80SM9Gn645eRmfTJFT%2BCpeeOv7hopvHLBd%2Bp30ubBHacywfBnlruMGt8kamtHb1k0JJhP4B%2BIMiWzNMD0UWqc9O9e2Y0E2wCknK16I3t3dzD1g%2BMfSYMaBBVqzeaGsU9VYm6ImsN3X2B5lx8Fiky%2Fj8vuAVlgAnUaY6%2BheyFpWHENTPNdY%2B3wrRtWKPRSrR3CwAYyII3T3O%2BvLwak8HFoDIwtOjuYrZ%2Bf%2BeaJ%2FpaDzZs7P%2Fab65rtrqZdtlDcHKzI5bN7kXgRvdAj854c%2FmrMwnUgJBk2v3GoVA2QNRKnwoXtH2MHJMmthLBSJ7aXXVSHmymbDcSigSiPH5VDUwQnKxHt7UtAS4G2yKBAA%2BjAcknxDKqpVqvt05xM%2FV26AIWEVoEy37zuqGVRdJZPL9ens6iAvyyVIKEPa3FzfGNySaTCP8LrJBjqkAZC%2B93LmMkdQM2jpN4Gnm%2F0vB56se6ZxR6nXCTqT6qbeBboKIhCEHixKgeQkdLSeY9JTa%2FCRTdBWeidaYn0d1VUf1UXQXGjJg%2FYvQtVpE2Dfao5shbwtaTyOug%2B4LArxape9KO4VzK%2Fi0PW3m%2FpPaGfsbHNPBbtpp8DIAdwdpj1lDNyipsEvx2FtM9ZEqqfTB1Q2%2BSEsCCkebkRZD4coMjNx%2BiSL&X-Amz-Signature=6bd523cd79ebc3b7c5c79cb5ece9b9ed5f757debb3e612a1049f1b00906a61f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5CKCQZI%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T100108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQDIj8%2FjTqYwh3ZBtSjLXw5Hu8oz9p%2FxptSM%2Bgw5xvitYwIhAJFQdoz666F5L0ec%2Fhlf6lfGvEjJm5t8lsLXMhOrfq%2B%2BKv8DCBMQABoMNjM3NDIzMTgzODA1Igx4NRohZoiXhATWgqYq3APbECWTfQaXjVCYW8vxnmTXojep1ySznoI5kW9kwDZ%2BTNFMydKFE8w9kLhL5nFAXPJLuFCBz8PSimKtMrOjGGT0kv6QQk8kFgtaLvwHOggqU05kOAJ4kIww2qvLC52LtnjitKGd9zz0HDukRZ6fDx0BkqA9wsOuKuiFHJAPVnXsUJqY7oXf6rydLoxKCBzp94s4mP%2B6oV1yXSsMrj80SM9Gn645eRmfTJFT%2BCpeeOv7hopvHLBd%2Bp30ubBHacywfBnlruMGt8kamtHb1k0JJhP4B%2BIMiWzNMD0UWqc9O9e2Y0E2wCknK16I3t3dzD1g%2BMfSYMaBBVqzeaGsU9VYm6ImsN3X2B5lx8Fiky%2Fj8vuAVlgAnUaY6%2BheyFpWHENTPNdY%2B3wrRtWKPRSrR3CwAYyII3T3O%2BvLwak8HFoDIwtOjuYrZ%2Bf%2BeaJ%2FpaDzZs7P%2Fab65rtrqZdtlDcHKzI5bN7kXgRvdAj854c%2FmrMwnUgJBk2v3GoVA2QNRKnwoXtH2MHJMmthLBSJ7aXXVSHmymbDcSigSiPH5VDUwQnKxHt7UtAS4G2yKBAA%2BjAcknxDKqpVqvt05xM%2FV26AIWEVoEy37zuqGVRdJZPL9ens6iAvyyVIKEPa3FzfGNySaTCP8LrJBjqkAZC%2B93LmMkdQM2jpN4Gnm%2F0vB56se6ZxR6nXCTqT6qbeBboKIhCEHixKgeQkdLSeY9JTa%2FCRTdBWeidaYn0d1VUf1UXQXGjJg%2FYvQtVpE2Dfao5shbwtaTyOug%2B4LArxape9KO4VzK%2Fi0PW3m%2FpPaGfsbHNPBbtpp8DIAdwdpj1lDNyipsEvx2FtM9ZEqqfTB1Q2%2BSEsCCkebkRZD4coMjNx%2BiSL&X-Amz-Signature=6bd523cd79ebc3b7c5c79cb5ece9b9ed5f757debb3e612a1049f1b00906a61f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCE4QA2Q%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T100108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQDyjYIHSRQT%2BwuQT9Bls01YafwDAlkE6VXwzKQi1KVAMAIgdE4hjR0lmqRylBQo8qa6%2FQsnSv31kTxMOKEGw7N%2BoHQq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDAD51i1Saqe6rXtjASrcA2BOzr5MJcdnqLq6zAm89n4JrT0Q3fZKwYLVcpvyFMJFwtkG8OgU1qmvB7CIwxaLPZCmKuvaFmOmOSIL5cxXiJ%2B6uPHY8oLMZ5tTtHBmC%2BdfSdE%2BMxBWDy6jCHhFqYNqS5F%2BH7YiDcCNUrwQ8F571KLYDYBIRtrVRKDpBlyYKxqgicn8RsgBkB1X7%2BtvR7cHIyHXYWBTkzc7t19XaACtWhMkhePpDocR0X3gYxu2VkWjVpwUqbbZNVnTc35c4Is1M35RNm02aDm88sE%2FML%2FZTTT0hgmw2eda4Fot5ze7LOz9eDociKoBchHjwUEVJv%2B5MjM5b5Y00rL0vVRq0fwVGwdjubYvAwjWIZaVY%2BJg3lhIE%2FZ1elS1Zvgr8x0ft5%2FG4Ph6WkPgYDwvf7Ksgka%2F6Os3zGx44%2FNAXBN2%2F1e0rlhUTFMNqeFvFsntcUR3P8zTKmfpLrAXlSxeW%2FuGNSrQxJnyc%2BlTN2mgSUAW6J05hNNcVRXf0BmPoQcWsB9B9rO9Fgst5CACdG4UUFPuZVx9Pf1ntMV%2Bp5z5zkqmraMF1V5epQJfV8VAUVkGs0JJdPNGfahD%2B3vhOa71gx8259Kjmv2dcIuLU6xwpDWjxf%2FypjTQpItYA4%2FaUSX4TvZuMJTvuskGOqUBSzsUoWhKIpUmwMIf0ksfvF2ElD1yKx30SP9ZvwJenqKaVgSz33JdSA39J2fLTPCFPyHbAPXruPseOLofITlvp1rSZMB8i0lAvxTUQcSESil9f9zlf6aHMFM3isLOZxAXg03oWo7V8fwfXzd4ctXIm1NXsc99gaSX3BVtv0HtFzGzMWtP7KTZr60ebrVWHMZql8USn8XHouVbIuWyBJ0NK8MqJvg1&X-Amz-Signature=a8770c460ae0a485157afd5cf3df16f774d4e39c932410b2bff64eb2a0fa08fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCE4QA2Q%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T100108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIQDyjYIHSRQT%2BwuQT9Bls01YafwDAlkE6VXwzKQi1KVAMAIgdE4hjR0lmqRylBQo8qa6%2FQsnSv31kTxMOKEGw7N%2BoHQq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDAD51i1Saqe6rXtjASrcA2BOzr5MJcdnqLq6zAm89n4JrT0Q3fZKwYLVcpvyFMJFwtkG8OgU1qmvB7CIwxaLPZCmKuvaFmOmOSIL5cxXiJ%2B6uPHY8oLMZ5tTtHBmC%2BdfSdE%2BMxBWDy6jCHhFqYNqS5F%2BH7YiDcCNUrwQ8F571KLYDYBIRtrVRKDpBlyYKxqgicn8RsgBkB1X7%2BtvR7cHIyHXYWBTkzc7t19XaACtWhMkhePpDocR0X3gYxu2VkWjVpwUqbbZNVnTc35c4Is1M35RNm02aDm88sE%2FML%2FZTTT0hgmw2eda4Fot5ze7LOz9eDociKoBchHjwUEVJv%2B5MjM5b5Y00rL0vVRq0fwVGwdjubYvAwjWIZaVY%2BJg3lhIE%2FZ1elS1Zvgr8x0ft5%2FG4Ph6WkPgYDwvf7Ksgka%2F6Os3zGx44%2FNAXBN2%2F1e0rlhUTFMNqeFvFsntcUR3P8zTKmfpLrAXlSxeW%2FuGNSrQxJnyc%2BlTN2mgSUAW6J05hNNcVRXf0BmPoQcWsB9B9rO9Fgst5CACdG4UUFPuZVx9Pf1ntMV%2Bp5z5zkqmraMF1V5epQJfV8VAUVkGs0JJdPNGfahD%2B3vhOa71gx8259Kjmv2dcIuLU6xwpDWjxf%2FypjTQpItYA4%2FaUSX4TvZuMJTvuskGOqUBSzsUoWhKIpUmwMIf0ksfvF2ElD1yKx30SP9ZvwJenqKaVgSz33JdSA39J2fLTPCFPyHbAPXruPseOLofITlvp1rSZMB8i0lAvxTUQcSESil9f9zlf6aHMFM3isLOZxAXg03oWo7V8fwfXzd4ctXIm1NXsc99gaSX3BVtv0HtFzGzMWtP7KTZr60ebrVWHMZql8USn8XHouVbIuWyBJ0NK8MqJvg1&X-Amz-Signature=a8770c460ae0a485157afd5cf3df16f774d4e39c932410b2bff64eb2a0fa08fd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZEHA4I5%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T100107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJHMEUCIEnJId3BmU1cX0BeHHrsAMB3uqr2xOi9xACa2ZmPBTr0AiEAzkrsCscfgva9GvvEs%2F2YdX%2FRuqQjEc%2FzvweOKIvVpiMq%2FwMIExAAGgw2Mzc0MjMxODM4MDUiDA2R9tr%2FVIIvWlogxSrcA%2F%2Bk%2B%2Bp7srTMNMWx435C6k3j3wb%2FWgEOGYMtAT4mg8hzw02F06iDggzwBhmt8cMa4OXY2%2Bfy415qEeg%2B6MtVJDZQURfMXVzmuvi2h6F467pIk4uwSZ%2BB0dKtqKLCimh4J8MiSeDAcwYlHCrCuv4khAmI%2Bk3678uZPLZtxb%2FJb1voqKOGJ%2BHXd9OcgKfX1LgOdl8jrZj6I%2BAyOc7l7ZMwA1wj2LZ6xgAQv7v89RCKI7AYOhE6rafQ5SjL67MJzaT9isIeeJJhshE6KrEAK5JKhaCKYAEAkjrv4Xgu6mRmJtwJdVn6qMasZ%2FWL4CPK8aN7lKyL6nbqFIMfliPL0%2FnI3KHgXHjRd4iCECcfkP8cRB1QPKM9Ne3uZ4tjwLKbF%2FmmELYYLeIjEO1if1X4pW%2B37qCWuqEALSHNkC9IDKnipDbwtPvz87yNxIWcmI4f24jqH9hIMWYU%2FeLKLbCKbwSqP2ak34YXrjBhZutdyeHZkbVJjVANVGgOjPiP87FHoXj%2F%2BiuU6YhmUJ%2BYryosBQYh%2B9QEZ9H%2B%2F187cbpTxkmfBveXmfjlHHfPEPV7fH8ZOVPCHDPmk7BXvPU6ENfHkGjFl5XJi08RTaI6e%2BCqeRYipVB%2Fyhx66QnpeK4i75kuMKLvuskGOqUBHnNg0bTtVAoZagudXKuGybXbi3f%2BpGDYVWf4%2F6IMeEEHElJryHpy9J1DJszXlg2mirx23RtTkOwfY%2FpqijjvmdjsirhOsM2sPBxYDdcor73roDZVfnX538Gml5L5YkQx1A%2BrdbLTt%2BGe75fvbF7P07jCr5k4CfFJxkCBrD0qceZK0XaAcxeL%2BVmm33wzfeajyA9qBHNwSRrH48b1%2FUXfZgP8GFjW&X-Amz-Signature=cd46aa3ea4019106d743fa1ed2013e176c2fa6f7c78b2835e9d9e9422c145009&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRO3WXPF%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T100111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQD9R%2BcrcaHDM2HKCsMOxM4e8xDzdRpLHHTtLKCYaQZ3QwIhAI0AR3PzG236I8w%2F8CAEpi1t7LyxAs8l5mxY3lvlx%2BmiKv8DCBMQABoMNjM3NDIzMTgzODA1IgzB8%2FLVVaeTMAwN80Yq3ANM9jlxDcQ9mlQoGWN%2Fl0E0otgt6F0VLyaM%2BX6P1KWwdyXrYX4qsJR2tN8QJ2IJ8LisYYhErXED9pseM6tjFUDK1sUhMVeYtuogMXelUTc4A%2BBmve%2BfOHUpV%2BrtnmUViV5N37W8bE%2Fy68tp63CiFg0IRZX25%2F03K0F0uFlt56W%2FKJCOxemhd8W6waAUAKKKUex4Hs52UebXJMhwk3eDR0VRyvoaUbdtprLBNZc793xBk2P%2FEtBwdEwbaPeovAmJ5D416LzPcVwNiyRoQwa2jNDF3Xf0MijdBrO8ovKwyt1dyzGl3zOCUOUJIy%2FLEcrbJ5MI976QkfkJaRQfxYAfBk6NmSbYBxDds%2BFi7iGNI6nDd6K%2BnuE1EdzRYqp7kZm1u2xEGDCRau1qn%2BR0k1Q8x1OLyUnlkEvTsGjxIArdEusGeB16gwDxoMZUCl29y3zMzEizAVvB8QKA%2Fi%2BW8Jo8pL0axRE9CUDD3cWAQaCdICdgk8FKpLdgZ%2FhMgomelv7LkHJvuXcadokAFDQFFz2I0aeyPjuPrR32inxB9wUre5iwmAjpDjijvXt82MhRYssfTOWT%2F50vvMtauHlrmCUVWw6Jw8USIGXLivb0ubUbwNPmw3HyLy0cX1ok9Xx12TDF77rJBjqkAdo%2FkOHfAM8F6sq2QieFOHPDLiL42h01C%2BB2R1uWPLfo7XW7SCSiPHDN%2Ff%2BtC%2FAq5faP%2FvfqbWOb0oAx%2BMSX9amg6AS36sFJNTP1QXJSbUGeY7wG3enxUjRcoLgjO6harGGYm6euDwtdwe3OarkWY85lU87Hxeeard6dIr0lnltldYW6%2F8mqbWj6dB%2BwKiKDHaAESHL1g%2BjmF%2Fzrlm45yDHsQQgZ&X-Amz-Signature=f03cb6e6a2dd2bc7d02a0831c7755afb0e9192c1acb97d049c93870d01233249&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRO3WXPF%2F20251202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251202T100111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEoaCXVzLXdlc3QtMiJIMEYCIQD9R%2BcrcaHDM2HKCsMOxM4e8xDzdRpLHHTtLKCYaQZ3QwIhAI0AR3PzG236I8w%2F8CAEpi1t7LyxAs8l5mxY3lvlx%2BmiKv8DCBMQABoMNjM3NDIzMTgzODA1IgzB8%2FLVVaeTMAwN80Yq3ANM9jlxDcQ9mlQoGWN%2Fl0E0otgt6F0VLyaM%2BX6P1KWwdyXrYX4qsJR2tN8QJ2IJ8LisYYhErXED9pseM6tjFUDK1sUhMVeYtuogMXelUTc4A%2BBmve%2BfOHUpV%2BrtnmUViV5N37W8bE%2Fy68tp63CiFg0IRZX25%2F03K0F0uFlt56W%2FKJCOxemhd8W6waAUAKKKUex4Hs52UebXJMhwk3eDR0VRyvoaUbdtprLBNZc793xBk2P%2FEtBwdEwbaPeovAmJ5D416LzPcVwNiyRoQwa2jNDF3Xf0MijdBrO8ovKwyt1dyzGl3zOCUOUJIy%2FLEcrbJ5MI976QkfkJaRQfxYAfBk6NmSbYBxDds%2BFi7iGNI6nDd6K%2BnuE1EdzRYqp7kZm1u2xEGDCRau1qn%2BR0k1Q8x1OLyUnlkEvTsGjxIArdEusGeB16gwDxoMZUCl29y3zMzEizAVvB8QKA%2Fi%2BW8Jo8pL0axRE9CUDD3cWAQaCdICdgk8FKpLdgZ%2FhMgomelv7LkHJvuXcadokAFDQFFz2I0aeyPjuPrR32inxB9wUre5iwmAjpDjijvXt82MhRYssfTOWT%2F50vvMtauHlrmCUVWw6Jw8USIGXLivb0ubUbwNPmw3HyLy0cX1ok9Xx12TDF77rJBjqkAdo%2FkOHfAM8F6sq2QieFOHPDLiL42h01C%2BB2R1uWPLfo7XW7SCSiPHDN%2Ff%2BtC%2FAq5faP%2FvfqbWOb0oAx%2BMSX9amg6AS36sFJNTP1QXJSbUGeY7wG3enxUjRcoLgjO6harGGYm6euDwtdwe3OarkWY85lU87Hxeeard6dIr0lnltldYW6%2F8mqbWj6dB%2BwKiKDHaAESHL1g%2BjmF%2Fzrlm45yDHsQQgZ&X-Amz-Signature=f03cb6e6a2dd2bc7d02a0831c7755afb0e9192c1acb97d049c93870d01233249&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

